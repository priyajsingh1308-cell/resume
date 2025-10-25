
const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
}

Deno.serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    console.log('LinkedIn import function called');

    const { accessToken } = await req.json()

    if (!accessToken) {
      throw new Error('LinkedIn access token is required')
    }

    console.log('Fetching LinkedIn profile data...')

    // Updated LinkedIn API v2 endpoints
    const profileResponse = await fetch('https://api.linkedin.com/v2/me', {
      headers: {
        'Authorization': `Bearer ${accessToken}`,
        'cache-control': 'no-cache'
      }
    })

    if (!profileResponse.ok) {
      const error = await profileResponse.text()
      console.error('LinkedIn profile API error:', error)
      throw new Error(`Failed to fetch LinkedIn profile: ${profileResponse.status}`)
    }

    const profileData = await profileResponse.json()
    console.log('LinkedIn profile data:', profileData)

    // Fetch email address
    const emailResponse = await fetch('https://api.linkedin.com/v2/clientAwareMemberHandles?q=members&projection=(elements*(primary,type,handle~))', {
      headers: {
        'Authorization': `Bearer ${accessToken}`,
        'cache-control': 'no-cache'
      }
    })

    let emailData = null
    if (emailResponse.ok) {
      emailData = await emailResponse.json()
      console.log('LinkedIn email data:', emailData)
    } else {
      console.warn('Failed to fetch email data:', await emailResponse.text())
    }

    // Try to fetch positions (may require additional permissions)
    let positionsData = null
    try {
      const positionsResponse = await fetch(`https://api.linkedin.com/v2/positions?q=person&person=urn:li:person:${profileData.id}`, {
        headers: {
          'Authorization': `Bearer ${accessToken}`,
          'cache-control': 'no-cache'
        }
      })
      
      if (positionsResponse.ok) {
        positionsData = await positionsResponse.json()
        console.log('LinkedIn positions data:', positionsData)
      } else {
        console.warn('Failed to fetch positions:', await positionsResponse.text())
      }
    } catch (error) {
      console.warn('Positions API not accessible:', error)
    }

    // Extract email from the response
    let email = ''
    if (emailData?.elements?.length > 0) {
      const primaryEmail = emailData.elements.find(el => el.primary === true)
      email = primaryEmail?.['handle~']?.emailAddress || emailData.elements[0]?.['handle~']?.emailAddress || ''
    }

    // Format the data for our application
    const formattedData = {
      personalInfo: {
        fullName: `${profileData.localizedFirstName || ''} ${profileData.localizedLastName || ''}`.trim(),
        email: email,
        phone: '',
        location: '',
        linkedIn: `https://linkedin.com/in/${profileData.vanityName || profileData.id}`,
        portfolio: '',
        summary: profileData.localizedHeadline || ''
      },
      experience: positionsData?.elements?.map((position: any) => ({
        jobTitle: position.title || '',
        company: position.companyName || position.company?.name || '',
        location: '',
        startDate: position.startDate?.year?.toString() || '',
        endDate: position.endDate?.year?.toString() || '',
        current: !position.endDate,
        description: position.summary || ''
      })) || [],
      education: [],
      projects: [],
      skills: []
    }

    console.log('Formatted LinkedIn data:', formattedData)

    return new Response(
      JSON.stringify({ success: true, data: formattedData }),
      headers: {
        ...corsHeaders, 
        'Content-Type': 'application/json'
      },
    )
  } catch (error) {
    console.error('LinkedIn import error:', error)
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        status: 400,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      }
    )
  }
})

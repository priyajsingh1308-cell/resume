import { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Target,
  Users,
  Zap,
  Shield,
  Award,
  Heart,
  Linkedin,
} from "lucide-react";
import Header from "@/components/layout/Header";

export default function About() {
  const navigate = useNavigate();

  // Set page title
  useEffect(() => {
    document.title = "About Us | ResumeBuilder AI";
  }, []);

  // Intersection Observer for scroll animations
  const animateRefs = useRef<HTMLDivElement[]>([]);
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("opacity-100", "translate-y-0");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.2 }
    );

    animateRefs.current.forEach((el) => {
      if (el) observer.observe(el);
    });
  }, []);

  const setRef = (el: HTMLDivElement) => {
    if (el && !animateRefs.current.includes(el)) animateRefs.current.push(el);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <main className="container mx-auto px-4 py-12 space-y-20">
        {/* Mission */}
        <section
          ref={setRef}
          className="text-center space-y-4 opacity-0 translate-y-10 transition-all duration-700"
        >
          <h1 className="text-4xl font-bold">Our Mission</h1>
          <p className="text-xl text-gray-600 leading-relaxed max-w-3xl mx-auto">
            ResumeBuilder AI empowers professionals to create resumes that stand out.
            Using AI-powered insights and modern templates, we make your application
            shine effortlessly.
          </p>
        </section>

        {/* Vision, Innovation, Community */}
        <section
          ref={setRef}
          className="grid sm:grid-cols-1 md:grid-cols-3 gap-6 opacity-0 translate-y-10 transition-all duration-700"
        >
          <Card className="text-center p-6">
            <div className="mb-4 flex justify-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center">
                <Target className="h-8 w-8 text-blue-600" />
              </div>
            </div>
            <h3 className="text-xl font-semibold mb-2">Our Vision</h3>
            <p className="text-gray-600">
              To help every professional showcase their skills and land dream jobs with confidence.
            </p>
          </Card>

          <Card className="text-center p-6">
            <div className="mb-4 flex justify-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
                <Zap className="h-8 w-8 text-green-600" />
              </div>
            </div>
            <h3 className="text-xl font-semibold mb-2">Innovation</h3>
            <p className="text-gray-600">
              Continuously improving our AI tools and templates to provide the best resume-building experience.
            </p>
          </Card>

          <Card className="text-center p-6">
            <div className="mb-4 flex justify-center">
              <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center">
                <Users className="h-8 w-8 text-orange-600" />
              </div>
            </div>
            <h3 className="text-xl font-semibold mb-2">Community</h3>
            <p className="text-gray-600">
              Join thousands of professionals who trust our platform to grow their careers.
            </p>
          </Card>
        </section>

        {/* Why Choose Us */}
        <section
          ref={setRef}
          className="bg-white rounded-lg p-8 shadow-sm opacity-0 translate-y-10 transition-all duration-700"
        >
          <h2 className="text-3xl font-bold mb-6 text-center">Why Choose Us</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <Feature
              icon={<Shield className="h-6 w-6 text-blue-600" />}
              bgColor="bg-blue-100"
              title="Privacy & Security"
              description="We protect your data with encryption and never share it without consent."
            />
            <Feature
              icon={<Award className="h-6 w-6 text-green-600" />}
              bgColor="bg-green-100"
              title="Professional Templates"
              description="Access 35+ ATS-friendly, industry-specific templates to stand out."
            />
            <Feature
              icon={<Zap className="h-6 w-6 text-orange-600" />}
              bgColor="bg-orange-100"
              title="AI-Powered Tools"
              description="Enhance your content and optimize for job applications automatically."
            />
            <Feature
              icon={<Heart className="h-6 w-6 text-red-600" />}
              bgColor="bg-red-100"
              title="User-Friendly"
              description="Intuitive interface suitable for beginners and experienced professionals alike."
            />
          </div>
        </section>

        {/* Our Story */}
<section
  ref={setRef}
  className="text-center space-y-6 opacity-0 translate-y-10 transition-all duration-700"
>
  <h2 className="text-3xl font-bold">Our Story</h2>
  <div className="bg-white rounded-lg p-8 shadow-sm text-left space-y-4 max-w-3xl mx-auto">
    <p className="text-gray-700 leading-relaxed">
      We are two college students who shared a common vision: to make creating professional resumes
      simple, accessible, and effective for everyone. What started as a small idea in our college
      dorm has grown into a full-fledged platform that empowers job seekers to stand out.
    </p>
    <p className="text-gray-700 leading-relaxed">
      Over the last 8–9 months, we’ve been passionately working on this project — learning, building,
      and iterating every day. From designing templates to integrating AI-powered tools, every
      feature is a reflection of our commitment to making resume-building easier and more efficient.
    </p>
    <p className="text-gray-700 leading-relaxed">
      Our journey is still ongoing. We continue to improve the platform, add new features, and
      support professionals from all walks of life in achieving their career goals. This project
      is not just about resumes; it’s about enabling people to tell their stories confidently and
      land the opportunities they deserve.
    </p>
  </div>
</section>

        {/* Testimonials */}
        <section
          ref={setRef}
          className="space-y-10 opacity-0 translate-y-10 transition-all duration-700"
        >
          <h2 className="text-3xl font-bold text-center">Testimonials</h2>
          <div className="grid sm:grid-cols-1 md:grid-cols-3 gap-6">
            <Testimonial
              name="Jane Doe"
              role="UX Designer"
              content="ResumeBuilder AI made my job search effortless! I landed my dream role in just weeks."
              img="/images/jane.jpg"
            />
            <Testimonial
              name="John Smith"
              role="Software Engineer"
              content="The AI suggestions helped me optimize my resume for recruiters. Highly recommended!"
              img="/images/john.jpg"
            />
            <Testimonial
              name="Priya Patel"
              role="Marketing Specialist"
              content="Beautiful templates and intuitive interface. I finally feel confident sharing my resume."
              img="/images/priya.jpg"
            />
          </div>
        </section>

     {/* Developed By Section */}
<section
  ref={setRef}
  className="text-center space-y-6 opacity-0 translate-y-10 transition-all duration-700"
>
  <h2 className="text-3xl font-bold">Developed By</h2>
  <div className="grid sm:grid-cols-1 md:grid-cols-2 gap-6">
    {/* Ravikishan Singh */}
    <DeveloperCard
      img="/images/ravikishan.jpg" // replace with actual photo path
      name="Ravikishan Singh"
      role="Lead Developer"
      content="Responsible for all development, building the platform from the ground up using React, Tailwind, and AI integrations."
      linkedin="https://www.linkedin.com/in/ravikishan-singh"
    />

    {/* Kashish Singh */}
    <DeveloperCard
      img="/images/kashish.jpg" // replace with actual photo path
      name="Kashish Singh"
      role="Idea Creator & Planner"
      content="Conceptualized the project and designed its roadmap. Focused on planning, strategy, and user experience."
      linkedin="https://www.linkedin.com/in/kashish-singh"
    />
  </div>
</section>


        {/* CTA */}
        <section
          ref={setRef}
          className="text-center bg-blue-50 rounded-lg p-8 opacity-0 translate-y-10 transition-all duration-700"
        >
          <h2 className="text-2xl font-bold mb-4">Ready to Get Started?</h2>
          <p className="text-gray-600 mb-6">
            Join our community and create your professional resume today.
          </p>
          <Button onClick={() => navigate("/")} size="lg">
            Get Started
          </Button>
        </section>
      </main>
    </div>
  );
}

// Reusable Feature card
function Feature({ icon, bgColor, title, description }: any) {
  return (
    <div className="flex gap-4">
      <div className="flex-shrink-0">
        <div className={`w-12 h-12 ${bgColor} rounded-lg flex items-center justify-center`}>
          {icon}
        </div>
      </div>
      <div>
        <h3 className="font-semibold text-lg mb-2">{title}</h3>
        <p className="text-gray-600">{description}</p>
      </div>
    </div>
  );
}
function DeveloperCard({ img, name, role, content, linkedin }: any) {
  return (
    <div className="bg-white rounded-lg shadow-sm text-center p-6 hover:scale-105 hover:shadow-lg transition-transform duration-300">
      <img
        src={img}
        alt={name}
        className="w-24 h-24 mx-auto rounded-full object-cover mb-4"
      />
      <h3 className="text-xl font-semibold">{name}</h3>
      <p className="text-gray-600">{role}</p>
      <p className="text-sm text-gray-500 mb-4">{content}</p>
      <Button asChild size="sm" className="inline-flex items-center gap-2">
        <a href={linkedin} target="_blank" rel="noopener noreferrer">
          <Linkedin className="h-4 w-4" />
          LinkedIn
        </a>
      </Button>
    </div>
  );
}

// Testimonial card
function Testimonial({ img, name, role, content }: any) {
  return (
    <div className="bg-white rounded-lg shadow-sm p-6 text-center hover:shadow-lg transition-shadow duration-300">
      <img
        src={img}
        alt={name}
        className="w-20 h-20 mx-auto rounded-full object-cover mb-4"
      />
      <p className="text-gray-700 italic mb-2">"{content}"</p>
      <h4 className="font-semibold">{name}</h4>
      <p className="text-gray-500 text-sm">{role}</p>
    </div>
  );
}

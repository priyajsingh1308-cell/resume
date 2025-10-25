
import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { FileText, Edit, Download, Trash2, Plus } from "lucide-react";

interface Resume {
  id: string;
  name: string;
  lastModified: string;
  status: 'draft' | 'completed';
  data: any;
}

interface ResumeManagerProps {
  onCreateNew: () => void;
  onEditResume: (resume: Resume) => void;
  onDownloadResume: (resume: Resume) => void;
}

const ResumeManager = ({ onCreateNew, onEditResume, onDownloadResume }: ResumeManagerProps) => {
  const [resumes, setResumes] = useState<Resume[]>([
    {
      id: '1',
      name: 'Software Developer Resume',
      lastModified: '2024-06-10',
      status: 'completed',
      data: {
        personalInfo: { fullName: 'John Doe' },
        experience: [],
        education: [],
        projects: [],
        skills: []
      }
    },
    {
      id: '2',
      name: 'Marketing Manager Resume',
      lastModified: '2024-06-08',
      status: 'draft',
      data: {
        personalInfo: { fullName: 'Jane Smith' },
        experience: [],
        education: [],
        projects: [],
        skills: []
      }
    }
  ]);

  const handleDelete = (id: string) => {
    setResumes(resumes.filter(resume => resume.id !== id));
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-900">My Resumes</h2>
        <Button onClick={onCreateNew} className="flex items-center space-x-2">
          <Plus className="w-4 h-4" />
          <span>Create New Resume</span>
        </Button>
      </div>

      {resumes.length === 0 ? (
        <Card className="p-12 text-center">
          <div className="flex flex-col items-center space-y-4">
            <FileText className="w-16 h-16 text-gray-400" />
            <h3 className="text-xl font-semibold text-gray-600">No resumes yet</h3>
            <p className="text-gray-500">Create your first resume to get started</p>
            <Button onClick={onCreateNew} className="mt-4">
              <Plus className="w-4 h-4 mr-2" />
              Create Resume
            </Button>
          </div>
        </Card>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {resumes.map((resume) => (
            <Card key={resume.id} className="hover:shadow-lg transition-shadow">
              <CardHeader className="pb-4">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <CardTitle className="text-lg mb-2">{resume.name}</CardTitle>
                    <div className="flex items-center space-x-2">
                      <Badge variant={resume.status === 'completed' ? 'default' : 'secondary'}>
                        {resume.status}
                      </Badge>
                      <span className="text-sm text-gray-500">
                        Modified {resume.lastModified}
                      </span>
                    </div>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleDelete(resume.id)}
                    className="text-red-500 hover:text-red-700"
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="pt-0">
                <div className="flex space-x-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => onEditResume(resume)}
                    className="flex-1"
                  >
                    <Edit className="w-4 h-4 mr-1" />
                    Edit
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => onDownloadResume(resume)}
                    className="flex-1"
                  >
                    <Download className="w-4 h-4 mr-1" />
                    Download
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default ResumeManager;

'use client'

import { useState, useCallback } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { PreviewPane } from './components/PreviewPane'
import { SpecEditor } from './components/SpecEditor'
import { generateFilesClient } from '@/lib/generate-files-client'
import { TemplateInput } from '@/lib/schemas'

export default function ClientDashboard() {
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [projectName, setProjectName] = useState('')
  const [projectDescription, setProjectDescription] = useState('')
  const [isCreating, setIsCreating] = useState(false)
  const [previewFiles, setPreviewFiles] = useState<Record<string,string>>({})
  const [framework, setFramework] = useState('React')
  const [featureList, setFeatureList] = useState('hero section, features, and contact form')

  async function handleGenerateTemplate() {
    const code = await fetch("/api/generate-template", {
      method:"POST",
      headers:{ "content-type":"application/json" },
      body: JSON.stringify({ prompt:`Create a ${framework} landing page with ${featureList}` })
    }).then(r=>r.text())
    setPreviewFiles({ "/App.tsx": code })
  }

  async function handlePreview(spec: TemplateInput) {
    try {
      const res = await fetch("/api/preview/vercel", {
        method: "POST", 
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ 
          files: await generateFilesClient(spec), 
          name: spec.name 
        })
      });
      const { previewUrl } = await res.json();
      
      if (previewUrl) {
        // Show success message
        alert(`✅ Preview deployed! Opening ${previewUrl}`);
        window.open(previewUrl, "_blank");
      } else {
        alert("❌ Failed to deploy preview");
      }
    } catch (error) {
      console.error("Preview error:", error);
      alert("❌ Error deploying preview");
    }
  }

  async function handleDownload(spec: TemplateInput) {
    try {
      const res = await fetch("/api/build", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(spec)
      });

      if (res.ok) {
        const blob = await res.blob();
        const url = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = `${spec.name}-starter.zip`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
        alert("✅ Project downloaded successfully!");
      } else {
        alert("❌ Failed to generate project");
      }
    } catch (error) {
      console.error("Download error:", error);
      alert("❌ Error generating project");
    }
  }

  async function handleDeploy(spec: TemplateInput) {
    try {
      // First run quality gates
      const lintRes = await fetch("/api/lint", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(spec)
      });
      
      const lintResult = await lintRes.json();
      
      if (!lintResult.success) {
        alert(`❌ Quality gates failed. ${lintResult.summary.totalErrors} errors found. Please fix them before deploying.`);
        return;
      }
      
      // If quality gates pass, deploy
      const res = await fetch("/api/preview/vercel", {
        method: "POST", 
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ 
          files: await generateFilesClient(spec), 
          name: spec.name 
        })
      });
      const { previewUrl } = await res.json();
      
      if (previewUrl) {
        alert(`✅ Quality gates passed! Deployed to ${previewUrl}`);
        window.open(previewUrl, "_blank");
      } else {
        alert("❌ Failed to deploy");
      }
    } catch (error) {
      console.error("Deploy error:", error);
      alert("❌ Error during deployment");
    }
  }

  const handleSpecChange = useCallback((spec: TemplateInput) => {
    // Handle spec changes if needed
    console.log('Spec changed:', spec);
  }, []);

  const handleCreateProject = async () => {
    if (!projectName.trim()) return
    
    setIsCreating(true)
    try {
      // Create a project spec from the form data
      const spec: TemplateInput = {
        name: projectName,
        description: projectDescription,
        stack: "next-tailwind",
        features: [],
        theme: {},
        pages: [{ route: "/", purpose: "Homepage" }],
        assets: []
      }
      
      // Generate the project files
      const files = await generateFilesClient(spec)
      
      // Build the project as ZIP
      const res = await fetch("/api/build", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(spec)
      })

      if (res.ok) {
        const blob = await res.blob()
        const url = URL.createObjectURL(blob)
        const a = document.createElement("a")
        a.href = url
        a.download = `${projectName}-starter.zip`
        document.body.appendChild(a)
        a.click()
        document.body.removeChild(a)
        URL.revokeObjectURL(url)
        
        // Show success message
        alert(`✅ Project "${projectName}" generated and downloaded successfully!`)
        
        // Reset form and close dialog
        setProjectName('')
        setProjectDescription('')
        setIsDialogOpen(false)
      } else {
        alert("❌ Failed to generate project")
      }
    } catch (error) {
      console.error('Failed to create project:', error)
      alert(`❌ Error creating project: ${error instanceof Error ? error.message : 'Unknown error'}`)
    } finally {
      setIsCreating(false)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8 relative z-10">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
            <p className="text-gray-600">Manage your projects and applications</p>
          </div>
          
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button>New Project</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle>Create New Project</DialogTitle>
                <DialogDescription>
                  Start a new project by providing some basic information.
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid gap-2">
                  <Label htmlFor="project-name">Project Name</Label>
                  <Input
                    id="project-name"
                    value={projectName}
                    onChange={(e) => setProjectName(e.target.value)}
                    placeholder="Enter project name"
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="project-description">Description</Label>
                  <Textarea
                    id="project-description"
                    value={projectDescription}
                    onChange={(e) => setProjectDescription(e.target.value)}
                    placeholder="Enter project description"
                    rows={3}
                  />
                </div>
              </div>
              <DialogFooter>
                <Button variant="secondary" onClick={() => setIsDialogOpen(false)}>
                  Cancel
                </Button>
                <Button 
                  onClick={handleCreateProject} 
                  disabled={!projectName.trim() || isCreating}
                >
                  {isCreating ? 'Creating...' : 'Create'}
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>

        <div className="grid gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Recent Projects</CardTitle>
              <CardDescription>
                Your recently created and modified projects
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-center py-8 text-gray-500">
                <p>No projects yet. Create your first project to get started!</p>
              </div>
            </CardContent>
          </Card>

          <div className="grid md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
                <CardDescription>
                  Common tasks and shortcuts
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-2">
                <Button 
                  variant="outline" 
                  className="w-full justify-start cursor-pointer pointer-events-auto"
                  onClick={() => alert('Import Project feature coming soon!')}
                >
                  Import Project
                </Button>
                <Button 
                  variant="outline" 
                  className="w-full justify-start cursor-pointer pointer-events-auto"
                  onClick={() => window.open('https://github.com/drive-labs/templates', '_blank')}
                >
                  View Templates
                </Button>
                <Button 
                  variant="outline" 
                  className="w-full justify-start cursor-pointer pointer-events-auto"
                  onClick={() => alert('Settings page coming soon!')}
                >
                  Settings
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Getting Started</CardTitle>
                <CardDescription>
                  Learn how to use Drive Labs
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-2">
                <Button 
                  variant="outline" 
                  className="w-full justify-start cursor-pointer pointer-events-auto"
                  onClick={() => window.open('/docs', '_blank')}
                >
                  Documentation
                </Button>
                <Button 
                  variant="outline" 
                  className="w-full justify-start cursor-pointer pointer-events-auto"
                  onClick={() => window.open('/examples', '_blank')}
                >
                  Examples
                </Button>
                <Button 
                  variant="outline" 
                  className="w-full justify-start cursor-pointer pointer-events-auto"
                  onClick={() => window.open('mailto:support@drivelabs.ai', '_blank')}
                >
                  Support
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>

        <div className="mt-8">
          <SpecEditor
            onSpecChange={handleSpecChange}
            onPreview={handlePreview}
            onDownload={handleDownload}
            onDeploy={handleDeploy}
          />
        </div>

        {Object.keys(previewFiles).length > 0 && (
          <div className="mt-8">
            <Card>
              <CardHeader>
                <CardTitle>Generated Code Preview</CardTitle>
                <CardDescription>
                  Interactive code playground
                </CardDescription>
              </CardHeader>
              <CardContent>
                <PreviewPane files={previewFiles} />
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </div>
  )
}


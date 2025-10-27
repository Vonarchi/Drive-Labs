"use client"
import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Checkbox } from "@/components/ui/checkbox"
import { TemplateInputZ, type TemplateInput } from "@/lib/schemas"
import { generateFilesClient } from "@/lib/generate-files-client"

interface SpecEditorProps {
  onSpecChange: (spec: TemplateInput) => void
  onPreview: (spec: TemplateInput) => void
  onDownload: (spec: TemplateInput) => void
  onDeploy: (spec: TemplateInput) => void
}

export function SpecEditor({ onSpecChange, onPreview, onDownload, onDeploy }: SpecEditorProps) {
  const [spec, setSpec] = useState<TemplateInput>({
    name: "My Awesome App",
    description: "A modern web application",
    stack: "next-tailwind",
    features: [],
    theme: {},
    pages: [{ route: "/", purpose: "Homepage" }],
    assets: []
  })

  const [errors, setErrors] = useState<string[]>([])
  const [isValid, setIsValid] = useState(true)
  const [previewFiles, setPreviewFiles] = useState<Record<string, string>>({})

  // Live validation - proper schema validation
  useEffect(() => {
    try {
      const validationResult = TemplateInputZ.safeParse(spec);
      
      if (validationResult.success) {
        setIsValid(true);
        setErrors([]);
        onSpecChange(spec);
      } else {
        setIsValid(false);
        setErrors(validationResult.error.errors.map(e => `${e.path.join('.')}: ${e.message}`));
      }
    } catch (error: any) {
      console.log('Error in onSpecChange:', error);
      setIsValid(false);
      setErrors([error.message || 'Validation error']);
    }
  }, [spec, onSpecChange])

  // Generate preview files
  useEffect(() => {
    if (isValid) {
      try {
        generateFilesClient(spec as TemplateInput)
          .then(files => {
            console.log('Generated preview files:', Object.keys(files).length, 'files');
            setPreviewFiles(files);
          })
          .catch(error => {
            console.error('Error generating preview files:', error);
            setPreviewFiles({});
          });
      } catch (error) {
        console.error('Error in generateFilesClient:', error);
        setPreviewFiles({});
      }
    } else {
      setPreviewFiles({});
    }
  }, [spec, isValid])

  const updateSpec = (updates: Partial<TemplateInput>) => {
    setSpec(prev => ({ ...prev, ...updates }))
  }

  const toggleFeature = (feature: string) => {
    const currentFeatures = spec.features || []
    const newFeatures = currentFeatures.includes(feature)
      ? currentFeatures.filter(f => f !== feature)
      : [...currentFeatures, feature]
    updateSpec({ features: newFeatures })
  }

  const addPage = () => {
    const newPages = [...(spec.pages || []), { route: "/new-page", purpose: "New page" }]
    updateSpec({ pages: newPages })
  }

  const updatePage = (index: number, updates: Partial<{ route: string; purpose: string }>) => {
    const newPages = [...(spec.pages || [])]
    newPages[index] = { ...newPages[index], ...updates }
    updateSpec({ pages: newPages })
  }

  const removePage = (index: number) => {
    const newPages = (spec.pages || []).filter((_, i) => i !== index)
    updateSpec({ pages: newPages })
  }

  const availableFeatures = [
    "auth", "stripe", "supabase", "seo", "og", "forms", "email", "i18n"
  ]

  const stacks = [
    { value: "next-tailwind", label: "Next.js + Tailwind" },
    { value: "next-shadcn", label: "Next.js + shadcn/ui" },
    { value: "remix", label: "Remix" }
  ]

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* Spec Editor */}
      <Card>
        <CardHeader>
          <CardTitle>Project Specification</CardTitle>
          <CardDescription>
            Configure your project with live validation
            {isValid && <Badge className="ml-2" variant="secondary">✓ Valid</Badge>}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="basic" className="w-full">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="basic">Basic</TabsTrigger>
              <TabsTrigger value="features">Features</TabsTrigger>
              <TabsTrigger value="pages">Pages</TabsTrigger>
              <TabsTrigger value="theme">Theme</TabsTrigger>
            </TabsList>

            <TabsContent value="basic" className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">Project Name</Label>
                <Input
                  id="name"
                  value={spec.name || ""}
                  onChange={(e) => updateSpec({ name: e.target.value })}
                  placeholder="My Awesome App"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  value={spec.description || ""}
                  onChange={(e) => updateSpec({ description: e.target.value })}
                  placeholder="A modern web application"
                  rows={3}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="stack">Stack</Label>
                <select
                  id="stack"
                  value={spec.stack || "next-tailwind"}
                  onChange={(e) => updateSpec({ stack: e.target.value as any })}
                  className="w-full p-2 border rounded-md"
                >
                  {stacks.map(stack => (
                    <option key={stack.value} value={stack.value}>
                      {stack.label}
                    </option>
                  ))}
                </select>
              </div>
            </TabsContent>

            <TabsContent value="features" className="space-y-4">
              <div className="space-y-2">
                <Label>Features</Label>
                <div className="grid grid-cols-2 gap-2">
                  {availableFeatures.map(feature => (
                    <div key={feature} className="flex items-center space-x-2">
                      <Checkbox
                        id={feature}
                        checked={spec.features?.includes(feature) || false}
                        onCheckedChange={() => toggleFeature(feature)}
                      />
                      <Label htmlFor={feature} className="text-sm">
                        {feature.charAt(0).toUpperCase() + feature.slice(1)}
                      </Label>
                    </div>
                  ))}
                </div>
              </div>
            </TabsContent>

            <TabsContent value="pages" className="space-y-4">
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <Label>Pages</Label>
                  <Button onClick={addPage} size="sm">Add Page</Button>
                </div>
                <div className="space-y-2">
                  {(spec.pages || []).map((page, index) => (
                    <div key={index} className="flex gap-2 items-center">
                      <Input
                        value={page.route}
                        onChange={(e) => updatePage(index, { route: e.target.value })}
                        placeholder="/route"
                        className="flex-1"
                      />
                      <Input
                        value={page.purpose}
                        onChange={(e) => updatePage(index, { purpose: e.target.value })}
                        placeholder="Purpose"
                        className="flex-1"
                      />
                      <Button
                        onClick={() => removePage(index)}
                        variant="outline"
                        size="sm"
                      >
                        ×
                      </Button>
                    </div>
                  ))}
                </div>
              </div>
            </TabsContent>

            <TabsContent value="theme" className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="primary">Primary Color</Label>
                <div className="flex gap-2">
                  <Input
                    id="primary"
                    value={spec.theme?.primary || ""}
                    onChange={(e) => updateSpec({ 
                      theme: { ...spec.theme, primary: e.target.value }
                    })}
                    placeholder="#3B82F6"
                  />
                  <input
                    type="color"
                    value={spec.theme?.primary || "#3B82F6"}
                    onChange={(e) => updateSpec({ 
                      theme: { ...spec.theme, primary: e.target.value }
                    })}
                    className="w-12 h-10 border rounded"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="accent">Accent Color</Label>
                <div className="flex gap-2">
                  <Input
                    id="accent"
                    value={spec.theme?.accent || ""}
                    onChange={(e) => updateSpec({ 
                      theme: { ...spec.theme, accent: e.target.value }
                    })}
                    placeholder="#10B981"
                  />
                  <input
                    type="color"
                    value={spec.theme?.accent || "#10B981"}
                    onChange={(e) => updateSpec({ 
                      theme: { ...spec.theme, accent: e.target.value }
                    })}
                    className="w-12 h-10 border rounded"
                  />
                </div>
              </div>
            </TabsContent>
          </Tabs>

          {errors.length > 0 && (
            <div className="mt-4 p-3 bg-red-50 border border-red-200 rounded-md">
              <h4 className="text-sm font-medium text-red-800 mb-2">Validation Errors:</h4>
              <ul className="text-sm text-red-700 space-y-1">
                {errors.map((error, index) => (
                  <li key={index}>• {error}</li>
                ))}
              </ul>
            </div>
          )}

          <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-2">
            <Button 
              onClick={() => onPreview(spec as TemplateInput)} 
              disabled={!isValid}
              variant="secondary"
              className="w-full"
            >
              🚀 Live Preview
            </Button>
            <Button 
              onClick={() => onDownload(spec as TemplateInput)} 
              disabled={!isValid}
              variant="outline"
              className="w-full"
            >
              📦 Download ZIP
            </Button>
            <Button 
              onClick={() => onDeploy(spec as TemplateInput)} 
              disabled={!isValid}
              variant="default"
              className="w-full"
            >
              🚀 Deploy Now
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Live Preview */}
      <Card>
        <CardHeader>
          <CardTitle>Live Preview</CardTitle>
          <CardDescription>
            Real-time preview of your generated project
          </CardDescription>
        </CardHeader>
        <CardContent>
          {isValid && Object.keys(previewFiles).length > 0 ? (
            <div className="h-96 border rounded-md overflow-hidden">
              <iframe
                srcDoc={`
                  <!DOCTYPE html>
                  <html>
                    <head>
                      <script src="https://cdn.tailwindcss.com"></script>
                      <style>
                        body { margin: 0; font-family: system-ui, sans-serif; }
                        .container { max-width: 1200px; margin: 0 auto; padding: 1rem; }
                      </style>
                    </head>
                    <body>
                      <div class="container">
                        <h1 class="text-4xl font-bold mb-4">${spec.name}</h1>
                        <p class="text-lg text-gray-600 mb-8">${spec.description}</p>
                        <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
                          ${(spec.features || []).map(feature => 
                            `<div class="p-4 border rounded-lg">
                              <h3 class="font-semibold">${feature.charAt(0).toUpperCase() + feature.slice(1)}</h3>
                            </div>`
                          ).join('')}
                        </div>
                      </div>
                    </body>
                  </html>
                `}
                className="w-full h-full"
                title="Live Preview"
              />
            </div>
          ) : (
            <div className="h-96 flex items-center justify-center text-gray-500">
              {!isValid ? "Fix validation errors to see preview" : "Generating preview..."}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}

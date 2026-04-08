import { useState, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { 
  Loader2, 
  Sparkles, 
  AlertCircle, 
  CheckCircle,
  Palette,
  Layout,
  Accessibility,
  Zap,
  Image as ImageIcon,
  X
} from 'lucide-react';

interface Improvement {
  issue: string;
  solution: string;
  tailwindClasses: string;
  priority: 'high' | 'medium' | 'low';
}

interface QuickWin {
  change: string;
  impact: string;
  implementation: string;
}

interface AnalysisResult {
  overallAssessment: string;
  improvements: Improvement[];
  colorTypography: {
    issues: string[];
    recommendations: string[];
  };
  spacingLayout: {
    issues: string[];
    recommendations: string[];
  };
  accessibility: {
    issues: string[];
    fixes: string[];
  };
  quickWins: QuickWin[];
}

interface AnalysisResponse {
  success: boolean;
  pageName: string;
  analysis: AnalysisResult;
  analyzedAt: string;
}

export function DesignAudit() {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [imageMimeType, setImageMimeType] = useState<string>('');
  const [pageName, setPageName] = useState('');
  const [analyzing, setAnalyzing] = useState(false);
  const [error, setError] = useState('');
  const [result, setResult] = useState<AnalysisResponse | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 4 * 1024 * 1024) {
      setError('Image too large. Please upload an image smaller than 4MB.');
      return;
    }

    const allowedTypes = ['image/png', 'image/jpeg', 'image/webp', 'image/gif'];
    if (!allowedTypes.includes(file.type)) {
      setError('Invalid image type. Please upload PNG, JPEG, WebP, or GIF.');
      return;
    }

    setError('');
    setImageMimeType(file.type);

    const reader = new FileReader();
    reader.onload = (event) => {
      const dataUrl = event.target?.result as string;
      setSelectedImage(dataUrl);
    };
    reader.readAsDataURL(file);
  };

  const handleAnalyze = async () => {
    if (!selectedImage) {
      setError('Please select an image first');
      return;
    }

    setAnalyzing(true);
    setError('');
    setResult(null);

    try {
      const base64Data = selectedImage.split(',')[1];

      const response = await fetch('/api/analyze-design', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          image: {
            data: base64Data,
            mimeType: imageMimeType
          },
          pageName: pageName || 'Uploaded Screenshot'
        })
      });

      const responseText = await response.text();
      let data;
      try {
        data = JSON.parse(responseText);
      } catch {
        console.error('Non-JSON response:', responseText.substring(0, 200));
        throw new Error(responseText.substring(0, 100) || 'Server returned an invalid response');
      }

      if (!response.ok) {
        throw new Error(data.error || data.details || 'Failed to analyze design');
      }

      if (data.success) {
        setResult(data);
      } else {
        throw new Error(data.error || 'Invalid response from AI');
      }
    } catch (err) {
      console.error('Design Analysis Error:', err);
      setError(err instanceof Error ? err.message : 'Failed to analyze design');
    } finally {
      setAnalyzing(false);
    }
  };

  const clearImage = () => {
    setSelectedImage(null);
    setImageMimeType('');
    setResult(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'bg-red-100 text-red-800 border-red-200';
      case 'medium': return 'bg-amber-100 text-amber-800 border-amber-200';
      case 'low': return 'bg-green-100 text-green-800 border-green-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  return (
    <div className="space-y-6">
      <Card className="bg-gradient-to-r from-purple-50 to-indigo-50 border-purple-200">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Sparkles className="h-5 w-5 text-purple-600" />
            AI-Powered Design Auditor
          </CardTitle>
          <CardDescription>
            Upload a screenshot of any page and get AI-powered UI/UX feedback with specific Tailwind CSS improvements
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label>Page Name (Optional)</Label>
              <Input
                value={pageName}
                onChange={(e) => setPageName(e.target.value)}
                placeholder="e.g., Mock Test Interface, Dashboard..."
                disabled={analyzing}
              />
            </div>
            <div>
              <Label>Screenshot</Label>
              <div className="flex gap-2">
                <Input
                  ref={fileInputRef}
                  type="file"
                  accept="image/png,image/jpeg,image/webp,image/gif"
                  onChange={handleFileSelect}
                  disabled={analyzing}
                  className="flex-1"
                />
                {selectedImage && (
                  <Button variant="outline" size="icon" onClick={clearImage} disabled={analyzing}>
                    <X className="h-4 w-4" />
                  </Button>
                )}
              </div>
            </div>
          </div>

          {selectedImage && (
            <div className="border rounded-lg p-4 bg-white">
              <Label className="mb-2 block">Preview</Label>
              <div className="relative max-h-64 overflow-hidden rounded-lg border">
                <img loading="lazy" 
                  src={selectedImage} 
                  alt="Selected screenshot" 
                  className="w-full h-auto object-contain max-h-64"
                />
              </div>
            </div>
          )}

          {error && (
            <Alert className="bg-red-50 border-red-200">
              <AlertCircle className="h-4 w-4 text-red-600" />
              <AlertDescription className="text-red-800">{error}</AlertDescription>
            </Alert>
          )}

          <Button
            onClick={handleAnalyze}
            disabled={analyzing || !selectedImage}
            className="w-full bg-purple-600 hover:bg-purple-700"
          >
            {analyzing ? (
              <>
                <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                Analyzing Design with Gemini Vision...
              </>
            ) : (
              <>
                <Sparkles className="h-4 w-4 mr-2" />
                Analyze Design
              </>
            )}
          </Button>
        </CardContent>
      </Card>

      {result && (
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <CheckCircle className="h-5 w-5 text-green-600" />
                Analysis Results: {result.pageName}
              </CardTitle>
              <CardDescription>
                Analyzed at {new Date(result.analyzedAt).toLocaleString()}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="p-4 bg-gray-50 rounded-lg">
                <h4 className="font-semibold mb-2">Overall Assessment</h4>
                <p className="text-gray-700">{result.analysis.overallAssessment}</p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Zap className="h-5 w-5 text-amber-500" />
                Quick Wins
              </CardTitle>
              <CardDescription>
                Easy changes that would make the biggest impact
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {result.analysis.quickWins.map((win, index) => (
                  <div key={index} className="border rounded-lg p-4 bg-amber-50 border-amber-200">
                    <h4 className="font-semibold text-amber-900">{win.change}</h4>
                    <p className="text-sm text-amber-800 mt-1"><strong>Impact:</strong> {win.impact}</p>
                    <p className="text-sm text-amber-700 mt-1"><strong>How:</strong> {win.implementation}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Layout className="h-5 w-5 text-blue-500" />
                CSS/Tailwind Improvements
              </CardTitle>
              <CardDescription>
                Specific improvements with exact Tailwind classes
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {result.analysis.improvements.map((improvement, index) => (
                  <div key={index} className="border rounded-lg p-4">
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <Badge className={getPriorityColor(improvement.priority)}>
                            {improvement.priority}
                          </Badge>
                        </div>
                        <h4 className="font-semibold text-red-700">Issue: {improvement.issue}</h4>
                        <p className="text-sm text-gray-700 mt-1"><strong>Solution:</strong> {improvement.solution}</p>
                        <div className="mt-2 p-2 bg-gray-900 rounded text-green-400 font-mono text-sm overflow-x-auto">
                          {improvement.tailwindClasses}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Palette className="h-5 w-5 text-pink-500" />
                  Color & Typography
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h4 className="font-semibold text-red-700 mb-2">Issues</h4>
                  <ul className="list-disc list-inside space-y-1 text-sm text-gray-700">
                    {result.analysis.colorTypography.issues.map((issue, i) => (
                      <li key={i}>{issue}</li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold text-green-700 mb-2">Recommendations</h4>
                  <ul className="list-disc list-inside space-y-1 text-sm text-gray-700">
                    {result.analysis.colorTypography.recommendations.map((rec, i) => (
                      <li key={i}>{rec}</li>
                    ))}
                  </ul>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <ImageIcon className="h-5 w-5 text-indigo-500" />
                  Spacing & Layout
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h4 className="font-semibold text-red-700 mb-2">Issues</h4>
                  <ul className="list-disc list-inside space-y-1 text-sm text-gray-700">
                    {result.analysis.spacingLayout.issues.map((issue, i) => (
                      <li key={i}>{issue}</li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold text-green-700 mb-2">Recommendations</h4>
                  <ul className="list-disc list-inside space-y-1 text-sm text-gray-700">
                    {result.analysis.spacingLayout.recommendations.map((rec, i) => (
                      <li key={i}>{rec}</li>
                    ))}
                  </ul>
                </div>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Accessibility className="h-5 w-5 text-teal-500" />
                Accessibility
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <h4 className="font-semibold text-red-700 mb-2">Issues Found</h4>
                  <ul className="list-disc list-inside space-y-1 text-sm text-gray-700">
                    {result.analysis.accessibility.issues.map((issue, i) => (
                      <li key={i}>{issue}</li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold text-green-700 mb-2">How to Fix</h4>
                  <ul className="list-disc list-inside space-y-1 text-sm text-gray-700">
                    {result.analysis.accessibility.fixes.map((fix, i) => (
                      <li key={i}>{fix}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
}

import { useState, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { 
  Award, 
  Download, 
  Share2, 
  CheckCircle2,
  Calendar,
  BookOpen,
  Target,
  Sparkles
} from 'lucide-react';
import { useProgress } from '@/contexts/ProgressContext';
import { useAuth } from '@/contexts/AuthContext';

interface CertificateData {
  name: string;
  completionDate: string;
  lessonsCompleted: number;
  quizzesCompleted: number;
  estimatedBand: string;
  certificateId: string;
}

export default function CertificatePage() {
  const { user } = useAuth();
  const { getCompletedLessonsCount, quizAttempts } = useProgress();
  const completedLessonsCount = getCompletedLessonsCount();
  const [name, setName] = useState(user?.email?.split('@')[0] || '');
  const [showCertificate, setShowCertificate] = useState(false);
  const certificateRef = useRef<HTMLDivElement>(null);

  const generateCertificateId = () => {
    return `IELTS-${Date.now().toString(36).toUpperCase()}-${Math.random().toString(36).substring(2, 6).toUpperCase()}`;
  };

  const getEstimatedBand = () => {
    if (quizAttempts.length === 0) return '5.0';
    const avgScore = quizAttempts.reduce((sum, a) => sum + (a.score / a.total) * 100, 0) / quizAttempts.length;
    if (avgScore >= 90) return '8.0-9.0';
    if (avgScore >= 80) return '7.5-8.0';
    if (avgScore >= 70) return '7.0-7.5';
    if (avgScore >= 60) return '6.5-7.0';
    if (avgScore >= 50) return '6.0-6.5';
    return '5.5-6.0';
  };

  const certificateData: CertificateData = {
    name: name || 'Student',
    completionDate: new Date().toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    }),
    lessonsCompleted: completedLessonsCount,
    quizzesCompleted: quizAttempts.length,
    estimatedBand: getEstimatedBand(),
    certificateId: generateCertificateId()
  };

  const handleGenerateCertificate = () => {
    if (!name.trim()) return;
    setShowCertificate(true);
  };

  const handleDownload = () => {
    if (!certificateRef.current) return;
    
    const certificateHtml = `
      <!DOCTYPE html>
      <html>
      <head>
        <title>IELTS Tree Certificate - ${certificateData.name}</title>
        <style>
          @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;700&family=Inter:wght@400;500;600&display=swap');
          
          * { margin: 0; padding: 0; box-sizing: border-box; }
          
          body {
            font-family: 'Inter', sans-serif;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            min-height: 100vh;
            display: flex;
            align-items: center;
            justify-content: center;
            padding: 40px;
          }
          
          .certificate {
            background: white;
            width: 800px;
            padding: 60px;
            border-radius: 20px;
            box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
            position: relative;
            overflow: hidden;
          }
          
          .certificate::before {
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            height: 8px;
            background: linear-gradient(90deg, #667eea, #764ba2);
          }
          
          .header {
            text-align: center;
            margin-bottom: 40px;
          }
          
          .logo {
            font-size: 24px;
            font-weight: 700;
            color: #667eea;
            margin-bottom: 20px;
          }
          
          .title {
            font-family: 'Playfair Display', serif;
            font-size: 36px;
            color: #1a1a1a;
            margin-bottom: 10px;
          }
          
          .subtitle {
            color: #666;
            font-size: 16px;
          }
          
          .recipient {
            text-align: center;
            margin: 40px 0;
          }
          
          .recipient-label {
            color: #666;
            font-size: 14px;
            margin-bottom: 10px;
          }
          
          .recipient-name {
            font-family: 'Playfair Display', serif;
            font-size: 42px;
            color: #1a1a1a;
            border-bottom: 2px solid #667eea;
            display: inline-block;
            padding-bottom: 10px;
          }
          
          .achievement {
            text-align: center;
            margin: 30px 0;
            color: #444;
            line-height: 1.8;
          }
          
          .stats {
            display: flex;
            justify-content: center;
            gap: 40px;
            margin: 40px 0;
          }
          
          .stat {
            text-align: center;
          }
          
          .stat-value {
            font-size: 28px;
            font-weight: 700;
            color: #667eea;
          }
          
          .stat-label {
            font-size: 12px;
            color: #666;
            margin-top: 5px;
          }
          
          .band-score {
            text-align: center;
            margin: 30px 0;
            padding: 20px;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            border-radius: 10px;
            color: white;
          }
          
          .band-label {
            font-size: 14px;
            opacity: 0.9;
          }
          
          .band-value {
            font-size: 36px;
            font-weight: 700;
          }
          
          .footer {
            display: flex;
            justify-content: space-between;
            align-items: flex-end;
            margin-top: 40px;
            padding-top: 20px;
            border-top: 1px solid #eee;
          }
          
          .date {
            color: #666;
            font-size: 14px;
          }
          
          .certificate-id {
            color: #999;
            font-size: 12px;
          }
        </style>
      </head>
      <body>
        <div class="certificate">
          <div class="header">
            <div class="logo">IELTS Tree</div>
            <h1 class="title">Certificate of Achievement</h1>
            <p class="subtitle">IELTS Preparation Program</p>
          </div>
          
          <div class="recipient">
            <p class="recipient-label">This is to certify that</p>
            <h2 class="recipient-name">${certificateData.name}</h2>
          </div>
          
          <p class="achievement">
            has successfully completed the IELTS preparation program at IELTS Tree,<br>
            demonstrating dedication and commitment to English language proficiency.
          </p>
          
          <div class="stats">
            <div class="stat">
              <div class="stat-value">${certificateData.lessonsCompleted}</div>
              <div class="stat-label">Lessons Completed</div>
            </div>
            <div class="stat">
              <div class="stat-value">${certificateData.quizzesCompleted}</div>
              <div class="stat-label">Quizzes Completed</div>
            </div>
          </div>
          
          <div class="band-score">
            <div class="band-label">Estimated Band Score</div>
            <div class="band-value">${certificateData.estimatedBand}</div>
          </div>
          
          <div class="footer">
            <div class="date">
              <strong>Date of Completion</strong><br>
              ${certificateData.completionDate}
            </div>
            <div class="certificate-id">
              Certificate ID: ${certificateData.certificateId}
            </div>
          </div>
        </div>
      </body>
      </html>
    `;

    const blob = new Blob([certificateHtml], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `IELTS_Certificate_${certificateData.name.replace(/\s+/g, '_')}.html`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const handleShare = async () => {
    const shareText = `I just earned my IELTS Tree Certificate! Completed ${certificateData.lessonsCompleted} lessons and ${certificateData.quizzesCompleted} quizzes with an estimated band score of ${certificateData.estimatedBand}. #IELTS #EnglishLearning`;
    
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'IELTS Tree Certificate',
          text: shareText,
          url: 'https://www.ieltstree.com'
        });
      } catch (err) {
        console.log('Share cancelled');
      }
    } else {
      navigator.clipboard.writeText(shareText);
      alert('Share text copied to clipboard!');
    }
  };

  const canGenerateCertificate = completedLessonsCount >= 5 || quizAttempts.length >= 3;

  return (
    <div className="min-h-screen bg-gradient-to-b from-amber-50 to-white py-8">
      <div className="container mx-auto px-4 max-w-4xl">
        {!showCertificate ? (
          <Card className="border-2 border-amber-100">
            <CardHeader className="text-center">
              <div className="mx-auto w-16 h-16 bg-amber-100 rounded-full flex items-center justify-center mb-4">
                <Award className="h-8 w-8 text-amber-600" />
              </div>
              <CardTitle className="text-2xl">Generate Your Certificate</CardTitle>
              <CardDescription>
                Celebrate your IELTS preparation achievements with a personalized certificate
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-indigo-50 rounded-lg p-4 text-center">
                  <BookOpen className="h-8 w-8 text-indigo-600 mx-auto mb-2" />
                  <p className="text-2xl font-bold text-indigo-600">{completedLessonsCount}</p>
                  <p className="text-sm text-gray-600">Lessons Completed</p>
                </div>
                <div className="bg-green-50 rounded-lg p-4 text-center">
                  <Target className="h-8 w-8 text-green-600 mx-auto mb-2" />
                  <p className="text-2xl font-bold text-green-600">{quizAttempts.length}</p>
                  <p className="text-sm text-gray-600">Quizzes Completed</p>
                </div>
              </div>

              {canGenerateCertificate ? (
                <>
                  <div className="bg-green-50 border border-green-200 rounded-lg p-4 flex items-center gap-3">
                    <CheckCircle2 className="h-5 w-5 text-green-600" />
                    <p className="text-green-800">
                      You're eligible to generate a certificate!
                    </p>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="name">Your Full Name</Label>
                      <Input
                        id="name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Enter your name as it should appear on the certificate"
                        className="mt-1"
                      />
                    </div>

                    <Button 
                      onClick={handleGenerateCertificate}
                      disabled={!name.trim()}
                      className="w-full bg-amber-600 hover:bg-amber-700"
                      size="lg"
                    >
                      <Sparkles className="h-5 w-5 mr-2" />
                      Generate Certificate
                    </Button>
                  </div>
                </>
              ) : (
                <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
                  <p className="text-amber-800 mb-2">
                    <strong>Keep learning!</strong> Complete at least 5 lessons or 3 quizzes to unlock your certificate.
                  </p>
                  <div className="flex gap-4 text-sm text-amber-700">
                    <span>Lessons: {completedLessonsCount}/5</span>
                    <span>Quizzes: {quizAttempts.length}/3</span>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        ) : (
          <div className="space-y-6">
            <div 
              ref={certificateRef}
              className="bg-white rounded-2xl shadow-2xl overflow-hidden"
            >
              <div className="h-2 bg-gradient-to-r from-indigo-500 to-purple-500" />
              <div className="p-12">
                <div className="text-center mb-8">
                  <h3 className="text-2xl font-bold text-indigo-600 mb-4">IELTS Tree</h3>
                  <h1 className="text-4xl font-serif font-bold text-gray-900 mb-2">
                    Certificate of Achievement
                  </h1>
                  <p className="text-gray-500">IELTS Preparation Program</p>
                </div>

                <div className="text-center my-10">
                  <p className="text-gray-500 mb-2">This is to certify that</p>
                  <h2 className="text-4xl font-serif font-bold text-gray-900 border-b-2 border-indigo-500 inline-block pb-2">
                    {certificateData.name}
                  </h2>
                </div>

                <p className="text-center text-gray-600 mb-8">
                  has successfully completed the IELTS preparation program at IELTS Tree,<br />
                  demonstrating dedication and commitment to English language proficiency.
                </p>

                <div className="flex justify-center gap-12 mb-8">
                  <div className="text-center">
                    <p className="text-3xl font-bold text-indigo-600">{certificateData.lessonsCompleted}</p>
                    <p className="text-sm text-gray-500">Lessons Completed</p>
                  </div>
                  <div className="text-center">
                    <p className="text-3xl font-bold text-indigo-600">{certificateData.quizzesCompleted}</p>
                    <p className="text-sm text-gray-500">Quizzes Completed</p>
                  </div>
                </div>

                <div className="bg-gradient-to-r from-indigo-500 to-purple-500 rounded-lg p-6 text-center text-white mb-8">
                  <p className="text-sm opacity-90 mb-1">Estimated Band Score</p>
                  <p className="text-4xl font-bold">{certificateData.estimatedBand}</p>
                </div>

                <div className="flex justify-between items-end pt-6 border-t">
                  <div>
                    <p className="text-sm text-gray-500">Date of Completion</p>
                    <p className="font-medium flex items-center gap-2">
                      <Calendar className="h-4 w-4" />
                      {certificateData.completionDate}
                    </p>
                  </div>
                  <div className="text-right">
                    <Badge variant="outline" className="text-xs">
                      ID: {certificateData.certificateId}
                    </Badge>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex gap-4">
              <Button onClick={() => setShowCertificate(false)} variant="outline" className="flex-1">
                Back
              </Button>
              <Button onClick={handleDownload} className="flex-1 bg-indigo-600 hover:bg-indigo-700">
                <Download className="h-4 w-4 mr-2" />
                Download
              </Button>
              <Button onClick={handleShare} variant="outline" className="flex-1">
                <Share2 className="h-4 w-4 mr-2" />
                Share
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

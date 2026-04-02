import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { 
  Headphones, 
  BookOpen, 
  PenTool, 
  Mic,
  Clock,
  Target,
  Play,
  CheckCircle,
  AlertCircle,
  ArrowRight,
  Shield,
  Zap,
  Award,
  ChevronRight,
  Volume2,
  Wifi,
  Timer,
  Lock
} from 'lucide-react';

interface TestModule {
  id: string;
  name: string;
  icon: React.ElementType;
  duration: string;
  questions: string;
  description: string;
  color: string;
  bgColor: string;
  route: string;
}

const testModules: TestModule[] = [
  {
    id: 'listening',
    name: 'Listening',
    icon: Headphones,
    duration: '30 min',
    questions: '40 questions',
    description: 'Four recorded sections with native speakers',
    color: 'text-blue-600',
    bgColor: 'bg-blue-500/10',
    route: '/listening-test'
  },
  {
    id: 'reading',
    name: 'Reading',
    icon: BookOpen,
    duration: '60 min',
    questions: '40 questions',
    description: 'Three reading passages with various question types',
    color: 'text-emerald-600',
    bgColor: 'bg-emerald-500/10',
    route: '/reading-test'
  },
  {
    id: 'writing',
    name: 'Writing',
    icon: PenTool,
    duration: '60 min',
    questions: '2 tasks',
    description: 'Task 1: Report/Letter, Task 2: Essay',
    color: 'text-amber-600',
    bgColor: 'bg-amber-500/10',
    route: '/writing-test'
  },
  {
    id: 'speaking',
    name: 'Speaking',
    icon: Mic,
    duration: '11-14 min',
    questions: '3 parts',
    description: 'Face-to-face interview simulation',
    color: 'text-purple-600',
    bgColor: 'bg-purple-500/10',
    route: '/speaking-test'
  }
];

const preTestChecklist = [
  { id: 1, icon: Headphones, label: 'Headphones connected', description: 'Required for Listening section' },
  { id: 2, icon: Volume2, label: 'Audio working properly', description: 'Test your speakers/headphones' },
  { id: 3, icon: Wifi, label: 'Stable internet connection', description: 'Avoid interruptions during test' },
  { id: 4, icon: Timer, label: '3+ hours available', description: 'Complete test without rushing' },
];

export default function FullMockTestPage() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [selectedMode, setSelectedMode] = useState<'practice' | 'exam'>('exam');
  const [checkedItems, setCheckedItems] = useState<number[]>([]);

  const toggleCheckItem = (id: number) => {
    setCheckedItems(prev => 
      prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]
    );
  };

  const allChecked = checkedItems.length === preTestChecklist.length;

  const startFullTest = () => {
    // Start with listening test
    navigate('/listening-test', { state: { mode: selectedMode, fullTest: true } });
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative bg-foreground text-background overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-foreground via-foreground to-accent/20" />
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-20 left-10 w-72 h-72 bg-accent rounded-full blur-3xl" />
          <div className="absolute bottom-10 right-10 w-96 h-96 bg-accent rounded-full blur-3xl" />
        </div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
          <div className="text-center max-w-3xl mx-auto">
            <Badge className="mb-6 bg-accent/20 text-accent border-accent/30 px-4 py-1.5">
              Complete IELTS Simulation
            </Badge>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
              Full Mock Test
            </h1>
            <p className="text-lg md:text-xl text-background/70 mb-8 max-w-2xl mx-auto">
              Experience a complete IELTS examination simulation with all four modules. 
              Test yourself under real exam conditions and get your predicted band score.
            </p>
            
            {/* Total Duration Stats */}
            <div className="flex flex-wrap justify-center gap-6 md:gap-10 mt-10">
              <div className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-accent">2h 45m</div>
                <div className="text-sm text-background/60">Total Duration</div>
              </div>
              <div className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-background">4</div>
                <div className="text-sm text-background/60">Modules</div>
              </div>
              <div className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-background">120+</div>
                <div className="text-sm text-background/60">Questions</div>
              </div>
              <div className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-background">9.0</div>
                <div className="text-sm text-background/60">Band Scale</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Test Modules Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-12">
          <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-3">Test Modules</h2>
          <p className="text-muted-foreground">Complete all four modules in sequence</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {testModules.map((module, index) => (
            <Card 
              key={module.id}
              className="group relative overflow-hidden border-border/50 hover:border-accent/50 transition-all duration-300 hover:shadow-lg"
            >
              <div className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${
                module.id === 'listening' ? 'from-blue-500 to-blue-600' :
                module.id === 'reading' ? 'from-emerald-500 to-emerald-600' :
                module.id === 'writing' ? 'from-amber-500 to-amber-600' :
                'from-purple-500 to-purple-600'
              }`} />
              
              <CardContent className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className={`p-3 rounded-xl ${module.bgColor}`}>
                    <module.icon className={`h-6 w-6 ${module.color}`} />
                  </div>
                  <Badge variant="outline" className="text-xs">
                    Step {index + 1}
                  </Badge>
                </div>

                <h3 className="text-lg font-semibold text-foreground mb-2">{module.name}</h3>
                <p className="text-sm text-muted-foreground mb-4">{module.description}</p>

                <div className="flex items-center gap-4 text-sm">
                  <div className="flex items-center gap-1.5 text-muted-foreground">
                    <Clock className="h-4 w-4" />
                    <span>{module.duration}</span>
                  </div>
                  <div className="flex items-center gap-1.5 text-muted-foreground">
                    <Target className="h-4 w-4" />
                    <span>{module.questions}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Test Mode Selection */}
      <section className="bg-muted/30 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-3">Choose Test Mode</h2>
            <p className="text-muted-foreground">Select how you want to take the test</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {/* Exam Mode */}
            <Card 
              className={`relative cursor-pointer transition-all duration-300 ${
                selectedMode === 'exam' 
                  ? 'border-accent ring-2 ring-accent/20 shadow-lg' 
                  : 'border-border/50 hover:border-accent/50'
              }`}
              onClick={() => setSelectedMode('exam')}
            >
              <CardContent className="p-6">
                <div className="flex items-center gap-4 mb-4">
                  <div className={`p-3 rounded-xl ${selectedMode === 'exam' ? 'bg-accent/20' : 'bg-muted'}`}>
                    <Shield className={`h-6 w-6 ${selectedMode === 'exam' ? 'text-accent' : 'text-muted-foreground'}`} />
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground flex items-center gap-2">
                      Exam Mode
                      <Badge className="bg-accent text-accent-foreground text-xs">Recommended</Badge>
                    </h3>
                    <p className="text-sm text-muted-foreground">Real exam simulation</p>
                  </div>
                </div>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-accent" />
                    Strict time limits
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-accent" />
                    No pause allowed
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-accent" />
                    Accurate band score prediction
                  </li>
                </ul>
              </CardContent>
            </Card>

            {/* Practice Mode */}
            <Card 
              className={`relative cursor-pointer transition-all duration-300 ${
                selectedMode === 'practice' 
                  ? 'border-accent ring-2 ring-accent/20 shadow-lg' 
                  : 'border-border/50 hover:border-accent/50'
              }`}
              onClick={() => setSelectedMode('practice')}
            >
              <CardContent className="p-6">
                <div className="flex items-center gap-4 mb-4">
                  <div className={`p-3 rounded-xl ${selectedMode === 'practice' ? 'bg-accent/20' : 'bg-muted'}`}>
                    <Zap className={`h-6 w-6 ${selectedMode === 'practice' ? 'text-accent' : 'text-muted-foreground'}`} />
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground">Practice Mode</h3>
                    <p className="text-sm text-muted-foreground">Flexible learning</p>
                  </div>
                </div>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-emerald-500" />
                    Pause and resume anytime
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-emerald-500" />
                    View hints and explanations
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-emerald-500" />
                    No time pressure
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Pre-Test Checklist */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-10">
            <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-3">Before You Begin</h2>
            <p className="text-muted-foreground">Ensure you have everything ready for the best experience</p>
          </div>

          <Card className="border-border/50">
            <CardContent className="p-6">
              <div className="space-y-4">
                {preTestChecklist.map((item) => (
                  <div
                    key={item.id}
                    className={`flex items-center gap-4 p-4 rounded-xl cursor-pointer transition-all ${
                      checkedItems.includes(item.id) 
                        ? 'bg-accent/10 border border-accent/30' 
                        : 'bg-muted/50 hover:bg-muted'
                    }`}
                    onClick={() => toggleCheckItem(item.id)}
                  >
                    <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all ${
                      checkedItems.includes(item.id)
                        ? 'bg-accent border-accent'
                        : 'border-muted-foreground/30'
                    }`}>
                      {checkedItems.includes(item.id) && (
                        <CheckCircle className="h-4 w-4 text-accent-foreground" />
                      )}
                    </div>
                    <div className="flex-1">
                      <div className="font-medium text-foreground">{item.label}</div>
                      <div className="text-sm text-muted-foreground">{item.description}</div>
                    </div>
                    <item.icon className={`h-5 w-5 ${
                      checkedItems.includes(item.id) ? 'text-accent' : 'text-muted-foreground'
                    }`} />
                  </div>
                ))}
              </div>

              <div className="mt-6 pt-6 border-t border-border">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-sm text-muted-foreground">Checklist Progress</span>
                  <span className="text-sm font-medium text-foreground">
                    {checkedItems.length}/{preTestChecklist.length}
                  </span>
                </div>
                <Progress value={(checkedItems.length / preTestChecklist.length) * 100} className="h-2" />
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Start Test CTA */}
      <section className="bg-foreground text-background py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center">
            <Award className="h-12 w-12 text-accent mx-auto mb-6" />
            <h2 className="text-2xl md:text-3xl font-bold mb-4">Ready to Begin?</h2>
            <p className="text-background/70 mb-8">
              Your full IELTS mock test will begin with the Listening section. 
              Make sure you&apos;re in a quiet environment and have approximately 3 hours available.
            </p>

            {user ? (
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <Button
                  size="lg"
                  onClick={startFullTest}
                  disabled={!allChecked}
                  className="gap-2 bg-accent hover:bg-accent/90 text-accent-foreground px-8"
                >
                  <Play className="h-5 w-5" />
                  Start Full Test
                  <ChevronRight className="h-5 w-5" />
                </Button>
                {!allChecked && (
                  <p className="text-sm text-background/60 flex items-center gap-2">
                    <AlertCircle className="h-4 w-4" />
                    Complete the checklist above to start
                  </p>
                )}
              </div>
            ) : (
              <div className="flex flex-col items-center gap-4">
                <Button
                  size="lg"
                  onClick={() => navigate('/login')}
                  className="gap-2 bg-accent hover:bg-accent/90 text-accent-foreground px-8"
                >
                  <Lock className="h-5 w-5" />
                  Sign In to Start Test
                </Button>
                <p className="text-sm text-background/60">
                  Create a free account to track your progress and results
                </p>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="text-center">
            <div className="w-14 h-14 bg-accent/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <Target className="h-7 w-7 text-accent" />
            </div>
            <h3 className="text-lg font-semibold text-foreground mb-2">Accurate Scoring</h3>
            <p className="text-muted-foreground text-sm">
              Get a predicted band score based on official IELTS scoring criteria
            </p>
          </div>
          <div className="text-center">
            <div className="w-14 h-14 bg-accent/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <Award className="h-7 w-7 text-accent" />
            </div>
            <h3 className="text-lg font-semibold text-foreground mb-2">Detailed Feedback</h3>
            <p className="text-muted-foreground text-sm">
              Receive comprehensive analysis of your strengths and areas to improve
            </p>
          </div>
          <div className="text-center">
            <div className="w-14 h-14 bg-accent/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <Zap className="h-7 w-7 text-accent" />
            </div>
            <h3 className="text-lg font-semibold text-foreground mb-2">Real Exam Experience</h3>
            <p className="text-muted-foreground text-sm">
              Simulate actual IELTS test conditions with our exam mode
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}

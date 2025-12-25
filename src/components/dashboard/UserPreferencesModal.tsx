import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Target, BookOpen, GraduationCap, PenTool, Mic, X } from 'lucide-react';
import { useProgress } from '@/contexts/ProgressContext';

interface UserPreferencesModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const BAND_SCORES = [6, 6.5, 7, 7.5, 8, 8.5, 9];
const DAILY_GOALS = [5, 10, 15, 20, 30];
const FOCUS_AREAS = [
  { id: 'vocabulary', label: 'Vocabulary', icon: BookOpen, color: 'bg-indigo-100 text-indigo-700' },
  { id: 'grammar', label: 'Grammar', icon: GraduationCap, color: 'bg-purple-100 text-purple-700' },
  { id: 'writing', label: 'Writing', icon: PenTool, color: 'bg-emerald-100 text-emerald-700' },
  { id: 'speaking', label: 'Speaking', icon: Mic, color: 'bg-orange-100 text-orange-700' },
];

export function UserPreferencesModal({ isOpen, onClose }: UserPreferencesModalProps) {
  const { userPreferences, updateUserPreferences } = useProgress();
  const [targetBand, setTargetBand] = useState(userPreferences.targetBand);
  const [dailyGoal, setDailyGoal] = useState(userPreferences.dailyGoalQuestions);
  const [focusAreas, setFocusAreas] = useState<string[]>(userPreferences.focusAreas);

  const toggleFocusArea = (area: string) => {
    setFocusAreas(prev => 
      prev.includes(area) 
        ? prev.filter(a => a !== area)
        : [...prev, area]
    );
  };

  const handleSave = () => {
    updateUserPreferences({
      targetBand,
      dailyGoalQuestions: dailyGoal,
      focusAreas,
    });
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <Card className="w-full max-w-lg max-h-[90vh] overflow-y-auto">
        <CardHeader className="relative">
          <button 
            onClick={onClose}
            className="absolute right-4 top-4 p-1 hover:bg-gray-100 rounded"
          >
            <X className="h-5 w-5" />
          </button>
          <div className="flex items-center gap-3">
            <div className="p-2 bg-indigo-100 rounded-lg">
              <Target className="h-6 w-6 text-indigo-600" />
            </div>
            <div>
              <CardTitle>Learning Preferences</CardTitle>
              <CardDescription>Customize your learning experience</CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          <div>
            <h3 className="font-medium mb-3">Target Band Score</h3>
            <div className="flex flex-wrap gap-2">
              {BAND_SCORES.map(score => (
                <button
                  key={score}
                  onClick={() => setTargetBand(score)}
                  className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                    targetBand === score
                      ? 'bg-indigo-600 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  Band {score}
                </button>
              ))}
            </div>
          </div>

          <div>
            <h3 className="font-medium mb-3">Daily Goal (questions per day)</h3>
            <div className="flex flex-wrap gap-2">
              {DAILY_GOALS.map(goal => (
                <button
                  key={goal}
                  onClick={() => setDailyGoal(goal)}
                  className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                    dailyGoal === goal
                      ? 'bg-indigo-600 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {goal} questions
                </button>
              ))}
            </div>
          </div>

          <div>
            <h3 className="font-medium mb-3">Focus Areas</h3>
            <div className="grid grid-cols-2 gap-3">
              {FOCUS_AREAS.map(({ id, label, icon: Icon, color }) => (
                <button
                  key={id}
                  onClick={() => toggleFocusArea(id)}
                  className={`flex items-center gap-3 p-3 rounded-lg border-2 transition-colors ${
                    focusAreas.includes(id)
                      ? 'border-indigo-500 bg-indigo-50'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <div className={`p-2 rounded-lg ${color}`}>
                    <Icon className="h-5 w-5" />
                  </div>
                  <span className="font-medium">{label}</span>
                </button>
              ))}
            </div>
          </div>

          <div className="flex gap-3 pt-4">
            <Button variant="outline" onClick={onClose} className="flex-1">
              Cancel
            </Button>
            <Button onClick={handleSave} className="flex-1">
              Save Preferences
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

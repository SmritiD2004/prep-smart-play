import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { useToast } from "@/hooks/use-toast";
import { 
  ArrowLeft, 
  CheckCircle, 
  Clock, 
  Star, 
  AlertTriangle, 
  BookOpen,
  PlayCircle,
  Volume2,
  FileText,
  Award,
  Target,
  Users
} from "lucide-react";

const LearningModule = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [currentStep, setCurrentStep] = useState(0);
  const [completedSteps, setCompletedSteps] = useState<number[]>([]);
  const [moduleStarted, setModuleStarted] = useState(false);
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const userData = localStorage.getItem('prepsmart_user');
    if (userData) {
      setUser(JSON.parse(userData));
    } else {
      navigate('/auth?role=student');
    }
  }, [navigate]);

  // Mock module data based on ID
  const modules = {
    "1": {
      title: "Earthquake Safety Basics",
      description: "Learn essential Drop, Cover, and Hold On techniques",
      difficulty: "Beginner",
      estimatedTime: "15 min",
      points: 200,
      steps: [
        {
          title: "Understanding Earthquakes",
          type: "content",
          content: {
            text: "Earthquakes are sudden ground movements caused by the shifting of tectonic plates. They can happen anywhere, anytime, and understanding how to respond can save lives.",
            keyPoints: [
              "Earthquakes can occur without warning",
              "Most injuries happen from falling objects",
              "The safest response is Drop, Cover, and Hold On"
            ]
          }
        },
        {
          title: "Drop, Cover, and Hold On",
          type: "interactive",
          content: {
            text: "The internationally recommended response to earthquake shaking.",
            steps: [
              { action: "DROP", description: "Drop to your hands and knees immediately" },
              { action: "COVER", description: "Take cover under a sturdy desk or table if possible" },
              { action: "HOLD ON", description: "Hold onto your shelter and protect your head/neck" }
            ]
          }
        },
        {
          title: "Virtual Drill Simulation",
          type: "drill",
          content: {
            scenario: "You're in a classroom when you feel strong shaking. What do you do?",
            options: [
              { text: "Run outside immediately", correct: false, feedback: "Running during shaking is dangerous due to falling objects" },
              { text: "Drop, cover under desk, hold on", correct: true, feedback: "Correct! This is the safest immediate response" },
              { text: "Stand in a doorway", correct: false, feedback: "Modern doorways don't provide extra protection" },
              { text: "Hide under the stairs", correct: false, feedback: "Stairs can collapse during earthquakes" }
            ]
          }
        },
        {
          title: "After the Shaking Stops",
          type: "content",
          content: {
            text: "What to do once the earthquake stops is crucial for your continued safety.",
            keyPoints: [
              "Check for injuries and provide first aid if needed",
              "Look for hazards like gas leaks, electrical damage, or structural damage",
              "Use stairs, never elevators",
              "Stay alert for aftershocks",
              "Follow your school's evacuation plan if instructed"
            ]
          }
        },
        {
          title: "Knowledge Check",
          type: "quiz",
          content: {
            questions: [
              {
                question: "What should you do FIRST when you feel earthquake shaking?",
                options: ["Run outside", "Drop to hands and knees", "Call for help", "Look for the source"],
                correct: 1,
                explanation: "Drop immediately to prevent being knocked over by the shaking."
              },
              {
                question: "Where is the safest place during an earthquake if you're indoors?",
                options: ["Doorway", "Under a sturdy table", "Against a wall", "In the center of the room"],
                correct: 1,
                explanation: "Under a sturdy table provides the best protection from falling objects."
              }
            ]
          }
        }
      ]
    },
    "3": {
      title: "Flood Preparedness",
      description: "Understanding flood risks and response strategies",
      difficulty: "Intermediate",
      estimatedTime: "25 min",
      points: 300,
      steps: [
        {
          title: "Understanding Flood Risks",
          type: "content",
          content: {
            text: "Floods are among the most common and widespread natural disasters. They can develop slowly or flash flood within minutes.",
            keyPoints: [
              "Flash floods can occur within minutes",
              "Just 6 inches of water can knock you down",
              "Cars can float in just 2 feet of water",
              "Most flood deaths occur in vehicles"
            ]
          }
        },
        {
          title: "Flood Safety Rules",
          type: "interactive",
          content: {
            text: "Remember these critical safety rules:",
            steps: [
              { action: "TURN AROUND", description: "Don't walk, swim, or drive through flood waters" },
              { action: "DON'T DROWN", description: "Turn around, don't drown - find alternate routes" },
              { action: "GET TO HIGH GROUND", description: "Move to higher ground immediately when advised" }
            ]
          }
        },
        {
          title: "Virtual Scenario",
          type: "drill",
          content: {
            scenario: "You're walking home and encounter a flooded street. The water looks shallow. What do you do?",
            options: [
              { text: "Wade through carefully", correct: false, feedback: "Never walk through flood water - it may be deeper than it appears" },
              { text: "Turn around and find another route", correct: true, feedback: "Correct! Turn around, don't drown" },
              { text: "Wait for the water to recede", correct: false, feedback: "This could be dangerous if water levels rise" },
              { text: "Call someone to pick you up", correct: false, feedback: "Better to find alternate route immediately" }
            ]
          }
        }
      ]
    }
  };

  const moduleData = modules[id as keyof typeof modules];

  if (!moduleData) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Card className="max-w-md mx-auto">
          <CardContent className="p-8 text-center">
            <h2 className="text-xl font-semibold mb-4">Module Not Found</h2>
            <p className="text-muted-foreground mb-6">The requested learning module could not be found.</p>
            <Button onClick={() => navigate('/student-dashboard')}>
              Return to Dashboard
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  const progress = ((currentStep + 1) / moduleData.steps.length) * 100;
  const currentStepData = moduleData.steps[currentStep];

  const handleStepComplete = () => {
    if (!completedSteps.includes(currentStep)) {
      setCompletedSteps([...completedSteps, currentStep]);
    }
    
    if (currentStep < moduleData.steps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      // Module completed
      toast({
        title: "Module Completed! 🎉",
        description: `You earned ${moduleData.points} points!`,
      });
      navigate('/student-dashboard');
    }
  };

  const handleStartModule = () => {
    setModuleStarted(true);
    setCurrentStep(0);
  };

  const renderStepContent = () => {
    const step = currentStepData;
    
    switch (step.type) {
      case "content":
        return (
          <div className="space-y-6">
            <div className="prose max-w-none">
              <p className="text-muted-foreground leading-relaxed">{step.content.text}</p>
            </div>
            
            <Card className="bg-primary/5 border-primary/20">
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <Target className="h-5 w-5 text-primary" />
                  Key Learning Points
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {step.content.keyPoints.map((point, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <CheckCircle className="h-5 w-5 text-success mt-0.5 flex-shrink-0" />
                      <span>{point}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
            
            <Button onClick={handleStepComplete} className="w-full">
              Continue Learning
            </Button>
          </div>
        );

      case "interactive":
        return (
          <div className="space-y-6">
            <div className="prose max-w-none">
              <p className="text-muted-foreground leading-relaxed">{step.content.text}</p>
            </div>
            
            <div className="grid gap-4">
              {step.content.steps.map((item, index) => (
                <Card key={index} className="border-l-4 border-l-achievement">
                  <CardContent className="p-4">
                    <div className="flex items-center gap-4">
                      <div className="w-16 h-16 rounded-full bg-achievement/10 flex items-center justify-center">
                        <span className="text-achievement font-bold">{index + 1}</span>
                      </div>
                      <div>
                        <h4 className="font-semibold text-achievement">{item.action}</h4>
                        <p className="text-sm text-muted-foreground">{item.description}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
            
            <Button onClick={handleStepComplete} className="w-full">
              Practice This Technique
            </Button>
          </div>
        );

      case "drill":
        return (
          <DrillComponent 
            scenario={step.content.scenario}
            options={step.content.options}
            onComplete={handleStepComplete}
          />
        );

      case "quiz":
        return (
          <QuizComponent 
            questions={(step.content as any).questions}
            onComplete={handleStepComplete}
          />
        );

      default:
        return <div>Unknown step type</div>;
    }
  };

  if (!moduleStarted) {
    return (
      <div className="min-h-screen bg-background">
        <div className="container mx-auto px-4 py-8">
          <Button
            variant="ghost"
            onClick={() => navigate('/student-dashboard')}
            className="mb-6"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Dashboard
          </Button>

          <Card className="max-w-4xl mx-auto">
            <CardHeader className="text-center pb-8">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
                <BookOpen className="h-4 w-4" />
                Learning Module
              </div>
              
              <CardTitle className="text-3xl mb-4">{moduleData.title}</CardTitle>
              <CardDescription className="text-lg">{moduleData.description}</CardDescription>
              
              <div className="flex items-center justify-center gap-6 mt-6">
                <div className="flex items-center gap-2">
                  <Clock className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm">{moduleData.estimatedTime}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Star className="h-4 w-4 text-achievement" />
                  <span className="text-sm">{moduleData.points} points</span>
                </div>
                <Badge variant="outline">{moduleData.difficulty}</Badge>
              </div>
            </CardHeader>
            
            <CardContent className="space-y-6">
              <div className="text-center">
                <h3 className="text-xl font-semibold mb-4">What You'll Learn</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {moduleData.steps.map((step, index) => (
                    <div key={index} className="flex items-center gap-3 p-3 bg-muted/50 rounded-lg">
                      <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-sm font-semibold text-primary">
                        {index + 1}
                      </div>
                      <span className="text-sm font-medium">{step.title}</span>
                    </div>
                  ))}
                </div>
              </div>
              
              <Separator />
              
              <div className="text-center">
                <Button 
                  size="lg"
                  onClick={handleStartModule}
                  className="px-8"
                >
                  <PlayCircle className="mr-2 h-5 w-5" />
                  Start Module
                </Button>
                <p className="text-sm text-muted-foreground mt-3">
                  This module will take approximately {moduleData.estimatedTime} to complete
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-card border-b sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => navigate('/student-dashboard')}
              >
                <ArrowLeft className="mr-2 h-4 w-4" />
                Exit Module
              </Button>
              <Separator orientation="vertical" className="h-6" />
              <div>
                <h1 className="font-semibold">{moduleData.title}</h1>
                <p className="text-sm text-muted-foreground">
                  Step {currentStep + 1} of {moduleData.steps.length}: {currentStepData.title}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="text-sm text-muted-foreground">
                Progress: {Math.round(progress)}%
              </div>
              <Progress value={progress} className="w-32" />
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <Card className="max-w-4xl mx-auto">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-sm font-semibold text-primary">
                {currentStep + 1}  
              </div>
              {currentStepData.title}
            </CardTitle>
          </CardHeader>
          <CardContent>
            {renderStepContent()}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

// Drill Component
const DrillComponent = ({ scenario, options, onComplete }: { scenario: string, options: any[], onComplete: () => void }) => {
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [showFeedback, setShowFeedback] = useState(false);
  const { toast } = useToast();

  const handleOptionSelect = (index: number) => {
    setSelectedOption(index);
    setShowFeedback(true);
    
    if (options[index].correct) {
      toast({
        title: "Correct! ✅",
        description: options[index].feedback,
      });
    } else {
      toast({
        title: "Try Again",
        description: options[index].feedback,
        variant: "destructive"
      });
    }
  };

  return (
    <div className="space-y-6">
      <Card className="bg-warning/5 border-warning/20">
        <CardContent className="p-6">
          <div className="flex items-start gap-3">
            <AlertTriangle className="h-6 w-6 text-warning flex-shrink-0 mt-1" />
            <div>
              <h3 className="font-semibold mb-2">Emergency Scenario</h3>
              <p className="text-muted-foreground">{scenario}</p>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="space-y-3">
        <h4 className="font-medium">What would you do?</h4>
        {options.map((option: any, index: number) => (
          <Button
            key={index}
            variant={
              selectedOption === index 
                ? (option.correct ? "default" : "destructive")
                : "outline"
            }
            className="w-full justify-start h-auto p-4 text-left"
            onClick={() => handleOptionSelect(index)}
            disabled={showFeedback}
          >
            <div className="flex items-start gap-3">
              <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center text-sm font-semibold flex-shrink-0">
                {String.fromCharCode(65 + index)}
              </div>
              <span>{option.text}</span>
            </div>
          </Button>
        ))}
      </div>

      {showFeedback && (
        <Button onClick={onComplete} className="w-full">
          Continue Learning
        </Button>
      )}
    </div>
  );
};

// Quiz Component
const QuizComponent = ({ questions, onComplete }: { questions: any[], onComplete: () => void }) => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<number[]>([]);
  const [showResults, setShowResults] = useState(false);
  const { toast } = useToast();

  const handleAnswerSelect = (answerIndex: number) => {
    const newAnswers = [...selectedAnswers];
    newAnswers[currentQuestion] = answerIndex;
    setSelectedAnswers(newAnswers);

    if (currentQuestion < questions.length - 1) {
      setTimeout(() => {
        setCurrentQuestion(currentQuestion + 1);
      }, 1000);
    } else {
      setTimeout(() => {
        setShowResults(true);
        const correctAnswers = questions.filter((q: any, i: number) => q.correct === newAnswers[i]);
        const score = Math.round((correctAnswers.length / questions.length) * 100);
        
        toast({
          title: `Quiz Complete! ${score}%`,
          description: `You got ${correctAnswers.length} out of ${questions.length} questions correct.`,
        });
      }, 1000);
    }
  };

  if (showResults) {
    const correctCount = questions.filter((q: any, i: number) => q.correct === selectedAnswers[i]).length;
    const score = Math.round((correctCount / questions.length) * 100);

    return (
      <div className="space-y-6 text-center">
        <div className="p-8 bg-success/5 border border-success/20 rounded-lg">
          <Award className="h-16 w-16 text-success mx-auto mb-4" />
          <h3 className="text-2xl font-bold mb-2">Quiz Complete!</h3>
          <p className="text-lg text-muted-foreground">
            Score: {score}% ({correctCount}/{questions.length} correct)
          </p>
        </div>
        
        <Button onClick={onComplete} className="w-full" size="lg">
          Complete Module
        </Button>
      </div>
    );
  }

  const question = questions[currentQuestion];

  return (
    <div className="space-y-6">
      <div className="text-center">
        <Badge variant="outline" className="mb-4">
          Question {currentQuestion + 1} of {questions.length}
        </Badge>
        <h3 className="text-xl font-semibold mb-6">{question.question}</h3>
      </div>

      <div className="space-y-3">
        {question.options.map((option: string, index: number) => (
          <Button
            key={index}
            variant="outline"
            className="w-full justify-start h-auto p-4 text-left"
            onClick={() => handleAnswerSelect(index)}
          >
            <div className="flex items-start gap-3">
              <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center text-sm font-semibold flex-shrink-0">
                {String.fromCharCode(65 + index)}
              </div>
              <span>{option}</span>
            </div>
          </Button>
        ))}
      </div>
    </div>
  );
};

export default LearningModule;
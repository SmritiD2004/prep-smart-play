import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { useToast } from "@/hooks/use-toast";
import { 
  Trophy, 
  Target, 
  BookOpen, 
  Zap, 
  Award, 
  Users, 
  AlertTriangle,
  Shield,
  Home,
  LogOut,
  Calendar,
  Star,
  Clock,
  CheckCircle,
  Lock
} from "lucide-react";

const StudentDashboard = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [user, setUser] = useState<any>(null);
  const [stats, setStats] = useState({
    totalPoints: 1250,
    level: 5,
    pointsToNextLevel: 250,
    completedModules: 8,
    totalModules: 12,
    currentStreak: 7,
    badges: 6,
    drillsCompleted: 12,
    leaderboardRank: 3
  });

  useEffect(() => {
    const userData = localStorage.getItem('prepsmart_user');
    if (userData) {
      setUser(JSON.parse(userData));
    } else {
      navigate('/auth?role=student');
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('prepsmart_user');
    toast({
      title: "Signed out",
      description: "You have been successfully signed out.",
    });
    navigate('/');
  };

  const learningModules = [
    {
      id: 1,
      title: "Earthquake Safety Basics",
      description: "Learn Drop, Cover, and Hold On techniques",
      progress: 100,
      points: 200,
      status: "completed",
      difficulty: "Beginner",
      estimatedTime: "15 min"
    },
    {
      id: 2,
      title: "Fire Emergency Response",
      description: "Fire evacuation procedures and safety measures",
      progress: 100,
      points: 250,
      status: "completed",
      difficulty: "Beginner",
      estimatedTime: "20 min"
    },
    {
      id: 3,
      title: "Flood Preparedness",
      description: "Understanding flood risks and response strategies",
      progress: 75,
      points: 300,
      status: "in-progress",
      difficulty: "Intermediate",
      estimatedTime: "25 min"
    },
    {
      id: 4,
      title: "Cyclone Safety Protocols",
      description: "Preparation and response for cyclone emergencies",
      progress: 0,
      points: 350,
      status: "locked",
      difficulty: "Intermediate",
      estimatedTime: "30 min"
    },
    {
      id: 5,
      title: "Advanced First Aid",
      description: "Essential first aid skills for emergency situations",
      progress: 0,
      points: 400,
      status: "locked",
      difficulty: "Advanced",
      estimatedTime: "45 min"
    }
  ];

  const achievements = [
    {
      id: 1,
      title: "First Responder",
      description: "Completed first emergency drill",
      icon: Shield,
      earned: true,
      color: "success"
    },
    {
      id: 2,
      title: "Knowledge Seeker",
      description: "Completed 5 learning modules",
      icon: BookOpen,
      earned: true,
      color: "primary"
    },
    {
      id: 3,
      title: "Streak Master",
      description: "7-day learning streak",
      icon: Zap,
      earned: true,
      color: "achievement"
    },
    {
      id: 4,
      title: "Team Player",
      description: "Participated in group drill",
      icon: Users,
      earned: false,
      color: "muted"
    }
  ];

  const upcomingDrills = [
    {
      id: 1,
      title: "School Fire Drill",
      date: "Today, 2:00 PM",
      type: "Virtual Simulation",
      participants: 45
    },
    {
      id: 2,
      title: "Earthquake Response Test",
      date: "Tomorrow, 10:00 AM", 
      type: "Interactive Quiz",
      participants: 32
    }
  ];

  const leaderboard = [
    { rank: 1, name: "Alex Kumar", points: 1580, avatar: "AK" },
    { rank: 2, name: "Priya Singh", points: 1420, avatar: "PS" },
    { rank: 3, name: user?.name || "You", points: 1250, avatar: user?.name?.charAt(0) || "Y", isCurrentUser: true },
    { rank: 4, name: "Rahul Sharma", points: 1180, avatar: "RS" },
    { rank: 5, name: "Sneha Patel", points: 1050, avatar: "SP" }
  ];

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-card border-b sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <h1 className="text-2xl font-bold text-primary">PrepSmart</h1>
              <Separator orientation="vertical" className="h-6" />
              <div>
                <h2 className="font-semibold">Welcome back, {user.name}!</h2>
                <p className="text-sm text-muted-foreground">Student Dashboard</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => navigate('/emergency-contacts')}
              >
                <AlertTriangle className="mr-2 h-4 w-4" />
                Emergency
              </Button>
              <Button
                variant="ghost" 
                size="sm"
                onClick={() => navigate('/')}
              >
                <Home className="mr-2 h-4 w-4" />
                Home
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={handleLogout}
              >
                <LogOut className="mr-2 h-4 w-4" />
                Sign Out
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {/* Stats Overview */}
        <section className="mb-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card className="gamification-card">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Total Points</p>
                    <p className="text-2xl font-bold text-primary">{stats.totalPoints}</p>
                  </div>
                  <Trophy className="h-8 w-8 text-achievement" />
                </div>
                <div className="mt-4">
                  <div className="flex items-center justify-between text-xs">
                    <span>Level {stats.level}</span>
                    <span>{stats.pointsToNextLevel} to next level</span>
                  </div>
                  <Progress value={75} className="mt-2" />
                </div>
              </CardContent>
            </Card>

            <Card className="gamification-card">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Learning Progress</p>
                    <p className="text-2xl font-bold text-success">{stats.completedModules}/{stats.totalModules}</p>
                  </div>
                  <BookOpen className="h-8 w-8 text-success" />
                </div>
                <div className="mt-4">
                  <Progress value={(stats.completedModules / stats.totalModules) * 100} className="mt-2" />
                  <p className="text-xs text-muted-foreground mt-1">
                    {Math.round((stats.completedModules / stats.totalModules) * 100)}% Complete
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card className="gamification-card">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Current Streak</p>
                    <p className="text-2xl font-bold text-warning">{stats.currentStreak} days</p>
                  </div>
                  <Zap className="h-8 w-8 text-warning" />
                </div>
                <p className="text-xs text-muted-foreground mt-4">
                  Keep learning daily to maintain your streak!
                </p>
              </CardContent>
            </Card>

            <Card className="gamification-card">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Leaderboard Rank</p>
                    <p className="text-2xl font-bold text-achievement">#{stats.leaderboardRank}</p>
                  </div>
                  <Target className="h-8 w-8 text-achievement" />
                </div>
                <p className="text-xs text-muted-foreground mt-4">
                  You're in the top 10%!
                </p>
              </CardContent>
            </Card>
          </div>
        </section>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Learning Modules */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BookOpen className="h-5 w-5 text-primary" />
                  Learning Modules
                </CardTitle>
                <CardDescription>
                  Continue your disaster preparedness education journey
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {learningModules.map((module) => (
                  <Card key={module.id} className="border-l-4 border-l-primary/20 hover:shadow-md transition-shadow">
                    <CardContent className="p-4">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2">
                            <h4 className="font-semibold">{module.title}</h4>
                            {module.status === "completed" && (
                              <CheckCircle className="h-4 w-4 text-success" />
                            )}
                            {module.status === "locked" && (
                              <Lock className="h-4 w-4 text-muted-foreground" />
                            )}
                          </div>
                          <p className="text-sm text-muted-foreground mb-3">{module.description}</p>
                          
                          <div className="flex items-center gap-4 text-xs text-muted-foreground">
                            <span className="flex items-center gap-1">
                              <Clock className="h-3 w-3" />
                              {module.estimatedTime}
                            </span>
                            <Badge variant="outline" className="text-xs">
                              {module.difficulty}
                            </Badge>
                            <span className="flex items-center gap-1">
                              <Star className="h-3 w-3" />
                              {module.points} pts
                            </span>
                          </div>

                          {module.progress > 0 && module.progress < 100 && (
                            <div className="mt-3">
                              <div className="flex items-center justify-between text-xs mb-1">
                                <span>Progress</span>
                                <span>{module.progress}%</span>
                              </div>
                              <Progress value={module.progress} className="h-2" />
                            </div>
                          )}
                        </div>
                        
                        <div className="ml-4">
                          <Button
                            size="sm"
                            disabled={module.status === "locked"}
                            variant={module.status === "completed" ? "outline" : "default"}
                            onClick={() => {
                              if (module.status !== "locked") {
                                navigate(`/learning-module/${module.id}`);
                              }
                            }}
                          >
                            {module.status === "completed" ? "Review" : 
                             module.status === "in-progress" ? "Continue" : 
                             module.status === "locked" ? "Locked" : "Start"}
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Achievements */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Award className="h-5 w-5 text-achievement" />
                  Achievements
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {achievements.map((achievement) => {
                  const IconComponent = achievement.icon;
                  return (
                    <div key={achievement.id} className={`flex items-center gap-3 p-3 rounded-lg ${achievement.earned ? 'bg-muted/50' : 'bg-muted/20 opacity-60'}`}>
                      <div className={`inline-flex items-center justify-center w-8 h-8 rounded-full ${achievement.earned ? `bg-${achievement.color}/10` : 'bg-muted'}`}>
                        <IconComponent className={`h-4 w-4 ${achievement.earned ? `text-${achievement.color}` : 'text-muted-foreground'}`} />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h4 className="text-sm font-medium truncate">{achievement.title}</h4>
                        <p className="text-xs text-muted-foreground">{achievement.description}</p>
                      </div>
                    </div>
                  );
                })}
              </CardContent>
            </Card>

            {/* Upcoming Drills */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Calendar className="h-5 w-5 text-primary" />
                  Upcoming Drills
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {upcomingDrills.map((drill) => (
                  <div key={drill.id} className="p-3 border rounded-lg">
                    <h4 className="font-medium text-sm">{drill.title}</h4>
                    <p className="text-xs text-muted-foreground">{drill.date}</p>
                    <div className="flex items-center justify-between mt-2">
                      <Badge variant="outline" className="text-xs">{drill.type}</Badge>
                      <span className="text-xs text-muted-foreground">{drill.participants} participants</span>
                    </div>
                  </div>
                ))}
                <Button className="w-full" size="sm">
                  View All Drills
                </Button>
              </CardContent>
            </Card>

            {/* Leaderboard */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Trophy className="h-5 w-5 text-achievement" />
                  Class Leaderboard
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {leaderboard.map((entry) => (
                  <div key={entry.rank} className={`flex items-center gap-3 p-2 rounded-lg ${entry.isCurrentUser ? 'bg-primary/10 border border-primary/20' : ''}`}>
                    <div className="text-sm font-bold text-muted-foreground w-6">
                      #{entry.rank}
                    </div>
                    <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-xs font-medium">
                      {entry.avatar}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium truncate">{entry.name}</p>
                      <p className="text-xs text-muted-foreground">{entry.points} points</p>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentDashboard;
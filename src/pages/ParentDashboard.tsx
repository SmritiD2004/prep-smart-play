import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";
import { Heart, Award, BookOpen, Shield, Bell, Home, LogOut } from "lucide-react";

const ParentDashboard = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const userData = localStorage.getItem('prepsmart_user');
    if (!userData) {
      navigate('/auth?role=parent');
      return;
    }
    
    const parsedUser = JSON.parse(userData);
    if (parsedUser.role !== 'parent') {
      navigate('/auth?role=parent');
      return;
    }
    
    setUser(parsedUser);
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('prepsmart_user');
    toast({
      title: "Logged out successfully",
      description: "You have been logged out of PrepSmart"
    });
    navigate('/');
  };

  if (!user) return null;

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 via-background to-success/5">
      <div className="container mx-auto px-4 py-6">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold">Parent Dashboard</h1>
            <p className="text-muted-foreground">Welcome back, {user.name}</p>
          </div>
          <Button variant="outline" onClick={handleLogout}>
            <LogOut className="mr-2 h-4 w-4" />
            Logout
          </Button>
        </div>

        <Tabs defaultValue="children" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="children">My Children</TabsTrigger>
            <TabsTrigger value="family">Family Prep</TabsTrigger>
            <TabsTrigger value="resources">Resources</TabsTrigger>
            <TabsTrigger value="updates">Updates</TabsTrigger>
          </TabsList>

          <TabsContent value="children" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Child Progress Cards */}
              {[
                { name: "Emma Johnson", grade: "Grade 8", school: "Central High School", progress: 85, badges: 12 },
                { name: "Alex Johnson", grade: "Grade 5", school: "Westside Elementary", progress: 92, badges: 8 }
              ].map((child, index) => (
                <Card key={child.name}>
                  <CardHeader>
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                        <Heart className="h-6 w-6 text-primary" />
                      </div>
                      <div>
                        <CardTitle className="text-lg">{child.name}</CardTitle>
                        <CardDescription>{child.grade} • {child.school}</CardDescription>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <div className="flex justify-between text-sm mb-2">
                        <span>Overall Progress</span>
                        <span>{child.progress}%</span>
                      </div>
                      <Progress value={child.progress} />
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Award className="h-4 w-4 text-warning" />
                        <span className="text-sm">{child.badges} badges earned</span>
                      </div>
                      <Button variant="outline" size="sm">View Details</Button>
                    </div>

                    <div className="space-y-2">
                      <h4 className="font-medium text-sm">Recent Achievements</h4>
                      <div className="flex flex-wrap gap-2">
                        <Badge variant="secondary">Earthquake Expert</Badge>
                        <Badge variant="secondary">First Aid Helper</Badge>
                        {index === 0 && <Badge variant="secondary">Fire Safety Pro</Badge>}
                      </div>
                    </div>

                    <div className="space-y-2">
                      <h4 className="font-medium text-sm">Current Module</h4>
                      <div className="p-3 bg-muted/50 rounded-lg">
                        <p className="text-sm font-medium">
                          {index === 0 ? "Flood Preparedness" : "Community Helpers"}
                        </p>
                        <div className="flex justify-between text-xs text-muted-foreground mt-1">
                          <span>Progress: {index === 0 ? "60%" : "80%"}</span>
                          <span>Due: {index === 0 ? "Dec 15" : "Dec 10"}</span>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Weekly Family Discussion Topics</CardTitle>
                <CardDescription>Suggested topics based on your children's recent learning</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {[
                    "Practice the family emergency meeting point",
                    "Review emergency contact numbers with children",
                    "Check and update the family emergency kit",
                    "Discuss different types of natural disasters"
                  ].map((topic, index) => (
                    <div key={index} className="flex items-center gap-3 p-3 border rounded-lg">
                      <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-medium ${
                        index === 0 ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground'
                      }`}>
                        {index + 1}
                      </div>
                      <span className="flex-1 text-sm">{topic}</span>
                      <Button variant="ghost" size="sm">Mark Done</Button>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="family" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Family Preparedness Checklist</CardTitle>
                  <CardDescription>Essential items and plans for your family</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {[
                      { item: "Emergency contact list", checked: true },
                      { item: "Family meeting point established", checked: true },
                      { item: "Emergency kit assembled", checked: false },
                      { item: "Important documents secured", checked: true },
                      { item: "Communication plan practiced", checked: false },
                      { item: "Home hazard assessment done", checked: false }
                    ].map((task, index) => (
                      <div key={index} className="flex items-center gap-3">
                        <div className={`w-5 h-5 rounded border-2 flex items-center justify-center ${
                          task.checked ? 'bg-success border-success' : 'border-muted-foreground'
                        }`}>
                          {task.checked && <div className="w-2 h-2 bg-white rounded-full" />}
                        </div>
                        <span className={`text-sm flex-1 ${task.checked ? 'line-through text-muted-foreground' : ''}`}>
                          {task.item}
                        </span>
                      </div>
                    ))}
                  </div>
                  <Button className="w-full mt-4">Update Checklist</Button>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Home Safety Tips</CardTitle>
                  <CardDescription>Recommended improvements for your home</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {[
                      { tip: "Install smoke detectors", priority: "High", icon: "🔥" },
                      { tip: "Secure heavy furniture", priority: "Medium", icon: "🏠" },
                      { tip: "Create emergency supplies kit", priority: "High", icon: "🧳" },
                      { tip: "Practice evacuation routes", priority: "Medium", icon: "🚪" }
                    ].map((tip, index) => (
                      <div key={index} className="flex items-center gap-3 p-3 border rounded-lg">
                        <span className="text-2xl">{tip.icon}</span>
                        <div className="flex-1">
                          <p className="font-medium text-sm">{tip.tip}</p>
                          <Badge 
                            variant={tip.priority === 'High' ? 'destructive' : 'secondary'}
                            className="text-xs mt-1"
                          >
                            {tip.priority} Priority
                          </Badge>
                        </div>
                        <Button variant="outline" size="sm">Learn More</Button>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="resources" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                { title: "Emergency Kit Guide", description: "Complete list of essential supplies", icon: Shield },
                { title: "Age-Appropriate Talks", description: "How to discuss disasters with children", icon: BookOpen },
                { title: "Home Safety Checklist", description: "Room-by-room safety assessment", icon: Home },
                { title: "Communication Plan", description: "Family emergency contact template", icon: Bell },
                { title: "Local Resources", description: "Community emergency services", icon: Heart },
                { title: "Printable Materials", description: "Cards, checklists, and guides", icon: BookOpen }
              ].map((resource, index) => (
                <Card key={index} className="cursor-pointer hover:shadow-md transition-shadow">
                  <CardContent className="p-6">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                        <resource.icon className="h-5 w-5 text-primary" />
                      </div>
                      <h3 className="font-medium">{resource.title}</h3>
                    </div>
                    <p className="text-sm text-muted-foreground mb-4">{resource.description}</p>
                    <Button variant="outline" size="sm" className="w-full">Access Resource</Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="updates" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>School Updates & Notifications</CardTitle>
                <CardDescription>Latest news from your children's schools</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[
                    { 
                      title: "Fire Drill Completed Successfully",
                      school: "Central High School",
                      date: "Dec 5, 2024",
                      message: "Emma participated in today's fire drill. Response time was excellent!",
                      type: "success"
                    },
                    {
                      title: "New Learning Module Available",
                      school: "Westside Elementary",
                      date: "Dec 3, 2024",
                      message: "Alex can now access the 'Community Helpers' module. Completion by Dec 15.",
                      type: "info"
                    },
                    {
                      title: "Parent-Teacher Meeting Scheduled",
                      school: "Central High School",
                      date: "Dec 1, 2024",
                      message: "Discuss Emma's progress in disaster preparedness education.",
                      type: "reminder"
                    }
                  ].map((update, index) => (
                    <div key={index} className="p-4 border rounded-lg">
                      <div className="flex items-start gap-3">
                        <div className={`w-2 h-2 rounded-full mt-2 ${
                          update.type === 'success' ? 'bg-success' :
                          update.type === 'info' ? 'bg-primary' : 'bg-warning'
                        }`} />
                        <div className="flex-1">
                          <div className="flex justify-between items-start mb-2">
                            <h4 className="font-medium">{update.title}</h4>
                            <span className="text-xs text-muted-foreground">{update.date}</span>
                          </div>
                          <p className="text-sm text-muted-foreground mb-2">{update.school}</p>
                          <p className="text-sm">{update.message}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default ParentDashboard;
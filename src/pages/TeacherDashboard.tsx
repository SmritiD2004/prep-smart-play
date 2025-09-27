import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";
import { GraduationCap, Users, Calendar, BarChart3, FileText, LogOut } from "lucide-react";

const TeacherDashboard = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const userData = localStorage.getItem('prepsmart_user');
    if (!userData) {
      navigate('/auth?role=teacher');
      return;
    }
    
    const parsedUser = JSON.parse(userData);
    if (parsedUser.role !== 'teacher') {
      navigate('/auth?role=teacher');
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
            <h1 className="text-3xl font-bold">Teacher Dashboard</h1>
            <p className="text-muted-foreground">Welcome back, {user.name}</p>
          </div>
          <Button variant="outline" onClick={handleLogout}>
            <LogOut className="mr-2 h-4 w-4" />
            Logout
          </Button>
        </div>

        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="students">Students</TabsTrigger>
            <TabsTrigger value="drills">Drills</TabsTrigger>
            <TabsTrigger value="reports">Reports</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Total Students</CardTitle>
                  <Users className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">156</div>
                  <p className="text-xs text-muted-foreground">+12 from last month</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Completed Drills</CardTitle>
                  <Calendar className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">24</div>
                  <p className="text-xs text-muted-foreground">This semester</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Average Score</CardTitle>
                  <BarChart3 className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">87%</div>
                  <p className="text-xs text-muted-foreground">Class average</p>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Class Progress</CardTitle>
                <CardDescription>Recent learning module completion rates</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <div className="flex justify-between text-sm mb-2">
                    <span>Earthquake Safety</span>
                    <span>92%</span>
                  </div>
                  <Progress value={92} />
                </div>
                <div>
                  <div className="flex justify-between text-sm mb-2">
                    <span>Flood Preparedness</span>
                    <span>78%</span>
                  </div>
                  <Progress value={78} />
                </div>
                <div>
                  <div className="flex justify-between text-sm mb-2">
                    <span>Fire Safety</span>
                    <span>65%</span>
                  </div>
                  <Progress value={65} />
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="students" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Student Performance</CardTitle>
                <CardDescription>Track individual student progress</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {['Alice Johnson', 'Bob Smith', 'Carol Davis', 'David Wilson'].map((student, index) => (
                    <div key={student} className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
                          <GraduationCap className="h-4 w-4 text-primary" />
                        </div>
                        <div>
                          <p className="font-medium">{student}</p>
                          <p className="text-sm text-muted-foreground">Grade 10</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge variant={index < 2 ? "default" : "secondary"}>
                          Score: {[95, 88, 76, 82][index]}%
                        </Badge>
                        <Button variant="outline" size="sm">View Details</Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="drills" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Drill Management</CardTitle>
                <CardDescription>Schedule and monitor disaster preparedness drills</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <Button>Schedule New Drill</Button>
                  <div className="space-y-3">
                    {['Fire Evacuation Drill', 'Earthquake Response Drill', 'Lockdown Procedure'].map((drill, index) => (
                      <div key={drill} className="flex items-center justify-between p-4 border rounded-lg">
                        <div>
                          <p className="font-medium">{drill}</p>
                          <p className="text-sm text-muted-foreground">
                            Last conducted: {['2 weeks ago', '1 month ago', '3 weeks ago'][index]}
                          </p>
                        </div>
                        <div className="flex gap-2">
                          <Button variant="outline" size="sm">View Results</Button>
                          <Button size="sm">Schedule</Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="reports" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Generate Reports</CardTitle>
                <CardDescription>Create detailed reports for administration</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Button variant="outline" className="h-20">
                    <div className="text-center">
                      <FileText className="h-6 w-6 mx-auto mb-2" />
                      Student Progress Report
                    </div>
                  </Button>
                  <Button variant="outline" className="h-20">
                    <div className="text-center">
                      <BarChart3 className="h-6 w-6 mx-auto mb-2" />
                      Drill Performance Report
                    </div>
                  </Button>
                  <Button variant="outline" className="h-20">
                    <div className="text-center">
                      <Users className="h-6 w-6 mx-auto mb-2" />
                      Class Summary Report
                    </div>
                  </Button>
                  <Button variant="outline" className="h-20">
                    <div className="text-center">
                      <Calendar className="h-6 w-6 mx-auto mb-2" />
                      Monthly Activity Report
                    </div>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default TeacherDashboard;
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";
import { Shield, School, Users, TrendingUp, AlertTriangle, FileCheck, LogOut } from "lucide-react";

const AdminDashboard = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const userData = localStorage.getItem('prepsmart_user');
    if (!userData) {
      navigate('/auth?role=admin');
      return;
    }
    
    const parsedUser = JSON.parse(userData);
    if (parsedUser.role !== 'admin') {
      navigate('/auth?role=admin');
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
    <div className="min-h-screen bg-gradient-to-br from-primary/5 via-background to-warning/5">
      <div className="container mx-auto px-4 py-6">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold">Administrator Dashboard</h1>
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
            <TabsTrigger value="schools">Schools</TabsTrigger>
            <TabsTrigger value="compliance">Compliance</TabsTrigger>
            <TabsTrigger value="alerts">Alerts</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Total Schools</CardTitle>
                  <School className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">45</div>
                  <p className="text-xs text-muted-foreground">In district</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Active Students</CardTitle>
                  <Users className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">12,847</div>
                  <p className="text-xs text-muted-foreground">+5% from last month</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Compliance Rate</CardTitle>
                  <FileCheck className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">94%</div>
                  <p className="text-xs text-muted-foreground">NDMA standards</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Active Alerts</CardTitle>
                  <AlertTriangle className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">3</div>
                  <p className="text-xs text-muted-foreground">Moderate priority</p>
                </CardContent>
              </Card>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>District Preparedness</CardTitle>
                  <CardDescription>Overall readiness metrics by category</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <div className="flex justify-between text-sm mb-2">
                      <span>Earthquake Preparedness</span>
                      <span>96%</span>
                    </div>
                    <Progress value={96} />
                  </div>
                  <div>
                    <div className="flex justify-between text-sm mb-2">
                      <span>Fire Safety</span>
                      <span>88%</span>
                    </div>
                    <Progress value={88} />
                  </div>
                  <div>
                    <div className="flex justify-between text-sm mb-2">
                      <span>Flood Response</span>
                      <span>79%</span>
                    </div>
                    <Progress value={79} />
                  </div>
                  <div>
                    <div className="flex justify-between text-sm mb-2">
                      <span>General Emergency</span>
                      <span>92%</span>
                    </div>
                    <Progress value={92} />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Recent Activities</CardTitle>
                  <CardDescription>Latest system events and updates</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {[
                      { action: "Drill completed", school: "Central High School", time: "2 hours ago", type: "success" },
                      { action: "Compliance report submitted", school: "Westside Elementary", time: "4 hours ago", type: "info" },
                      { action: "Alert acknowledged", school: "North Campus", time: "6 hours ago", type: "warning" },
                      { action: "New teacher registered", school: "South Middle School", time: "1 day ago", type: "info" }
                    ].map((activity, index) => (
                      <div key={index} className="flex items-center gap-3 p-3 border rounded-lg">
                        <div className={`w-2 h-2 rounded-full ${
                          activity.type === 'success' ? 'bg-success' : 
                          activity.type === 'warning' ? 'bg-warning' : 'bg-primary'
                        }`} />
                        <div className="flex-1">
                          <p className="font-medium text-sm">{activity.action}</p>
                          <p className="text-xs text-muted-foreground">{activity.school}</p>
                        </div>
                        <p className="text-xs text-muted-foreground">{activity.time}</p>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="schools" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>School Performance</CardTitle>
                <CardDescription>Monitor individual school preparedness levels</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[
                    { name: "Central High School", students: 1250, compliance: 98, drills: 24 },
                    { name: "Westside Elementary", students: 680, compliance: 95, drills: 18 },
                    { name: "North Campus", students: 890, compliance: 92, drills: 20 },
                    { name: "South Middle School", students: 720, compliance: 87, drills: 16 }
                  ].map((school, index) => (
                    <div key={school.name} className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                          <School className="h-5 w-5 text-primary" />
                        </div>
                        <div>
                          <p className="font-medium">{school.name}</p>
                          <p className="text-sm text-muted-foreground">{school.students} students</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-4">
                        <div className="text-center">
                          <p className="text-sm font-medium">{school.compliance}%</p>
                          <p className="text-xs text-muted-foreground">Compliance</p>
                        </div>
                        <div className="text-center">
                          <p className="text-sm font-medium">{school.drills}</p>
                          <p className="text-xs text-muted-foreground">Drills</p>
                        </div>
                        <Button variant="outline" size="sm">View Details</Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="compliance" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>NDMA Compliance Monitoring</CardTitle>
                <CardDescription>Track adherence to national disaster management standards</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <h3 className="font-semibold">Compliance Categories</h3>
                    {[
                      { category: "Emergency Evacuation Plans", score: 96, status: "Excellent" },
                      { category: "First Aid Preparedness", score: 88, status: "Good" },
                      { category: "Communication Systems", score: 92, status: "Excellent" },
                      { category: "Staff Training", score: 84, status: "Good" }
                    ].map((item, index) => (
                      <div key={index} className="p-4 border rounded-lg">
                        <div className="flex justify-between items-center mb-2">
                          <span className="font-medium">{item.category}</span>
                          <Badge variant={item.score >= 90 ? "default" : "secondary"}>
                            {item.status}
                          </Badge>
                        </div>
                        <div className="flex justify-between text-sm mb-1">
                          <span>Compliance Score</span>
                          <span>{item.score}%</span>
                        </div>
                        <Progress value={item.score} />
                      </div>
                    ))}
                  </div>
                  <div>
                    <h3 className="font-semibold mb-4">Action Items</h3>
                    <div className="space-y-3">
                      {[
                        "Update emergency contact lists in 3 schools",
                        "Schedule quarterly fire drills for 2 locations",
                        "Submit monthly compliance report to state board",
                        "Review and update evacuation signage"
                      ].map((item, index) => (
                        <div key={index} className="flex items-center gap-3 p-3 bg-muted/50 rounded-lg">
                          <div className="w-2 h-2 bg-warning rounded-full" />
                          <span className="text-sm">{item}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="alerts" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Alert Management</CardTitle>
                <CardDescription>Monitor and respond to emergency alerts</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <Button>Create New Alert</Button>
                  <div className="space-y-3">
                    {[
                      { type: "Weather Advisory", message: "Heavy rainfall expected in district", priority: "Medium", time: "2 hours ago" },
                      { type: "Drill Reminder", message: "Quarterly earthquake drill scheduled", priority: "Low", time: "1 day ago" },
                      { type: "System Update", message: "PrepSmart platform maintenance", priority: "Low", time: "3 days ago" }
                    ].map((alert, index) => (
                      <div key={index} className="p-4 border rounded-lg">
                        <div className="flex justify-between items-start mb-2">
                          <div>
                            <p className="font-medium">{alert.type}</p>
                            <p className="text-sm text-muted-foreground">{alert.message}</p>
                          </div>
                          <Badge 
                            variant={alert.priority === 'High' ? 'destructive' : 
                                    alert.priority === 'Medium' ? 'default' : 'secondary'}
                          >
                            {alert.priority}
                          </Badge>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-xs text-muted-foreground">{alert.time}</span>
                          <div className="flex gap-2">
                            <Button variant="outline" size="sm">Edit</Button>
                            <Button variant="outline" size="sm">Resolve</Button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default AdminDashboard;
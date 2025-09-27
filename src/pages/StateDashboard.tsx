import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";
import { BarChart3, MapPin, TrendingUp, FileCheck, Users, Building, LogOut } from "lucide-react";

const StateDashboard = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const userData = localStorage.getItem('prepsmart_user');
    if (!userData) {
      navigate('/auth?role=state-board');
      return;
    }
    
    const parsedUser = JSON.parse(userData);
    if (parsedUser.role !== 'state-board') {
      navigate('/auth?role=state-board');
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
    <div className="min-h-screen bg-gradient-to-br from-primary/5 via-background to-info/5">
      <div className="container mx-auto px-4 py-6">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold">State Education Board</h1>
            <p className="text-muted-foreground">Welcome back, {user.name}</p>
          </div>
          <Button variant="outline" onClick={handleLogout}>
            <LogOut className="mr-2 h-4 w-4" />
            Logout
          </Button>
        </div>

        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="overview">State Overview</TabsTrigger>
            <TabsTrigger value="districts">Districts</TabsTrigger>
            <TabsTrigger value="compliance">Compliance</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Total Districts</CardTitle>
                  <MapPin className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">28</div>
                  <p className="text-xs text-muted-foreground">Across the state</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Total Schools</CardTitle>
                  <Building className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">1,245</div>
                  <p className="text-xs text-muted-foreground">+24 new this year</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Active Students</CardTitle>
                  <Users className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">485,320</div>
                  <p className="text-xs text-muted-foreground">Enrolled in PrepSmart</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">State Compliance</CardTitle>
                  <FileCheck className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">91%</div>
                  <p className="text-xs text-muted-foreground">NDMA standards</p>
                </CardContent>
              </Card>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Regional Performance</CardTitle>
                  <CardDescription>Preparedness scores by region</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {[
                    { region: "Northern Region", districts: 8, score: 94, trend: "up" },
                    { region: "Central Region", districts: 7, score: 89, trend: "up" },
                    { region: "Southern Region", districts: 9, score: 86, trend: "down" },
                    { region: "Eastern Region", districts: 4, score: 92, trend: "up" }
                  ].map((region, index) => (
                    <div key={index} className="space-y-2">
                      <div className="flex justify-between items-center">
                        <div>
                          <span className="font-medium">{region.region}</span>
                          <span className="text-sm text-muted-foreground ml-2">
                            ({region.districts} districts)
                          </span>
                        </div>
                        <div className="flex items-center gap-2">
                          <TrendingUp 
                            className={`h-4 w-4 ${region.trend === 'up' ? 'text-success' : 'text-destructive'}`}
                          />
                          <span className="font-medium">{region.score}%</span>
                        </div>
                      </div>
                      <Progress value={region.score} />
                    </div>
                  ))}
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Policy Implementation Status</CardTitle>
                  <CardDescription>Current state policy rollout progress</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {[
                      { policy: "Disaster Education Curriculum 2024", progress: 88, status: "Active" },
                      { policy: "Emergency Response Protocol", progress: 95, status: "Complete" },
                      { policy: "Teacher Training Program", progress: 72, status: "Active" },
                      { policy: "Infrastructure Safety Standards", progress: 65, status: "In Progress" }
                    ].map((policy, index) => (
                      <div key={index} className="space-y-2">
                        <div className="flex justify-between items-center">
                          <span className="font-medium text-sm">{policy.policy}</span>
                          <Badge 
                            variant={
                              policy.status === 'Complete' ? 'default' :
                              policy.status === 'Active' ? 'secondary' : 'outline'
                            }
                          >
                            {policy.status}
                          </Badge>
                        </div>
                        <div className="flex justify-between text-xs text-muted-foreground mb-1">
                          <span>Implementation Progress</span>
                          <span>{policy.progress}%</span>
                        </div>
                        <Progress value={policy.progress} />
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="districts" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>District Performance Overview</CardTitle>
                <CardDescription>Detailed breakdown by district</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[
                    { name: "Mumbai District", schools: 145, students: 85420, compliance: 96, drills: 342 },
                    { name: "Pune District", schools: 89, students: 52340, compliance: 94, drills: 267 },
                    { name: "Nashik District", schools: 67, students: 38910, compliance: 89, drills: 198 },
                    { name: "Nagpur District", schools: 78, students: 45680, compliance: 87, drills: 234 },
                    { name: "Kolhapur District", schools: 54, students: 31250, compliance: 92, drills: 162 }
                  ].map((district, index) => (
                    <div key={district.name} className="p-4 border rounded-lg">
                      <div className="flex justify-between items-start mb-4">
                        <div>
                          <h3 className="font-semibold">{district.name}</h3>
                          <div className="grid grid-cols-3 gap-4 text-sm text-muted-foreground mt-2">
                            <span>{district.schools} schools</span>
                            <span>{district.students.toLocaleString()} students</span>
                            <span>{district.drills} drills completed</span>
                          </div>
                        </div>
                        <Badge 
                          variant={district.compliance >= 90 ? 'default' : 'secondary'}
                        >
                          {district.compliance}% Compliant
                        </Badge>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <Button variant="outline" size="sm">View Details</Button>
                        <Button variant="outline" size="sm">Generate Report</Button>
                        <Button variant="outline" size="sm">Contact District</Button>
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
                <CardDescription>State-wide adherence to national guidelines</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <h3 className="font-semibold">Compliance Categories</h3>
                    {[
                      { category: "Emergency Preparedness Plans", score: 93, benchmark: 90 },
                      { category: "Infrastructure Safety", score: 87, benchmark: 85 },
                      { category: "Training & Drills", score: 89, benchmark: 88 },
                      { category: "Communication Systems", score: 94, benchmark: 90 },
                      { category: "Resource Allocation", score: 86, benchmark: 80 },
                      { category: "Documentation & Reporting", score: 96, benchmark: 95 }
                    ].map((item, index) => (
                      <div key={index} className="p-4 border rounded-lg">
                        <div className="flex justify-between items-center mb-2">
                          <span className="font-medium">{item.category}</span>
                          <div className="flex items-center gap-2">
                            <Badge 
                              variant={item.score >= item.benchmark ? "default" : "secondary"}
                            >
                              {item.score >= item.benchmark ? "Meeting" : "Below"} Target
                            </Badge>
                          </div>
                        </div>
                        <div className="flex justify-between text-sm mb-1">
                          <span>Current: {item.score}%</span>
                          <span>Target: {item.benchmark}%</span>
                        </div>
                        <Progress value={item.score} />
                      </div>
                    ))}
                  </div>
                  
                  <div>
                    <h3 className="font-semibold mb-4">Action Items</h3>
                    <div className="space-y-3">
                      {[
                        { item: "Review infrastructure safety in 12 districts", priority: "High", due: "Dec 15" },
                        { item: "Update emergency response protocols", priority: "Medium", due: "Dec 20" },
                        { item: "Conduct quarterly compliance audit", priority: "High", due: "Dec 30" },
                        { item: "Submit annual report to NDMA", priority: "Critical", due: "Jan 5" }
                      ].map((action, index) => (
                        <div key={index} className="p-3 border rounded-lg">
                          <div className="flex justify-between items-start mb-2">
                            <span className="font-medium text-sm">{action.item}</span>
                            <Badge 
                              variant={
                                action.priority === 'Critical' ? 'destructive' :
                                action.priority === 'High' ? 'default' : 'secondary'
                              }
                            >
                              {action.priority}
                            </Badge>
                          </div>
                          <div className="flex justify-between items-center">
                            <span className="text-xs text-muted-foreground">Due: {action.due}</span>
                            <Button variant="outline" size="sm">Track</Button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="analytics" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>State Analytics Dashboard</CardTitle>
                <CardDescription>Data insights and trends across the state</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg">Engagement Metrics</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        {[
                          { metric: "Active Students", value: "485,320", change: "+12%" },
                          { metric: "Completed Modules", value: "1.2M", change: "+18%" },
                          { metric: "Drill Participation", value: "98.5%", change: "+2%" },
                          { metric: "Teacher Engagement", value: "89%", change: "+5%" }
                        ].map((metric, index) => (
                          <div key={index} className="flex justify-between items-center p-3 bg-muted/50 rounded-lg">
                            <span className="font-medium">{metric.metric}</span>
                            <div className="text-right">
                              <div className="font-bold">{metric.value}</div>
                              <div className="text-xs text-success">{metric.change}</div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg">Preparedness Trends</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        {[
                          { disaster: "Earthquake", preparedness: 94, trend: "Stable" },
                          { disaster: "Flood", preparedness: 87, trend: "Improving" },
                          { disaster: "Fire", preparedness: 91, trend: "Improving" },
                          { disaster: "Cyclone", preparedness: 83, trend: "Declining" }
                        ].map((item, index) => (
                          <div key={index} className="flex justify-between items-center p-3 bg-muted/50 rounded-lg">
                            <span className="font-medium">{item.disaster} Preparedness</span>
                            <div className="text-right">
                              <div className="font-bold">{item.preparedness}%</div>
                              <Badge 
                                variant={
                                  item.trend === 'Improving' ? 'default' :
                                  item.trend === 'Stable' ? 'secondary' : 'destructive'
                                }
                                className="text-xs"
                              >
                                {item.trend}
                              </Badge>
                            </div>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </div>

                <Card>
                  <CardHeader>
                    <CardTitle>Export & Reports</CardTitle>
                    <CardDescription>Generate comprehensive state reports</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                      <Button variant="outline" className="h-20">
                        <div className="text-center">
                          <BarChart3 className="h-6 w-6 mx-auto mb-2" />
                          State Performance Report
                        </div>
                      </Button>
                      <Button variant="outline" className="h-20">
                        <div className="text-center">
                          <FileCheck className="h-6 w-6 mx-auto mb-2" />
                          Compliance Summary
                        </div>
                      </Button>
                      <Button variant="outline" className="h-20">
                        <div className="text-center">
                          <TrendingUp className="h-6 w-6 mx-auto mb-2" />
                          Trend Analysis
                        </div>
                      </Button>
                      <Button variant="outline" className="h-20">
                        <div className="text-center">
                          <MapPin className="h-6 w-6 mx-auto mb-2" />
                          District Comparison
                        </div>
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default StateDashboard;
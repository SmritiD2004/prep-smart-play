import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";
import { Globe, AlertTriangle, TrendingUp, Users, Building, MapPin, LogOut } from "lucide-react";

const NationalDashboard = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const userData = localStorage.getItem('prepsmart_user');
    if (!userData) {
      navigate('/auth?role=national-agency');
      return;
    }
    
    const parsedUser = JSON.parse(userData);
    if (parsedUser.role !== 'national-agency') {
      navigate('/auth?role=national-agency');
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
    <div className="min-h-screen bg-gradient-to-br from-destructive/5 via-background to-primary/5">
      <div className="container mx-auto px-4 py-6">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold">NDMA/NDRF National Command</h1>
            <p className="text-muted-foreground">Welcome back, {user.name}</p>
          </div>
          <Button variant="outline" onClick={handleLogout}>
            <LogOut className="mr-2 h-4 w-4" />
            Logout
          </Button>
        </div>

        <Tabs defaultValue="national" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="national">National Overview</TabsTrigger>
            <TabsTrigger value="states">State Monitoring</TabsTrigger>
            <TabsTrigger value="alerts">Alert System</TabsTrigger>
            <TabsTrigger value="intelligence">Intelligence</TabsTrigger>
          </TabsList>

          <TabsContent value="national" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Total States</CardTitle>
                  <MapPin className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">28</div>
                  <p className="text-xs text-muted-foreground">+ 8 UTs</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Total Schools</CardTitle>
                  <Building className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">15.2K</div>
                  <p className="text-xs text-muted-foreground">Active on platform</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Active Students</CardTitle>
                  <Users className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">4.8M</div>
                  <p className="text-xs text-muted-foreground">Nationwide enrollment</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">National Readiness</CardTitle>
                  <Globe className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">89%</div>
                  <p className="text-xs text-muted-foreground">Overall preparedness</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Active Alerts</CardTitle>
                  <AlertTriangle className="h-4 w-4 text-destructive" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">7</div>
                  <p className="text-xs text-muted-foreground">Nationwide</p>
                </CardContent>
              </Card>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>National Preparedness Index</CardTitle>
                  <CardDescription>Disaster readiness by category across India</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {[
                    { disaster: "Earthquake", readiness: 91, trend: "up", priority: "High" },
                    { disaster: "Flood", readiness: 85, trend: "up", priority: "Critical" },
                    { disaster: "Cyclone", readiness: 88, trend: "stable", priority: "High" },
                    { disaster: "Drought", readiness: 82, trend: "down", priority: "Medium" },
                    { disaster: "Tsunami", readiness: 94, trend: "up", priority: "Critical" },
                    { disaster: "Forest Fire", readiness: 79, trend: "down", priority: "Medium" }
                  ].map((item, index) => (
                    <div key={index} className="space-y-2">
                      <div className="flex justify-between items-center">
                        <div className="flex items-center gap-2">
                          <span className="font-medium">{item.disaster}</span>
                          <Badge 
                            variant={
                              item.priority === 'Critical' ? 'destructive' :
                              item.priority === 'High' ? 'default' : 'secondary'
                            }
                            className="text-xs"
                          >
                            {item.priority}
                          </Badge>
                        </div>
                        <div className="flex items-center gap-2">
                          <TrendingUp 
                            className={`h-4 w-4 ${
                              item.trend === 'up' ? 'text-success' : 
                              item.trend === 'stable' ? 'text-muted-foreground' : 'text-destructive'
                            }`}
                          />
                          <span className="font-medium">{item.readiness}%</span>
                        </div>
                      </div>
                      <Progress value={item.readiness} />
                    </div>
                  ))}
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Critical National Alerts</CardTitle>
                  <CardDescription>High-priority situations requiring NDMA attention</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {[
                      {
                        alert: "Cyclone Warning - East Coast",
                        states: "Odisha, West Bengal, Andhra Pradesh",
                        severity: "Critical",
                        time: "2 hours ago",
                        affected: "2.4M people"
                      },
                      {
                        alert: "Flood Alert - North India",
                        states: "Punjab, Haryana, UP",
                        severity: "High", 
                        time: "6 hours ago",
                        affected: "850K people"
                      },
                      {
                        alert: "Earthquake Preparedness Review",
                        states: "Uttarakhand, HP",
                        severity: "Medium",
                        time: "1 day ago",
                        affected: "Assessment ongoing"
                      }
                    ].map((alert, index) => (
                      <div key={index} className="p-4 border rounded-lg">
                        <div className="flex justify-between items-start mb-2">
                          <div>
                            <h4 className="font-semibold text-sm">{alert.alert}</h4>
                            <p className="text-xs text-muted-foreground">{alert.states}</p>
                          </div>
                          <Badge 
                            variant={
                              alert.severity === 'Critical' ? 'destructive' :
                              alert.severity === 'High' ? 'default' : 'secondary'
                            }
                          >
                            {alert.severity}
                          </Badge>
                        </div>
                        <div className="flex justify-between text-xs text-muted-foreground mb-3">
                          <span>Affected: {alert.affected}</span>
                          <span>{alert.time}</span>
                        </div>
                        <div className="flex gap-2">
                          <Button size="sm" className="flex-1">Coordinate Response</Button>
                          <Button variant="outline" size="sm">View Details</Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Monthly Performance Summary</CardTitle>
                <CardDescription>Key metrics and achievements for December 2024</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                  {[
                    { metric: "Drills Conducted", value: "15,420", target: "14,000", status: "exceeding" },
                    { metric: "Students Trained", value: "485K", target: "450K", status: "exceeding" },
                    { metric: "Teachers Certified", value: "12,350", target: "12,000", status: "meeting" },
                    { metric: "Schools Compliant", value: "13,890", target: "14,500", status: "below" }
                  ].map((item, index) => (
                    <div key={index} className="text-center p-4 border rounded-lg">
                      <h4 className="font-medium text-sm mb-2">{item.metric}</h4>
                      <div className="text-2xl font-bold mb-1">{item.value}</div>
                      <div className="text-xs text-muted-foreground mb-2">Target: {item.target}</div>
                      <Badge 
                        variant={
                          item.status === 'exceeding' ? 'default' :
                          item.status === 'meeting' ? 'secondary' : 'destructive'
                        }
                      >
                        {item.status === 'exceeding' ? 'Exceeding' :
                         item.status === 'meeting' ? 'On Track' : 'Below Target'}
                      </Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="states" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>State Performance Monitoring</CardTitle>
                <CardDescription>Real-time oversight of state-level preparedness</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[
                    { state: "Maharashtra", score: 94, schools: 1245, students: "485K", trend: "up", priority: "Low" },
                    { state: "Uttar Pradesh", score: 87, schools: 2100, students: "820K", trend: "up", priority: "Medium" },
                    { state: "Tamil Nadu", score: 92, schools: 980, students: "380K", trend: "stable", priority: "Low" },
                    { state: "West Bengal", score: 85, schools: 1120, students: "450K", trend: "down", priority: "High" },
                    { state: "Karnataka", score: 89, schools: 890, students: "340K", trend: "up", priority: "Medium" },
                    { state: "Rajasthan", score: 82, schools: 1050, students: "410K", trend: "down", priority: "High" }
                  ].map((state, index) => (
                    <div key={state.state} className="p-4 border rounded-lg">
                      <div className="flex justify-between items-start mb-4">
                        <div>
                          <div className="flex items-center gap-3 mb-2">
                            <h3 className="font-semibold">{state.state}</h3>
                            <Badge 
                              variant={
                                state.priority === 'Low' ? 'secondary' :
                                state.priority === 'Medium' ? 'default' : 'destructive'
                              }
                            >
                              {state.priority} Priority
                            </Badge>
                          </div>
                          <div className="grid grid-cols-3 gap-4 text-sm text-muted-foreground">
                            <span>{state.schools} schools</span>
                            <span>{state.students} students</span>
                            <span>Score: {state.score}%</span>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <TrendingUp 
                            className={`h-4 w-4 ${
                              state.trend === 'up' ? 'text-success' : 
                              state.trend === 'stable' ? 'text-muted-foreground' : 'text-destructive'
                            }`}
                          />
                          <Progress value={state.score} className="w-24" />
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm">View Dashboard</Button>
                        <Button variant="outline" size="sm">Contact State Board</Button>
                        <Button variant="outline" size="sm">Generate Report</Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="alerts" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>National Alert Management</CardTitle>
                <CardDescription>Coordinate disaster alerts across the nation</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex gap-2 mb-4">
                    <Button>Issue New Alert</Button>
                    <Button variant="outline">Broadcast to All States</Button>
                    <Button variant="outline">Emergency Protocol</Button>
                  </div>

                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    <Card>
                      <CardHeader>
                        <CardTitle className="text-lg">Active National Alerts</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-3">
                          {[
                            { 
                              id: "NDMA-2024-001",
                              type: "Cyclone Warning",
                              region: "Eastern Coast",
                              severity: "Critical",
                              issued: "2 hours ago",
                              status: "Active"
                            },
                            {
                              id: "NDMA-2024-002", 
                              type: "Flood Alert",
                              region: "Northern Plains",
                              severity: "High",
                              issued: "6 hours ago",
                              status: "Monitoring"
                            },
                            {
                              id: "NDMA-2024-003",
                              type: "Heat Wave Advisory",
                              region: "Central India",
                              severity: "Medium",
                              issued: "1 day ago",
                              status: "Advisory"
                            }
                          ].map((alert, index) => (
                            <div key={alert.id} className="p-3 border rounded-lg">
                              <div className="flex justify-between items-start mb-2">
                                <div>
                                  <h4 className="font-medium">{alert.type}</h4>
                                  <p className="text-sm text-muted-foreground">{alert.region}</p>
                                </div>
                                <Badge 
                                  variant={
                                    alert.severity === 'Critical' ? 'destructive' :
                                    alert.severity === 'High' ? 'default' : 'secondary'
                                  }
                                >
                                  {alert.severity}
                                </Badge>
                              </div>
                              <div className="flex justify-between items-center">
                                <span className="text-xs text-muted-foreground">
                                  {alert.id} • {alert.issued}
                                </span>
                                <div className="flex gap-1">
                                  <Button variant="outline" size="sm">Update</Button>
                                  <Button variant="outline" size="sm">Broadcast</Button>
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </CardContent>
                    </Card>

                    <Card>
                      <CardHeader>
                        <CardTitle className="text-lg">Alert Response Status</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-4">
                          {[
                            { state: "Odisha", alert: "Cyclone Warning", response: "Acknowledged", teams: "5 deployed" },
                            { state: "West Bengal", alert: "Cyclone Warning", response: "Acknowledged", teams: "3 deployed" },
                            { state: "Punjab", alert: "Flood Alert", response: "Responding", teams: "2 deployed" },
                            { state: "Haryana", alert: "Flood Alert", response: "Acknowledged", teams: "1 standby" }
                          ].map((response, index) => (
                            <div key={index} className="p-3 bg-muted/50 rounded-lg">
                              <div className="flex justify-between items-center mb-2">
                                <span className="font-medium">{response.state}</span>
                                <Badge variant="outline">{response.response}</Badge>
                              </div>
                              <div className="text-sm text-muted-foreground">
                                <div>{response.alert}</div>
                                <div>{response.teams}</div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="intelligence" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>National Intelligence Dashboard</CardTitle>
                <CardDescription>Strategic insights and predictive analytics</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg">Vulnerability Assessment</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        {[
                          { region: "Coastal Areas", risk: "High", primary: "Cyclone/Tsunami", trend: "Increasing" },
                          { region: "Himalayan States", risk: "High", primary: "Earthquake", trend: "Stable" },
                          { region: "Gangetic Plains", risk: "Medium", primary: "Flood", trend: "Seasonal" },
                          { region: "Western Ghats", risk: "Medium", primary: "Landslide", trend: "Stable" },
                          { region: "Deccan Plateau", risk: "Low", primary: "Drought", trend: "Decreasing" }
                        ].map((area, index) => (
                          <div key={index} className="p-3 border rounded-lg">
                            <div className="flex justify-between items-center mb-2">
                              <span className="font-medium">{area.region}</span>
                              <Badge 
                                variant={
                                  area.risk === 'High' ? 'destructive' :
                                  area.risk === 'Medium' ? 'default' : 'secondary'
                                }
                              >
                                {area.risk} Risk
                              </Badge>
                            </div>
                            <div className="text-sm text-muted-foreground">
                              <div>Primary Threat: {area.primary}</div>
                              <div>Trend: {area.trend}</div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg">Predictive Analytics</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div className="p-4 bg-warning/10 border border-warning/20 rounded-lg">
                          <h4 className="font-semibold text-warning-foreground mb-2">Early Warning Indicators</h4>
                          <ul className="text-sm space-y-1">
                            <li>• Monsoon pattern suggests 15% higher flood risk this season</li>
                            <li>• Seismic activity increased in Himalayan region (2 weeks)</li>
                            <li>• Cyclone formation probability: 72% (next 30 days)</li>
                          </ul>
                        </div>

                        <div className="p-4 bg-info/10 border border-info/20 rounded-lg">
                          <h4 className="font-semibold text-info-foreground mb-2">Resource Optimization</h4>
                          <ul className="text-sm space-y-1">
                            <li>• Deploy 3 additional NDRF teams to eastern coast</li>
                            <li>• Increase medical supplies in flood-prone areas by 25%</li>
                            <li>• Schedule evacuation drills in high-risk coastal zones</li>
                          </ul>
                        </div>

                        <div className="p-4 bg-success/10 border border-success/20 rounded-lg">
                          <h4 className="font-semibold text-success-foreground mb-2">Success Metrics</h4>
                          <ul className="text-sm space-y-1">
                            <li>• Response time improved by 23% vs last year</li>
                            <li>• Student preparedness scores up 18% nationally</li>
                            <li>• 94% of schools now meet basic safety standards</li>
                          </ul>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default NationalDashboard;
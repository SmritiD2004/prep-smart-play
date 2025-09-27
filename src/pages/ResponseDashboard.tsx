import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";
import { AlertTriangle, MapPin, Radio, Users, Clock, CheckCircle, LogOut } from "lucide-react";

const ResponseDashboard = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const userData = localStorage.getItem('prepsmart_user');
    if (!userData) {
      navigate('/auth?role=response-team');
      return;
    }
    
    const parsedUser = JSON.parse(userData);
    if (parsedUser.role !== 'response-team') {
      navigate('/auth?role=response-team');
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
    <div className="min-h-screen bg-gradient-to-br from-destructive/5 via-background to-warning/5">
      <div className="container mx-auto px-4 py-6">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold">Response Team Dashboard</h1>
            <p className="text-muted-foreground">Welcome back, {user.name}</p>
          </div>
          <Button variant="outline" onClick={handleLogout}>
            <LogOut className="mr-2 h-4 w-4" />
            Logout
          </Button>
        </div>

        <Tabs defaultValue="alerts" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="alerts">Active Alerts</TabsTrigger>
            <TabsTrigger value="coordination">Coordination</TabsTrigger>
            <TabsTrigger value="resources">Resources</TabsTrigger>
            <TabsTrigger value="reports">Reports</TabsTrigger>
          </TabsList>

          <TabsContent value="alerts" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Active Alerts</CardTitle>
                  <AlertTriangle className="h-4 w-4 text-destructive" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-destructive">2</div>
                  <p className="text-xs text-muted-foreground">High Priority</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Response Time</CardTitle>
                  <Clock className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">4.2m</div>
                  <p className="text-xs text-muted-foreground">Average response</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Team Status</CardTitle>
                  <Users className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">12/15</div>
                  <p className="text-xs text-muted-foreground">Available</p>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <AlertTriangle className="h-5 w-5 text-destructive" />
                  Current Emergency Alerts
                </CardTitle>
                <CardDescription>Real-time disaster alerts requiring immediate attention</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[
                    {
                      id: "ALERT-001",
                      type: "Flood Warning",
                      location: "District 5, Sector 12",
                      severity: "High",
                      time: "15 minutes ago",
                      status: "Active",
                      description: "Heavy rainfall causing water logging in residential areas"
                    },
                    {
                      id: "ALERT-002", 
                      type: "School Emergency",
                      location: "Central High School",
                      severity: "Medium",
                      time: "32 minutes ago",
                      status: "Responding",
                      description: "Fire alarm triggered, evacuation in progress"
                    },
                    {
                      id: "ALERT-003",
                      type: "Weather Advisory",
                      location: "Entire District",
                      severity: "Low",
                      time: "1 hour ago",
                      status: "Monitoring",
                      description: "Strong winds expected, securing outdoor equipment"
                    }
                  ].map((alert) => (
                    <div key={alert.id} className="p-4 border rounded-lg">
                      <div className="flex justify-between items-start mb-3">
                        <div>
                          <div className="flex items-center gap-2 mb-1">
                            <h4 className="font-semibold">{alert.type}</h4>
                            <Badge 
                              variant={
                                alert.severity === 'High' ? 'destructive' :
                                alert.severity === 'Medium' ? 'default' : 'secondary'
                              }
                            >
                              {alert.severity}
                            </Badge>
                          </div>
                          <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
                            <MapPin className="h-4 w-4" />
                            {alert.location}
                          </div>
                          <p className="text-sm">{alert.description}</p>
                        </div>
                        <div className="text-right">
                          <Badge variant="outline" className="mb-2">
                            {alert.status}
                          </Badge>
                          <p className="text-xs text-muted-foreground">{alert.time}</p>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <Button size="sm">Respond</Button>
                        <Button variant="outline" size="sm">Coordinate</Button>
                        <Button variant="outline" size="sm">Update Status</Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="coordination" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Inter-Agency Coordination</CardTitle>
                <CardDescription>Communication with schools, NDMA, and other response teams</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Card>
                      <CardHeader>
                        <CardTitle className="text-lg">School Liaisons</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-3">
                          {[
                            { school: "Central High School", contact: "Principal Smith", status: "Connected" },
                            { school: "Westside Elementary", contact: "Dr. Johnson", status: "Connected" },
                            { school: "North Campus", contact: "Admin Office", status: "Offline" }
                          ].map((liaison, index) => (
                            <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                              <div>
                                <p className="font-medium">{liaison.school}</p>
                                <p className="text-sm text-muted-foreground">{liaison.contact}</p>
                              </div>
                              <div className="flex items-center gap-2">
                                <div className={`w-2 h-2 rounded-full ${
                                  liaison.status === 'Connected' ? 'bg-success' : 'bg-destructive'
                                }`} />
                                <span className="text-sm">{liaison.status}</span>
                                <Button variant="outline" size="sm">
                                  <Radio className="h-4 w-4" />
                                </Button>
                              </div>
                            </div>
                          ))}
                        </div>
                      </CardContent>
                    </Card>

                    <Card>
                      <CardHeader>
                        <CardTitle className="text-lg">NDMA/NDRF Coordination</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-3">
                          {[
                            { agency: "NDMA Regional Office", status: "Active", priority: "High" },
                            { agency: "NDRF Battalion 12", status: "Standby", priority: "Medium" },
                            { agency: "State Emergency Cell", status: "Active", priority: "High" }
                          ].map((agency, index) => (
                            <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                              <div>
                                <p className="font-medium">{agency.agency}</p>
                                <Badge variant="outline" className="text-xs">
                                  {agency.priority} Priority
                                </Badge>
                              </div>
                              <div className="flex items-center gap-2">
                                <Badge 
                                  variant={agency.status === 'Active' ? 'default' : 'secondary'}
                                >
                                  {agency.status}
                                </Badge>
                                <Button variant="outline" size="sm">Contact</Button>
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

          <TabsContent value="resources" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Resource Management</CardTitle>
                <CardDescription>Track and allocate emergency response resources</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {[
                    { resource: "Emergency Vehicles", available: 8, total: 10, type: "vehicle" },
                    { resource: "Medical Supplies", available: 85, total: 100, type: "medical" },
                    { resource: "Communication Equipment", available: 15, total: 20, type: "communication" },
                    { resource: "Rescue Personnel", available: 12, total: 15, type: "personnel" },
                    { resource: "Relief Materials", available: 75, total: 100, type: "relief" },
                    { resource: "Shelter Capacity", available: 200, total: 250, type: "shelter" }
                  ].map((item, index) => (
                    <Card key={index}>
                      <CardContent className="p-4">
                        <div className="flex justify-between items-center mb-2">
                          <h4 className="font-medium text-sm">{item.resource}</h4>
                          <Badge variant="outline">
                            {item.available}/{item.total}
                          </Badge>
                        </div>
                        <div className="w-full bg-muted rounded-full h-2 mb-3">
                          <div 
                            className="bg-primary rounded-full h-2 transition-all"
                            style={{ width: `${(item.available / item.total) * 100}%` }}
                          />
                        </div>
                        <Button variant="outline" size="sm" className="w-full">
                          Allocate
                        </Button>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="reports" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Response Reports</CardTitle>
                <CardDescription>Document and track emergency response activities</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex gap-2 mb-4">
                    <Button>Generate New Report</Button>
                    <Button variant="outline">Export All</Button>
                  </div>
                  
                  <div className="space-y-3">
                    {[
                      {
                        id: "RPT-2024-001",
                        title: "Flood Response - District 5",
                        date: "Dec 6, 2024",
                        status: "Complete",
                        duration: "3h 25m",
                        affected: "145 people"
                      },
                      {
                        id: "RPT-2024-002", 
                        title: "School Fire Drill - Central High",
                        date: "Dec 5, 2024",
                        status: "Complete",
                        duration: "45m",
                        affected: "1,250 students"
                      },
                      {
                        id: "RPT-2024-003",
                        title: "Weather Advisory Response",
                        date: "Dec 4, 2024", 
                        status: "In Progress",
                        duration: "Ongoing",
                        affected: "5,000+ residents"
                      }
                    ].map((report, index) => (
                      <div key={report.id} className="p-4 border rounded-lg">
                        <div className="flex justify-between items-start mb-2">
                          <div>
                            <h4 className="font-medium">{report.title}</h4>
                            <p className="text-sm text-muted-foreground">{report.id}</p>
                          </div>
                          <Badge 
                            variant={report.status === 'Complete' ? 'default' : 'secondary'}
                          >
                            {report.status}
                          </Badge>
                        </div>
                        <div className="grid grid-cols-3 gap-4 text-sm mt-3">
                          <div>
                            <span className="text-muted-foreground">Date: </span>
                            {report.date}
                          </div>
                          <div>
                            <span className="text-muted-foreground">Duration: </span>
                            {report.duration}
                          </div>
                          <div>
                            <span className="text-muted-foreground">Affected: </span>
                            {report.affected}
                          </div>
                        </div>
                        <div className="flex gap-2 mt-3">
                          <Button variant="outline" size="sm">View Details</Button>
                          <Button variant="outline" size="sm">Download</Button>
                          {report.status === 'Complete' && (
                            <Button variant="outline" size="sm">Share</Button>
                          )}
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

export default ResponseDashboard;
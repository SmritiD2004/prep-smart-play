import { useState, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { useToast } from "@/hooks/use-toast";
import { Shield, Mail, Lock, User, ArrowLeft, Eye, EyeOff } from "lucide-react";

const AuthPage = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    institution: "",
    role: ""
  });

  const role = searchParams.get("role") || "student";

  const roleDetails = {
    student: { title: "Students", description: "Access gamified learning modules and virtual drills" },
    teacher: { title: "Teachers", description: "Manage classes and track student progress" },
    admin: { title: "Administrators", description: "Monitor school-wide preparedness metrics" },
    parent: { title: "Parents", description: "Track child progress and access family guides" },
    "response-team": { title: "Response Teams", description: "Coordinate local disaster response" },
    "state-board": { title: "State Boards", description: "Monitor regional compliance and benchmarks" },
    "national-agency": { title: "National Agencies", description: "NDMA/NDRF oversight and coordination" }
  };

  const currentRole = roleDetails[role as keyof typeof roleDetails] || roleDetails.student;

  useEffect(() => {
    setFormData(prev => ({ ...prev, role }));
  }, [role]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    // Basic validation
    if (!formData.email || !formData.password) {
      toast({
        title: "Error",
        description: "Please fill in all required fields",
        variant: "destructive"
      });
      setLoading(false);
      return;
    }

    if (!isLogin && formData.password !== formData.confirmPassword) {
      toast({
        title: "Error", 
        description: "Passwords do not match",
        variant: "destructive"
      });
      setLoading(false);
      return;
    }

    try {
      // Simulate authentication
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Store user data in localStorage (in real app, use proper auth)
      const userData = {
        name: formData.name || formData.email.split('@')[0],
        email: formData.email,
        role: formData.role,
        institution: formData.institution,
        loginTime: new Date().toISOString()
      };
      
      localStorage.setItem('prepsmart_user', JSON.stringify(userData));
      
      toast({
        title: isLogin ? "Welcome back!" : "Welcome to PrepSmart!",
        description: `Successfully ${isLogin ? 'signed in' : 'created account'} as ${currentRole.title}`,
      });

      // Navigate to role-specific dashboard
      const dashboardRoutes = {
        student: "/student-dashboard",
        teacher: "/teacher-dashboard", 
        admin: "/admin-dashboard",
        parent: "/parent-dashboard",
        "response-team": "/response-dashboard",
        "state-board": "/state-dashboard",
        "national-agency": "/national-dashboard"
      };
      
      navigate(dashboardRoutes[role as keyof typeof dashboardRoutes] || "/student-dashboard");
      
    } catch (error) {
      toast({
        title: "Authentication Error",
        description: "Failed to authenticate. Please try again.",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 via-background to-achievement/5 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <Button
            variant="ghost"
            onClick={() => navigate("/")}
            className="mb-4"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Home
          </Button>
          
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
            <Shield className="h-4 w-4" />
            PrepSmart Authentication
          </div>
          
          <h1 className="text-2xl font-bold">PrepSmart</h1>
        </div>

        <Card className="shadow-lg">
          <CardHeader className="text-center">
            <CardTitle className="text-xl">
              {isLogin ? "Sign In" : "Create Account"}
            </CardTitle>
            <CardDescription>
              {currentRole.title} - {currentRole.description}
            </CardDescription>
          </CardHeader>
          
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              {!isLogin && (
                <div className="space-y-2">
                  <Label htmlFor="name">Full Name</Label>
                  <div className="relative">
                    <User className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="name"
                      name="name"
                      type="text"
                      placeholder="Enter your full name"
                      className="pl-10"
                      value={formData.name}
                      onChange={handleInputChange}
                      required={!isLogin}
                    />
                  </div>
                </div>
              )}

              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="Enter your email"
                    className="pl-10"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                  />
                </div>
              </div>

              {!isLogin && (role === "teacher" || role === "admin" || role === "student") && (
                <div className="space-y-2">
                  <Label htmlFor="institution">Institution/School</Label>
                  <Input
                    id="institution"
                    name="institution"
                    type="text"
                    placeholder="Enter your institution name"
                    value={formData.institution}
                    onChange={handleInputChange}
                  />
                </div>
              )}

              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="password"
                    name="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter your password"
                    className="pl-10 pr-10"
                    value={formData.password}
                    onChange={handleInputChange}
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-3 text-muted-foreground hover:text-foreground"
                  >
                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
              </div>

              {!isLogin && (
                <div className="space-y-2">
                  <Label htmlFor="confirmPassword">Confirm Password</Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="confirmPassword"
                      name="confirmPassword"
                      type={showPassword ? "text" : "password"}
                      placeholder="Confirm your password"
                      className="pl-10"
                      value={formData.confirmPassword}
                      onChange={handleInputChange}
                      required={!isLogin}
                    />
                  </div>
                </div>
              )}

              <Button 
                type="submit" 
                className="w-full" 
                disabled={loading}
              >
                {loading ? "Please wait..." : (isLogin ? "Sign In" : "Create Account")}
              </Button>
            </form>

            <Separator className="my-6" />

            <div className="text-center">
              <p className="text-sm text-muted-foreground">
                {isLogin ? "Don't have an account?" : "Already have an account?"}
              </p>
              <Button
                variant="link"
                onClick={() => setIsLogin(!isLogin)}
                className="p-0 h-auto font-normal"
              >
                {isLogin ? "Create new account" : "Sign in instead"}
              </Button>
            </div>

            <div className="mt-6 p-4 bg-muted/50 rounded-lg">
              <p className="text-xs text-muted-foreground text-center">
                By continuing, you agree to PrepSmart's terms of service and privacy policy. 
                This platform complies with NDMA guidelines for disaster education.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AuthPage;
import { useState, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { useToast } from "@/hooks/use-toast";
import { Shield, Mail, Lock, User, ArrowLeft, Eye, EyeOff, AlertCircle, CheckCircle2 } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { z } from "zod";
import { Alert, AlertDescription } from "@/components/ui/alert";

// Validation schemas
const signInSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(1, "Password is required"),
});

const signUpSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  password: z.string().min(8, "Password must be at least 8 characters"),
  confirmPassword: z.string(),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"],
});

const AuthPage = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [showForgotPassword, setShowForgotPassword] = useState(false);
  const [validationErrors, setValidationErrors] = useState<Record<string, string>>({});
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    institution: "",
    role: "",
    phone: "",
    state: "",
    district: ""
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

  // Check if user is already logged in and redirect
  useEffect(() => {
    const checkSession = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (session) {
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
      }
    };

    checkSession();

    // Listen to auth state changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      if (event === 'SIGNED_IN' && session) {
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
      }
    });

    return () => subscription.unsubscribe();
  }, [navigate, role]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    // Clear validation error for this field
    if (validationErrors[name]) {
      setValidationErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  };

  const getPasswordStrength = (password: string) => {
    if (password.length === 0) return { strength: 0, label: "" };
    if (password.length < 8) return { strength: 1, label: "Weak", color: "text-red-500" };
    
    let strength = 0;
    if (password.length >= 8) strength++;
    if (/[a-z]/.test(password) && /[A-Z]/.test(password)) strength++;
    if (/\d/.test(password)) strength++;
    if (/[^a-zA-Z0-9]/.test(password)) strength++;
    
    if (strength <= 2) return { strength: 2, label: "Fair", color: "text-orange-500" };
    if (strength === 3) return { strength: 3, label: "Good", color: "text-yellow-500" };
    return { strength: 4, label: "Strong", color: "text-green-500" };
  };

  const handleForgotPassword = async () => {
    if (!formData.email) {
      toast({
        title: "Email Required",
        description: "Please enter your email address",
        variant: "destructive"
      });
      return;
    }

    try {
      const { error } = await supabase.auth.resetPasswordForEmail(formData.email, {
        redirectTo: `${window.location.origin}/auth?role=${role}`,
      });

      if (error) throw error;

      toast({
        title: "Check your email",
        description: "We've sent you a password reset link",
      });
      setShowForgotPassword(false);
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive"
      });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setValidationErrors({});

    try {
      // Validate form data
      if (isLogin) {
        const validation = signInSchema.safeParse(formData);
        if (!validation.success) {
          const errors: Record<string, string> = {};
          validation.error.errors.forEach((err) => {
            if (err.path[0]) errors[err.path[0].toString()] = err.message;
          });
          setValidationErrors(errors);
          setLoading(false);
          return;
        }
      } else {
        const validation = signUpSchema.safeParse(formData);
        if (!validation.success) {
          const errors: Record<string, string> = {};
          validation.error.errors.forEach((err) => {
            if (err.path[0]) errors[err.path[0].toString()] = err.message;
          });
          setValidationErrors(errors);
          setLoading(false);
          return;
        }
      }

      if (isLogin) {
        // Sign in existing user
        const { data, error } = await supabase.auth.signInWithPassword({
          email: formData.email,
          password: formData.password,
        });

        if (error) {
          // Provide specific error messages
          let errorMessage = error.message;
          if (error.message.includes("Invalid login credentials")) {
            errorMessage = "Invalid email or password. Please check your credentials and try again.";
          } else if (error.message.includes("Email not confirmed")) {
            errorMessage = "Please verify your email address before signing in.";
          }
          
          throw new Error(errorMessage);
        }

        toast({
          title: "Welcome back!",
          description: `Successfully signed in as ${currentRole.title}`,
        });

        // Navigation handled by onAuthStateChange listener
      } else {
        // Sign up new user
        const { data, error } = await supabase.auth.signUp({
          email: formData.email,
          password: formData.password,
          options: {
            emailRedirectTo: `${window.location.origin}/`,
            data: {
              full_name: formData.name,
              role: formData.role,
              school_name: formData.institution,
              phone: formData.phone || null,
              state: formData.state || null,
              district: formData.district || null,
            }
          }
        });

        if (error) throw error;

        toast({
          title: "Account Created!",
          description: data.user?.identities?.length === 0 
            ? "An account with this email already exists. Please sign in instead."
            : "Your account has been created successfully. Please check your email to verify your account, then sign in.",
        });

        // Switch to login mode after successful signup
        if (data.user?.identities?.length !== 0) {
          setIsLogin(true);
        }
        setLoading(false);
        return;
      }
      
    } catch (error: any) {
      toast({
        title: "Authentication Error",
        description: error.message || "Failed to authenticate. Please try again.",
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
                <Label htmlFor="password">Password {!isLogin && "(min. 8 characters)"}</Label>
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
                {validationErrors.password && (
                  <p className="text-sm text-destructive flex items-center gap-1">
                    <AlertCircle className="h-3 w-3" />
                    {validationErrors.password}
                  </p>
                )}
                {!isLogin && formData.password && (
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <div className="flex-1 h-1 bg-muted rounded-full overflow-hidden">
                        <div 
                          className={`h-full transition-all ${
                            getPasswordStrength(formData.password).strength === 1 ? "w-1/4 bg-red-500" :
                            getPasswordStrength(formData.password).strength === 2 ? "w-2/4 bg-orange-500" :
                            getPasswordStrength(formData.password).strength === 3 ? "w-3/4 bg-yellow-500" :
                            "w-full bg-green-500"
                          }`}
                        />
                      </div>
                      <span className={`text-xs font-medium ${getPasswordStrength(formData.password).color}`}>
                        {getPasswordStrength(formData.password).label}
                      </span>
                    </div>
                    <p className="text-xs text-muted-foreground">
                      Use 8+ characters with uppercase, lowercase, numbers & symbols
                    </p>
                  </div>
                )}
                {isLogin && (
                  <Button
                    type="button"
                    variant="link"
                    onClick={() => setShowForgotPassword(true)}
                    className="p-0 h-auto text-xs"
                  >
                    Forgot password?
                  </Button>
                )}
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
                  {validationErrors.confirmPassword && (
                    <p className="text-sm text-destructive flex items-center gap-1">
                      <AlertCircle className="h-3 w-3" />
                      {validationErrors.confirmPassword}
                    </p>
                  )}
                  {formData.confirmPassword && formData.password === formData.confirmPassword && (
                    <p className="text-sm text-green-600 flex items-center gap-1">
                      <CheckCircle2 className="h-3 w-3" />
                      Passwords match
                    </p>
                  )}
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

            {showForgotPassword && (
              <Alert className="mt-4">
                <AlertDescription className="space-y-3">
                  <p className="text-sm">Enter your email to receive a password reset link</p>
                  <div className="flex gap-2">
                    <Button 
                      onClick={handleForgotPassword}
                      size="sm"
                    >
                      Send Reset Link
                    </Button>
                    <Button 
                      onClick={() => setShowForgotPassword(false)}
                      variant="outline"
                      size="sm"
                    >
                      Cancel
                    </Button>
                  </div>
                </AlertDescription>
              </Alert>
            )}

            <Separator className="my-6" />

            <div className="text-center">
              <p className="text-sm text-muted-foreground">
                {isLogin ? "Don't have an account?" : "Already have an account?"}
              </p>
              <Button
                variant="link"
                onClick={() => {
                  setIsLogin(!isLogin);
                  setShowForgotPassword(false);
                  setValidationErrors({});
                }}
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
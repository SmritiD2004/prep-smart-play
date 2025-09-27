import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Shield, Users, GraduationCap, Heart, RadioIcon, Building, Flag } from "lucide-react";
import { useNavigate } from "react-router-dom";
import heroImage from "@/assets/hero-prepsmart.jpg";

const Index = () => {
  const navigate = useNavigate();

  const userRoles = [
    {
      id: "student",
      title: "Students",
      description: "Gamified learning & virtual drills",
      icon: GraduationCap,
      color: "achievement",
      features: ["Interactive modules", "Virtual drills", "Achievement badges", "Leaderboards"]
    },
    {
      id: "teacher",
      title: "Teachers",
      description: "Curriculum tools & class management",
      icon: Users,
      color: "primary",
      features: ["Class progress tracking", "Drill facilitation", "Parent communication", "Reports"]
    },
    {
      id: "admin",
      title: "Administrators",
      description: "School-wide preparedness monitoring",
      icon: Building,
      color: "success",
      features: ["Compliance reports", "School-wide metrics", "Communication tools", "Analytics"]
    },
    {
      id: "parent",
      title: "Parents",
      description: "Family preparedness & child progress",
      icon: Heart,
      color: "warning",
      features: ["Child's progress", "Family guides", "Safety tutorials", "Newsletters"]
    },
    {
      id: "response-team",
      title: "Response Teams",
      description: "Local disaster response coordination",
      icon: RadioIcon,
      color: "emergency",
      features: ["Real-time alerts", "Communication channels", "Task allocation", "NDRF procedures"]
    },
    {
      id: "state-board",
      title: "State Boards",
      description: "Regional compliance & benchmarking",
      icon: Shield,
      color: "primary",
      features: ["Regional data", "Compliance tracking", "Performance benchmarks", "Policy tools"]
    },
    {
      id: "national-agency",
      title: "National Agencies",
      description: "NDMA/NDRF oversight & coordination",
      icon: Flag,
      color: "success",
      features: ["National metrics", "Trend analysis", "Alert broadcasting", "Vulnerability index"]
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        {/* Background Image */}
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: `linear-gradient(135deg, rgba(59, 130, 246, 0.8), rgba(147, 51, 234, 0.6)), url(${heroImage})`,
          }}
        />
        <div className="relative z-10 container mx-auto px-4 py-16 md:py-24">
          <div className="text-center max-w-4xl mx-auto">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/20 backdrop-blur-sm text-white text-sm font-medium mb-6">
              <Shield className="h-4 w-4" />
              Disaster Risk Reduction Education Platform
            </div>
            
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
              PrepSmart
            </h1>
            
            <p className="text-lg md:text-xl text-white/90 mb-8 leading-relaxed">
              Transform passive learning into active preparedness through gamified virtual drills and role-specific educational pathways, compliant with NDMA/NDRR guidelines.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
              <Button 
                size="lg" 
                className="bg-white text-primary hover:bg-white/90"
                onClick={() => navigate("/emergency-contacts")}
              >
                <Shield className="mr-2 h-5 w-5" />
                Emergency Contacts
              </Button>
              <Button 
                variant="outline" 
                size="lg"
                className="border-white text-white hover:bg-white/20 backdrop-blur-sm"
                onClick={() => document.getElementById("roles")?.scrollIntoView({ behavior: "smooth" })}
              >
                Explore Roles
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Role Selection Section */}
      <section id="roles" className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Choose Your Role
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Access specialized features and content designed for your specific needs in disaster preparedness and education.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
            {userRoles.map((role) => {
              const IconComponent = role.icon;
              return (
                <Card key={role.id} className="gamification-card cursor-pointer border-0 shadow-lg hover:shadow-xl transition-all duration-300">
                  <CardHeader className="text-center pb-4">
                    <div className={`inline-flex items-center justify-center w-16 h-16 rounded-full bg-${role.color}/10 mb-4 mx-auto`}>
                      <IconComponent className={`h-8 w-8 text-${role.color}`} />
                    </div>
                    <CardTitle className="text-xl mb-2">{role.title}</CardTitle>
                    <CardDescription className="text-base">{role.description}</CardDescription>
                  </CardHeader>
                  <CardContent className="pt-0">
                    <ul className="space-y-2 mb-6">
                      {role.features.map((feature, index) => (
                        <li key={index} className="flex items-center text-sm text-muted-foreground">
                          <div className={`w-1.5 h-1.5 rounded-full bg-${role.color} mr-3 flex-shrink-0`} />
                          {feature}
                        </li>
                      ))}
                    </ul>
                    <Button 
                      className="w-full"
                      variant={role.color === "primary" ? "default" : "outline"}
                      onClick={() => navigate(`/auth?role=${role.id}`)}
                    >
                      Sign In as {role.title}
                    </Button>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Platform Features */}
      <section className="py-16 md:py-24 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Why PrepSmart?
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Comprehensive disaster education platform designed for real-world preparedness and emergency response.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-success/10 mb-6">
                <GraduationCap className="h-8 w-8 text-success" />
              </div>
              <h3 className="text-xl font-semibold mb-4">Gamified Learning</h3>
              <p className="text-muted-foreground">
                Interactive modules, virtual drills, and achievement systems that make disaster preparedness engaging and memorable.
              </p>
            </div>

            <div className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-emergency/10 mb-6">
                <RadioIcon className="h-8 w-8 text-emergency" />
              </div>
              <h3 className="text-xl font-semibold mb-4">Real-Time Alerts</h3>
              <p className="text-muted-foreground">
                Instant disaster alerts with actionable response instructions tailored to your location and role.
              </p>
            </div>

            <div className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-achievement/10 mb-6">
                <Shield className="h-8 w-8 text-achievement" />
              </div>
              <h3 className="text-xl font-semibold mb-4">NDMA Compliant</h3>
              <p className="text-muted-foreground">
                All content and procedures align with National Disaster Management Authority guidelines and best practices.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-card border-t py-12">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <h3 className="text-2xl font-bold mb-4">PrepSmart</h3>
            <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
              Building resilient communities through comprehensive disaster education and preparedness training.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                variant="outline"
                onClick={() => navigate("/emergency-contacts")}
              >
                Emergency Contacts
              </Button>
              <Button 
                variant="outline"
                onClick={() => navigate("/about")}
              >
                About PrepSmart
              </Button>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
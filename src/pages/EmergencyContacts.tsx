import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Phone, MapPin, AlertTriangle, Home, Shield, Ambulance } from "lucide-react";
import { useNavigate } from "react-router-dom";

const EmergencyContacts = () => {
  const navigate = useNavigate();

  const nationalContacts = [
    {
      name: "National Emergency Response",
      number: "112",
      description: "All emergencies - Fire, Police, Medical",
      icon: Shield,
      color: "emergency"
    },
    {
      name: "Fire Department",
      number: "101",
      description: "Fire emergencies and rescue operations",
      icon: AlertTriangle,
      color: "warning"
    },
    {
      name: "Police",
      number: "100",
      description: "Police emergency and security threats",
      icon: Shield,
      color: "primary"
    },
    {
      name: "Medical Emergency",
      number: "108",
      description: "Ambulance and medical emergencies",
      icon: Ambulance,
      color: "emergency"
    }
  ];

  const disasterSpecificContacts = [
    {
      disaster: "Earthquake",
      contacts: [
        { name: "NDRF Emergency", number: "01124363260", description: "National Disaster Response Force" },
        { name: "Earthquake Helpline", number: "1070", description: "Specialized earthquake response" }
      ]
    },
    {
      disaster: "Flood",
      contacts: [
        { name: "Flood Control Room", number: "1077", description: "Central Water Commission" },
        { name: "NDRF Flood Team", number: "01124363260", description: "Flood rescue operations" }
      ]
    },
    {
      disaster: "Cyclone",
      contacts: [
        { name: "IMD Cyclone Warning", number: "1588", description: "India Meteorological Department" },
        { name: "Coast Guard Emergency", number: "1554", description: "Maritime emergency response" }
      ]
    },
    {
      disaster: "Fire Emergency",
      contacts: [
        { name: "Fire Control Room", number: "101", description: "Fire Department" },
        { name: "Industrial Fire", number: "1906", description: "Chemical and industrial fires" }
      ]
    }
  ];

  const quickActions = [
    {
      title: "Report Emergency",
      description: "Report ongoing disaster or emergency situation",
      action: "tel:112",
      color: "emergency"
    },
    {
      title: "Request Rescue",
      description: "Request immediate rescue assistance",
      action: "tel:101",
      color: "warning"
    },
    {
      title: "Medical Help",
      description: "Get immediate medical assistance",
      action: "tel:108",
      color: "success"
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <section className="bg-emergency/5 border-b">
        <div className="container mx-auto px-4 py-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl md:text-4xl font-bold text-emergency mb-2">
                Emergency Contacts
              </h1>
              <p className="text-muted-foreground">
                Critical contact information accessible to everyone - no login required
              </p>
            </div>
            <Button 
              variant="outline"
              onClick={() => navigate("/")}
            >
              <Home className="mr-2 h-4 w-4" />
              Back to Home
            </Button>
          </div>
        </div>
      </section>

      <div className="container mx-auto px-4 py-8">
        {/* Quick Actions */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-6">Quick Actions</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {quickActions.map((action, index) => (
              <Card key={index} className={`border-l-4 border-l-${action.color} hover:shadow-lg transition-shadow cursor-pointer`}>
                <CardContent className="p-6">
                  <h3 className={`text-lg font-semibold text-${action.color} mb-2`}>
                    {action.title}
                  </h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    {action.description}
                  </p>
                  <Button 
                    className={`w-full bg-${action.color} hover:bg-${action.color}/90 text-${action.color}-foreground`}
                    onClick={() => window.location.href = action.action}
                  >
                    <Phone className="mr-2 h-4 w-4" />
                    Call Now
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* National Emergency Numbers */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-6">National Emergency Numbers</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {nationalContacts.map((contact, index) => {
              const IconComponent = contact.icon;
              return (
                <Card key={index} className="hover:shadow-lg transition-shadow">
                  <CardHeader className="pb-4">
                    <div className="flex items-center gap-4">
                      <div className={`inline-flex items-center justify-center w-12 h-12 rounded-full bg-${contact.color}/10`}>
                        <IconComponent className={`h-6 w-6 text-${contact.color}`} />
                      </div>
                      <div className="flex-1">
                        <CardTitle className="text-lg">{contact.name}</CardTitle>
                        <CardDescription>{contact.description}</CardDescription>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="pt-0">
                    <div className="flex items-center justify-between">
                      <div className={`text-2xl font-bold text-${contact.color}`}>
                        {contact.number}
                      </div>
                      <Button 
                        size="sm"
                        onClick={() => window.location.href = `tel:${contact.number}`}
                      >
                        <Phone className="mr-2 h-4 w-4" />
                        Call
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </section>

        {/* Disaster-Specific Contacts */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-6">Disaster-Specific Contacts</h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {disasterSpecificContacts.map((category, index) => (
              <Card key={index}>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <MapPin className="h-5 w-5 text-primary" />
                    {category.disaster}
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {category.contacts.map((contact, contactIndex) => (
                    <div key={contactIndex}>
                      <div className="flex items-center justify-between">
                        <div>
                          <h4 className="font-medium">{contact.name}</h4>
                          <p className="text-sm text-muted-foreground">{contact.description}</p>
                        </div>
                        <div className="text-right">
                          <div className="font-mono font-semibold text-primary">{contact.number}</div>
                          <Button 
                            size="sm"
                            variant="outline"
                            onClick={() => window.location.href = `tel:${contact.number}`}
                            className="mt-1"
                          >
                            Call
                          </Button>
                        </div>
                      </div>
                      {contactIndex < category.contacts.length - 1 && (
                        <Separator className="mt-4" />
                      )}
                    </div>
                  ))}
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Important Notice */}
        <section className="mb-8">
          <Card className="border-warning bg-warning-light">
            <CardContent className="p-6">
              <div className="flex items-start gap-3">
                <AlertTriangle className="h-6 w-6 text-warning flex-shrink-0 mt-0.5" />
                <div>
                  <h3 className="font-semibold text-warning mb-2">Important Guidelines</h3>
                  <ul className="text-sm text-warning space-y-1">
                    <li>• Call 112 for any life-threatening emergency</li>
                    <li>• Stay calm and provide clear location information</li>
                    <li>• Keep these numbers saved in your phone contacts</li>
                    <li>• Share accurate information about the emergency situation</li>
                    <li>• Follow instructions given by emergency responders</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        </section>
      </div>
    </div>
  );
};

export default EmergencyContacts;
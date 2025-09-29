import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { MapPin, Navigation, Clock, AlertTriangle, ArrowLeft, Route } from "lucide-react";

interface EvacuationRoute {
  id: string;
  state: string;
  district: string;
  disaster_type: string;
  route_name: string;
  description: string;
  safe_zone_name: string;
  safe_zone_address: string;
  distance_km: number;
  estimated_time_minutes: number;
  instructions: string[];
}

const SafeRoutes = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [routes, setRoutes] = useState<EvacuationRoute[]>([]);
  const [filteredRoutes, setFilteredRoutes] = useState<EvacuationRoute[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedState, setSelectedState] = useState<string>("");
  const [selectedDisaster, setSelectedDisaster] = useState<string>("");
  const [searchDistrict, setSearchDistrict] = useState<string>("");

  const disasterTypes = ["Earthquake", "Flood", "Fire", "Cyclone", "Landslide"];

  useEffect(() => {
    fetchRoutes();
  }, []);

  useEffect(() => {
    filterRoutes();
  }, [selectedState, selectedDisaster, searchDistrict, routes]);

  const fetchRoutes = async () => {
    try {
      const { data, error } = await supabase
        .from("evacuation_routes")
        .select("*")
        .eq("is_active", true)
        .order("state", { ascending: true });

      if (error) throw error;

      setRoutes(data || []);
      setFilteredRoutes(data || []);
    } catch (error: any) {
      toast({
        title: "Error",
        description: "Failed to load evacuation routes",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const filterRoutes = () => {
    let filtered = routes;

    if (selectedState) {
      filtered = filtered.filter((route) => route.state === selectedState);
    }

    if (selectedDisaster) {
      filtered = filtered.filter((route) => route.disaster_type === selectedDisaster);
    }

    if (searchDistrict) {
      filtered = filtered.filter((route) =>
        route.district.toLowerCase().includes(searchDistrict.toLowerCase())
      );
    }

    setFilteredRoutes(filtered);
  };

  const uniqueStates = Array.from(new Set(routes.map((route) => route.state)));

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 via-background to-achievement/5 p-4">
      <div className="max-w-7xl mx-auto">
        <div className="mb-6">
          <Button variant="ghost" onClick={() => navigate(-1)} className="mb-4">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back
          </Button>

          <div className="flex items-center gap-3 mb-2">
            <div className="p-3 bg-alert/10 rounded-lg">
              <Route className="h-8 w-8 text-alert" />
            </div>
            <div>
              <h1 className="text-3xl font-bold">Safe Evacuation Routes</h1>
              <p className="text-muted-foreground">
                Find the nearest safe zone and evacuation route during emergencies
              </p>
            </div>
          </div>
        </div>

        {/* Filters */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Filter Routes</CardTitle>
            <CardDescription>
              Search for evacuation routes based on your location and disaster type
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label htmlFor="state">State</Label>
                <Select value={selectedState} onValueChange={setSelectedState}>
                  <SelectTrigger id="state">
                    <SelectValue placeholder="Select state" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All States</SelectItem>
                    {uniqueStates.map((state) => (
                      <SelectItem key={state} value={state}>
                        {state}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="district">District</Label>
                <Input
                  id="district"
                  placeholder="Search district..."
                  value={searchDistrict}
                  onChange={(e) => setSearchDistrict(e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="disaster">Disaster Type</Label>
                <Select value={selectedDisaster} onValueChange={setSelectedDisaster}>
                  <SelectTrigger id="disaster">
                    <SelectValue placeholder="Select disaster type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Types</SelectItem>
                    {disasterTypes.map((type) => (
                      <SelectItem key={type} value={type}>
                        {type}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <Button
              variant="outline"
              onClick={() => {
                setSelectedState("");
                setSelectedDisaster("");
                setSearchDistrict("");
              }}
              className="mt-4"
            >
              Clear Filters
            </Button>
          </CardContent>
        </Card>

        {/* Routes List */}
        {loading ? (
          <Card>
            <CardContent className="py-12 text-center">
              <p className="text-muted-foreground">Loading evacuation routes...</p>
            </CardContent>
          </Card>
        ) : filteredRoutes.length === 0 ? (
          <Card>
            <CardContent className="py-12 text-center">
              <AlertTriangle className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <p className="text-muted-foreground">
                No evacuation routes found for the selected filters.
              </p>
            </CardContent>
          </Card>
        ) : (
          <div className="grid gap-4">
            {filteredRoutes.map((route) => (
              <Card key={route.id} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <Badge variant="outline" className="bg-alert/10 text-alert border-alert">
                          {route.disaster_type}
                        </Badge>
                        <Badge variant="secondary">
                          {route.state} - {route.district}
                        </Badge>
                      </div>
                      <CardTitle className="text-xl">{route.route_name}</CardTitle>
                      <CardDescription className="mt-1">{route.description}</CardDescription>
                    </div>
                  </div>
                </CardHeader>

                <CardContent>
                  <div className="grid md:grid-cols-2 gap-6 mb-6">
                    {/* Safe Zone Info */}
                    <div className="space-y-3">
                      <div className="flex items-start gap-2">
                        <MapPin className="h-5 w-5 text-primary mt-0.5" />
                        <div>
                          <p className="font-semibold">Safe Zone</p>
                          <p className="text-sm text-muted-foreground">{route.safe_zone_name}</p>
                          <p className="text-sm text-muted-foreground">{route.safe_zone_address}</p>
                        </div>
                      </div>
                    </div>

                    {/* Distance & Time */}
                    <div className="space-y-3">
                      <div className="flex items-start gap-2">
                        <Navigation className="h-5 w-5 text-achievement mt-0.5" />
                        <div>
                          <p className="font-semibold">Distance</p>
                          <p className="text-sm text-muted-foreground">{route.distance_km} km</p>
                        </div>
                      </div>

                      <div className="flex items-start gap-2">
                        <Clock className="h-5 w-5 text-progress mt-0.5" />
                        <div>
                          <p className="font-semibold">Estimated Time</p>
                          <p className="text-sm text-muted-foreground">
                            {route.estimated_time_minutes} minutes
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Instructions */}
                  <div className="border-t pt-4">
                    <h4 className="font-semibold mb-3 flex items-center gap-2">
                      <AlertTriangle className="h-4 w-4 text-alert" />
                      Evacuation Instructions
                    </h4>
                    <ol className="space-y-2">
                      {route.instructions.map((instruction, index) => (
                        <li key={index} className="flex gap-3 text-sm">
                          <span className="flex-shrink-0 w-6 h-6 bg-primary/10 text-primary rounded-full flex items-center justify-center font-semibold">
                            {index + 1}
                          </span>
                          <span className="pt-0.5">{instruction}</span>
                        </li>
                      ))}
                    </ol>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default SafeRoutes;

-- Create table for student learning progress
CREATE TABLE public.learning_progress (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  module_id TEXT NOT NULL,
  module_name TEXT NOT NULL,
  completed BOOLEAN DEFAULT false,
  score INTEGER,
  completed_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  UNIQUE(user_id, module_id)
);

-- Create table for student achievements/badges
CREATE TABLE public.achievements (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  badge_type TEXT NOT NULL,
  badge_name TEXT NOT NULL,
  earned_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  points INTEGER DEFAULT 0
);

-- Create table for drill results
CREATE TABLE public.drill_results (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  drill_type TEXT NOT NULL,
  score INTEGER NOT NULL,
  time_taken INTEGER,
  completed_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create table for safe evacuation routes
CREATE TABLE public.evacuation_routes (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  state TEXT NOT NULL,
  district TEXT NOT NULL,
  disaster_type TEXT NOT NULL,
  route_name TEXT NOT NULL,
  description TEXT,
  safe_zone_name TEXT NOT NULL,
  safe_zone_address TEXT NOT NULL,
  distance_km DECIMAL,
  estimated_time_minutes INTEGER,
  instructions TEXT[],
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.learning_progress ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.achievements ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.drill_results ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.evacuation_routes ENABLE ROW LEVEL SECURITY;

-- RLS Policies for learning_progress
CREATE POLICY "Users can view their own learning progress"
ON public.learning_progress FOR SELECT
USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own learning progress"
ON public.learning_progress FOR INSERT
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own learning progress"
ON public.learning_progress FOR UPDATE
USING (auth.uid() = user_id);

-- RLS Policies for achievements
CREATE POLICY "Users can view their own achievements"
ON public.achievements FOR SELECT
USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own achievements"
ON public.achievements FOR INSERT
WITH CHECK (auth.uid() = user_id);

-- RLS Policies for drill_results
CREATE POLICY "Users can view their own drill results"
ON public.drill_results FOR SELECT
USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own drill results"
ON public.drill_results FOR INSERT
WITH CHECK (auth.uid() = user_id);

-- RLS Policies for evacuation_routes (public read access)
CREATE POLICY "Everyone can view active evacuation routes"
ON public.evacuation_routes FOR SELECT
USING (is_active = true);

-- Add triggers for updated_at
CREATE TRIGGER update_learning_progress_updated_at
BEFORE UPDATE ON public.learning_progress
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_evacuation_routes_updated_at
BEFORE UPDATE ON public.evacuation_routes
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

-- Insert sample evacuation routes
INSERT INTO public.evacuation_routes (state, district, disaster_type, route_name, description, safe_zone_name, safe_zone_address, distance_km, estimated_time_minutes, instructions) VALUES
('Delhi', 'Central Delhi', 'Earthquake', 'Route to Connaught Place Relief Center', 'Main evacuation route from central Delhi during earthquakes', 'Connaught Place Relief Center', 'Connaught Place, New Delhi - 110001', 2.5, 30, ARRAY['Exit building calmly', 'Avoid elevators', 'Head towards Janpath Road', 'Follow emergency signs to Connaught Place', 'Report to relief center upon arrival']),
('Maharashtra', 'Mumbai', 'Flood', 'Route to Bandra Sports Complex', 'Elevated route away from flood-prone areas', 'Bandra Sports Complex', 'Bandra East, Mumbai - 400051', 3.2, 45, ARRAY['Move to higher ground immediately', 'Avoid waterlogged areas', 'Use Western Express Highway', 'Follow flood markers', 'Reach sports complex shelter']),
('Karnataka', 'Bangalore', 'Fire', 'Route to Cubbon Park Assembly Point', 'Clear path for fire evacuation in central Bangalore', 'Cubbon Park Assembly Point', 'Kasturba Road, Bangalore - 560001', 1.8, 20, ARRAY['Exit building using stairs', 'Check for smoke before opening doors', 'Head towards MG Road', 'Enter Cubbon Park from east gate', 'Report to emergency personnel']);
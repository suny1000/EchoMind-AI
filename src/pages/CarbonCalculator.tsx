import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from "recharts";
import { Calculator, Leaf, Car, Home, Utensils, Lightbulb } from "lucide-react";
import { motion } from "framer-motion";

interface CarbonData {
  category: string;
  emissions: number;
  color: string;
}

const CarbonCalculator = () => {
  const [formData, setFormData] = useState({
    electricity: "",
    gas: "",
    diet: "mixed",
    carMiles: "",
    flights: "",
    publicTransport: "sometimes",
  });
  
  const [results, setResults] = useState<CarbonData[] | null>(null);
  const [totalEmissions, setTotalEmissions] = useState(0);

  const calculateFootprint = () => {
    // Simplified carbon footprint calculation (kg CO2/month)
    const electricity = parseFloat(formData.electricity) || 0;
    const gas = parseFloat(formData.gas) || 0;
    const carMiles = parseFloat(formData.carMiles) || 0;
    const flights = parseFloat(formData.flights) || 0;

    // Emission factors (simplified)
    const electricityEmissions = electricity * 0.5; // kg CO2 per kWh
    const gasEmissions = gas * 2.3; // kg CO2 per therm
    const carEmissions = carMiles * 0.404; // kg CO2 per mile
    const flightEmissions = flights * 0.25; // kg CO2 per mile

    // Diet emissions (kg CO2/month)
    const dietEmissions = {
      vegan: 50,
      vegetarian: 100,
      mixed: 150,
      meat: 200
    }[formData.diet] || 150;

    // Public transport adjustment (reduction factor)
    const transportReduction = {
      always: 0.7,
      often: 0.85,
      sometimes: 0.95,
      never: 1.0
    }[formData.publicTransport] || 1.0;

    const adjustedCarEmissions = carEmissions * transportReduction;

    const data: CarbonData[] = [
      { category: "Electricity", emissions: electricityEmissions, color: "#fbbf24" },
      { category: "Gas", emissions: gasEmissions, color: "#f87171" },
      { category: "Transport", emissions: adjustedCarEmissions, color: "#60a5fa" },
      { category: "Flights", emissions: flightEmissions, color: "#a78bfa" },
      { category: "Diet", emissions: dietEmissions, color: "#34d399" },
    ];

    const total = data.reduce((sum, item) => sum + item.emissions, 0);
    
    setResults(data);
    setTotalEmissions(total);
  };

  const getSuggestions = () => {
    const suggestions = [];
    
    if (totalEmissions > 500) {
      suggestions.push("🌱 Consider switching to renewable energy sources");
      suggestions.push("🚗 Use public transportation or bike more often");
      suggestions.push("🥗 Try plant-based meals a few times per week");
    }
    
    if (parseFloat(formData.carMiles) > 1000) {
      suggestions.push("🚌 Public transport can reduce emissions by up to 45%");
      suggestions.push("🚲 Cycling or walking for short trips");
    }
    
    if (formData.diet === "meat") {
      suggestions.push("🌿 Plant-based diets can reduce food emissions by 70%");
    }
    
    if (parseFloat(formData.electricity) > 500) {
      suggestions.push("💡 LED bulbs use 75% less energy than incandescent");
      suggestions.push("🏠 Better insulation can reduce heating/cooling needs");
    }

    return suggestions;
  };

  return (
    <div className="min-h-screen pt-20 pb-8 px-4">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-8"
        >
          <h1 className="text-4xl font-bold mb-4 text-gradient">
            Carbon Footprint Calculator
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Discover your environmental impact and get personalized suggestions for a greener lifestyle 🌍
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Calculator Form */}
          <Card className="glass-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Calculator className="h-5 w-5 text-primary" />
                Calculate Your Impact
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Electricity */}
              <div className="space-y-2">
                <Label className="flex items-center gap-2">
                  <Lightbulb className="h-4 w-4" />
                  Monthly Electricity Usage (kWh)
                </Label>
                <Input
                  type="number"
                  placeholder="e.g., 350"
                  value={formData.electricity}
                  onChange={(e) => setFormData(prev => ({ ...prev, electricity: e.target.value }))}
                />
              </div>

              {/* Gas */}
              <div className="space-y-2">
                <Label className="flex items-center gap-2">
                  <Home className="h-4 w-4" />
                  Monthly Gas Usage (therms)
                </Label>
                <Input
                  type="number"
                  placeholder="e.g., 50"
                  value={formData.gas}
                  onChange={(e) => setFormData(prev => ({ ...prev, gas: e.target.value }))}
                />
              </div>

              {/* Diet */}
              <div className="space-y-2">
                <Label className="flex items-center gap-2">
                  <Utensils className="h-4 w-4" />
                  Diet Type
                </Label>
                <Select value={formData.diet} onValueChange={(value) => setFormData(prev => ({ ...prev, diet: value }))}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select your diet" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="vegan">Vegan</SelectItem>
                    <SelectItem value="vegetarian">Vegetarian</SelectItem>
                    <SelectItem value="mixed">Mixed Diet</SelectItem>
                    <SelectItem value="meat">Meat-Heavy</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Car Miles */}
              <div className="space-y-2">
                <Label className="flex items-center gap-2">
                  <Car className="h-4 w-4" />
                  Monthly Car Miles
                </Label>
                <Input
                  type="number"
                  placeholder="e.g., 800"
                  value={formData.carMiles}
                  onChange={(e) => setFormData(prev => ({ ...prev, carMiles: e.target.value }))}
                />
              </div>

              {/* Flights */}
              <div className="space-y-2">
                <Label>Annual Flight Miles</Label>
                <Input
                  type="number"
                  placeholder="e.g., 2000"
                  value={formData.flights}
                  onChange={(e) => setFormData(prev => ({ ...prev, flights: e.target.value }))}
                />
              </div>

              {/* Public Transport */}
              <div className="space-y-2">
                <Label>Public Transport Usage</Label>
                <Select value={formData.publicTransport} onValueChange={(value) => setFormData(prev => ({ ...prev, publicTransport: value }))}>
                  <SelectTrigger>
                    <SelectValue placeholder="How often do you use public transport?" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="always">Always (4-5 days/week)</SelectItem>
                    <SelectItem value="often">Often (2-3 days/week)</SelectItem>
                    <SelectItem value="sometimes">Sometimes (1 day/week)</SelectItem>
                    <SelectItem value="never">Never</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <Button onClick={calculateFootprint} className="w-full">
                Calculate My Footprint
              </Button>
            </CardContent>
          </Card>

          {/* Results */}
          <div className="space-y-6">
            {results && (
              <>
                {/* Total Emissions */}
                <Card className="glass-card">
                  <CardContent className="p-6 text-center">
                    <div className="text-3xl font-bold text-gradient mb-2">
                      {totalEmissions.toFixed(1)} kg CO₂
                    </div>
                    <p className="text-muted-foreground">Monthly Carbon Footprint</p>
                    <div className="mt-4">
                      {totalEmissions < 300 && (
                        <Badge variant="outline" className="bg-green-500/10 text-green-500 border-green-500">
                          <Leaf className="h-3 w-3 mr-1" />
                          Excellent! Below average
                        </Badge>
                      )}
                      {totalEmissions >= 300 && totalEmissions < 600 && (
                        <Badge variant="outline" className="bg-yellow-500/10 text-yellow-500 border-yellow-500">
                          Average footprint
                        </Badge>
                      )}
                      {totalEmissions >= 600 && (
                        <Badge variant="outline" className="bg-red-500/10 text-red-500 border-red-500">
                          Above average - room for improvement
                        </Badge>
                      )}
                    </div>
                  </CardContent>
                </Card>

                {/* Charts */}
                <Card className="glass-card">
                  <CardHeader>
                    <CardTitle>Emissions Breakdown</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ResponsiveContainer width="100%" height={300}>
                      <BarChart data={results}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="category" />
                        <YAxis />
                        <Tooltip />
                        <Bar dataKey="emissions" fill="hsl(var(--primary))" />
                      </BarChart>
                    </ResponsiveContainer>
                  </CardContent>
                </Card>

                {/* Suggestions */}
                <Card className="glass-card">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Leaf className="h-5 w-5 text-green-500" />
                      Personalized Suggestions
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {getSuggestions().map((suggestion, index) => (
                        <div key={index} className="p-3 bg-muted/50 rounded-lg">
                          {suggestion}
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CarbonCalculator;
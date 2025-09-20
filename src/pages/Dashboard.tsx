import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area } from "recharts";
import { Globe, Thermometer, Droplets, Wind, TrendingUp, AlertTriangle } from "lucide-react";
import { motion } from "framer-motion";

interface ClimateData {
  year: number;
  temperature: number;
  co2: number;
  seaLevel: number;
}

interface NewsItem {
  id: string;
  title: string;
  summary: string;
  date: string;
  severity: "low" | "medium" | "high";
  source: string;
}

const Dashboard = () => {
  const [climateData] = useState<ClimateData[]>([
    { year: 2020, temperature: 14.9, co2: 415, seaLevel: 3.2 },
    { year: 2021, temperature: 15.1, co2: 418, seaLevel: 3.4 },
    { year: 2022, temperature: 15.3, co2: 421, seaLevel: 3.6 },
    { year: 2023, temperature: 15.5, co2: 424, seaLevel: 3.8 },
    { year: 2024, temperature: 15.7, co2: 427, seaLevel: 4.0 },
  ]);

  const [newsData] = useState<NewsItem[]>([
    {
      id: "1",
      title: "Antarctic Ice Sheet Shows Accelerated Melting",
      summary: "New satellite data reveals faster ice loss than previously recorded",
      date: "2024-01-10",
      severity: "high",
      source: "NASA Climate"
    },
    {
      id: "2", 
      title: "Renewable Energy Reaches 30% of Global Mix",
      summary: "Solar and wind power continue rapid expansion worldwide",
      date: "2024-01-09",
      severity: "low",
      source: "IRENA"
    },
    {
      id: "3",
      title: "Ocean Temperatures Hit Record Highs",
      summary: "Marine ecosystems under increasing stress from warming",
      date: "2024-01-08",
      severity: "high",
      source: "NOAA"
    },
    {
      id: "4",
      title: "Carbon Pricing Initiatives Expand Globally",
      summary: "50+ countries now implementing carbon pricing mechanisms",
      date: "2024-01-07",
      severity: "medium",
      source: "World Bank"
    }
  ]);

  const currentStats = {
    globalTemp: 15.7,
    co2Level: 427,
    seaLevelRise: 4.0,
    renewableEnergy: 30
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case "low": return "bg-green-500/10 text-green-500 border-green-500";
      case "medium": return "bg-yellow-500/10 text-yellow-500 border-yellow-500";
      case "high": return "bg-red-500/10 text-red-500 border-red-500";
      default: return "bg-gray-500/10 text-gray-500 border-gray-500";
    }
  };

  const getSeverityIcon = (severity: string) => {
    switch (severity) {
      case "high": return <AlertTriangle className="h-3 w-3" />;
      case "medium": return <TrendingUp className="h-3 w-3" />;
      default: return null;
    }
  };

  return (
    <div className="min-h-screen pt-20 pb-8 px-4">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-8"
        >
          <h1 className="text-4xl font-bold mb-4 text-gradient">
            Climate Dashboard
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Real-time climate data and insights powered by NASA and global monitoring systems 🌍
          </p>
        </motion.div>

        {/* Key Metrics */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-8">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <Card className="glass-card text-center">
              <CardContent className="p-6">
                <Thermometer className="h-8 w-8 mx-auto mb-3 text-red-500" />
                <div className="text-2xl font-bold text-red-500">{currentStats.globalTemp}°C</div>
                <div className="text-sm text-muted-foreground">Global Temperature</div>
                <Badge variant="outline" className="mt-2 bg-red-500/10 text-red-500 border-red-500">
                  +1.2°C vs 1900
                </Badge>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <Card className="glass-card text-center">
              <CardContent className="p-6">
                <Wind className="h-8 w-8 mx-auto mb-3 text-orange-500" />
                <div className="text-2xl font-bold text-orange-500">{currentStats.co2Level}</div>
                <div className="text-sm text-muted-foreground">CO₂ ppm</div>
                <Badge variant="outline" className="mt-2 bg-orange-500/10 text-orange-500 border-orange-500">
                  +2.8 ppm/year
                </Badge>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <Card className="glass-card text-center">
              <CardContent className="p-6">
                <Droplets className="h-8 w-8 mx-auto mb-3 text-blue-500" />
                <div className="text-2xl font-bold text-blue-500">{currentStats.seaLevelRise}mm</div>
                <div className="text-sm text-muted-foreground">Sea Level Rise</div>
                <Badge variant="outline" className="mt-2 bg-blue-500/10 text-blue-500 border-blue-500">
                  Annual rate
                </Badge>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <Card className="glass-card text-center">
              <CardContent className="p-6">
                <Globe className="h-8 w-8 mx-auto mb-3 text-green-500" />
                <div className="text-2xl font-bold text-green-500">{currentStats.renewableEnergy}%</div>
                <div className="text-sm text-muted-foreground">Renewable Energy</div>
                <Badge variant="outline" className="mt-2 bg-green-500/10 text-green-500 border-green-500">
                  +5% vs 2020
                </Badge>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Temperature Trends */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <Card className="glass-card">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Thermometer className="h-5 w-5 text-red-500" />
                  Global Temperature Trend
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={climateData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                    <XAxis dataKey="year" stroke="hsl(var(--muted-foreground))" />
                    <YAxis stroke="hsl(var(--muted-foreground))" />
                    <Tooltip 
                      contentStyle={{
                        backgroundColor: "hsl(var(--card))",
                        border: "1px solid hsl(var(--border))",
                        borderRadius: "8px"
                      }}
                    />
                    <Line 
                      type="monotone" 
                      dataKey="temperature" 
                      stroke="#ef4444" 
                      strokeWidth={3}
                      dot={{ fill: "#ef4444", strokeWidth: 2, r: 4 }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </motion.div>

          {/* CO2 Levels */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <Card className="glass-card">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Wind className="h-5 w-5 text-orange-500" />
                  Atmospheric CO₂ Levels
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <AreaChart data={climateData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                    <XAxis dataKey="year" stroke="hsl(var(--muted-foreground))" />
                    <YAxis stroke="hsl(var(--muted-foreground))" />
                    <Tooltip 
                      contentStyle={{
                        backgroundColor: "hsl(var(--card))",
                        border: "1px solid hsl(var(--border))",
                        borderRadius: "8px"
                      }}
                    />
                    <Area 
                      type="monotone" 
                      dataKey="co2" 
                      stroke="#f97316" 
                      fill="url(#co2Gradient)"
                      strokeWidth={2}
                    />
                    <defs>
                      <linearGradient id="co2Gradient" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#f97316" stopOpacity={0.8}/>
                        <stop offset="95%" stopColor="#f97316" stopOpacity={0.1}/>
                      </linearGradient>
                    </defs>
                  </AreaChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </motion.div>

          {/* Climate News */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="lg:col-span-2"
          >
            <Card className="glass-card">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Globe className="h-5 w-5 text-primary" />
                  Latest Climate News & Insights
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-4">
                  {newsData.map((item, index) => (
                    <motion.div
                      key={item.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.4, delay: index * 0.1 }}
                      className="p-4 bg-muted/30 rounded-lg border border-border/50"
                    >
                      <div className="flex justify-between items-start mb-2">
                        <Badge variant="outline" className={getSeverityColor(item.severity)}>
                          {getSeverityIcon(item.severity)}
                          {item.severity}
                        </Badge>
                        <span className="text-xs text-muted-foreground">
                          {new Date(item.date).toLocaleDateString()}
                        </span>
                      </div>
                      <h3 className="font-semibold text-sm mb-2">{item.title}</h3>
                      <p className="text-xs text-muted-foreground mb-2">{item.summary}</p>
                      <div className="text-xs text-primary">{item.source}</div>
                    </motion.div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, Leaf, Brain, Calculator, Trophy, BarChart3, Globe, Users, Target, Sparkles } from "lucide-react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import heroImage from "@/assets/hero-earth.jpg";

const Index = () => {
  const features = [
    {
      icon: Brain,
      title: "AI Climate Tutor",
      description: "Chat with our GPT-powered AI to learn about climate science, take quizzes, and get instant answers.",
      path: "/chatbot",
      color: "text-blue-500"
    },
    {
      icon: Calculator,
      title: "Carbon Footprint Tracker",
      description: "Calculate your environmental impact and get personalized suggestions for a greener lifestyle.",
      path: "/calculator",
      color: "text-green-500"
    },
    {
      icon: Trophy,
      title: "Eco Challenges",
      description: "Join gamified challenges, earn points, and compete with eco-warriors worldwide.",
      path: "/challenges",
      color: "text-yellow-500"
    },
    {
      icon: BarChart3,
      title: "Climate Dashboard",
      description: "Access real-time climate data and insights from NASA and global monitoring systems.",
      path: "/dashboard",
      color: "text-purple-500"
    }
  ];

  const stats = [
    { number: "1.2°C", label: "Global temperature rise", icon: "🌡️" },
    { number: "427ppm", label: "Atmospheric CO₂", icon: "💨" },
    { number: "30%", label: "Renewable energy share", icon: "⚡" },
    { number: "10K+", label: "Users learning daily", icon: "👥" }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <div 
          className="absolute inset-0 z-0"
          style={{
            backgroundImage: `linear-gradient(rgba(0,0,0,0.4), rgba(0,0,0,0.4)), url(${heroImage})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundAttachment: 'fixed'
          }}
        />
        
        <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <Badge variant="outline" className="mb-6 bg-white/10 text-white border-white/20 backdrop-blur-sm">
              <Sparkles className="h-3 w-3 mr-1" />
              AI-Powered Climate Education
            </Badge>
            
            <h1 className="text-6xl md:text-7xl font-bold mb-6 text-white">
              EcoMind AI
            </h1>
            
            <p className="text-xl md:text-2xl mb-4 text-white/90 font-medium">
              Your Climate Literacy Companion
            </p>
            
            <p className="text-lg mb-8 text-white/80 max-w-2xl mx-auto">
              Learn about climate change through AI-powered tutoring, track your carbon footprint, 
              and join a global community taking action for our planet.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" className="btn-hero text-lg px-8 py-4">
                <Link to="/chatbot">
                  <Brain className="h-5 w-5 mr-2" />
                  Start Learning
                  <ArrowRight className="h-5 w-5 ml-2" />
                </Link>
              </Button>
              
              <Button asChild variant="outline" size="lg" className="bg-white/10 border-white/20 text-white hover:bg-white/20 backdrop-blur-sm text-lg px-8 py-4">
                <Link to="/calculator">
                  <Calculator className="h-5 w-5 mr-2" />
                  Track My Impact
                </Link>
              </Button>
            </div>
          </motion.div>
        </div>

        {/* Floating elements */}
        <motion.div
          className="absolute top-20 left-10 text-4xl float-animation"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 1 }}
        >
          🌱
        </motion.div>
        <motion.div
          className="absolute top-32 right-16 text-3xl float-animation"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2, duration: 1 }}
          style={{ animationDelay: '2s' }}
        >
          🌍
        </motion.div>
        <motion.div
          className="absolute bottom-32 left-20 text-3xl float-animation"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.4, duration: 1 }}
          style={{ animationDelay: '4s' }}
        >
          ♻️
        </motion.div>
      </section>

      {/* Stats Section */}
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gradient">
              Our Planet in Numbers
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Real-time data that shows why climate education matters now more than ever.
            </p>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Card className="glass-card text-center hover:scale-105 transition-transform duration-300">
                  <CardContent className="p-6">
                    <div className="text-3xl mb-2">{stat.icon}</div>
                    <div className="text-2xl md:text-3xl font-bold text-primary mb-1">
                      {stat.number}
                    </div>
                    <div className="text-sm text-muted-foreground">
                      {stat.label}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4 bg-muted/30">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gradient">
              Everything You Need to Take Climate Action
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              From AI-powered learning to community challenges, we've got the tools to make climate education engaging and actionable.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <Card className="glass-card h-full hover:scale-105 transition-all duration-300 group cursor-pointer">
                    <CardContent className="p-8">
                      <div className={`${feature.color} mb-4 group-hover:scale-110 transition-transform duration-300`}>
                        <Icon className="h-12 w-12" />
                      </div>
                      <h3 className="text-xl font-bold mb-3">{feature.title}</h3>
                      <p className="text-muted-foreground mb-6 leading-relaxed">
                        {feature.description}
                      </p>
                      <Button asChild variant="outline" className="group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                        <Link to={feature.path}>
                          Explore
                          <ArrowRight className="h-4 w-4 ml-2 group-hover:translate-x-1 transition-transform" />
                        </Link>
                      </Button>
                    </CardContent>
                  </Card>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-6 text-gradient">
              Ready to Become a Climate Champion?
            </h2>
            <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
              Join thousands of learners worldwide who are taking action for our planet. 
              Start your climate literacy journey today.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" className="btn-hero text-lg px-8 py-4">
                <Link to="/chatbot">
                  <Brain className="h-5 w-5 mr-2" />
                  Start Learning Now
                </Link>
              </Button>
              
              <Button asChild variant="outline" size="lg" className="text-lg px-8 py-4">
                <Link to="/challenges">
                  <Trophy className="h-5 w-5 mr-2" />
                  Join Challenges
                </Link>
              </Button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Index;

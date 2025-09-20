import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Trophy, Star, Target, Users, Calendar, CheckCircle2 } from "lucide-react";
import { motion } from "framer-motion";

interface Challenge {
  id: string;
  title: string;
  description: string;
  points: number;
  difficulty: "easy" | "medium" | "hard";
  category: string;
  completed: boolean;
  progress: number;
  deadline: string;
}

interface LeaderboardEntry {
  rank: number;
  name: string;
  points: number;
  level: string;
  avatar: string;
}

const EcoChallenges = () => {
  const [activeTab, setActiveTab] = useState<"challenges" | "leaderboard">("challenges");
  
  const [challenges, setChallenges] = useState<Challenge[]>([
    {
      id: "1",
      title: "Go Car-Free Week",
      description: "Use only public transport, walking, or cycling for 7 days",
      points: 150,
      difficulty: "medium",
      category: "Transport",
      completed: false,
      progress: 3,
      deadline: "2024-01-15"
    },
    {
      id: "2",
      title: "Plant-Based Week",
      description: "Eat only plant-based meals for one week",
      points: 100,
      difficulty: "easy",
      category: "Diet",
      completed: true,
      progress: 7,
      deadline: "2024-01-08"
    },
    {
      id: "3",
      title: "Zero Waste Day",
      description: "Produce zero waste for an entire day",
      points: 75,
      difficulty: "medium",
      category: "Waste",
      completed: false,
      progress: 0,
      deadline: "2024-01-20"
    },
    {
      id: "4",
      title: "Energy Saver Challenge",
      description: "Reduce electricity usage by 20% this month",
      points: 200,
      difficulty: "hard",
      category: "Energy",
      completed: false,
      progress: 45,
      deadline: "2024-01-31"
    },
    {
      id: "5",
      title: "Green Commute",
      description: "Use eco-friendly transport for 5 consecutive workdays",
      points: 80,
      difficulty: "easy",
      category: "Transport",
      completed: false,
      progress: 2,
      deadline: "2024-01-18"
    }
  ]);

  const leaderboard: LeaderboardEntry[] = [
    { rank: 1, name: "EcoWarrior Sarah", points: 2450, level: "Climate Champion", avatar: "🌱" },
    { rank: 2, name: "GreenGuru Mike", points: 2180, level: "Eco Expert", avatar: "🌍" },
    { rank: 3, name: "TreeHugger Lisa", points: 1950, level: "Nature Defender", avatar: "🌳" },
    { rank: 4, name: "SolarPowered Alex", points: 1720, level: "Energy Saver", avatar: "☀️" },
    { rank: 5, name: "RecycleQueen Emma", points: 1650, level: "Waste Warrior", avatar: "♻️" },
    { rank: 6, name: "You", points: 1580, level: "Eco Enthusiast", avatar: "🎯" },
    { rank: 7, name: "BikeRider Tom", points: 1420, level: "Green Commuter", avatar: "🚲" },
    { rank: 8, name: "PlantBased Anna", points: 1380, level: "Diet Champion", avatar: "🥗" }
  ];

  const userStats = {
    totalPoints: 1580,
    level: "Eco Enthusiast",
    challengesCompleted: 12,
    streakDays: 5
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "easy": return "bg-green-500/10 text-green-500 border-green-500";
      case "medium": return "bg-yellow-500/10 text-yellow-500 border-yellow-500";
      case "hard": return "bg-red-500/10 text-red-500 border-red-500";
      default: return "bg-gray-500/10 text-gray-500 border-gray-500";
    }
  };

  const handleJoinChallenge = (challengeId: string) => {
    setChallenges(prev => prev.map(challenge => 
      challenge.id === challengeId 
        ? { ...challenge, progress: challenge.progress + 1 }
        : challenge
    ));
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
            Eco Challenges
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Join fun climate challenges, earn points, and compete with eco-warriors worldwide! 🏆
          </p>
        </motion.div>

        {/* User Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <Card className="glass-card text-center">
            <CardContent className="p-4">
              <div className="text-2xl font-bold text-primary">{userStats.totalPoints}</div>
              <div className="text-sm text-muted-foreground">Total Points</div>
            </CardContent>
          </Card>
          <Card className="glass-card text-center">
            <CardContent className="p-4">
              <div className="text-2xl font-bold text-primary">{userStats.challengesCompleted}</div>
              <div className="text-sm text-muted-foreground">Completed</div>
            </CardContent>
          </Card>
          <Card className="glass-card text-center">
            <CardContent className="p-4">
              <div className="text-2xl font-bold text-primary">{userStats.streakDays}</div>
              <div className="text-sm text-muted-foreground">Day Streak</div>
            </CardContent>
          </Card>
          <Card className="glass-card text-center">
            <CardContent className="p-4">
              <div className="text-sm font-semibold text-primary">{userStats.level}</div>
              <div className="text-xs text-muted-foreground">Current Level</div>
            </CardContent>
          </Card>
        </div>

        {/* Tab Navigation */}
        <div className="flex gap-4 mb-6">
          <Button
            variant={activeTab === "challenges" ? "default" : "outline"}
            onClick={() => setActiveTab("challenges")}
            className="flex-1"
          >
            <Target className="h-4 w-4 mr-2" />
            Challenges
          </Button>
          <Button
            variant={activeTab === "leaderboard" ? "default" : "outline"}
            onClick={() => setActiveTab("leaderboard")}
            className="flex-1"
          >
            <Trophy className="h-4 w-4 mr-2" />
            Leaderboard
          </Button>
        </div>

        {/* Challenges Tab */}
        {activeTab === "challenges" && (
          <div className="grid gap-6">
            {challenges.map((challenge, index) => (
              <motion.div
                key={challenge.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Card className={`glass-card ${challenge.completed ? "border-green-500/50" : ""}`}>
                  <CardHeader>
                    <div className="flex justify-between items-start">
                      <div className="flex-1">
                        <CardTitle className="flex items-center gap-2 mb-2">
                          {challenge.completed && <CheckCircle2 className="h-5 w-5 text-green-500" />}
                          {challenge.title}
                          <Badge variant="outline" className={getDifficultyColor(challenge.difficulty)}>
                            {challenge.difficulty}
                          </Badge>
                        </CardTitle>
                        <p className="text-muted-foreground">{challenge.description}</p>
                      </div>
                      <div className="text-right">
                        <div className="flex items-center gap-1 text-primary font-semibold">
                          <Star className="h-4 w-4" />
                          {challenge.points}
                        </div>
                        <div className="text-xs text-muted-foreground mt-1">
                          <Calendar className="h-3 w-3 inline mr-1" />
                          Due: {new Date(challenge.deadline).toLocaleDateString()}
                        </div>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-muted-foreground">
                          Progress: {challenge.progress}/{challenge.difficulty === "easy" ? 5 : challenge.difficulty === "medium" ? 7 : 10} days
                        </span>
                        <Badge variant="secondary">{challenge.category}</Badge>
                      </div>
                      <Progress 
                        value={(challenge.progress / (challenge.difficulty === "easy" ? 5 : challenge.difficulty === "medium" ? 7 : 10)) * 100} 
                        className="h-2"
                      />
                      <div className="flex justify-between items-center">
                        <span className="text-xs text-muted-foreground">
                          {challenge.completed ? "Challenge completed! 🎉" : "Keep going!"}
                        </span>
                        {!challenge.completed && (
                          <Button 
                            size="sm"
                            onClick={() => handleJoinChallenge(challenge.id)}
                          >
                            Log Progress
                          </Button>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        )}

        {/* Leaderboard Tab */}
        {activeTab === "leaderboard" && (
          <Card className="glass-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Trophy className="h-5 w-5 text-primary" />
                Global Leaderboard
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {leaderboard.map((entry, index) => (
                  <motion.div
                    key={entry.rank}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className={`flex items-center gap-4 p-4 rounded-lg ${
                      entry.name === "You" ? "bg-primary/10 border border-primary/20" : "bg-muted/50"
                    }`}
                  >
                    <div className="text-2xl font-bold w-8 text-center">
                      {entry.rank === 1 && "🥇"}
                      {entry.rank === 2 && "🥈"}
                      {entry.rank === 3 && "🥉"}
                      {entry.rank > 3 && entry.rank}
                    </div>
                    <div className="text-2xl">{entry.avatar}</div>
                    <div className="flex-1">
                      <div className="font-semibold">{entry.name}</div>
                      <div className="text-sm text-muted-foreground">{entry.level}</div>
                    </div>
                    <div className="text-right">
                      <div className="font-bold text-primary">{entry.points}</div>
                      <div className="text-xs text-muted-foreground">points</div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default EcoChallenges;
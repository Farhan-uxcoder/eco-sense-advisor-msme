import { useState, useEffect } from "react";
import { ArrowRight, Clipboard, CheckCircle, AlertCircle, ChevronRight, ChartPie } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";
import { Button } from "../components/ui/button";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { useLanguage } from "../components/LanguageSelector";
import PieChart from "../components/PieChart";
import ComplianceLeaderboard from "../components/ComplianceLeaderboard";

// Mock data with additional tasks
const mockTasks = [
  {
    id: 1,
    title: "Complete waste management assessment",
    priority: "high",
    completed: false,
    dueDate: "2025-05-20"
  },
  {
    id: 2,
    title: "Update safety compliance documents",
    priority: "medium",
    completed: false,
    dueDate: "2025-05-25"
  },
  {
    id: 3,
    title: "Replace inefficient lighting",
    priority: "medium",
    completed: true,
    dueDate: "2025-05-15"
  },
  {
    id: 4,
    title: "Register for green business certification",
    priority: "low",
    completed: false,
    dueDate: "2025-06-10"
  },
  {
    id: 5,
    title: "Implement water conservation measures",
    priority: "medium",
    completed: false,
    dueDate: "2025-05-30"
  },
  {
    id: 6,
    title: "Train staff on sustainability practices",
    priority: "high",
    completed: true,
    dueDate: "2025-05-12"
  },
  {
    id: 7,
    title: "Audit energy consumption",
    priority: "high",
    completed: false,
    dueDate: "2025-06-05"
  },
  {
    id: 8,
    title: "Install recycling stations",
    priority: "low",
    completed: true,
    dueDate: "2025-05-10"
  },
  {
    id: 9,
    title: "Research renewable energy options",
    priority: "medium",
    completed: false,
    dueDate: "2025-06-15"
  },
  {
    id: 10,
    title: "Conduct employee sustainability workshop",
    priority: "high",
    completed: false,
    dueDate: "2025-06-12"
  },
  {
    id: 11,
    title: "Update chemical storage procedures",
    priority: "high",
    completed: true,
    dueDate: "2025-05-08"
  },
  {
    id: 12,
    title: "Complete carbon footprint assessment",
    priority: "medium",
    completed: false,
    dueDate: "2025-06-20"
  }
];

// Mock alerts remain the same
const mockAlerts = [
  {
    id: 1,
    title: "Waste disposal permit expires soon",
    description: "Your waste disposal permit will expire in 15 days. Renew it to maintain compliance.",
    severity: "warning"
  },
  {
    id: 2,
    title: "New regulation alert",
    description: "A new regulation regarding chemical storage will come into effect next month.",
    severity: "info"
  }
];

// Mock recommendations remain the same
const mockRecommendations = [
  {
    id: 1,
    title: "Install water-efficient fixtures",
    description: "Reduce water consumption by replacing current fixtures with low-flow alternatives.",
    impact: "medium",
    cost: "low"
  },
  {
    id: 2,
    title: "Switch to renewable energy",
    description: "Consider installing solar panels to reduce your carbon footprint and energy costs.",
    impact: "high",
    cost: "high"
  },
  {
    id: 3,
    title: "Implement a recycling program",
    description: "Start a comprehensive recycling program to minimize waste sent to landfills.",
    impact: "medium",
    cost: "low"
  }
];

const DashboardPage = () => {
  const [tasks, setTasks] = useState(mockTasks);
  const { t } = useLanguage();
  const [complianceScore, setComplianceScore] = useState(0);
  
  // Calculate dynamic compliance score based on completed tasks and other factors
  useEffect(() => {
    const calcComplianceScore = () => {
      // Base score from completed tasks (weighted at 70% of total score)
      const completedTasksRatio = (tasks.filter(task => task.completed).length / tasks.length);
      const tasksScore = completedTasksRatio * 70;
      
      // Add a weighted factor for tasks prioritized by importance
      const completedHighPriority = tasks.filter(task => task.completed && task.priority === "high").length;
      const totalHighPriority = tasks.filter(task => task.priority === "high").length;
      const highPriorityScore = totalHighPriority > 0 ? (completedHighPriority / totalHighPriority) * 15 : 0;
      
      // Additional random factor to simulate other compliance metrics (15% of total)
      const randomFactor = Math.floor(Math.random() * 10) + 5;
      
      return Math.round(tasksScore + highPriorityScore + randomFactor);
    };
    
    setComplianceScore(calcComplianceScore());
  }, [tasks]);
  
  const handleToggleTask = (id: number) => {
    setTasks(tasks.map(task => 
      task.id === id ? { ...task, completed: !task.completed } : task
    ));
  };
  
  const completedTasksCount = tasks.filter(task => task.completed).length;
  const completionPercentage = (completedTasksCount / tasks.length) * 100;
  const resourceEfficiency = 75; // Mock value for resource efficiency
  
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1 container py-8">
        <h1 className="text-3xl font-bold mb-6 dark:text-white">{t('dashboard')}</h1>
        
        {/* Overview Cards with Pie Charts */}
        <div className="grid gap-6 md:grid-cols-3 mb-8">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
                <ChartPie className="h-4 w-4" />
                {t('complianceScore')}
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-2">
              <PieChart
                value={complianceScore}
                title="Compliance"
                subtitle="+5% from last month"
                color="hsl(122, 60%, 45%)" // eco-primary
              />
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
                <ChartPie className="h-4 w-4" />
                Tasks Completed
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-2">
              <PieChart
                value={Math.round(completionPercentage)}
                title={`${completedTasksCount}/${tasks.length} Tasks`}
                subtitle={`${Math.round(completionPercentage)}% complete`}
                color="hsl(199, 95%, 54%)" // eco-accent
              />
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
                <ChartPie className="h-4 w-4" />
                Resource Efficiency
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-2">
              <PieChart
                value={resourceEfficiency}
                title="Good"
                subtitle="Based on industry average"
                color="hsl(120, 40%, 64%)" // eco-secondary
              />
            </CardContent>
          </Card>
        </div>
        
        {/* Leaderboard and Alerts in two columns */}
        <div className="grid gap-6 md:grid-cols-2 mb-8">
          <div>
            <ComplianceLeaderboard />
          </div>
          
          <div>
            <h2 className="text-xl font-semibold mb-4 dark:text-white">Alerts & Notifications</h2>
            <div className="space-y-4">
              {mockAlerts.map(alert => (
                <div 
                  key={alert.id} 
                  className={`p-4 rounded-lg border flex items-start gap-3 ${
                    alert.severity === "warning" ? "border-amber-500 bg-amber-50 dark:bg-amber-950/20 dark:border-amber-800" : "border-blue-400 bg-blue-50 dark:bg-blue-950/20 dark:border-blue-800"
                  }`}
                >
                  {alert.severity === "warning" ? (
                    <AlertCircle className="h-5 w-5 text-amber-500 shrink-0 mt-0.5" />
                  ) : (
                    <Clipboard className="h-5 w-5 text-blue-500 shrink-0 mt-0.5" />
                  )}
                  <div>
                    <h3 className="font-medium dark:text-white">{alert.title}</h3>
                    <p className="text-sm text-muted-foreground dark:text-white/80">{alert.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
        
        {/* Tasks */}
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold dark:text-white">{t('tasks')}</h2>
          <Button variant="outline" size="sm">View All <ChevronRight className="ml-1 h-4 w-4" /></Button>
        </div>
        <div className="space-y-2 mb-8">
          {tasks.slice(0, 5).map(task => (
            <div 
              key={task.id} 
              className={`p-4 rounded-lg border flex items-center gap-3 ${task.completed ? "bg-muted/50 dark:bg-muted/10" : "bg-white dark:bg-card"}`}
            >
              <button 
                onClick={() => handleToggleTask(task.id)}
                className={`h-5 w-5 rounded-full flex-shrink-0 flex items-center justify-center border ${
                  task.completed 
                    ? "bg-eco-primary border-eco-primary text-white" 
                    : "border-muted-foreground"
                }`}
              >
                {task.completed && <CheckCircle className="h-4 w-4" />}
              </button>
              <div className="flex-1">
                <p className={`font-medium ${task.completed ? "line-through text-muted-foreground" : ""} dark:text-white`}>
                  {task.title}
                </p>
                <p className="text-sm text-muted-foreground dark:text-white/70">Due: {new Date(task.dueDate).toLocaleDateString()}</p>
              </div>
              <div className={`px-2 py-1 rounded-full text-xs font-medium ${
                task.priority === "high" 
                  ? "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300" 
                  : task.priority === "medium" 
                  ? "bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-300" 
                  : "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300"
              }`}>
                {task.priority}
              </div>
            </div>
          ))}
        </div>
        
        {/* Recommendations */}
        <h2 className="text-xl font-semibold mb-4 dark:text-white">{t('recommendations')}</h2>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {mockRecommendations.map(rec => (
            <Card key={rec.id}>
              <CardHeader>
                <CardTitle className="text-lg dark:text-white">{rec.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground dark:text-white/80 mb-4">{rec.description}</p>
                <div className="flex justify-between items-center">
                  <div className="flex gap-2">
                    <span className={`px-2 py-1 rounded-full text-xs ${
                      rec.impact === "high" 
                        ? "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300" 
                        : "bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-300"
                    }`}>
                      Impact: {rec.impact}
                    </span>
                    <span className={`px-2 py-1 rounded-full text-xs ${
                      rec.cost === "low" 
                        ? "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300" 
                        : rec.cost === "medium" 
                        ? "bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-300"
                        : "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300"
                    }`}>
                      Cost: {rec.cost}
                    </span>
                  </div>
                  <Button variant="ghost" size="sm" className="text-eco-primary dark:text-eco-primary">
                    <ArrowRight className="h-4 w-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default DashboardPage;

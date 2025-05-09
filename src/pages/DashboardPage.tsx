
import { useState } from "react";
import { ArrowRight, Clipboard, CheckCircle, AlertCircle, ChevronRight } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";
import { Progress } from "../components/ui/progress";
import { Button } from "../components/ui/button";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { useLanguage } from "../components/LanguageSelector";

// Mock data
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
  }
];

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
  
  const handleToggleTask = (id: number) => {
    setTasks(tasks.map(task => 
      task.id === id ? { ...task, completed: !task.completed } : task
    ));
  };
  
  const completedTasksCount = tasks.filter(task => task.completed).length;
  const completionPercentage = (completedTasksCount / tasks.length) * 100;
  
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1 container py-8">
        <h1 className="text-3xl font-bold mb-6">{t('dashboard')}</h1>
        
        {/* Overview Cards */}
        <div className="grid gap-6 md:grid-cols-3 mb-8">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                {t('complianceScore')}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <div className="text-2xl font-bold">68%</div>
                <div className="text-sm text-muted-foreground">+5% from last month</div>
              </div>
              <Progress value={68} className="h-2 mt-4" />
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Tasks Completed
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <div className="text-2xl font-bold">{completedTasksCount}/{tasks.length}</div>
                <div className="text-sm text-muted-foreground">{completionPercentage.toFixed(0)}% complete</div>
              </div>
              <Progress value={completionPercentage} className="h-2 mt-4" />
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Resource Efficiency
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <div className="text-2xl font-bold">Good</div>
                <div className="text-sm text-muted-foreground">Based on industry average</div>
              </div>
              <Progress value={75} className="h-2 mt-4" />
            </CardContent>
          </Card>
        </div>
        
        {/* Alerts */}
        <h2 className="text-xl font-semibold mb-4">Alerts & Notifications</h2>
        <div className="space-y-4 mb-8">
          {mockAlerts.map(alert => (
            <div 
              key={alert.id} 
              className={`p-4 rounded-lg border flex items-start gap-3 ${
                alert.severity === "warning" ? "border-amber-500 bg-amber-50" : "border-blue-400 bg-blue-50"
              }`}
            >
              {alert.severity === "warning" ? (
                <AlertCircle className="h-5 w-5 text-amber-500 shrink-0 mt-0.5" />
              ) : (
                <Clipboard className="h-5 w-5 text-blue-500 shrink-0 mt-0.5" />
              )}
              <div>
                <h3 className="font-medium">{alert.title}</h3>
                <p className="text-sm text-muted-foreground">{alert.description}</p>
              </div>
            </div>
          ))}
        </div>
        
        {/* Tasks */}
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold">{t('tasks')}</h2>
          <Button variant="outline" size="sm">View All <ChevronRight className="ml-1 h-4 w-4" /></Button>
        </div>
        <div className="space-y-2 mb-8">
          {tasks.map(task => (
            <div 
              key={task.id} 
              className={`p-4 rounded-lg border flex items-center gap-3 ${task.completed ? "bg-muted/50" : "bg-white"}`}
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
                <p className={`font-medium ${task.completed ? "line-through text-muted-foreground" : ""}`}>
                  {task.title}
                </p>
                <p className="text-sm text-muted-foreground">Due: {new Date(task.dueDate).toLocaleDateString()}</p>
              </div>
              <div className={`px-2 py-1 rounded-full text-xs font-medium ${
                task.priority === "high" 
                  ? "bg-red-100 text-red-800" 
                  : task.priority === "medium" 
                  ? "bg-amber-100 text-amber-800" 
                  : "bg-green-100 text-green-800"
              }`}>
                {task.priority}
              </div>
            </div>
          ))}
        </div>
        
        {/* Recommendations */}
        <h2 className="text-xl font-semibold mb-4">{t('recommendations')}</h2>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {mockRecommendations.map(rec => (
            <Card key={rec.id}>
              <CardHeader>
                <CardTitle className="text-lg">{rec.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-4">{rec.description}</p>
                <div className="flex justify-between items-center">
                  <div className="flex gap-2">
                    <span className={`px-2 py-1 rounded-full text-xs ${
                      rec.impact === "high" 
                        ? "bg-green-100 text-green-800" 
                        : "bg-amber-100 text-amber-800"
                    }`}>
                      Impact: {rec.impact}
                    </span>
                    <span className={`px-2 py-1 rounded-full text-xs ${
                      rec.cost === "low" 
                        ? "bg-green-100 text-green-800" 
                        : rec.cost === "medium" 
                        ? "bg-amber-100 text-amber-800"
                        : "bg-red-100 text-red-800"
                    }`}>
                      Cost: {rec.cost}
                    </span>
                  </div>
                  <Button variant="ghost" size="sm" className="text-eco-primary">
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

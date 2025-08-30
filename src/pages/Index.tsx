
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  Brain, 
  Zap, 
  Target, 
  Users, 
  BarChart3, 
  Shield, 
  Rocket,
  CheckCircle2,
  ArrowRight,
  Sparkles
} from 'lucide-react';
import { motion } from 'framer-motion';
import { createPageUrl } from '@/utils';

export default function Index() {
  const features = [
    {
      icon: Brain,
      title: "AI-Powered Orchestration",
      description: "Autonomous project management with predictive analytics and intelligent task allocation",
    },
    {
      icon: Target,
      title: "Smart Sprint Planning",
      description: "AI-optimized sprint planning that adapts to team velocity and project requirements",
    },
    {
      icon: Users,
      title: "Intelligent Team Management", 
      description: "Automated team coordination with workload balancing and skill-based assignments",
    },
    {
      icon: BarChart3,
      title: "Predictive Analytics",
      description: "Real-time insights and forecasting to prevent bottlenecks before they occur",
    }
  ];

  const stats = [
    { label: "Productivity Boost", value: "300%", icon: Rocket },
    { label: "Time Saved", value: "40hrs/week", icon: Zap },
    { label: "Success Rate", value: "98%", icon: CheckCircle2 },
    { label: "AI Accuracy", value: "99.7%", icon: Brain }
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative overflow-hidden py-20 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8"
          >
            <Badge className="mb-6 bg-notion-blue text-white border-0 rounded-full px-4 py-1">
              <Sparkles className="w-4 h-4 mr-2" />
              Next-Gen Project Management
            </Badge>
            
            <h1 className="text-5xl font-semibold text-foreground mb-6 leading-tight">
              AI-Powered Agile
              <br />
              <span className="text-notion-blue">Orchestration</span>
            </h1>
            
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-8 leading-relaxed">
              Revolutionary project management platform that combines artificial intelligence 
              with agile methodologies to deliver unprecedented productivity.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Link to={createPageUrl('TeamLogin')}>
                <Button size="lg" className="gap-2">
                  <Rocket className="w-4 h-4" />
                  Start Orchestrating
                  <ArrowRight className="w-4 h-4" />
                </Button>
              </Link>
              
              <Button variant="outline" size="lg" className="gap-2">
                <Brain className="w-4 h-4" />
                Watch Demo
              </Button>
            </div>
          </motion.div>

          {/* Stats Grid */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16"
          >
            {stats.map((stat, index) => (
              <Card key={stat.label} className="text-center p-4">
                <stat.icon className="w-6 h-6 text-notion-blue mx-auto mb-2" />
                <div className="text-2xl font-semibold text-foreground mb-1">{stat.value}</div>
                <div className="text-sm text-muted-foreground">{stat.label}</div>
              </Card>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-6 bg-notion-gray-100">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl font-semibold text-foreground mb-4">
              Revolutionary Features
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Experience the future of project management with AI-driven automation 
              and intelligent decision making.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-6">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="h-full p-6">
                  <div className="flex items-start gap-4 mb-4">
                    <div className="w-10 h-10 bg-notion-blue rounded-lg flex items-center justify-center flex-shrink-0">
                      <feature.icon className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-foreground mb-2">
                        {feature.title}
                      </h3>
                      <p className="text-muted-foreground leading-relaxed">
                        {feature.description}
                      </p>
                    </div>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-6 bg-gradient-to-br from-notion-blue to-notion-purple text-white">
        <div className="max-w-3xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <Brain className="w-12 h-12 mx-auto mb-6 opacity-90" />
            
            <h2 className="text-3xl font-semibold mb-4">
              Ready to Revolutionize Your Projects?
            </h2>
            
            <p className="text-lg opacity-90 mb-8 max-w-2xl mx-auto">
              Join thousands of teams already experiencing the power of AI-driven 
              project orchestration. Transform your workflow today.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to={createPageUrl('TeamLogin')}>
                <Button size="lg" variant="secondary" className="gap-2">
                  <Shield className="w-4 h-4" />
                  Get Started Free
                </Button>
              </Link>
              
              <Button variant="outline" size="lg" className="gap-2 border-white/20 text-white hover:bg-white/10">
                <Users className="w-4 h-4" />
                Contact Sales
              </Button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}

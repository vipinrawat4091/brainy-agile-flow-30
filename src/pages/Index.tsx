
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
      color: "text-neo-blue"
    },
    {
      icon: Target,
      title: "Smart Sprint Planning",
      description: "AI-optimized sprint planning that adapts to team velocity and project requirements",
      color: "text-neo-green"
    },
    {
      icon: Users,
      title: "Intelligent Team Management", 
      description: "Automated team coordination with workload balancing and skill-based assignments",
      color: "text-neo-purple"
    },
    {
      icon: BarChart3,
      title: "Predictive Analytics",
      description: "Real-time insights and forecasting to prevent bottlenecks before they occur",
      color: "text-neo-pink"
    }
  ];

  const stats = [
    { label: "Productivity Boost", value: "300%", icon: Rocket },
    { label: "Time Saved", value: "40hrs/week", icon: Zap },
    { label: "Success Rate", value: "98%", icon: CheckCircle2 },
    { label: "AI Accuracy", value: "99.7%", icon: Brain }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-neo-light-gray via-neo-white to-neo-light-gray">
      {/* Hero Section */}
      <section className="relative overflow-hidden py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-16"
          >
            <Badge className="neo-card bg-neo-blue text-white font-black uppercase px-6 py-2 mb-6 text-lg">
              <Sparkles className="w-5 h-5 mr-2" />
              NEXT-GEN PROJECT MANAGEMENT
            </Badge>
            
            <h1 className="text-6xl md:text-8xl font-black text-gray-900 uppercase tracking-tight mb-8">
              <span className="text-gradient-ai">AI-POWERED</span><br />
              <span>AGILE</span><br />
              <span>ORCHESTRATION</span>
            </h1>
            
            <p className="text-xl md:text-2xl font-bold text-gray-600 max-w-4xl mx-auto mb-12 leading-relaxed">
              Revolutionary project management platform that combines artificial intelligence 
              with agile methodologies to deliver unprecedented productivity and results.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
              <Link to={createPageUrl('TeamLogin')}>
                <Button className="neo-button ai-primary text-white font-black uppercase text-xl px-12 py-6">
                  <Rocket className="w-6 h-6 mr-3" />
                  START ORCHESTRATING
                  <ArrowRight className="w-6 h-6 ml-3" />
                </Button>
              </Link>
              
              <Button 
                variant="outline" 
                className="neo-button font-black uppercase text-xl px-12 py-6 bg-white"
              >
                <Brain className="w-6 h-6 mr-3" />
                WATCH DEMO
              </Button>
            </div>
          </motion.div>

          {/* Stats Grid */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-20"
          >
            {stats.map((stat, index) => (
              <Card key={stat.label} className="neo-card bg-white text-center">
                <CardContent className="p-6">
                  <stat.icon className="w-12 h-12 text-neo-blue mx-auto mb-4" />
                  <div className="text-3xl font-black text-gray-900 mb-2">{stat.value}</div>
                  <div className="text-sm font-bold text-gray-600 uppercase">{stat.label}</div>
                </CardContent>
              </Card>
            ))}
          </motion.div>
        </div>

        {/* Background Elements */}
        <div className="absolute top-20 left-20 w-32 h-32 bg-neo-blue/10 rounded-full animate-bounce-soft"></div>
        <div className="absolute bottom-20 right-20 w-24 h-24 bg-neo-purple/10 rounded-full animate-pulse-ai"></div>
        <div className="absolute top-1/2 left-1/4 w-16 h-16 bg-neo-orange/10 rounded-full animate-bounce-soft" style={{ animationDelay: '1s' }}></div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-6 bg-white border-t-4 border-b-4 border-black">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-5xl font-black text-gray-900 uppercase mb-6">
              REVOLUTIONARY FEATURES
            </h2>
            <p className="text-xl font-bold text-gray-600 max-w-3xl mx-auto">
              Experience the future of project management with AI-driven automation 
              and intelligent decision making.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="neo-card bg-white h-full">
                  <CardHeader>
                    <div className="flex items-center gap-4 mb-4">
                      <div className={`w-16 h-16 bg-gradient-to-br ${
                        feature.color === 'text-neo-blue' ? 'from-neo-blue to-neo-cyan' :
                        feature.color === 'text-neo-green' ? 'from-neo-green to-neo-cyan' :
                        feature.color === 'text-neo-purple' ? 'from-neo-purple to-neo-pink' :
                        'from-neo-pink to-neo-orange'
                      } neo-card flex items-center justify-center`}>
                        <feature.icon className="w-8 h-8 text-white" />
                      </div>
                      <CardTitle className="text-2xl font-black uppercase text-gray-900">
                        {feature.title}
                      </CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-lg font-bold text-gray-600 leading-relaxed">
                      {feature.description}
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-6 bg-gradient-to-r from-neo-blue via-neo-purple to-neo-pink">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <Brain className="w-20 h-20 text-white mx-auto mb-8 animate-pulse-ai" />
            
            <h2 className="text-5xl font-black text-white uppercase mb-6">
              READY TO REVOLUTIONIZE
              <br />
              YOUR PROJECTS?
            </h2>
            
            <p className="text-xl font-bold text-white/90 mb-12 max-w-2xl mx-auto">
              Join thousands of teams already experiencing the power of AI-driven 
              project orchestration. Transform your workflow today.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <Link to={createPageUrl('TeamLogin')}>
                <Button className="neo-button bg-white text-neo-blue font-black uppercase text-xl px-12 py-6 border-white">
                  <Shield className="w-6 h-6 mr-3" />
                  GET STARTED FREE
                </Button>
              </Link>
              
              <Button 
                variant="outline" 
                className="neo-button border-white text-white font-black uppercase text-xl px-12 py-6 bg-transparent hover:bg-white/10"
              >
                <Users className="w-6 h-6 mr-3" />
                CONTACT SALES
              </Button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}

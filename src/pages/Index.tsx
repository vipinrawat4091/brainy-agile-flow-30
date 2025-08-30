
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
      {/* Hero Section - Compact */}
      <section className="relative overflow-hidden py-12 px-4">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-10"
          >
            <Badge className="border-2 border-black bg-neo-blue text-white font-bold text-sm px-4 py-1 mb-4 shadow-[2px_2px_0px_#000]">
              <Sparkles className="w-4 h-4 mr-2" />
              NEXT-GEN PROJECT MANAGEMENT
            </Badge>
            
            <h1 className="text-4xl md:text-6xl font-black text-gray-900 uppercase tracking-tight mb-6">
              <span className="text-gradient-ai">AI-POWERED</span><br />
              <span>AGILE</span><br />
              <span>ORCHESTRATION</span>
            </h1>
            
            <p className="text-lg md:text-xl font-semibold text-gray-600 max-w-3xl mx-auto mb-8 leading-relaxed">
              Revolutionary project management platform that combines artificial intelligence 
              with agile methodologies to deliver unprecedented productivity and results.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Link to={createPageUrl('TeamLogin')}>
                <Button className="border-2 border-black font-bold text-lg px-8 py-4 shadow-[4px_4px_0px_#000] ai-primary text-white hover:transform hover:translate-x-[-1px] hover:translate-y-[-1px] hover:shadow-[5px_5px_0px_#000]">
                  <Rocket className="w-5 h-5 mr-2" />
                  START ORCHESTRATING
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
              </Link>
              
              <Button 
                variant="outline" 
                className="border-2 border-black font-bold text-lg px-8 py-4 shadow-[4px_4px_0px_#000] bg-white hover:transform hover:translate-x-[-1px] hover:translate-y-[-1px] hover:shadow-[5px_5px_0px_#000]"
              >
                <Brain className="w-5 h-5 mr-2" />
                WATCH DEMO
              </Button>
            </div>
          </motion.div>

          {/* Stats Grid - Compact */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12"
          >
            {stats.map((stat, index) => (
              <Card key={stat.label} className="border-2 border-black bg-white text-center shadow-[3px_3px_0px_#000]">
                <CardContent className="p-4">
                  <stat.icon className="w-8 h-8 text-neo-blue mx-auto mb-3" />
                  <div className="text-2xl font-black text-gray-900 mb-1">{stat.value}</div>
                  <div className="text-xs font-bold text-gray-600 uppercase">{stat.label}</div>
                </CardContent>
              </Card>
            ))}
          </motion.div>
        </div>

        {/* Background Elements - Smaller */}
        <div className="absolute top-20 left-20 w-16 h-16 bg-neo-blue/10 rounded-full animate-bounce-soft"></div>
        <div className="absolute bottom-20 right-20 w-12 h-12 bg-neo-purple/10 rounded-full animate-pulse-ai"></div>
        <div className="absolute top-1/2 left-1/4 w-8 h-8 bg-neo-orange/10 rounded-full animate-bounce-soft" style={{ animationDelay: '1s' }}></div>
      </section>

      {/* Features Section - Compact */}
      <section className="py-12 px-4 bg-white border-t-2 border-b-2 border-black">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-10"
          >
            <h2 className="text-3xl md:text-4xl font-black text-gray-900 uppercase mb-4">
              REVOLUTIONARY FEATURES
            </h2>
            <p className="text-lg font-semibold text-gray-600 max-w-2xl mx-auto">
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
                <Card className="border-2 border-black bg-white h-full shadow-[4px_4px_0px_#000]">
                  <CardHeader className="pb-3">
                    <div className="flex items-center gap-3 mb-3">
                      <div className={`w-12 h-12 bg-gradient-to-br ${
                        feature.color === 'text-neo-blue' ? 'from-neo-blue to-neo-cyan' :
                        feature.color === 'text-neo-green' ? 'from-neo-green to-neo-cyan' :
                        feature.color === 'text-neo-purple' ? 'from-neo-purple to-neo-pink' :
                        'from-neo-pink to-neo-orange'
                      } border-2 border-black shadow-[2px_2px_0px_#000] flex items-center justify-center`}>
                        <feature.icon className="w-6 h-6 text-white" />
                      </div>
                      <CardTitle className="text-lg font-black uppercase text-gray-900">
                        {feature.title}
                      </CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent className="pt-0">
                    <p className="text-sm font-semibold text-gray-600 leading-relaxed">
                      {feature.description}
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section - Compact */}
      <section className="py-12 px-4 bg-gradient-to-r from-neo-blue via-neo-purple to-neo-pink">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <Brain className="w-16 h-16 text-white mx-auto mb-6 animate-pulse-ai" />
            
            <h2 className="text-3xl md:text-4xl font-black text-white uppercase mb-4">
              READY TO REVOLUTIONIZE
              <br />
              YOUR PROJECTS?
            </h2>
            
            <p className="text-lg font-semibold text-white/90 mb-8 max-w-2xl mx-auto">
              Join thousands of teams already experiencing the power of AI-driven 
              project orchestration. Transform your workflow today.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to={createPageUrl('TeamLogin')}>
                <Button className="border-2 border-white bg-white text-neo-blue font-bold text-lg px-8 py-4 shadow-[4px_4px_0px_rgba(255,255,255,0.3)] hover:transform hover:translate-x-[-1px] hover:translate-y-[-1px]">
                  <Shield className="w-5 h-5 mr-2" />
                  GET STARTED FREE
                </Button>
              </Link>
              
              <Button 
                variant="outline" 
                className="border-2 border-white text-white font-bold text-lg px-8 py-4 shadow-[4px_4px_0px_rgba(255,255,255,0.3)] bg-transparent hover:bg-white/10 hover:transform hover:translate-x-[-1px] hover:translate-y-[-1px]"
              >
                <Users className="w-5 h-5 mr-2" />
                CONTACT SALES
              </Button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { 
  Brain, 
  User as UserIcon, 
  Lock, 
  Users,
  Zap,
  Shield,
  Eye
} from "lucide-react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { createPageUrl } from "@/utils";

export default function TeamLogin() {
  const navigate = useNavigate();
  const [loginType, setLoginType] = useState('manager'); // manager, team_member, or client
  const [credentials, setCredentials] = useState({
    username: '',
    password: ''
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      if (loginType === 'manager') {
        if (credentials.username === 'admin' && credentials.password === 'admin123') {
          localStorage.setItem('user_type', 'manager');
          localStorage.setItem('user_data', JSON.stringify({ 
            email: 'admin@projectai.com', 
            full_name: 'Project Manager',
            role: 'manager'
          }));
          navigate(createPageUrl('Dashboard'));
        } else {
          setError('Invalid manager credentials');
        }
      } else if (loginType === 'team_member') {
        if (credentials.username === 'john_dev' && credentials.password === 'dev123') {
          localStorage.setItem('user_type', 'team_member');
          localStorage.setItem('user_data', JSON.stringify({
            username: 'john_dev',
            full_name: 'John Developer',
            email: 'john@projectai.com',
            user_email: 'john@projectai.com',
            project_id: 'project_1',
            role: 'developer',
            is_active: true
          }));
          navigate(createPageUrl('TeamDashboard'));
        } else {
          setError('Invalid team member credentials');
        }
      } else if (loginType === 'client') {
        if (credentials.username === 'client_demo' && credentials.password === 'client123') {
          localStorage.setItem('user_type', 'client');
          localStorage.setItem('user_data', JSON.stringify({
            username: 'client_demo',
            full_name: 'Demo Client',
            email: 'client@company.com',
            project_id: 'project_1',
            project_name: 'AI Project Management System',
            role: 'client',
            is_active: true
          }));
          navigate('/client-dashboard');
        } else {
          setError('Invalid client credentials');
        }
      }
    } catch (error) {
      console.error('Login error:', error);
      setError('Login failed. Please try again.');
    }

    setIsLoading(false);
  };

  const fillDemoCredentials = (type: string) => {
    if (type === 'manager') {
      setCredentials({ username: 'admin', password: 'admin123' });
    } else if (type === 'team_member') {
      setCredentials({ username: 'john_dev', password: 'dev123' });
    } else if (type === 'client') {
      setCredentials({ username: 'client_demo', password: 'client123' });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-100 to-white flex items-center justify-center p-6">
      <style>{`
        .neo-button {
          border: 4px solid #000000 !important;
          box-shadow: 8px 8px 0px #000000 !important;
          transition: all 0.1s ease !important;
        }
        
        .neo-button:hover {
          transform: translate(-2px, -2px) !important;
          box-shadow: 10px 10px 0px #000000 !important;
        }
        
        .neo-card {
          border: 4px solid #000000 !important;
          box-shadow: 8px 8px 0px #000000 !important;
        }
        
        .neo-input {
          border: 3px solid #000000 !important;
          box-shadow: 4px 4px 0px #000000 !important;
        }
      `}</style>

      <div className="max-w-md w-full space-y-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center"
        >
          <div className="w-20 h-20 bg-blue-600 neo-card mx-auto mb-6 flex items-center justify-center">
            <Brain className="w-10 h-10 text-white" />
          </div>
          <h1 className="text-3xl font-black text-gray-900 uppercase tracking-tight mb-2">
            PROJECT AI
          </h1>
          <p className="text-gray-600 font-bold uppercase tracking-wide">
            ORCHESTRATION PLATFORM
          </p>
        </motion.div>

        {/* Login Form */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <Card className="neo-card bg-white">
            <CardHeader className="p-0">
              <div className="flex">
                <button 
                  onClick={() => setLoginType('manager')}
                  className={`flex-1 p-3 font-black uppercase text-center border-b-4 transition-all text-xs ${
                    loginType === 'manager' 
                      ? 'border-blue-600 text-blue-600 bg-blue-50' 
                      : 'border-transparent text-gray-500 hover:bg-gray-50'
                  }`}
                >
                  <Shield className="w-4 h-4 mx-auto mb-1" />
                  Manager
                </button>
                <button 
                  onClick={() => setLoginType('team_member')}
                  className={`flex-1 p-3 font-black uppercase text-center border-b-4 transition-all text-xs ${
                    loginType === 'team_member' 
                      ? 'border-purple-600 text-purple-600 bg-purple-50' 
                      : 'border-transparent text-gray-500 hover:bg-gray-50'
                  }`}
                >
                  <Users className="w-4 h-4 mx-auto mb-1" />
                  Team
                </button>
                <button 
                  onClick={() => setLoginType('client')}
                  className={`flex-1 p-3 font-black uppercase text-center border-b-4 transition-all text-xs ${
                    loginType === 'client' 
                      ? 'border-green-600 text-green-600 bg-green-50' 
                      : 'border-transparent text-gray-500 hover:bg-gray-50'
                  }`}
                >
                  <Eye className="w-4 h-4 mx-auto mb-1" />
                  Client
                </button>
              </div>
            </CardHeader>
            <CardContent className="p-6">
              <form onSubmit={handleLogin} className="space-y-6">
                <div>
                  <label className="block text-sm font-black text-gray-900 uppercase mb-2">
                    USERNAME
                  </label>
                  <div className="relative">
                    <UserIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <Input
                      className="neo-input pl-12 font-bold bg-white"
                      type="text"
                      placeholder="Enter username"
                      value={credentials.username}
                      onChange={(e) => setCredentials({...credentials, username: e.target.value})}
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-black text-gray-900 uppercase mb-2">
                    PASSWORD
                  </label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <Input
                      className="neo-input pl-12 font-bold bg-white"
                      type="password"
                      placeholder="Enter password"
                      value={credentials.password}
                      onChange={(e) => setCredentials({...credentials, password: e.target.value})}
                      required
                    />
                  </div>
                </div>

                {error && (
                  <Alert className="neo-card bg-red-50 border-red-500">
                    <AlertDescription className="font-bold text-red-800">
                      {error}
                    </AlertDescription>
                  </Alert>
                )}

                <Button
                  type="submit"
                  disabled={isLoading}
                  className="neo-button w-full font-black uppercase text-white"
                  style={{ 
                    background: loginType === 'manager' ? '#0066FF' : 
                               loginType === 'team_member' ? '#7700FF' : '#00AA44' 
                  }}
                >
                  {isLoading ? (
                    <>
                      <Brain className="w-5 h-5 mr-2 animate-spin" />
                      LOGGING IN...
                    </>
                  ) : (
                    <>
                      <Zap className="w-5 h-5 mr-2" />
                      ACCESS DASHBOARD
                    </>
                  )}
                </Button>
              </form>
            </CardContent>
          </Card>
        </motion.div>

        {/* Demo Credentials */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="neo-card bg-gradient-to-r from-purple-500 to-pink-500 text-white p-6"
        >
          <h3 className="font-black uppercase text-lg mb-4 text-center">
            DEMO CREDENTIALS
          </h3>
          <div className="grid grid-cols-3 gap-2">
            <Button 
              onClick={() => fillDemoCredentials('manager')} 
              className="neo-button bg-white/20 hover:bg-white/30 text-white font-black uppercase border-white/50 text-xs p-2"
            >
              <Shield className="w-3 h-3 mr-1" />
              MGR
            </Button>
            <Button 
              onClick={() => fillDemoCredentials('team_member')} 
              className="neo-button bg-white/20 hover:bg-white/30 text-white font-black uppercase border-white/50 text-xs p-2"
            >
              <Users className="w-3 h-3 mr-1" />
              TEAM
            </Button>
            <Button 
              onClick={() => fillDemoCredentials('client')} 
              className="neo-button bg-white/20 hover:bg-white/30 text-white font-black uppercase border-white/50 text-xs p-2"
            >
              <Eye className="w-3 h-3 mr-1" />
              CLIENT
            </Button>
          </div>
          <p className="text-orange-100 text-xs font-bold text-center mt-4">
            Click a button to auto-fill demo credentials.
          </p>
        </motion.div>
      </div>
    </div>
  );
}

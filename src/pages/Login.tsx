import { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate, Link } from 'react-router-dom';
import { Mail, Lock, ArrowRight, Zap, Loader2, Eye, EyeOff } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useAuth } from '@/contexts/AuthContext';
import { toast } from 'sonner';
import ArabianLogo from '@/components/ArabianLogo';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const { signIn } = useAuth();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        try {
            const { error } = await signIn(email, password);
            if (error) {
                toast.error(error.message || 'Email ou senha incorretos');
            } else {
                toast.success('Login realizado com sucesso!');
                navigate('/dashboard');
            }
        } catch (err) {
            toast.error('Ocorreu um erro inesperado');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-background flex items-center justify-center relative overflow-hidden">
            {/* Animated Background */}
            <div className="absolute inset-0 bg-hero-pattern opacity-30" />
            <motion.div
                animate={{
                    scale: [1, 1.2, 1],
                    opacity: [0.2, 0.3, 0.2],
                }}
                transition={{ duration: 8, repeat: Infinity }}
                className="absolute top-1/4 right-1/4 w-96 h-96 bg-accent/10 rounded-full blur-3xl"
            />
            <motion.div
                animate={{
                    scale: [1.2, 1, 1.2],
                    opacity: [0.15, 0.25, 0.15],
                }}
                transition={{ duration: 10, repeat: Infinity }}
                className="absolute bottom-1/4 left-1/4 w-80 h-80 bg-secondary/15 rounded-full blur-3xl"
            />

            {/* Login Card */}
            <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="relative z-10 w-full max-w-md mx-4"
            >
                <div className="glass-card-emerald p-8 md:p-10">
                    {/* Logo */}
                    <div className="text-center mb-8">
                        <motion.div
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            transition={{ delay: 0.2, type: 'spring' }}
                            className="flex justify-center mb-4"
                        >
                            <ArabianLogo size="lg" />
                        </motion.div>
                        <h1 className="font-display text-2xl font-bold text-foreground">
                            Bem-vindo de volta!
                        </h1>
                        <p className="text-muted-foreground text-sm mt-1">
                            Faça login para acessar seu painel
                        </p>
                    </div>

                    {/* Form */}
                    <form onSubmit={handleSubmit} className="space-y-5">
                        <div>
                            <Label htmlFor="email" className="text-foreground">
                                Email
                            </Label>
                            <div className="relative mt-1.5">
                                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                                <Input
                                    id="email"
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    placeholder="seu@email.com"
                                    required
                                    className="pl-10 bg-muted/30 border-border/50 focus:border-accent h-12"
                                />
                            </div>
                        </div>

                        <div>
                            <div className="flex justify-between items-center">
                                <Label htmlFor="password" className="text-foreground">
                                    Senha
                                </Label>
                                <button
                                    type="button"
                                    className="text-xs text-accent hover:underline"
                                >
                                    Esqueceu a senha?
                                </button>
                            </div>
                            <div className="relative mt-1.5">
                                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                                <Input
                                    id="password"
                                    type={showPassword ? 'text' : 'password'}
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    placeholder="••••••••"
                                    required
                                    minLength={6}
                                    className="pl-10 pr-10 bg-muted/30 border-border/50 focus:border-accent h-12"
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                                >
                                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                                </button>
                            </div>
                        </div>

                        <Button
                            type="submit"
                            variant="hero"
                            size="lg"
                            className="w-full h-12 group"
                            disabled={loading}
                        >
                            {loading ? (
                                <Loader2 className="w-5 h-5 animate-spin" />
                            ) : (
                                <>
                                    Entrar
                                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                                </>
                            )}
                        </Button>
                    </form>

                    {/* Divider */}
                    <div className="relative my-6">
                        <div className="absolute inset-0 flex items-center">
                            <span className="w-full border-t border-border/50" />
                        </div>
                        <div className="relative flex justify-center text-xs uppercase">
                            <span className="bg-card px-2 text-muted-foreground">ou</span>
                        </div>
                    </div>

                    {/* Register Link */}
                    <p className="text-center text-sm text-muted-foreground">
                        Não tem uma conta?{' '}
                        <Link to="/signup" className="text-accent hover:underline font-medium">
                            Cadastre-se
                        </Link>
                    </p>

                    {/* Back to home */}
                    <div className="mt-6 text-center">
                        <Link
                            to="/"
                            className="text-sm text-muted-foreground hover:text-accent transition-colors"
                        >
                            ← Voltar para a página inicial
                        </Link>
                    </div>
                </div>
            </motion.div>
        </div>
    );
};

export default Login;

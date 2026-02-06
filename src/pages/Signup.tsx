import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate, Link } from 'react-router-dom';
import { Mail, Lock, User, ArrowRight, Loader2, Eye, EyeOff, Building2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useAuth } from '@/contexts/AuthContext';
import { toast } from 'sonner';
import ArabianLogo from '@/components/ArabianLogo';

type AccountType = 'personal' | 'company';

const Signup = () => {
    const [accountType, setAccountType] = useState<AccountType>('personal');
    const [nome, setNome] = useState('');
    const [companyName, setCompanyName] = useState('');
    const [cnpj, setCnpj] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const { signUp } = useAuth();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (password !== confirmPassword) {
            toast.error('As senhas não coincidem');
            return;
        }

        if (password.length < 6) {
            toast.error('A senha deve ter no mínimo 6 caracteres');
            return;
        }

        setLoading(true);

        try {
            // Prepare metadata based on account type
            const metadata = accountType === 'company'
                ? { nome, companyName, cnpj, accountType: 'company' }
                : { nome, accountType: 'personal' };

            const { error } = await signUp(email, password, metadata);

            if (error) {
                toast.error(error.message || 'Erro ao criar conta');
            } else {
                toast.success('Conta criada! Verifique seu email para confirmar.');
                navigate('/login');
            }
        } catch (err) {
            toast.error('Ocorreu um erro inesperado');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-background flex items-center justify-center relative overflow-hidden py-8">
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

            {/* Signup Card */}
            <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="relative z-10 w-full max-w-md mx-4"
            >
                <div className="glass-card-emerald p-8 md:p-10">
                    {/* Logo */}
                    <div className="text-center mb-6">
                        <motion.div
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            transition={{ delay: 0.2, type: 'spring' }}
                            className="flex justify-center mb-4"
                        >
                            <ArabianLogo size="lg" />
                        </motion.div>
                        <h1 className="font-display text-2xl font-bold text-foreground">
                            Criar Conta
                        </h1>
                        <p className="text-muted-foreground text-sm mt-1">
                            Comece a economizar energia hoje
                        </p>
                    </div>

                    {/* Account Type Toggle */}
                    <div className="flex bg-muted/30 rounded-lg p-1 mb-6">
                        <button
                            type="button"
                            onClick={() => setAccountType('personal')}
                            className={`flex-1 py-2.5 px-4 rounded-md text-sm font-medium transition-all flex items-center justify-center gap-2 ${accountType === 'personal'
                                ? 'bg-accent text-accent-foreground'
                                : 'text-muted-foreground hover:text-foreground'
                                }`}
                        >
                            <User className="w-4 h-4" />
                            Pessoal
                        </button>
                        <button
                            type="button"
                            onClick={() => setAccountType('company')}
                            className={`flex-1 py-2.5 px-4 rounded-md text-sm font-medium transition-all flex items-center justify-center gap-2 ${accountType === 'company'
                                ? 'bg-accent text-accent-foreground'
                                : 'text-muted-foreground hover:text-foreground'
                                }`}
                        >
                            <Building2 className="w-4 h-4" />
                            Empresa
                        </button>
                    </div>

                    {/* Form */}
                    <form onSubmit={handleSubmit} className="space-y-4">
                        {/* Personal Name Field */}
                        <div>
                            <Label htmlFor="nome" className="text-foreground">
                                {accountType === 'company' ? 'Nome do Responsável' : 'Nome Completo'}
                            </Label>
                            <div className="relative mt-1.5">
                                <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                                <Input
                                    id="nome"
                                    type="text"
                                    value={nome}
                                    onChange={(e) => setNome(e.target.value)}
                                    placeholder="Seu nome completo"
                                    required
                                    className="pl-10 bg-muted/30 border-border/50 focus:border-accent h-12"
                                />
                            </div>
                        </div>

                        {/* Company Fields */}
                        <AnimatePresence mode="wait">
                            {accountType === 'company' && (
                                <motion.div
                                    key="company-fields"
                                    initial={{ opacity: 0, height: 0 }}
                                    animate={{ opacity: 1, height: 'auto' }}
                                    exit={{ opacity: 0, height: 0 }}
                                    transition={{ duration: 0.2 }}
                                    className="space-y-4"
                                >
                                    <div>
                                        <Label htmlFor="companyName" className="text-foreground">
                                            Nome da Empresa
                                        </Label>
                                        <div className="relative mt-1.5">
                                            <Building2 className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                                            <Input
                                                id="companyName"
                                                type="text"
                                                value={companyName}
                                                onChange={(e) => setCompanyName(e.target.value)}
                                                placeholder="Nome da sua empresa"
                                                required={accountType === 'company'}
                                                className="pl-10 bg-muted/30 border-border/50 focus:border-accent h-12"
                                            />
                                        </div>
                                    </div>
                                    <div>
                                        <Label htmlFor="cnpj" className="text-foreground">
                                            CNPJ
                                        </Label>
                                        <div className="relative mt-1.5">
                                            <Input
                                                id="cnpj"
                                                type="text"
                                                value={cnpj}
                                                onChange={(e) => setCnpj(e.target.value)}
                                                placeholder="00.000.000/0000-00"
                                                className="pl-4 bg-muted/30 border-border/50 focus:border-accent h-12"
                                            />
                                        </div>
                                        <p className="text-xs text-muted-foreground mt-1">
                                            Opcional - pode ser adicionado depois
                                        </p>
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>

                        {/* Email Field */}
                        <div>
                            <Label htmlFor="email" className="text-foreground">
                                Email {accountType === 'company' && 'Corporativo'}
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

                        {/* Password Field */}
                        <div>
                            <Label htmlFor="password" className="text-foreground">
                                Senha
                            </Label>
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

                        {/* Confirm Password Field */}
                        <div>
                            <Label htmlFor="confirmPassword" className="text-foreground">
                                Confirmar Senha
                            </Label>
                            <div className="relative mt-1.5">
                                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                                <Input
                                    id="confirmPassword"
                                    type={showPassword ? 'text' : 'password'}
                                    value={confirmPassword}
                                    onChange={(e) => setConfirmPassword(e.target.value)}
                                    placeholder="••••••••"
                                    required
                                    minLength={6}
                                    className="pl-10 bg-muted/30 border-border/50 focus:border-accent h-12"
                                />
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
                                    Criar Conta
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

                    {/* Login Link */}
                    <p className="text-center text-sm text-muted-foreground">
                        Já tem uma conta?{' '}
                        <Link to="/login" className="text-accent hover:underline font-medium">
                            Faça login
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

export default Signup;

import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import {
    Thermometer,
    Zap,
    TrendingDown,
    Settings,
    LogOut,
    MapPin,
    Power,
    Gauge
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/AuthContext';
import { toast } from 'sonner';
import ArabianLogo from '@/components/ArabianLogo';

const Dashboard = () => {
    const { user, signOut } = useAuth();
    const navigate = useNavigate();

    const handleLogout = async () => {
        await signOut();
        toast.success('Logout realizado com sucesso');
        navigate('/');
    };

    const statsCards = [
        {
            icon: Zap,
            label: 'Consumo Estimado',
            value: 'R$ 35',
            color: 'text-accent',
            bgColor: 'bg-accent/10',
        },
        {
            icon: Gauge,
            label: 'Energia Estimada',
            value: '12 kWh',
            color: 'text-secondary',
            bgColor: 'bg-secondary/10',
        },
    ];

    return (
        <div className="min-h-screen bg-background">
            {/* Header */}
            <header className="border-b border-border/50 bg-card/50 backdrop-blur-xl sticky top-0 z-50">
                <div className="section-container flex items-center justify-between h-16">
                    <ArabianLogo size="sm" />
                    <div className="flex items-center gap-4">
                        <span className="text-sm text-muted-foreground hidden sm:block">
                            {user?.email}
                        </span>
                        <Button variant="ghost" size="sm" onClick={handleLogout}>
                            <LogOut className="w-4 h-4 mr-2" />
                            Sair
                        </Button>
                    </div>
                </div>
            </header>

            {/* Main Content */}
            <main className="section-container py-8">
                {/* Page Title */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mb-8"
                >
                    <h1 className="font-display text-3xl font-bold text-foreground">
                        Painel de Controle
                    </h1>
                    <div className="flex items-center gap-2 mt-2">
                        <span className="px-2 py-0.5 bg-secondary/20 text-secondary text-xs font-semibold rounded-full">
                            BETA
                        </span>
                        <span className="text-muted-foreground text-sm">
                            Sistema em desenvolvimento
                        </span>
                    </div>
                </motion.div>

                {/* Temperature Card */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                    className="glass-card p-8 mb-6"
                >
                    <div className="text-center">
                        <div className="font-display text-7xl font-bold text-foreground mb-4">
                            22<span className="text-4xl text-muted-foreground">°C</span>
                        </div>
                        <div className="flex items-center justify-center gap-6 text-sm">
                            <div className="flex items-center gap-2">
                                <Power className="w-4 h-4 text-secondary" />
                                <span className="text-muted-foreground">Ligado</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <Settings className="w-4 h-4 text-accent" />
                                <span className="text-muted-foreground">Automático</span>
                            </div>
                        </div>
                        <div className="flex items-center justify-center gap-2 mt-4 text-sm text-muted-foreground">
                            <MapPin className="w-4 h-4" />
                            <span>Escritório Principal</span>
                        </div>
                    </div>
                </motion.div>

                {/* Stats Grid */}
                <div className="grid grid-cols-2 gap-4 mb-6">
                    {statsCards.map((stat, index) => (
                        <motion.div
                            key={stat.label}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2 + index * 0.1 }}
                            className="glass-card p-6"
                        >
                            <div className={`w-10 h-10 rounded-lg ${stat.bgColor} flex items-center justify-center mb-3`}>
                                <stat.icon className={`w-5 h-5 ${stat.color}`} />
                            </div>
                            <div className="font-display text-2xl font-bold text-foreground">
                                {stat.value}
                            </div>
                            <div className="text-sm text-muted-foreground">
                                {stat.label}
                            </div>
                        </motion.div>
                    ))}
                </div>

                {/* Savings Card */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                    className="glass-card-emerald p-6"
                >
                    <div className="flex items-center gap-3 mb-4">
                        <TrendingDown className="w-6 h-6 text-secondary" />
                        <span className="font-display font-semibold text-foreground">
                            Economia com IA
                        </span>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <div className="text-sm text-muted-foreground mb-1">Economia em R$</div>
                            <div className="font-display text-3xl font-bold text-secondary">
                                R$ 150
                            </div>
                        </div>
                        <div>
                            <div className="text-sm text-muted-foreground mb-1">Economia em kWh</div>
                            <div className="font-display text-3xl font-bold text-secondary">
                                32 kWh
                            </div>
                        </div>
                    </div>
                </motion.div>

                {/* Beta Notice */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.6 }}
                    className="mt-8 p-4 bg-muted/20 rounded-lg border border-border/50"
                >
                    <p className="text-sm text-muted-foreground text-center">
                        🚧 <strong>Versão Beta</strong> — Esta é uma prévia do painel de controle.
                        Funcionalidades completas serão liberadas em breve.
                    </p>
                </motion.div>
            </main>
        </div>
    );
};

export default Dashboard;

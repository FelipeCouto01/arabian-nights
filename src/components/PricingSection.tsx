import { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import {
  Check,
  Home,
  Building2,
  Factory,
  ArrowRight,
  Wind,
  BrainCircuit,
  FileText,
  Shield,
  Sparkles
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  ResponsiveContainer,
  Cell
} from 'recharts';
import { useAuth } from '@/contexts/AuthContext';
import { toast } from 'sonner';

const PricingSection = () => {
  const [isAnnual, setIsAnnual] = useState(false);
  const navigate = useNavigate();
  const { user } = useAuth();

  // Base prices (monthly)
  const basePrices = {
    basic: 149,
    business: 699,
  };

  // Calculate prices with annual discount (20% off)
  const getPrice = (basePrice: number) => {
    if (isAnnual) {
      return Math.round(basePrice * 0.8);
    }
    return basePrice;
  };

  const handlePurchase = (planName: string) => {
    if (!user) {
      toast.info('Faça login para contratar o plano', {
        description: 'Você será redirecionado para a página de autenticação.',
        duration: 3000,
      });
      navigate('/auth');
      return;
    }

    // Simulate checkout
    toast.success(`🎉 Plano ${planName} selecionado!`, {
      description: 'Em produção, aqui seria o checkout do Stripe.',
      duration: 5000,
    });
  };

  const plans = [
    {
      name: 'Basic',
      subtitle: 'Residencial',
      price: getPrice(basePrices.basic),
      period: isAnnual ? '/mês (anual)' : '/mês',
      description: 'Controle via App e agendamento básico',
      icon: Home,
      features: [
        'Automação por horário e presença',
        'Até 3 zonas de climatização',
        'App mobile completo',
        'Relatórios mensais de economia',
        'Suporte por email',
      ],
      cta: 'Começar Grátis',
      variant: 'outline' as const,
      featured: false,
    },
    {
      name: 'Business',
      subtitle: 'Eficiência de Escala',
      price: getPrice(basePrices.business),
      period: isAnnual ? '/mês (anual)' : '/mês',
      description: 'IA Preditiva completa + Dashboard de CO₂ + Economia de 30% garantida',
      icon: Building2,
      badge: 'Economia Real de 20% a 40%',
      features: [
        {
          icon: Wind,
          text: 'Gestão de CO₂ Dinâmica',
          detail: 'Controle de renovação de ar para manter o foco e produtividade'
        },
        {
          icon: BrainCircuit,
          text: 'Algoritmo Preditivo MPC',
          detail: 'Sistema aprende horários de pico e resfria antecipadamente'
        },
        {
          icon: FileText,
          text: 'Relatórios ESG',
          detail: 'Geração automática de dados de economia de carbono'
        },
        {
          icon: Shield,
          text: 'Conformidade ASHRAE 55',
          detail: 'Garantia de conforto térmico para 90% dos ocupantes'
        },
      ],
      cta: 'Agendar Consultoria Técnica',
      variant: 'hero' as const,
      featured: true,
    },
    {
      name: 'Industrial',
      subtitle: 'Custom',
      price: 'Sob Consulta',
      period: '',
      description: 'Integração com sistemas prediais complexos e manutenção preditiva',
      icon: Factory,
      features: [
        'Tudo do plano Business',
        'IA avançada com MPC & DRL',
        'Demand Response integrado',
        'Manutenção preditiva',
        'SLA garantido 99.9%',
        'Gerente de conta dedicado',
        'Treinamento da equipe',
      ],
      cta: 'Falar com Vendas',
      variant: 'success' as const,
      featured: false,
    },
  ];

  const comparisonData = [
    { name: 'Sem Arabian Nights', value: 100, fill: 'hsl(0 84% 60%)' },
    { name: 'Com Arabian Nights', value: 65, fill: 'hsl(160 84% 45%)' },
  ];

  return (
    <section id="planos" className="py-24 relative">
      {/* Background */}
      <div className="absolute inset-0 bg-hero-pattern opacity-30" />

      <div className="section-container relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <span className="text-sm font-semibold text-accent uppercase tracking-wider">
            Planos & Preços
          </span>
          <h2 className="font-display text-3xl md:text-4xl font-bold mt-4 mb-6">
            Escolha o Plano Ideal para{' '}
            <span className="text-gradient-gold">Seu Edifício</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Do residencial ao industrial, temos a solução perfeita para cada necessidade.
            Todos os planos incluem instalação remota assistida.
          </p>
        </motion.div>

        {/* Billing Toggle - Fixed width to prevent layout shift */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="flex items-center justify-center mb-12"
        >
          <div className="inline-grid grid-cols-[80px_auto_80px_100px] items-center gap-2">
            <span className={`text-right font-medium transition-colors ${!isAnnual ? 'text-foreground' : 'text-muted-foreground'}`}>
              Mensal
            </span>
            <Switch
              checked={isAnnual}
              onCheckedChange={setIsAnnual}
              className="data-[state=checked]:bg-accent"
            />
            <span className={`font-medium transition-colors ${isAnnual ? 'text-foreground' : 'text-muted-foreground'}`}>
              Anual
            </span>
            <div className="w-[100px]">
              {isAnnual && (
                <motion.span
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="px-3 py-1 bg-secondary/20 border border-secondary/40 rounded-full text-xs font-bold text-secondary whitespace-nowrap"
                >
                  -20% OFF
                </motion.span>
              )}
            </div>
          </div>
        </motion.div>

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-6xl mx-auto mb-16">
          {plans.map((plan, index) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.15 }}
              className={plan.featured ? 'pricing-card-featured' : 'pricing-card'}
            >
              {plan.featured && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1 bg-accent rounded-full text-xs font-semibold text-accent-foreground flex items-center gap-1">
                  <Sparkles className="w-3 h-3" />
                  O Plano Científico
                </div>
              )}

              {plan.badge && (
                <motion.div
                  animate={{ scale: [1, 1.02, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="mb-4 px-3 py-1.5 bg-secondary/20 border border-secondary/40 rounded-lg inline-flex items-center gap-2"
                >
                  <div className="w-2 h-2 bg-secondary rounded-full animate-pulse" />
                  <span className="text-xs font-bold text-secondary">{plan.badge}</span>
                </motion.div>
              )}

              <div className="flex items-center gap-3 mb-4">
                <div className={`w-12 h-12 rounded-xl ${plan.featured ? 'gradient-gold' : 'bg-muted'} flex items-center justify-center`}>
                  <plan.icon className={`w-6 h-6 ${plan.featured ? 'text-background' : 'text-accent'}`} />
                </div>
                <div>
                  <h3 className="font-display text-xl font-bold text-foreground">
                    {plan.name}
                  </h3>
                  <p className="text-sm text-muted-foreground">{plan.subtitle}</p>
                </div>
              </div>

              <div className="mb-4">
                <motion.span
                  key={`${plan.name}-${isAnnual}`}
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="font-display text-4xl font-bold text-foreground"
                >
                  {typeof plan.price === 'number' ? `R$${plan.price}` : plan.price}
                </motion.span>
                <span className="text-muted-foreground">{plan.period}</span>
                {isAnnual && typeof plan.price === 'number' && (
                  <div className="text-xs text-muted-foreground mt-1">
                    <span className="line-through">
                      R${plan.name === 'Basic' ? basePrices.basic : basePrices.business}
                    </span>
                    <span className="text-secondary ml-2">Economia de 20%</span>
                  </div>
                )}
              </div>

              <p className="text-sm text-muted-foreground mb-6">
                {plan.description}
              </p>

              <ul className="space-y-3 mb-8">
                {plan.features.map((feature, i) => {
                  if (typeof feature === 'string') {
                    return (
                      <li key={i} className="flex items-start gap-3">
                        <Check className="w-5 h-5 text-secondary flex-shrink-0 mt-0.5" />
                        <span className="text-sm text-muted-foreground">{feature}</span>
                      </li>
                    );
                  }
                  return (
                    <li key={i} className="bg-muted/30 rounded-lg p-3">
                      <div className="flex items-center gap-2 mb-1">
                        <feature.icon className="w-4 h-4 text-accent" />
                        <span className="text-sm font-medium text-foreground">{feature.text}</span>
                      </div>
                      <p className="text-xs text-muted-foreground pl-6">{feature.detail}</p>
                    </li>
                  );
                })}
              </ul>

              <Button
                variant={plan.variant}
                size="lg"
                className="w-full group"
                onClick={() => handlePurchase(plan.name)}
              >
                {plan.cta}
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Button>
            </motion.div>
          ))}
        </div>

        {/* Consumption Comparison */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="max-w-3xl mx-auto"
        >
          <div className="glass-card p-8">
            <h3 className="font-display text-xl font-semibold text-center mb-6">
              Comparativo de Consumo Energético
            </h3>

            <div className="h-40 mb-6">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={comparisonData} layout="vertical" barCategoryGap="30%">
                  <XAxis type="number" domain={[0, 100]} tick={{ fill: 'hsl(230 20% 60%)', fontSize: 12 }} axisLine={false} tickLine={false} />
                  <YAxis type="category" dataKey="name" tick={{ fill: 'hsl(45 30% 95%)', fontSize: 12 }} axisLine={false} tickLine={false} width={150} />
                  <Bar dataKey="value" radius={[0, 8, 8, 0]} barSize={30}>
                    {comparisonData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.fill} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>

            <div className="grid grid-cols-2 gap-4 text-center">
              <div className="p-4 bg-destructive/10 border border-destructive/30 rounded-lg">
                <div className="text-2xl font-display font-bold text-destructive">100%</div>
                <div className="text-xs text-muted-foreground">Controle por termostato comum</div>
              </div>
              <div className="p-4 bg-secondary/10 border border-secondary/30 rounded-lg">
                <div className="text-2xl font-display font-bold text-secondary">~65%</div>
                <div className="text-xs text-muted-foreground">IA + Sensores de Presença</div>
              </div>
            </div>

            <p className="text-center text-xs text-muted-foreground mt-4">
              Economia de até 35% validada em estudos científicos (2015-2025)
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default PricingSection;

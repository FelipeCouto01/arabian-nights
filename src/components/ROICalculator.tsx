import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Calculator, TrendingDown, Zap, DollarSign, Mail, ArrowRight, CheckCircle2, Loader2 } from 'lucide-react';
import { Slider } from '@/components/ui/slider';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer, Cell, Tooltip, Legend } from 'recharts';
import { supabase } from '@/lib/supabaseClient';
import { toast } from 'sonner';

const ROICalculator = () => {
  const [monthlyBill, setMonthlyBill] = useState([1500]);
  const [animatedSavings, setAnimatedSavings] = useState(0);
  const [email, setEmail] = useState('');
  const [showEmailCapture, setShowEmailCapture] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Logic based on research: 40% of bill is HVAC, 30% reduction with AI
  const hvacCost = monthlyBill[0] * 0.4;
  const savings = hvacCost * 0.3;
  const annualSavings = savings * 12;
  const newCost = monthlyBill[0] - savings;

  // Chart data for cost comparison
  const chartData = [
    {
      name: 'Custo Atual',
      value: monthlyBill[0],
      fill: 'hsl(0 84% 60%)',
      label: `R$ ${monthlyBill[0].toLocaleString('pt-BR')}`
    },
    {
      name: 'Com Arabian Nights',
      value: Math.round(newCost),
      fill: 'hsl(160 84% 45%)',
      label: `R$ ${Math.round(newCost).toLocaleString('pt-BR')}`
    },
  ];

  // Animate the savings counter when results are shown
  useEffect(() => {
    if (!showResults) return;

    const duration = 1000;
    const steps = 60;
    const increment = annualSavings / steps;
    let current = 0;
    let step = 0;

    const timer = setInterval(() => {
      step++;
      current += increment;
      setAnimatedSavings(Math.round(current));

      if (step >= steps) {
        setAnimatedSavings(Math.round(annualSavings));
        clearInterval(timer);
      }
    }, duration / steps);

    return () => clearInterval(timer);
  }, [annualSavings, showResults]);

  const handleCalculateClick = () => {
    setShowEmailCapture(true);
  };

  const handleEmailSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email || !email.includes('@')) {
      toast.error('Por favor, insira um email válido');
      return;
    }

    setIsSubmitting(true);

    try {
      // Save lead to Supabase
      const { error } = await supabase.from('leads').insert({
        email,
        current_bill: monthlyBill[0],
        savings_estimation: annualSavings, // User's schema uses savings_estimation
      });

      if (error) {
        console.error('Error saving lead:', error);
        // Still show results even if there's a Supabase error (maybe not configured yet)
        toast.warning('Não foi possível salvar. Configure o Supabase.');
      } else {
        toast.success('🎉 Análise personalizada enviada para seu email!', {
          description: 'Confira seu resultado abaixo.',
          duration: 5000,
        });
      }

      setShowEmailCapture(false);
      setShowResults(true);
    } catch (err) {
      console.error('Unexpected error:', err);
      // Show results anyway for demo purposes
      setShowEmailCapture(false);
      setShowResults(true);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleReset = () => {
    setShowResults(false);
    setShowEmailCapture(false);
    setEmail('');
    setAnimatedSavings(0);
  };

  return (
    <section id="calculadora" className="py-24 relative">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-muted/10 to-background" />

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
            Calculadora de Economia
          </span>
          <h2 className="font-display text-3xl md:text-4xl font-bold mt-4 mb-6">
            Calcule Seu <span className="text-gradient-gold">Retorno sobre Investimento</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Descubra quanto você pode economizar por ano com a automação inteligente Arabian Nights.
          </p>
        </motion.div>

        {/* Calculator Card */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="max-w-3xl mx-auto"
        >
          <div className="glass-card-emerald p-8 md:p-12">
            {/* Input Section */}
            <div className="mb-10">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-lg gradient-gold flex items-center justify-center">
                  <DollarSign className="w-5 h-5 text-background" />
                </div>
                <div>
                  <h3 className="font-display font-semibold text-foreground">
                    Gasto Mensal de Energia
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    Arraste o slider para ajustar
                  </p>
                </div>
              </div>

              <div className="space-y-4">
                <Slider
                  value={monthlyBill}
                  onValueChange={(value) => {
                    setMonthlyBill(value);
                    if (showResults) handleReset();
                  }}
                  min={500}
                  max={10000}
                  step={100}
                  className="w-full"
                />
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">R$ 500</span>
                  <span className="text-2xl font-display font-bold text-accent">
                    R$ {monthlyBill[0].toLocaleString('pt-BR')}
                  </span>
                  <span className="text-muted-foreground">R$ 10.000</span>
                </div>
              </div>
            </div>

            {/* Calculation Breakdown */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-10">
              <motion.div
                className="bg-muted/30 rounded-xl p-4 text-center"
                whileHover={{ scale: 1.02 }}
                transition={{ type: 'spring', stiffness: 300 }}
              >
                <Zap className="w-6 h-6 text-amber-500 mx-auto mb-2" />
                <div className="text-sm text-muted-foreground mb-1">Custo HVAC (40%)</div>
                <div className="font-display text-xl font-bold text-foreground">
                  R$ {hvacCost.toLocaleString('pt-BR', { maximumFractionDigits: 0 })}
                </div>
              </motion.div>

              <motion.div
                className="bg-muted/30 rounded-xl p-4 text-center"
                whileHover={{ scale: 1.02 }}
                transition={{ type: 'spring', stiffness: 300 }}
              >
                <TrendingDown className="w-6 h-6 text-secondary mx-auto mb-2" />
                <div className="text-sm text-muted-foreground mb-1">Redução IA (30%)</div>
                <div className="font-display text-xl font-bold text-secondary">
                  R$ {savings.toLocaleString('pt-BR', { maximumFractionDigits: 0 })}/mês
                </div>
              </motion.div>

              <motion.div
                className="bg-muted/30 rounded-xl p-4 text-center"
                whileHover={{ scale: 1.02 }}
                transition={{ type: 'spring', stiffness: 300 }}
              >
                <Calculator className="w-6 h-6 text-accent mx-auto mb-2" />
                <div className="text-sm text-muted-foreground mb-1">Payback Médio</div>
                <div className="font-display text-xl font-bold text-accent">
                  ~12 meses
                </div>
              </motion.div>
            </div>

            {/* CTA Button / Email Capture / Results */}
            <AnimatePresence mode="wait">
              {!showEmailCapture && !showResults && (
                <motion.div
                  key="cta"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className="text-center"
                >
                  <Button
                    variant="hero"
                    size="xl"
                    className="group"
                    onClick={handleCalculateClick}
                  >
                    Ver Minha Economia
                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </Button>
                  <p className="text-xs text-muted-foreground mt-3">
                    Receba uma análise personalizada no seu email
                  </p>
                </motion.div>
              )}

              {showEmailCapture && (
                <motion.div
                  key="email"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  className="bg-gradient-to-br from-accent/10 to-accent/5 rounded-2xl border border-accent/30 p-6"
                >
                  <div className="text-center mb-4">
                    <Mail className="w-10 h-10 text-accent mx-auto mb-3" />
                    <h4 className="font-display text-lg font-semibold text-foreground">
                      Quase lá! 🎉
                    </h4>
                    <p className="text-sm text-muted-foreground mt-1">
                      Informe seu email para ver o resultado e receber dicas personalizadas
                    </p>
                  </div>
                  <form onSubmit={handleEmailSubmit} className="flex flex-col sm:flex-row gap-3">
                    <Input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="seu@email.com"
                      required
                      className="flex-1 bg-muted/30 border-accent/30 focus:border-accent text-center sm:text-left"
                    />
                    <Button
                      type="submit"
                      variant="hero"
                      disabled={isSubmitting}
                      className="group"
                    >
                      {isSubmitting ? (
                        <Loader2 className="w-4 h-4 animate-spin" />
                      ) : (
                        <>
                          Ver Resultado
                          <CheckCircle2 className="w-4 h-4 group-hover:scale-110 transition-transform" />
                        </>
                      )}
                    </Button>
                  </form>
                  <button
                    onClick={handleReset}
                    className="text-xs text-muted-foreground hover:text-accent mt-3 block mx-auto transition-colors"
                  >
                    ← Voltar
                  </button>
                </motion.div>
              )}

              {showResults && (
                <motion.div
                  key="results"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className="space-y-8"
                >
                  {/* Chart Comparison */}
                  <div className="bg-muted/20 rounded-2xl p-6">
                    <h4 className="font-display text-lg font-semibold text-center mb-6">
                      Comparativo de Custo Mensal
                    </h4>
                    <div className="h-48">
                      <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={chartData} layout="vertical" barCategoryGap="30%">
                          <XAxis
                            type="number"
                            domain={[0, monthlyBill[0] * 1.1]}
                            tick={{ fill: 'hsl(230 20% 60%)', fontSize: 12 }}
                            axisLine={false}
                            tickLine={false}
                            tickFormatter={(value) => `R$ ${value.toLocaleString('pt-BR')}`}
                          />
                          <YAxis
                            type="category"
                            dataKey="name"
                            tick={{ fill: 'hsl(45 30% 95%)', fontSize: 12 }}
                            axisLine={false}
                            tickLine={false}
                            width={140}
                          />
                          <Tooltip
                            formatter={(value: number) => [`R$ ${value.toLocaleString('pt-BR')}`, 'Custo']}
                            contentStyle={{
                              backgroundColor: 'hsl(230 45% 12%)',
                              border: '1px solid hsl(230 30% 18%)',
                              borderRadius: '8px',
                            }}
                            labelStyle={{ color: 'hsl(45 30% 95%)' }}
                          />
                          <Bar dataKey="value" radius={[0, 8, 8, 0]} barSize={40}>
                            {chartData.map((entry, index) => (
                              <Cell key={`cell-${index}`} fill={entry.fill} />
                            ))}
                          </Bar>
                        </BarChart>
                      </ResponsiveContainer>
                    </div>
                    <div className="grid grid-cols-2 gap-4 mt-6">
                      <div className="text-center p-3 bg-destructive/10 border border-destructive/30 rounded-xl">
                        <div className="text-lg font-display font-bold text-destructive">
                          R$ {monthlyBill[0].toLocaleString('pt-BR')}
                        </div>
                        <div className="text-xs text-muted-foreground">Custo Atual</div>
                      </div>
                      <div className="text-center p-3 bg-secondary/10 border border-secondary/30 rounded-xl">
                        <div className="text-lg font-display font-bold text-secondary">
                          R$ {Math.round(newCost).toLocaleString('pt-BR')}
                        </div>
                        <div className="text-xs text-muted-foreground">Com Arabian Nights</div>
                      </div>
                    </div>
                  </div>

                  {/* Annual Savings Result */}
                  <motion.div
                    className="text-center p-8 bg-gradient-to-br from-secondary/10 to-secondary/5 rounded-2xl border border-secondary/30"
                    animate={{ boxShadow: ['0 0 0 0 rgba(16, 185, 129, 0)', '0 0 30px 10px rgba(16, 185, 129, 0.1)', '0 0 0 0 rgba(16, 185, 129, 0)'] }}
                    transition={{ duration: 3, repeat: Infinity }}
                  >
                    <div className="text-sm text-muted-foreground mb-2 uppercase tracking-wider">
                      Economia Estimada Anual
                    </div>
                    <div className="roi-counter mb-2">
                      R$ {animatedSavings.toLocaleString('pt-BR')}
                    </div>
                    <div className="text-secondary font-medium">
                      Com a inteligência Arabian Nights
                    </div>
                  </motion.div>

                  {/* Reset Button */}
                  <div className="text-center">
                    <Button variant="outline" onClick={handleReset}>
                      Recalcular
                    </Button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Methodology Note */}
            <div className="mt-6 p-4 bg-muted/20 rounded-lg">
              <p className="text-xs text-muted-foreground text-center">
                <strong>Metodologia:</strong> Baseado em pesquisa científica que indica que 35-50% do consumo
                energético de edifícios é destinado ao HVAC. Com IA preditiva e sensores de ocupação,
                é possível reduzir entre 20-40% deste custo mantendo conforto térmico ASHRAE 55.
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default ROICalculator;

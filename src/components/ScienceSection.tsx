import { motion } from 'framer-motion';
import { Users, Thermometer, BrainCircuit, Zap, Cpu, Wifi, Shield, BarChart3 } from 'lucide-react';

const ScienceSection = () => {
  const scienceCards = [
    {
      icon: Users,
      title: 'Monitoramento de Ocupação via CO₂ e PIR',
      description: 'Não apenas sensores de movimento. Utilizamos sensores de CO₂ para estimar a densidade de pessoas em tempo real. Se a sala esvazia, o sistema reduz o fluxo de ar instantaneamente, evitando desperdício em áreas subutilizadas.',
      gradient: 'from-secondary to-emerald-light',
    },
    {
      icon: Thermometer,
      title: 'Conforto Térmico (Norma ASHRAE 55)',
      description: 'Nossa IA não foca apenas na temperatura bruta. Calculamos o índice PMV (Predicted Mean Vote) cruzando dados de temperatura, umidade e velocidade do ar, garantindo que 80% dos usuários estejam em conforto térmico ideal.',
      gradient: 'from-accent to-gold-light',
    },
    {
      icon: BrainCircuit,
      title: 'Algoritmos Preditivos (MPC & DRL)',
      description: 'Implementamos Model Predictive Control (MPC) e Deep Reinforcement Learning. O sistema aprende a inércia térmica do seu edifício e antecipa o resfriamento antes de picos de calor, otimizando o ciclo do compressor.',
      gradient: 'from-primary to-blue-400',
    },
    {
      icon: Zap,
      title: 'Conectividade de Baixa Latência (MQTT)',
      description: 'Toda a comunicação entre sensores e a central é feita via protocolo MQTT sobre redes ZigBee ou Wi-Fi. Isso garante uma resposta em milissegundos e um consumo de bateria mínimo para os dispositivos IoT.',
      gradient: 'from-amber-500 to-orange-400',
    },
  ];

  const techDetails = [
    {
      icon: Cpu,
      title: 'Sensores Integrados',
      items: ['DHT22 (Temp/Umidade)', 'PIR (Presença)', 'MQ-135 (CO₂)'],
      description: 'Conectados via ESP32 e protocolo MQTT para máxima eficiência',
    },
    {
      icon: BrainCircuit,
      title: 'Algoritmo Preditivo',
      items: ['Deep Reinforcement Learning', 'Model Predictive Control', 'LSTM Neural Networks'],
      description: 'Antecipa carga térmica antes mesmo das pessoas entrarem no ambiente',
    },
    {
      icon: Shield,
      title: 'Conformidade ASHRAE 55',
      items: ['PMV: -0.5 a +0.5', 'PPD < 10%', 'Conforto 80%+'],
      description: 'Manutenção automatizada do índice PMV para produtividade máxima',
    },
  ];

  return (
    <section id="ciencia" className="py-24 bg-muted/10">
      <div className="section-container">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="text-sm font-semibold text-secondary uppercase tracking-wider">
            Embasamento Científico
          </span>
          <h2 className="font-display text-3xl md:text-4xl font-bold mt-4 mb-6">
            A Ciência por Trás da{' '}
            <span className="text-gradient-gold">Eficiência</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Tecnologia baseada em 141 estudos científicos revisados por pares, 
            cobrindo o período de 2015-2025 em automação inteligente de HVAC.
          </p>
        </motion.div>

        {/* Science Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          {scienceCards.map((card, index) => (
            <motion.div
              key={card.title}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="feature-card group"
            >
              <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${card.gradient} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform shadow-lg`}>
                <card.icon className="w-8 h-8 text-white" />
              </div>
              <h3 className="font-display text-xl font-semibold mb-3 text-foreground">
                {card.title}
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                {card.description}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Technical Details */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="glass-card-emerald p-8 md:p-12"
        >
          <div className="flex items-center gap-3 mb-8">
            <div className="w-12 h-12 rounded-xl gradient-gold flex items-center justify-center">
              <BarChart3 className="w-6 h-6 text-background" />
            </div>
            <div>
              <h3 className="font-display text-xl font-bold text-foreground">
                Detalhes Técnicos do Sistema
              </h3>
              <p className="text-sm text-muted-foreground">
                Hardware IoT + Algoritmos de IA + Padrões Internacionais
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {techDetails.map((detail, index) => (
              <motion.div
                key={detail.title}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                className="bg-muted/30 rounded-xl p-6"
              >
                <div className="w-10 h-10 rounded-lg bg-secondary/20 flex items-center justify-center mb-4">
                  <detail.icon className="w-5 h-5 text-secondary" />
                </div>
                <h4 className="font-display font-semibold text-foreground mb-3">
                  {detail.title}
                </h4>
                <ul className="space-y-2 mb-4">
                  {detail.items.map((item) => (
                    <li key={item} className="flex items-center gap-2 text-sm">
                      <div className="w-1.5 h-1.5 rounded-full bg-accent" />
                      <span className="text-muted-foreground">{item}</span>
                    </li>
                  ))}
                </ul>
                <p className="text-xs text-muted-foreground border-t border-border/30 pt-3">
                  {detail.description}
                </p>
              </motion.div>
            ))}
          </div>

          {/* Research Badge */}
          <div className="mt-8 flex justify-center">
            <div className="px-6 py-3 bg-accent/10 border border-accent/30 rounded-full flex items-center gap-2">
              <Wifi className="w-4 h-4 text-accent" />
              <span className="text-sm text-accent font-medium">
                Mapeamento Sistemático: 141 estudos | 5 bases de dados | 2015-2025
              </span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default ScienceSection;

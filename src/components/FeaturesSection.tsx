import { motion } from 'framer-motion';
import { Users, Cpu, Microchip, Wifi } from 'lucide-react';

const FeaturesSection = () => {
  const features = [
    {
      icon: Users,
      title: 'Controle por Ocupação',
      description: 'Sensores PIR e CO₂ detectam presença e densidade de pessoas em tempo real, ajustando automaticamente o sistema HVAC.',
      gradient: 'from-secondary to-emerald-light',
    },
    {
      icon: Cpu,
      title: 'Deep Learning (LSTM & CNN)',
      description: 'Algoritmos de predição de carga térmica que aprendem padrões de uso e antecipam necessidades de climatização.',
      gradient: 'from-primary to-blue-400',
    },
    {
      icon: Microchip,
      title: 'Hardware Acessível',
      description: 'Integração nativa com ESP32 e Arduino. Solução de baixo custo que democratiza a automação inteligente.',
      gradient: 'from-accent to-gold-light',
    },
    {
      icon: Wifi,
      title: 'Protocolos Industriais',
      description: 'MQTT e ZigBee para comunicação de baixa latência. Resposta em milissegundos com consumo mínimo de energia.',
      gradient: 'from-amber-500 to-orange-400',
    },
  ];

  return (
    <section id="tecnologia" className="py-24 relative">
      {/* Background decoration */}
      <div className="absolute inset-0 bg-hero-pattern opacity-50" />
      
      <div className="section-container relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="text-sm font-semibold text-accent uppercase tracking-wider">
            Tecnologia IoT & IA
          </span>
          <h2 className="font-display text-3xl md:text-4xl font-bold mt-4 mb-6">
            Infraestrutura Inteligente para{' '}
            <span className="text-gradient-gold">Edifícios Modernos</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Nossa plataforma combina sensores de última geração com algoritmos de IA 
            para otimizar o consumo energético sem comprometer o conforto.
          </p>
        </motion.div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="feature-card group"
            >
              <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${feature.gradient} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform shadow-lg`}>
                <feature.icon className="w-8 h-8 text-white" />
              </div>
              <h3 className="font-display text-xl font-semibold mb-3 text-foreground">
                {feature.title}
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;

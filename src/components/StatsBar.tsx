import { motion } from 'framer-motion';
import { TrendingDown, Thermometer, Building } from 'lucide-react';

const StatsBar = () => {
  const stats = [
    {
      icon: TrendingDown,
      value: '35-50%',
      label: 'do gasto de energia global em edifícios vem do HVAC',
      color: 'text-destructive',
    },
    {
      icon: Thermometer,
      value: '>80%',
      label: 'conforto térmico garantido (norma ASHRAE 55)',
      color: 'text-secondary',
    },
    {
      icon: Building,
      value: '2.5x',
      label: 'ROI médio em 18 meses para edifícios comerciais',
      color: 'text-primary',
    },
  ];

  return (
    <section className="py-12 bg-muted/30 border-y border-border/30">
      <div className="section-container">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="flex items-center gap-4 justify-center text-center md:text-left"
            >
              <div className={`w-12 h-12 rounded-xl bg-muted flex items-center justify-center ${stat.color}`}>
                <stat.icon className="w-6 h-6" />
              </div>
              <div>
                <div className={`font-display text-2xl font-bold ${stat.color}`}>
                  {stat.value}
                </div>
                <div className="text-sm text-muted-foreground max-w-xs">
                  {stat.label}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default StatsBar;

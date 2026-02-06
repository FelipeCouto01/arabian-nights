import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  Thermometer, 
  Users, 
  Wind, 
  Droplets, 
  Zap,
  Cpu,
  Wifi,
  AlertTriangle,
  Leaf
} from 'lucide-react';
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  ResponsiveContainer, 
  Tooltip,
  Legend
} from 'recharts';

interface RoomData {
  id: string;
  name: string;
  temperature: number;
  humidity: number;
  co2: number;
  occupied: boolean;
  powerConsumption: number;
  isEcoMode: boolean;
  isAirRenewal: boolean;
}

const DigitalTwinSimulation = () => {
  const [rooms, setRooms] = useState<RoomData[]>([
    { id: 'meeting', name: 'Sala de Reunião', temperature: 23, humidity: 55, co2: 650, occupied: true, powerConsumption: 850, isEcoMode: false, isAirRenewal: false },
    { id: 'office', name: 'Escritório Aberto', temperature: 24, humidity: 52, co2: 720, occupied: true, powerConsumption: 1200, isEcoMode: false, isAirRenewal: false },
    { id: 'datacenter', name: 'Data Center', temperature: 18, humidity: 45, co2: 400, occupied: false, powerConsumption: 2100, isEcoMode: false, isAirRenewal: false },
  ]);

  const [energyHistory, setEnergyHistory] = useState([
    { time: '08:00', conventional: 4500, arabian: 3200 },
    { time: '09:00', conventional: 5200, arabian: 3400 },
    { time: '10:00', conventional: 5800, arabian: 3600 },
    { time: '11:00', conventional: 6200, arabian: 3800 },
    { time: '12:00', conventional: 5500, arabian: 3500 },
    { time: '13:00', conventional: 5000, arabian: 3200 },
    { time: '14:00', conventional: 6000, arabian: 3700 },
    { time: '15:00', conventional: 6500, arabian: 4000 },
  ]);

  // Simulate real-time data updates
  useEffect(() => {
    const interval = setInterval(() => {
      setRooms(prevRooms => prevRooms.map(room => {
        // Random variations
        const tempChange = (Math.random() - 0.5) * 1;
        const humidityChange = (Math.random() - 0.5) * 3;
        const co2Change = (Math.random() - 0.5) * 50;
        const occupancyChange = Math.random() > 0.9;

        const newCo2 = Math.max(350, Math.min(1000, room.co2 + co2Change));
        const newOccupied = occupancyChange ? !room.occupied : room.occupied;
        
        // AI Logic: Eco Mode when unoccupied
        const isEcoMode = !newOccupied;
        const targetTemp = isEcoMode ? 26 : room.id === 'datacenter' ? 18 : 23;
        
        // AI Logic: Increase air renewal when CO2 > 800ppm
        const isAirRenewal = newCo2 > 800;

        // Calculate power based on AI optimizations
        let basePower = room.id === 'datacenter' ? 2000 : room.id === 'office' ? 1100 : 800;
        if (isEcoMode) basePower *= 0.6;
        if (isAirRenewal) basePower *= 1.15;
        
        return {
          ...room,
          temperature: Math.round((room.temperature + (targetTemp - room.temperature) * 0.1 + tempChange) * 10) / 10,
          humidity: Math.max(30, Math.min(70, Math.round(room.humidity + humidityChange))),
          co2: Math.round(newCo2),
          occupied: newOccupied,
          powerConsumption: Math.round(basePower + (Math.random() - 0.5) * 100),
          isEcoMode,
          isAirRenewal,
        };
      }));

      // Update energy history
      setEnergyHistory(prev => {
        const newEntry = {
          time: new Date().toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' }),
          conventional: Math.round(5000 + Math.random() * 2000),
          arabian: Math.round(3200 + Math.random() * 1000),
        };
        return [...prev.slice(-7), newEntry];
      });
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  const getSensorIcon = (type: string) => {
    switch (type) {
      case 'pir': return Users;
      case 'dht22': return Thermometer;
      case 'mq135': return Wind;
      default: return Cpu;
    }
  };

  return (
    <section id="simulacao" className="py-24 relative">
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
          <span className="text-sm font-semibold text-secondary uppercase tracking-wider">
            Simulação em Tempo Real
          </span>
          <h2 className="font-display text-3xl md:text-4xl font-bold mt-4 mb-6">
            HVAC <span className="text-gradient-gold">Digital Twin</span> Simulation
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Visualize como nossa IA otimiza o consumo energético em tempo real.
            Observe os sensores, a lógica de controle e a economia gerada.
          </p>
        </motion.div>

        {/* Simulation Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-12">
          {rooms.map((room, index) => (
            <motion.div
              key={room.id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className={`room-card ${room.isEcoMode ? 'eco-mode' : ''} ${room.isAirRenewal ? 'alert-mode' : ''}`}
            >
              {/* Room Header */}
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-display font-semibold text-foreground">{room.name}</h3>
                <div className="flex items-center gap-2">
                  {room.isEcoMode && (
                    <motion.div 
                      animate={{ scale: [1, 1.1, 1] }}
                      transition={{ duration: 1, repeat: Infinity }}
                      className="px-2 py-1 bg-secondary/20 border border-secondary/40 rounded-full flex items-center gap-1"
                    >
                      <Leaf className="w-3 h-3 text-secondary" />
                      <span className="text-xs text-secondary font-medium">Eco</span>
                    </motion.div>
                  )}
                  {room.isAirRenewal && (
                    <motion.div 
                      animate={{ scale: [1, 1.1, 1] }}
                      transition={{ duration: 0.5, repeat: Infinity }}
                      className="px-2 py-1 bg-amber-500/20 border border-amber-500/40 rounded-full flex items-center gap-1"
                    >
                      <AlertTriangle className="w-3 h-3 text-amber-500" />
                      <span className="text-xs text-amber-500 font-medium">CO₂</span>
                    </motion.div>
                  )}
                </div>
              </div>

              {/* Sensors Grid */}
              <div className="grid grid-cols-2 gap-3 mb-4">
                <div className="bg-muted/40 rounded-lg p-3">
                  <div className="flex items-center gap-2 mb-1">
                    <Thermometer className="w-4 h-4 text-accent" />
                    <span className="text-xs text-muted-foreground">Temp</span>
                  </div>
                  <div className="font-display text-xl font-bold text-foreground">
                    {room.temperature}°C
                  </div>
                </div>
                
                <div className="bg-muted/40 rounded-lg p-3">
                  <div className="flex items-center gap-2 mb-1">
                    <Droplets className="w-4 h-4 text-primary" />
                    <span className="text-xs text-muted-foreground">Umidade</span>
                  </div>
                  <div className="font-display text-xl font-bold text-foreground">
                    {room.humidity}%
                  </div>
                </div>
                
                <div className={`bg-muted/40 rounded-lg p-3 ${room.co2 > 800 ? 'border border-amber-500/50' : ''}`}>
                  <div className="flex items-center gap-2 mb-1">
                    <Wind className={`w-4 h-4 ${room.co2 > 800 ? 'text-amber-500' : 'text-secondary'}`} />
                    <span className="text-xs text-muted-foreground">CO₂</span>
                  </div>
                  <div className={`font-display text-xl font-bold ${room.co2 > 800 ? 'text-amber-500' : 'text-foreground'}`}>
                    {room.co2} ppm
                  </div>
                </div>
                
                <div className="bg-muted/40 rounded-lg p-3">
                  <div className="flex items-center gap-2 mb-1">
                    <Users className={`w-4 h-4 ${room.occupied ? 'text-secondary' : 'text-muted-foreground'}`} />
                    <span className="text-xs text-muted-foreground">Ocupação</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <motion.div 
                      className={`w-3 h-3 rounded-full ${room.occupied ? 'bg-secondary sensor-pulse' : 'bg-muted-foreground'}`}
                    />
                    <span className={`text-sm font-medium ${room.occupied ? 'text-secondary' : 'text-muted-foreground'}`}>
                      {room.occupied ? 'Detectado' : 'Vazio'}
                    </span>
                  </div>
                </div>
              </div>

              {/* Power Consumption */}
              <div className="bg-muted/30 rounded-lg p-3 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Zap className="w-5 h-5 text-accent" />
                  <span className="text-sm text-muted-foreground">Consumo Atual</span>
                </div>
                <div className="font-display text-lg font-bold text-accent">
                  {room.powerConsumption} W
                </div>
              </div>

              {/* Sensor Legend */}
              <div className="mt-4 pt-4 border-t border-border/30">
                <div className="flex items-center gap-4 text-xs text-muted-foreground">
                  <div className="flex items-center gap-1">
                    <Wifi className="w-3 h-3 text-secondary" />
                    <span>MQTT</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Cpu className="w-3 h-3 text-primary" />
                    <span>ESP32</span>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Energy Comparison Chart */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="glass-card-emerald p-6 md:p-8"
        >
          <h3 className="font-display text-xl font-semibold text-foreground mb-2">
            Consumo Convencional vs <span className="text-gradient-gold">Arabian Nights (IA)</span>
          </h3>
          <p className="text-sm text-muted-foreground mb-6">
            Comparação em tempo real do consumo energético (Watts)
          </p>
          
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={energyHistory}>
                <XAxis 
                  dataKey="time" 
                  axisLine={false} 
                  tickLine={false}
                  tick={{ fill: 'hsl(230 20% 60%)', fontSize: 12 }}
                />
                <YAxis 
                  axisLine={false} 
                  tickLine={false}
                  tick={{ fill: 'hsl(230 20% 60%)', fontSize: 12 }}
                />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: 'hsl(230 45% 10%)', 
                    border: '1px solid hsl(230 30% 20%)',
                    borderRadius: '8px'
                  }}
                  labelStyle={{ color: 'hsl(45 30% 95%)' }}
                />
                <Legend />
                <Line 
                  type="monotone" 
                  dataKey="conventional" 
                  name="Convencional"
                  stroke="hsl(0 84% 60%)" 
                  strokeWidth={2}
                  dot={false}
                />
                <Line 
                  type="monotone" 
                  dataKey="arabian" 
                  name="Arabian Nights (IA)"
                  stroke="hsl(160 84% 45%)" 
                  strokeWidth={3}
                  dot={false}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>

          {/* Savings Badge */}
          <div className="mt-6 flex justify-center">
            <motion.div 
              animate={{ scale: [1, 1.02, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="px-6 py-3 bg-secondary/10 border border-secondary/40 rounded-full"
            >
              <span className="text-secondary font-display font-bold text-lg">
                ~35% de Economia em Tempo Real
              </span>
            </motion.div>
          </div>
        </motion.div>

        {/* Technical Info */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
          {[
            { 
              icon: Cpu, 
              title: 'Sensores DHT22 + PIR + MQ-135',
              desc: 'Temperatura, umidade, presença e CO₂ via ESP32'
            },
            { 
              icon: Wifi, 
              title: 'Protocolo MQTT',
              desc: 'Comunicação de baixa latência em milissegundos'
            },
            { 
              icon: Zap, 
              title: 'Deep Reinforcement Learning',
              desc: 'IA antecipa carga térmica antes das pessoas entrarem'
            },
          ].map((item, index) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              className="flex items-start gap-4 p-4 bg-muted/20 rounded-xl"
            >
              <div className="w-10 h-10 rounded-lg bg-secondary/20 flex items-center justify-center flex-shrink-0">
                <item.icon className="w-5 h-5 text-secondary" />
              </div>
              <div>
                <h4 className="font-medium text-foreground text-sm">{item.title}</h4>
                <p className="text-xs text-muted-foreground mt-1">{item.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default DigitalTwinSimulation;

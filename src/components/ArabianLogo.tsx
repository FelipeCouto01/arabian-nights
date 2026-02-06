import { motion } from 'framer-motion';

interface ArabianLogoProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg';
}

const ArabianLogo = ({ className = '', size = 'md' }: ArabianLogoProps) => {
  const sizes = {
    sm: { icon: 32, text: 'text-lg' },
    md: { icon: 40, text: 'text-xl' },
    lg: { icon: 56, text: 'text-3xl' },
  };

  const { icon, text } = sizes[size];

  return (
    <div className={`flex items-center gap-3 ${className}`}>
      {/* Logo Icon - Crescent Moon with Circuit */}
      <motion.div
        whileHover={{ scale: 1.05 }}
        className="relative"
        style={{ width: icon, height: icon }}
      >
        <svg
          viewBox="0 0 48 48"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-full"
        >
          {/* Outer glow */}
          <defs>
            <linearGradient id="moonGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="hsl(43 96% 56%)" />
              <stop offset="100%" stopColor="hsl(35 92% 50%)" />
            </linearGradient>
            <linearGradient id="circuitGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="hsl(160 84% 45%)" />
              <stop offset="100%" stopColor="hsl(158 64% 55%)" />
            </linearGradient>
            <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
              <feGaussianBlur stdDeviation="2" result="coloredBlur" />
              <feMerge>
                <feMergeNode in="coloredBlur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>

          {/* Background circle */}
          <circle cx="24" cy="24" r="22" fill="hsl(230 45% 12%)" stroke="hsl(230 30% 25%)" strokeWidth="1" />

          {/* Crescent Moon */}
          <path
            d="M28 8C20 8 14 15 14 24C14 33 20 40 28 40C22 38 18 31 18 24C18 17 22 10 28 8Z"
            fill="url(#moonGradient)"
            filter="url(#glow)"
          />

          {/* Circuit lines */}
          <g stroke="url(#circuitGradient)" strokeWidth="1.5" strokeLinecap="round">
            {/* Horizontal line */}
            <line x1="28" y1="24" x2="38" y2="24" />
            {/* Vertical line up */}
            <line x1="32" y1="24" x2="32" y2="16" />
            {/* Vertical line down */}
            <line x1="35" y1="24" x2="35" y2="32" />
            {/* Connection dots */}
            <circle cx="38" cy="24" r="2" fill="url(#circuitGradient)" />
            <circle cx="32" cy="16" r="2" fill="url(#circuitGradient)" />
            <circle cx="35" cy="32" r="2" fill="url(#circuitGradient)" />
          </g>
        </svg>
      </motion.div>

      {/* Text Logo */}
      <div className={`font-display font-bold ${text}`}>
        <span className="text-foreground">Arabian</span>{' '}
        <span className="text-gradient-gold">Nights</span>
      </div>
    </div>
  );
};

export default ArabianLogo;

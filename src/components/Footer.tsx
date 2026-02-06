import { Mail, Phone, MapPin, Linkedin, Twitter, Github, Instagram } from 'lucide-react';
import ArabianLogo from './ArabianLogo';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const links = {
    produto: [
      { label: 'Tecnologia', href: '#tecnologia' },
      { label: 'Planos', href: '#planos' },
      { label: 'Simulação', href: '#simulacao' },
      { label: 'Integrações', href: '#' },
    ],
    empresa: [
      { label: 'Sobre Nós', href: '#' },
      { label: 'Blog', href: '#' },
      { label: 'Carreiras', href: '#' },
      { label: 'Contato', href: '#contato' },
    ],
    suporte: [
      { label: 'Documentação', href: '#' },
      { label: 'API Reference', href: '#' },
      { label: 'Status do Sistema', href: '#' },
      { label: 'FAQ', href: '#' },
    ],
  };

  const socials = [
    { icon: Linkedin, href: '#', label: 'LinkedIn' },
    { icon: Twitter, href: '#', label: 'Twitter' },
    { icon: Github, href: '#', label: 'GitHub' },
    { icon: Instagram, href: '#', label: 'Instagram' },
  ];

  return (
    <footer id="contato" className="bg-card border-t border-border/50">
      <div className="section-container py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12">
          {/* Brand Column */}
          <div className="lg:col-span-2">
            <div className="mb-6">
              <ArabianLogo size="lg" />
            </div>
            <p className="text-muted-foreground mb-6 max-w-sm">
              Automação inteligente de HVAC com IA. Reduza custos, aumente o conforto 
              e contribua para um futuro mais sustentável.
            </p>
            
            {/* Contact Info */}
            <div className="space-y-3 text-sm">
              <a href="mailto:contato@arabiannights.io" className="flex items-center gap-3 text-muted-foreground hover:text-accent transition-colors">
                <Mail className="w-4 h-4" />
                contato@arabiannights.io
              </a>
              <a href="tel:+551199999999" className="flex items-center gap-3 text-muted-foreground hover:text-accent transition-colors">
                <Phone className="w-4 h-4" />
                +55 11 9999-9999
              </a>
              <div className="flex items-center gap-3 text-muted-foreground">
                <MapPin className="w-4 h-4" />
                São Paulo, Brasil
              </div>
            </div>
          </div>

          {/* Links Columns */}
          <div>
            <h4 className="font-display font-semibold text-foreground mb-4">Produto</h4>
            <ul className="space-y-3">
              {links.produto.map((link) => (
                <li key={link.label}>
                  <a href={link.href} className="text-sm text-muted-foreground hover:text-accent transition-colors">
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-display font-semibold text-foreground mb-4">Empresa</h4>
            <ul className="space-y-3">
              {links.empresa.map((link) => (
                <li key={link.label}>
                  <a href={link.href} className="text-sm text-muted-foreground hover:text-accent transition-colors">
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-display font-semibold text-foreground mb-4">Suporte</h4>
            <ul className="space-y-3">
              {links.suporte.map((link) => (
                <li key={link.label}>
                  <a href={link.href} className="text-sm text-muted-foreground hover:text-accent transition-colors">
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-border/50 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <span>© {currentYear} Arabian Nights. Todos os direitos reservados.</span>
            <span className="hidden md:inline">•</span>
            <span className="px-2 py-1 bg-accent/10 border border-accent/30 rounded text-xs text-accent">
              Mapeamento Sistemático 2025
            </span>
          </div>

          {/* Social Links */}
          <div className="flex items-center gap-4">
            {socials.map((social) => (
              <a
                key={social.label}
                href={social.href}
                aria-label={social.label}
                className="w-10 h-10 rounded-lg bg-muted flex items-center justify-center text-muted-foreground hover:text-accent hover:bg-muted/80 transition-all"
              >
                <social.icon className="w-5 h-5" />
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

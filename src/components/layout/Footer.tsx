import Link from 'next/link';
import { Database, Twitter, Linkedin, Facebook, Mail, Phone, MapPin } from 'lucide-react';

export function Footer() {
  return (
    <footer className="border-t bg-muted/50">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          {/* Brand & About */}
          <div className="lg:col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <div className="h-10 w-10 rounded-lg gradient-mali flex items-center justify-center">
                <Database className="h-6 w-6 text-white" />
              </div>
              <span className="font-heading font-bold text-xl">JDOM</span>
            </div>
            <p className="text-sm text-muted-foreground mb-4">
              Jeux de Données Ouverts du Mali - La plateforme nationale de données ouvertes pour l'innovation et la transparence.
            </p>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              Made with <span className="text-red-500">❤️</span> in Mali
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-heading font-semibold mb-4 text-sm uppercase tracking-wider">
              Navigation
            </h3>
            <ul className="space-y-2">
              <li>
                <Link href="/" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  Accueil
                </Link>
              </li>
              <li>
                <Link href="/catalog" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  Catalogue de données
                </Link>
              </li>
              <li>
                <Link href="/organizations" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  Organisations
                </Link>
              </li>
              <li>
                <Link href="/themes" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  Thèmes
                </Link>
              </li>
              <li>
                <Link href="/api" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  API Documentation
                </Link>
              </li>
            </ul>
          </div>

          {/* For Producers */}
          <div>
            <h3 className="font-heading font-semibold mb-4 text-sm uppercase tracking-wider">
              Producteurs
            </h3>
            <ul className="space-y-2">
              <li>
                <Link href="/producer/dashboard" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  Espace producteur
                </Link>
              </li>
              <li>
                <Link href="/guide-publisher" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  Guide de publication
                </Link>
              </li>
              <li>
                <Link href="/quality" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  Standards de qualité
                </Link>
              </li>
              <li>
                <Link href="/licences" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  Licences ouvertes
                </Link>
              </li>
              <li>
                <Link href="/support" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  Support technique
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3 className="font-heading font-semibold mb-4 text-sm uppercase tracking-wider">
              Légal
            </h3>
            <ul className="space-y-2">
              <li>
                <Link href="/terms" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  Conditions d'utilisation
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  Politique de confidentialité
                </Link>
              </li>
              <li>
                <Link href="/cookies" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  Politique de cookies
                </Link>
              </li>
              <li>
                <Link href="/licences" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  Licences des données
                </Link>
              </li>
              <li>
                <Link href="/accessibility" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  Accessibilité
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact & Social */}
          <div>
            <h3 className="font-heading font-semibold mb-4 text-sm uppercase tracking-wider">
              Contact
            </h3>
            <ul className="space-y-3">
              <li className="flex items-start gap-2">
                <Mail className="h-4 w-4 text-muted-foreground mt-0.5" />
                <a 
                  href="mailto:contact@jdom.ml" 
                  className="text-sm text-muted-foreground hover:text-primary transition-colors"
                >
                  contact@jdom.ml
                </a>
              </li>
              <li className="flex items-start gap-2">
                <Phone className="h-4 w-4 text-muted-foreground mt-0.5" />
                <span className="text-sm text-muted-foreground">
                  +223 20 00 00 00
                </span>
              </li>
              <li className="flex items-start gap-2">
                <MapPin className="h-4 w-4 text-muted-foreground mt-0.5" />
                <span className="text-sm text-muted-foreground">
                  Bamako, Mali
                </span>
              </li>
            </ul>

            {/* Social Media */}
            <div className="flex items-center gap-2 mt-6">
              <a 
                href="https://twitter.com/jdom_ml" 
                target="_blank"
                rel="noopener noreferrer"
                className="h-9 w-9 rounded-lg border flex items-center justify-center text-muted-foreground hover:text-primary hover:border-primary transition-colors"
              >
                <Twitter className="h-4 w-4" />
              </a>
              <a 
                href="https://linkedin.com/company/jdom" 
                target="_blank"
                rel="noopener noreferrer"
                className="h-9 w-9 rounded-lg border flex items-center justify-center text-muted-foreground hover:text-primary hover:border-primary transition-colors"
              >
                <Linkedin className="h-4 w-4" />
              </a>
              <a 
                href="https://facebook.com/jdom" 
                target="_blank"
                rel="noopener noreferrer"
                className="h-9 w-9 rounded-lg border flex items-center justify-center text-muted-foreground hover:text-primary hover:border-primary transition-colors"
              >
                <Facebook className="h-4 w-4" />
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-sm text-muted-foreground">
              © {new Date().getFullYear()} JDOM - Jeux de Données Ouverts du Mali. Tous droits réservés.
            </p>
            <div className="flex items-center gap-4 text-sm text-muted-foreground">
              <span>Plateforme propulsée par le Gouvernement du Mali</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

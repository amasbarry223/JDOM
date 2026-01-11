'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { 
  Database, 
  Target, 
  Users, 
  Globe,
  Shield,
  ArrowRight,
  CheckCircle,
  BarChart3,
  FileText,
  Download,
  Eye,
  Building2,
  Heart,
  Award
} from 'lucide-react';

export default function AboutPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1">
        {/* Hero Section */}
        <section className="py-20 bg-gradient-to-b from-primary/10 via-background to-background">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <Badge className="mb-4" variant="secondary">
                À propos de JDOM
              </Badge>
              <h1 className="font-heading font-bold text-4xl md:text-5xl mb-6">
                Jeux de Données Ouvertes du Mali
              </h1>
              <p className="text-xl text-muted-foreground mb-8">
                La plateforme nationale pour l'accès, le partage et la réutilisation des données publiques du Mali
              </p>
            </div>
          </div>
        </section>

        {/* Mission Section */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <div className="text-center mb-12">
                <Target className="h-12 w-12 mx-auto mb-4 text-primary" />
                <h2 className="font-heading font-bold text-3xl mb-4">Notre Mission</h2>
                <p className="text-lg text-muted-foreground">
                  Promouvoir la transparence, l'innovation et la participation citoyenne 
                  en rendant les données publiques accessibles à tous.
                </p>
              </div>

              <div className="grid md:grid-cols-3 gap-6">
                <Card>
                  <CardContent className="p-6 text-center">
                    <Eye className="h-10 w-10 mx-auto mb-4 text-primary" />
                    <h3 className="font-semibold text-lg mb-2">Transparence</h3>
                    <p className="text-sm text-muted-foreground">
                      Rendre l'action publique visible et compréhensible par tous
                    </p>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-6 text-center">
                    <BarChart3 className="h-10 w-10 mx-auto mb-4 text-primary" />
                    <h3 className="font-semibold text-lg mb-2">Innovation</h3>
                    <p className="text-sm text-muted-foreground">
                      Stimuler la création de services et d'applications innovants
                    </p>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-6 text-center">
                    <Users className="h-10 w-10 mx-auto mb-4 text-primary" />
                    <h3 className="font-semibold text-lg mb-2">Participation</h3>
                    <p className="text-sm text-muted-foreground">
                      Encourager l'engagement citoyen dans la vie publique
                    </p>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>

        {/* Values Section */}
        <section className="py-16 bg-muted/50">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <div className="text-center mb-12">
                <Heart className="h-12 w-12 mx-auto mb-4 text-primary" />
                <h2 className="font-heading font-bold text-3xl mb-4">Nos Valeurs</h2>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <Card>
                  <CardContent className="p-6">
                    <div className="flex items-start gap-4">
                      <div className="p-3 bg-primary/10 rounded-lg">
                        <Globe className="h-6 w-6 text-primary" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-lg mb-2">Accessibilité</h3>
                        <p className="text-sm text-muted-foreground">
                          Des données disponibles gratuitement, dans des formats ouverts et réutilisables, 
                          accessibles à tous sans restriction technique ou juridique.
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="p-6">
                    <div className="flex items-start gap-4">
                      <div className="p-3 bg-primary/10 rounded-lg">
                        <Shield className="h-6 w-6 text-primary" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-lg mb-2">Qualité</h3>
                        <p className="text-sm text-muted-foreground">
                          Des données fiables, à jour, documentées et validées par les institutions publiques 
                          qui les produisent.
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="p-6">
                    <div className="flex items-start gap-4">
                      <div className="p-3 bg-primary/10 rounded-lg">
                        <FileText className="h-6 w-6 text-primary" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-lg mb-2">Documentation</h3>
                        <p className="text-sm text-muted-foreground">
                          Chaque jeu de données est accompagné de métadonnées complètes, 
                          d'une description claire et d'informations sur sa provenance.
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="p-6">
                    <div className="flex items-start gap-4">
                      <div className="p-3 bg-primary/10 rounded-lg">
                        <Download className="h-6 w-6 text-primary" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-lg mb-2">Réutilisabilité</h3>
                        <p className="text-sm text-muted-foreground">
                          Des formats standards (CSV, JSON, XML) permettant une réutilisation 
                          facile pour créer des applications, visualisations ou analyses.
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <div className="text-center mb-12">
                <Award className="h-12 w-12 mx-auto mb-4 text-primary" />
                <h2 className="font-heading font-bold text-3xl mb-4">Fonctionnalités</h2>
                <p className="text-lg text-muted-foreground">
                  Une plateforme moderne et intuitive pour explorer, télécharger et réutiliser les données publiques
                </p>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div className="flex items-start gap-4">
                  <CheckCircle className="h-6 w-6 text-primary mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="font-semibold mb-2">Catalogue enrichi</h3>
                    <p className="text-sm text-muted-foreground">
                      Recherche avancée, filtres par thème, organisation ou format, 
                      avec aperçu des données avant téléchargement.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <CheckCircle className="h-6 w-6 text-primary mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="font-semibold mb-2">Visualisations</h3>
                    <p className="text-sm text-muted-foreground">
                      Graphiques et cartes interactives pour mieux comprendre 
                      les données avant de les télécharger.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <CheckCircle className="h-6 w-6 text-primary mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="font-semibold mb-2">API REST</h3>
                    <p className="text-sm text-muted-foreground">
                      Accès programmatique aux données pour intégrer 
                      les jeux de données dans vos applications.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <CheckCircle className="h-6 w-6 text-primary mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="font-semibold mb-2">Espace producteur</h3>
                    <p className="text-sm text-muted-foreground">
                      Outils dédiés aux organisations pour publier, 
                      gérer et suivre leurs jeux de données.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <CheckCircle className="h-6 w-6 text-primary mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="font-semibold mb-2">Statistiques</h3>
                    <p className="text-sm text-muted-foreground">
                      Suivi des téléchargements, visualisations et réutilisations 
                      pour mesurer l'impact des données.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <CheckCircle className="h-6 w-6 text-primary mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="font-semibold mb-2">Communauté</h3>
                    <p className="text-sm text-muted-foreground">
                      Partage d'expériences, commentaires et retours 
                      pour améliorer la qualité des données.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Who Can Use Section */}
        <section className="py-16 bg-muted/50">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <div className="text-center mb-12">
                <Users className="h-12 w-12 mx-auto mb-4 text-primary" />
                <h2 className="font-heading font-bold text-3xl mb-4">Qui peut utiliser JDOM ?</h2>
              </div>

              <div className="grid md:grid-cols-3 gap-6">
                <Card>
                  <CardContent className="p-6">
                    <Building2 className="h-10 w-10 mb-4 text-primary" />
                    <h3 className="font-semibold text-lg mb-2">Organisations publiques</h3>
                    <p className="text-sm text-muted-foreground mb-4">
                      Ministères, agences, collectivités territoriales pour publier 
                      et partager leurs données.
                    </p>
                    <Button asChild variant="outline" size="sm">
                      <Link href="/register">
                        Devenir producteur
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </Link>
                    </Button>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="p-6">
                    <Database className="h-10 w-10 mb-4 text-primary" />
                    <h3 className="font-semibold text-lg mb-2">Développeurs</h3>
                    <p className="text-sm text-muted-foreground mb-4">
                      Créateurs d'applications, startups et entreprises tech 
                      pour intégrer des données dans leurs projets.
                    </p>
                    <Button asChild variant="outline" size="sm">
                      <Link href="/catalog">
                        Explorer l'API
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </Link>
                    </Button>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="p-6">
                    <BarChart3 className="h-10 w-10 mb-4 text-primary" />
                    <h3 className="font-semibold text-lg mb-2">Chercheurs & Journalistes</h3>
                    <p className="text-sm text-muted-foreground mb-4">
                      Pour analyser, visualiser et créer des contenus 
                      basés sur des données publiques fiables.
                    </p>
                    <Button asChild variant="outline" size="sm">
                      <Link href="/catalog">
                        Découvrir les données
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </Link>
                    </Button>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20">
          <div className="container mx-auto px-4">
            <Card className="gradient-mali overflow-hidden">
              <CardContent className="p-12 md:p-16">
                <div className="max-w-3xl mx-auto text-center text-white">
                  <h2 className="font-heading font-bold text-3xl md:text-4xl mb-4">
                    Rejoignez l'écosystème des données ouvertes
                  </h2>
                  <p className="text-white/90 text-lg mb-8">
                    Que vous soyez producteur de données ou utilisateur, 
                    JDOM vous accompagne dans votre démarche d'ouverture des données.
                  </p>
                  <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                    <Button 
                      asChild
                      size="lg"
                      className="bg-white text-[#14B14B] hover:bg-white/90 h-14 px-8 text-base"
                    >
                      <Link href="/catalog">
                        <Database className="mr-2 h-5 w-5" />
                        Explorer le catalogue
                      </Link>
                    </Button>
                    <Button 
                      asChild
                      size="lg"
                      variant="outline"
                      className="h-14 px-8 text-base border-white/30 text-white hover:bg-white/20 hover:text-white"
                    >
                      <Link href="/register">
                        Publier vos données
                        <ArrowRight className="ml-2 h-5 w-5" />
                      </Link>
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}


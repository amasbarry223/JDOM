'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { DatasetCard } from '@/components/catalog/DatasetCard';
import { ThemeCard } from '@/components/catalog/ThemeCard';
import { LoadingSpinner } from '@/components/shared/LoadingSpinner';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { allDatasets, themes, organizations, globalStats, useCases } from '@/lib/mock-data';
import { 
  Database, 
  Search, 
  TrendingUp, 
  Building2,
  ArrowRight,
  Download,
  Users,
  Eye
} from 'lucide-react';

export default function HomePage() {
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  
  // Get featured datasets
  const featuredDatasets = allDatasets.filter(ds => ds.featured).slice(0, 6);
  
  useEffect(() => {
    // Simulate loading
    setTimeout(() => setIsLoading(false), 500);
  }, []);

  if (isLoading) {
    return (
      <div className="flex flex-col min-h-screen">
        <Header />
        <div className="flex-1 flex items-center justify-center">
          <LoadingSpinner size="lg" text="Chargement de la plateforme..." />
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      
      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative overflow-hidden py-20 lg:py-32">
          <div className="absolute inset-0 gradient-mali opacity-90"></div>
          <div className="absolute inset-0 bg-[#1A1A2E]/20"></div>
          
          {/* Decorative Elements */}
          <div className="absolute top-20 left-10 w-72 h-72 bg-white/10 rounded-full blur-3xl"></div>
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-white/10 rounded-full blur-3xl"></div>
          
          <div className="container mx-auto px-4 relative">
            <div className="max-w-4xl mx-auto text-center">
              {/* Logo */}
              <div className="inline-flex items-center justify-center h-20 w-20 rounded-2xl bg-white/20 backdrop-blur-sm mb-8 mx-auto shadow-2xl">
                <Database className="h-10 w-10 text-white" />
              </div>
              
              {/* Title */}
              <h1 className="font-heading font-bold text-4xl md:text-6xl lg:text-7xl text-white mb-6 leading-tight">
                Données Ouvertes
                <br />
                <span className="text-[#FCD116]">du Mali</span>
              </h1>
              
              {/* Subtitle */}
              <p className="text-lg md:text-xl text-white/90 mb-10 max-w-2xl mx-auto">
                Accédez librement aux données publiques pour innover et décider. 
                Explorez, téléchargez et réutilisez les données publiques maliennes.
              </p>
              
              {/* Search Bar */}
              <div className="max-w-3xl mx-auto mb-8">
                <form 
                  className="relative flex items-center"
                  onSubmit={(e) => {
                    e.preventDefault();
                    window.location.href = `/catalog?q=${encodeURIComponent(searchQuery)}`;
                  }}
                >
                  <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                  <Input
                    type="search"
                    placeholder="Rechercher des jeux de données, organisations, thèmes..."
                    className="h-14 pl-12 pr-4 rounded-xl text-lg bg-white/95 backdrop-blur-sm border-0 shadow-2xl"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                  <Button 
                    type="submit"
                    className="absolute right-2 top-1/2 -translate-y-1/2 btn-primary h-10"
                  >
                    Rechercher
                  </Button>
                </form>
              </div>
              
              {/* Popular Searches */}
              <div className="flex flex-wrap items-center justify-center gap-2 mb-10">
                <span className="text-sm text-white/70">Recherches populaires:</span>
                {['Éducation', 'Santé', 'Économie', 'Population', 'Budget'].map((term) => (
                  <Badge 
                    key={term}
                    variant="secondary"
                    className="cursor-pointer bg-white/20 text-white hover:bg-white/30 transition-colors"
                    onClick={() => setSearchQuery(term)}
                  >
                    {term}
                  </Badge>
                ))}
              </div>
              
              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <Button 
                  asChild
                  size="lg"
                  className="btn-primary h-14 px-8 text-base"
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
                  className="h-14 px-8 text-base bg-white/10 text-white border-white/30 hover:bg-white/20 hover:text-white"
                >
                  <Link href="/about">
                    En savoir plus
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="py-16 bg-muted/50 border-y">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
              <StatCard 
                icon={Database}
                value={globalStats.totalDatasets}
                label="Jeux de données"
                color="text-[#14B14B]"
                bgColor="bg-[#14B14B]/10"
              />
              <StatCard 
                icon={Building2}
                value={globalStats.totalOrganizations}
                label="Organisations"
                color="text-[#14B14B]"
                bgColor="bg-[#14B14B]/10"
              />
              <StatCard 
                icon={Download}
                value={globalStats.totalDownloads}
                label="Téléchargements"
                color="text-[#FCD116]"
                bgColor="bg-[#FCD116]/10"
              />
              <StatCard 
                icon={Users}
                value={globalStats.totalUsers}
                label="Utilisateurs actifs"
                color="text-[#14B14B]"
                bgColor="bg-[#14B14B]/10"
              />
            </div>
          </div>
        </section>

        {/* Featured Datasets */}
        <section className="py-20">
          <div className="container mx-auto px-4">
            <div className="flex items-center justify-between mb-10">
              <div>
                <h2 className="font-heading font-bold text-3xl mb-2">
                  Jeux de données à la une
                </h2>
                <p className="text-muted-foreground">
                  Découvrez les datasets les plus populaires et récents
                </p>
              </div>
              <Button asChild variant="outline" className="hidden sm:flex">
                <Link href="/catalog">
                  Voir tout le catalogue
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {featuredDatasets.map((dataset, index) => (
                <DatasetCard 
                  key={dataset.id} 
                  dataset={dataset}
                  showRank
                  rank={index + 1}
                />
              ))}
            </div>
            
            <div className="mt-8 text-center sm:hidden">
              <Button asChild variant="outline" className="w-full">
                <Link href="/catalog">
                  Voir tout le catalogue
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
          </div>
        </section>

        {/* Explore by Theme */}
        <section className="py-20 bg-muted/30">
          <div className="container mx-auto px-4">
            <div className="text-center mb-10">
              <h2 className="font-heading font-bold text-3xl mb-2">
                Explorer par thèmes
              </h2>
              <p className="text-muted-foreground">
                Parcourez les données organisées par domaines thématiques
              </p>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {themes.map((theme) => (
                <ThemeCard key={theme.id} theme={theme} />
              ))}
            </div>
          </div>
        </section>

        {/* Organizations */}
        <section className="py-20">
          <div className="container mx-auto px-4">
            <div className="text-center mb-10">
              <h2 className="font-heading font-bold text-3xl mb-2">
                Organisations contributrices
              </h2>
              <p className="text-muted-foreground">
                Découvrez les institutions qui partagent leurs données
              </p>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
              {organizations.slice(0, 10).map((org) => (
                <Link 
                  key={org.id} 
                  href={`/organizations/${org.id}`}
                  className="group"
                >
                  <Card className="card-hover h-full flex flex-col items-center justify-center p-6">
                    <Avatar className="h-20 w-20 mb-4 group-hover:scale-110 transition-transform">
                      <AvatarImage src={org.logo} alt={org.name} />
                      <AvatarFallback>
                        {org.name.substring(0, 2).toUpperCase()}
                      </AvatarFallback>
                    </Avatar>
                    <h3 className="font-medium text-sm text-center line-clamp-2">
                      {org.name}
                    </h3>
                    <Badge variant="secondary" className="mt-2">
                      {org.datasetsCount} datasets
                    </Badge>
                  </Card>
                </Link>
              ))}
            </div>
            
            <div className="mt-10 text-center">
              <Button asChild variant="outline">
                <Link href="/organizations">
                  Voir toutes les organisations
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
          </div>
        </section>

        {/* Use Cases */}
        <section className="py-20 bg-muted/30">
          <div className="container mx-auto px-4">
            <div className="text-center mb-10">
              <h2 className="font-heading font-bold text-3xl mb-2">
                Cas d'usage & Réutilisations
              </h2>
              <p className="text-muted-foreground">
                Découvrez comment les données sont utilisées pour créer de la valeur
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {useCases.map((useCase) => (
                <Card key={useCase.id} className="card-hover">
                  <CardContent className="p-6">
                    <div className="h-12 w-12 rounded-lg gradient-mali flex items-center justify-center mb-4">
                      <TrendingUp className="h-6 w-6 text-white" />
                    </div>
                    <h3 className="font-heading font-semibold text-lg mb-2">
                      {useCase.title}
                    </h3>
                    <p className="text-sm text-muted-foreground mb-4 line-clamp-3">
                      {useCase.description}
                    </p>
                    <div className="flex flex-wrap gap-2 mb-4">
                      {useCase.datasets.slice(0, 3).map((ds) => (
                        <Badge key={ds.id} variant="outline" className="text-xs">
                          {ds.title.substring(0, 20)}...
                        </Badge>
                      ))}
                    </div>
                    <Button variant="ghost" className="w-full" asChild>
                      <Link href="/use-cases">
                        En savoir plus
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </Link>
                    </Button>
                  </CardContent>
                </Card>
              ))}
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
                    Vous êtes une organisation ?
                  </h2>
                  <p className="text-white/90 text-lg mb-8">
                    Rejoignez les producteurs de données et contribuez à l'ouverture des données publiques du Mali. 
                    Publiez vos jeux de données et augmentez leur impact.
                  </p>
                  <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                    <Button 
                      asChild
                      size="lg"
                      className="bg-white text-[#14B14B] hover:bg-white/90 h-14 px-8 text-base"
                    >
                      <Link href="/register">
                        Devenir producteur
                        <ArrowRight className="ml-2 h-5 w-5" />
                      </Link>
                    </Button>
                    <Button 
                      asChild
                      size="lg"
                      variant="outline"
                      className="h-14 px-8 text-base border-white/30 text-white hover:bg-white/20 hover:text-white"
                    >
                      <Link href="/guide-publisher">
                        Comment ça marche ?
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

function StatCard({ 
  icon: Icon, 
  value, 
  label, 
  color, 
  bgColor 
}: { 
  icon: React.ElementType; 
  value: number; 
  label: string; 
  color: string;
  bgColor: string;
}) {
  return (
    <Card className="border-2 hover:shadow-lg transition-all duration-300">
      <CardContent className="p-6">
        <div className="flex items-center gap-4">
          <div className={`h-14 w-14 rounded-xl ${bgColor} flex items-center justify-center`}>
            <Icon className={`h-7 w-7 ${color}`} />
          </div>
          <div>
            <div className="font-heading font-bold text-3xl">
              {value.toLocaleString()}
            </div>
            <div className="text-sm text-muted-foreground">{label}</div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

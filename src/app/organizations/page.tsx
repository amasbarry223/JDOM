'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Card, CardContent } from '@/components/ui/card';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { organizations } from '@/lib/mock-data';
import { 
  Search, 
  Building2, 
  MapPin, 
  Globe,
  Database,
  Download,
  ArrowRight,
  Filter
} from 'lucide-react';

export default function OrganizationsPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [typeFilter, setTypeFilter] = useState<string>('all');

  const filteredOrgs = organizations.filter(org => {
    const matchesSearch = !searchQuery || 
      org.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      org.description?.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesType = typeFilter === 'all' || org.type === typeFilter;
    
    return matchesSearch && matchesType;
  });

  const orgTypes = Array.from(new Set(organizations.map(org => org.type)));

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1 container mx-auto px-4 py-8">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <h1 className="font-heading font-bold text-4xl md:text-5xl mb-4">
            Organisations Partenaires
          </h1>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Découvrez les institutions qui partagent leurs données ouvertes sur notre plateforme
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <Card>
            <CardContent className="p-6 text-center">
              <Building2 className="h-8 w-8 mx-auto mb-2 text-primary" />
              <p className="text-3xl font-bold">{organizations.length}</p>
              <p className="text-sm text-muted-foreground">Organisations</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6 text-center">
              <Database className="h-8 w-8 mx-auto mb-2 text-primary" />
              <p className="text-3xl font-bold">
                {organizations.reduce((sum, org) => sum + org.datasetsCount, 0)}
              </p>
              <p className="text-sm text-muted-foreground">Datasets au total</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6 text-center">
              <Download className="h-8 w-8 mx-auto mb-2 text-primary" />
              <p className="text-3xl font-bold">
                {organizations.reduce((sum, org) => sum + org.totalDownloads, 0).toLocaleString()}
              </p>
              <p className="text-sm text-muted-foreground">Téléchargements</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6 text-center">
              <Badge className="bg-green-100 text-green-700 text-lg px-4 py-2">
                {organizations.filter(o => o.status === 'active').length} Actives
              </Badge>
              <p className="text-sm text-muted-foreground mt-2">Organisations actives</p>
            </CardContent>
          </Card>
        </div>

        {/* Search and Filters */}
        <div className="mb-8 space-y-4">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
              <Input
                placeholder="Rechercher une organisation..."
                className="pl-10"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <div className="flex gap-2 flex-wrap">
              <Button
                variant={typeFilter === 'all' ? 'default' : 'outline'}
                onClick={() => setTypeFilter('all')}
                size="sm"
              >
                <Filter className="h-4 w-4 mr-2" />
                Tous
              </Button>
              {orgTypes.map(type => (
                <Button
                  key={type}
                  variant={typeFilter === type ? 'default' : 'outline'}
                  onClick={() => setTypeFilter(type)}
                  size="sm"
                >
                  {type === 'ministry' ? 'Ministères' : 
                   type === 'agency' ? 'Agences' : 
                   type === 'ngo' ? 'ONG' : 
                   type === 'university' ? 'Universités' : type}
                </Button>
              ))}
            </div>
          </div>
          <p className="text-sm text-muted-foreground">
            {filteredOrgs.length} organisation{filteredOrgs.length !== 1 ? 's' : ''} trouvée{filteredOrgs.length !== 1 ? 's' : ''}
          </p>
        </div>

        {/* Organizations Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {filteredOrgs.map((org) => (
            <Link 
              key={org.id} 
              href={`/organizations/${org.id}`}
              className="group"
            >
              <Card className="card-hover h-full flex flex-col">
                <CardContent className="p-6">
                  <div className="flex items-start gap-4 mb-4">
                    <Avatar className="h-16 w-16 group-hover:scale-110 transition-transform">
                      <AvatarImage src={org.logo} alt={org.name} />
                      <AvatarFallback className="bg-primary/10 text-primary text-lg">
                        {org.name.substring(0, 2).toUpperCase()}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-heading font-semibold text-lg mb-1 line-clamp-2 group-hover:text-primary transition-colors">
                        {org.name}
                      </h3>
                      <Badge variant="secondary" className="text-xs">
                        {org.type === 'ministry' ? 'Ministère' : 
                         org.type === 'agency' ? 'Agence' : 
                         org.type === 'ngo' ? 'ONG' : 
                         org.type === 'university' ? 'Université' : org.type}
                      </Badge>
                    </div>
                  </div>
                  
                  {org.description && (
                    <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
                      {org.description}
                    </p>
                  )}

                  <div className="grid grid-cols-2 gap-4 pt-4 border-t">
                    <div>
                      <p className="text-xs text-muted-foreground mb-1">Datasets</p>
                      <p className="font-semibold text-lg">{org.datasetsCount}</p>
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground mb-1">Téléchargements</p>
                      <p className="font-semibold text-lg">{org.totalDownloads.toLocaleString()}</p>
                    </div>
                  </div>

                  {org.website && (
                    <div className="mt-4 pt-4 border-t flex items-center gap-2 text-sm text-muted-foreground">
                      <Globe className="h-4 w-4" />
                      <span className="truncate">{org.website.replace(/^https?:\/\//, '')}</span>
                    </div>
                  )}

                  <div className="mt-4 flex items-center text-primary text-sm font-medium group-hover:gap-2 transition-all">
                    Voir les datasets
                    <ArrowRight className="h-4 w-4 ml-1 group-hover:translate-x-1 transition-transform" />
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>

        {filteredOrgs.length === 0 && (
          <div className="text-center py-12">
            <Building2 className="h-16 w-16 mx-auto mb-4 text-muted-foreground" />
            <h3 className="text-xl font-semibold mb-2">Aucune organisation trouvée</h3>
            <p className="text-muted-foreground mb-4">
              Essayez de modifier vos critères de recherche
            </p>
            <Button variant="outline" onClick={() => {
              setSearchQuery('');
              setTypeFilter('all');
            }}>
              Réinitialiser les filtres
            </Button>
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}


'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { organizations } from '@/lib/mock-data';
import { Search, Filter, Plus, Building2, MapPin, CheckCircle, AlertTriangle, Eye, Settings, MoreVertical } from 'lucide-react';

export default function AdminOrganizationsPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [selectedOrgs, setSelectedOrgs] = useState<string[]>([]);

  const filteredOrgs = organizations.filter(org => {
    if (statusFilter !== 'all' && org.status !== statusFilter) return false;
    if (searchQuery && !org.name.toLowerCase().includes(searchQuery.toLowerCase())) return false;
    return true;
  });

  const toggleSelect = (id: string) => {
    setSelectedOrgs(prev =>
      prev.includes(id)
        ? prev.filter(orgId => orgId !== id)
        : [...prev, id]
    );
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'active': return <Badge className="bg-green-100 text-green-700">Active</Badge>;
      case 'pending': return <Badge className="bg-yellow-100 text-yellow-700">En attente</Badge>;
      case 'suspended': return <Badge className="bg-red-100 text-red-700">Suspendue</Badge>;
      default: return <Badge className="bg-gray-100 text-gray-700">-</Badge>;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-heading font-bold text-3xl">Gestion des Organisations</h1>
          <p className="text-muted-foreground">{organizations.length} organisations au total</p>
        </div>
        <Button className="btn-primary">
          <Plus className="mr-2 h-5 w-5" />
          Nouvelle Organisation
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <div className="p-4 border rounded-lg bg-blue-500/10">
          <p className="text-2xl font-bold text-blue-700">{organizations.length}</p>
          <p className="text-sm text-muted-foreground">Total</p>
        </div>
        <div className="p-4 border rounded-lg bg-green-500/10">
          <p className="text-2xl font-bold text-green-700">{organizations.filter(o => o.status === 'active').length}</p>
          <p className="text-sm text-muted-foreground">Actives</p>
        </div>
        <div className="p-4 border rounded-lg bg-yellow-500/10">
          <p className="text-2xl font-bold text-yellow-700">{organizations.filter(o => o.status === 'pending').length}</p>
          <p className="text-sm text-muted-foreground">En attente</p>
        </div>
        <div className="p-4 border rounded-lg bg-red-500/10">
          <p className="text-2xl font-bold text-red-700">{organizations.filter(o => o.status === 'suspended').length}</p>
          <p className="text-sm text-muted-foreground">Suspendues</p>
        </div>
      </div>

      <Card>
        <CardContent className="p-4">
          <div className="flex flex-col md:flex-row gap-4 mb-6">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
              <Input
                placeholder="Rechercher par nom, type..."
                className="pl-10"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <div>
              <span className="text-sm text-muted-foreground">Filtrer par statut:</span>
              <Badge variant="outline">{filteredOrgs.length} trouvée{filteredOrgs.length !== 1 ? 's' : ''}</Badge>
            </div>
          </div>

          <div className="space-y-3">
            {filteredOrgs.map((org) => (
              <Card key={org.id} className="hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <Avatar className="h-16 w-16">
                      <AvatarImage src={org.logo} alt={org.name} />
                      <AvatarFallback className="text-xl bg-primary/10 text-primary">
                        {org.name.substring(0, 2).toUpperCase()}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between mb-2">
                        <h3 className="font-heading font-semibold text-xl">{org.name}</h3>
                        {getStatusBadge(org.status)}
                      </div>
                      <div className="flex gap-2">
                        <Button variant="ghost" size="icon">
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="icon">
                          <Settings className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="icon" className="text-destructive hover:bg-destructive/10">
                          <AlertTriangle className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                    <p className="text-sm text-muted-foreground mb-4">
                      Type: {org.type}
                    </p>
                    <p className="text-sm text-muted-foreground mb-4">
                      {org.description}
                    </p>
                    <div className="grid grid-cols-2 gap-4 py-4 border-t">
                      <div>
                        <p className="text-xs text-muted-foreground mb-1">Datasets</p>
                        <p className="font-semibold text-lg">{org.datasetsCount}</p>
                      </div>
                      <div>
                        <p className="text-xs text-muted-foreground mb-1">Téléchargements</p>
                        <p className="font-semibold text-lg">{org.totalDownloads.toLocaleString()}</p>
                      </div>
                      <div>
                        <p className="text-xs text-muted-foreground mb-1">Membres</p>
                        <p className="font-semibold text-lg">{org.members?.length || '-'}</p>
                      </div>
                      <div>
                        <p className="text-xs text-muted-foreground mb-1">Site web</p>
                        <a href={org.website} target="_blank" rel="noopener noreferrer" className="text-sm text-primary hover:underline">
                          {org.website || '-'}
                        </a>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

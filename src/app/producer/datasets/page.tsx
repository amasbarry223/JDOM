'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { allDatasets } from '@/lib/mock-data';
import { 
  Database, 
  Download, 
  Eye, 
  Plus,
  Search,
  Filter,
  MoreVertical,
  Edit,
  Trash2,
  BarChart3
} from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

export default function ProducerDatasetsPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const myDatasets = allDatasets.slice(0, 12);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="font-heading font-bold text-3xl">Mes Datasets</h1>
          <p className="text-muted-foreground">
            Gérez vos {myDatasets.length} jeux de données publiés
          </p>
        </div>
        <Button className="btn-primary">
          <Plus className="mr-2 h-5 w-5" />
          Nouveau dataset
        </Button>
      </div>

      {/* Stats Bar */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <StatBadge label="Publiés" count={10} color="bg-green-100 text-green-700" />
        <StatBadge label="Brouillons" count={1} color="bg-yellow-100 text-yellow-700" />
        <StatBadge label="En validation" count={1} color="bg-blue-100 text-blue-700" />
        <StatBadge label="Archivés" count={0} color="bg-gray-100 text-gray-700" />
      </div>

      {/* Filters & Search */}
      <Card>
        <CardContent className="p-4">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
              <Input
                placeholder="Rechercher dans mes datasets..."
                className="pl-10"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-full md:w-[200px]">
                <Filter className="mr-2 h-4 w-4" />
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Tous les statuts</SelectItem>
                <SelectItem value="published">Publié</SelectItem>
                <SelectItem value="draft">Brouillon</SelectItem>
                <SelectItem value="pending">En validation</SelectItem>
                <SelectItem value="archived">Archivé</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Datasets Table */}
      <Card>
        <CardHeader>
          <CardTitle>Liste des datasets</CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <div className="divide-y">
            {myDatasets.map((dataset) => (
              <div 
                key={dataset.id}
                className="flex items-center gap-4 p-4 hover:bg-muted transition-colors"
              >
                {/* Status Indicator */}
                <div className={`
                  h-2 w-2 rounded-full flex-shrink-0
                  ${dataset.status === 'published' ? 'bg-green-500' :
                   dataset.status === 'draft' ? 'bg-yellow-500' :
                   dataset.status === 'pending' ? 'bg-blue-500' : 'bg-gray-500'}
                `} />

                {/* Info */}
                <div className="flex-1 min-w-0">
                  <Link 
                    href={`/dataset/${dataset.id}`}
                    className="font-medium hover:text-primary transition-colors line-clamp-1"
                  >
                    {dataset.title}
                  </Link>
                  <div className="flex items-center gap-3 mt-1 text-sm text-muted-foreground">
                    <span>{dataset.theme.name}</span>
                    <span>•</span>
                    <span>{dataset.organization.name}</span>
                    <span>•</span>
                    <span>{new Date(dataset.updatedAt).toLocaleDateString('fr-FR')}</span>
                  </div>
                </div>

                {/* Stats */}
                <div className="flex items-center gap-4 text-sm text-muted-foreground">
                  <div className="flex items-center gap-1">
                    <Download className="h-4 w-4" />
                    <span>{dataset.downloads.toLocaleString()}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Eye className="h-4 w-4" />
                    <span>{dataset.views.toLocaleString()}</span>
                  </div>
                </div>

                {/* Status Badge */}
                <Badge 
                  variant={
                    dataset.status === 'published' ? 'default' :
                    dataset.status === 'draft' ? 'secondary' :
                    'outline'
                  }
                  className={
                    dataset.status === 'published' ? 'bg-green-500' :
                    dataset.status === 'draft' ? 'bg-yellow-500' :
                    'bg-blue-500'
                  }
                >
                  {dataset.status === 'published' ? 'Publié' :
                   dataset.status === 'draft' ? 'Brouillon' :
                   dataset.status === 'pending' ? 'En validation' : dataset.status}
                </Badge>

                {/* Actions */}
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon">
                      <MoreVertical className="h-5 w-5" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem asChild>
                      <Link href={`/dataset/${dataset.id}`} className="cursor-pointer">
                        <Eye className="mr-2 h-4 w-4" />
                        Voir détails
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem className="cursor-pointer">
                      <Edit className="mr-2 h-4 w-4" />
                      Modifier
                    </DropdownMenuItem>
                    <DropdownMenuItem className="cursor-pointer">
                      <BarChart3 className="mr-2 h-4 w-4" />
                      Statistiques
                    </DropdownMenuItem>
                    <DropdownMenuItem className="cursor-pointer text-destructive">
                      <Trash2 className="mr-2 h-4 w-4" />
                      Supprimer
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

function StatBadge({ label, count, color }: { label: string; count: number; color: string }) {
  return (
    <div className={`p-4 rounded-lg ${color}`}>
      <div className="flex items-center justify-between">
        <span className="text-sm font-medium">{label}</span>
        <span className="font-heading font-bold text-2xl">{count}</span>
      </div>
    </div>
  );
}

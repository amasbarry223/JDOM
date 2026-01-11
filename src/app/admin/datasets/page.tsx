'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { allDatasets, themes, organizations } from '@/lib/mock-data';
import { 
  Search, 
  Filter,
  Plus,
  Download,
  Eye,
  Edit,
  Trash2,
  MoreVertical,
  CheckCircle2,
  AlertTriangle,
  X
} from 'lucide-react';

export default function AdminDatasetsPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [themeFilter, setThemeFilter] = useState('all');
  const [orgFilter, setOrgFilter] = useState('all');
  const [selectedDatasets, setSelectedDatasets] = useState<string[]>([]);

  const filteredDatasets = allDatasets.filter(ds => {
    if (statusFilter !== 'all' && ds.status !== statusFilter) return false;
    if (themeFilter !== 'all' && ds.theme.id !== themeFilter) return false;
    if (orgFilter !== 'all' && ds.organization.id !== orgFilter) return false;
    return true;
  });

  const toggleSelect = (id: string) => {
    setSelectedDatasets(prev =>
      prev.includes(id)
        ? prev.filter(datasetId => datasetId !== id)
        : [...prev, id]
    );
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-heading font-bold text-3xl">Gestion des Datasets</h1>
          <p className="text-muted-foreground">
            {allDatasets.length} datasets au total
          </p>
        </div>
        <Button className="btn-primary">
          <Plus className="mr-2 h-5 w-5" />
          Nouveau Dataset
        </Button>
      </div>

      {/* Stats Bar */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <StatCard label="Total" count={allDatasets.length} color="bg-blue-500" />
        <StatCard label="Publié" count={allDatasets.filter(ds => ds.status === 'published').length} color="bg-green-500" />
        <StatCard label="Brouillon" count={allDatasets.filter(ds => ds.status === 'draft').length} color="bg-yellow-500" />
        <StatCard label="En validation" count={allDatasets.filter(ds => ds.status === 'pending').length} color="bg-purple-500" />
      </div>

      {/* Filters & Search */}
      <Card>
        <CardContent className="p-4">
          <div className="flex flex-col md:flex-row gap-4">
            {/* Search */}
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
              <Input
                placeholder="Rechercher par titre, description..."
                className="pl-10"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>

            {/* Filters */}
            <div className="flex flex-wrap gap-2">
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-[140px]">
                  <Filter className="mr-2 h-4 w-4" />
                  <SelectValue placeholder="Statut" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Tous les statuts</SelectItem>
                  <SelectItem value="published">Publié</SelectItem>
                  <SelectItem value="draft">Brouillon</SelectItem>
                  <SelectItem value="pending">En validation</SelectItem>
                  <SelectItem value="archived">Archivé</SelectItem>
                </SelectContent>
              </Select>

              <Select value={themeFilter} onValueChange={setThemeFilter}>
                <SelectTrigger className="w-[140px]">
                  <Filter className="mr-2 h-4 w-4" />
                  <SelectValue placeholder="Thème" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Tous les thèmes</SelectItem>
                  {themes.map((theme) => (
                    <SelectItem key={theme.id} value={theme.id}>
                      {theme.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Select value={orgFilter} onValueChange={setOrgFilter}>
                <SelectTrigger className="w-[140px]">
                  <Filter className="mr-2 h-4 w-4" />
                  <SelectValue placeholder="Organisation" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Toutes les organisations</SelectItem>
                  {organizations.slice(0, 8).map((org) => (
                    <SelectItem key={org.id} value={org.id}>
                      {org.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Actions */}
            <div className="flex gap-2">
              {selectedDatasets.length > 0 && (
                <Button variant="outline" size="sm">
                  <X className="mr-2 h-4 w-4" />
                  {selectedDatasets.length} sélect.
                </Button>
              )}
              <Button variant="outline" size="sm">
                Réinitialiser
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Datasets Table */}
      <Card>
        <CardHeader>
          <CardTitle>
            {filteredDatasets.length} dataset{filteredDatasets.length !== 1 ? 's' : ''} trouvé{filteredDatasets.length !== 1 ? 's' : ''}
          </CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b bg-muted/50">
                  <th className="w-12 p-3 text-left">
                    <input
                      type="checkbox"
                      className="cursor-pointer"
                    />
                  </th>
                  <th className="p-3 text-left">Dataset</th>
                  <th className="p-3 text-left">Organisation</th>
                  <th className="p-3 text-left">Thème</th>
                  <th className="p-3 text-left">Statut</th>
                  <th className="p-3 text-left">Téléchargements</th>
                  <th className="p-3 text-left">Vues</th>
                  <th className="p-3 text-left">Note</th>
                  <th className="w-24 p-3 text-right">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredDatasets.map((dataset) => (
                  <tr key={dataset.id} className="border-b hover:bg-muted/30 transition-colors">
                    <td className="p-3">
                      <input
                        type="checkbox"
                        checked={selectedDatasets.includes(dataset.id)}
                        onChange={() => toggleSelect(dataset.id)}
                        className="cursor-pointer"
                      />
                    </td>
                    <td className="p-3">
                      <Link 
                        href={`/dataset/${dataset.id}`}
                        className="font-medium text-sm hover:text-primary transition-colors line-clamp-1"
                      >
                        {dataset.title}
                      </Link>
                    </td>
                    <td className="p-3">
                      <div className="flex items-center gap-2">
                        <Avatar className="h-6 w-6">
                          <AvatarImage src={dataset.organization.logo} alt={dataset.organization.name} />
                          <AvatarFallback className="text-xs">
                            {dataset.organization.name.substring(0, 2).toUpperCase()}
                          </AvatarFallback>
                        </Avatar>
                        <span className="text-sm">{dataset.organization.name}</span>
                      </div>
                    </td>
                    <td className="p-3">
                      <Badge variant="outline" className="text-xs">
                        {dataset.theme.name}
                      </Badge>
                    </td>
                    <td className="p-3">
                      <Badge 
                        variant="outline"
                        className={`text-xs ${
                          dataset.status === 'published' ? 'bg-green-100 text-green-700' :
                          dataset.status === 'draft' ? 'bg-yellow-100 text-yellow-700' :
                          dataset.status === 'pending' ? 'bg-blue-100 text-blue-700' :
                          'bg-gray-100 text-gray-700'
                        }`}
                      >
                        {dataset.status === 'published' ? 'Publié' :
                         dataset.status === 'draft' ? 'Brouillon' :
                         dataset.status === 'pending' ? 'En validation' : dataset.status}
                      </Badge>
                    </td>
                    <td className="p-3 text-sm">
                      {dataset.downloads.toLocaleString()}
                    </td>
                    <td className="p-3 text-sm">
                      {dataset.views.toLocaleString()}
                    </td>
                    <td className="p-3">
                      <div className="flex items-center gap-1">
                        <span className="font-semibold">{dataset.rating}</span>
                        <span className="text-muted-foreground">({dataset.ratingCount})</span>
                      </div>
                    </td>
                    <td className="p-3">
                      <div className="flex items-center justify-end gap-2">
                        <Button variant="ghost" size="icon" asChild>
                          <Link href={`/dataset/${dataset.id}`}>
                            <Eye className="h-4 w-4" />
                          </Link>
                        </Button>
                        <Button variant="ghost" size="icon" asChild>
                          <Link href={`/dataset/${dataset.id}/edit`}>
                            <Edit className="h-4 w-4" />
                          </Link>
                        </Button>
                        <Button variant="ghost" size="icon">
                          <Download className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="icon" className="text-destructive">
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

function StatCard({ label, count, color }: { label: string; count: number; color: string }) {
  return (
    <div className="flex flex-col items-center justify-center p-4 border rounded-lg">
      <span className="text-3xl font-heading font-bold">{count}</span>
      <span className="text-sm text-muted-foreground">{label}</span>
    </div>
  );
}

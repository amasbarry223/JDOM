'use client';

import { useState } from 'react';
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
import { users, organizations } from '@/lib/mock-data';
import { 
  Search, 
  Filter,
  Plus,
  Mail,
  Shield,
  Ban,
  MoreVertical,
  User,
  Building2
} from 'lucide-react';

export default function AdminUsersPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [roleFilter, setRoleFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');
  const [selectedUsers, setSelectedUsers] = useState<string[]>([]);

  const filteredUsers = users.filter(user => {
    if (roleFilter !== 'all' && user.role !== roleFilter) return false;
    if (statusFilter !== 'all' && user.status !== statusFilter) return false;
    if (searchQuery && !user.name.toLowerCase().includes(searchQuery.toLowerCase()) && !user.email.toLowerCase().includes(searchQuery.toLowerCase())) return false;
    return true;
  });

  const toggleSelect = (id: string) => {
    setSelectedUsers(prev =>
      prev.includes(id)
        ? prev.filter(userId => userId !== id)
        : [...prev, id]
    );
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-heading font-bold text-3xl">Gestion des Utilisateurs</h1>
          <p className="text-muted-foreground">
            {users.length} utilisateurs au total
          </p>
        </div>
        <Button className="btn-primary">
          <Plus className="mr-2 h-5 w-5" />
          Nouvel Utilisateur
        </Button>
      </div>

      {/* Stats Bar */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <StatCard label="Total" count={users.length} color="bg-blue-100 text-blue-700" />
        <StatCard label="Actifs" count={users.filter(u => u.status === 'active').length} color="bg-green-100 text-green-700" />
        <StatCard label="Suspendus" count={users.filter(u => u.status === 'suspended').length} color="bg-red-100 text-red-700" />
      </div>

      {/* Filters & Search */}
      <Card>
        <CardContent className="p-4">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
              <Input
                placeholder="Rechercher par nom ou email..."
                className="pl-10"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <div className="flex gap-2">
              <Select value={roleFilter} onValueChange={setRoleFilter}>
                <SelectTrigger className="w-[180px]">
                  <Filter className="mr-2 h-4 w-4" />
                  <SelectValue placeholder="Rôle" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Tous les rôles</SelectItem>
                  <SelectItem value="admin">Admin</SelectItem>
                  <SelectItem value="producer">Producteur</SelectItem>
                  <SelectItem value="citizen">Citoyen</SelectItem>
                </SelectContent>
              </Select>

              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-[180px]">
                  <Filter className="mr-2 h-4 w-4" />
                  <SelectValue placeholder="Statut" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Tous les statuts</SelectItem>
                  <SelectItem value="active">Actif</SelectItem>
                  <SelectItem value="pending">En attente</SelectItem>
                  <SelectItem value="suspended">Suspendu</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Actions */}
            <div className="flex gap-2">
              <Button variant="outline" disabled>
                <Ban className="mr-2 h-4 w-4" />
                Suspendre
              </Button>
              <Button variant="outline" disabled>
                <Shield className="mr-2 h-4 w-4" />
                Envoyer emails
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Users Table */}
      <Card>
        <CardHeader>
          <CardTitle>
            {filteredUsers.length} utilisateur{filteredUsers.length !== 1 ? 's' : ''} trouvé{filteredUsers.length !== 1 ? 's' : ''}
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
                  <th className="p-3 text-left">Utilisateur</th>
                  <th className="p-3 text-left">Email</th>
                  <th className="p-3 text-left">Rôle</th>
                  <th className="p-3 text-left">Statut</th>
                  <th className="p-3 text-left">Organisation</th>
                  <th className="p-3 text-left">Dernière connexion</th>
                  <th className="w-24 p-3 text-right">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredUsers.map((user) => {
                  const org = organizations.find(o => o.id === user.organizationId);
                  return (
                    <tr key={user.id} className="border-b hover:bg-muted/30 transition-colors">
                      <td className="p-3">
                        <input
                          type="checkbox"
                          checked={selectedUsers.includes(user.id)}
                          onChange={() => toggleSelect(user.id)}
                          className="cursor-pointer"
                        />
                      </td>
                      <td className="p-3">
                        <div className="flex items-center gap-3">
                          <Avatar className="h-8 w-8">
                            <AvatarImage src={user.avatar} alt={user.name} />
                            <AvatarFallback className="text-xs bg-primary text-primary-foreground">
                              {user.name?.substring(0, 2).toUpperCase() || 'U'}
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <p className="font-medium text-sm">{user.name}</p>
                            <p className="text-xs text-muted-foreground">{user.email}</p>
                          </div>
                        </div>
                      </td>
                      <td className="p-3">
                        <Badge 
                          variant="outline"
                          className={`text-xs ${
                            user.role === 'admin' ? 'bg-red-100 text-red-700' :
                            user.role === 'producer' ? 'bg-blue-100 text-blue-700' :
                            'bg-gray-100 text-gray-700'
                          }`}
                        >
                          {user.role === 'admin' ? 'Admin' :
                           user.role === 'producer' ? 'Producteur' :
                           user.role === 'citizen' ? 'Citoyen' : user.role}
                        </Badge>
                      </td>
                      <td className="p-3">
                        <Badge 
                          variant="outline"
                          className={`text-xs ${
                            user.status === 'active' ? 'bg-green-100 text-green-700' :
                            user.status === 'pending' ? 'bg-yellow-100 text-yellow-700' :
                            'bg-red-100 text-red-700'
                          }`}
                        >
                          {user.status === 'active' ? 'Actif' :
                           user.status === 'pending' ? 'En attente' :
                           user.status === 'suspended' ? 'Suspendu' : user.status}
                        </Badge>
                      </td>
                      <td className="p-3">
                        <div className="flex items-center gap-2">
                          <Building2 className="h-4 w-4 text-muted-foreground" />
                          <span className="text-sm">{org?.name || '-'}</span>
                        </div>
                      </td>
                      <td className="p-3 text-sm text-muted-foreground">
                        {user.lastLogin?.toLocaleDateString('fr-FR') || '-'}
                      </td>
                      <td className="p-3">
                        <div className="flex items-center justify-end gap-2">
                          <Button variant="ghost" size="icon" className="hover:text-primary">
                            <User className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="icon" className="hover:text-primary">
                            <Mail className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="icon" className="text-destructive hover:bg-destructive/10">
                            <Ban className="h-4 w-4" />
                          </Button>
                          <div className="relative">
                            <Button variant="ghost" size="icon" className="hover:text-primary">
                              <MoreVertical className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                      </td>
                    </tr>
                  );
                })}
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
    <div className="p-4 rounded-lg border">
      <p className="text-sm text-muted-foreground">{label}</p>
      <p className="text-3xl font-heading font-bold">{count}</p>
    </div>
  );
}

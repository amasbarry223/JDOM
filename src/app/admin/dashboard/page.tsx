'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '@/components/ui/table';
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from '@/components/ui/select';
import { 
  allDatasets, 
  organizations, 
  users, 
  globalStats,
  activities 
} from '@/lib/mock-data';
import { 
  Database, 
  Download, 
  Eye, 
  Users as UsersIcon, 
  Building2,
  TrendingUp,
  ArrowRight,
  AlertTriangle,
  CheckCircle2,
  Clock,
  Activity,
  Server,
  HardDrive,
  Shield,
  Zap,
  XCircle,
  RefreshCw,
  FileText,
  MessageSquare,
  UserPlus,
  ArrowUp,
  ArrowDown,
  MoreVertical,
  Filter
} from 'lucide-react';
import { 
  ChartContainer, 
  ChartTooltip, 
  ChartTooltipContent,
  ChartLegend,
  ChartLegendContent
} from '@/components/ui/chart';
import { LineChart, Line, AreaChart, Area, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, ResponsiveContainer, Legend } from 'recharts';

// Mock admin stats avec données réalistes
const adminStats = {
  totalDatasets: 55,
  publishedDatasets: 48,
  pendingValidation: 8,
  drafts: 3,
  totalUsers: 2876,
  newUsersThisMonth: 234,
  organizationsCount: 15,
  citizensCount: 2642,
  totalDownloads: 456789,
  downloadsThisMonth: 23456,
  downloadsLastMonth: 19890,
  totalViews: 1234567,
  viewsThisMonth: 56789,
  viewsLastMonth: 52340,
  activeSessions: 42,
};

// Données pour graphiques
const monthlyData = [
  { month: 'Jan', downloads: 18500, views: 45200, users: 120 },
  { month: 'Fév', downloads: 22100, views: 52300, users: 145 },
  { month: 'Mar', downloads: 19800, views: 48900, users: 132 },
  { month: 'Avr', downloads: 25600, views: 61200, users: 178 },
  { month: 'Mai', downloads: 23400, views: 56700, users: 165 },
  { month: 'Juin', downloads: 28900, views: 70100, users: 201 },
  { month: 'Juil', downloads: 31200, views: 75600, users: 223 },
  { month: 'Août', downloads: 29800, views: 72300, users: 215 },
  { month: 'Sep', downloads: 27600, views: 67800, users: 198 },
  { month: 'Oct', downloads: 30100, views: 73400, users: 228 },
  { month: 'Nov', downloads: 32400, views: 78900, users: 241 },
  { month: 'Déc', downloads: 23456, views: 56789, users: 234 },
];

const datasetsByTheme = [
  { name: 'Économie', value: 12, color: '#2563eb' },
  { name: 'Éducation', value: 10, color: '#7c3aed' },
  { name: 'Santé', value: 8, color: '#dc2626' },
  { name: 'Agriculture', value: 8, color: '#78350f' },
  { name: 'Finances', value: 7, color: '#eab308' },
  { name: 'Environnement', value: 6, color: '#16a34a' },
  { name: 'Transport', value: 5, color: '#f59e0b' },
  { name: 'Démographie', value: 5, color: '#0891b2' },
];

const chartConfig = {
  downloads: {
    label: 'Téléchargements',
    color: '#14B14B',
  },
  views: {
    label: 'Vues',
    color: '#FCD116',
  },
  users: {
    label: 'Nouveaux utilisateurs',
    color: '#CE1126',
  },
};

// Types d'activités avec badges
const activityTypes = {
  dataset_published: { label: 'Dataset publié', color: 'bg-green-100 text-green-700', icon: Database },
  dataset_updated: { label: 'Dataset modifié', color: 'bg-blue-100 text-blue-700', icon: RefreshCw },
  dataset_deleted: { label: 'Dataset supprimé', color: 'bg-red-100 text-red-700', icon: XCircle },
  user_registered: { label: 'Utilisateur inscrit', color: 'bg-purple-100 text-purple-700', icon: UserPlus },
  dataset_downloaded: { label: 'Téléchargement', color: 'bg-gray-100 text-gray-700', icon: Download },
  comment_posted: { label: 'Commentaire', color: 'bg-yellow-100 text-yellow-700', icon: MessageSquare },
};

export default function AdminDashboardPage() {
  const [activityFilter, setActivityFilter] = useState<string>('all');
  const [realTimeMode, setRealTimeMode] = useState(false);

  // Datasets en attente de validation
  const pendingValidations = useMemo(() => {
    return allDatasets
      .filter(ds => ds.status === 'pending' || ds.status === 'draft')
      .slice(0, 10)
      .map(ds => ({
        ...ds,
        submittedAt: new Date(Date.now() - Math.random() * 7 * 24 * 60 * 60 * 1000), // Random date within last 7 days
      }));
  }, []);

  // Activités récentes filtrées
  const filteredActivities = useMemo(() => {
    let filtered = [...activities].sort((a, b) => 
      new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
    ).slice(0, 20);

    if (activityFilter !== 'all') {
      filtered = filtered.filter(act => act.type === activityFilter);
    }

    return filtered;
  }, [activityFilter]);

  // Utilisateurs récents
  const recentUsers = useMemo(() => {
    return [...users]
      .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
      .slice(0, 10);
  }, []);

  // Calcul des évolutions
  const downloadsEvolution = ((adminStats.downloadsThisMonth - adminStats.downloadsLastMonth) / adminStats.downloadsLastMonth * 100).toFixed(1);
  const viewsEvolution = ((adminStats.viewsThisMonth - adminStats.viewsLastMonth) / adminStats.viewsLastMonth * 100).toFixed(1);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-heading font-bold text-3xl">Dashboard Admin</h1>
          <p className="text-muted-foreground mt-1">
            Vue d'ensemble de la plateforme JDOM
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" asChild>
            <Link href="/admin/analytics">
              <TrendingUp className="mr-2 h-4 w-4" />
              Analytics
            </Link>
          </Button>
          <Button variant="outline" asChild>
            <Link href="/admin/validation">
              <Shield className="mr-2 h-4 w-4" />
              Validation
              {adminStats.pendingValidation > 0 && (
                <Badge className="ml-2 bg-red-500 text-white">
                  {adminStats.pendingValidation}
                </Badge>
              )}
            </Link>
          </Button>
        </div>
      </div>

      {/* KPI Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
        <KPICard
          title="Datasets Total"
          value={adminStats.totalDatasets}
          icon={Database}
          color="#14B14B"
          details={`${adminStats.publishedDatasets} publiés, ${adminStats.pendingValidation} en attente, ${adminStats.drafts} brouillons`}
          evolution={`+${adminStats.pendingValidation} en attente`}
          evolutionType="warning"
        />
        <KPICard
          title="Utilisateurs"
          value={adminStats.totalUsers.toLocaleString()}
          icon={UsersIcon}
          color="#FCD116"
          details={`${adminStats.organizationsCount} organisations, ${adminStats.citizensCount} citoyens`}
          evolution={`+${adminStats.newUsersThisMonth} ce mois`}
          evolutionType="success"
        />
        <KPICard
          title="Téléchargements"
          value={adminStats.totalDownloads.toLocaleString()}
          icon={Download}
          color="#14B14B"
          details={`${adminStats.downloadsThisMonth.toLocaleString()} ce mois`}
          evolution={`${downloadsEvolution > 0 ? '+' : ''}${downloadsEvolution}%`}
          evolutionType={parseFloat(downloadsEvolution) > 0 ? 'success' : 'error'}
        />
        <KPICard
          title="Trafic"
          value={adminStats.totalViews.toLocaleString()}
          icon={Eye}
          color="#CE1126"
          details={`${adminStats.viewsThisMonth.toLocaleString()} vues ce mois`}
          evolution={`${viewsEvolution > 0 ? '+' : ''}${viewsEvolution}%`}
          evolutionType={parseFloat(viewsEvolution) > 0 ? 'success' : 'error'}
          subtitle={`${adminStats.activeSessions} sessions actives`}
        />
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Line Chart - Évolution 12 mois */}
        <Card>
          <CardHeader>
            <CardTitle>Évolution 12 derniers mois</CardTitle>
          </CardHeader>
          <CardContent>
            <ChartContainer config={chartConfig}>
              <AreaChart data={monthlyData}>
                <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                <XAxis 
                  dataKey="month" 
                  tickLine={false}
                  axisLine={false}
                  tickMargin={8}
                />
                <YAxis 
                  tickLine={false}
                  axisLine={false}
                  tickMargin={8}
                />
                <ChartTooltip content={<ChartTooltipContent />} />
                <Area 
                  type="monotone" 
                  dataKey="downloads" 
                  stroke="#14B14B" 
                  fill="#14B14B" 
                  fillOpacity={0.2}
                  strokeWidth={2}
                />
                <Area 
                  type="monotone" 
                  dataKey="views" 
                  stroke="#FCD116" 
                  fill="#FCD116" 
                  fillOpacity={0.2}
                  strokeWidth={2}
                />
                <Area 
                  type="monotone" 
                  dataKey="users" 
                  stroke="#CE1126" 
                  fill="#CE1126" 
                  fillOpacity={0.2}
                  strokeWidth={2}
                />
                <ChartLegend content={<ChartLegendContent />} />
              </AreaChart>
            </ChartContainer>
          </CardContent>
        </Card>

        {/* Pie Chart - Datasets par thème */}
        <Card>
          <CardHeader>
            <CardTitle>Répartition par thème</CardTitle>
          </CardHeader>
          <CardContent>
            <ChartContainer config={chartConfig}>
              <PieChart>
                <Pie
                  data={datasetsByTheme}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  outerRadius={100}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {datasetsByTheme.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <ChartTooltip content={<ChartTooltipContent />} />
              </PieChart>
            </ChartContainer>
            <div className="mt-4 grid grid-cols-2 gap-2">
              {datasetsByTheme.map((theme, index) => (
                <div key={index} className="flex items-center gap-2 text-sm">
                  <div 
                    className="h-3 w-3 rounded-full" 
                    style={{ backgroundColor: theme.color }}
                  />
                  <span className="text-muted-foreground">{theme.name}</span>
                  <span className="ml-auto font-medium">{theme.value}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Datasets en Attente Validation */}
      {pendingValidations.length > 0 && (
        <Card className={pendingValidations.length > 10 ? 'border-red-500' : ''}>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="flex items-center gap-2">
                <AlertTriangle className="h-5 w-5 text-red-500" />
                Datasets en attente de validation
                {pendingValidations.length > 10 && (
                  <Badge className="bg-red-500 text-white">
                    {pendingValidations.length} en attente
                  </Badge>
                )}
              </CardTitle>
              <Button variant="outline" size="sm" asChild>
                <Link href="/admin/validation">
                  Voir tout
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {pendingValidations.slice(0, 5).map((dataset) => {
                const hoursAgo = Math.floor(
                  (Date.now() - dataset.submittedAt.getTime()) / (1000 * 60 * 60)
                );
                const isUrgent = hoursAgo > 72;
                const isWarning = hoursAgo > 24;

                return (
                  <div 
                    key={dataset.id} 
                    className={`
                      flex items-center justify-between p-4 border rounded-lg
                      ${isUrgent ? 'border-red-500 bg-red-50' : 
                        isWarning ? 'border-orange-500 bg-orange-50' : 
                        'border-green-500 bg-green-50'}
                    `}
                  >
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-3 mb-2">
                        <h4 className="font-semibold truncate">{dataset.title}</h4>
                        <Badge variant="secondary">{dataset.organization.name}</Badge>
                      </div>
                      <div className="flex items-center gap-4 text-sm text-muted-foreground">
                        <span className="flex items-center gap-1">
                          <Clock className="h-3 w-3" />
                          Soumis il y a {hoursAgo}h
                        </span>
                        <span className="flex items-center gap-1">
                          <FileText className="h-3 w-3" />
                          {dataset.files?.length || 1} fichier(s)
                        </span>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Button size="sm" variant="outline" asChild>
                        <Link href={`/admin/datasets/${dataset.id}`}>
                          <Eye className="h-4 w-4" />
                        </Link>
                      </Button>
                      <Button size="sm" className="bg-green-600 hover:bg-green-700">
                        <CheckCircle2 className="h-4 w-4 mr-1" />
                        Valider
                      </Button>
                      <Button size="sm" variant="destructive">
                        <XCircle className="h-4 w-4 mr-1" />
                        Rejeter
                      </Button>
                    </div>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Activité Récente */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Activité récente</CardTitle>
            <div className="flex items-center gap-2">
              <Select value={activityFilter} onValueChange={setActivityFilter}>
                <SelectTrigger className="w-[180px]">
                  <Filter className="mr-2 h-4 w-4" />
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Tous les types</SelectItem>
                  <SelectItem value="dataset_published">Datasets publiés</SelectItem>
                  <SelectItem value="dataset_updated">Datasets modifiés</SelectItem>
                  <SelectItem value="user_registered">Nouveaux utilisateurs</SelectItem>
                  <SelectItem value="dataset_downloaded">Téléchargements</SelectItem>
                  <SelectItem value="comment_posted">Commentaires</SelectItem>
                </SelectContent>
              </Select>
              <Button
                variant={realTimeMode ? 'default' : 'outline'}
                size="sm"
                onClick={() => setRealTimeMode(!realTimeMode)}
              >
                <Activity className="h-4 w-4 mr-2" />
                {realTimeMode ? 'Temps réel' : 'Statique'}
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Timestamp</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>Utilisateur</TableHead>
                  <TableHead>Action</TableHead>
                  <TableHead>Ressource</TableHead>
                  <TableHead>IP</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredActivities.map((activity) => {
                  const activityType = activityTypes[activity.type as keyof typeof activityTypes];
                  const ActivityIcon = activityType?.icon || Activity;
                  const timeAgo = Math.floor(
                    (Date.now() - new Date(activity.timestamp).getTime()) / (1000 * 60)
                  );

                  return (
                    <TableRow key={activity.id}>
                      <TableCell className="font-mono text-xs">
                        {timeAgo < 60 
                          ? `Il y a ${timeAgo}min`
                          : timeAgo < 1440
                          ? `Il y a ${Math.floor(timeAgo / 60)}h`
                          : new Date(activity.timestamp).toLocaleDateString('fr-FR')
                        }
                      </TableCell>
                      <TableCell>
                        <Badge className={activityType?.color || 'bg-gray-100 text-gray-700'}>
                          <ActivityIcon className="h-3 w-3 mr-1" />
                          {activityType?.label || activity.type}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        {activity.userName ? (
                          <div className="flex items-center gap-2">
                            <Avatar className="h-6 w-6">
                              <AvatarFallback className="text-xs">
                                {activity.userName.substring(0, 2).toUpperCase()}
                              </AvatarFallback>
                            </Avatar>
                            <span className="text-sm">{activity.userName}</span>
                          </div>
                        ) : (
                          <span className="text-sm text-muted-foreground">Anonyme</span>
                        )}
                      </TableCell>
                      <TableCell className="text-sm">{activity.description}</TableCell>
                      <TableCell>
                        {activity.datasetTitle ? (
                          <Link 
                            href={`/admin/datasets/${activity.datasetId}`}
                            className="text-sm text-primary hover:underline"
                          >
                            {activity.datasetTitle}
                          </Link>
                        ) : (
                          <span className="text-sm text-muted-foreground">-</span>
                        )}
                      </TableCell>
                      <TableCell className="font-mono text-xs text-muted-foreground">
                        {`192.168.${Math.floor(Math.random() * 255)}.${Math.floor(Math.random() * 255)}`}
                      </TableCell>
                      <TableCell>
                        <Button variant="ghost" size="icon">
                          <MoreVertical className="h-4 w-4" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      {/* Utilisateurs Récents & Statistiques Système */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Utilisateurs Récents */}
        <Card>
          <CardHeader>
            <CardTitle>Utilisateurs récents</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {recentUsers.map((user) => (
                <div 
                  key={user.id} 
                  className="flex items-center justify-between p-3 border rounded-lg hover:bg-muted/50"
                >
                  <div className="flex items-center gap-3">
                    <Avatar className="h-10 w-10">
                      <AvatarImage src={user.avatar} alt={user.name} />
                      <AvatarFallback className="bg-primary/10 text-primary">
                        {user.name?.substring(0, 2).toUpperCase() || 'U'}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-medium text-sm">{user.name}</p>
                      <p className="text-xs text-muted-foreground">{user.email}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge variant="secondary">
                      {user.type === 'organization' ? 'Organisation' : 
                       user.type === 'admin' ? 'Admin' : 'Citoyen'}
                    </Badge>
                    <Button variant="ghost" size="icon" asChild>
                      <Link href={`/admin/users/${user.id}`}>
                        <ArrowRight className="h-4 w-4" />
                      </Link>
                    </Button>
                  </div>
                </div>
              ))}
            </div>
            <Button variant="outline" className="w-full mt-4" asChild>
              <Link href="/admin/users">
                Voir tous les utilisateurs
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </CardContent>
        </Card>

        {/* Statistiques Système */}
        <Card>
          <CardHeader>
            <CardTitle>Statistiques système</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-3 border rounded-lg">
                <div className="flex items-center gap-3">
                  <Server className="h-5 w-5 text-green-500" />
                  <div>
                    <p className="font-medium text-sm">Santé API</p>
                    <p className="text-xs text-muted-foreground">Temps de réponse moyen</p>
                  </div>
                </div>
                <div className="text-right">
                  <Badge className="bg-green-500 text-white">Opérationnel</Badge>
                  <p className="text-xs text-muted-foreground mt-1">142ms</p>
                </div>
              </div>

              <div className="flex items-center justify-between p-3 border rounded-lg">
                <div className="flex items-center gap-3">
                  <Zap className="h-5 w-5 text-blue-500" />
                  <div>
                    <p className="font-medium text-sm">Uptime</p>
                    <p className="text-xs text-muted-foreground">Disponibilité</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-semibold">99.8%</p>
                  <p className="text-xs text-muted-foreground">30 derniers jours</p>
                </div>
              </div>

              <div className="flex items-center justify-between p-3 border rounded-lg">
                <div className="flex items-center gap-3">
                  <HardDrive className="h-5 w-5 text-purple-500" />
                  <div>
                    <p className="font-medium text-sm">Espace disque</p>
                    <p className="text-xs text-muted-foreground">Datasets stockés</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-semibold">2.4 GB / 10 GB</p>
                  <div className="w-24 h-2 bg-muted rounded-full mt-1">
                    <div 
                      className="h-2 bg-purple-500 rounded-full" 
                      style={{ width: '24%' }}
                    />
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-between p-3 border rounded-lg">
                <div className="flex items-center gap-3">
                  <Shield className="h-5 w-5 text-orange-500" />
                  <div>
                    <p className="font-medium text-sm">Backup</p>
                    <p className="text-xs text-muted-foreground">Dernier backup</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-semibold text-sm">Aujourd'hui 03:00</p>
                  <Badge variant="secondary" className="mt-1">Réussi</Badge>
                </div>
              </div>

              <div className="flex items-center justify-between p-3 border rounded-lg">
                <div className="flex items-center gap-3">
                  <AlertTriangle className="h-5 w-5 text-red-500" />
                  <div>
                    <p className="font-medium text-sm">Erreurs 24h</p>
                    <p className="text-xs text-muted-foreground">Erreurs système</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-semibold text-green-600">0</p>
                  <p className="text-xs text-muted-foreground">Aucune erreur</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

// Composant KPI Card amélioré
function KPICard({ 
  title, 
  value, 
  icon: Icon, 
  details, 
  color, 
  evolution,
  evolutionType,
  subtitle
}: { 
  title: string; 
  value: string | number; 
  icon: React.ElementType; 
  details: string; 
  color: string;
  evolution?: string;
  evolutionType?: 'success' | 'error' | 'warning';
  subtitle?: string;
}) {
  return (
    <Card>
      <CardContent className="p-6">
        <div className="flex items-start justify-between mb-4">
          <div className="space-y-1 flex-1">
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Icon className="h-4 w-4" />
              <span>{title}</span>
            </div>
            <h3 className="font-heading font-bold text-3xl">{value}</h3>
            {subtitle && (
              <p className="text-xs text-muted-foreground">{subtitle}</p>
            )}
          </div>
          <div 
            className="h-12 w-12 rounded-xl flex items-center justify-center flex-shrink-0" 
            style={{ backgroundColor: `${color}15` }}
          >
            <Icon className="h-6 w-6" style={{ color }} />
          </div>
        </div>
        
        <div className="space-y-2">
          <p className="text-sm text-muted-foreground">{details}</p>
          {evolution && (
            <div className="flex items-center gap-1">
              {evolutionType === 'success' && (
                <ArrowUp className="h-3 w-3 text-green-600" />
              )}
              {evolutionType === 'error' && (
                <ArrowDown className="h-3 w-3 text-red-600" />
              )}
              {evolutionType === 'warning' && (
                <AlertTriangle className="h-3 w-3 text-orange-600" />
              )}
              <span className={`text-xs font-medium ${
                evolutionType === 'success' ? 'text-green-600' :
                evolutionType === 'error' ? 'text-red-600' :
                'text-orange-600'
              }`}>
                {evolution}
              </span>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}

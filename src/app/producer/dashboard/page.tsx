'use client';

import { useMemo } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { allDatasets } from '@/lib/mock-data';
import { 
  Database, 
  Download, 
  Eye, 
  Star, 
  TrendingUp,
  ArrowUp,
  ArrowDown,
  Plus,
  FileText,
  Calendar
} from 'lucide-react';

// Mock producer stats
const producerStats = {
  totalDatasets: 12,
  totalDownloads: 45230,
  totalViews: 128500,
  averageRating: 4.5,
  newThisMonth: {
    datasets: 2,
    downloads: 1234,
    views: 5678,
  },
  downloadsTrend: '+15%',
  viewsTrend: '+12%',
  monthlyDownloads: [
    { month: 'Jan', count: 3200 },
    { month: 'Fév', count: 3800 },
    { month: 'Mar', count: 3500 },
    { month: 'Avr', count: 4200 },
    { month: 'Mai', count: 3900 },
    { month: 'Juin', count: 4500 },
    { month: 'Juil', count: 4800 },
    { month: 'Août', count: 5200 },
    { month: 'Sep', count: 4900 },
    { month: 'Oct', count: 5400 },
    { month: 'Nov', count: 5700 },
    { month: 'Déc', count: 5230 },
  ],
  datasetsByTheme: [
    { theme: 'Économie', count: 4, percentage: 33 },
    { theme: 'Éducation', count: 3, percentage: 25 },
    { theme: 'Santé', count: 2, percentage: 17 },
    { theme: 'Agriculture', count: 2, percentage: 17 },
    { theme: 'Autres', count: 1, percentage: 8 },
  ],
  recentActivities: [
    { id: 1, type: 'published', title: 'Indicateurs économiques publiés', time: 'Il y a 2 heures' },
    { id: 2, type: 'download', title: 'Téléchargement - Budget État 2024', time: 'Il y a 3 heures' },
    { id: 3, type: 'update', title: 'Mise à jour - Établissements scolaires', time: 'Il y a 5 heures' },
    { id: 4, type: 'comment', title: 'Nouveau commentaire - Centres de santé', time: 'Il y a 6 heures' },
    { id: 5, type: 'published', title: 'Recensement population publié', time: 'Hier' },
  ],
};

export default function ProducerDashboardPage() {
  const myDatasets = allDatasets.slice(0, 5);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-heading font-bold text-3xl">Dashboard</h1>
          <p className="text-muted-foreground">
            Bienvenue sur votre espace producteur
          </p>
        </div>
        <Button className="btn-primary">
          <Plus className="mr-2 h-5 w-5" />
          Publier un dataset
        </Button>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
        <KPICard
          title="Total Datasets"
          value={producerStats.totalDatasets}
          icon={Database}
          trend="+2 ce mois"
          trendUp
          color="#14B14B"
        />
        <KPICard
          title="Téléchargements"
          value={producerStats.totalDownloads.toLocaleString()}
          icon={Download}
          trend={producerStats.downloadsTrend}
          trendUp
          color="#FCD116"
        />
        <KPICard
          title="Vues ce mois"
          value={producerStats.newThisMonth.views.toLocaleString()}
          icon={Eye}
          trend={producerStats.viewsTrend}
          trendUp
          color="#14B14B"
        />
        <KPICard
          title="Note moyenne"
          value={producerStats.averageRating}
          icon={Star}
          subtitle="sur 87 avis"
          color="#FCD116"
        />
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Downloads Chart */}
        <Card>
          <CardHeader>
            <CardTitle>Téléchargements mensuels</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-64">
              {/* Simple Bar Chart Visualization */}
              <div className="flex items-end justify-between h-full gap-2 pt-4">
                {producerStats.monthlyDownloads.map((item, index) => {
                  const maxCount = Math.max(...producerStats.monthlyDownloads.map(d => d.count));
                  const height = (item.count / maxCount) * 100;
                  
                  return (
                    <div key={index} className="flex-1 flex flex-col items-center gap-2">
                      <div 
                        className="w-full rounded-t-lg transition-all hover:opacity-80 cursor-pointer"
                        style={{ 
                          height: `${height}%`,
                          backgroundColor: '#14B14B',
                          minHeight: '20px'
                        }}
                        title={`${item.count} téléchargements`}
                      />
                      <span className="text-xs text-muted-foreground">{item.month}</span>
                    </div>
                  );
                })}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Datasets by Theme */}
        <Card>
          <CardHeader>
            <CardTitle>Datasets par thème</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {producerStats.datasetsByTheme.map((item, index) => (
                <div key={index} className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span>{item.theme}</span>
                    <span className="font-medium">{item.count}</span>
                  </div>
                  <div className="h-2 bg-muted rounded-full overflow-hidden">
                    <div 
                      className="h-full rounded-full transition-all"
                      style={{ 
                        width: `${item.percentage}%`,
                        backgroundColor: index === 0 ? '#14B14B' : 
                                      index === 1 ? '#FCD116' :
                                      index === 2 ? '#CE1126' :
                                      '#6366f1'
                      }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Recent Datasets */}
      <Card>
        <CardHeader className="flex items-center justify-between">
          <CardTitle>Datasets récents</CardTitle>
          <Button variant="outline" size="sm" asChild>
            <Link href="/producer/datasets">
              Voir tout
              <TrendingUp className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {myDatasets.map((dataset) => (
              <div 
                key={dataset.id}
                className="flex items-start gap-4 p-4 border rounded-lg hover:bg-muted transition-colors cursor-pointer"
              >
                <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <FileText className="h-6 w-6 text-primary" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-2 mb-1">
                    <Link 
                      href={`/dataset/${dataset.id}`}
                      className="font-medium hover:text-primary transition-colors line-clamp-1"
                    >
                      {dataset.title}
                    </Link>
                    <Badge variant="outline">{dataset.status}</Badge>
                  </div>
                  <div className="flex items-center gap-4 text-sm text-muted-foreground">
                    <span>{dataset.theme.name}</span>
                    <span>•</span>
                    <span>{dataset.downloads.toLocaleString()} téléchargements</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Activity Feed */}
      <Card>
        <CardHeader>
          <CardTitle>Activité récente</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {producerStats.recentActivities.map((activity) => (
              <div key={activity.id} className="flex items-start gap-4">
                <div className={`
                  h-10 w-10 rounded-full flex items-center justify-center flex-shrink-0
                  ${activity.type === 'published' ? 'bg-green-100 text-green-700' :
                   activity.type === 'download' ? 'bg-blue-100 text-blue-700' :
                   activity.type === 'update' ? 'bg-purple-100 text-purple-700' :
                   'bg-yellow-100 text-yellow-700'}
                `}>
                  {activity.type === 'published' && <Database className="h-5 w-5" />}
                  {activity.type === 'download' && <Download className="h-5 w-5" />}
                  {activity.type === 'update' && <Calendar className="h-5 w-5" />}
                  {activity.type === 'comment' && <FileText className="h-5 w-5" />}
                </div>
                <div className="flex-1">
                  <p className="font-medium text-sm mb-1">{activity.title}</p>
                  <p className="text-xs text-muted-foreground">{activity.time}</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

function KPICard({ 
  title, 
  value, 
  icon: Icon, 
  trend, 
  trendUp, 
  subtitle,
  color 
}: { 
  title: string;
  value: string | number;
  icon: React.ElementType;
  trend?: string;
  trendUp?: boolean;
  subtitle?: string;
  color: string;
}) {
  return (
    <Card>
      <CardContent className="p-6">
        <div className="flex items-start justify-between">
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Icon className="h-4 w-4" />
              <span>{title}</span>
            </div>
            <div className="flex items-baseline gap-2">
              <h3 className="font-heading font-bold text-3xl">
                {value}
              </h3>
              {subtitle && (
                <span className="text-sm text-muted-foreground">{subtitle}</span>
              )}
            </div>
            {trend && (
              <div className={`flex items-center gap-1 text-sm ${trendUp ? 'text-green-600' : 'text-red-600'}`}>
                {trendUp ? (
                  <ArrowUp className="h-4 w-4" />
                ) : (
                  <ArrowDown className="h-4 w-4" />
                )}
                <span>{trend}</span>
              </div>
            )}
          </div>
          <div 
            className="h-12 w-12 rounded-xl flex items-center justify-center"
            style={{ backgroundColor: `${color}15` }}
          >
            <Icon className="h-6 w-6" style={{ color }} />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

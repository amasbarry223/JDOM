'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { allDatasets, themes } from '@/lib/mock-data';
import { 
  Download,
  Eye,
  Share2,
  Heart,
  Calendar,
  RefreshCw,
  Scale,
  FileText,
  MapPin,
  Star,
  TrendingUp,
  Database,
  Code,
  MessageSquare
} from 'lucide-react';

export default function DatasetDetailPage() {
  const params = useParams();
  const datasetId = params.id as string;
  
  const [isFavorite, setIsFavorite] = useState(false);
  
  const dataset = allDatasets.find(ds => ds.id === datasetId);
  
  if (!dataset) {
    return (
      <div className="flex flex-col min-h-screen">
        <Header />
        <main className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <Database className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
            <h2 className="font-heading font-bold text-2xl mb-2">Dataset non trouvé</h2>
            <p className="text-muted-foreground mb-4">
              Le jeu de données que vous recherchez n'existe pas ou a été supprimé.
            </p>
            <Button asChild>
              <Link href="/catalog">Retour au catalogue</Link>
            </Button>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  const { 
    title,
    description,
    organization,
    theme,
    formats,
    license,
    downloads,
    views,
    rating,
    ratingCount,
    spatialCoverage,
    temporalCoverage,
    publishedAt,
    updatedAt,
    updateFrequency,
    files,
    metadata,
    quality,
  } = dataset;

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      
      <main className="flex-1">
        {/* Hero Header */}
        <div className="border-b bg-muted/30">
          <div className="container mx-auto px-4 py-8">
            {/* Breadcrumb */}
            <div className="flex items-center gap-2 text-sm text-muted-foreground mb-6">
              <Link href="/" className="hover:text-primary">Accueil</Link>
              <span>/</span>
              <Link href="/catalog" className="hover:text-primary">Catalogue</Link>
              <span>/</span>
              <span className="text-foreground line-clamp-1">{title}</span>
            </div>

            {/* Header Content */}
            <div className="flex flex-col lg:flex-row gap-8">
              <div className="flex-1">
                {/* Theme Badge */}
                <Badge 
                  variant="secondary"
                  className="mb-4"
                  style={{ backgroundColor: `${theme.color}20`, color: theme.color }}
                >
                  {theme.name}
                </Badge>

                {/* Title */}
                <h1 className="font-heading font-bold text-3xl md:text-4xl mb-4">
                  {title}
                </h1>

                {/* Organization */}
                <Link 
                  href={`/organizations/${organization.id}`}
                  className="inline-flex items-center gap-2 mb-4 hover:opacity-80 transition-opacity"
                >
                  <Avatar className="h-6 w-6">
                    <AvatarImage src={organization.logo} alt={organization.name} />
                    <AvatarFallback>
                      {organization.name.substring(0, 2).toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                  <span className="font-medium">{organization.name}</span>
                  <Badge variant="outline" className="ml-2">
                    {organization.type}
                  </Badge>
                </Link>

                {/* Metadata */}
                <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground mb-6">
                  <div className="flex items-center gap-1.5">
                    <Calendar className="h-4 w-4" />
                    <span>Publié le {new Date(publishedAt).toLocaleDateString('fr-FR')}</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <RefreshCw className="h-4 w-4" />
                    <span>Mis à jour le {new Date(updatedAt).toLocaleDateString('fr-FR')}</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Scale className="h-4 w-4" />
                    <span>{license}</span>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {formats.map((format) => (
                      <Badge key={format} variant="outline" className="text-xs">
                        {format}
                      </Badge>
                    ))}
                  </div>
                </div>

                {/* Stats */}
                <div className="flex flex-wrap items-center gap-6 mb-6">
                  <div className="flex items-center gap-2">
                    <Download className="h-5 w-5 text-muted-foreground" />
                    <span className="font-semibold">{downloads.toLocaleString()}</span>
                    <span className="text-sm text-muted-foreground">téléchargements</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Eye className="h-5 w-5 text-muted-foreground" />
                    <span className="font-semibold">{views.toLocaleString()}</span>
                    <span className="text-sm text-muted-foreground">vues</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Star className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                    <span className="font-semibold">{rating}</span>
                    <span className="text-sm text-muted-foreground">({ratingCount} avis)</span>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex flex-wrap items-center gap-3">
                  <Button size="lg" className="btn-primary">
                    <Download className="mr-2 h-5 w-5" />
                    Télécharger
                  </Button>
                  <Button size="lg" variant="outline">
                    <Eye className="mr-2 h-5 w-5" />
                    Prévisualiser
                  </Button>
                  <Button size="lg" variant="outline">
                    <Code className="mr-2 h-5 w-5" />
                    API
                  </Button>
                  <Button
                    size="lg"
                    variant="ghost"
                    onClick={() => setIsFavorite(!isFavorite)}
                  >
                    <Heart 
                      className={`h-5 w-5 ${isFavorite ? 'fill-red-500 text-red-500' : ''}`} 
                    />
                  </Button>
                  <Button size="lg" variant="ghost">
                    <Share2 className="h-5 w-5" />
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="container mx-auto px-4 py-8">
          <Tabs defaultValue="overview" className="space-y-6">
            <TabsList className="grid grid-cols-2 md:grid-cols-6 lg:w-auto">
              <TabsTrigger value="overview">Aperçu</TabsTrigger>
              <TabsTrigger value="files">Fichiers</TabsTrigger>
              <TabsTrigger value="metadata">Métadonnées</TabsTrigger>
              <TabsTrigger value="visualizations">Visualisations</TabsTrigger>
              <TabsTrigger value="api">API</TabsTrigger>
              <TabsTrigger value="discussions">Discussions</TabsTrigger>
            </TabsList>

            {/* Overview Tab */}
            <TabsContent value="overview" className="space-y-6">
              {/* Description */}
              <Card>
                <CardHeader>
                  <CardTitle>Description</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm leading-relaxed">{description}</p>
                </CardContent>
              </Card>

              {/* Key Information */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <Card>
                  <CardContent className="p-6">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center">
                        <Calendar className="h-5 w-5 text-primary" />
                      </div>
                      <h3 className="font-semibold">Couverture temporelle</h3>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      {new Date(temporalCoverage.start).toLocaleDateString('fr-FR')} - {new Date(temporalCoverage.end).toLocaleDateString('fr-FR')}
                    </p>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="p-6">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center">
                        <MapPin className="h-5 w-5 text-primary" />
                      </div>
                      <h3 className="font-semibold">Couverture spatiale</h3>
                    </div>
                    <p className="text-sm text-muted-foreground">{spatialCoverage}</p>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="p-6">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center">
                        <RefreshCw className="h-5 w-5 text-primary" />
                      </div>
                      <h3 className="font-semibold">Fréquence de mise à jour</h3>
                    </div>
                    <p className="text-sm text-muted-foreground">{updateFrequency}</p>
                  </CardContent>
                </Card>
              </div>

              {/* Keywords */}
              <Card>
                <CardHeader>
                  <CardTitle>Mots-clés</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2">
                    {dataset.keywords.map((keyword) => (
                      <Badge key={keyword} variant="secondary" className="cursor-pointer hover:bg-primary hover:text-primary-foreground">
                        {keyword}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Quality Score */}
              <Card>
                <CardHeader>
                  <CardTitle>Qualité des données</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm font-medium">Score global</span>
                        <span className="text-sm font-bold">{quality.overall}/100</span>
                      </div>
                      <div className="h-2 bg-muted rounded-full overflow-hidden">
                        <div 
                          className="h-full bg-primary transition-all"
                          style={{ width: `${quality.overall}%` }}
                        />
                      </div>
                    </div>
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm font-medium">Complétude</span>
                        <span className="text-sm font-bold">{quality.completeness}/100</span>
                      </div>
                      <div className="h-2 bg-muted rounded-full overflow-hidden">
                        <div 
                          className="h-full bg-primary transition-all"
                          style={{ width: `${quality.completeness}%` }}
                        />
                      </div>
                    </div>
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm font-medium">Exactitude</span>
                        <span className="text-sm font-bold">{quality.accuracy}/100</span>
                      </div>
                      <div className="h-2 bg-muted rounded-full overflow-hidden">
                        <div 
                          className="h-full bg-primary transition-all"
                          style={{ width: `${quality.accuracy}%` }}
                        />
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Files Tab */}
            <TabsContent value="files">
              <Card>
                <CardHeader>
                  <CardTitle>Fichiers disponibles ({files.length})</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {files.map((file) => (
                      <div 
                        key={file.id}
                        className="flex items-start gap-4 p-4 border rounded-lg hover:bg-muted/50 transition-colors"
                      >
                        <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                          <FileText className="h-6 w-6 text-primary" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 mb-1">
                            <h3 className="font-semibold truncate">{file.name}</h3>
                            <Badge variant="outline">{file.format}</Badge>
                            {file.isPrimary && (
                              <Badge variant="secondary">Principal</Badge>
                            )}
                          </div>
                          <div className="flex items-center gap-4 text-sm text-muted-foreground">
                            <span>{(file.size / 1024 / 1024).toFixed(2)} MB</span>
                            {file.rows && (
                              <span>{file.rows.toLocaleString()} lignes × {file.columns} colonnes</span>
                            )}
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <Button size="sm" variant="outline">
                            <Eye className="h-4 w-4 mr-1" />
                            Aperçu
                          </Button>
                          <Button size="sm">
                            <Download className="h-4 w-4 mr-1" />
                            Télécharger
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Metadata Tab */}
            <TabsContent value="metadata">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Informations générales</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <h4 className="font-medium text-sm mb-1">Éditeur</h4>
                      <p className="text-sm text-muted-foreground">{metadata.publisher}</p>
                    </div>
                    <div>
                      <h4 className="font-medium text-sm mb-1">Langue</h4>
                      <p className="text-sm text-muted-foreground">{metadata.language}</p>
                    </div>
                    <div>
                      <h4 className="font-medium text-sm mb-1">Granularité</h4>
                      <p className="text-sm text-muted-foreground">{metadata.granularity}</p>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Contact</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <h4 className="font-medium text-sm mb-1">Email</h4>
                      <a 
                        href={`mailto:${metadata.contactEmail}`}
                        className="text-sm text-primary hover:underline"
                      >
                        {metadata.contactEmail}
                      </a>
                    </div>
                    {metadata.documentationUrl && (
                      <div>
                        <h4 className="font-medium text-sm mb-1">Documentation</h4>
                        <a 
                          href={metadata.documentationUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-sm text-primary hover:underline"
                        >
                          {metadata.documentationUrl}
                        </a>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            {/* Visualizations Tab */}
            <TabsContent value="visualizations">
              <Card>
                <CardContent className="p-12">
                  <div className="text-center">
                    <TrendingUp className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
                    <h3 className="font-heading font-semibold text-xl mb-2">
                      Visualisations automatiques
                    </h3>
                    <p className="text-muted-foreground mb-4 max-w-md mx-auto">
                      Les visualisations seront générées automatiquement en fonction des données du fichier principal.
                    </p>
                    <Button variant="outline">
                      Générer les visualisations
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* API Tab */}
            <TabsContent value="api">
              <Card>
                <CardHeader>
                  <CardTitle>API REST</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div>
                    <h4 className="font-medium mb-2">Endpoints disponibles</h4>
                    <div className="space-y-2">
                      <div className="p-3 bg-muted rounded-lg font-mono text-sm">
                        GET /api/v1/datasets/{datasetId}
                      </div>
                      <div className="p-3 bg-muted rounded-lg font-mono text-sm">
                        GET /api/v1/datasets/{datasetId}/files
                      </div>
                      <div className="p-3 bg-muted rounded-lg font-mono text-sm">
                        GET /api/v1/datasets/{datasetId}/download
                      </div>
                    </div>
                  </div>

                  <div>
                    <h4 className="font-medium mb-2">Exemple de réponse</h4>
                    <div className="p-4 bg-muted rounded-lg overflow-x-auto">
                      <pre className="text-sm">{JSON.stringify({
                        id: dataset.id,
                        title: dataset.title,
                        description: dataset.description.substring(0, 100) + '...',
                        organization: organization.name,
                        theme: theme.name,
                        files: files.length,
                        downloadCount: downloads,
                      }, null, 2)}</pre>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Discussions Tab */}
            <TabsContent value="discussions">
              <Card>
                <CardContent className="p-12">
                  <div className="text-center">
                    <MessageSquare className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
                    <h3 className="font-heading font-semibold text-xl mb-2">
                      Discussions
                    </h3>
                    <p className="text-muted-foreground mb-4 max-w-md mx-auto">
                      Posez des questions, partagez vos avis et discutez de l'utilisation de ces données.
                    </p>
                    <Button>Connexion requise pour participer</Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </main>

      <Footer />
    </div>
  );
}

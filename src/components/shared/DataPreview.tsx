'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { FileText, Download, Table, BarChart3, Map } from 'lucide-react';

interface DataPreviewProps {
  dataset: {
    id: string;
    title: string;
    files: Array<{
      id: string;
      name: string;
      format: string;
      size: number;
      columns?: number;
      rows?: number;
    }>;
  };
  onDownload?: (fileId: string) => void;
}

export function DataPreview({ dataset, onDownload }: DataPreviewProps) {
  const [activeTab, setActiveTab] = useState<'preview' | 'statistics' | 'json'>('preview');
  const [activeFile, setActiveFile] = useState(dataset.files[0]);

  if (!dataset.files.length) {
    return (
      <div className="p-8 text-center">
        <FileText className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
        <h3 className="font-semibold mb-2">Aucun fichier à prévisualiser</h3>
        <p className="text-sm text-muted-foreground">
          Ce dataset n'a pas encore de fichiers attachés
        </p>
      </div>
    );
  }

  const activeFileData = activeFile ? {
    headers: ['Colonne 1', 'Colonne 2', 'Colonne 3', 'Colonne 4', 'Colonne 5'],
    rows: [
      ['Donnée 1', 'Donnée 2', 'Donnée 3', 'Donnée 4', 'Donnée 5'],
      ['Donnée 6', 'Donnée 7', 'Donnée 8', 'Donnée 9', 'Donnée 10'],
      ['Donnée 11', 'Donnée 12', 'Donnée 13', 'Donnée 14', 'Donnée 15'],
    ]
  } : null;

  return (
    <div className="space-y-6">
      {/* File Selector */}
      <div className="flex items-center gap-4 p-4 bg-muted/30 rounded-lg">
        <span className="text-sm font-medium">Fichier:</span>
        <div className="flex gap-2">
          {dataset.files.map((file) => (
            <button
              key={file.id}
              onClick={() => setActiveFile(file)}
              className={`px-3 py-1.5 rounded-lg text-sm transition-colors ${
                activeFile?.id === file.id
                  ? 'bg-primary text-white'
                  : 'bg-background hover:bg-muted border'
              }`}
            >
              {file.name}
            </button>
          ))}
        </div>
        <Badge variant="outline">
          {activeFile?.format}
        </Badge>
      </div>

      {/* File Info */}
      {activeFile && (
        <div className="flex items-center justify-between p-4 border rounded-lg">
          <div className="flex items-center gap-4">
            <FileText className="h-5 w-5 text-muted-foreground" />
            <div>
              <p className="font-medium">{activeFile.name}</p>
              <p className="text-sm text-muted-foreground">
                {(activeFile.size / 1024).toFixed(2)} KB
                {activeFile.rows && ` • ${activeFile.rows.toLocaleString()} lignes x ${activeFile.columns} colonnes`}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Button size="sm" variant="outline" onClick={() => onDownload?.(activeFile.id)}>
              <Download className="h-4 w-4 mr-2" />
              Télécharger
            </Button>
          </div>
        </div>
      )}

      {/* Preview Tabs */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <span>Prévisualisation des Données</span>
            <div className="flex items-center gap-2">
              <Button size="sm" variant="outline" className="h-8">
                <Table className="h-4 w-4 mr-2" />
                Vue table
              </Button>
              <Button size="sm" variant="outline" className="h-8">
                <BarChart3 className="h-4 w-4 mr-2" />
                Visualisations
              </Button>
              <Button size="sm" variant="outline" className="h-8">
                <Map className="h-4 w-4 mr-2" />
                Carte
              </Button>
            </div>
          </CardTitle>
        </CardHeader>

        <CardContent>
          <Tabs value={activeTab} onValueChange={(v) => setActiveTab(v as any)}>
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="preview">Table</TabsTrigger>
              <TabsTrigger value="statistics">Statistiques</TabsTrigger>
              <TabsTrigger value="json">JSON</TabsTrigger>
            </TabsList>

            {/* Table Preview */}
            <TabsContent value="preview">
              {activeFileData ? (
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead className="bg-muted">
                      <tr>
                        <th className="px-4 py-3 text-left font-medium">ID</th>
                        {activeFileData.headers.map((header, i) => (
                          <th key={i} className="px-4 py-3 text-left font-medium">{header}</th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {activeFileData.rows.map((row, rowIndex) => (
                        <tr key={rowIndex} className="border-b">
                          <td className="px-4 py-2 font-mono text-xs text-muted-foreground">{rowIndex + 1}</td>
                          {row.map((cell, cellIndex) => (
                            <td key={cellIndex} className="px-4 py-2 font-mono text-xs">
                              {cell}
                            </td>
                          ))}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ) : (
                <div className="p-12 text-center">
                  <p className="text-muted-foreground">
                    Aperçu non disponible pour ce format de fichier
                  </p>
                </div>
              )}
            </TabsContent>

            {/* Statistics */}
            <TabsContent value="statistics">
              <div className="space-y-6">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="p-4 border rounded-lg">
                    <p className="text-xs text-muted-foreground mb-1">Colonnes</p>
                    <p className="text-2xl font-bold">{activeFile?.columns || '-'}</p>
                  </div>
                  <div className="p-4 border rounded-lg">
                    <p className="text-xs text-muted-foreground mb-1">Lignes</p>
                    <p className="text-2xl font-bold">
                      {activeFile?.rows?.toLocaleString() || '-'}
                    </p>
                  </div>
                  <div className="p-4 border rounded-lg">
                    <p className="text-xs text-muted-foreground mb-1">Taille</p>
                    <p className="text-2xl font-bold">
                      {(activeFile?.size / 1024).toFixed(2)} KB
                    </p>
                  </div>
                  <div className="p-4 border rounded-lg">
                    <p className="text-xs text-muted-foreground mb-1">Format</p>
                    <p className="text-lg font-bold">{activeFile?.format || '-'}</p>
                  </div>
                </div>

                <div className="p-4 border rounded-lg bg-muted/30">
                  <h4 className="font-semibold mb-3">Types de données</h4>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Numérique</span>
                      <Badge variant="outline">3 colonnes</Badge>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Texte</span>
                      <Badge variant="outline">1 colonne</Badge>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Date</span>
                      <Badge variant="outline">1 colonne</Badge>
                    </div>
                  </div>
                </div>
              </div>
            </TabsContent>

            {/* JSON Preview */}
            <TabsContent value="json">
              <div className="bg-muted/30 rounded-lg p-6">
                <pre className="text-xs overflow-x-auto">
                  {JSON.stringify({
                    dataset: dataset.id,
                    title: dataset.title,
                    file: activeFile,
                    preview: activeFileData,
                  }, null, 2)}
                </pre>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
}

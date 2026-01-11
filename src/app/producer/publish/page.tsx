'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { themes } from '@/lib/mock-data';
import { 
  ChevronRight,
  ChevronLeft,
  Check,
  Upload,
  FileText,
  AlertCircle,
  Calendar,
  MapPin,
  RefreshCw
} from 'lucide-react';

type Step = 1 | 2 | 3 | 4;

export default function PublishDatasetPage() {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState<Step>(1);
  
  // Form state
  const [formData, setFormData] = useState({
    // Step 1
    title: '',
    description: '',
    theme: '',
    keywords: '',
    license: 'CC-BY-4.0',
    startDate: '',
    endDate: '',
    updateFrequency: 'Annuel',
    // Step 2
    files: [] as Array<{ name: string; format: string; size: number }>,
    // Step 3
    spatialCoverage: 'National',
    regions: [] as string[],
    qualityScore: 80,
    methodology: '',
    contactEmail: '',
    // Step 4
    publishNow: true,
    acceptTerms: false,
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const steps = [
    { number: 1, title: 'Informations', description: 'Données générales' },
    { number: 2, title: 'Fichiers', description: 'Upload de données' },
    { number: 3, title: 'Métadonnées', description: 'Informations avancées' },
    { number: 4, title: 'Révision', description: 'Validation & publication' },
  ];

  const nextStep = () => {
    if (currentStep < 4) setCurrentStep(currentStep + 1);
  };

  const prevStep = () => {
    if (currentStep > 1) setCurrentStep(currentStep - 1);
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // Show success and redirect
    router.push('/producer/dashboard?published=true');
  };

  const progress = (currentStep / 4) * 100;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-heading font-bold text-3xl">Publier un Dataset</h1>
          <p className="text-muted-foreground">
            Créez et publiez un nouveau jeu de données
          </p>
        </div>
        <Button variant="outline" asChild>
          <Link href="/producer/dashboard">
            Annuler
          </Link>
        </Button>
      </div>

      {/* Progress Bar */}
      <Card>
        <CardContent className="p-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium">Étape {currentStep} sur 4</span>
            <span className="text-sm text-muted-foreground">{progress}%</span>
          </div>
          <Progress value={progress} className="h-2" />
          <div className="flex items-center justify-between mt-4">
            {steps.map((step) => (
              <div 
                key={step.number}
                className={`
                  flex items-center gap-2
                  ${step.number <= currentStep ? 'text-primary' : 'text-muted-foreground'}
                `}
              >
                <div className={`
                  h-8 w-8 rounded-full flex items-center justify-center border-2 transition-colors
                  ${step.number <= currentStep 
                    ? 'border-primary bg-primary/10' 
                    : 'border-muted'
                  }
                `}>
                  {step.number < currentStep ? (
                    <Check className="h-4 w-4" />
                  ) : step.number === currentStep ? (
                    <span className="font-bold">{step.number}</span>
                  ) : (
                    <span className="text-xs">{step.number}</span>
                  )}
                </div>
                <div className="space-y-1">
                  <p className="font-medium text-sm">{step.title}</p>
                  <p className="text-xs text-muted-foreground">{step.description}</p>
                </div>
                {step.number < 4 && (
                  <ChevronRight className="h-5 w-5 text-muted-foreground" />
                )}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Form Content */}
      <Card>
        <CardContent className="p-6">
          {/* Step 1: Informations Générales */}
          {currentStep === 1 && (
            <form className="space-y-6" onSubmit={(e) => { e.preventDefault(); nextStep(); }}>
              <div className="space-y-4">
                <h3 className="font-heading font-semibold text-lg flex items-center gap-2">
                  <span className="h-8 w-8 rounded-full gradient-mali flex items-center justify-center text-white text-sm font-bold">1</span>
                  Informations Générales
                </h3>

                <div className="space-y-2">
                  <Label htmlFor="title">Titre du dataset *</Label>
                  <Input
                    id="title"
                    placeholder="Ex: Établissements scolaires 2024"
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    required
                  />
                  <p className="text-xs text-muted-foreground">
                    Minimum 10 caractères
                  </p>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="description">Description *</Label>
                  <Textarea
                    id="description"
                    placeholder="Décrivez le contenu et l'utilité de ce dataset..."
                    rows={5}
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    required
                  />
                  <p className="text-xs text-muted-foreground">
                    Minimum 100 caractères recommandés
                  </p>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="theme">Thème *</Label>
                  <Select value={formData.theme} onValueChange={(value) => setFormData({ ...formData, theme: value })}>
                    <SelectTrigger>
                      <SelectValue placeholder="Sélectionnez un thème" />
                    </SelectTrigger>
                    <SelectContent>
                      {themes.map((theme) => (
                        <SelectItem key={theme.id} value={theme.id}>
                          {theme.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="keywords">Mots-clés</Label>
                  <Input
                    id="keywords"
                    placeholder="éducation, écoles, effectifs (séparés par virgules)"
                    value={formData.keywords}
                    onChange={(e) => setFormData({ ...formData, keywords: e.target.value })}
                  />
                  <p className="text-xs text-muted-foreground">
                    Séparez les mots-clés par des virgules
                  </p>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="license">Licence *</Label>
                  <Select value={formData.license} onValueChange={(value) => setFormData({ ...formData, license: value })}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="CC-BY-4.0">CC-BY 4.0 (Attribution)</SelectItem>
                      <SelectItem value="CC-BY-SA-4.0">CC-BY-SA 4.0 (Attribution - Partage)</SelectItem>
                      <SelectItem value="CC-Zero">CC Zero (Public Domain)</SelectItem>
                      <SelectItem value="ODbL">ODbL (Open Database License)</SelectItem>
                      <SelectItem value="LO-FR-1.0">Licence Ouverte v2.0 (France)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="flex justify-end gap-3 pt-4 border-t">
                <Button type="submit" className="btn-primary">
                  Suivant
                  <ChevronRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
            </form>
          )}

          {/* Step 2: Fichiers */}
          {currentStep === 2 && (
            <form className="space-y-6" onSubmit={(e) => { e.preventDefault(); nextStep(); }}>
              <div className="space-y-4">
                <h3 className="font-heading font-semibold text-lg flex items-center gap-2">
                  <span className="h-8 w-8 rounded-full gradient-mali flex items-center justify-center text-white text-sm font-bold">2</span>
                  Fichiers & Données
                </h3>

                {/* Upload Zone */}
                <div className="border-2 border-dashed rounded-lg p-12 text-center hover:border-primary transition-colors cursor-pointer">
                  <Upload className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                  <p className="font-medium mb-2">
                    Glissez-déposez vos fichiers ici
                  </p>
                  <p className="text-sm text-muted-foreground mb-4">
                    ou cliquez pour parcourir
                  </p>
                  <Button variant="outline" type="button">
                    Sélectionner des fichiers
                  </Button>
                  <p className="text-xs text-muted-foreground mt-4">
                    Formats acceptés: CSV, JSON, Excel, GeoJSON, Shapefile (Max 50MB par fichier)
                  </p>
                </div>

                {/* Uploaded Files List */}
                {formData.files.length > 0 && (
                  <div className="space-y-3">
                    <h4 className="font-medium">Fichiers uploadés</h4>
                    {formData.files.map((file, index) => (
                      <div key={index} className="flex items-center gap-3 p-4 border rounded-lg">
                        <FileText className="h-8 w-8 text-muted-foreground" />
                        <div className="flex-1">
                          <p className="font-medium">{file.name}</p>
                          <p className="text-sm text-muted-foreground">
                            {file.format} • {(file.size / 1024 / 1024).toFixed(2)} MB
                          </p>
                        </div>
                        <Badge variant="outline">{file.format}</Badge>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              <div className="flex justify-between pt-4 border-t">
                <Button type="button" variant="outline" onClick={prevStep}>
                  <ChevronLeft className="mr-2 h-4 w-4" />
                  Précédent
                </Button>
                <Button type="submit" className="btn-primary">
                  Suivant
                  <ChevronRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
            </form>
          )}

          {/* Step 3: Métadonnées Avancées */}
          {currentStep === 3 && (
            <form className="space-y-6" onSubmit={(e) => { e.preventDefault(); nextStep(); }}>
              <div className="space-y-4">
                <h3 className="font-heading font-semibold text-lg flex items-center gap-2">
                  <span className="h-8 w-8 rounded-full gradient-mali flex items-center justify-center text-white text-sm font-bold">3</span>
                  Métadonnées Avancées
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="spatial">Couverture spatiale *</Label>
                    <Select value={formData.spatialCoverage} onValueChange={(value) => setFormData({ ...formData, spatialCoverage: value })}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="National">National</SelectItem>
                        <SelectItem value="Régional">Régional</SelectItem>
                        <SelectItem value="Local">Local</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="frequency">Fréquence de mise à jour *</Label>
                    <Select value={formData.updateFrequency} onValueChange={(value) => setFormData({ ...formData, updateFrequency: value })}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Ponctuel">Ponctuel</SelectItem>
                        <SelectItem value="Quotidien">Quotidien</SelectItem>
                        <SelectItem value="Hebdomadaire">Hebdomadaire</SelectItem>
                        <SelectItem value="Mensuel">Mensuel</SelectItem>
                        <SelectItem value="Trimestriel">Trimestriel</SelectItem>
                        <SelectItem value="Annuel">Annuel</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="methodology">Méthodologie de collecte</Label>
                  <Textarea
                    id="methodology"
                    placeholder="Décrivez comment les données ont été collectées..."
                    rows={3}
                    value={formData.methodology}
                    onChange={(e) => setFormData({ ...formData, methodology: e.target.value })}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="contact">Email de contact</Label>
                  <Input
                    id="contact"
                    type="email"
                    placeholder="contact@organisation.ml"
                    value={formData.contactEmail}
                    onChange={(e) => setFormData({ ...formData, contactEmail: e.target.value })}
                  />
                </div>
              </div>

              <div className="flex justify-between pt-4 border-t">
                <Button type="button" variant="outline" onClick={prevStep}>
                  <ChevronLeft className="mr-2 h-4 w-4" />
                  Précédent
                </Button>
                <Button type="submit" className="btn-primary">
                  Suivant
                  <ChevronRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
            </form>
          )}

          {/* Step 4: Révision & Publication */}
          {currentStep === 4 && (
            <form className="space-y-6" onSubmit={handleSubmit}>
              <div className="space-y-4">
                <h3 className="font-heading font-semibold text-lg flex items-center gap-2">
                  <span className="h-8 w-8 rounded-full gradient-mali flex items-center justify-center text-white text-sm font-bold">4</span>
                  Révision & Publication
                </h3>

                {/* Summary */}
                <div className="space-y-4 p-6 bg-muted/50 rounded-lg">
                  <div className="flex items-start gap-3">
                    <FileText className="h-5 w-5 text-primary mt-0.5" />
                    <div className="flex-1">
                      <p className="font-medium">Informations générales</p>
                      <p className="text-sm text-muted-foreground mt-1">
                        {formData.title || 'Non renseigné'}
                      </p>
                    </div>
                    <Badge variant="outline">{formData.license}</Badge>
                  </div>

                  <div className="flex items-start gap-3">
                    <Upload className="h-5 w-5 text-primary mt-0.5" />
                    <div className="flex-1">
                      <p className="font-medium">Fichiers</p>
                      <p className="text-sm text-muted-foreground mt-1">
                        {formData.files.length > 0 
                          ? `${formData.files.length} fichier(s) uploadé(s)` 
                          : 'Aucun fichier uploadé'}
                        </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <Calendar className="h-5 w-5 text-primary mt-0.5" />
                    <div className="flex-1">
                      <p className="font-medium">Couverture temporelle</p>
                      <p className="text-sm text-muted-foreground mt-1">
                        {formData.startDate || 'Non renseigné'}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <MapPin className="h-5 w-5 text-primary mt-0.5" />
                    <div className="flex-1">
                      <p className="font-medium">Couverture spatiale</p>
                      <p className="text-sm text-muted-foreground mt-1">
                        {formData.spatialCoverage}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <RefreshCw className="h-5 w-5 text-primary mt-0.5" />
                    <div className="flex-1">
                      <p className="font-medium">Fréquence de mise à jour</p>
                      <p className="text-sm text-muted-foreground mt-1">
                        {formData.updateFrequency}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Validation Checklist */}
                <div className="space-y-3">
                  <h4 className="font-medium flex items-center gap-2">
                    <Check className="h-5 w-5 text-green-500" />
                    Validation
                  </h4>
                  <div className="space-y-2 ml-7">
                    <div className="flex items-center gap-2 text-sm">
                      <Check className="h-4 w-4 text-green-500" />
                      <span>Titre et description renseignés</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <Check className="h-4 w-4 text-green-500" />
                      <span>Thème sélectionné</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <Check className="h-4 w-4 text-green-500" />
                      <span>Licence définie</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <Check className="h-4 w-4 text-green-500" />
                      <span>Fichier(s) uploadé(s)</span>
                    </div>
                  </div>
                </div>

                {/* Terms */}
                <div className="space-y-3">
                  <div className="flex items-start gap-3">
                    <Checkbox
                      id="terms"
                      checked={formData.acceptTerms}
                      onCheckedChange={(checked) => setFormData({ ...formData, acceptTerms: checked as boolean })}
                    />
                    <Label htmlFor="terms" className="text-sm font-normal leading-relaxed">
                      J'accepte que ce dataset sera publié sous la licence{' '}
                      <span className="font-medium">{formData.license}</span>
                      {' '}et je certifie avoir les droits de publication.
                    </Label>
                  </div>
                </div>
              </div>

              <div className="flex justify-between pt-4 border-t">
                <Button type="button" variant="outline" onClick={prevStep}>
                  <ChevronLeft className="mr-2 h-4 w-4" />
                  Précédent
                </Button>
                <div className="flex gap-3">
                  <Button type="button" variant="outline">
                    Sauvegarder en brouillon
                  </Button>
                  <Button 
                    type="submit" 
                    className="btn-primary"
                    disabled={!formData.acceptTerms || isSubmitting}
                  >
                    {isSubmitting ? 'Publication...' : 'Publier le dataset'}
                    <ChevronRight className="ml-2 h-4 w-4" />
                  </Button>
                </div>
              </div>
            </form>
          )}
        </CardContent>
      </Card>
    </div>
  );
}

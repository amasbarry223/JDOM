'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Settings, Save } from 'lucide-react';

export default function AdminSettingsPage() {
  const [activeTab, setActiveTab] = useState('general');

  return (
    <div className="p-6 space-y-6">
      <h1 className="font-heading font-bold text-3xl">Paramètres Administrateur</h1>
      <p className="text-muted-foreground mb-6">
        Configurez les paramètres généraux de la plateforme
      </p>

      <Card>
        <CardContent className="p-4">
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="grid w-full grid-cols-2 md:grid-cols-4">
              <TabsTrigger value="general">Général</TabsTrigger>
              <TabsTrigger value="appearance">Apparence</TabsTrigger>
              <TabsTrigger value="email">Email</TabsTrigger>
              <TabsTrigger value="api">API</TabsTrigger>
              <TabsTrigger value="security">Sécurité</TabsTrigger>
            </TabsList>

            <TabsContent value="general">
              <div className="space-y-4">
                <h3 className="font-semibold text-lg mb-4">Informations générales</h3>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">Nom du site</label>
                    <input 
                      type="text"
                      defaultValue="JDOM - Mali Open Data"
                      className="w-full max-w-md px-3 py-2 border rounded-lg"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">URL du site</label>
                    <input 
                      type="text"
                      defaultValue="https://jdom.ml"
                      className="w-full max-w-md px-3 py-2 border rounded-lg"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Email admin</label>
                    <input 
                      type="email"
                      defaultValue="admin@jdom.ml"
                      className="w-full max-w-md px-3 py-2 border rounded-lg"
                    />
                  </div>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="email">
              <div className="space-y-4">
                <h3 className="font-semibold text-lg mb-4">Configuration Email</h3>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">Serveur SMTP</label>
                    <input 
                      type="text"
                      placeholder="smtp.mailjet.com"
                      className="w-full max-w-md px-3 py-2 border rounded-lg"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Port SMTP</label>
                    <input 
                      type="number"
                      placeholder="587"
                      className="w-full max-w-md px-3 py-2 border rounded-lg"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Utilisateur SMTP</label>
                    <input 
                      type="text"
                      placeholder="apikey@mailjet.com"
                      className="w-full max-w-md px-3 py-2 border rounded-lg"
                    />
                  </div>
                </div>
                <Button className="w-full btn-primary mt-6">
                  <Settings className="mr-2 h-4 w-4" />
                  Tester configuration SMTP
                </Button>
              </div>
            </TabsContent>

            <TabsContent value="api">
              <div className="space-y-4">
                <h3 className="font-semibold text-lg mb-4">Configuration API</h3>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">Production Key</label>
                    <input 
                      type="text"
                      defaultValue="jdom_prod_xxxxxxxxxxxx"
                      className="w-full max-w-md px-3 py-2 border rounded-lg"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Development Key</label>
                    <input 
                      type="text"
                      defaultValue="jdom_dev_xxxxxxxxxxxx"
                      className="w-full max-w-md px-3 py-2 border rounded-lg"
                    />
                  </div>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="security">
              <div className="space-y-4">
                <h3 className="font-semibold text-lg mb-4">Sécurité</h3>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">Longueur minimale du mot de passe</label>
                    <input 
                      type="number"
                      defaultValue="8"
                      className="w-full max-w-md px-3 py-2 border rounded-lg"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Durée de session</label>
                    <select className="w-full max-w-md px-3 py-2 border rounded-lg">
                      <option>1 heure</option>
                      <option>24 heures</option>
                      <option>7 jours</option>
                      <option>30 jours</option>
                    </select>
                  </div>
                </div>
              </div>
            </TabsContent>
          </Tabs>

          <div className="flex justify-end pt-6 border-t">
            <Button size="lg" className="btn-primary">
              <Save className="mr-2 h-5 w-5" />
              Enregistrer les modifications
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

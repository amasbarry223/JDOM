'use client';

import { useState } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { toast } from '@/hooks/use-toast';
import { Copy, Check, Share2 } from 'lucide-react';

interface ShareModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  description?: string;
  url?: string;
}

export function ShareModal({ isOpen, onClose, title, description, url }: ShareModalProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    if (url) {
      try {
        await navigator.clipboard.writeText(url);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
        
        toast({
          title: "Copié",
          description: "L'URL a été copiée dans le presse-papier",
        });
      } catch (error) {
        toast({
          title: "Erreur",
          description: "Impossible de copier l'URL",
          variant: "destructive",
        });
      }
    }
  };

  const shareLinks = [
    {
      name: 'LinkedIn',
      icon: '🔗',
      url: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url || '')}`,
    },
    {
      name: 'Twitter',
      icon: '🐦',
      url: `https://twitter.com/intent/tweet?text=${encodeURIComponent(`${title} - ${url || ''}`)}`,
    },
    {
      name: 'Facebook',
      icon: '📘',
      url: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url || '')}`,
    },
    {
      name: 'Email',
      icon: '📧',
      url: `mailto:?subject=${encodeURIComponent(title)}&body=${encodeURIComponent(`${description}\n\n${url || ''}`)}`,
    },
  ];

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Share2 className="h-5 w-5 text-primary" />
            Partager ce Dataset
          </DialogTitle>
          <DialogDescription>
            Partagez ce dataset via les réseaux sociaux ou copiez le lien
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6 py-4">
          {/* Copy Link */}
          <div className="space-y-3">
            <Label htmlFor="share-url">Lien direct</Label>
            <div className="flex gap-2">
              <Input
                id="share-url"
                value={url || ''}
                readOnly
                className="flex-1 font-mono text-sm"
              />
              <Button
                type="button"
                variant="outline"
                size="icon"
                onClick={handleCopy}
              >
                {copied ? (
                  <Check className="h-4 w-4 text-green-500" />
                ) : (
                  <Copy className="h-4 w-4" />
                )}
              </Button>
            </div>
          </div>

          {/* Share Buttons */}
          <div>
            <Label className="mb-3">Réseaux sociaux</Label>
            <div className="grid grid-cols-2 gap-3">
              {shareLinks.map((link, index) => (
                <a
                  key={index}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 p-4 border rounded-lg hover:border-primary hover:bg-primary/5 transition-all"
                >
                  <span className="text-2xl">{link.icon}</span>
                  <span className="font-medium">{link.name}</span>
                </a>
              ))}
            </div>
          </div>

          {/* Embed Code */}
          <div className="space-y-3">
            <Label htmlFor="embed-code">Code d'intégration</Label>
            <div className="space-y-2">
              <Input
                id="embed-code"
                value={`<iframe src="${url}" width="100%" height="500" frameborder="0"></iframe>`}
                readOnly
                className="font-mono text-xs"
              />
              <Button
                type="button"
                variant="outline"
                size="icon"
                onClick={handleCopy}
                className="w-full"
              >
                {copied ? (
                  <Check className="h-4 w-4 text-green-500 mr-2" />
                ) : (
                  <Copy className="h-4 w-4 mr-2" />
                )}
                Copier le code
              </Button>
            </div>
          </div>
        </div>

        <DialogFooter>
          <Button type="button" variant="outline" onClick={onClose}>
            Fermer
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Search, Database, FilterX } from 'lucide-react';

interface EmptyStateProps {
  type?: 'no-data' | 'no-results' | 'no-favorites' | 'error';
  title?: string;
  description?: string;
  actionText?: string;
  onAction?: () => void;
  className?: string;
}

const emptyStateConfig = {
  'no-data': {
    icon: Database,
    defaultTitle: 'Aucune donnée disponible',
    defaultDescription: 'Il n\'y a pas encore de données à afficher pour le moment.',
  },
  'no-results': {
    icon: Search,
    defaultTitle: 'Aucun résultat trouvé',
    defaultDescription: 'Aucun jeu de données ne correspond à votre recherche. Essayez avec d\'autres critères.',
  },
  'no-favorites': {
    icon: Database,
    defaultTitle: 'Aucun favori',
    defaultDescription: 'Vous n\'avez pas encore ajouté de favoris. Explorez le catalogue pour trouver des données qui vous intéressent.',
  },
  'error': {
    icon: FilterX,
    defaultTitle: 'Une erreur est survenue',
    defaultDescription: 'Une erreur inattendue s\'est produite. Veuillez réessayer plus tard.',
  },
};

export function EmptyState({
  type = 'no-data',
  title,
  description,
  actionText,
  onAction,
  className,
}: EmptyStateProps) {
  const config = emptyStateConfig[type];
  const Icon = config.icon;

  return (
    <div className={cn('flex flex-col items-center justify-center py-16 px-4 text-center', className)}>
      <div className="mb-4">
        <div className="h-20 w-20 rounded-full bg-muted flex items-center justify-center mx-auto">
          <Icon className="h-10 w-10 text-muted-foreground" />
        </div>
      </div>
      
      <h3 className="font-heading font-semibold text-lg mb-2">
        {title || config.defaultTitle}
      </h3>
      
      <p className="text-sm text-muted-foreground max-w-md mb-6">
        {description || config.defaultDescription}
      </p>
      
      {actionText && onAction && (
        <Button onClick={onAction} className="btn-primary">
          {actionText}
        </Button>
      )}
    </div>
  );
}

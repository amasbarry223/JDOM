import { motion, AnimatePresence } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import type { Dataset } from '@/types';
import { Download, Eye, Star, BarChart3, MapPin, Calendar, FileText } from 'lucide-react';

// Motion variants
const cardVariants = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -20 },
};

const hoverVariants = {
  rest: { scale: 1 },
  hover: { scale: 1.02 },
};

const badgeVariants = {
  initial: { opacity: 0, scale: 0.8 },
  animate: { opacity: 1, scale: 1 },
};

export function AnimatedDatasetCard({ dataset }: { dataset: Dataset }) {
  return (
    <motion.div
      variants={cardVariants}
      initial="initial"
      animate="animate"
      exit="exit"
      transition={{ duration: 0.3 }}
      className="w-full"
    >
      <motion.div
        whileHover="hover"
        variants={hoverVariants}
        transition={{ duration: 0.2 }}
      >
        <Card className="card-hover h-full">
          <CardHeader className="pb-3">
            <div className="flex items-start justify-between gap-2 mb-3">
              <motion.div
                variants={badgeVariants}
                initial="initial"
                animate="animate"
                transition={{ delay: 0.1 }}
              >
                <div 
                  className="flex items-center gap-1.5 px-2 py-1 rounded-lg text-sm font-medium"
                  style={{ 
                    backgroundColor: `${dataset.theme.color}20`,
                    color: dataset.theme.color 
                  }}
                  aria-label={`Thème: ${dataset.theme.name}`}
                >
                  <FileText className="h-3.5 w-3.5" />
                  <span>{dataset.theme.name}</span>
                </div>
              </motion.div>
            </div>
            
            <motion.h3 
              className="font-heading font-semibold text-lg leading-snug hover:text-primary transition-colors line-clamp-2"
              whileHover={{ scale: 1.02 }}
              transition={{ type: "spring", stiffness: 400, damping: 10 }}
            >
              {dataset.title}
            </motion.h3>
            
            <motion.p 
              className="text-sm text-muted-foreground line-clamp-3 mt-2"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              {dataset.description}
            </motion.p>
          </CardHeader>
          
          <CardContent className="flex-1">
            <motion.div 
              className="flex items-center gap-2 mb-3"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              <div className="h-6 w-6 rounded-full bg-primary/10" aria-hidden="true">
                <img 
                  src={dataset.organization.logo} 
                  alt={dataset.organization.name}
                  className="h-6 w-6 rounded-full object-cover"
                  loading="lazy"
                />
              </div>
              <span className="text-xs text-muted-foreground" aria-label={`Organisation: ${dataset.organization.name}`}>
                {dataset.organization.name}
              </span>
            </motion.div>
            
            <motion.div 
              className="flex flex-wrap gap-2 mb-3"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              aria-label={`Formats: ${dataset.formats.join(', ')}`}
            >
              {dataset.formats.slice(0, 3).map((format) => (
                <motion.span
                  key={format}
                  variants={badgeVariants}
                  className="px-2 py-1 text-xs border rounded-md"
                  whileHover={{ scale: 1.1 }}
                >
                  {format}
                </motion.span>
              ))}
            </motion.div>
            
            <motion.div 
              className="flex items-center gap-4 text-xs text-muted-foreground mb-3"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
            >
              <motion.div 
                className="flex items-center gap-1"
                whileHover={{ x: 2 }}
              >
                <Download className="h-3 w-3" aria-hidden="true" />
                <span aria-label={`${dataset.downloads} téléchargements`}>
                  {dataset.downloads.toLocaleString()}
                </span>
              </motion.div>
              
              <motion.div 
                className="flex items-center gap-1"
                whileHover={{ x: 2 }}
              >
                <Eye className="h-3 w-3" aria-hidden="true" />
                <span aria-label={`${dataset.views} vues`}>
                  {dataset.views.toLocaleString()}
                </span>
              </motion.div>
              
              <motion.div 
                className="flex items-center gap-1"
                whileHover={{ x: 2 }}
              >
                <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" aria-hidden="true" />
                <span className="font-medium" aria-label={`Note: ${dataset.rating}/5`}>
                  {dataset.rating}
                </span>
                <span className="text-muted-foreground" aria-label={`${dataset.ratingCount} avis`}>
                  ({dataset.ratingCount})
                </span>
              </motion.div>
            </motion.div>
            
            <motion.div 
              className="flex items-center gap-4 text-xs text-muted-foreground"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
            >
              <div className="flex items-center gap-1" aria-label={`Couverture spatiale: ${dataset.spatialCoverage}`}>
                <MapPin className="h-3 w-3" aria-hidden="true" />
                <span className="line-clamp-1">{dataset.spatialCoverage}</span>
              </div>
              
              <div className="flex items-center gap-1" aria-label={`Date de publication: ${new Date(dataset.publishedAt).toLocaleDateString('fr-FR')}`}>
                <Calendar className="h-3 w-3" aria-hidden="true" />
                <span>{new Date(dataset.publishedAt).toLocaleDateString('fr-FR')}</span>
              </div>
            </motion.div>
          </CardContent>
          
          <CardFooter className="pt-3">
            <motion.div 
              className="w-full"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.7 }}
            >
              <motion.button
                className="w-full btn-primary"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                aria-label={`Voir les détails de ${dataset.title}`}
              >
                Voir les détails
              </motion.button>
            </motion.div>
          </CardFooter>
        </Card>
      </motion.div>
    </motion.div>
  );
}

// Theme Card with animations
export function AnimatedThemeCard({ 
  theme, 
  onClick 
}: { 
  theme: { id: string; name: string; color: string; icon: string; datasetsCount: number };
  onClick: () => void; 
}) {
  return (
    <motion.div
      variants={cardVariants}
      initial="initial"
      animate="animate"
      exit="exit"
      transition={{ duration: 0.3 }}
      className="w-full"
    >
      <motion.div
        whileHover="hover"
        variants={hoverVariants}
        transition={{ duration: 0.2 }}
        onClick={onClick}
        role="button"
        tabIndex={0}
        aria-label={`Thème ${theme.name}, ${theme.datasetsCount} datasets`}
        onKeyDown={(e) => e.key === 'Enter' && onClick()}
        className="cursor-pointer"
      >
        <Card className="group">
          <CardContent className="p-6">
            <motion.div 
              className="h-14 w-14 rounded-2xl mb-4 mx-auto flex items-center justify-center transition-colors group-hover:scale-110"
              style={{ backgroundColor: `${theme.color}20` }}
              variants={badgeVariants}
              initial="initial"
              animate="animate"
              transition={{ delay: 0.1 }}
              aria-hidden="true"
            >
              <span className="text-3xl" style={{ color: theme.color }}>
                {theme.icon}
              </span>
            </motion.div>
            
            <motion.h3 
              className="font-heading font-bold text-xl text-center mb-2"
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 400, damping: 10 }}
            >
              {theme.name}
            </motion.h3>
            
            <motion.p 
              className="text-center text-sm text-muted-foreground"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              aria-label={`${theme.datasetsCount} datasets disponibles`}
            >
              {theme.datasetsCount} datasets
            </motion.p>
          </CardContent>
        </Card>
      </motion.div>
    </motion.div>
  );
}

// Organization Card with animations
export function AnimatedOrganizationCard({ 
  organization, 
  onClick 
}: { 
  organization: { id: string; name: string; logo: string; type: string; datasetsCount: number; totalDownloads: number };
  onClick: () => void; 
}) {
  return (
    <motion.div
      variants={cardVariants}
      initial="initial"
      animate="animate"
      exit="exit"
      transition={{ duration: 0.3 }}
      className="w-full"
    >
      <motion.div
        whileHover="hover"
        variants={hoverVariants}
        transition={{ duration: 0.2 }}
        onClick={onClick}
        role="button"
        tabIndex={0}
        aria-label={`Organisation ${organization.name}, ${organization.datasetsCount} datasets, ${organization.totalDownloads} téléchargements`}
        onKeyDown={(e) => e.key === 'Enter' && onClick()}
        className="cursor-pointer"
      >
        <Card className="group">
          <CardContent className="p-4">
            <motion.div 
              className="flex items-center gap-3 mb-3"
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 }}
            >
              <motion.div 
                className="h-12 w-12 rounded-full overflow-hidden ring-2 ring-background transition-all group-hover:ring-primary"
                whileHover={{ scale: 1.05 }}
              >
                <img 
                  src={organization.logo} 
                  alt={organization.name}
                  className="h-full w-full object-cover"
                  loading="lazy"
                />
              </motion.div>
              
              <div className="flex-1 min-w-0">
                <motion.h3 
                  className="font-heading font-semibold text-base mb-1"
                  whileHover={{ scale: 1.02 }}
                >
                  {organization.name}
                </motion.h3>
                <p className="text-xs text-muted-foreground" aria-label={`Type: ${organization.type}`}>
                  {organization.type}
                </p>
              </div>
            </motion.div>
            
            <motion.div 
              className="flex items-center gap-4 pt-3 border-t"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              <div className="flex items-center gap-1" aria-label={`${organization.datasetsCount} datasets`}>
                <BarChart3 className="h-4 w-4 text-muted-foreground" aria-hidden="true" />
                <span className="font-semibold">{organization.datasetsCount}</span>
                <span className="text-xs text-muted-foreground">datasets</span>
              </div>
              
              <div className="flex items-center gap-1" aria-label={`${organization.totalDownloads} téléchargements`}>
                <Download className="h-4 w-4 text-muted-foreground" aria-hidden="true" />
                <span className="font-semibold">{organization.totalDownloads.toLocaleString()}</span>
                <span className="text-xs text-muted-foreground">téléchargements</span>
              </div>
            </motion.div>
          </CardContent>
        </Card>
      </motion.div>
    </motion.div>
  );
}

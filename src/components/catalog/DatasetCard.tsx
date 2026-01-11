'use client';

import Link from 'next/link';
import Image from 'next/image';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { cn } from '@/lib/utils';
import type { Dataset, Theme } from '@/types';
import { 
  Download, 
  Eye, 
  Star, 
  TrendingUp,
  MapPin,
  Calendar,
  FileText,
  Heart,
  GraduationCap,
  Leaf,
  Truck,
  Wheat,
  Users,
  DollarSign
} from 'lucide-react';

interface DatasetCardProps {
  dataset: Dataset;
  showRank?: boolean;
  rank?: number;
  className?: string;
}

export function DatasetCard({ dataset, showRank, rank, className }: DatasetCardProps) {
  const {
    id,
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
    publishedAt,
    updateFrequency,
  } = dataset;

  const getThemeIcon = (theme: Theme) => {
    const icons: Record<string, React.ReactNode> = {
      'TrendingUp': <TrendingUp className="h-4 w-4" />,
      'Heart': <Heart className="h-4 w-4" />,
      'GraduationCap': <GraduationCap className="h-4 w-4" />,
      'Leaf': <Leaf className="h-4 w-4" />,
      'Truck': <Truck className="h-4 w-4" />,
      'Wheat': <Wheat className="h-4 w-4" />,
      'Users': <Users className="h-4 w-4" />,
      'DollarSign': <DollarSign className="h-4 w-4" />,
    };
    return icons[theme.icon] || <FileText className="h-4 w-4" />;
  };

  return (
    <Card className={cn('card-hover flex flex-col h-full', className)}>
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between gap-2 mb-3">
          {/* Rank Badge */}
          {showRank && rank && (
            <Badge 
              variant="secondary" 
              className="bg-[#14B14B] text-white"
            >
              #{rank}
            </Badge>
          )}
          
          {/* Theme Badge */}
          <Badge 
            variant="secondary"
            className="ml-auto"
            style={{ backgroundColor: `${theme.color}20`, color: theme.color }}
          >
            <div className="flex items-center gap-1.5">
              {getThemeIcon(theme)}
              <span>{theme.name}</span>
            </div>
          </Badge>
        </div>
        
        {/* Title */}
        <Link href={`/dataset/${id}`}>
          <h3 className="font-heading font-semibold text-lg leading-snug hover:text-primary transition-colors line-clamp-2">
            {title}
          </h3>
        </Link>
        
        {/* Description */}
        <p className="text-sm text-muted-foreground line-clamp-3 mt-2">
          {description}
        </p>
      </CardHeader>
      
      <CardContent className="flex-1">
        {/* Organization */}
        <div className="flex items-center gap-2 mb-3">
          <Avatar className="h-6 w-6">
            <AvatarImage src={organization.logo} alt={organization.name} />
            <AvatarFallback className="text-xs">
              {organization.name.substring(0, 2).toUpperCase()}
            </AvatarFallback>
          </Avatar>
          <span className="text-xs text-muted-foreground">
            {organization.name}
          </span>
        </div>
        
        {/* Metadata */}
        <div className="flex flex-wrap gap-2 mb-3">
          {formats.slice(0, 3).map((format) => (
            <Badge key={format} variant="outline" className="text-xs">
              {format}
            </Badge>
          ))}
        </div>
        
        {/* Stats */}
        <div className="flex items-center gap-4 text-xs text-muted-foreground mb-3">
          <div className="flex items-center gap-1">
            <Download className="h-3 w-3" />
            <span>{downloads.toLocaleString()}</span>
          </div>
          <div className="flex items-center gap-1">
            <Eye className="h-3 w-3" />
            <span>{views.toLocaleString()}</span>
          </div>
          <div className="flex items-center gap-1">
            <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
            <span>{rating}</span>
            <span className="text-muted-foreground">({ratingCount})</span>
          </div>
        </div>
        
        {/* Additional Info */}
        <div className="flex items-center gap-4 text-xs text-muted-foreground">
          <div className="flex items-center gap-1">
            <MapPin className="h-3 w-3" />
            <span className="line-clamp-1">{spatialCoverage}</span>
          </div>
          <div className="flex items-center gap-1">
            <Calendar className="h-3 w-3" />
            <span>{new Date(publishedAt).toLocaleDateString('fr-FR')}</span>
          </div>
        </div>
      </CardContent>
      
      <CardFooter className="pt-3">
        <Button asChild className="w-full btn-primary">
          <Link href={`/dataset/${id}`}>
            Voir les détails
          </Link>
        </Button>
      </CardFooter>
    </Card>
  );
}

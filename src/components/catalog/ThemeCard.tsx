'use client';

import Link from 'next/link';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import type { Theme } from '@/types';
import {
  TrendingUp,
  Heart,
  GraduationCap,
  Leaf,
  Truck,
  Wheat,
  Users,
  DollarSign,
} from 'lucide-react';

interface ThemeCardProps {
  theme: Theme;
  className?: string;
}

const themeIcons: Record<string, React.ElementType> = {
  'TrendingUp': TrendingUp,
  'Heart': Heart,
  'GraduationCap': GraduationCap,
  'Leaf': Leaf,
  'Truck': Truck,
  'Wheat': Wheat,
  'Users': Users,
  'DollarSign': DollarSign,
};

export function ThemeCard({ theme, className }: ThemeCardProps) {
  const Icon = themeIcons[theme.icon] || TrendingUp;

  return (
    <Link href={`/themes/${theme.slug}`}>
      <Card 
        className={cn(
          'card-hover p-6 cursor-pointer h-full',
          'border-2 transition-all duration-300',
          className
        )}
        style={{ borderColor: `${theme.color}30` }}
      >
        <div className="flex flex-col items-center text-center gap-4 h-full">
          {/* Icon */}
          <div 
            className="h-16 w-16 rounded-2xl flex items-center justify-center transition-all duration-300"
            style={{ backgroundColor: `${theme.color}15` }}
          >
            <Icon 
              className="h-8 w-8 transition-colors duration-300"
              style={{ color: theme.color }}
            />
          </div>
          
          {/* Name */}
          <h3 className="font-heading font-semibold text-lg">
            {theme.name}
          </h3>
          
          {/* Description */}
          <p className="text-sm text-muted-foreground line-clamp-2">
            {theme.description}
          </p>
          
          {/* Count Badge */}
          <Badge 
            variant="secondary"
            className="mt-auto"
            style={{ backgroundColor: `${theme.color}15`, color: theme.color }}
          >
            {theme.datasetsCount} datasets
          </Badge>
        </div>
      </Card>
    </Link>
  );
}

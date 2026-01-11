export function slugify(text: string): string {
  return text
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-+|-+$/g, '');
}

export function formatDate(date: Date | string, locale: string = 'fr-FR'): string {
  const d = typeof date === 'string' ? new Date(date) : date;
  return d.toLocaleDateString(locale, {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}

export function formatNumber(num: number, locale: string = 'fr-FR'): string {
  return new Intl.NumberFormat(locale).format(num);
}

export function formatBytes(bytes: number): string {
  if (bytes === 0) return '0 Bytes';
  
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  
  return Math.round((bytes / Math.pow(k, i)) * 100) / 100 + ' ' + sizes[i];
}

export function debounce<T extends (...args: any[]) => any>(
  func: T,
  wait: number
): (...args: Parameters<T>) => void {
  let timeout: NodeJS.Timeout | null = null;
  
  return (...args: Parameters<T>) => {
    if (timeout) {
      clearTimeout(timeout);
    }
    
    timeout = setTimeout(() => {
      func(...args);
    }, wait);
  };
}

export function truncate(text: string, maxLength: number): string {
  if (text.length <= maxLength) return text;
  return text.substring(0, maxLength) + '...';
}

export function getInitials(name: string): string {
  return name
    .split(' ')
    .map(word => word.charAt(0).toUpperCase())
    .join('')
    .substring(0, 2);
}

export function getRandomColor(): string {
  const colors = [
    '#14B14B', '#FCD116', '#CE1126',
    '#6366f1', '#8b5cf6', '#ec4899',
    '#f59e0b', '#f97316', '#ef4444',
  ];
  return colors[Math.floor(Math.random() * colors.length)];
}

export function highlightText(text: string, query: string): string {
  if (!query) return text;
  
  const regex = new RegExp(`(${query})`, 'gi');
  return text.replace(regex, '<mark class="bg-yellow-200 text-yellow-800 rounded px-0.5">$1</mark>');
}

export function calculateRelevance(dataset: any, query: string): number {
  if (!query) return 0;
  
  const queryLower = query.toLowerCase();
  let score = 0;

  // Title match (highest weight)
  if (dataset.title.toLowerCase().includes(queryLower)) {
    score += 100;
    if (dataset.title.toLowerCase().startsWith(queryLower)) {
      score += 50; // Exact match bonus
    }
  }

  // Description match
  if (dataset.description && dataset.description.toLowerCase().includes(queryLower)) {
    score += 50;
  }

  // Keywords match
  if (dataset.keywords && Array.isArray(dataset.keywords)) {
    dataset.keywords.forEach((kw: string) => {
      if (kw.toLowerCase().includes(queryLower)) {
        score += 30;
      }
    });
  }

  // Organization match
  if (dataset.organization?.name?.toLowerCase().includes(queryLower)) {
    score += 40;
  }

  return score;
}

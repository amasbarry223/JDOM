'use client';

import { Component, ReactNode } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { AlertTriangle, RefreshCw, ArrowRight, Home, Bug } from 'lucide-react';

interface ErrorBoundaryProps {
  children: ReactNode;
  fallback?: ReactNode;
}

interface ErrorState {
  hasError: boolean;
  error: Error | null;
  errorInfo: React.ErrorInfo | null;
}

export class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorState> {
  state: ErrorState = {
    hasError: false,
    error: null,
    errorInfo: null,
  };

  static getDerivedStateFromError(error: Error): ErrorState {
    return {
      hasError: true,
      error,
      errorInfo: null,
    };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    this.setState({
      error,
      errorInfo,
    });
  }

  render() {
    if (this.state.hasError) {
      return this.props.fallback || <ErrorFallback error={this.state.error} />;
    }

    return this.props.children;
  }
}

function ErrorFallback({ error }: { error: Error | null }) {
  const handleReset = () => {
    window.location.reload();
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-muted/30 p-4">
      <Card className="w-full max-w-md border-red-500">
        <CardContent className="p-6 text-center space-y-6">
          <div className="h-16 w-16 rounded-full bg-red-100 flex items-center justify-center mx-auto mb-4">
            <Bug className="h-8 w-8 text-red-600" />
          </div>

          <h2 className="font-heading font-bold text-2xl mb-2">
            Oops! Une erreur s'est produite
          </h2>
          <p className="text-muted-foreground">
            Désolé pour l'inconvenient. Une erreur inattendue s'est produite.
          </p>

          {error && (
            <div className="p-4 bg-red-50 rounded-lg text-left">
              <p className="text-sm font-medium text-red-800 mb-2">
                {error.name}
              </p>
              <p className="text-sm text-red-700">
                {error.message}
              </p>
            </div>
          )}

          <div className="flex flex-col gap-3">
            <Button onClick={handleReset} className="w-full btn-primary">
              <RefreshCw className="mr-2 h-4 w-4" />
              Rafraîchir la page
            </Button>
            <Button variant="outline" asChild className="w-full">
              <a href="/">
                <Home className="mr-2 h-4 w-4" />
                Retour à l'accueil
              </a>
            </Button>
          </div>

          <div className="p-4 bg-muted rounded-lg text-left">
            <p className="text-sm font-medium mb-2">
              Besoin d'aide ?
            </p>
            <p className="text-sm text-muted-foreground mb-4">
              Si le problème persiste, veuillez contacter l'administrateur ou signaler l'erreur.
            </p>
            <Button variant="outline" size="sm" className="w-full">
              <a href="mailto:admin@jdom.ml?subject=Erreur JDOM">
                <ArrowRight className="mr-2 h-4 w-4" />
                Contacter le support
              </a>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

// Loading Components
export function LoadingState({ 
  message = 'Chargement...', 
  fullScreen = false,
  size = 'default' 
}: { 
  message?: string; 
  fullScreen?: boolean; 
  size?: 'sm' | 'default' | 'lg';
}) {
  const sizeClasses = {
    sm: 'h-4 w-4 border-2',
    default: 'h-8 w-8 border-3',
    lg: 'h-12 w-12 border-4',
  };

  if (fullScreen) {
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-background/80 backdrop-blur-sm z-50">
        <div className="text-center space-y-4">
          <div className="relative">
            <div className={`rounded-full border-2 border-primary border-t-transparent ${sizeClasses[size]} animate-spin`} />
            <div className="absolute inset-0 rounded-full border-2 border-transparent animate-pulse" />
          </div>
          <p className="text-sm text-muted-foreground">{message}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex items-center gap-3">
      <div className={`rounded-full border-2 border-primary border-t-transparent ${sizeClasses[size]} animate-spin`} />
      <p className="text-sm text-muted-foreground">{message}</p>
    </div>
  );
}

export function SkeletonLoader({ 
  className = '',
  count = 1 
}: { 
  className?: string;
  count?: number;
}) {
  return (
    <div className="space-y-2">
      {Array.from({ length: count }).map((_, index) => (
        <div
          key={index}
          className={`h-12 bg-muted/50 rounded-lg animate-pulse ${className}`}
          style={{ animationDelay: `${index * 100}ms` }}
        />
      ))}
    </div>
  );
}

export function InlineLoading({ small = false }: { small?: boolean }) {
  const size = small ? 'h-4 w-4' : 'h-6 w-6';

  return (
    <div className={`rounded-full border-2 border-primary border-t-transparent ${size} animate-spin`} />
  );
}

// Error Components
export function ErrorMessage({ 
  title, 
  message, 
  onRetry,
  onDismiss 
}: { 
  title: string;
  message: string;
  onRetry?: () => void;
  onDismiss?: () => void;
}) {
  return (
    <div className="p-4 bg-destructive/10 border border-destructive/20 rounded-lg flex items-start gap-3">
      <AlertTriangle className="h-5 w-5 text-destructive flex-shrink-0 mt-0.5" />
      <div className="flex-1 min-w-0">
        <h4 className="font-semibold text-sm mb-1">{title}</h4>
        <p className="text-sm text-muted-foreground">{message}</p>
      </div>
      <div className="flex gap-2 flex-shrink-0">
        {onRetry && (
          <Button variant="outline" size="sm" onClick={onRetry}>
            <RefreshCw className="h-4 w-4" />
          </Button>
        )}
        {onDismiss && (
          <Button variant="ghost" size="icon" onClick={onDismiss}>
            ×
          </Button>
        )}
      </div>
    </div>
  );
}

export function WarningMessage({ message }: { message: string }) {
  return (
    <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-lg flex items-start gap-3">
      <AlertTriangle className="h-5 w-5 text-yellow-600 flex-shrink-0 mt-0.5" />
      <p className="text-sm text-yellow-800">{message}</p>
    </div>
  );
}

export function SuccessMessage({ message }: { message: string }) {
  return (
    <div className="p-4 bg-green-50 border border-green-200 rounded-lg flex items-start gap-3">
      <div className="h-5 w-5 rounded-full bg-green-500 flex items-center justify-center flex-shrink-0 mt-0.5">
        <svg className="h-3 w-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
        </svg>
      </div>
      <p className="text-sm text-green-800">{message}</p>
    </div>
  );
}

// Empty State Components
export function EmptyDataState({ 
  title = 'Aucune donnée trouvée',
  description = 'Aucune donnée n\'est disponible pour le moment.',
  action,
  icon 
}: { 
  title?: string;
  description?: string;
  action?: { label: string; onClick: () => void };
  icon?: React.ReactNode;
}) {
  return (
    <div className="flex flex-col items-center justify-center p-12 text-center">
      {icon || (
        <div className="h-16 w-16 rounded-full bg-muted flex items-center justify-center mb-6">
          <svg className="h-8 w-8 text-muted-foreground" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M20 13V6a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2v7m16 0v1a2 2 0 0 0-2-2h-8a2 2 0 0 0-2-2v-1m0 0h-4v2.5M18 10h-4v-5" />
          </svg>
        </div>
      )}
      
      <h3 className="font-heading font-semibold text-xl mb-2">{title}</h3>
      <p className="text-muted-foreground mb-6 max-w-md">{description}</p>
      
      {action && (
        <Button onClick={action.onClick} variant="outline" className="btn-primary">
          {action.label}
        </Button>
      )}
    </div>
  );
}

export function LoadingDataState({ message = 'Chargement des données...' }: { message?: string }) {
  return (
    <div className="flex flex-col items-center justify-center p-12">
      <LoadingState message={message} size="lg" />
      <p className="text-sm text-muted-foreground mt-4">
        Veuillez patienter pendant que nous chargeons vos données
      </p>
    </div>
  );
}

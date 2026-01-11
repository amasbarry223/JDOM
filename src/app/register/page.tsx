'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useAuthStore } from '@/lib/stores/authStore';
import { 
  Mail, 
  Lock, 
  User, 
  Building2,
  Phone,
  Check,
  AlertCircle,
  Shield
} from 'lucide-react';

type UserType = 'citizen' | 'organization';

export default function RegisterPage() {
  const router = useRouter();
  const { login } = useAuthStore();
  
  const [userType, setUserType] = useState<UserType>('citizen');
  const [name, setName] = useState('');
  const [organizationName, setOrganizationName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [organizationType, setOrganizationType] = useState('');
  const [acceptTerms, setAcceptTerms] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const passwordStrength = calculatePasswordStrength(password);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    // Validation
    if (password !== confirmPassword) {
      setError('Les mots de passe ne correspondent pas');
      return;
    }

    if (passwordStrength.score < 3) {
      setError('Le mot de passe doit contenir au moins 8 caractères');
      return;
    }

    if (!acceptTerms) {
      setError('Vous devez accepter les conditions d\'utilisation');
      return;
    }

    setIsSubmitting(true);

    try {
      // Simulate registration
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Auto-login after registration
      await login(email, password);
      setSuccess(true);
      
      setTimeout(() => {
        router.push('/');
      }, 1500);
    } catch (err) {
      setError('Une erreur est survenue lors de l\'inscription');
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      
      <main className="flex-1 flex items-center justify-center bg-muted/30 py-12 px-4">
        <div className="w-full max-w-2xl">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center h-16 w-16 rounded-2xl gradient-mali mb-4 mx-auto">
              <User className="h-8 w-8 text-white" />
            </div>
            <h1 className="font-heading font-bold text-3xl mb-2">Créer un compte</h1>
            <p className="text-muted-foreground">
              Rejoignez la communauté JDOM et accédez aux données ouvertes du Mali
            </p>
          </div>

          {/* Register Card */}
          <Card>
            <CardHeader>
              <CardTitle>Création de compte</CardTitle>
              <CardDescription>
                Choisissez votre type de compte et remplissez le formulaire
              </CardDescription>
            </CardHeader>

            <CardContent>
              {/* Success Message */}
              {success && (
                <div className="flex items-center gap-2 p-4 bg-green-50 text-green-700 rounded-lg mb-6">
                  <Check className="h-5 w-5" />
                  <p>Compte créé avec succès ! Redirection...</p>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Error Message */}
                {error && (
                  <div className="flex items-start gap-2 p-3 bg-destructive/10 text-destructive rounded-lg text-sm">
                    <AlertCircle className="h-5 w-5 flex-shrink-0 mt-0.5" />
                    <p>{error}</p>
                  </div>
                )}

                {/* User Type Tabs */}
                <Tabs value={userType} onValueChange={(value) => setUserType(value as UserType)}>
                  <TabsList className="grid w-full grid-cols-2">
                    <TabsTrigger value="citizen" className="flex items-center gap-2">
                      <User className="h-4 w-4" />
                      Citoyen
                    </TabsTrigger>
                    <TabsTrigger value="organization" className="flex items-center gap-2">
                      <Building2 className="h-4 w-4" />
                      Organisation
                    </TabsTrigger>
                  </TabsList>

                  <TabsContent value="citizen" className="space-y-4 mt-6">
                    <div className="space-y-2">
                      <Label htmlFor="citizen-name">Nom complet *</Label>
                      <div className="relative">
                        <User className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                        <Input
                          id="citizen-name"
                          placeholder="Votre nom complet"
                          className="pl-10"
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                          required
                          disabled={isSubmitting}
                        />
                      </div>
                    </div>
                  </TabsContent>

                  <TabsContent value="organization" className="space-y-4 mt-6">
                    <div className="space-y-2">
                      <Label htmlFor="org-name">Nom de l'organisation *</Label>
                      <div className="relative">
                        <Building2 className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                        <Input
                          id="org-name"
                          placeholder="Nom de votre organisation"
                          className="pl-10"
                          value={organizationName}
                          onChange={(e) => setOrganizationName(e.target.value)}
                          required
                          disabled={isSubmitting}
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="org-type">Type d'organisation *</Label>
                      <Select value={organizationType} onValueChange={setOrganizationType} required>
                        <SelectTrigger>
                          <SelectValue placeholder="Sélectionnez le type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="ministry">Ministère</SelectItem>
                          <SelectItem value="agency">Agence</SelectItem>
                          <SelectItem value="institute">Institut</SelectItem>
                          <SelectItem value="municipality">Mairie/Commune</SelectItem>
                          <SelectItem value="ngo">ONG</SelectItem>
                          <SelectItem value="company">Entreprise</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </TabsContent>
                </Tabs>

                {/* Email */}
                <div className="space-y-2">
                  <Label htmlFor="email">Email *</Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                    <Input
                      id="email"
                      type="email"
                      placeholder="vous@exemple.com"
                      className="pl-10"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      disabled={isSubmitting}
                    />
                  </div>
                </div>

                {/* Phone */}
                <div className="space-y-2">
                  <Label htmlFor="phone">Téléphone</Label>
                  <div className="relative">
                    <Phone className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                    <Input
                      id="phone"
                      type="tel"
                      placeholder="+223 XX XX XX XX"
                      className="pl-10"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      disabled={isSubmitting}
                    />
                  </div>
                </div>

                {/* Password */}
                <div className="space-y-2">
                  <Label htmlFor="password">Mot de passe *</Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                    <Input
                      id="password"
                      type="password"
                      placeholder="•••••••••"
                      className="pl-10"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                      disabled={isSubmitting}
                    />
                  </div>
                  
                  {/* Password Strength Indicator */}
                  {password && (
                    <div className="mt-2">
                      <div className="flex gap-1 mb-2">
                        {[1, 2, 3, 4, 5].map((level) => (
                          <div
                            key={level}
                            className="h-1 flex-1 rounded-full transition-colors"
                            style={{
                              backgroundColor: passwordStrength.score >= level
                                ? passwordStrength.color
                                : '#e2e8f0'
                            }}
                          />
                        ))}
                      </div>
                      <p className="text-xs text-muted-foreground">
                        {passwordStrength.text}
                      </p>
                    </div>
                  )}
                </div>

                {/* Confirm Password */}
                <div className="space-y-2">
                  <Label htmlFor="confirm-password">Confirmer le mot de passe *</Label>
                  <div className="relative">
                    <Shield className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                    <Input
                      id="confirm-password"
                      type="password"
                      placeholder="•••••••••"
                      className="pl-10"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      required
                      disabled={isSubmitting}
                    />
                  </div>
                </div>

                {/* Terms & Conditions */}
                <div className="flex items-start space-x-2">
                  <Checkbox
                    id="terms"
                    checked={acceptTerms}
                    onCheckedChange={(checked) => setAcceptTerms(checked as boolean)}
                  />
                  <Label 
                    htmlFor="terms"
                    className="text-sm font-normal leading-relaxed cursor-pointer"
                  >
                    J'accepte les{' '}
                    <Link href="/terms" className="text-primary hover:underline">
                      conditions d'utilisation
                    </Link>
                    {' '}et la{' '}
                    <Link href="/privacy" className="text-primary hover:underline">
                      politique de confidentialité
                    </Link>
                    {' '}de JDOM *
                  </Label>
                </div>

                {/* Submit Button */}
                <Button 
                  type="submit" 
                  className="w-full btn-primary"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? 'Création en cours...' : 'Créer mon compte'}
                </Button>
              </form>
            </CardContent>

            <CardFooter className="flex flex-col gap-4">
              <div className="text-center text-sm">
                <span className="text-muted-foreground">Vous avez déjà un compte ? </span>
                <Link href="/login" className="text-primary font-medium hover:underline">
                  Se connecter
                </Link>
              </div>
            </CardFooter>
          </Card>
        </div>
      </main>

      <Footer />
    </div>
  );
}

function calculatePasswordStrength(password: string) {
  let score = 0;
  let text = '';

  if (password.length === 0) {
    return { score: 0, text: '', color: '#e2e8f0' };
  }

  // Length
  if (password.length >= 8) score++;
  if (password.length >= 12) score++;

  // Complexity
  if (/[a-z]/.test(password)) score++;
  if (/[A-Z]/.test(password)) score++;
  if (/[0-9]/.test(password)) score++;
  if (/[^a-zA-Z0-9]/.test(password)) score++;

  if (score <= 2) {
    text = 'Mot de passe faible';
    return { score, text, color: '#ef4444' };
  } else if (score <= 4) {
    text = 'Mot de passe moyen';
    return { score, text, color: '#f59e0b' };
  } else {
    text = 'Mot de passe fort';
    return { score, text, color: '#22c55e' };
  }
}

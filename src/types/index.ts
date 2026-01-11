// Core Types for JDOM Platform

export interface Dataset {
  id: string;
  title: string;
  description: string;
  organization: Organization;
  theme: Theme;
  keywords: string[];
  formats: FileFormat[];
  license: License;
  publishedAt: Date;
  updatedAt: Date;
  updateFrequency: UpdateFrequency;
  downloads: number;
  views: number;
  rating: number;
  ratingCount: number;
  spatialCoverage: string;
  temporalCoverage: {
    start: Date;
    end: Date;
  };
  files: DataFile[];
  metadata: Metadata;
  quality: QualityScore;
  status: DatasetStatus;
  featured?: boolean;
}

export interface Organization {
  id: string;
  name: string;
  type: OrganizationType;
  logo?: string;
  description: string;
  email?: string;
  phone?: string;
  website?: string;
  datasetsCount: number;
  totalDownloads: number;
  createdAt: Date;
  status: OrganizationStatus;
  members?: OrganizationMember[];
}

export interface DataFile {
  id: string;
  name: string;
  description?: string;
  format: FileFormat;
  size: number;
  url: string;
  checksum: string;
  rows?: number;
  columns?: number;
  addedAt: Date;
  isPrimary: boolean;
}

export interface Theme {
  id: string;
  slug: string;
  name: string;
  description: string;
  icon: string;
  color: string;
  datasetsCount: number;
}

export interface User {
  id: string;
  name?: string;
  email: string;
  role: UserRole;
  type: UserType;
  avatar?: string;
  phone?: string;
  createdAt: Date;
  lastLogin?: Date;
  status: UserStatus;
  organizationId?: string;
  favorites?: string[]; // Dataset IDs
  downloads?: number;
}

export interface OrganizationMember {
  id: string;
  userId: string;
  name: string;
  email: string;
  role: MemberRole;
  joinedAt: Date;
  lastLogin?: Date;
}

export interface Metadata {
  language: string;
  publisher: string;
  contactEmail: string;
  contactPhone?: string;
  documentationUrl?: string;
  methodology?: string;
  source?: string;
  granularity?: string;
}

export interface QualityScore {
  overall: number;
  completeness: number;
  accuracy: number;
  documentation: number;
  metadata: number;
  formats: number;
  updates: number;
}

export interface Comment {
  id: string;
  datasetId: string;
  userId: string;
  userName: string;
  userAvatar?: string;
  content: string;
  createdAt: Date;
  updatedAt?: Date;
  likes: number;
  replies?: Comment[];
  parentId?: string;
}

export interface Review {
  id: string;
  datasetId: string;
  userId: string;
  userName: string;
  userAvatar?: string;
  rating: number;
  title: string;
  content: string;
  createdAt: Date;
  helpful: number;
}

export interface Activity {
  id: string;
  type: ActivityType;
  userId?: string;
  userName?: string;
  userAvatar?: string;
  datasetId?: string;
  datasetTitle?: string;
  organizationId?: string;
  organizationName?: string;
  description: string;
  timestamp: Date;
  ipAddress?: string;
}

export interface Notification {
  id: string;
  userId: string;
  type: NotificationType;
  title: string;
  message: string;
  data?: any;
  read: boolean;
  createdAt: Date;
  actionUrl?: string;
}

export interface UseCase {
  id: string;
  title: string;
  description: string;
  image?: string;
  datasets: Dataset[];
  organization: string;
  website?: string;
  createdAt: Date;
}

export interface SearchFilters {
  query?: string;
  themes?: string[];
  organizations?: string[];
  formats?: FileFormat[];
  licenses?: License[];
  dateFrom?: Date;
  dateTo?: Date;
  updateFrequency?: UpdateFrequency[];
  qualityMin?: number;
  status?: DatasetStatus[];
  sortBy?: SortBy;
  sortOrder?: 'asc' | 'desc';
}

export interface Stats {
  totalDatasets: number;
  totalOrganizations: number;
  totalUsers: number;
  totalDownloads: number;
  totalViews: number;
  newDatasetsThisMonth: number;
  newUsersThisMonth: number;
  downloadsThisMonth: number;
  activeUsers: number;
}

export interface DatasetStats {
  downloads: number;
  views: number;
  favorites: number;
  shares: number;
  comments: number;
  rating: number;
  downloadsByDay: { date: string; count: number }[];
  downloadsByFormat: { format: FileFormat; count: number }[];
  downloadsByRegion: { region: string; count: number }[];
  viewsByDay: { date: string; count: number }[];
}

// Enums
export type FileFormat = 'CSV' | 'JSON' | 'Excel' | 'XML' | 'PDF' | 'GeoJSON' | 'Shapefile' | 'KML';
export type License = 'CC-BY-4.0' | 'CC-BY-SA-4.0' | 'CC-Zero' | 'ODbL' | 'LO-FR-1.0' | 'ODC-BY-1.0';
export type UpdateFrequency = 'Ponctuel' | 'Quotidien' | 'Hebdomadaire' | 'Mensuel' | 'Trimestriel' | 'Annuel' | 'Biennal';
export type DatasetStatus = 'published' | 'draft' | 'pending' | 'archived';
export type OrganizationType = 'ministry' | 'agency' | 'municipality' | 'institute' | 'ngo' | 'company';
export type OrganizationStatus = 'active' | 'pending' | 'suspended';
export type UserRole = 'admin' | 'producer' | 'citizen';
export type UserType = 'citizen' | 'organization';
export type UserStatus = 'active' | 'pending' | 'suspended';
export type MemberRole = 'admin' | 'editor' | 'viewer';
export type ActivityType = 'dataset_published' | 'dataset_updated' | 'dataset_deleted' | 'dataset_downloaded' | 'user_registered' | 'user_login' | 'organization_created' | 'comment_posted' | 'review_posted';
export type NotificationType = 'info' | 'success' | 'warning' | 'error';
export type SortBy = 'relevance' | 'date' | 'downloads' | 'views' | 'rating' | 'title';

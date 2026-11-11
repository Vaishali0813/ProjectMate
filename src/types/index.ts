export interface Service {
  id: string;
  name: string;
  description: string;
  icon: string;
  display_order: number;
  is_active: boolean;
  created_at?: string;
  updated_at?: string;
}

export type ReviewStatus = 'pending' | 'approved' | 'rejected';

export interface CustomerReview {
  id: string;
  customer_name: string;
  email: string; // Strictly private!
  service_id?: string | null;
  service_name_snapshot: string;
  rating: number; // 1 to 5
  feedback: string;
  consent_to_publish: boolean;
  status: ReviewStatus;
  created_at: string;
  updated_at?: string;
  deleted_at?: string | null;
}

export interface PublicReview {
  id: string;
  customer_name: string;
  service_name_snapshot: string;
  rating: number;
  feedback: string;
  created_at: string;
}

export interface ReviewSubmission {
  customer_name: string;
  email: string;
  service_id?: string;
  service_name_snapshot: string;
  rating: number;
  feedback: string;
  consent_to_publish: boolean;
}

export interface AdminUser {
  id: string;
  email: string;
  role: 'admin';
}

export interface RatingStats {
  averageRating: number;
  totalApproved: number;
  distribution: {
    stars: number;
    count: number;
    percentage: number;
  }[];
}

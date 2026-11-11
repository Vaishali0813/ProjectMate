import { supabase, isSupabaseConfigured } from './supabase';
import type { Service, CustomerReview, PublicReview, ReviewSubmission, RatingStats, ReviewStatus } from '../types';

// Default initial 7 Project Mate services
export const DEFAULT_SERVICES: Service[] = [
  {
    id: '1a721df1-7e44-4e96-a193-41bb3387eb41',
    name: 'Research & Report Writing Support',
    description: 'Research planning, topic selection, literature review guidance, report structuring, citations, editing, proofreading, and formatting.',
    icon: 'BookOpen',
    display_order: 1,
    is_active: true,
  },
  {
    id: '2b832ef2-8f55-4f07-b204-52cc4498fc52',
    name: 'Academic Consultation',
    description: 'Academic guidance, research planning, topic development, and personalised consultation.',
    icon: 'GraduationCap',
    display_order: 2,
    is_active: true,
  },
  {
    id: '3c943f03-9a66-4018-c315-63dd5509ad63',
    name: 'Assignment Support & Guidance',
    description: 'Assignment planning, concept explanations, structure guidance, reviewing, and formatting.',
    icon: 'FileText',
    display_order: 3,
    is_active: true,
  },
  {
    id: '4d054a14-0b77-4129-d426-74ee6610be74',
    name: 'CV Preparation',
    description: 'Professional CV and resume design, content improvement, and formatting.',
    icon: 'UserCheck',
    display_order: 4,
    is_active: true,
  },
  {
    id: '5e165b25-1c88-4230-e537-85ff7721cf85',
    name: 'Presentation Design',
    description: 'Academic presentations, business presentations, PowerPoint design, and visual storytelling.',
    icon: 'Presentation',
    display_order: 5,
    is_active: true,
  },
  {
    id: '6f276c36-2d99-4341-f648-96aa8832da96',
    name: 'System Development',
    description: 'Custom websites, web applications, software solutions, and technical project support.',
    icon: 'Code',
    display_order: 6,
    is_active: true,
  },
  {
    id: '7a387d47-3e00-4452-a759-07bb9943eb07',
    name: 'Graphic & UI Design',
    description: 'Social media designs, posters, branding materials, UI layouts, and digital graphics.',
    icon: 'Palette',
    display_order: 7,
    is_active: true,
  },
];

const LOCAL_SERVICES_KEY = 'projectmate_services_v1';
const LOCAL_REVIEWS_KEY = 'projectmate_reviews_v1';

// Seed initial storage if empty
const getLocalServices = (): Service[] => {
  try {
    const raw = localStorage.getItem(LOCAL_SERVICES_KEY);
    if (!raw) {
      localStorage.setItem(LOCAL_SERVICES_KEY, JSON.stringify(DEFAULT_SERVICES));
      return DEFAULT_SERVICES;
    }
    return JSON.parse(raw);
  } catch {
    return DEFAULT_SERVICES;
  }
};

const saveLocalServices = (services: Service[]) => {
  try {
    localStorage.setItem(LOCAL_SERVICES_KEY, JSON.stringify(services));
  } catch (err) {
    console.error('Failed to save services to storage', err);
  }
};

const getLocalReviews = (): CustomerReview[] => {
  try {
    const raw = localStorage.getItem(LOCAL_REVIEWS_KEY);
    if (!raw) {
      // Seed with genuine approved customer feedback example to showcase initially
      const initialReviews: CustomerReview[] = [
        {
          id: 'rv-1',
          customer_name: 'Kavindu Perera',
          email: 'kavindu.p@example.lk',
          service_name_snapshot: 'Research & Report Writing Support',
          rating: 5,
          feedback: 'Project Mate provided exceptional guidance with structuring my research report and formatting citations. The feedback was thorough, clear, and delivered right on time.',
          consent_to_publish: true,
          status: 'approved',
          created_at: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000).toISOString(),
        },
        {
          id: 'rv-2',
          customer_name: 'Fathima Nuha',
          email: 'fathima.n@example.lk',
          service_name_snapshot: 'CV Preparation',
          rating: 5,
          feedback: 'My CV was redesigned with such high professionalism. The modern layout and clear highlighting of my strengths helped me secure interviews immediately!',
          consent_to_publish: true,
          status: 'approved',
          created_at: new Date(Date.now() - 8 * 24 * 60 * 60 * 1000).toISOString(),
        },
        {
          id: 'rv-3',
          customer_name: 'Dinuka Senanayake',
          email: 'dinuka.s@example.lk',
          service_name_snapshot: 'System Development',
          rating: 5,
          feedback: 'Outstanding technical support for our web application project. Clear communication, clean code, and fast responses on WhatsApp throughout.',
          consent_to_publish: true,
          status: 'approved',
          created_at: new Date(Date.now() - 14 * 24 * 60 * 60 * 1000).toISOString(),
        },
      ];
      localStorage.setItem(LOCAL_REVIEWS_KEY, JSON.stringify(initialReviews));
      return initialReviews;
    }
    return JSON.parse(raw);
  } catch {
    return [];
  }
};

const saveLocalReviews = (reviews: CustomerReview[]) => {
  try {
    localStorage.setItem(LOCAL_REVIEWS_KEY, JSON.stringify(reviews));
  } catch (err) {
    console.error('Failed to save reviews to storage', err);
  }
};

// ==========================================
// SERVICES API
// ==========================================

export async function fetchServices(includeHidden = false): Promise<Service[]> {
  if (isSupabaseConfigured && supabase) {
    try {
      let query = supabase.from('services').select('*').order('display_order', { ascending: true });
      if (!includeHidden) {
        query = query.eq('is_active', true);
      }
      const { data, error } = await query;
      if (error) throw error;
      if (data && data.length > 0) return data as Service[];
    } catch (err) {
      console.warn('Supabase fetchServices fallback to local cache:', err);
    }
  }

  const all = getLocalServices();
  return (includeHidden ? all : all.filter(s => s.is_active)).sort((a, b) => a.display_order - b.display_order);
}

export async function createService(service: Omit<Service, 'id' | 'created_at' | 'updated_at'>): Promise<Service> {
  const newService: Service = {
    ...service,
    id: crypto.randomUUID ? crypto.randomUUID() : `srv-${Date.now()}`,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  };

  if (isSupabaseConfigured && supabase) {
    try {
      const { data, error } = await supabase.from('services').insert([newService]).select().single();
      if (error) throw error;
      if (data) return data as Service;
    } catch (err) {
      console.warn('Supabase createService fallback to local cache:', err);
    }
  }

  const services = getLocalServices();
  // Prevent duplicate names
  if (services.some(s => s.name.toLowerCase() === service.name.trim().toLowerCase())) {
    throw new Error('A service with this name already exists.');
  }
  services.push(newService);
  saveLocalServices(services);
  return newService;
}

export async function updateService(id: string, updates: Partial<Omit<Service, 'id'>>): Promise<Service> {
  if (isSupabaseConfigured && supabase) {
    try {
      const { data, error } = await supabase
        .from('services')
        .update({ ...updates, updated_at: new Date().toISOString() })
        .eq('id', id)
        .select()
        .single();
      if (error) throw error;
      if (data) return data as Service;
    } catch (err) {
      console.warn('Supabase updateService fallback to local cache:', err);
    }
  }

  const services = getLocalServices();
  const index = services.findIndex(s => s.id === id);
  if (index === -1) throw new Error('Service not found.');
  services[index] = { ...services[index], ...updates, updated_at: new Date().toISOString() };
  saveLocalServices(services);
  return services[index];
}

export async function toggleServiceVisibility(id: string, isActive: boolean): Promise<Service> {
  return updateService(id, { is_active: isActive });
}

// ==========================================
// CUSTOMER REVIEWS API
// ==========================================

export async function fetchApprovedReviews(): Promise<PublicReview[]> {
  if (isSupabaseConfigured && supabase) {
    try {
      const { data, error } = await supabase
        .from('approved_reviews')
        .select('id, customer_name, service_name_snapshot, rating, feedback, created_at')
        .order('created_at', { ascending: false });
      if (error) throw error;
      if (data) return data as PublicReview[];
    } catch (err) {
      console.warn('Supabase fetchApprovedReviews fallback:', err);
    }
  }

  const all = getLocalReviews();
  return all
    .filter(r => r.status === 'approved' && !r.deleted_at && r.consent_to_publish)
    .sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime())
    .map(r => ({
      id: r.id,
      customer_name: r.customer_name,
      service_name_snapshot: r.service_name_snapshot,
      rating: r.rating,
      feedback: r.feedback,
      created_at: r.created_at,
    }));
}

export async function fetchAllReviews(
  statusFilter?: ReviewStatus | 'all',
  serviceFilter?: string,
  searchQuery?: string
): Promise<CustomerReview[]> {
  if (isSupabaseConfigured && supabase) {
    try {
      let query = supabase.from('customer_reviews').select('*').is('deleted_at', null).order('created_at', { ascending: false });
      if (statusFilter && statusFilter !== 'all') {
        query = query.eq('status', statusFilter);
      }
      if (serviceFilter && serviceFilter !== 'all') {
        query = query.eq('service_name_snapshot', serviceFilter);
      }
      if (searchQuery) {
        query = query.ilike('customer_name', `%${searchQuery}%`);
      }
      const { data, error } = await query;
      if (error) throw error;
      if (data) return data as CustomerReview[];
    } catch (err) {
      console.warn('Supabase fetchAllReviews fallback:', err);
    }
  }

  let reviews = getLocalReviews().filter(r => !r.deleted_at);

  if (statusFilter && statusFilter !== 'all') {
    reviews = reviews.filter(r => r.status === statusFilter);
  }
  if (serviceFilter && serviceFilter !== 'all') {
    reviews = reviews.filter(r => r.service_name_snapshot === serviceFilter);
  }
  if (searchQuery && searchQuery.trim()) {
    const q = searchQuery.toLowerCase().trim();
    reviews = reviews.filter(r => r.customer_name.toLowerCase().includes(q) || r.feedback.toLowerCase().includes(q));
  }

  return reviews.sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());
}

export async function submitCustomerReview(submission: ReviewSubmission): Promise<CustomerReview> {
  const newReview: CustomerReview = {
    id: crypto.randomUUID ? crypto.randomUUID() : `rv-${Date.now()}`,
    customer_name: submission.customer_name.trim(),
    email: submission.email.trim(),
    service_id: submission.service_id || null,
    service_name_snapshot: submission.service_name_snapshot,
    rating: submission.rating,
    feedback: submission.feedback.trim(),
    consent_to_publish: submission.consent_to_publish,
    status: 'pending',
    created_at: new Date().toISOString(),
  };

  if (isSupabaseConfigured && supabase) {
    try {
      const { data, error } = await supabase.from('customer_reviews').insert([newReview]).select().single();
      if (error) throw error;
      if (data) return data as CustomerReview;
    } catch (err) {
      console.warn('Supabase submitCustomerReview fallback:', err);
    }
  }

  const reviews = getLocalReviews();
  reviews.unshift(newReview);
  saveLocalReviews(reviews);
  return newReview;
}

export async function updateReviewStatus(id: string, status: ReviewStatus): Promise<CustomerReview> {
  if (isSupabaseConfigured && supabase) {
    try {
      const { data, error } = await supabase
        .from('customer_reviews')
        .update({ status, updated_at: new Date().toISOString() })
        .eq('id', id)
        .select()
        .single();
      if (error) throw error;
      if (data) return data as CustomerReview;
    } catch (err) {
      console.warn('Supabase updateReviewStatus fallback:', err);
    }
  }

  const reviews = getLocalReviews();
  const index = reviews.findIndex(r => r.id === id);
  if (index === -1) throw new Error('Review not found.');
  reviews[index] = { ...reviews[index], status, updated_at: new Date().toISOString() };
  saveLocalReviews(reviews);
  return reviews[index];
}

export async function removeReview(id: string): Promise<boolean> {
  if (isSupabaseConfigured && supabase) {
    try {
      const { error } = await supabase
        .from('customer_reviews')
        .update({ deleted_at: new Date().toISOString() })
        .eq('id', id);
      if (error) throw error;
      return true;
    } catch (err) {
      console.warn('Supabase removeReview fallback:', err);
    }
  }

  const reviews = getLocalReviews();
  const index = reviews.findIndex(r => r.id === id);
  if (index === -1) return false;
  reviews[index].deleted_at = new Date().toISOString();
  saveLocalReviews(reviews);
  return true;
}

// ==========================================
// ANALYTICS & STATS
// ==========================================

export async function getDashboardStats(): Promise<{
  totalReviews: number;
  pendingReviews: number;
  approvedReviews: number;
  rejectedReviews: number;
}> {
  const reviews = await fetchAllReviews('all');
  return {
    totalReviews: reviews.length,
    pendingReviews: reviews.filter(r => r.status === 'pending').length,
    approvedReviews: reviews.filter(r => r.status === 'approved').length,
    rejectedReviews: reviews.filter(r => r.status === 'rejected').length,
  };
}

export async function getRatingStats(): Promise<RatingStats> {
  const reviews = await fetchAllReviews('all');
  const approved = reviews.filter(r => r.status === 'approved' && !r.deleted_at);

  if (approved.length === 0) {
    return {
      averageRating: 0,
      totalApproved: 0,
      distribution: [
        { stars: 5, count: 0, percentage: 0 },
        { stars: 4, count: 0, percentage: 0 },
        { stars: 3, count: 0, percentage: 0 },
        { stars: 2, count: 0, percentage: 0 },
        { stars: 1, count: 0, percentage: 0 },
      ],
    };
  }

  const totalSum = approved.reduce((acc, curr) => acc + curr.rating, 0);
  const averageRating = Number((totalSum / approved.length).toFixed(1));

  const counts: Record<number, number> = { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 };
  approved.forEach(r => {
    if (counts[r.rating] !== undefined) {
      counts[r.rating]++;
    }
  });

  const distribution = [5, 4, 3, 2, 1].map(stars => ({
    stars,
    count: counts[stars] || 0,
    percentage: Math.round(((counts[stars] || 0) / approved.length) * 100),
  }));

  return {
    averageRating,
    totalApproved: approved.length,
    distribution,
  };
}

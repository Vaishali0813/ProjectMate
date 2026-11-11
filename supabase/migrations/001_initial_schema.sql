-- ==============================================================================
-- PROJECT MATE DATABASE SCHEMA & POLICIES
-- Supabase PostgreSQL Migration
-- ==============================================================================

-- 1. Create Services Table
CREATE TABLE IF NOT EXISTS public.services (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL UNIQUE,
    description TEXT NOT NULL,
    icon TEXT NOT NULL DEFAULT 'BookOpen',
    display_order INTEGER NOT NULL DEFAULT 0,
    is_active BOOLEAN NOT NULL DEFAULT true,
    created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now()),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())
);

-- Index on is_active and display_order for fast public listings
CREATE INDEX IF NOT EXISTS idx_services_active_order ON public.services(is_active, display_order);

-- 2. Create Customer Reviews Table
CREATE TABLE IF NOT EXISTS public.customer_reviews (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    customer_name TEXT NOT NULL,
    email TEXT NOT NULL, -- Private! Never exposed to public views
    service_id UUID REFERENCES public.services(id) ON DELETE SET NULL,
    service_name_snapshot TEXT NOT NULL,
    rating INTEGER NOT NULL CHECK (rating >= 1 AND rating <= 5),
    feedback TEXT NOT NULL,
    consent_to_publish BOOLEAN NOT NULL DEFAULT false,
    status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'approved', 'rejected')),
    created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now()),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now()),
    deleted_at TIMESTAMPTZ
);

-- Indexes for status, rating, and creation date
CREATE INDEX IF NOT EXISTS idx_reviews_status_created ON public.customer_reviews(status, created_at DESC);
CREATE INDEX IF NOT EXISTS idx_reviews_rating ON public.customer_reviews(rating);

-- 3. Public Safe View (Excludes private email addresses completely)
CREATE OR REPLACE VIEW public.approved_reviews AS
SELECT 
    id,
    customer_name,
    service_name_snapshot,
    rating,
    feedback,
    created_at
FROM public.customer_reviews
WHERE status = 'approved' 
  AND deleted_at IS NULL 
  AND consent_to_publish = true
ORDER BY created_at DESC;

-- 4. Enable Row Level Security (RLS)
ALTER TABLE public.services ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.customer_reviews ENABLE ROW LEVEL SECURITY;

-- 5. RLS Policies for Services
-- Anyone can view active services
CREATE POLICY "Public can view active services" 
ON public.services FOR SELECT 
USING (is_active = true);

-- Authenticated admins can view all services
CREATE POLICY "Admins can view all services" 
ON public.services FOR SELECT 
TO authenticated 
USING (true);

-- Authenticated admins can insert/update/delete services
CREATE POLICY "Admins can modify services" 
ON public.services FOR ALL 
TO authenticated 
USING (true)
WITH CHECK (true);

-- 6. RLS Policies for Customer Reviews
-- Public can only insert pending reviews
CREATE POLICY "Public can submit pending reviews" 
ON public.customer_reviews FOR INSERT 
TO anon, authenticated
WITH CHECK (
    status = 'pending' 
    AND consent_to_publish = true 
    AND rating >= 1 
    AND rating <= 5
    AND length(trim(customer_name)) > 0
    AND length(trim(feedback)) >= 10
);

-- Authenticated admins have full management access
CREATE POLICY "Admins have full access to customer reviews" 
ON public.customer_reviews FOR ALL 
TO authenticated 
USING (true)
WITH CHECK (true);

-- 7. Seed Initial 7 Project Mate Services
INSERT INTO public.services (name, description, icon, display_order, is_active)
VALUES
(
    'Research & Report Writing Support',
    'Research planning, topic selection, literature review guidance, report structuring, citations, editing, proofreading, and formatting.',
    'BookOpen',
    1,
    true
),
(
    'Academic Consultation',
    'Academic guidance, research planning, topic development, and personalised consultation.',
    'GraduationCap',
    2,
    true
),
(
    'Assignment Support & Guidance',
    'Assignment planning, concept explanations, structure guidance, reviewing, and formatting.',
    'FileText',
    3,
    true
),
(
    'CV Preparation',
    'Professional CV and resume design, content improvement, and formatting.',
    'UserCheck',
    4,
    true
),
(
    'Presentation Design',
    'Academic presentations, business presentations, PowerPoint design, and visual storytelling.',
    'Presentation',
    5,
    true
),
(
    'System Development',
    'Custom websites, web applications, software solutions, and technical project support.',
    'Code',
    6,
    true
),
(
    'Graphic & UI Design',
    'Social media designs, posters, branding materials, UI layouts, and digital graphics.',
    'Palette',
    7,
    true
)
ON CONFLICT (name) DO UPDATE 
SET description = EXCLUDED.description,
    icon = EXCLUDED.icon,
    display_order = EXCLUDED.display_order;

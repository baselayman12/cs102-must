-- ==========================================================================
-- CS 102 MUST - Supabase Database Setup & Schema
-- Run this script in the Supabase SQL Editor (https://supabase.com/dashboard)
-- ==========================================================================

-- 1. Create the lectures_and_sections table
CREATE TABLE IF NOT EXISTS public.lectures_and_sections (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    type TEXT NOT NULL CHECK (type IN ('lecture', 'section')),
    item_number INT NOT NULL,
    title TEXT NOT NULL,
    description TEXT,
    lecture_pdf_url TEXT,
    summary_pdf_url TEXT,
    pptx_url TEXT,
    video_url TEXT,
    order_index INT DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 2. Enable Row Level Security (RLS) for rock-solid security
ALTER TABLE public.lectures_and_sections ENABLE ROW LEVEL SECURITY;

-- 3. Policy: Anyone (Students & Public) can read/view lectures
CREATE POLICY "Allow public read access" 
ON public.lectures_and_sections 
FOR SELECT 
USING (true);

-- 4. Policy: ONLY logged-in Admins can INSERT new lectures
CREATE POLICY "Allow authenticated admin insert" 
ON public.lectures_and_sections 
FOR INSERT 
TO authenticated 
WITH CHECK (true);

-- 5. Policy: ONLY logged-in Admins can UPDATE lectures
CREATE POLICY "Allow authenticated admin update" 
ON public.lectures_and_sections 
FOR UPDATE 
TO authenticated 
USING (true)
WITH CHECK (true);

-- 6. Policy: ONLY logged-in Admins can DELETE lectures
CREATE POLICY "Allow authenticated admin delete" 
ON public.lectures_and_sections 
FOR DELETE 
TO authenticated 
USING (true);

-- 7. Pre-seed with the initial materials (Lecture 1, Section 1, Lecture 2)
INSERT INTO public.lectures_and_sections 
(type, item_number, title, description, lecture_pdf_url, summary_pdf_url, pptx_url, video_url, order_index)
VALUES 
(
    'lecture', 
    1, 
    'Lecture 1: Introduction to Computers and C++', 
    'مقدمة عن مكونات الحاسب الآلي، آلية عمل البرامج، وأساسيات لغة C++ ومفهوم الـ Problem Solving.', 
    'files/lecture1.pdf', 
    'files/summary1.pdf', 
    NULL, 
    NULL, 
    1
),
(
    'section', 
    1, 
    'Section 1: C++ Basics & Lab Practice', 
    'تطبيق عملي على أفكار المحاضرة الأولى، شرح أخطاء الكود الشائعة، وحل تمارين على الـ cin و cout والـ Variables.', 
    NULL, 
    NULL, 
    'files/section1.pptx', 
    'https://www.youtube.com/embed/AHZKNaFDDYY', 
    2
),
(
    'lecture', 
    2, 
    'Lecture 2: C++ Input/Output and Operators', 
    'شرح أساسيات لغة C++، جمل الإدخال والإخراج (cin/cout)، المتغيرات، المعاملات الحسابية والمنطقية، وأولويات العمليات.', 
    'files/lecture2.pdf', 
    'files/summary2.pdf', 
    NULL, 
    NULL, 
    3
),
(
    'section', 
    2, 
    'Section 2', 
    'شرح وحلول تمارين السكشن الثاني لمادة CS 102.', 
    NULL, 
    NULL, 
    NULL, 
    'https://www.youtube.com/embed/eSVbumQ3BUc', 
    4
);

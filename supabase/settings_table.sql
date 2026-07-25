-- ============================================
-- TABLE "settings" pour stocker les tarifs
-- Run this in the Supabase SQL Editor
-- ============================================

CREATE TABLE public.settings (
    id TEXT PRIMARY KEY DEFAULT 'prices',
    "reportPrice" INTEGER NOT NULL DEFAULT 0,
    "powerpointPrice" INTEGER NOT NULL DEFAULT 0,
    "packPrice" INTEGER NOT NULL DEFAULT 0,
    "updatedAt" TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Insert default row
INSERT INTO public.settings (id, "reportPrice", "powerpointPrice", "packPrice")
VALUES ('prices', 0, 0, 0);

-- Allow anonymous access
ALTER TABLE public.settings ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow anonymous select settings" ON public.settings
    FOR SELECT USING (true);

CREATE POLICY "Allow anonymous update settings" ON public.settings
    FOR UPDATE USING (true);

CREATE POLICY "Allow anonymous insert settings" ON public.settings
    FOR INSERT WITH CHECK (true);

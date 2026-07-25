-- Drop existing table if needed (be careful in production)
-- DROP TABLE IF EXISTS public.orders;

CREATE TABLE public.orders (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    "orderRef" TEXT UNIQUE NOT NULL,
    status TEXT NOT NULL,
    "fullName" TEXT NOT NULL,
    email TEXT NOT NULL,
    phone TEXT NOT NULL,
    school TEXT NOT NULL,
    "fieldOfStudy" TEXT NOT NULL,
    "studyLevel" TEXT NOT NULL,
    
    -- Optional fields
    "companyName" TEXT,
    "companySector" TEXT,
    "internshipDuration" TEXT,
    department TEXT,
    "supervisorName" TEXT,
    "positionHeld" TEXT,
    
    "reportTheme" TEXT,
    problematic TEXT,
    objectives TEXT,
    "tasksDone" TEXT,
    difficulties TEXT,
    results TEXT,
    "schoolGuidelines" TEXT,
    
    "serviceType" TEXT NOT NULL,
    "specialRequests" TEXT,
    
    "totalPrice" INTEGER NOT NULL DEFAULT 0,
    "adminNotes" TEXT,
    
    -- Using jsonb to store array of file objects if needed
    files JSONB DEFAULT '[]'::jsonb,
    
    "createdAt" TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    "updatedAt" TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable RLS but allow anonymous access for this MVP
-- (In production, you should restrict access using Policies)
ALTER TABLE public.orders ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow anonymous insert" ON public.orders
    FOR INSERT WITH CHECK (true);

CREATE POLICY "Allow anonymous select" ON public.orders
    FOR SELECT USING (true);

CREATE POLICY "Allow anonymous update" ON public.orders
    FOR UPDATE USING (true);

-- ============================================
-- STORAGE POLICIES for bucket "order_documents"
-- Run this in the Supabase SQL Editor
-- ============================================

-- Allow anyone to upload files (INSERT)
CREATE POLICY "Allow public uploads"
ON storage.objects
FOR INSERT
TO anon, authenticated
WITH CHECK (bucket_id = 'order_documents');

-- Allow anyone to read/download files (SELECT)
CREATE POLICY "Allow public reads"
ON storage.objects
FOR SELECT
TO anon, authenticated
USING (bucket_id = 'order_documents');

-- Allow anyone to update files (UPDATE) 
CREATE POLICY "Allow public updates"
ON storage.objects
FOR UPDATE
TO anon, authenticated
USING (bucket_id = 'order_documents');

-- Allow anyone to delete files (DELETE)
CREATE POLICY "Allow public deletes"
ON storage.objects
FOR DELETE
TO anon, authenticated
USING (bucket_id = 'order_documents');

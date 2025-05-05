/*
  # Fix storage extension and bucket setup

  1. Changes
    - Remove storage extension creation (handled by Supabase)
    - Create review-images bucket properly
    - Add correct RLS policies
    - Set proper file size limits and MIME types
*/

-- Create review-images bucket if it doesn't exist
DO $$
BEGIN
  INSERT INTO storage.buckets (id, name, public)
  VALUES (
    'review-images',
    'review-images',
    false
  )
  ON CONFLICT (id) DO UPDATE
  SET file_size_limit = 5242880, -- 5MB
      allowed_mime_types = ARRAY['image/jpeg', 'image/png', 'image/webp'];
END $$;

-- Create policy to allow authenticated users to upload their own review images
CREATE POLICY "Users can upload review images"
ON storage.objects
FOR INSERT
TO authenticated
WITH CHECK (
  bucket_id = 'review-images' AND
  (storage.foldername(name))[1] = auth.uid()::text
);

-- Create policy to allow anyone to view review images
CREATE POLICY "Anyone can view review images"
ON storage.objects
FOR SELECT
TO public
USING (bucket_id = 'review-images');

-- Create policy to allow users to delete their own review images
CREATE POLICY "Users can delete own review images"
ON storage.objects
FOR DELETE
TO authenticated
USING (
  bucket_id = 'review-images' AND
  (storage.foldername(name))[1] = auth.uid()::text
);
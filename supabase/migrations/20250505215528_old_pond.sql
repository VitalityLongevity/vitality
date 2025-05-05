/*
  # Add review images storage bucket and policies

  1. Changes
    - Create review-images storage bucket
    - Add RLS policies for image uploads
    - Add proper error handling
    - Ensure proper user access control
*/

-- Enable storage if not already enabled
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_extension WHERE extname = 'storage'
  ) THEN
    CREATE EXTENSION IF NOT EXISTS "storage";
  END IF;
END $$;

-- Create review-images bucket if it doesn't exist
INSERT INTO storage.buckets (id, name)
VALUES ('review-images', 'review-images')
ON CONFLICT (id) DO NOTHING;

-- Enable RLS on the bucket
UPDATE storage.buckets
SET public = false,
    file_size_limit = 5242880, -- 5MB
    allowed_mime_types = ARRAY['image/jpeg', 'image/png', 'image/webp']
WHERE id = 'review-images';

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
/*
  # Add customer reviews system

  1. New Tables
    - `reviews`
      - `id` (uuid, primary key)
      - `user_id` (uuid, references auth.users)
      - `product_id` (text)
      - `rating` (integer)
      - `review_text` (text)
      - `image_url` (text, optional)
      - `created_at` (timestamptz)
      - `updated_at` (timestamptz)

  2. Security
    - Enable RLS on reviews table
    - Add policies for:
      - Users can read all reviews
      - Users can create/update their own reviews
      - Admins can manage all reviews
*/

-- Create reviews table
CREATE TABLE reviews (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users(id) NOT NULL,
  product_id text NOT NULL,
  rating integer NOT NULL CHECK (rating >= 1 AND rating <= 5),
  review_text text NOT NULL,
  image_url text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Enable RLS
ALTER TABLE reviews ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "Anyone can read reviews"
  ON reviews
  FOR SELECT
  USING (true);

CREATE POLICY "Users can create their own reviews"
  ON reviews
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own reviews"
  ON reviews
  FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Admins can manage all reviews"
  ON reviews
  TO admin
  USING (true)
  WITH CHECK (true);

-- Create function to get product reviews with user names
CREATE OR REPLACE FUNCTION get_product_reviews(p_product_id text)
RETURNS TABLE (
  id uuid,
  user_id uuid,
  user_name text,
  rating integer,
  review_text text,
  image_url text,
  created_at timestamptz
)
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
BEGIN
  RETURN QUERY
  SELECT 
    r.id,
    r.user_id,
    COALESCE(u.first_name || ' ' || u.last_name, u.username) as user_name,
    r.rating,
    r.review_text,
    r.image_url,
    r.created_at
  FROM reviews r
  LEFT JOIN users u ON r.user_id = u.id
  WHERE r.product_id = p_product_id
  ORDER BY r.created_at DESC;
END;
$$;
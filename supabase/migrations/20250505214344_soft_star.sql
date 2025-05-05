/*
  # Add function to get product ratings

  1. Changes
    - Add function to calculate average ratings and review counts
    - Support multiple product IDs for batch fetching
    - Return both average rating and review count
*/

CREATE OR REPLACE FUNCTION get_product_ratings(p_product_ids text[])
RETURNS TABLE (
  product_id text,
  average_rating numeric,
  review_count bigint
)
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
BEGIN
  RETURN QUERY
  SELECT 
    r.product_id,
    ROUND(AVG(r.rating)::numeric, 1) as average_rating,
    COUNT(*)::bigint as review_count
  FROM reviews r
  WHERE r.product_id = ANY(p_product_ids)
  GROUP BY r.product_id;
END;
$$;
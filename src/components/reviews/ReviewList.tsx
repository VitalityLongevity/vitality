import React, { useState, useEffect } from 'react';
import { Star, Loader2 } from 'lucide-react';
import { supabase } from '../../lib/supabase';
import { useAuth } from '../../context/AuthContext';
import ReviewForm from './ReviewForm';


interface Review {
  id: string;
  user_name: string;
  rating: number;
  review_text: string;
  image_url: string | null;
  created_at: string;
}


interface ReviewListProps {
  productId: string;
}


export default function ReviewList({ productId }: ReviewListProps) {
  const { user } = useAuth();
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showReviewForm, setShowReviewForm] = useState(false);


  const fetchReviews = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .rpc('get_product_reviews', { p_product_id: productId });

      if (error) throw error;
      setReviews(data || []);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch reviews');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchReviews();
  }, [productId]);

  const handleReviewSuccess = () => {
    setShowReviewForm(false);
    fetchReviews();
  };

  if (loading) {
    return (
      <div className="flex justify-center p-8">
        <Loader2 className="h-8 w-8 animate-spin text-amber-600" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-red-600 p-4">{error}</div>
    );
  }

  return (
    <div className="space-y-8 p-6">
      <div className="flex justify-between items-center">
        <h3 className="text-lg md:text-xl font-semibold text-gray-900">
          Customer Reviews ({reviews.length})
        </h3>
        {user && !showReviewForm && (
          <button
            onClick={() => setShowReviewForm(true)}
            className="px-3 py-1.5 md:px-4 md:py-2 text-xs md:text-sm font-medium text-white bg-amber-600 rounded-md hover:bg-amber-700"
          >
            Write a Review
          </button>
        )}
      </div>

      {showReviewForm && (
        <div className="bg-gray-50 p-4 md:p-6 rounded-lg">
          <ReviewForm
            productId={productId}
            onSuccess={handleReviewSuccess}
            onCancel={() => setShowReviewForm(false)}
          />
        </div>
      )}

      <div className="space-y-6">
        {reviews.map((review) => (
          <div key={review.id} className="bg-white p-4 md:p-6 rounded-lg shadow-sm">
            <div className="flex justify-between items-start">
              <div>
                <div className="flex items-center gap-2">
                  <div className="flex">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`h-5 w-5 ${
                          i < review.rating
                            ? 'fill-amber-400 text-amber-400'
                            : 'text-gray-300'
                        }`}
                      />
                    ))}
                  </div> 
                  <span className="font-medium text-gray-900">{review.user_name}</span>
                </div>
                <p className="text-sm text-gray-500 mt-1">
                  {new Date(review.created_at).toLocaleDateString()}
                </p>
              </div>
            </div>

            <p className="mt-3 md:mt-4 text-sm md:text-base text-gray-600">{review.review_text}</p>

            {review.image_url && (
              <div className="mt-3 md:mt-4">
                <img
                  src={`${import.meta.env.VITE_SUPABASE_URL}/storage/v1/object/public/review-images/${review.image_url}`}
                  alt="Review"
                  className="rounded-lg max-h-32 md:max-h-48 w-full object-cover"
                />
              </div>
            )}
          </div>
        ))}

        {reviews.length === 0 && (
          <div className="text-center py-6 md:py-8 text-sm md:text-base text-gray-500">
            No reviews yet. Be the first to review this product!
          </div>
        )}
      </div>
    </div>
  );
}

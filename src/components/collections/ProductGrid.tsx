import React from 'react';
import { Product } from '../../types/product';
import { ShoppingCart } from 'lucide-react';
import ProductDetailModal from '../products/ProductDetailModal';
import { Star } from 'lucide-react';
import { useCart } from '../../context/CartContext';
import { supabase } from '../../lib/supabase';

interface ProductGridProps {
  products: Product[];
  category?: 'dried' | 'gel';
}

interface ProductRating {
  average: number;
  count: number;
}

export default function ProductGrid({ products, category }: ProductGridProps) {
  const [selectedProduct, setSelectedProduct] = React.useState<Product | null>(null);
  const { dispatch } = useCart();
  const [ratings, setRatings] = React.useState<Record<string, ProductRating>>({});

  React.useEffect(() => {
    const fetchRatings = async () => {
      try {
        const { data, error } = await supabase
          .rpc('get_product_ratings', {
            p_product_ids: products.map(p => p.id)
          });

        if (error) throw error;

        const ratingMap = (data || []).reduce((acc, curr) => ({
          ...acc,
          [curr.product_id]: {
            average: curr.average_rating,
            count: curr.review_count
          }
        }), {});

        setRatings(ratingMap);
      } catch (err) {
        console.error('Error fetching ratings:', err);
      }
    };

    fetchRatings();
  }, [products]);

  const filteredProducts = category 
    ? products.filter(product => product.category === category)
    : products;

  const handleAddToCart = (product: Product, quantity: number = 1) => {
    dispatch({ type: 'ADD_ITEM', payload: { product, quantity } });
  };

  const handleQuickAdd = (e: React.MouseEvent, product: Product) => {
    e.stopPropagation();
    dispatch({ type: 'ADD_ITEM', payload: { product, quantity: 1 } });
  };

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredProducts.map((product) => (
          <div
            key={product.id}
            className="group cursor-pointer"
            onClick={() => setSelectedProduct(product)}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                setSelectedProduct(product);
              }
            }}
          >
            <div className="relative aspect-square overflow-hidden rounded-lg bg-gray-100">
              <img
                src={product.images[0]}
                alt={product.name}
                className="h-full w-full object-cover object-center group-hover:opacity-75"
              />
              <div className="absolute inset-x-0 bottom-0 bg-black bg-opacity-50 text-white p-4 translate-y-full group-hover:translate-y-0 transition-transform">
                <p className="text-sm">{product.description}</p>
              </div>
            </div>
            <div className="mt-4 flex justify-between items-start">
              <div>
                <h3 className="text-lg font-medium text-gray-900">{product.name}</h3>
                <p className="mt-1 text-lg font-medium text-gray-900">${product.price}</p>
                <p className="mt-1 text-sm text-gray-500">
                  {Object.entries(product.dimensions)
                    .filter(([, value]) => value !== undefined)
                    .map(([key, value]) => `${key}: ${value}`).join(', ')}
                </p>
                {ratings[product.id] && (
                  <div className="mt-2 flex items-center gap-2">
                    <div className="flex">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`h-4 w-4 ${
                            i < Math.round(ratings[product.id].average)
                              ? 'fill-amber-400 text-amber-400'
                              : 'text-gray-300'
                          }`}
                        />
                      ))}
                    </div>
                    <span className="text-sm text-gray-500">
                      ({ratings[product.id].count})
                    </span>
                  </div>
                )}
              </div>
              <button
                className="flex items-center justify-center w-10 h-10 rounded-full bg-amber-600 text-white hover:bg-amber-700"
                onClick={(e) => {
                  e.stopPropagation();
                  setSelectedProduct(product);
                }}
                aria-label={`View ${product.name} details`}
              >
                <ShoppingCart className="h-5 w-5" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {selectedProduct && (
        <ProductDetailModal
          product={selectedProduct}
          isOpen={true}
          onClose={() => setSelectedProduct(null)}
          onAddToCart={handleAddToCart}
        />
      )}
    </>
  );
}
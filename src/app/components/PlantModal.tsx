'use client';

import { useTheme } from '../context/ThemeContext';
import { Plant } from '../services/plantService';
import { useAppDispatch } from '../store/hooks';
import { addToCart } from '../store/cartSlice';

interface PlantModalProps {
  plant: Plant;
  isOpen: boolean;
  onClose: () => void;
}

export default function PlantModal({ plant, isOpen, onClose }: PlantModalProps) {
  const { isDark } = useTheme();
  const dispatch = useAppDispatch();

  if (!isOpen) return null;

  const handleAddToCart = () => {
    dispatch(addToCart(plant));
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className={`relative w-full max-w-4xl max-h-[90vh] rounded-lg shadow-xl overflow-hidden border-2 border-gray-300 ${
        isDark ? 'bg-gray-700' : 'bg-white'
      }`}>
        {/* Close button */}
        <button
          onClick={onClose}
          className={`absolute top-4 right-4 p-2 rounded-full ${
            isDark ? 'text-white' : 'text-gray'
          }`}
        >
          ✕
        </button>

        <div className="p-6 overflow-y-auto max-h-[90vh]">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Image section */}
            <div className="relative h-64 md:h-96">
              <img
                src={plant.image_url || '/placeholder-plant.jpg'}
                alt={plant.common_name || 'Plant image'}
                className="w-full h-full object-cover rounded-lg"
              />
            </div>

            {/* Details section */}
            <div className="space-y-4">
              <h2 className={`text-2xl font-bold ${
                isDark ? 'text-white' : 'text-gray-800'
              }`}>
                {plant.common_name || 'Unknown Plant'}
              </h2>
              
              <p className={`text-lg italic ${
                isDark ? 'text-gray-300' : 'text-gray-600'
              }`}>
                {plant.scientific_name}
              </p>

              <div className={`space-y-2 ${
                isDark ? 'text-gray-300' : 'text-gray-600'
              }`}>
                <p>
                  <span className="font-semibold">Family:</span>{' '}
                  {plant.family_common_name || plant.family}
                </p>
                <p>
                  <span className="font-semibold">Genus:</span>{' '}
                  {plant.genus}
                </p>
                <p>
                  <span className="font-semibold">Year:</span>{' '}
                  {plant.year}
                </p>
                <p>
                  <span className="font-semibold">Bibliography:</span>{' '}
                  {plant.bibliography}
                </p>
                <p>
                  <span className="font-semibold">Author:</span>{' '}
                  {plant.author}
                </p>
                <p>
                  <span className="font-semibold">Status:</span>{' '}
                  {plant.status}
                </p>
                <p>
                  <span className="font-semibold">Synonyms:</span>{' '}
                  {plant.synonyms?.join(', ')}
                </p>
              </div>

              <div className="pt-4">
                <button
                  onClick={handleAddToCart}
                  className={`w-full py-3 px-4 rounded-lg font-medium ${
                    isDark
                      ? 'bg-green-600 hover:bg-green-700 text-white'
                      : 'bg-green-500 hover:bg-green-600 text-white'
                  }`}
                >
                  Add to Cart
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 
'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { Plant, plantService } from '../services/plantService';
import { useTheme } from '../context/ThemeContext';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { addToCart } from '../store/cartSlice';
import { COLORS } from '../constants/colors';
import { RootState } from '../store/store';
import PlantModal from './PlantModal';

interface PlantListProps {
  searchQuery?: string;
}

export default function PlantList({ searchQuery = '' }: PlantListProps) {
  const [plants, setPlants] = useState<Plant[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalItems, setTotalItems] = useState(0);
  const [selectedPlant, setSelectedPlant] = useState<Plant | null>(null);
  const { isDark } = useTheme();
  const dispatch = useAppDispatch();
  const cartItems = useAppSelector((state: RootState) => state.cart.items);

  
  const fetchPlants = async (page: number) => {
    try {
      setLoading(true);
      const response = searchQuery
        ? await plantService.searchPlants(searchQuery, page)
        : await plantService.getPlants(page);
      console.log("response", response, searchQuery);
      setPlants(response.data);
      setTotalItems(response.meta.total);
      setTotalPages(Math.ceil(response.meta.total / 12));
      setError(null);
    } catch (err) {
      setError('Failed to load plants');
      console.error('Error fetching plants:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPlants(currentPage);
  }, [currentPage]);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handleAddToCart = (plant: Plant) => {
    dispatch(addToCart(plant));
  };

  const handleViewPlant = (plant: Plant) => {
    setSelectedPlant(plant);
  };

  const handleCloseModal = () => {
    setSelectedPlant(null);
  };

  const renderPaginationNumbers = () => {
    const pages = [];
    const maxVisiblePages = 5;
    let startPage = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2));
    const endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);

    if (endPage - startPage + 1 < maxVisiblePages) {
      startPage = Math.max(1, endPage - maxVisiblePages + 1);
    }

    for (let i = startPage; i <= endPage; i++) {
      pages.push(
        <button
          key={i}
          onClick={() => handlePageChange(i)}
          className={`px-3 py-1 md:px-4 md:py-2 border rounded-md text-sm md:text-base ${currentPage === i
            ? `bg-${COLORS.accent} text-white`
            : isDark
              ? 'bg-gray-700 text-gray-300 hover:bg-gray-600'
              : 'bg-white text-gray-700 hover:bg-gray-100'
            }`}
        >
          {i}
        </button>
      );
    }

    return pages;
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[400px]">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center text-red-600 p-4">
        {error}
      </div>
    );
  }

  return (
    <div className="space-y-8 px-4 md:px-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
        {plants.map((plant) => {
          const cartItem = cartItems.find((item) => item.plant.id === plant.id);
          return (
            <div
              key={plant.id}
              className={`rounded-lg shadow-md overflow-hidden ${isDark ? 'bg-gray-800' : 'bg-white'
                }`}
            >
              <div className="relative h-48 w-full">
                <Image
                  src={plant.image_url || '/placeholder-plant.jpg'}
                  alt={plant.common_name || 'Plant image'}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
              </div>
              <div className="p-4">
                <h3 className={`text-lg font-semibold ${isDark ? 'text-white' : 'text-gray-800'
                  }`}>
                  {plant.common_name || 'Unknown Plant'}
                </h3>
                <p className={`text-sm italic ${isDark ? 'text-gray-300' : 'text-gray-600'
                  }`}>
                  {plant.scientific_name}
                </p>
                <p className={`text-sm mt-2 ${isDark ? 'text-gray-400' : 'text-gray-500'
                  }`}>
                  Family: {plant.family_common_name || plant.family}
                </p>
                <div className="mt-4 space-y-2">
                  <button
                    onClick={() => handleViewPlant(plant)}
                    className={`w-full py-2 px-4 rounded-md font-medium transition-colors ${isDark
                      ? 'bg-gray-700 hover:bg-gray-600 text-white'
                      : 'bg-gray-200 hover:bg-gray-300 text-gray-800'
                      }`}
                  >
                    View Details
                  </button>
                  <button
                    onClick={() => handleAddToCart(plant)}
                    className={`w-full py-2 px-4 rounded-md font-medium transition-colors ${isDark
                      ? 'bg-green-600 hover:bg-green-700 text-white'
                      : 'bg-green-500 hover:bg-green-600 text-white'
                      }`}
                  >
                    {cartItem ? `Add to Cart (${cartItem.quantity})` : 'Add to Cart'}
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Pagination */}
      <div className="flex flex-col items-center space-y-4">
        <div className="flex flex-wrap justify-center items-center gap-2">
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className={`px-3 py-1 md:px-4 md:py-2 border rounded-md text-sm md:text-base disabled:opacity-50 ${isDark
              ? 'bg-gray-700 text-gray-300 hover:bg-gray-600'
              : 'bg-white text-gray-700 hover:bg-gray-100'
              }`}
          >
            Previous
          </button>

          {renderPaginationNumbers()}

          <button
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            className={`px-3 py-1 md:px-4 md:py-2 border rounded-md text-sm md:text-base disabled:opacity-50 ${isDark
              ? 'bg-gray-700 text-gray-300 hover:bg-gray-600'
              : 'bg-white text-gray-700 hover:bg-gray-100'
              }`}
          >
            Next
          </button>
        </div>

        <div className={`text-sm md:text-base ${isDark ? 'text-gray-400' : 'text-gray-600'
          }`}>
          Showing {plants.length} of {totalItems} plants
        </div>
      </div>

      {/* Plant Modal */}
      {selectedPlant && (
        <PlantModal
          plant={selectedPlant}
          isOpen={!!selectedPlant}
          onClose={handleCloseModal}
        />
      )}
    </div>
  );
} 
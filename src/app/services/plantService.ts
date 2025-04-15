export interface Plant {
  id: number;
  common_name: string;
  scientific_name: string;
  family: string;
  image_url: string;
  year: number;
  bibliography: string;
  author: string;
  status: string;
  rank: string;
  observations: string;
  vegetable: boolean;
  image: string;
  genus: string;
  family_common_name: string;
  synonyms: string[];
  distributions: {
    native: string[];
    introduced: string[];
  };
}

export interface PlantResponse {
  data: Plant[];
  links: {
    self: string;
    first: string;
    next: string;
    last: string;
  };
  meta: {
    total: number;
  };
}

export const plantService = {
  async getPlants(page: number = 1, perPage: number = 12): Promise<PlantResponse> {
    try {
      const response = await fetch(
        `/api/plants?page=${page}&per_page=${perPage}`
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data: PlantResponse = await response.json();
      return data;
    } catch (error) {
      console.error('Error fetching plants:', error);
      throw error;
    }
  },

  async searchPlants(query: string, page: number = 1): Promise<PlantResponse> {
    try {
      const response = await fetch(
        `/api/plants?q=${encodeURIComponent(query)}&page=${page}`
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data: PlantResponse = await response.json();
      return data;
    } catch (error) {
      console.error('Error searching plants:', error);
      throw error;
    }
  }
}; 
import { Category, CategoryCode, City, CityPreview, TouristAttraction } from "../types";
import { Database } from "./types";

const storageURL = process.env.EXPO_PUBLIC_SUPABASE_STORAGE_URL;

type CategoryRow = Database['public']['Tables']['categories']['Row']
type TouristAttractionRow =
  Database["public"]["Tables"]["tourist_attractions"]["Row"];
type CityPreviewRow = {
  id: string | null;
  name: string | null;
  country: string | null;
  cover_image: string | null;
};
type CityWithFullInfo = Database['public']['Views']['cities_with_full_info']['Row']

function toCity(data: CityWithFullInfo): City {
      const categories = data.categories as CategoryRow[];
  const tourist_attractions =
    data.tourist_attractions as TouristAttractionRow[];

    return {
        id: data.id!,
        name: data.name!,
        country: data.country!,
        description: data.description!,
        coverImage: `${storageURL}/${data.cover_image}`,
        location: {
            latitude: data.latitude!,
            longitude: data.longitude!
        },
          categories: categories.map(toCategory),
        touristAttractions: tourist_attractions.map(toTouristAttractions),
    }
    
}

function toCityPreview(row: CityPreviewRow): CityPreview {
  return {
    id: row.id,
    country: row.country,
    name: row.name,
    coverImage: `${storageURL}/${row.cover_image}`,
  } as CityPreview;
}

function toTouristAttractions(row: TouristAttractionRow): TouristAttraction {
  return {
    id: row.id,
    description: row.description,
    name: row.name,
    cityId: row.city_id!,
  };
}

function toCategory(row: CategoryRow):Category {
    return {
            id: row.id,
          description: row.description,
          name: row.name,
          code: row.code as CategoryCode,
    }
}



export const supabaseAdapter = {
  toCity,
  toCityPreview,
}
import { CityFindAllFilters, ICityRepo } from "@/src/domain/city/ICityRepo";
import { City, CityPreview } from "@/src/domain/city/City";
import { supabase } from "./supabase";
import { supabaseAdapter } from "./supabaseAdapter";

const storageURL = process.env.EXPO_PUBLIC_SUPABASE_STORAGE_URL;

async function findAll(filters: CityFindAllFilters): Promise<CityPreview[]> {
  try {
    const fields = "id,name,country,cover_image";

    let cities;
    if (filters.categoryId) {
      const { data } = await supabase
        .from("cities_with_categories")
        .select(fields)
        .eq("category_id", filters.categoryId)
        .ilike("name", `%${filters.name}%`);

      cities = data;
    } else {
      const { data } = await supabase
        .from("cities")
        .select(fields)
        .ilike("name", `%${filters.name}%`);

      cities = data;
    }

    if (!cities) {
      throw new Error("data is not available");
    }

    return cities?.map(
      (row) =>
        ({
          id: row.id,
          country: row.country,
          name: row.name,
          coverImage: `${storageURL}/${row.cover_image}`,
        } as CityPreview)
    );
  } catch (error) {
    throw error;
  }
}

async function findById(id: string): Promise<City> {
  const { data, error } = await supabase
    .from("cities_with_full_info")
    .select("*")
    .eq("id", id)
    .single();

  if (error) {
    throw new Error("city not found");
  }

  return supabaseAdapter.toCity(data);
}

async function getRelatedCities(cityId: string): Promise<CityPreview[]> {
  const { data } = await supabase
    .from("related_cities")
    .select("*")
    .eq("source_city_id", cityId)
    .throwOnError();

  return data.map(supabaseAdapter.toCityPreview);
}

export const SupabaseCityRepo: ICityRepo = {
  findAll,
  findById,
  getRelatedCities,
};

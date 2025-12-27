import { supabaseService } from "../supabase/supabaseService";
import { useFetchData } from "./useFetchData";

export function useRelatedCities(cityId: string) {
  // return cities.filter((city) => relatedCitiesIds.includes(city.id));
  return useFetchData(() => supabaseService.getRelatedCities(cityId));
}

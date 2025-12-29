import { Box } from "@/src/components/Box";
import { CityCard } from "@/src/components/CityCard";
import { Screen } from "@/src/components/Screen";
import { CityFilter } from "@/src/containers/CityFilter";
import { CityPreview } from "@/src/domain/city/City";
import { useCityFindAll } from "@/src/domain/city/operations/useCityFindAll";
import { useCategoryFindAll } from "@/src/domain/category/operations/useCategoryFindAll";
import { useDebounce } from "@/src/utils/hooks/useDebounce";
import { useRepository } from "@/src/infra/repositories/RepositoryProvider";
import { useAppTheme } from "@/src/theme/useAppTheme";
import { useScrollToTop } from "@react-navigation/native";
import { useRef, useState } from "react";
import { ListRenderItemInfo } from "react-native";
import Animated, { FadingTransition } from "react-native-reanimated";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function HomeScreen() {
  const { spacing } = useAppTheme();
  const { top } = useSafeAreaInsets();
  const { city } = useRepository();
  const [cityName, setCityName] = useState("");
  const debouncedCityName = useDebounce(cityName);
  const [selectedCategoryId, setSelectedCategoryId] = useState<string | null>(
    null
  );

  const { data: cities } = useCityFindAll(
    {
      name: debouncedCityName,
      categoryId: selectedCategoryId,
    },
    city
  );

  const { data: categories } = useCategoryFindAll();

  const flatListRef = useRef(null);
  useScrollToTop(flatListRef);

  function renderItem({ item }: ListRenderItemInfo<CityPreview>) {
    return (
      <Box paddingHorizontal="padding">
        <CityCard cityPreview={item} />
      </Box>
    );
  }

  return (
    <Screen style={{ paddingHorizontal: 0 }}>
      <Animated.FlatList
        itemLayoutAnimation={FadingTransition.delay(500)}
        ref={flatListRef}
        contentContainerStyle={{
          gap: spacing.padding,
          paddingTop: top,
          paddingBottom: spacing.padding,
        }}
        keyExtractor={(item) => item.id}
        data={cities}
        renderItem={renderItem}
        showsVerticalScrollIndicator={false}
        ListHeaderComponent={
          <CityFilter
            categories={categories}
            cityName={cityName}
            onChangeCityName={setCityName}
            selectedCategoryId={selectedCategoryId}
            onChangeSelectedCategoryId={setSelectedCategoryId}
          />
        }
      />
    </Screen>
  );
}

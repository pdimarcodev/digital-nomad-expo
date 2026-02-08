import { CityPreview } from "@/src/domain/city/City";
import { useFindAllFavorites } from "@/src/domain/city/operations/useFindAllFavorites";
import { useCallback, useMemo } from "react";
import { FlatList, FlatListProps, ListRenderItemInfo } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { FavoriteCityCard } from "../../components/FavoriteCityCard";
import { useAppTheme } from "../../theme/useAppTheme";

export function FavoriteCityList({
  ListFooterComponent,
  ListHeaderComponent,
}: Pick<
  FlatListProps<CityPreview>,
  "ListFooterComponent" | "ListHeaderComponent"
>) {
  const { data: favoriteList } = useFindAllFavorites();
  const { spacing } = useAppTheme();
  const { top } = useSafeAreaInsets();

  const renderItem = useCallback(
    ({ item }: ListRenderItemInfo<CityPreview>) => (
      <FavoriteCityCard cityPreview={item} />
    ),
    [],
  );

  const contentContainerStyle = useMemo(
    () => ({
      gap: spacing.padding,
      paddingTop: top,
      paddingBottom: spacing.padding,
    }),
    [spacing.padding, top],
  );

  return (
    <FlatList
      data={favoriteList}
      renderItem={renderItem}
      keyExtractor={(item) => item.id}
      showsVerticalScrollIndicator={false}
      ListHeaderComponent={ListHeaderComponent}
      ListFooterComponent={ListFooterComponent}
      contentContainerStyle={contentContainerStyle}
    />
  );
}

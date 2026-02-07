import { Box } from "@/src/ui/components/Box";
import { Screen } from "@/src/ui/components/Screen";
import { Text } from "@/src/ui/components/Text";
import { useAppTheme } from "@/src/ui/theme/useAppTheme";
import { useScrollToTop } from "@react-navigation/native";
import { useRef } from "react";
import { ListRenderItemInfo } from "react-native";
import Animated, { FadingTransition } from "react-native-reanimated";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useCityFindGroupedByCategory } from "@/src/domain/city/operations/useCityFindGroupedByCategory";
import { CitiesGroupedByCategory } from "@/src/domain/city/ICityRepo";
import { CitiesGroupedByCategoryItem } from "@/src/ui/components/CitiesGroupedByCategoryItem";

export default function ExploreScreen() {
  const { spacing } = useAppTheme();
  const { top } = useSafeAreaInsets();

  const {
    data: groupedCities,
    isLoading,
    error,
  } = useCityFindGroupedByCategory();

  const flatListRef = useRef(null);
  useScrollToTop(flatListRef);

  function renderItem({ item }: ListRenderItemInfo<CitiesGroupedByCategory>) {
    return <CitiesGroupedByCategoryItem item={item} />;
  }

  function renderEmptyComponent() {
    let Content;

    if (isLoading) {
      Content = <Text>Loading categories...</Text>;
    } else if (error) {
      Content = (
        <Text>Error loading categories. {(error as Error).message}</Text>
      );
    } else {
      Content = <Text>No categories at the moment</Text>;
    }

    return (
      <Box alignSelf="center" mt="s32">
        {Content}
      </Box>
    );
  }

  return (
    <Screen style={{ paddingHorizontal: 0 }}>
      <Animated.FlatList
        itemLayoutAnimation={FadingTransition.duration(500)}
        ref={flatListRef}
        contentContainerStyle={{
          gap: spacing.s24,
          paddingTop: top,
          paddingBottom: spacing.padding,
        }}
        data={groupedCities}
        renderItem={renderItem}
        showsVerticalScrollIndicator={false}
        keyExtractor={(item) => item.category.id}
        ListEmptyComponent={renderEmptyComponent()}
      />
    </Screen>
  );
}

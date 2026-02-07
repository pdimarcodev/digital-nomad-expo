import { ScrollView } from "react-native";
import { CitiesGroupedByCategory } from "@/src/domain/city/ICityRepo";
import { useAppTheme } from "../theme/useAppTheme";
import { Box } from "./Box";
import { Text } from "./Text";
import { Icon } from "./Icon";
import { CityCard } from "./CityCard";
import { categoryIconMap } from "./CategoryPill";

type CitiesGroupedByCategoryItemProps = {
  item: CitiesGroupedByCategory;
};

export function CitiesGroupedByCategoryItem({
  item,
}: CitiesGroupedByCategoryItemProps) {
  const { spacing } = useAppTheme();

  return (
    <Box>
      <Box
        flexDirection="row"
        alignItems="center"
        gap="s12"
        paddingHorizontal="padding"
        marginBottom="s16"
      >
        <Icon name={categoryIconMap[item.category.code]} size={32} />
        <Box flex={1}>
          <Text variant="title16">{item.category.name}</Text>
          {item.category.description && (
            <Text variant="text12" color="gray2">
              {item.category.description}
            </Text>
          )}
        </Box>
      </Box>

      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{
          gap: spacing.padding,
          paddingHorizontal: spacing.padding,
        }}
      >
        {item.cities.map((city) => (
          <CityCard
            key={city.id}
            cityPreview={city}
            type="small"
            disableFavorite={true}
          />
        ))}
      </ScrollView>
    </Box>
  );
}

import {
  ImageBackground,
  ImageBackgroundProps,
  Pressable,
  useWindowDimensions,
} from "react-native";

import { Link } from "expo-router";
import { useAppTheme } from "../theme/useAppTheme";

import { CityPreview } from "@/src/domain/city/City";
import { BlackOpacity } from "./BlackOpacity";
import { Box } from "./Box";
import { CityFavoriteButton } from "./CityFavoriteButton";
import { Text } from "./Text";

type CityCardProps = {
  cityPreview: CityPreview;
  style?: ImageBackgroundProps["style"];
  type?: "small" | "large";
  disableFavorite?: boolean;
};

export function CityCard({
  cityPreview,
  style,
  type = "large",
  disableFavorite = false,
}: CityCardProps) {
  const { borderRadii } = useAppTheme();
  const { width: windowWidth } = useWindowDimensions();

  const cardWidth = type === "small" ? windowWidth * 0.7 : "100%";
  const cardHeight = type === "small" ? windowWidth * 0.7 * 0.9 : 280;

  return (
    <Link push href={`/city-details/${cityPreview.id}`} asChild>
      <Pressable>
        <ImageBackground
          source={
            typeof cityPreview.coverImage === "number"
              ? cityPreview.coverImage
              : { uri: cityPreview.coverImage }
          }
          style={[{ width: cardWidth, height: cardHeight }, style]}
          imageStyle={{ borderRadius: borderRadii.default }}
        >
          <BlackOpacity />
          <Box flex={1} padding="s24" justifyContent="space-between">
            {!disableFavorite && (
              <Box alignSelf="flex-end">
                <CityFavoriteButton city={cityPreview} />
              </Box>
            )}

            <Box>
              <Text variant="title22">{cityPreview.name}</Text>
              <Text variant="text16">{cityPreview.country}</Text>
            </Box>
          </Box>
        </ImageBackground>
      </Pressable>
    </Link>
  );
}

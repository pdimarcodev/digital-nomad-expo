import { useRouter } from "expo-router";
import { ImageBackground } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Box } from "../components/Box";
import { Icon } from "../components/Icon";
import { IconButton } from "../components/IconButton";
import { City } from "../types";

type CityDetailsHeaderProps = Pick<City,
  | "id" | "categories" | "coverImage">

export function CityDetailsHeader({ id, categories, coverImage }: CityDetailsHeaderProps) {
  const router = useRouter()
  const { top } = useSafeAreaInsets()

  return (
    <Box>
      <ImageBackground
        source={coverImage}
        style={{
          width: "100%",
          height: 250,
        }}
        imageStyle={{
          borderBottomRightRadius: 40
        }}
      >
        <Box
          flexDirection="row"
          justifyContent="space-between"
          alignItems="center"
          padding="padding"
          style={{ paddingTop: top }}
        >
          <IconButton iconName="Chevron-left" onPress={router.back} />
          <Icon name="Favorite-outline" size={30} color="pureWhite" />
        </Box>
      </ImageBackground>
    </Box>
  )
}

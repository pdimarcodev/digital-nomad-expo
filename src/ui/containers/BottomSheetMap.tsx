import { ComponentPropsWithoutRef } from "react";
import { useWindowDimensions } from "react-native";
import MapView from "react-native-maps";
import { BottomSheet } from "../components/BottomSheet";
import { Box } from "../components/Box";
import { IconButton } from "../components/IconButton";
import { useAppTheme } from "../theme/useAppTheme";
import { City } from "@/src/domain/city/City";

interface BottomSheetMapProps
  extends Omit<ComponentPropsWithoutRef<typeof BottomSheet>, "children"> {
  location: City["location"];
}

export function BottomSheetMap({ location, ...props }: BottomSheetMapProps) {
  const { height } = useWindowDimensions();
  const { borderRadii, spacing } = useAppTheme();

  return (
    <BottomSheet {...props}>
      <MapView
        style={{
          width: "100%",
          height: height * 0.7,
          borderRadius: borderRadii.default,
        }}
        initialRegion={{
          latitude: location.latitude,
          longitude: location.longitude,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.2,
        }}
      ></MapView>
      <Box position="absolute" top={spacing.padding} right={spacing.padding}>
        <IconButton iconName="Close" onPress={props.onPress} />
      </Box>
    </BottomSheet>
  );
}

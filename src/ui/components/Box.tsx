import {
  backgroundColor,
  BackgroundColorProps,
  border,
  BorderProps,
  createBox,
  createRestyleComponent,
  layout,
  LayoutProps,
  spacing,
  SpacingProps,
  spacingShorthand,
  SpacingShorthandProps,
} from "@shopify/restyle";
import {
  TouchableOpacity as RNTouchableOpacity,
  TouchableOpacityProps as RNTouchableOpacityProps,
} from "react-native";
import { Theme } from "../theme/theme";

export const Box = createBox<Theme>();
export type BoxProps = React.ComponentProps<typeof Box>;

type RestyleStyle = BackgroundColorProps<Theme> &
  SpacingProps<Theme> &
  LayoutProps<Theme> &
  BorderProps<Theme> &
  SpacingShorthandProps<Theme>;

export type TouchableOpacityBoxProps = RNTouchableOpacityProps & RestyleStyle;

export const TouchableOpacityBox = createRestyleComponent<
  TouchableOpacityBox,
  Theme
>(
  [backgroundColor, spacing, layout, border, spacingShorthand],
  RNTouchableOpacity
);

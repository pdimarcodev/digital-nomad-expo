import { Pressable, PressableProps } from "react-native";
import { Box, BoxProps } from "./Box";
import { Icon, IconName } from "./Icon";
import { Text } from "./Text";

export type PillProps = {
  label: string;
  iconName: IconName;
  active: boolean;
  onPress?: PressableProps['onPress'];
}

/**
 * The height of the pill is the sum of the icon size, padding, and border width.
 * This is used to calculate the marginTop of the pill to center it vertically.
 */
// Icon=16; paddingVertical 8*2; borderWidth 2*2.
export const PILL_HEIGHT = 16 + 16 + 4

export function Pill({ label, iconName, active, onPress }: PillProps) {

  return (
    <Pressable
      onPress={onPress}
    // Log component height on render
    // onLayout={e => console.log(e.nativeEvent.layout.height)}
    >
      <Box {...boxStyle} backgroundColor={active ? "gray1" : "transparent"} >
        <Icon name={iconName} size={16} color={active ? "primary" : "gray2"} />
        <Text ml="s4" variant="text12">{label}</Text>
      </Box>
    </Pressable>
  )
}

const boxStyle: BoxProps = {
  flexDirection: 'row',
  alignItems: 'center',
  borderWidth: 2,
  borderRadius: 'rounded',
  borderColor: 'gray1',
  paddingVertical: 's8',
  paddingHorizontal: 's12'
}

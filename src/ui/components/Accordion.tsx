
import { Pressable, StyleSheet, View } from "react-native";
import Animated, { interpolate, interpolateColor, SharedValue, useAnimatedStyle, useSharedValue, withTiming } from "react-native-reanimated";
import theme from "../theme/theme";
import { useAppTheme } from "../theme/useAppTheme";
import { Box } from "./Box";
import { Text } from "./Text";

const DURATION = 600

export type AccordionProps = {
  title: string;
  description: string;
}

export function Accordion({ title, description }: AccordionProps) {
  // const [isOpen, setIsOpen] = useState(false)
  const isOpen = useSharedValue(false)
  const progress = useSharedValue(0) // 0 -> 1

  function handleOpenPress() {
    isOpen.value = !isOpen.value
    progress.value = withTiming(isOpen.value ? 0 : 1,
      { duration: DURATION })
  }

  return (
    <Pressable onPress={handleOpenPress}>
      <View>
        <AccordionHeader
          title={title}
          progress={progress}
        />
        <AccordionBody
          description={description}
          progress={progress}
          isOpen={isOpen}
        />
      </View>
    </Pressable>
  )
}

function AccordionHeader({ title, progress }:
  {
    title: string,
    progress: SharedValue<number>
  }) {

  const { colors, borderRadii } = useAppTheme()

  const iconAnimatedStyle = useAnimatedStyle(() => ({
    tintColor: interpolateColor(progress.value, [0, 1], [colors.gray2, colors.primary]),
    transform: [{
      rotate: interpolate(progress.value, [0, 1], [0, -180]) + "deg"
    }]
  }))

  const animatedStyle = useAnimatedStyle(() => ({
    backgroundColor: interpolateColor(progress.value, [0, 1], [colors.transparent, colors.gray1]),
    borderBottomLeftRadius: interpolate(progress.value, [0, 1], [borderRadii.default, 0]),
    borderBottomRightRadius: interpolate(progress.value, [0, 1], [borderRadii.default, 0]),
  }))

  return (
    <Animated.View style={[styles.header, animatedStyle]}>
      <Box flexShrink={1}>
        <Text variant="title16">{title}</Text>
      </Box>
      {/* <Animated.View style={iconAnimatedStyle}> */}
      <Animated.Image
        source={require("@/assets/images/chevron-down.png")}
        style={[iconAnimatedStyle, { width: 24, height: 24 }]}
      />
      {/* <Icon name="Chevron-down" /> */}
      {/* </Animated.View> */}
    </Animated.View>
  )
}

function AccordionBody({ description, progress, isOpen }:
  {
    description: string,
    progress: SharedValue<number>,
    isOpen: SharedValue<boolean>
  }) {
  const { borderRadii } = useAppTheme()
  const height = useSharedValue(0)

  // Usamos derived en lugar de animated style, mas simple.
  /*   const derivedHeight = useDerivedValue(() =>
      withTiming(height.value * Number(isOpen.value),
        { duration: DURATION })
    ) */

  // const animatedStyle = useAnimatedStyle(() => ({
  //   height: withTiming(height.value * Number(isOpen.value),
  //     { duration: 500 })
  // height: isOpen.value ?
  //   withTiming(height.value, { duration: 500 }) :
  //   withTiming(0, { duration: 500 })
  // }))

  const animatedStyle = useAnimatedStyle(() => ({
    opacity: interpolate(progress.value, [0, 1], [0, 1]),
    height: interpolate(progress.value, [0, 1], [0, height.value]),
    borderTopLeftRadius: interpolate(progress.value, [0, 1], [borderRadii.default, 0]),
    borderTopRightRadius: interpolate(progress.value, [0, 1], [borderRadii.default, 0]),
  }))

  return (
    <Animated.View style={[animatedStyle, { overflow: 'hidden' }]}>
      {/*     </Animated.View>     <Animated.View style={{
      overflow: 'hidden',
      height: derivedHeight,
    }}>  */}
      <View
        style={styles.body}
        onLayout={e => height.value = e.nativeEvent.layout.height}
      >
        <Text>{description}</Text>
      </View>
    </Animated.View>
  )
}

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    borderWidth: 2,
    borderColor: theme.colors.gray1,
    borderRadius: theme.borderRadii.default
  },
  body: {
    position: 'absolute',
    paddingHorizontal: 16,
    paddingBottom: 16,
    backgroundColor: theme.colors.gray1,
    borderBottomLeftRadius: theme.borderRadii.default,
    borderBottomRightRadius: theme.borderRadii.default
  }
})

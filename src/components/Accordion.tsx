
import { Pressable, StyleSheet, View } from "react-native";
import Animated, { SharedValue, useDerivedValue, useSharedValue, withTiming } from "react-native-reanimated";
import theme from "../theme/theme";
import { Box } from "./Box";
import { Icon } from "./Icon";
import { Text } from "./Text";

const DURATION = 500

export type AccordionProps = {
  title: string;
  description: string;
}

export function Accordion({ title, description }: AccordionProps) {
  // const [isOpen, setIsOpen] = useState(false)
  const isOpen = useSharedValue(false)

  function handleOpenPress() {
    isOpen.value = !isOpen.value
  }

  return (
    <Pressable onPress={handleOpenPress}>
      <View>
        <AccordionHeader title={title} />
        <AccordionBody
          description={description}
          isOpen={isOpen}
        />
      </View>
    </Pressable>
  )
}

function AccordionHeader({ title }: { title: string }) {

  return (
    <View style={styles.header}>
      <Box flexShrink={1}>
        <Text variant="title16">{title}</Text>
      </Box>
      <Icon name="Chevron-down" />
    </View>
  )
}

function AccordionBody({ description, isOpen }:
  {
    description: string,
    isOpen: SharedValue<boolean>
  }) {
  const height = useSharedValue(0)

  // Usamos derived en lugar de animated style, mas simple.
  const derivedHeight = useDerivedValue(() =>
    withTiming(height.value * Number(isOpen.value),
      { duration: DURATION })
  )

  // const animatedStyle = useAnimatedStyle(() => ({
  //   height: withTiming(height.value * Number(isOpen.value),
  //     { duration: 500 })
  // height: isOpen.value ?
  //   withTiming(height.value, { duration: 500 }) :
  //   withTiming(0, { duration: 500 })
  // }))

  return (
    // <Animated.View style={[animatedStyle, { overflow: 'hidden' }]}>
    <Animated.View style={{
      overflow: 'hidden',
      height: derivedHeight,
    }}>
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

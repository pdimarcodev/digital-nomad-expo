import { PropsWithChildren } from 'react';
import { ScrollView, View } from "react-native";
import { Box, BoxProps } from './Box';

export function Screen({
  scrollable = false,
  children,
  ...boxProps
}: PropsWithChildren & BoxProps & { scrollable?: boolean }) {
  const Container = scrollable ? ScrollView : View

  return (
    <Box
      flex={1}
      backgroundColor="background"
      paddingHorizontal="padding"
      {...boxProps}
    >
      <Container>{children}</Container>
    </Box>
  )
}

import { PropsWithChildren } from "react";
import { KeyboardAvoidingView, Platform, ScrollView, View } from "react-native";
import { Box, BoxProps } from "./Box";

export function Screen({
  scrollable = false,
  children,
  ...boxProps
}: PropsWithChildren & BoxProps & { scrollable?: boolean }) {
  const Container = scrollable ? ScrollView : View;

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <Box
        flex={1}
        backgroundColor="background"
        paddingHorizontal="padding"
        {...boxProps}
      >
        <Container showsHorizontalScrollIndicator={false}>{children}</Container>
      </Box>
    </KeyboardAvoidingView>
  );
}

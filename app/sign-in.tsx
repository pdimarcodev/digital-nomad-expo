import { useAuthSignIn } from "@/src/domain/auth/operations/useAuthSignIn";
import { Button } from "@/src/ui/components/Button";
import { Screen } from "@/src/ui/components/Screen";
import { Text } from "@/src/ui/components/Text";
import { TextInput } from "@/src/ui/components/TextInput";
import { Logo } from "@/src/ui/containers/Logo";
import { TextLink } from "@/src/ui/containers/TextLink";
import { Link } from "expo-router";
import { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";

export default function SignInScreen() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { mutate: signIn } = useAuthSignIn();

  function handleSignIn() {
    signIn({ email, password });
  }

  return (
    <Screen>
      <SafeAreaView>
        <Logo />
        <Text variant="title22" alignSelf="center" mb="s16">
          Welcome
        </Text>
        <TextInput
          label="Email"
          autoCapitalize="none"
          value={email}
          onChangeText={setEmail}
          placeholder="Your email"
        />
        <TextInput
          // errorMessage="Error message"
          label="Password"
          autoCapitalize="none"
          value={password}
          onChangeText={setPassword}
          placeholder="Your password"
          secureTextEntry
        />
        <Link href="/reset-password" asChild>
          <Text mb="s16" alignSelf="flex-end" variant="text14" color="primary">
            Forgot my password
          </Text>
        </Link>
        <Button title="Sign in" mt="s20" onPress={handleSignIn} />
        <TextLink href="/sign-up" text="No account yet?" ctaText="Create" />
      </SafeAreaView>
    </Screen>
  );
}

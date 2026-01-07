import { useAuthSignIn } from "@/src/domain/auth/operations/useAuthSignIn";
import { Button } from "@/src/ui/components/Button";
import { Screen } from "@/src/ui/components/Screen";
import { TextInput } from "@/src/ui/components/TextInput";
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
        <TextInput
          label="Email"
          autoCapitalize="none"
          value={email}
          onChangeText={setEmail}
          placeholder="Your email"
        />
        <TextInput
          errorMessage="Error message"
          label="Password"
          autoCapitalize="none"
          value={password}
          onChangeText={setPassword}
          placeholder="Your password"
          secureTextEntry
        />
        <Button title="Sign in" mt="s20" onPress={handleSignIn} />
      </SafeAreaView>
    </Screen>
  );
}

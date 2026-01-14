import { Box } from "../../components/Box";
import { Button } from "../../components/Button";

import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import { TextInput } from "../../components/TextInput";
import { SignUpSchema, signUpSchema } from "./SignUpSchema";

type SignUpFormProps = {
  onSubmit: (data: SignUpSchema) => void;
};

export function SignUpForm({ onSubmit }: SignUpFormProps) {
  const { control, handleSubmit } = useForm<SignUpSchema>({
    resolver: zodResolver(signUpSchema),
  });

  return (
    <Box>
      <Controller
        control={control}
        name="fullname"
        render={({ field, fieldState }) => (
          <TextInput
            label="Full name"
            value={field.value}
            onChangeText={field.onChange}
            placeholder="Full name"
            errorMessage={fieldState.error?.message}
          />
        )}
      />

      <Controller
        control={control}
        name="email"
        render={({ field, fieldState }) => (
          <TextInput
            label="E-mail"
            autoCapitalize="none"
            keyboardType="email-address"
            value={field.value}
            onChangeText={field.onChange}
            placeholder="Email"
            errorMessage={fieldState.error?.message}
          />
        )}
      />

      <Controller
        control={control}
        name="password"
        render={({ field, fieldState }) => (
          <TextInput
            label="Password"
            secureTextEntry
            value={field.value}
            onChangeText={field.onChange}
            placeholder="Password"
            errorMessage={fieldState.error?.message}
          />
        )}
      />

      <Controller
        control={control}
        name="confirmPassword"
        render={({ field, fieldState }) => (
          <TextInput
            label="Confirm password"
            secureTextEntry
            value={field.value}
            onChangeText={field.onChange}
            placeholder="Confirm password"
            errorMessage={fieldState.error?.message}
          />
        )}
      />

      <Button
        mt="s16"
        title="Create account"
        onPress={handleSubmit(onSubmit)}
      />
    </Box>
  );
}

import { Box } from "../../components/Box";
import { Button } from "../../components/Button";

import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import { Text } from "../../components/Text";
import { TextInput } from "../../components/TextInput";
import {
  updatePasswordSchema,
  UpdatePasswordSchema,
} from "./UpdatePasswordSchema";

type UpdatePasswordFormProps = {
  onSubmit: (data: UpdatePasswordSchema) => void;
};

export function UpdatePasswordForm({ onSubmit }: UpdatePasswordFormProps) {
  const { control, handleSubmit } = useForm<UpdatePasswordSchema>({
    resolver: zodResolver(updatePasswordSchema),
  });

  return (
    <Box>
      <Text mb="s16">
        We recommend using a combination of letters, numbers and symbols for
        greater protection.
      </Text>

      <Controller
        control={control}
        name="currentPassword"
        render={({ field, fieldState }) => (
          <TextInput
            testID="current-password-input"
            label="Current Password"
            secureTextEntry
            value={field.value}
            onChangeText={field.onChange}
            placeholder="Current password"
            errorMessage={fieldState.error?.message}
          />
        )}
      />
      <Controller
        control={control}
        name="newPassword"
        render={({ field, fieldState }) => (
          <TextInput
            testID="new-password-input"
            label="New password"
            secureTextEntry
            value={field.value}
            onChangeText={field.onChange}
            placeholder="Your password"
            errorMessage={fieldState.error?.message}
          />
        )}
      />
      <Controller
        control={control}
        name="confirmNewPassword"
        render={({ field, fieldState }) => (
          <TextInput
            testID="confirm-new-password-input"
            label="Confirm new password"
            secureTextEntry
            value={field.value}
            onChangeText={field.onChange}
            placeholder="Your password"
            errorMessage={fieldState.error?.message}
          />
        )}
      />

      <Button
        testID="submit-button"
        mt="s16"
        title="Update"
        onPress={handleSubmit(onSubmit)}
      />
    </Box>
  );
}

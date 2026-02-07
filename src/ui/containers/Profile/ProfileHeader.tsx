import { AuthUser } from "@/src/domain/auth/AuthUser";
import { dateUtils } from "@/src/utils/dateUtils";
import { router } from "expo-router";
import { Box } from "../../components/Box";
import { Button } from "../../components/Button";
import { Text } from "../../components/Text";

type ProfileHeaderProps = {
  authUser: AuthUser;
};

export function ProfileHeader({ authUser }: ProfileHeaderProps) {
  return (
    <Box>
      <Text variant="title16" alignSelf="center" mb="s40">
        Profile
      </Text>

      <Text variant="title16" mb="s16">
        Account Information
      </Text>

      <Box rowGap="s4">
        <LineItem label="Name" value={authUser.fullname} />
        <LineItem label="Email" value={authUser.email} />
        <LineItem
          label="Member since"
          value={dateUtils.formatMonthAndYear(authUser.createdAt)}
        />
      </Box>

      <Box flexDirection="row" columnGap="s16" mt="s16" alignItems="stretch">
        <Box flex={1}>
          <Button
            title="Edit profile"
            variant="secondary"
            flex={1}
            onPress={() =>
              router.navigate({
                pathname: "/update-profile",
                params: {
                  fullname: authUser.fullname,
                  email: authUser.email,
                },
              })
            }
          />
        </Box>
        <Box flex={1}>
          <Button
            title="Change password"
            variant="secondary"
            flex={1}
            onPress={() => router.navigate("/(protected)/update-password")}
          />
        </Box>
      </Box>
    </Box>
  );
}

function LineItem({ label, value }: { label: string; value: string }) {
  return (
    <Box flexDirection="row" justifyContent="space-between">
      <Text variant="text14" color="gray2">
        {label}
      </Text>
      <Text variant="text14" color="text">
        {value}
      </Text>
    </Box>
  );
}

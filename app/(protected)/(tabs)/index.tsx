import { Box } from '@/src/components/Box';
import { Text } from '@/src/components/Text';

export default function HomeScreen() {
  return (
    <Box
      flex={1}
      backgroundColor="mainBackground"
    >
      <Text marginTop="xl" color="text">Home Screen</Text>
    </Box>
  );
}

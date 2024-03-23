import { RouteProp, useRoute } from '@react-navigation/native';
import { Box, Text } from 'theme';

import { RootStackParamList } from '../navigation';

type DetailsSreenRouteProp = RouteProp<RootStackParamList, 'Details'>;

export default function Details() {
  const router = useRoute<DetailsSreenRouteProp>();

  return (
    <Box flex={1} padding="ml_24">
      <Box flex={1} maxWidth={960}>
        <Text variant="extra_large">Details</Text>
        <Text variant="large" color="darkGray">
          Showing details for user {router.params.name}.
        </Text>
      </Box>
    </Box>
  );
}

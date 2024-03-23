import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { TouchableOpacity } from 'react-native';
import { Box, Text, makeStyles } from 'theme';

import { RootStackParamList } from '../navigation';

type OverviewScreenNavigationProps = StackNavigationProp<RootStackParamList, 'Overview'>;

export default function Overview() {
  const navigation = useNavigation<OverviewScreenNavigationProps>();

  const styles = useStyles();
  return (
    <Box flex={1} padding="ml_24">
      <Box flex={1} maxWidth={960} justifyContent="space-between">
        <Box>
          <Text variant="extra_large">Hello World</Text>
          <Text variant="large" color="darkGray">
            This is the first page of your app.
          </Text>
        </Box>
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate('Details', { name: 'Dan' })}>
          <Text variant="body" textAlign="center" color="white" fontWeight="600">
            Show Details
          </Text>
        </TouchableOpacity>
      </Box>
    </Box>
  );
}

const useStyles = makeStyles((theme) => ({
  button: {
    alignItems: 'center',
    backgroundColor: theme.colors.purple,
    borderRadius: theme.borderRadii.xl_24,
    elevation: 5,
    flexDirection: 'row',
    justifyContent: 'center',
    padding: theme.spacing.m_16,
    shadowColor: theme.colors.black,
    shadowOffset: {
      height: 2,
      width: 0,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
}));

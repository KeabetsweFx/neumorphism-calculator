import { Feather } from '@expo/vector-icons';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { Box, Text, useTheme } from 'theme';

import Details from '../screens/details';
import Overview from '../screens/overview';

export type RootStackParamList = {
  Overview: undefined;
  Details: { name: string };
};

const Stack = createStackNavigator<RootStackParamList>();

export default function RootStack() {
  const { colors } = useTheme();

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Overview">
        <Stack.Screen name="Overview" component={Overview} />
        <Stack.Screen
          name="Details"
          component={Details}
          options={({ navigation }) => ({
            headerLeft: () => (
              <Box flexDirection="row" paddingLeft="m_16">
                <Feather name="chevron-left" size={16} color={colors.blue} />
                <Text marginLeft="xs_4" color="blue" onPress={navigation.goBack}>
                  Back
                </Text>
              </Box>
            ),
          })}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

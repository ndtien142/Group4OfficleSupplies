import { createStackNavigator } from '@react-navigation/stack';
import ManageListProductContainer from '../list';
import AddProduct from '..';

const Stack = createStackNavigator();

const AppNavigator = () => {
  return (
    <Stack.Navigator initialRouteName="ManageListProduct">
      <Stack.Screen name="ManageListProduct" component={ManageListProductContainer} />
      <Stack.Screen name="AddProduct" component={AddProduct} />
    </Stack.Navigator>
  );
};

export default AppNavigator;

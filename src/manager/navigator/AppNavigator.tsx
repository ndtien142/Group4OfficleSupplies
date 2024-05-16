import { createStackNavigator } from '@react-navigation/stack';
import ManageListProductContainer from '../list';
import AddProduct from '..';
import ManagerEditContainer from '../edit';

const Stack = createStackNavigator();

const AppNavigator = () => {
  return (
    <Stack.Navigator initialRouteName="ManageListProduct">
      <Stack.Screen name="ManageListProduct" component={ManageListProductContainer} />
      <Stack.Screen name="AddProduct" component={AddProduct} />
      <Stack.Screen name="ManagerEditContainer" component={ManagerEditContainer} />
    </Stack.Navigator>
  );
};

export default AppNavigator;

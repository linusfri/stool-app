/** 
 * This component is a wrapper around the JS-BASED React Navigation Stack Navigator.
 * The native one is not used because it does not play nicely with the Tabs component.
 */

import { ParamListBase, StackNavigationState } from '@react-navigation/native';
import {
  createStackNavigator,
  StackNavigationEventMap,
  StackNavigationOptions,
} from '@react-navigation/stack';
import { withLayoutContext } from 'expo-router';

const { Navigator } = createStackNavigator();

export const Stack = withLayoutContext<
  StackNavigationOptions,
  typeof Navigator,
  StackNavigationState<ParamListBase>,
  StackNavigationEventMap
>(Navigator);

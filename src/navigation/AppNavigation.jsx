import React from "react";

import { createStackNavigator } from "@react-navigation/stack";

import { Welcome } from "../screens";

const Stack = createStackNavigator();

export const AppNavigation = () => {
  return (
    <Stack.Navigator headerMode="none">
      <Stack.Screen name="Welcone" component={Welcome} />
    </Stack.Navigator>
  );
};

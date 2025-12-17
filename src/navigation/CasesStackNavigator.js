import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import CasesScreen from "../screens/cases/CasesScreen";
import AddCaseScreen from "../screens/cases/AddCaseScreen";

const Stack = createNativeStackNavigator();

export default function CasesStackNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="CasesList"
        component={CasesScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="AddCase"
        component={AddCaseScreen}
        options={{ title: "Add New Case" }}
      />
    </Stack.Navigator>
  );
}

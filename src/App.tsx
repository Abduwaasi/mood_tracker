import React from "react"
import { Platform, UIManager } from "react-native"

import { NavigationContainer } from "@react-navigation/native"
import BottomTabsNavigator from "./screens/BottomTabs.navigator"
import { AppProvider } from "./App.Provider"

if (Platform.OS === "android") {
  if (UIManager.setLayoutAnimationEnabledExperimental) {
    UIManager.setLayoutAnimationEnabledExperimental(true)
  }
}

const App: React.FC = () => {
  return <AppProvider>
    <NavigationContainer>
      <BottomTabsNavigator />
    </NavigationContainer>
  </AppProvider>
}



export default App
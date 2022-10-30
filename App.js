import { StyleSheet, Text, View } from 'react-native'
import { StatusBar } from 'react-native'
import Tabs from './navigation/Tabs'
import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { SafeAreaProvider } from 'react-native-safe-area-context'
import GlobalStackNavigator from './navigation/GlobalStackNavigator'
import useCachedResources from './hooks/useCachedResources';

import { NhostClient, NhostReactProvider } from '@nhost/react';
import * as SecureStore from 'expo-secure-store';

const nhost = new NhostClient({
  backendUrl: "https://frpwruiflgdyechmlnct.nhost.run",
  clientStorageType: 'expo-secure-storage',
  clientStorage: SecureStore,
});

const App = () => {
  const isLoadingComplete = useCachedResources();
  return (
    <NhostReactProvider nhost={nhost}>
      <SafeAreaProvider>
        <NavigationContainer>
          <GlobalStackNavigator />
        </NavigationContainer>
      </SafeAreaProvider>
    </NhostReactProvider>
  )
}

export default App

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  }
})
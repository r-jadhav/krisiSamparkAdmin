import React from 'react'
import { Text } from 'react-native'
import { NavigationContainer } from '@react-navigation/native'
import AppNavigator from './src/navigation/AppNavigator'
import { AppProvider } from './src/context/AppContext'

const App = () => {
	return (
		<AppProvider>
			<AppNavigator />
		</AppProvider>
	)
}

export default App

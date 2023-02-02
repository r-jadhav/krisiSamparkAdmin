import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import {
	createStackNavigator,
	TransitionPresets,
} from '@react-navigation/stack'
import TabNavigator from './TabNavigator'

import AddCategory from '../screens/AddCategory'
import AddSubCategory from '../screens/AddSubCategory'
import AddSeedling from '../screens/AddSeedling'
import AddNotification from '../screens/AddNotification'
import ViewSubCat from '../screens/ViewSubCat'
import ViewTypes from '../screens/ViewTypes'
import Contribution from '../screens/Contribution'
import ViewUser from '../screens/ViewUser'
import EditCategory from '../screens/EditCategory'
import EditSubCategory from '../screens/EditSubCategory'
import EditSubcategoryTye from '../screens/EditSubcategoryTye'
import SendSms from '../screens/SendSms'
import Questions from '../screens/Questions'
import Solutions from '../screens/Solutions'
import Login from '../screens/Login'

const Stack = createStackNavigator()

const AppNavigator = () => {
	return (
		<NavigationContainer>
			<Stack.Navigator
				screenOptions={{
					headerShown: false,
					...TransitionPresets.SlideFromRightIOS,
				}}>
				<Stack.Screen name="Login" component={Login}></Stack.Screen>
				<Stack.Screen name="Home" component={TabNavigator} />
				<Stack.Screen name="AddNotification" component={AddNotification} />
				<Stack.Screen name="AddSeedling" component={AddSeedling} />
				<Stack.Screen name="AddSubCategory" component={AddSubCategory} />
				<Stack.Screen name="AddCategory" component={AddCategory} />
				<Stack.Screen name="ViewSubCat" component={ViewSubCat} />
				<Stack.Screen name="ViewTypes" component={ViewTypes} />
				<Stack.Screen name="Contribution" component={Contribution} />
				<Stack.Screen name="ViewUser" component={ViewUser} />
				<Stack.Screen name="EditCategory" component={EditCategory} />
				<Stack.Screen name="EditSubCategory" component={EditSubCategory} />
				<Stack.Screen name="EditSubcategoryTye" component={EditSubcategoryTye} />
				<Stack.Screen name="SendSms" component={SendSms} />
				<Stack.Screen name="Questions" component={Questions} />
				<Stack.Screen name="Solutions" component={Solutions} />
				
			</Stack.Navigator>
		</NavigationContainer>
	)
}

export default AppNavigator

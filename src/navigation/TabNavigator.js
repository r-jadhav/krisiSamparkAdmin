import React from 'react'
import { Image } from 'react-native'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import Home from '../screens/Home'
import ViewBuyer from '../screens/ViewBuyer'
import ViewSeller from '../screens/ViewSeller'
import ViewCategory from '../screens/ViewCategory'
import MCI from 'react-native-vector-icons/MaterialCommunityIcons'
const Tabs = createBottomTabNavigator()

const TabNavigator = () => {
	return (
		<Tabs.Navigator
			initialRouteName="Main"
			screenOptions={({ route }) => ({
				tabBarIcon: ({ focused, color, size }) => {
					let iconName
					if (route.name === 'Home') {
						iconName = 'home-outline'
					} else if (route.name === 'Category') {
						iconName = 'format-list-checkbox'
					} else if (route.name === 'Buyer') {
						iconName = 'account-arrow-left-outline'
					} else {
						iconName = 'account-arrow-right-outline'
					}
					return <MCI name={iconName} size={30} color={color} />
				},
			})}
			tabBarOptions={{
				activeTintColor: '#6ead3a',
				inactiveTintColor: 'gray',
				tabStyle: {
					marginBottom: 3,
					marginTop: 2,
				},
			}}>
			<Tabs.Screen name="Home" component={Home} />
			<Tabs.Screen name="Category" component={ViewCategory} />
			<Tabs.Screen name="Buyer" component={ViewBuyer} />
			<Tabs.Screen name="Seller" component={ViewSeller} />
		</Tabs.Navigator>
	)
}

export default TabNavigator

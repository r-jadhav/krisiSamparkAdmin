import React, { useContext, useCallback } from 'react'
import {
	Text,
	View,
	ScrollView,
	StyleSheet,
	TouchableOpacity,
	FlatList,
} from 'react-native'
import { useFocusEffect } from '@react-navigation/native'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import url from '../constant/url'
import AppContext from '../context/AppContext'

const Home = ({ navigation }) => {
	const { category, setCategory } = useContext(AppContext)

	useFocusEffect(
		useCallback(() => {
			fetchCategory()
		}, []),
	)

	const fetchCategory = async () => {
		try {
			const res = await fetch(`${url}getSubCategory`, {
				method: 'POST',
				body: JSON.stringify({
					category_id: '1',
				}),
			})
			const json = await res.json()
			if (json.status == '200') {
				setCategory(json.data)
			}
		} catch (error) {
			console.log(error)
		}
	}

	const DATA = [
		{
			id: '1',
			name: 'view-grid-outline',
			title: 'Main Category',
			onpress: 'AddCategory',
		},
		{
			id: '2',
			name: 'view-grid-plus-outline',
			title: 'Sub Category',
			onpress: 'AddSubCategory',
		},
		{
			id: '3',
			name: 'format-list-text',
			title: 'Seedling Type',
			onpress: 'AddSeedling',
		},
		{
			id: '4',
			name: 'bell-outline',
			title: 'Notification',
			onpress: 'AddNotification',
		},
		{
			id: '5',
			name: 'inbox-arrow-down',
			title: 'Contribution',
			onpress: 'Contribution',
		},
		{
			id: '6',
			name: 'contacts',
			title: 'User',
			onpress: 'ViewUser',
		},
		{
			id: '7',
			name: 'message-arrow-right-outline',
			title: 'Send SMS',
			onpress: 'SendSms',
		},
		{
			id: 'bd7acba-c1b1-46c-aed5-3ad53ab28ba',
			name: 'comment-question-outline',
			title: 'Questions',
			onpress: 'Questions',
		},
	]
	const renderItem = ({ item }) => (
		<Item
			onPress={() => navigation.navigate(item.onpress)}
			title={item.name}
			icon={item.title}
		/>
	)
	const Item = ({ title, icon, onPress }) => (
		<TouchableOpacity style={styles.item} onPress={onPress}>
			<Icon color="#6ead3a" name={title} size={60}></Icon>
			<Text style={styles.sub}>{icon}</Text>
		</TouchableOpacity>
	)
	return (
		<View style={styles.container}>
			<Text style={styles.head}>Welcome Admin!</Text>
			<FlatList
				data={DATA}
				renderItem={renderItem}
				keyExtractor={(item) => item.id}
				horizontal={false}
				numColumns={2}
			/>
		</View>
	)
}
const styles = StyleSheet.create({
	container: {
		flex: 1,
		flexDirection: 'column',
		backgroundColor: '#fff',
	},
	item: {
		height: 160,
		// width: '100%',
		justifyContent: 'center',
		alignItems: 'center',
		// alignSelf: 'center',
		marginHorizontal: 15,
		marginVertical: 20,
		elevation: 2,
		backgroundColor: '#222022',
		borderRadius: 10,
		borderColor: '#008A16',
		flex: 1,
	},
	title: {
		fontSize: 30,
		marginLeft: 15,
		marginTop: '10%',
	},
	sub: {
		fontSize: 16,
		marginTop: 10,
		textAlign: 'center',
		color: '#fff',
		fontFamily: 'BreeSerif-Regular',
	},
	head: {
		fontFamily: 'BreeSerif-Regular',
		fontSize: 36,
		marginTop: '10%',
		textAlign: 'left',
		color: '#6ead3a',
		marginLeft: 20,
	},
})
export default Home

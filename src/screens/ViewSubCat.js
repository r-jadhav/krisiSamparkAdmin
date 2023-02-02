import React, { useState, useEffect } from 'react'
import {
	Text,
	View,
	ScrollView,
	StyleSheet,
	ActivityIndicator,
	Pressable,
	Alert,
	ToastAndroid,
	RefreshControl,
} from 'react-native'
import Header from '../components/Header'
import MCI from 'react-native-vector-icons/MaterialCommunityIcons'
import url from '../constant/url'
import EditModal from '../components/EditSubCategory'

const ViewCategory = ({ route, navigation }) => {
	const { name, category_id } = route.params
	const [loading, setLoading] = useState(false)
	const [subCat, setSubCat] = useState([])
	const [modalVis, setModalVis] = useState(false)
	const [editInfo, setEditInfo] = useState({})
	const [refreshing, setRefreshing] = useState(false)

	useEffect(() => {
		getSubCategoryType()
	}, [])

	const getSubCategoryType = async (id) => {
		setLoading(true)
		try {
			const res = await fetch(`${url}getSubCategoryType`, {
				method: 'POST',
				body: JSON.stringify({
					subcategory_id: category_id,
				}),
			})
			const json = await res.json()
			setLoading(false)
			if (json.status == '200') {
				setSubCat(json.data)
			} else {
				setSubCat([])
			}
		} catch (error) {
			setLoading(false)
			console.log(error)
		}
	}

	const deleteAlert = (id) => {
		Alert.alert(
			'Delete Confirmation',
			'Do you want to delete this category?',
			[
				{ text: 'Cancel' },
				{ text: 'Yes', onPress: () => deleteSubCategory(id) },
			],
			{ cancelable: true },
		)
	}

	const deleteSubCategory = async (id) => { 
		setLoading(true)
		try {
			const res = await fetch(`${url}deleteRecord`, {
				method: 'POST',
				body: JSON.stringify({
					id: id,
					column: 'type_id',
					table: 'subcategoriestype_tbl',
				}),
			})
			const json = await res.json()
			setLoading(false)
			if (json.status == '200') {
				await getSubCategoryType()
			}
			ToastAndroid.show('Sub Category deleted', ToastAndroid.SHORT)
		} catch (error) {
			setLoading(false)
			console.log(error)
		}
	}

	return (
		<View style={styles.container}>
			<Header title={name} />
			<ScrollView
				refreshControl={
					<RefreshControl
						onRefresh={getSubCategoryType}
						refreshing={refreshing}
					/>
				}>
				<View style={styles.listWrap}>
					{loading && <ActivityIndicator size="large" color="#000" />}
					{subCat.length == 0 && !loading && (
						<Text style={styles.errText}>No Sub Category Added</Text>
					)}
					{subCat.map((item, i) => {
						return (
							<View style={styles.itemWrap} key={i}>
								<Pressable
									android_ripple={{ color: 'gray' }}
									style={styles.item}
									onPress={() =>
										navigation.navigate('ViewTypes', {
											name: item.type_name,
											id: item.type_id,
										})
									}>
									<Text style={styles.name}>{item.type_name}</Text>
								</Pressable>
								<View style={styles.icons}>
									<Pressable
										android_ripple={{ color: 'gray' }}
										onPress={() => {
											deleteAlert(item.type_id)
										}}>
										<MCI
											style={styles.icon}
											name="delete-alert-outline"
											size={25}
											color="#e17055"
										/>
									</Pressable>
									<Pressable
										android_ripple={{ color: 'gray' }}
										onPress={() =>navigation.navigate('EditSubCategory', {
											id: item.type_id
										})}>
										<MCI
											style={styles.icon}
											name="square-edit-outline"
											size={25}
											color="#636e72"
										/>
									</Pressable>
								</View>
							</View>
						)
					})}
				</View>
				<EditModal
					info={editInfo}
					modalVis={modalVis}
					setModalVis={setModalVis}
					handleRefresh={getSubCategoryType}
				/>
			</ScrollView>
		</View>
	)
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#fff',
	},
	listWrap: {
		margin: 20,
	},
	itemWrap: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
		borderBottomWidth: 0.5,
		borderBottomColor: 'gray',
	},
	icons: {
		flexDirection: 'row',
		alignItems: 'center',
	},
	icon: {
		margin: 10,
	},
	item: {
		paddingVertical: 15,
		flex: 1,
	},
	name: {
		fontSize: 18,
	},
	errText: {
		color: 'gray',
		textAlign: 'center',
	},
})
export default ViewCategory

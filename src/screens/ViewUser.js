import React, { useContext, useState,useEffect} from 'react'
import {
	Text,
	View,
	ScrollView,
	StyleSheet,
	Pressable,
	Alert,
	ActivityIndicator,
	ToastAndroid,
	RefreshControl,
} from 'react-native'
import Header from '../components/Header'
import AppContext from '../context/AppContext'
import MCI from 'react-native-vector-icons/MaterialCommunityIcons'
import url from '../constant/url'
import EditModal from '../components/EditCategory'

const ViewUser = ({ navigation }) => {
	const { category, setCategory } = useContext(AppContext)
	const [loading, setLoading] = useState(false)
	const [modalVis, setModalVis] = useState(false)
	const [editInfo, setEditInfo] = useState({})
	const [refreshing, setRefreshing] = useState(false)
    useEffect(() => {
      handleRefresh()
    }, [])
	const deleteAlert = (id) => {
		Alert.alert(
			'Delete Confirmation',
			'Do you want to delete this user?',
			[{ text: 'Cancel' }, { text: 'Yes', onPress: () => deleteCategory(id) }],
			{ cancelable: true },
		)
	}

	const deleteCategory = async (id) => {
		setLoading(true)
		try {
			const res = await fetch(`${url}deleteRecord`, {
				method: 'POST',
				body: JSON.stringify({
					id: id,
					column: 'id',
					table: 'users',
				}),
			})
			const json = await res.json()
			if (json.status == '200') {
				let res = await fetchCategory()
				setCategory(res)
			}
			ToastAndroid.show('Category deleted', ToastAndroid.SHORT)
			setLoading(false)
		} catch (error) {
			setLoading(false)
			console.log(error)
		}
	}

	const fetchCategory = async () => {
		try {
			const res = await fetch(`${url}getUser`, {
				method: 'POST',
				body: '',
			})
			const json = await res.json()
			if (json.status == '200') {
				return json.data
			} else {
				return []
			}
		} catch (error) {
			console.log(error)
		}
	}

	const handleRefresh = async () => {
		let res = await fetchCategory()
        console.log(res)
		setCategory(res)
	}

	return (
		<View style={styles.container}>
			<Header title="Users" />
			<ScrollView
				refreshControl={
					<RefreshControl onRefresh={handleRefresh} refreshing={refreshing} />
				}>
				<View style={styles.listWrap}>
					{loading && <ActivityIndicator size="large" color="#000" />}
					{category.map((item, i) => {
						return (
							<View style={styles.itemWrap} key={i}>
								<Pressable
									android_ripple={{ color: 'gray' }}
									style={styles.item}
									onPress={() =>
										navigation.navigate('ViewSubCat', {
											name: item.id,
											
										})
									}>
									<Text style={styles.name}>{item.name}</Text>
                                    <Text style={styles.name}>{item.phone}</Text>
								</Pressable>
								<View style={styles.icons}>
									<Pressable
										android_ripple={{ color: 'gray' }}
										onPress={() => {
											deleteAlert(item.id)
										}}>
										<MCI
											style={styles.icon}
											name="delete-alert-outline"
											size={25}
											color="#e17055"
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
					handleRefresh={handleRefresh}
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
})
export default ViewUser

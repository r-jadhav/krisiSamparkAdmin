import React, { useState, useEffect, useCallback } from 'react'
import {
	StyleSheet,
	Text,
	View,
	Dimensions,
	TouchableOpacity,
	Modal,
	ActivityIndicator,
	ScrollView,
	Image,
	Linking,
	ToastAndroid,
	RefreshControl,
} from 'react-native'
import { useFocusEffect } from '@react-navigation/native'
import { TabView } from 'react-native-tab-view'
import MCI from 'react-native-vector-icons/MaterialCommunityIcons'
import { Button } from 'react-native-paper'
import Header from '../components/Header'
import url from '../constant/url'

const initialLayout = { width: Dimensions.get('window').width }

const FirstRoute = () => {
	const [modalVis, setModalVis] = useState(false)
	const [data, setData] = useState([])
	const [loading, setLoading] = useState(false)
	const [selected, setSelected] = useState({})
	const [refreshing, setRefreshing] = useState(false)

	useEffect(() => {
		fetchData()
	}, [])

	const fetchData = async () => {
		setLoading(true)
		try {
			const res = await fetch(`${url}getVideoImage`, {
				method: 'POST',
				body: JSON.stringify({
					status: 'pending',
				}),
			})
			const json = await res.json()
			setLoading(false)
			if (json.status == '200') {
				setData(json.data)
			}
		} catch (error) {
			setLoading(false)
			console.log(error)
		}
	}

	const handleAccept = async () => {
		setLoading(true)
		try {
			const res = await fetch(`${url}updateVideoImage`, {
				method: 'POST',
				body: JSON.stringify({
					status: 'accepted',
					id: selected.vi_id,
				}),
			})
			const json = await res.json()
			setLoading(false)
			if (json.status == '200') {
				setModalVis(false)
				ToastAndroid.show('Accepted', ToastAndroid.SHORT)
				fetchData()
			}
		} catch (error) {
			setLoading(false)
			console.log(error)
		}
	}
	const deleteRecord = async(id)=>{
		setLoading(true)
		try {
			const res = await fetch(`${url}deleteRecord`, {
				method: 'POST',
				body: JSON.stringify({
					id: id,
					column: 'vi_id',
					table: 'image_video',
				}),
			})
			const json = await res.json()
			setLoading(false)
			if (json.status == '200') {
				fetchData()
			}
		} catch (error) {
			setLoading(false)
			console.log(error)
		}
	}

	return (
		<View style={routeStyle.routeMain}>
			<ScrollView
				refreshControl={
					<RefreshControl refreshing={refreshing} onRefresh={fetchData} />
				}>
				{data.map((item, i) => {
					return (
						<View
							
							key={i}>
							<View style={routeStyle.card}>
								<MCI
									name={item.vi_type == 'image' ? 'image' : 'video'}
									size={25}
									color="gray"
								/>
								<View style={routeStyle.left}>
									<Text style={routeStyle.name}>{item.vi_name}</Text>
									<Text>{item.vi_phone}</Text>
								</View>
								<TouchableOpacity onPress={()=>{deleteRecord(item.vi_id)}}>
									<MCI name="delete" size={25} color="gray" />
								</TouchableOpacity>
								<TouchableOpacity onPress={() => {
										setSelected(item)
										setModalVis(true)
									}}>
									<MCI name="chevron-right" size={25} color="gray" />
								</TouchableOpacity>
								
							</View>
						</View>
					)
				})}
			</ScrollView>
			{loading && <ActivityIndicator size="large" color="black" />}
			<Modal
				animationType="slide"
				visible={modalVis}
				onRequestClose={() => setModalVis(false)}>
				<Header title="Details" noBack={true} />
				<ScrollView>
					<View style={routeStyle.modal}>
						<Text style={routeStyle.name}>{selected.vi_name}</Text>
						<Text>{selected.vi_phone}</Text>
						{selected.vi_type == 'image' ? (
							<TouchableOpacity
								onPress={() => Linking.openURL(selected.vi_link)}>
								<Image
									source={{ uri: selected.vi_link }}
									style={{ height: 200, width: '100%', marginVertical: 20 }}
									resizeMode="contain"
								/>
							</TouchableOpacity>
						) : (
							<TouchableOpacity
								onPress={() => Linking.openURL(selected.vi_link)}>
								<MCI name="video-outline" color="orangered" size={50} />
							</TouchableOpacity>
						)}
						<Text>{selected.vi_text}</Text>
						<Text style={{ color: 'gray', marginTop: 20 }}>
							{selected.created_at}
						</Text>
						<Button
							onPress={handleAccept}
							loading={loading}
							mode="contained"
							color="black"
							style={{ marginTop: 30 }}>
							Accept
						</Button>
					</View>
				</ScrollView>
			</Modal>
		</View>
	)
}

const SecondRoute = () => {
	const [data, setData] = useState([])
	const [loading, setLoading] = useState(false)
	const [refreshing, setRefreshing] = useState(false)
	const [modalVis, setModalVis] = useState(false)
	const [selected, setSelected] = useState({})

	useEffect(() => {
		fetchData()
	}, [])

	const fetchData = async () => {
		setLoading(true)
		try {
			const res = await fetch(`${url}getVideoImage`, {
				method: 'POST',
				body: JSON.stringify({
					status: 'accepted',
				}),
			})
			const json = await res.json()
			setLoading(false)
			if (json.status == '200') {
				setData(json.data)
			}
		} catch (error) {
			setLoading(false)
			console.log(error)
		}
	}
	const deleteRecord = async(id)=>{
		setLoading(true)
		try {
			const res = await fetch(`${url}deleteRecord`, {
				method: 'POST',
				body: JSON.stringify({
					id: id,
					column: 'vi_id',
					table: 'image_video',
				}),
			})
			const json = await res.json()
			setLoading(false)
			if (json.status == '200') {
				setData(json.data)
			}
		} catch (error) {
			setLoading(false)
			console.log(error)
		}
	}
	return (
		<View style={routeStyle.routeMain}>
			{loading && <ActivityIndicator size="large" color="black" />}
			<ScrollView
				refreshControl={
					<RefreshControl refreshing={refreshing} onRefresh={fetchData} />
				}>
				{data.map((item, i) => {
					return (
						<TouchableOpacity
							onPress={() => {
								setSelected(item)
								setModalVis(true)
							}}
							key={i}>
							<View style={routeStyle.card}>
								<MCI
									name={item.vi_type == 'image' ? 'image' : 'video'}
									size={25}
									color="gray" 
								/>
								<View style={routeStyle.left}>
									<Text style={[routeStyle.name, { color: 'green' }]}>
										{item.vi_name}
									</Text>
									<Text>{item.vi_phone}</Text>
								</View>
								<TouchableOpacity onPress={()=>{deleteRecord(item.vi_id)}}>
								<MCI name="trash" size={25} color="gray" />
								</TouchableOpacity>
								{/* <MCI name="chevron-right" size={25} color="gray" /> */}
							</View>
						</TouchableOpacity>
					)
				})}
			</ScrollView>
			<Modal
				animationType="slide"
				visible={modalVis}
				onRequestClose={() => setModalVis(false)}>
				<Header title="Details" noBack={true} />
				<ScrollView>
					<View style={routeStyle.modal}>
						<Text style={routeStyle.name}>{selected.vi_name}</Text>
						<Text>{selected.vi_phone}</Text>
						<TouchableOpacity onPress={() => Linking.openURL(selected.vi_link)}>
							<Image
								source={{ uri: selected.vi_link }}
								style={{ height: 200, width: '100%', marginVertical: 20 }}
								resizeMode="contain"
							/>
						</TouchableOpacity>
						<Text>{selected.vi_text}</Text>
					</View>
				</ScrollView>
			</Modal>
		</View>
	)
}

const Contribution = () => {
	const [index, setIndex] = useState(0)
	const [routes] = useState([
		{ key: 'first', title: 'PENDING' },
		{ key: 'second', title: 'ACCEPTED' },
	])

	const renderScene = ({ route }) => {
		switch (route.key) {
			case 'first':
				return <FirstRoute />
			case 'second':
				return <SecondRoute />
		}
	}

	const renderTabBar = (props) => {
		return (
			<View style={styles.tabBar}>
				{props.navigationState.routes.map((route, i) => {
					return (
						<TouchableOpacity
							key={i}
							style={styles.tabItem}
							onPress={() => setIndex(i)}>
							<Text
								style={
									route.key === props.navigationState.routes[index].key
										? styles.tabTextActive
										: styles.tabText
								}>
								{route.title}
							</Text>
						</TouchableOpacity>
					)
				})}
			</View>
		)
	}

	return (
		<View style={styles.container}>
			<Header title="Contribution" />
			<TabView
				navigationState={{ index, routes }}
				renderScene={renderScene}
				onIndexChange={setIndex}
				renderTabBar={renderTabBar}
				initialLayout={initialLayout}
			/>
		</View>
	)
}

export default Contribution

const routeStyle = StyleSheet.create({
	card: {
		padding: 15,
		borderBottomWidth: 1,
		borderBottomColor: '#bdbdbd',
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
	},
	routeMain: {
		paddingTop: 0,
	},
	name: {
		fontSize: 18,
		fontWeight: 'bold',
		color: '#34495e',
	},
	modal: {
		padding: 20,
	},
	left: {
		flex: 1,
		marginLeft: 20,
	},
})

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#fff',
	},
	tabBar: {
		flexDirection: 'row',
		borderBottomWidth: 1,
		borderBottomColor: '#eee',
		marginTop: 10,
	},
	tabItem: {
		flex: 1,
		alignItems: 'center',
	},
	tabText: {
		color: 'gray',
		borderRadius: 10,
		padding: 10,
	},
	tabTextActive: {
		borderBottomWidth: 2,
		borderColor: 'green',
		padding: 10,
		color: 'green',
		alignSelf: 'stretch',
		textAlign: 'center',
	},
})

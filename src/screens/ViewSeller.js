import React, { useState, useEffect } from 'react'
import {
	StyleSheet,
	Text,
	View,
	ScrollView,
	TouchableOpacity,
	Modal,
	ActivityIndicator,
	RefreshControl,
	TextInput,
} from 'react-native'
import Header from '../components/Header'
import url from '../constant/url'

const ViewSeller = () => {
	const [modalVis, setModalVis] = useState(false)
	const [selected, setSelected] = useState({})
	const [buyers, setBuyers] = useState([])
	const [loading, setLoading] = useState(false)
	const [refreshing, setRefreshing] = useState(false)
	const [term, setTerm] = useState('')

	useEffect(() => {
		fetchSeller()
	}, [])

	const fetchSeller = async () => {
		setLoading(true)
		const formData = new FormData()
		formData.append('role', 'seller')
		try {
			const res = await fetch(`${url}ViewBuyerSellerData`, {
				method: 'POST',
				body: formData,
				headers: {
					Accept: 'application/json',
					'Content-Type': 'multipart/form-data',
				},
			})
			const json = await res.json()
			setLoading(false)
			if (json.status == '200') {
				setBuyers(json.data)
			}
		} catch (error) {
			setLoading(false)
			console.log(error)
		}
	}

	return (
		<View style={styles.container}>
			<Header title="Sellers" />
			<TextInput
				placeholder="Search..."
				style={styles.search}
				onChangeText={setTerm}
			/>
			<ScrollView
				refreshControl={
					<RefreshControl refreshing={refreshing} onRefresh={fetchSeller} />
				}>
				<View style={styles.cardContainer}>
					{loading && <ActivityIndicator size="large" color="#000" />}
					{buyers.map((item, i) => {
						return (
							<BuyerCard
								key={i}
								info={item}
								setModalVis={setModalVis}
								setSelected={setSelected}
							/>
						)
					})}
				</View>
			</ScrollView>
			<BuyerModal
				modalVis={modalVis}
				setModalVis={setModalVis}
				info={selected}
			/>
		</View>
	)
}

const BuyerCard = ({ info = {}, setModalVis, setSelected }) => {
	return (
		<TouchableOpacity
			onPress={() => {
				setSelected(info)
				setModalVis(true)
			}}>
			<View style={cardstyles.card}>
				<View style={cardstyles.cardItem}>
					<Text style={cardstyles.label}>Name</Text>
					<Text style={cardstyles.value}>{info.name}</Text>
				</View>
				<View style={cardstyles.cardItem}>
					<Text style={cardstyles.label}>Phone No.</Text>
					<Text style={cardstyles.value}>{info.contactOne}</Text>
				</View>
				<View style={cardstyles.cardItem}>
					<Text style={cardstyles.label}>Item</Text>
					<Text
						style={
							cardstyles.value
						}>{`${info.type_name} - ${info.type_sub_name}`}</Text>
				</View>
				<View style={cardstyles.cardItem}>
					<Text style={cardstyles.label}>Address</Text>
					<Text
						style={cardstyles.value}>{`${info.district}, ${info.state}`}</Text>
				</View>
			</View>
		</TouchableOpacity>
	)
}

const BuyerModal = ({ modalVis, setModalVis, info = {} }) => {
	return (
		<Modal
			animationType="slide"
			visible={modalVis}
			onRequestClose={() => {
				setModalVis(false)
			}}>
			<Header title="Buyer Detail" noBack={true} />
			<ScrollView>
				<View style={modalstyles.container}>
					<View style={modalstyles.modalItem}>
						<Text style={modalstyles.label}>Name</Text>
						<Text style={modalstyles.value}>{info.name}</Text>
					</View>

					<View style={modalstyles.modalItem}>
						<Text style={modalstyles.label}>Business Name</Text>
						<Text style={modalstyles.value}>{info.businessName}</Text>
					</View>

					<View style={modalstyles.modalItem}>
						<Text style={modalstyles.label}>Phone number 1</Text>
						<Text style={modalstyles.value}>{info.contactOne}</Text>
					</View>

					<View style={modalstyles.modalItem}>
						<Text style={modalstyles.label}>Phone number 2</Text>
						<Text style={modalstyles.value}>{info.contactTwo}</Text>
					</View>

					<View style={modalstyles.modalItem}>
						<Text style={modalstyles.label}>Address</Text>
						<Text style={modalstyles.value}>{info.address}</Text>
					</View>

					<View style={modalstyles.modalItem}>
						<Text style={modalstyles.label}>Village</Text>
						<Text style={modalstyles.value}>{info.village}</Text>
					</View>

					<View style={modalstyles.modalItem}>
						<Text style={modalstyles.label}>Taluka</Text>
						<Text style={modalstyles.value}>{info.taluka}</Text>
					</View>
					<View style={modalstyles.modalItem}>
						<Text style={modalstyles.label}>District</Text>
						<Text style={modalstyles.value}>{info.district}</Text>
					</View>
					<View style={modalstyles.modalItem}>
						<Text style={modalstyles.label}>State</Text>
						<Text style={modalstyles.value}>{info.state}</Text>
					</View>

					<View style={modalstyles.modalItem}>
						<Text style={modalstyles.label}>Pin</Text>
						<Text style={modalstyles.value}>{info.pinCode}</Text>
					</View>

					<View style={modalstyles.modalItem}>
						<Text style={modalstyles.label}>My Product</Text>
						<Text style={modalstyles.value}>{info.myProduct}</Text>
					</View>

					<View style={modalstyles.modalItem}>
						<Text style={modalstyles.label}>Category</Text>
						<Text style={modalstyles.value}>{info.subcat_name}</Text>
					</View>

					<View style={modalstyles.modalItem}>
						<Text style={modalstyles.label}>Sub Category</Text>
						<Text style={modalstyles.value}>{info.type_name}</Text>
					</View>

					<View style={modalstyles.modalItem}>
						<Text style={modalstyles.label}>Type</Text>
						<Text style={modalstyles.value}>{info.type_sub_name}</Text>
					</View>
				</View>
			</ScrollView>
		</Modal>
	)
}

export default ViewSeller

const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
	cardContainer: {
		padding: 20,
	},
	search: {
		borderWidth: 0.5,
		borderRadius: 50,
		margin: 20,
		marginBottom: 0,
		height: 40,
		paddingLeft: 20,
	},
})

const cardstyles = StyleSheet.create({
	card: {
		backgroundColor: '#fff',
		borderRadius: 5,
		elevation: 1,
		padding: 10,
		flexDirection: 'row',
		flexWrap: 'wrap',
		marginBottom: 10,
	},
	cardItem: {
		width: '50%',
		marginBottom: 10,
	},
	label: {
		fontWeight: 'bold',
		color: '#6ead3a',
	},
})

const modalstyles = StyleSheet.create({
	container: {
		padding: 20,
	},
	modalItem: {
		flexDirection: 'row',
		marginBottom: 20,
	},
	label: {
		flex: 1,
		fontWeight: 'bold',
		color: '#6ead3a',
	},
	value: {
		flex: 1.5,
	},
})

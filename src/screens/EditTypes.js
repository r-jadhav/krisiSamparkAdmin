import React, { useEffect, useState, useContext } from 'react'
import {
	ScrollView,
	StyleSheet,
	Text,
	View,
	Image,
	ToastAndroid,
} from 'react-native'
// import { OutlinedTextField } from '@ubaids/react-native-material-textfield'
import { TextInput } from 'react-native-paper';
import ImagePicker from 'react-native-image-crop-picker'
import { Button } from 'react-native-paper'
import { Picker } from '@react-native-community/picker'
import AppContext from '../context/AppContext'
import url from '../constant/url'
import Header from '../components/Header'

const AddSeedling = ({ route,navigation }) => {
	const { category } = useContext(AppContext)
	const [text, setText] = useState('')
	const [desc, setDesc] = useState('')
	const [image, setImage] = useState('')
	const [catId, setCatId] = useState('')
	const [subCat, setSubCat] = useState([])
	const [selectedSubCat, setSelectedSubCat] = useState('')
	const [loading, setLoading] = useState(false)
	const [namehi, setNamehi] = useState('')
	const [namegu, setNamegu] = useState('')
	const [nameka, setNameka] = useState('')
	const [namemr, setNamemr] = useState('')
	const [desphi, setdesphi] = useState('')
	const [despgu, setdespgu] = useState('')

	const [despmr, setdespmr] = useState('')

	const [despka, setdespka] = useState('')
    useEffect(() => {
    getUserData()
    }, [])
    const getUserData = async()=>{
        
    }
	const handleAddSubCat = async () => {
		if (!text || !image.path || !selectedSubCat) {
			ToastAndroid.show('Incomplete data', ToastAndroid.SHORT)
			return
		}
		setLoading(true)
		const filename = image.path.match(/.*\/(.*)$/)[1]
		const formData = new FormData()
		formData.append('type_sub_name', text)
		formData.append('type_sub_name_hi', namehi)
		formData.append('type_sub_name_gu', namegu)
		formData.append('type_sub_name_ka', nameka)
		formData.append('type_sub_name_mr', namemr)
		formData.append('type_sub_desp_hi', desphi)
		formData.append('type_sub_desp_mr', despmr)
		formData.append('type_sub_desp_gu', despgu)
		formData.append('type_sub_desp_ka', despka)
		formData.append('type_sub_parent_id', selectedSubCat)
		formData.append('type_sub_desp', desc)
		formData.append('type_sub_image', {
			uri: image.path,
			type: image.mime,
			name: filename,
		})
		try {
			const res = await fetch(`${url}insertSubTypeData`, {
				method: 'POST',
				body: formData,
				headers: {
					Accept: 'application/json',
					'Content-Type': 'multipart/form-data',
				},
			})
			const json = await res.json()
			console.log(json)
			setLoading(false)
			if (json.status == '200') {
				ToastAndroid.show('Sub Category added successfully', ToastAndroid.SHORT)
				navigation.goBack()
			}
		} catch (error) {
			setLoading(false)
			console.log(error)
		}
	}

	const getSubCategoryType = async (id) => {
		setCatId(id)
		try {
			const res = await fetch(`${url}getSubCategoryType`, {
				method: 'POST',
				body: JSON.stringify({
					subcategory_id: id,
				}),
			})
			const json = await res.json()
			if (json.status == '200') {
				setSubCat(json.data)
			} else {
				setSubCat([])
			}
		} catch (error) {
			console.log(error)
		}
	}

	return (
		<View style={styles.container}>
			<Header title="Add Type" />
			<ScrollView>
				<View style={{ margin: 20 }}>
					<View style={styles.pickerWrapper}>
						<Picker
							mode="dropdown"
							selectedValue={catId}
							onValueChange={(itemValue) => {
								getSubCategoryType(itemValue)
							}}>
							<Picker.Item label="Select Category" value="" />
							{category.map((item, i) => {
								return (
									<Picker.Item
										key={i}
										label={item.subcat_name}
										value={item.subcat_id}
									/>
								)
							})}
						</Picker>
					</View>
					{subCat.length !== 0 && (
						<View style={styles.pickerWrapper}>
							<Picker
								mode="dropdown"
								selectedValue={selectedSubCat}
								onValueChange={(itemValue) => {
									setSelectedSubCat(itemValue)
								}}> 
								<Picker.Item label="Select Sub-Category" value="" />
								{subCat.map((item, i) => {
									return (
										<Picker.Item
											key={i}
											label={item.type_name}
											value={item.type_id}
										/>
									)
								})}
							</Picker>
						</View>
					)}

					<TextInput
						label="Name"
						style={styles.input}
						onChangeText={setText}
					/>

					<TextInput
						label="Description"
						style={styles.input}
						onChangeText={setDesc}
					/>
					<TextInput
					label="Seedling Name Hindi"
					style={styles.input}
					onChangeText={setNamehi}
				/>
				<TextInput
						label="Description Hindi"
						style={styles.input}
						onChangeText={setdesphi}
					/>
				<TextInput
					label="Seedling Name Gujrati"
					style={styles.input}
					onChangeText={setNamegu}
				/>
				<TextInput
						label="Description Gujrati"
						style={styles.input}
						onChangeText={setdespgu}
					/>
				<TextInput
					label="Seedling Name Kannada"
					style={styles.input}
					onChangeText={setNameka}
				/>
				<TextInput
						label="Description Kannada"
						style={styles.input}
						onChangeText={setdespka}
					/>
				<TextInput
					label="Seedling Name Marathi"
					style={styles.input}
					onChangeText={setNamemr}
				/>
				<TextInput
						label="Description Marathi"
						style={styles.input}
						onChangeText={setdespmr}
					/>
					{image == '' ? (
						<Image
							style={styles.imageStyle}
							source={require('../assets/sample.png')}
						/>
					) : (
						<Image style={styles.imageStyle} source={{ uri: image.path }} />
					)}

					<Button
						color="#6ead3a"
						icon="camera"
						mode="outlined"
						onPress={() => {
							ImagePicker.openPicker({
								width: 300,
								height: 300,
								cropping: true,
							})
								.then((image) => {
									setImage(image)
								})
								.catch((error) => {
									console.log(error)
								})
						}}>
						Upload Image
					</Button>
					<Button
						style={{ marginTop: '10%' }}
						color="#222022"
						mode="contained"
						loading={loading}
						onPress={handleAddSubCat}>
						Add Now
					</Button>
				</View>
			</ScrollView>
		</View>
	)
}

export default AddSeedling

const styles = StyleSheet.create({
	container: {
		flex: 1,
		// flexDirection: 'column',
		backgroundColor: '#fff',
		// padding: 20,
	},
	input: {
		marginTop: 20,
		backgroundColor:'#fff'
	},
	pickerWrapper: {
		borderWidth: 0.5,
		marginBottom: 20,
		borderRadius: 5,
	},
	imageStyle: {
		width: 100,
		height: 100,
		resizeMode: 'contain',
		alignSelf: 'center',
		marginVertical: 20,
	},
})

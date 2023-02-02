import React, { useState } from 'react'
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
import url from '../constant/url'
import Header from '../components/Header'

const AddCategory = ({ navigation }) => {
	const [name, setName] = useState('')
	const [namehi, setNamehi] = useState('') 
	const [namegu, setNamegu] = useState('')
	const [nameka, setNameka] = useState('')
	const [namemr, setNamemr] = useState('')

	const [image, setImage] = useState('')
	const [loading, setLoading] = useState(false)

	const handleAdd = async () => {
		console.log(namehi)
		if (!name || !image.path) {
			ToastAndroid.show(
				'Please enter name and select image',
				ToastAndroid.SHORT,
			)
			return
		}
		setLoading(true)
		const filename = image.path.match(/.*\/(.*)$/)[1]
		const formData = new FormData()
		formData.append('subcat_name', name)
		formData.append('subcat_name_hi', namehi)
		formData.append('subcat_name_gu', namegu)
		formData.append('subcat_name_ka', nameka)
		formData.append('subcat_name_mr', namemr)
		formData.append('category_id', '1')
		formData.append('subcat_image', {
			uri: image.path,
			type: image.mime,
			name: filename,
		})
		try {
			const res = await fetch(`${url}insertDataSubCategory`, {
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
				ToastAndroid.show('Category added successfully', ToastAndroid.SHORT)
				navigation.goBack()
			}
		} catch (error) {
			setLoading(false)
			console.log(error)
		}
	}
	return (
		<View style={styles.container}>
			<Header title="Add Category" />
			<ScrollView style={{ padding: 20 }}>
				<TextInput
					label="Category Name"
					style={styles.input}
					onChangeText={setName} 
				/>
				<TextInput
					label="Category Name Hindi"
					style={styles.input}
					onChangeText={setNamehi}
				/>
				<TextInput
					label="Category Name Gujrati"
					style={styles.input}
					onChangeText={setNamegu}
				/>
				<TextInput
					label="Category Name Kannada"
					style={styles.input}
					onChangeText={setNameka}
				/>
				<TextInput
					label="Category Name Marathi"
					style={styles.input}
					onChangeText={setNamemr}
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
					// contentStyle={{ alignSelf: 'flex-start' }}
					icon="camera"
					mode="outlined"
					onPress={() => {
						ImagePicker.openPicker({
							width: 300,
							height: 300,
							cropping: true,
						})
							.then((image) => {
								console.log(image)
								setImage(image)
							}) 
							.catch(() => {
								console.log('Cancelled')
							})
					}}>
					Upload Image
				</Button>
				<Button
					style={{ marginTop: '10%' }}
					color="#222022"
					mode="contained"
					loading={loading}
					onPress={handleAdd}>
					Add Now
				</Button>
			</ScrollView>
		</View>
	)
}

export default AddCategory

const styles = StyleSheet.create({
	container: {
		flex: 1,
		// flexDirection: 'column',
		backgroundColor: '#fff',
		// paddingTop: 100,
	},
	input: {
		marginTop: 20,
		backgroundColor:'#fff'
	},
	imageStyle: {
		width: 100,
		height: 100,
		resizeMode: 'contain',
		alignSelf: 'center',
		marginVertical: 20,
	},
})

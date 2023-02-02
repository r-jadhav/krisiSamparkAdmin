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

const AddSubCategory = ({ route,navigation }) => { 
    const {id} = route.params;
	const [text, setText] = useState('')
	const [image, setImage] = useState({})
	const [loading, setLoading] = useState(false)
	const [name_hindi, sethindi] = useState('')
	const [name_gu, setgu] = useState('')
	const [name_mr, setmr] = useState('')
	const [name_ka, setka] = useState('')
    const [filename, setFileName] = useState('')
    useEffect(() => {
        fetchCategory()
    }, [])
    const fetchCategory = async () => {
        console.log(id)
		try {
			const res = await fetch(`${url}getSingleRecord`, {
				method: 'POST',
				body: JSON.stringify({ 
					table: 'subcategoriestype_tbl',
                    column:'type_id',
                    column_id:id
				}),
			})
			const json = await res.json()
            console.log(json)
			if (json.status == '200') {
				setText(json.data.type_name)  
                setgu(json.data.type_name_gu)
                sethindi(json.data.type_name_hi)
                setka(json.data.type_name_ka)
                setmr(json.data.type_name_mr)
                setImage({})
                setFileName(json.data.type_image)
			} else {
				return []
			}
		} catch (error) {
			console.log(error)
		}
	}
	const handleAddSubCat = async () => {
		setLoading(true)
		const formData = new FormData()
		formData.append('type_name', text)
		formData.append('type_name_hi', name_hindi)
		formData.append('type_name_gu', name_gu)
		formData.append('type_name_ka', name_ka)
		formData.append('type_name_mr', name_mr)
		formData.append('type_id', id) 
        if(image.path){
            formData.append('type_image', {
                uri: image.path,
                type: image.mime,
                name: 'fate.jpg',
            })
        }
		
		try {
			const res = await fetch(`${url}updateSubCategoryType`, {
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

	return (
		<View style={styles.container}>
			<Header title="Edit Sub-Category" />
			<ScrollView style={{ padding: 20 }}>
				
				<TextInput
					label="Name" 
					style={styles.input}
					onChangeText={setText}
                    defaultValue={text}
				/>
				<TextInput
					label="Sub Category Name Hindi"
					style={styles.input}
					onChangeText={sethindi}
                    defaultValue={name_hindi}
				/>
				<TextInput
					label="Sub Category Name Gujrati"
					style={styles.input}
					onChangeText={setgu}
                    defaultValue={name_gu}
				/>
				<TextInput
					label="Sub Category Name Kannada"
					style={styles.input}
					onChangeText={setka}
                    defaultValue={name_ka}
				/>
				<TextInput
					label="Sub Category Name Marathi"
					style={styles.input}
					onChangeText={name_mr}
				/>
				{!image.path ? (
					<Image style={styles.imageStyle} source={{ uri: 'https://krishisampark.com/api/'+filename }} />
				) : (
					<Image
						style={styles.imageStyle}
						source={{ uri: image.path }}
					/>
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
							.catch(() => {
								console.log('Cancelled')
							})
					}}>
					Upload Image
				</Button>
				<Button
					style={{ marginVertical: '10%' }}
					color="#222022"
					mode="contained"
					loading={loading}
					onPress={handleAddSubCat}>
					Update Now
				</Button>
			</ScrollView>
		</View>
	)
}

export default AddSubCategory

const styles = StyleSheet.create({
	container: {
		flex: 1,
		flexDirection: 'column',
		backgroundColor: '#fff',
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

import React, { useState,useEffect } from 'react'
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

const AddCategory = ({ route,navigation }) => {
    const {id} = route.params;
	const [name, setName] = useState('')
	const [namehi, setNamehi] = useState('') 
	const [namegu, setNamegu] = useState('')
	const [nameka, setNameka] = useState('')
	const [namemr, setNamemr] = useState('')

	const [image, setImage] = useState({path:'',mine:''})
	const [loading, setLoading] = useState(false)
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
					table: 'subcategories_tbl',
                    column:'subcat_id',
                    column_id:id
				}),
			})
			const json = await res.json()
            console.log(json)
			if (json.status == '200') {
				setName(json.data.subcat_name)  
                setNamegu(json.data.subcat_name_gu)
                setNamehi(json.data.subcat_name_hi)
                setNameka(json.data.subcat_name_ka)
                setNamemr(json.data.subcat_name_mr)
                setImage({})
                setFileName(json.data.subcat_image)
			} else {
				return []
			}
		} catch (error) {
			console.log(error)
		}
	}
	const handleAdd = async () => {
		console.log(namehi)
		
		setLoading(true)
		
		const formData = new FormData()
		formData.append('subcat_name', name)
		formData.append('subcat_name_hi', namehi)
		formData.append('subcat_name_gu', namegu)
		formData.append('subcat_name_ka', nameka)
		formData.append('subcat_name_mr', namemr)
		formData.append('subcat_id', id)
        if(image.path){
            console.log('called')

            formData.append('subcat_image', {
                uri: image.path,
                type: image.mime,
                name: 'fate.jpeg',
            }) 
        }
		
		try {
			const res = await fetch(`${url}updateSubCategory`, {
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
				// navigation.goBack()
			}else{
                ToastAndroid.show('Error Updating Category', ToastAndroid.SHORT)
            }
		} catch (error) {
			setLoading(false)
			console.log(error)
		}
	}
	return (
		<View style={styles.container}>
			<Header title="Edit Category" />
			<ScrollView style={{ padding: 20 }}>
				<TextInput
					label="Category Name"
					style={styles.input}
					onChangeText={setName} 
                    defaultValue={name}
				/>
				<TextInput 
					label="Category Name Hindi"
					style={styles.input}
					onChangeText={setNamehi}
                    defaultValue={namehi}
				/>
				<TextInput
					label="Category Name Gujrati"
					style={styles.input}
					onChangeText={setNamegu}
                    defaultValue={namegu}
				/>
				<TextInput
					label="Category Name Kannada"
					style={styles.input}
					onChangeText={setNameka}
                    defaultValue={nameka}
				/>
				<TextInput
					label="Category Name Marathi"
					style={styles.input}
					onChangeText={setNamemr}
                    defaultValue={namemr}
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
					style={{ marginVertical: '10%' }}
					color="#222022"
					mode="contained"
					loading={loading}
					onPress={handleAdd}>
					Update Now
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

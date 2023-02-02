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
    const {id} = route.params;
	const [text, setText] = useState('')
	const [desc, setDesc] = useState('')
    const [image, setImage] = useState({})
	const [loading, setLoading] = useState(false)
	const [namehi, setNamehi] = useState('')
	const [namegu, setNamegu] = useState('')
	const [nameka, setNameka] = useState('')
	const [namemr, setNamemr] = useState('')
	const [desphi, setdesphi] = useState('')
	const [despgu, setdespgu] = useState('')
	const [despmr, setdespmr] = useState('')
	const [despka, setdespka] = useState('')
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
					table: 'typesubcategories_tbl',
                    column:'type_sub_id',
                    column_id:id
				}),
			})
			const json = await res.json()
            console.log(json)
			if (json.status == '200') {
				setText(json.data.type_sub_name)  
                setNamegu(json.data.type_sub_name_gu)
                setNamehi(json.data.type_sub_name_hi)
                setNameka(json.data.type_sub_name_ka)
                setNamemr(json.data.type_sub_name_mr)
                setImage({})
                setFileName(json.data.type_sub_image)
                setdespgu(json.data.type_sub_desp_gu)
                setdesphi(json.data.type_sub_desp_hi)
                setdespka(json.data.type_sub_desp_ka)
				setdespmr(json.data.type_sub_desp_mr)
                setDesc(json.data.type_sub_desp)
                setFileName(json.data.type_sub_image)
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
		formData.append('type_sub_name', text)
		formData.append('type_sub_name_hi', namehi)
		formData.append('type_sub_name_gu', namegu)
		formData.append('type_sub_name_ka', nameka)
		formData.append('type_sub_name_mr', namemr)
		formData.append('type_sub_desp_hi', desphi)
		formData.append('type_sub_desp_mr', despmr)
		formData.append('type_sub_desp_gu', despgu)
		formData.append('type_sub_desp_ka', despka)
		formData.append('type_sub_desp', desc)
        formData.append('type_sub_id', id)
        if(image.path){
            formData.append('type_sub_image', {
                uri: image.path,
                type: image.mime,
                name: 'fate.jpg',
            })
        }
		
		try {
			const res = await fetch(`${url}updateTypeSubcategory`, {
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
				ToastAndroid.show('Sub Category edited successfully', ToastAndroid.SHORT)
				navigation.goBack()
			}
		} catch (error) {
			setLoading(false)
			console.log(error)
		}
	}

	

	return (
		<View style={styles.container}>
			<Header title="Edit Type" />
			<ScrollView>
				<View style={{ margin: 20 }}>
					
					<TextInput
						label="Name"
						style={styles.input}
						onChangeText={setText}
                        defaultValue={text}
					/>
					<TextInput 
						multiline={true}
						numberOfLines={4}
						placeholder="Description"
						style={{borderWidth:1,borderColor:'lightgrey'}}
						onChangeText={setDesc}
                        defaultValue={desc}

					></TextInput>
					{/* <TextInput
						label="Description"
						style={styles.input}
						onChangeText={setDesc}
                        defaultValue={desc}
						
					/> */}
					<TextInput
					label="Seedling Name Hindi"
					style={styles.input}
					onChangeText={setNamehi}
                    defaultValue={namehi}
				/>
				<TextInput 
						multiline={true}
						numberOfLines={4}
						placeholder="Description Hindi"
						style={{borderWidth:1,borderColor:'lightgrey'}}
						onChangeText={setdesphi}
                        defaultValue={desphi}

					></TextInput>
				{/* <TextInput
						label="Description Hindi"
						style={styles.input}
						onChangeText={setdesphi}
                        defaultValue={desphi}
					/> */}
				<TextInput
					label="Seedling Name Gujrati"
					style={styles.input}
					onChangeText={setNamegu}
                    defaultValue={namegu}
				/>
				<TextInput 
						multiline={true}
						numberOfLines={4}
						placeholder="Description Gujrati"
						style={{borderWidth:1,borderColor:'lightgrey'}}
						onChangeText={setdespgu}
                        defaultValue={despgu}

					></TextInput>
				{/* <TextInput
						label="Description Gujrati"
						style={styles.input}
						onChangeText={setdespgu}
                        defaultValue={despgu}
					/> */}
				<TextInput
					label="Seedling Name Kannada"
					style={styles.input}
					onChangeText={setNameka}
                    defaultValue={nameka}
				/>
				<TextInput 
						multiline={true}
						numberOfLines={4}
						placeholder="Description Kannada"
						style={{borderWidth:1,borderColor:'lightgrey'}}
						onChangeText={setdespka}
                        defaultValue={despka}

					></TextInput>
				{/* <TextInput
						label="Description Kannada"
						style={styles.input}
						onChangeText={setdespka}
                        defaultValue={despka}
					/> */}
				<TextInput
					label="Seedling Name Marathi"
					style={styles.input}
					onChangeText={setNamemr}
                    defaultValue={namemr}
				/>
				<TextInput 
						multiline={true}
						numberOfLines={4}
						placeholder="Description Marathi"
						style={{borderWidth:1,borderColor:'lightgrey'}}
						onChangeText={setdespmr}
                        defaultValue={despmr}

					></TextInput>
				{/* <TextInput
						label="Description Marathi"
						style={styles.input}
						onChangeText={setdespmr}
                        defaultValue={despmr}
					/> */}

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
								.catch((error) => {
									console.log(error)
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

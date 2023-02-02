import React, { useEffect, useState } from 'react'
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
	const [name, setName] = useState('')
	const [image, setImage] = useState('')
	const [loading, setLoading] = useState(false)
	const [solution1, setSolution] = useState(null)

	React.useEffect(() => {
        getAnswer()
    
      return () => {
        getAnswer()
      }
    }, [])

const {q_id,q_image,question} = route.params
	const handleAdd = async () => {
		if (!name || !image.path) {
			ToastAndroid.show(
				'Please enter name and select image',
				ToastAndroid.SHORT,
			)
			return
		}
		setLoading(true)
        const today = new Date();
        const yyyy = today.getFullYear();
        let mm = today.getMonth() + 1; // Months start at 0!
        let dd = today.getDate();

        if (dd < 10) dd = '0' + dd;
        if (mm < 10) mm = '0' + mm;

        const formattedToday = dd + '/' + mm + '/' + yyyy;
		const filename = image.path.match(/.*\/(.*)$/)[1]
		const formData = new FormData()
		formData.append('s_solution', name)
		formData.append('q_id', q_id)
        formData.append('s_created_date', formattedToday)
        if(image != ''){
            formData.append('s_img', {
                uri: image.path,
                type: image.mime,
                name: filename,
            })
        }
		
		try {
			const res = await fetch(`${url}insertDataSolution`, {
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
				ToastAndroid.show('Solutions added successfully', ToastAndroid.SHORT)
				navigation.goBack()
			}
		} catch (error) {
			setLoading(false)
			console.log(error)
		}
	}

	const getAnswer = async () => {
        var formdata = new FormData()
        formdata.append('q_id',q_id)
		try {
			const res = await fetch(`${url}getSolutionById`, {
				method: 'POST',
				body: formdata,
			})
			const json = await res.json()
            console.log(json.data)
			if (json.status == '200') {
				setSolution(json.data)
			} else {
				return []
			}
		} catch (error) {
			console.log(error)
		}
	}
	return (
		<View style={styles.container}>
			<Header title="Solution" />
			<ScrollView style={{ padding: 20,paddingBottom:50 }}>
                <Text>{question}</Text>
                <Image style={{width:200,height:200}} source={{uri:'https://krishisampark.com/api/'+q_image}}></Image>
					
				<View style={{marginVertical:20,height:2,backgroundColor:'#000',width:'100%'}}>
					
				</View>
				<Text style={{fontWeight:'bold',fontSize:15,color:'#e17055'}}>Previous Solution</Text>
				<Text>{solution1 && solution1.s_solution} </Text>
				{solution1 && solution1.s_img && (  <Image style={{width:200,height:200}} source={{uri:'https://krishisampark.com/api/'+solution1.s_img}}></Image>)}
				<View style={{marginVertical:20,height:2,backgroundColor:'#000',width:'100%'}}>
					
				</View>
				<TextInput
					label="Solution"
					style={styles.input}
					onChangeText={setName}
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
					style={{ marginTop: '10%',marginBottom:'20%' }}
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

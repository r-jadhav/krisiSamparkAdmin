import React, { useRef, useState } from 'react'
import {
	ScrollView,
	StyleSheet,
	ToastAndroid,
	Modal,
	Image,
} from 'react-native'
// import { OutlinedTextField } from '@ubaids/react-native-material-textfield'
import { TextInput } from 'react-native-paper';
import ImagePicker from 'react-native-image-crop-picker'
import { Button } from 'react-native-paper'
import Header from '../components/Header'
import url from '../constant/url'

const EditModal = ({ info, modalVis, setModalVis, handleRefresh }) => {
	const [name, setName] = useState(info.type_name)
	const [image, setImage] = useState({})
	const [loading, setLoading] = useState(false)

	const handleEdit = async () => {
		setLoading(true)
		const formData = new FormData()
		formData.append('type_name', name)
		formData.append('type_id', info.type_id)
		if (image.path) {
			formData.append('type_image', {
				uri: image.path,
				type: image.mime,
				name: image.path.match(/.*\/(.*)$/)[1],
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

			setLoading(false)
			if (json.status == '200') {
				ToastAndroid.show('Updated successfully', ToastAndroid.SHORT)
				setImage({})
				setModalVis(false)
				handleRefresh()
			}
		} catch (error) {
			setLoading(false)
			console.log(error)
		}
	}

	const handleImagePicker = () => {
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
	}

	return (
		<Modal
			animationType="slide"
			visible={modalVis}
			onRequestClose={() => {
				setModalVis(false)
			}}>
			<Header title="Edit Sub Category" noBack={true} />

			<ScrollView style={{ padding: 20 }}>
				<TextInput
					label="Sub Category Name"
					style={styles.input}
					onChangeText={setName}
					defaultValue={info.type_name}
				/>
				{image.path ? (
					<Image style={styles.imageStyle} source={{ uri: image.path }} />
				) : (
					<Image style={styles.imageStyle} source={{ uri: info.type_image }} />
				)}

				<Button
					// contentStyle={{ alignSelf: 'flex-start' }}
					icon="camera"
					mode="outlined"
					onPress={handleImagePicker}>
					Upload Image
				</Button>
				<Button
					style={{ marginTop: '10%' }}
					color="#222022"
					mode="contained"
					loading={loading}
					onPress={handleEdit}>
					Save
				</Button>
			</ScrollView>
		</Modal>
	)
}

export default EditModal

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
		width: 150,
		height: 150,
		resizeMode: 'contain',
		alignSelf: 'center',
		marginVertical: 20,
	},
})

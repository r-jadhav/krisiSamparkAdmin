import React, { useEffect, useState } from 'react'
import { ScrollView, StyleSheet, Text, View, Image } from 'react-native'
import { TextInput } from 'react-native-paper';
// import { OutlinedTextField } from '@ubaids/react-native-material-textfield'
import Header from '../components/Header'
import { Button } from 'react-native-paper'

const AddNotification = () => {
	const [text, setText] = useState('')

	return (
		<View style={styles.container}>
			<Header title="Notification" />

			<ScrollView style={{ padding: 20 }}>
				<TextInput
					label="Text"
					style={styles.input}
					inputContainerStyle={{ borderColor: '#eee' }}
				/>
				<Button
					style={{ marginTop: 30 }}
					color="#222022"
					mode="contained"
					onPress={() => {}}>
					Send Now
				</Button>
			</ScrollView>
		</View>
	)
}

export default AddNotification

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
})

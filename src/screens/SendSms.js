import React, { useState,useEffect,useRef } from 'react'
import {
	ScrollView,
	StyleSheet,
	Text,
	View,
	Image,
	ToastAndroid
} from 'react-native'
// import { OutlinedTextField } from '@ubaids/react-native-material-textfield'
import { TextInput } from 'react-native-paper';
import { Button } from 'react-native-paper'
import url from '../constant/url'
import Header from '../components/Header'
import SelectMultiple from 'react-native-select-multiple'
const AddCategory = ({ navigation }) => {
	const [name, setName] = useState('')
    const [users, setUsers] = useState([])
	const [loading, setLoading] = useState(false)
	const [selectedItems , setselectedItems ] = useState([])
	const [list, SETlIST] = useState([])
	useEffect(() => {
		fetchCategory()
	  }, [])
	const fetchCategory = async () => {
		try {
			const res = await fetch(`${url}getUser`, {
				method: 'POST',
				body: '',
			})
			const json = await res.json()
			if (json.status == '200') {
				setUsers(json.data)
				let data = json.data;
				let final = [];
				data.forEach(element => {
					final.push({label:element.name,value:element.phone})
				});
				SETlIST(final)
			} else {
				return []
			}
		} catch (error) {
			console.log(error)
		}
	}
	const handleAdd = async () => {
		 var str = '';
		if(selectedItems.length == 1){
			str = selectedItems[0].value;
			console.log(str)
		}else{
			selectedItems.forEach(element => {
				str = str+','+element.value;
			});
			str = str.substring(1)
			console.log(str)
		}
		try {
			const res = await fetch(`https://insprl.com/api/sms/send-to-batch?client_id=Csprl_QFSRV6OU5ENC1M8&sender_id=AGROKS&temp_id=1707161521144558342&msgtype=txn&mobile=${str}&message=${name}&client_key=3ELhg1aIM02tlXry@6Y5Afcn`, {
				method: 'POST',
				
				headers: {
					'Authorization': '3ELhg1aIM02tlXry@6Y5Afcn',
				},
			})
			const json = await res.json()
			console.log(json)
			if(json.message == 'success'){
				setselectedItems([])
				setName('')
				ToastAndroid.show('Message sent Successfully',ToastAndroid.LONG)
			}else{
				
				ToastAndroid.show('Unable to send Message',ToastAndroid.LONG)
			}
		} catch (error) {
			setLoading(false)
			console.log(error)
			
		}
	}
	return (
		<View style={styles.container}>
			<Header title="Send SMS" />
			
				<TextInput
					label="Message"
					style={styles.input}
					onChangeText={setName}  
				/>
				 <SelectMultiple
					items={list}
					selectedItems={selectedItems}
					onSelectionsChange={setselectedItems} />
					
				<Button


					style={{ marginVertical: '10%' }}
					color="#222022"
					mode="contained"
					loading={loading}
					onPress={handleAdd}>
					Send Now
				</Button>
			
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
		paddingHorizontal:10
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

import React, { useContext, useState } from 'react'
import {
	Text,
	View,
	ScrollView,
	StyleSheet,
	Pressable,
	Alert,
	ActivityIndicator,
	ToastAndroid,
	RefreshControl,
} from 'react-native'
import Header from '../components/Header'
import AppContext from '../context/AppContext'
import MCI from 'react-native-vector-icons/MaterialCommunityIcons'
import url from '../constant/url'
import EditModal from '../components/EditCategory'

const ViewCategory = ({ navigation }) => {
	
	const [loading, setLoading] = useState(false)
	const [modalVis, setModalVis] = useState(false)
	const [editInfo, setEditInfo] = useState({})
    const [questions, setQuestions] = useState([])
    React.useEffect(() => {
        fetchCategory()
    
      return () => {
        fetchCategory()
      }
    }, [])
    
	const deleteAlert = (id) => {
		Alert.alert(
			'Delete Confirmation',
			'Do you want to delete this question?',
			[{ text: 'Cancel' }, { text: 'Yes', onPress: () => deleteCategory(id) }],
			{ cancelable: true },
		)
	}

	const deleteCategory = async (id) => {
		setLoading(true)
		try {
			const res = await fetch(`${url}deleteRecord`, {
				method: 'POST',
				body: JSON.stringify({
					id: id,
					column: 'q_id',
					table: 'question_tbl',
				}),
			})
			const json = await res.json()
			if (json.status == '200') {
				let res = await fetchCategory()
				setQuestions(res)
			}
			ToastAndroid.show('Category deleted', ToastAndroid.SHORT)
			setLoading(false)
		} catch (error) {
			setLoading(false)
			console.log(error)
		}
	}

	const fetchCategory = async () => {
        var formdata = new FormData()
        formdata.append('u_id','')
		try {
			const res = await fetch(`${url}getQuestionById`, {
				method: 'POST',
				body: formdata,
			})
			const json = await res.json()
            console.log(json.data)
			if (json.status == '200') {
				let finalArray = json.data
				finalArray = finalArray.reverse()
				setQuestions(finalArray)
			} else {
				return []
			}
		} catch (error) {
			console.log(error)
		}
	}

	
	return ( 
		<View style={styles.container}>
			<Header title="Questions" />
			<ScrollView>
				<View style={styles.listWrap}>
					{loading && <ActivityIndicator size="large" color="#000" />}
					{questions.map((item, i) => {
						return (
							<View style={styles.itemWrap} key={i}>
								<Pressable
									android_ripple={{ color: 'gray' }}
									style={styles.item}
									onPress={() => navigation.navigate('Solutions',{
										q_image:item.q_img,
										question:item.q_title,
										q_id:item.q_id
									})
									}>
									<Text style={styles.name}>{item.q_title}</Text>
								</Pressable>
								<View style={styles.icons}>
									<Pressable
										android_ripple={{ color: 'gray' }}
										onPress={() => {
											deleteAlert(item.q_id)
										}}>
										<MCI
											style={styles.icon}
											name="delete-alert-outline"
											size={25}
											color="#e17055"
										/>
									</Pressable>
									<Pressable
										android_ripple={{ color: 'gray' }}
										onPress={() => navigation.navigate('Solutions',{
                                            q_image:item.q_img,
                                            question:item.q_title,
                                            q_id:item.q_id
                                        })
                                        }>
										{item.q_isanswered && (<MCI
											style={styles.icon}
											name="square-edit-outline"
											size={25}
											color="#636e72"
										/>)}
									</Pressable>
								</View>
							</View>
						)
					})}
				</View>
				<EditModal
					info={editInfo}
					modalVis={modalVis}
					setModalVis={setModalVis}
					
				/>
			</ScrollView>
		</View>
	)
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#fff',
	},
	listWrap: {
		margin: 20,
	},
	itemWrap: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
		borderBottomWidth: 0.5,
		borderBottomColor: 'gray',
	},
	icons: {
		flexDirection: 'row',
		alignItems: 'center',
	},
	icon: {
		margin: 10,
	},
	item: {
		paddingVertical: 15,
		flex: 1,
	},
	name: {
		fontSize: 18,
	},
})
export default ViewCategory

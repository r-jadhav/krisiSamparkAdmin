import React from 'react'
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import MCI from 'react-native-vector-icons/MaterialCommunityIcons'
import { useNavigation } from '@react-navigation/native'

const Header = ({ title, noBack = false }) => {
	const navigation = useNavigation()
	return (
		<View style={styles.container}>
			{!noBack && (
				<TouchableOpacity onPress={() => navigation.goBack()}>
					<MCI name="arrow-left" size={28} />
				</TouchableOpacity>
			)}
			<Text style={styles.title}>{title}</Text>
		</View>
	)
}

export default Header

const styles = StyleSheet.create({
	container: {
		paddingVertical: 15,
		paddingHorizontal: 20,
		backgroundColor: '#fff',
		elevation: 2,
		flexDirection: 'row',
		alignItems: 'center',
	},
	title: {
		fontSize: 18,
		fontWeight: 'bold',
		marginLeft: 20,
	},
})

import { StyleSheet, Text, View } from 'react-native'
import React,{useState} from 'react'
import { TextInput,Button } from 'react-native-paper' 
const Login = ({navigation}) => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const onSubmit = () =>{
        if(email == 'sitalkumar@krishisampark' && password == 'krishi5678'){
            navigation.navigate('Home')
        }
    }
  return (
    <View style={{flex:1,justifyContent:'center',paddingHorizontal:20}}>
      <TextInput placeholder='Email' onChangeText={setEmail}></TextInput>
      <TextInput placeholder='Password' onChangeText={setPassword}></TextInput>
      <Button onPress={()=>{
        onSubmit()
      }} style={{marginTop:20}} mode="contained">Submit</Button>
    </View>
  )
}

export default Login

const styles = StyleSheet.create({})
import { View, Text } from 'react-native'
import React from 'react'

export default function Login() {
return(
<View>
    <Image source ={ require('./../assets/images/t3.jpg')}
    style={{
        width:'100%',
        height:500
    }}
    />
    <view>
        <Text style={styles.container}>
            <Text style={{
            fontSize:28,
            fontFamily:'outfit-bold',
            textAlign:'center'
        }}>AI Travel Planner</Text>

        <Text style={{
            fontFamily:'outfit',
            fontSize:17,
            textAlign:'center',
            color:Colors.GRAY
        }}>Discover your next adventure effortlessly. Persona

<View>
    <text>Sign In With GoogleR</text>
    </view>
        </View>
        )
}
const styles = StyleSheet.create({
    container:{
        <backgroundColor:theme.WHITE,
        marginTop:-20,
        borderTopLeftRadius:30,
        borderTopRightRadius:30,
        height:'100%',
        padding:15,
            }
})
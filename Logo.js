import React from 'react';
import { StyleSheet, Text, View,Image,TouchableOpacity } from 'react-native';



export default class Logo extends React.Component {

    render(){
        return(
            <View style={styles.container}>
            <TouchableOpacity
            onPress = {()=>this.props.changePage('showCity')}
            >

            <Image style={styles.imageApp}
              source={require('./Image/app.png')}
             />
            </TouchableOpacity>

            </View>
        )
    }
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#78ffd6'
    },
    imageApp: {
      alignSelf:'center',
      marginTop:100
      

    },
})

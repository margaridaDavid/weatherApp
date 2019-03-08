 import React from 'react';
 import {StyleSheet,View} from 'react-native';
 import GooglePlacesInput from './GooglePlacesInput';

 export default class Search extends React.Component{
    render(){
         return(
            <View style ={StyleSheet.container}>
               <GooglePlacesInput  
                    getCurrentPosition={this.props.getCurrentPosition}
                    getCity={this.props.getCity}
               />
             </View>
         )
    }
}

const styles=StyleSheet.create({
    container:{
        flex:1
    }
})

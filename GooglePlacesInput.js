import React from 'react';
import {  ScrollView } from 'react-native';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import { googlePlacesApiKey } from './config';


const GooglePlacesInput = ({ getCurrentPosition , getCity}) => {

  return (
    <ScrollView>
      <GooglePlacesAutocomplete
        placeholder='Search'
        minLength={2} // minimum length of text to search
        autoFocus={false}
        returnKeyType={'search'} // Can be left out for default return key https://facebook.github.io/react-native/docs/textinput.html#returnkeytype
        listViewDisplayed='auto'    // true/false/undefined
        fetchDetails={true}
        renderDescription={row => row.description} // custom description render
        onPress={(data, details = null) => {
          getCity(details.vicinity)
          getCurrentPosition(details.geometry.location.lat, details.geometry.location.lng)  
        }}

        getDefaultValue={() => ''}

        query={{
          // available options: https://developers.google.com/places/web-service/autocomplete
          key:googlePlacesApiKey,
          language: 'en', // language of the results
          types: '(cities)' // default: 'geocode'
        }}
        styles={{
          textInputContainer: {
            borderRadius:10,
            marginTop:'25%'
          },
          description: {
            fontWeight: 'bold',
            color:'black'
          },
        textInput:{
          backgroundColor:'lightgray',
          height:28,
          fontSize:15
        
          }

        }}
        enablePoweredByContainer={false}
        />
    </ScrollView>

  );
}

export default GooglePlacesInput;
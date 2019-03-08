import React from 'react';
import { StyleSheet, Text, View, Image, ImageBackground } from 'react-native';
import Logo from './Logo';
import ShowCity from './ShowCity';
import Search from './Search';
import GooglePlacesInput from './GooglePlacesInput';
import { openWatherMapAPiKey } from './config';
import Icons from './icon_object';
import Images from './ImagesBackground';


export default class App extends React.Component {


  state = {
    page: 'showCity',
   name:"",
    icon: '',
    temp: '',
    min: '',
    max: '',
    humidity: '',
    wind: '',
    description: '',
    days: [],
    isReady: false

  }
  componentDidMount() {
    this.currentPosition()
  }

  currentPosition = ()=>{
    navigator.geolocation.getCurrentPosition((pos) => {
      const { latitude, longitude } = pos.coords
      this.getCurrentPosition(latitude, longitude)
      this.getForecast(latitude, longitude)

    })
  }
  getCity = (city)=>{
   
this.setState({name:city})
  }
  //closeModal = () => this.setState({modalOpen:!this.state.modalOpen})

  //=============================Geolocation===================================================================
  getCurrentPosition = (latitude, longitude) => {
    
    const url = `http://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=metric&APPID=${openWatherMapAPiKey}`

return fetch(url)

      .then(response => response.json())
      .then(data => {

        this.setState({

          name: data.name,
          icon: data.weather[0].icon,
          temp: data.main.temp,
          min: data.main.temp_min,
          max: data.main.temp_max,
          humidity: data.main.humidity,
          wind: data.wind.speed,
          description: data.weather[0].description
        })
        this.changePage('showCity')

      })
      .catch(error => {
        console.error(error);
      });
  }
  //========================Forecast==============================================================
  getForecast = (latitude, longitude) => {

    const url = `http://api.openweathermap.org/data/2.5/forecast/daily?lat=${latitude}&lon=longitude&units=metric&cnt=10&APPID=${openWatherMapAPiKey}`

    return fetch(url)
      .then(response => response.json())
      .then(data => {
        console.log('=================================', data.list)
        this.setState({ days: data.list })
      })
      .catch(error => {
        console.log(error);
      });
  }
  //==========================================================================================

  changePage = (page) => {

    this.setState({ page })
    this.setState({ isReady: true })
  }

  render() {
    let show;
    let { page } = this.state
    if (page === 'logo') {      show = <Logo changePage={this.changePage} />     }
    if (page === 'search') { show = <Search getCity={this.getCity} getCurrentPosition={this.getCurrentPosition}  changePage={this.changePage}  /> } 
    if (page === 'showCity')  { show = <ShowCity {...this.state} changePage={this.changePage} />}
    if (!this.state.isReady) {
      return <Image
        style={styles.loading}
        resizeMode='contain'
        source={{ uri: 'https://res.cloudinary.com/margadavid/image/upload/v1551949021/giphy.gif' }} />
    }
    return (
      <ImageBackground source={{ uri: Images[this.state.icon] }} style={styles.container}>
        {show}

      </ImageBackground>


    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    opacity: 0.7,
    paddingTop:'10%'
},
loading:{
  width:'100%',
  height:'100%',
  alignSelf: 'center',
  justifyContent:'center',
  
  
}
});

import React from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';
import { MapViewComponent } from './icon_object'

import Icons from './icon_object'


export default class ShowCity extends React.Component {
  state={
    day:'',
    icon:'',
    min:'',
    max:'',
    description:'',
   display:'none'
  }

  changeData=(index,day)=>{
      console.log('==========================================',this.props.days[index])
      this.setState({
        day,
        icon:this.props.days[index].weather[0].icon,
        min:this.props.days[index].temp.min,
        max:this.props.days[index].temp.max,
        description:this.props.days[index].weather[0].description,
        display:'flex'
      })
  }
  

  render() {
    return (
      <View style={styles.container}>

        <View style={styles.header}>
             <View style={{ width: '90%', }}>
                   <Text style={{ fontSize: 37, fontWeight: 'bold' }}>WCity</Text>
             </View>
             <TouchableOpacity onPress={() => this.props.changePage('search')} >
                    <Image 
                    source={{ uri: 'https://res.cloudinary.com/margadavid/image/upload/v1551783366/menu-button-of-three-horizontal-lines.png' }}
                    style={styles.lines} />
          </TouchableOpacity>
      </View>

        <View style={{ height:'55%' }}>
                   <Text style={{ fontSize: 45, alignSelf: 'center' }}>{this.props.name}</Text>
                  <View style={styles.logo}>
                  <Image
                    style={{ width: 90, height: 75, alignSelf: 'center',color:'grey' }}
                    resizeMode="contain"
                    source={{ uri: Icons[this.props.icon] }}
                  />
                 <Text style={{ fontSize: 20, alignSelf: 'center',color: 'white'  }}>{Math.round(this.props.temp)}°c </Text>

               <Text style={{ fontSize: 20, alignSelf: 'center', color: 'white' }}> {Math.round(this.props.min)}°min - {Math.round(this.props.max)}°máx </Text>
               <Text style={{ fontSize: 15, alignSelf: 'center', color: 'white' }}>{Math.round(this.props.humidity)} % Humidity</Text>
               <Text style={{ fontSize: 15, alignSelf: 'center', color: 'white' }}>{Math.round(this.props.wind)} m/s wind</Text>
               <Text style={{ fontSize: 15, alignSelf: 'center',color: 'white' }}>{this.props.description} Cloudy </Text>
              </View>
        </View>

        <View style={styles.week}>
             { 
               this.props.days.map( (ele,i)=>{
                 if(this.props.days.length === 0 || i >7 ||i===0)return null  
                const date = new Date(ele.dt*1000).toString().split(' ')[0]
                 return <TouchableOpacity 
                      onPress ={()=>this.changeData(i,date)}
                       key={i}
                      style={styles.button}>
                 <Text> {date}</Text>
               </TouchableOpacity>
               })
             }
          </View>
          <View style={{display:this.state.display,
                                   height:'28%',
                                   paddingTop:20}}>         
          <Text style={{ fontSize: 20, alignSelf: 'center', color: 'white' }}>{this.state.day}</Text>
          <Image
            style={{ width: 50, height: 50, alignSelf: 'center', color: 'white'  }}
            resizeMode="contain"
            source={{ uri: Icons[this.state.icon] }}
          />

          <Text style={{ fontSize: 20, alignSelf: 'center', color: 'white' }}> {Math.round(this.state.min)}°min - {Math.round(this.state.max)}°máx </Text>   
          <Text style={{ fontSize: 20, alignSelf: 'center',color: 'white' }}>{this.state.description}</Text>     
         </View>
        </View>
      
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column'
  },
  image: {
    width: '100%',
    opacity: 0.7,
    flex: 1
  },
  header: {
    width: '100%',
    height: '10%',
     flexDirection: 'row'

  },
  logo: {
 width: '100%',
  height: '40%'

  },
  week: {
    flexDirection: 'row',
    width: '100%',
    height: '7%',
    color: 'black',
   alignItems:'center'
  },

  lines: {
    width: 35,
    height: 30
  },
  button: {
    width: '16.6%',
    alignItems: 'center'
  }
});

import React from 'react';
import { View, TextInput, StyleSheet, Text, Button, ImageBackground} from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import BackgroundImage from "../assets/background-image.png";


export default class Start extends React.Component {
    constructor(props) {
        super(props);
        this.state = { 
            name: '',
            bgColor: this.colors.white,
        };
    }

    chooseColor = (newColor) => {
        this.setState({ bgColor: newColor});
    };

    colors= {
        white:"#ffffff",
        gray: "#bcbcbc",
        navajowhite : "#ffdead",
        mint: "#b7d3c6",
        blue: "#5d7faf",
        lavender  : "#e6e6fa",
    }
  render() {
    
    return (
    <View style={styles.container}>
        <ImageBackground
          source={BackgroundImage}
          resizeMode="cover"
          style={styles.backgroundImage}
        >
        <View>
            <Text style={styles.titleText}>Chat App</Text>
        </View>

        <View >
            <TextInput
            style={styles.input}
            onChangeText={(name) => this.setState({name})}
            value={this.state.name}
            placeholder='Enter Your Name'
        />
        </View>
        
        <View>
            <Text style={styles.bgText}>Choose Your Background Color:</Text>
        </View>

        <View style={styles.colorList}> 
            <TouchableOpacity style={styles.color1} onPress={()=>this.chooseColor(this.colors.gray)} >
            </TouchableOpacity>
            <TouchableOpacity style={styles.color2} onPress={()=>this.chooseColor(this.colors.navajowhite)} >
            </TouchableOpacity>
            <TouchableOpacity style={styles.color3} onPress={()=>this.chooseColor(this.colors.mint)} >
            </TouchableOpacity>
            <TouchableOpacity style={styles.color4} onPress={()=>this.chooseColor(this.colors.blue)} >
             </TouchableOpacity>
            <TouchableOpacity style={styles.color5} onPress={()=>this.chooseColor(this.colors.lavender)} >
            </TouchableOpacity>       
        </View>
             
        <View style={styles.button}>
            <Button
            title="Start Chatting"
            onPress={() => this.props.navigation.navigate('Chat',{
                name: this.state.name,
                bgColor: this.state.bgColor,
            })}
            />
        </View>
              
     </ImageBackground>
     </View>
    );
  }
  };

  const styles= StyleSheet.create({
    container: {
        flex: 1,
      },

    backgroundImage: {
        flex: 1,
        width: "100%",
        alignItems: "center",
        justifyContent: "center",
      },
    
    titleText: {
        fontWeight: "bold",
        fontSize: 40,
        color: "white",
        textShadowColor:"grey"
        
    },

    bgText:{
        fontWeight: "bold",
        fontSize: 16,
        color: "white",
        textShadowColor:"grey"
    },

    color1:{
          backgroundColor:"#bcbcbc",
          width: 50,
          height: 50,
          borderRadius: 25,
      },

    color2:{
        backgroundColor:"#ffdead",
        width: 50,
        height: 50,
        borderRadius: 25,
    },
    color3:{
        backgroundColor: "#b7d3c6",
        width: 50,
        height: 50,
        borderRadius: 25,
    },
    color4:{
        backgroundColor: "#5d7faf",
        width: 50,
        height: 50,
        borderRadius: 25,
    },
    color5:{
        backgroundColor: "#e6e6fa",
        width: 50,
        height: 50,
        borderRadius: 25,
    },
    colorList:{
        flexDirection: "row",
        justifyContent: 'space-between',
        paddingVertical: 10
    },
    input: {
        height: 40,
        width: 200,
        margin: 12,
        borderWidth: 1,
        padding: 10,
        backgroundColor: "#FFFFFF",
      },
    
    button: {
        backgroundColor: "#FFFFFF",
        opacity: 0.6,
        borderRadius: 70 
    }

  

  

  })
  
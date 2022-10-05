import React, { Component } from 'react';
import { View, Text, Button, TextInput, KeyboardAvoidingView, StyleSheet } from 'react-native';
import MyButton from './MyButton';

class Main extends Component {
  constructor(props) {
    super(props);
    this.state = {

    };
  }

  handleCallback = (childData) => {
    this.props.navigation.navigate(childData)
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.button}>
          <MyButton 
            route="Gallery"
            title="Camera App"
            parentCallback={this.handleCallback}
            color="#FFFFFF"
            size="60"
          />
        </View>
        <View style={styles.textContainer}>
          <Text style={styles.text}>Show gallery pictures</Text>
          <Text style={styles.text}>Take picture from camera</Text>
          <Text style={styles.text}>Save photo to device</Text>
          <Text style={styles.text}>Delete photo from device</Text>
          <Text style={styles.text}>Share photo</Text>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#EA1E63",
    color: "#FFFFFF",
    alignItems: "center",
    justifyContent: "center",
  },
  text: {
    color: "#FFFFFF",
    fontSize: 20,
  },
  button: {
    flex: 1
  },
  textContainer: {
    flex: 1,
    alignItems: "center"
  }, 
});


export default Main;
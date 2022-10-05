import React, { Component } from 'react';
import { View, Text, Button, TouchableOpacity, StyleSheet } from 'react-native';
import PropTypes from 'prop-types';

class MyButton extends Component {
  onPress = (event) => {
    if (this.props.route) {
      this.props.parentCallback(this.props.route);
    } else {
      this.props.parentCallback(this.props.function);
    }
  };

  render() {
    return (
      this.props.size ?
      <TouchableOpacity style={styles.container} onPress={this.onPress}>
        <Text style={{
          fontWeight: "bold",
          fontSize: parseInt(this.props.size),
          color: this.props.color,
        }}>{this.props.title}</Text>
      </TouchableOpacity>
      :
      <TouchableOpacity style={styles.container} onPress={this.onPress}>
      <Text style={{
        fontWeight: "bold",
        fontSize: 18,
        color: this.props.color,
        textAlign: "center"
      }}>{this.props.title}</Text>
    </TouchableOpacity>
    );
  }
}

MyButton.propTypes = {
  title: PropTypes.string.isRequired,
};

const styles = StyleSheet.create({
  container: {
    margin: 15,
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
  },
})

export default MyButton;
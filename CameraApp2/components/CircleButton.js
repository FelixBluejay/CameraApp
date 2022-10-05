import React, { Component } from 'react';
import { View, TouchableOpacity, StyleSheet, Image } from 'react-native';
import add from "../assets/icon-add.png";
import back from "../assets/icon-back.png";
import settings from "../assets/icon-settings.png";

class CircleButton extends Component {
    constructor(props) {
        super(props);
        
    }
    
    onPress = () => {
        this.props.parentCallback();
    };

    render() {
        return (
            this.props.icon == "add" ?
            <TouchableOpacity style={{
                margin: 15,
                backgroundColor: "#1A1F22",
                opacity: 0.9,
                alignItems: "center",
                justifyContent: "center",
                width: this.props.size,
                height: this.props.size,
                borderRadius: this.props.size / 2,
            }}
                onPress={this.onPress}>
                    
                <Image source={add} style={{
                    width: "70%",
                    height: "70%"
                }}/>
            </TouchableOpacity>
            : this.props.icon == "back" ?
            <TouchableOpacity style={{
                margin: 15,
                backgroundColor: "#1A1F22",
                opacity: 0.9,
                alignItems: "center",
                justifyContent: "center",
                width: this.props.size,
                height: this.props.size,
                borderRadius: this.props.size / 2,
            }}
                onPress={this.onPress}>
                    
                <Image source={back} style={{
                    width: "70%",
                    height: "70%"
                }}/>
            </TouchableOpacity>
            :
            <TouchableOpacity style={{
                margin: 15,
                backgroundColor: "#1A1F22",
                opacity: 0.9,
                alignItems: "center",
                justifyContent: "center",
                width: this.props.size,
                height: this.props.size,
                borderRadius: this.props.size / 2,
            }}
                onPress={this.onPress}>
                    
                <Image source={settings} style={{
                    width: "70%",
                    height: "70%"
                }}/>
            </TouchableOpacity>
        )
    }
}

const styles = StyleSheet.create({
    container: {

    },
})

export default CircleButton;
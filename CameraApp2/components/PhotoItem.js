import React, { Component } from 'react';
import { View, Text, Button, StyleSheet, Image, TouchableOpacity } from 'react-native';
import add from "../assets/icon-add.png"

class PhotoItem extends Component {
    constructor(props) {
        super(props);
        this.state = {
            pressed: false,
        };
    }

    render() {
        return (
            this.state.pressed ?
                <TouchableOpacity
                    onPress={() => {
                    }}
                    onLongPress={() => {
                        this.props.hold(this)
                        this.setState({
                            pressed: false
                        })
                    }}
                    style={{
                        width: this.props.width,
                        height: this.props.height,
                        margin: this.props.margin,
                    }}>
                    <Image
                        style={{
                            position: "absolute",
                            width: "100%",
                            height: "100%",
                            borderRadius: 10,
                            flex: 1,
                        }}
                        source={add}
                    />
                    <Image
                        style={{
                            borderRadius: 10,
                            flex: 1,
                            opacity: 0.2,
                        }}
                        source={{ uri: this.props.uri }}
                    />
                    <Text
                        style={{
                            position: "absolute",
                            right: 5,
                            bottom: 5,
                            color: "#FFFFFF",
                            fontWeight: "bold"
                        }}>
                        {this.props.id}
                    </Text>
                </TouchableOpacity>
                :
                <TouchableOpacity
                    onPress={() => {
                        this.props.tap(this)
                    }}
                    onLongPress={() => {
                        this.props.hold(this)
                        this.setState({
                            pressed: true
                        })
                    }}
                    style={{
                        width: this.props.width,
                        height: this.props.height,
                        margin: this.props.margin,
                    }}>
                    <Image
                        style={{
                            borderRadius: 10,
                            flex: 1,
                        }}
                        source={{ uri: this.props.uri }}
                    />
                    <Text
                        style={{
                            position: "absolute",
                            right: 5,
                            bottom: 5,
                            color: "#FFFFFF",
                            fontWeight: "bold"
                        }}>
                        {this.props.id}
                    </Text>
                </TouchableOpacity>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        alignItems: "center"
    },
})


export default PhotoItem;
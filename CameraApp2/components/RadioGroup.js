import React, { Component } from 'react';
import { View, Text } from 'react-native';
import RadioButton from "./RadioButton";

export default class RadioGroup extends Component {
    constructor(props) {
        super(props);
        this.state = {
            prevButton: null,
        };
    }

    checkToggle = (button) => {
        if(this.state.prevButton) {
            this.state.prevButton.state.pressed = false;
        }

        console.log(button)

        button.state.pressed = true;
        this.setState({
            prevButton: button,
        })      
        
        this.props.change(button.props.setting, this.props.title)
    }

    render() {
        return (
            <View style={{
                backgroundColor: "#rgba(0, 0, 0, 0.8)"
            }}>
                <View style={{
                    flexDirection: "column",
                    marginLeft: 20,
                    marginTop: 20,
                    marginBottom: 20,
                }}>
                    <View style={{
                        backgroundColor: "#FFFFFF",
                        height: 1,
                        width: "80%",
                        alignSelf: "center"
                    }} />
                    <Text style={{
                        color: "#FFFFFF",
                        fontSize: 25,
                        marginTop: 20
                    }}>
                        {this.props.title}
                    </Text>
                    {this.props.data.map((item, index) => {
                        return (
                            <View style={{
                                display: "flex",
                                flexDirection: "row",
                                marginTop: 22,
                                alignItems: "center"
                            }}>
                                <RadioButton id={index} setting={item} parentCallback={this.checkToggle} />
                                <Text style={{
                                    color: "#FFFFFF",
                                    fontSize: 20,
                                    marginLeft: 20
                                }}>
                                    {item}
                                </Text>
                            </View>
                        )
                    })}
                </View>
            </View>
        );
    }
}

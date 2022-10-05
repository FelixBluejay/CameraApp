import React, { Component } from 'react';
import { View, Text, TouchableWithoutFeedback } from 'react-native';

export default class RadioButton extends Component {
    constructor(props) {
        super(props);
        this.state = {
            pressed: false,
        };
        this.size = 40;
        this.smallSize = 20;
    }

    onPress = () => {
        this.props.parentCallback(this)
    }

    render() {
        return (
            this.state.pressed ?
                <TouchableWithoutFeedback onPress={this.onPress}>
                    <View  style={{
                        height: this.size,
                        width: this.size,
                        borderRadius: this.size / 2,
                        backgroundColor: "transparent",
                        borderStyle: "solid",
                        borderWidth: 2,
                        borderColor: "#EA1E63",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center"
                    }}>
                        <View style={{
                            height: this.smallSize,
                            width: this.smallSize,
                            borderRadius: this.smallSize / 2,
                            backgroundColor: "#EA1E63"
                        }} />
                    </View>
                </TouchableWithoutFeedback>
                :
                <TouchableWithoutFeedback onPress={this.onPress}>
                    < View  style={{
                        height: this.size,
                        width: this.size,
                        borderRadius: this.size / 2,
                        backgroundColor: "transparent",
                        borderStyle: "solid",
                        borderWidth: 2,
                        borderColor: "#EA1E63",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center"
                    }
                    }>
                    </View >
                </TouchableWithoutFeedback >
        );
    }
}

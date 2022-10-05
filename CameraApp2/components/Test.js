import { Animated, View, Text, Button, StyleSheet } from "react-native";
import React, { Component } from 'react';


class Test extends Component {
    constructor(props) {
        super(props);
        this.state = {
            pos: new Animated.Value(500),  //startowa pozycja y wysuwanego View
        };
        this.isHidden = true
        console.log(this.state.pos)
    }

    toggle() {
        let toPos;
        if (this.isHidden) toPos = 0; else toPos = 500
        //animacja
        Animated.spring(
            this.state.pos,
            {
                toValue: toPos,
                velocity: 1,
                tension: 0,
                friction: 10,
                useNativeDriver: true
            }
        ).start();
        this.isHidden = !this.isHidden;
    }

    render() {
        return (
            <View style={{ flex: 1 , backgroundColor: "#FF0000", position: "relative"}}>
                <Animated.View
                    style={[
                        styles.animatedView,
                        {
                            transform: [
                                { translateY: this.state.pos }
                            ]
                        }]} >
                    <Text>ANIMATE ME!</Text>
                </Animated.View>
                <Button title="stsdsdsdsdart" style={styles.button} onPress={() => { this.toggle() }} />
            </View>
        );
    }
}


var styles = StyleSheet.create({

    button:{
        position: "absolute",
        bottom: 0,
        // left: 0,
        zIndex: 10,
        backgroundColor: "#333333",
        // flex: 1
    },
    animatedView: {
        // position: "absolute",
        zIndex: 0,
        bottom: 0,
        left: 0,
        right: 0,
        backgroundColor: "#00ff00",
        height: 500,
    }
});

export default Test

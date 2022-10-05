import React, { Component } from 'react';
import { View, Text, Button, StyleSheet, Image, TouchableOpacity } from 'react-native';
import MyButton from "./MyButton";
import * as MediaLibrary from "expo-media-library";
import { BackHandler } from "react-native";
import * as Sharing from 'expo-sharing';

class BigPhoto extends Component {
    constructor(props) {
        super(props);
        this.state = {
            width: "",
            height: ""
        };
    }

    handleCallback = (childData) => {
        if (childData == "delete") {
            this.deletePhoto();
        } else if (childData == "share") {
            this.sharePhoto();
        }
    }

    backAction = () => {
        this.props.route.params.refresh();
        this.props.navigation.goBack();
        return true;
    };

    componentWillUnmount() {
        BackHandler.removeEventListener("hardwareBackPress", this.backAction);
    }

    componentDidMount() {
        BackHandler.addEventListener("hardwareBackPress", this.backAction);
    }

    sharePhoto = async () => {
        Sharing.shareAsync(this.props.route.params.uri)
    }

    deletePhoto = async () => {
        if (await MediaLibrary.deleteAssetsAsync(this.props.route.params.id)) {
            this.props.route.params.refresh();
            this.props.navigation.navigate("Gallery");
        }
    }

    render() {
        return (
            <View style={{ flex: 1, backgroundColor: "#1A1F22" }}>
                <View style={{ flex: 4, alignItems: "center", justifyContent: "center" }}>
                    <Image
                        resizeMode={'cover'}
                        style={{ width: "90%", height: "90%", borderRadius: 20 }}
                        source={{ uri: this.props.route.params.uri }}
                    />
                </View>
                <View style={{ flex: 1, alignItems: "flex-end"}}>
                    <Text style={{ flex: 1, color: "#FFFFFF", fontSize: 45, padding: 20, paddingRight: 40 }}>{this.props.route.params.width}x{this.props.route.params.height}</Text>
                </View>
                <View style={{ flex: 1, flexDirection: "row" }}>
                    <MyButton
                        title="SHARE"
                        parentCallback={this.handleCallback}
                        color="#FFFFFF"
                        function="share"
                    />
                    <MyButton
                        title="DELETE"
                        parentCallback={this.handleCallback}
                        color="#FFFFFF"
                        function="delete"
                    />
                </View>
            </View>

        );
    }
}

const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        alignItems: "center"
    },
})


export default BigPhoto;
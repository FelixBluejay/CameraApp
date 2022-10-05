import React, { Component } from 'react';
import { View, Animated, Text, StyleSheet, ScrollView, Dimensions, ToastAndroid, LogBox, BackHandler } from 'react-native';
import { Camera } from "expo-camera";
import * as MediaLibrary from "expo-media-library";
import CircleButton from './CircleButton';
import RadioGroup from "./RadioGroup";

LogBox.ignoreLogs([
    'Non-serializable values were found in the navigation state',
]);

class CameraScreen extends Component {
    constructor(props) {
        super(props);
        this.toggle = this.toggle.bind(this);
        this.screenHeight = Dimensions.get("window").height;
        this.state = {
            hasCameraPermission: null,
            type: Camera.Constants.Type.back,
            pos: new Animated.Value(this.screenHeight),  //startowa pozycja y wysuwanego View
            wb: Object.keys(Camera.Constants.WhiteBalance),
            fm: Object.keys(Camera.Constants.FlashMode),
            ratios: [],
            sizes: [],
            curWb: "auto",
            curFm: "off",
            curRatio: "16:9",
            curSize: "1280x720",
            camera: null,
            cameraHeight: "100%"
        };
        this.isHidden = true
    }

    backAction = () => {
        if (this.isHidden) {
            this.props.route.params.refresh();
            this.props.navigation.goBack();
        } else {
            this.toggle();
        }
        return true;
    };

    componentWillUnmount() {
        BackHandler.removeEventListener("hardwareBackPress", this.backAction);
    }

    componentDidMount = async () => {
        BackHandler.addEventListener("hardwareBackPress", this.backAction);
        let { status } = await Camera.requestCameraPermissionsAsync();
        this.setState({
            hasCameraPermission: status == 'granted',
        });
        this.updateCameraHeight(this.state.curRatio)
    }

    changeCamera = () => {
        this.setState({
            type: this.state.type === Camera.Constants.Type.back
                ? Camera.Constants.Type.front
                : Camera.Constants.Type.back,
        });
    }

    takePhoto = async () => {
        if (this.camera) {
            let foto = await this.camera.takePictureAsync();
            await MediaLibrary.createAssetAsync(foto.uri);
            ToastAndroid.showWithGravity(
                'Photo taken',
                ToastAndroid.SHORT,
                ToastAndroid.TOP,
            );
        }
    }

    toggle() {
        this.getAsyncData(this.camera)
        this.setState({
            camera: this.camera
        })

        let toPos;
        if (this.isHidden) toPos = 0; else toPos = this.screenHeight;

        // Animacja
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

    getAsyncData = async (camera) => {
        let ratios = await camera.getSupportedRatiosAsync()
        let sizes = await this.state.camera.getAvailablePictureSizesAsync(this.state.curRatio)

        this.setState({
            ratios: ratios,
            sizes: sizes
        })
    }

    updateCameraHeight = (inR) => {
        let ratio = inR.split(":");
        let cameraRatio = ratio[0] / ratio[1];
        let cameraHeight = Dimensions.get("window").width * cameraRatio;
        this.setState({
            cameraHeight: cameraHeight,
        });
    }

    changeSettings = (setting, title) => {
        if (title == "WHITE BALANCE") {
            this.setState({
                curWb: setting,
            })
        } else if (title == "FLASH MODE") {
            this.setState({
                curFm: setting,
            })
        } else if (title == "RATIO") {
            this.setState({
                curRatio: setting,
            })
            this.getAsyncData(this.state.camera)
            this.updateCameraHeight(setting)
        } else if (title == "PICTURE SIZE") {
            this.setState({
                curSize: setting,
            })
        }
    }

    render() {
        const { hasCameraPermission } = this.state;
        if (hasCameraPermission == null) {
            return <View />;
        } else if (hasCameraPermission == false) {
            return <Text>Camera permission not granted!</Text>;
        } else {
            return (
                <View style={{ flex: 1, backgroundColor: "#000000" }}>
                    <View style={{ flex: 1 }}>
                        <Camera
                            ratio={this.state.curRatio}
                            whiteBalance={this.state.curWb}
                            pictureSize={this.state.curSize}
                            flashMode={this.state.curFm}
                            ref={ref => {
                                this.camera = ref; // Uwaga: referencja do kamery używana później
                            }}
                            style={{ width: "100%", height: this.state.cameraHeight }}
                            type={this.state.type}>
                        </Camera>
                        <View style={{
                            position: "absolute",
                            bottom: 0,
                            width: "100%",
                            alignItems: "center",
                            justifyContent: "space-around",
                            flexDirection: 'row',
                        }}>
                            <CircleButton size={100} icon="back" parentCallback={this.changeCamera} />
                            <CircleButton size={120} icon="add" parentCallback={this.takePhoto} />
                            <CircleButton size={100} icon="settings" parentCallback={this.toggle} />
                        </View>
                    </View>
                    <Animated.View
                        style={[
                            styles.animatedView,
                            {
                                transform: [
                                    { translateY: this.state.pos }
                                ]
                            }]} >
                        <ScrollView>
                            <RadioGroup
                                change={this.changeSettings}
                                direction="column/row"
                                data={this.state.wb}
                                title="WHITE BALANCE" />
                            <RadioGroup
                                change={this.changeSettings}
                                direction="column/row"
                                data={this.state.fm}
                                title="FLASH MODE" />
                            <RadioGroup
                                change={this.changeSettings}
                                direction="column/row"
                                data={this.state.ratios}
                                title="RATIO" />
                            <RadioGroup
                                change={this.changeSettings}
                                direction="column/row"
                                data={this.state.sizes}
                                title="PICTURE SIZE" />
                        </ScrollView>
                    </Animated.View>
                </View>
            );
        }
    }
}

const styles = StyleSheet.create({
    animatedView: {
        position: "absolute",
        zIndex: 0,
        bottom: 0,
        left: 0,
        right: 0,
        height: "100%",
        width: "70%"
    }
})


export default CameraScreen;
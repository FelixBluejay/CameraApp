import React, { Component } from 'react';
import { View, FlatList, Switch, Text, Button, TextInput, KeyboardAvoidingView, StyleSheet } from 'react-native';
import MyButton from './MyButton';
import PhotoItem from './PhotoItem';
import * as MediaLibrary from "expo-media-library";
import { Dimensions } from "react-native";

export default class Gallery extends Component {
    constructor(props) {
        super(props);
        this.state = {
            photos: [],
            numColumns: 5,
            width: 0,
            height: 0,
            margin: 7,
            photosToDelete: [],
        };
    }

    componentDidMount = async () => {
        let { status } = await MediaLibrary.requestPermissionsAsync();
        if (status !== 'granted') {
            alert('brak uprawnień do czytania image-ów z galerii');
        } else {
            this.getPhotos();
        }
    }

    getPhotos = async () => {
        let obj = await MediaLibrary.getAssetsAsync({
            first: 50,
            mediaType: 'photo',
            album: "-2075821635",
        })
        // console.log(obj.assets)
        this.setState({
            photos: obj.assets
        })
        this.updateSize();
    }

    updateSize = () => {
        if (this.state.numColumns != 1) {
            let size = (Dimensions.get("window").width / this.state.numColumns) - ((this.state.numColumns * this.state.margin) / 2);
            this.setState({
                width: size,
                height: size
            });
        }
        if (this.state.numColumns == 1) {
            this.setState({
                width: Dimensions.get("window").width - this.state.margin * 2,
                height: 200
            });
        }
    }

    toggleGrid = () => {
        if (this.state.numColumns != 1) {
            this.setState({
                numColumns: 1
            });
        } else {
            this.setState({
                numColumns: 5
            });
        }
        setTimeout(() => {
            this.updateSize()
        }, 1);
    }

    handleCallback = (childData) => {
        if (childData == "toggleGrid") {
            this.toggleGrid();
        } else if (childData == "CameraScreen") {
            this.props.navigation.navigate(childData,
                {
                    refresh: this.getPhotos
                }
            );
        } else if(childData == "removePhotos") {
            this.removePhotos();
        }
    }

    removePhotos = async () => {
        await MediaLibrary.deleteAssetsAsync(this.state.photosToDelete).then(this.getPhotos);
    }

    selectPhoto = (item) => {
        let ids = this.state.photosToDelete;
        if (item.state.pressed) {
            const index = ids.indexOf(item.props.id);
            if (index > -1) {
                ids.splice(index, 1);
            }
        } else {
            ids.push(item.props.id);
        }
        this.setState({
            photosToDelete: ids
        })
    }

    openPhoto = (item) => {
        console.log(item)
        this.props.navigation.navigate("BigPhoto", {
            refresh: this.getPhotos,
            uri: item.props.uri,
            id: item.props.id,
            width: item.props.bigWidth,
            height: item.props.bigHeight
        })
    }

    render() {
        return (
            <View style={styles.container}>
                <View style={styles.buttonContainer}>
                    <MyButton
                        title="GRID / LIST"
                        parentCallback={this.handleCallback}
                        color="#FFFFFF"
                        function="toggleGrid"
                    />
                    <MyButton
                        title="OPEN CAMERA"
                        parentCallback={this.handleCallback}
                        color="#FFFFFF"
                        route="CameraScreen"
                    />
                    <MyButton
                        title="REMOVE SELECTED"
                        parentCallback={this.handleCallback}
                        color="#FFFFFF"
                        function="removePhotos"
                    />
                </View>
                <View style={styles.listContainer}>
                    <FlatList
                        numColumns={this.state.numColumns}
                        key={this.state.numColumns}
                        data={this.state.photos}
                        renderItem={({ item }) => <PhotoItem tap={this.openPhoto} pressed={false} hold={this.selectPhoto} uri={item.uri} id={item.id} margin={this.state.margin} width={this.state.width} height={this.state.height} bigWidth={item.width} bigHeight={item.height} />}
                    />
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#1A1F22",
    },
    buttonContainer: {
        flexDirection: "row",
    },
    listContainer: {
        flex: 5,
        justifyContent: "center",
        alignItems: "center"
    },
    button: {
        backgroundColor: "#af8eb5",
        marginTop: 10
    }

});


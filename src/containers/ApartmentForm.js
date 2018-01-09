import React, { Component } from 'react';
import { View, Text, Picker, Button } from 'react-native';
import { connect } from 'react-redux';
import { apartmentUpdate } from '../actions';
import {Card} from "./common/Card";
import {CardItem} from "./common/CardItem";
import {Input} from "./common/Input";
// import RNFetchBlob from 'react-native-fetch-blob'
// import CameraRollPicker from 'react-native-camera-roll-picker'

class ApartmentForm extends Component {

    // convertToByteArray = (input) => {
    //     var binary_string = this.atob(input);
    //     var len = binary_string.length;
    //     var bytes = new Uint8Array(len);
    //     for (var i = 0; i < len; i++) {
    //         bytes[i] = binary_string.charCodeAt(i);
    //     }
    //     return bytes
    // }
    //
    // atob = (input) => {
    //     const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=';
    //
    //     let str = input.replace(/=+$/, '');
    //     let output = '';
    //
    //     if (str.length % 4 == 1) {
    //         throw new Error("'atob' failed: The string to be decoded is not correctly encoded.");
    //     }
    //     for (let bc = 0, bs = 0, buffer, i = 0;
    //          buffer = str.charAt(i++);
    //
    //          ~buffer && (bs = bc % 4 ? bs * 64 + buffer : buffer,
    //          bc++ % 4) ? output += String.fromCharCode(255 & bs >> (-2 * bc & 6)) : 0
    //     ) {
    //         buffer = chars.indexOf(buffer);
    //     }
    //
    //     return output;
    // }
    //
    // getSelectedImages = (selectedImages, currentImage) => {
    //
    //     const image = this.convertToByteArray(currentImage.base64);


        // const Blob = RNFetchBlob.polyfill.Blob;
        // const fs = RNFetchBlob.fs;
        // window.XMLHttpRequest = RNFetchBlob.polyfill.XMLHttpRequest;
        // window.Blob = Blob;


        // let uploadBlob = null;
        // const imageRef = firebase.storage().ref('posts').child("test.jpg");
        // let mime = 'image/jpg';
        // fs.readFile(image, 'base64')
        //     .then((data) => {
        //         return Blob.build(data, { type: `${mime};BASE64` })
        //     })
        //     .then((blob) => {
        //         uploadBlob = blob;
        //         this.props.apartmentUpdate({ prop: 'image', value: uploadBlob})
                // this.setState({image: uploadBlob})
                // return imageRef.put(blob, { contentType: mime })
            // })
            // .then(() => {
            //     uploadBlob.close();
                // return imageRef.getDownloadURL()
            // })
            // .then((url) => {
                // URL of the image uploaded on Firebase storage
                // console.log(url);
            //
            // })
            // .catch((error) => {
            //     console.log(error);
            //
            // })
    // }

    render() {
        return(
            <Card>
                <CardItem>
                    <Input
                        placeholder="Enter the title of your post"
                        autoCorrect={false}
                        label="title"
                        value={this.props.title}
                        onChangeText={text => this.props.apartmentUpdate({ prop: 'title', value: text})}
                    />
                </CardItem>
                <CardItem>
                    {/*<CameraRollPicker selected={[]} maximum={1} callback={this.getSelectedImages} />*/}
                    <Input
                        placeholder="Enter the url of your apartment"
                        autoCorrect={false}
                        label="Image url"
                        value={this.props.imageUrl}
                        onChangeText={imageUrl => this.props.apartmentUpdate({ prop: 'imageUrl', value: imageUrl})}/>
                </CardItem>
                <CardItem>
                    <Text>Cost</Text>
                    <Picker
                        selectedValue={this.props.cost}
                        onValueChange={euro => this.props.apartmentUpdate({ prop: 'cost', value: euro })}>
                        <Picker.Item label="300" value="300"/>
                        <Picker.Item label="500" value="500"/>
                        <Picker.Item label="800" value="800"/>
                    </Picker>
                </CardItem>
            </Card>
        );
    }
}

const mapStateToProps = (state) => {
    const { title, imageUrl, cost } = state.apartmentForm;
    return { title, imageUrl, cost };
};

export default connect(mapStateToProps, { apartmentUpdate })(ApartmentForm);
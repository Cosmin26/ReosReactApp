// import React, { Component } from 'react';
// import { StyleSheet } from "react-native";
// import { connect } from "react-redux";
// import { editApartment } from "../actions/index";
// import { Card, Button, FormLabel, FormInput } from 'react-native-elements';
//
// class ApartmentDetail extends Component {
//     constructor(props) {
//         super(props);
//         console.log("Before mount: ", this.props);
//         console.log("Apartment: ", this.props.apartment);
//         this.state = {
//             id: this.props.apartment.id,
//             title: this.props.apartment.title,
//             img: this.props.apartment.img
//         }
//     }
//
//     _updateApartment() {
//         // console.log(this.state);
//         console.log("Update: ", this.state.id);
//         this.props.updateApartment(
//             this.state.id,
//             this.state.title
//         )
//     }
//
//     render() {
//         return (
//         <Card
//             title={this.state.id}
//             image={{uri: this.props.apartment.imageUrl}}>
//             <FormLabel>Title</FormLabel>
//             <FormInput placeholder={this.state.title} onChangeText={(text) => {
//                 this.setState({title: text})
//             }}/>
//             <FormInput placeholder={this.state.title} onChangeText={(text) => {
//                 this.setState({title: text})
//             }}/>
//             <Button
//                 icon={{name: 'code'}}
//                 backgroundColor='#03A9F4'
//                 onPress={() => {this._updateApartment()}}
//                 buttonStyle={{borderRadius: 0, marginLeft: 0, marginRight: 0, marginBottom: 0}}
//                 title='Update' />
//         </Card>
//
//         )
//     }
// }
//
// const styles = StyleSheet.create({
//     saveBtn: {
//         flexDirection: 'row',
//         justifyContent: 'center',
//         backgroundColor: "skyblue",
//         padding: 20,
//     }
// });
//
// const mapDispatchToProps = (dispatch) => {
//     return {
//         updateApartment: (id, title) => {
//             dispatch(editApartment(id, title))
//         }
//     }
// };
//
// export default connect(
//     () => {return {}},
//     mapDispatchToProps
// )(ApartmentDetail);

import React, { Component } from 'react';
import _ from 'lodash';
import { View, Text, Picker, Button } from 'react-native';
import { connect } from 'react-redux';
import Communications from 'react-native-communications'
import { apartmentUpdate, apartmentCreate, apartmentSave, apartmentDelete } from '../actions';
import ApartmentForm from "./ApartmentForm";
import {Confirm} from "./common/Confirm";
import {Actions} from "react-native-router-flux";

class ApartmentDetail extends Component {
    state = {
        visible: false,
    };

    componentWillMount() {
        _.each(this.props.apartment, (value, prop) => {
            this.props.apartmentUpdate({ prop, value});
        });
    }

    onButtonPress() {
        const { title, imageUrl, cost, uid } = this.props;
        console.log(this.props.apartment.uid);
        this.props.apartmentSave({ title, imageUrl, cost, uid: this.props.apartment.uid });
    }

    onTextPress() {
        const { phone, shift } = this.props;
        Communications.text(phone, `You schedlue begins on ${shift}`);
    }

    onDeletePress() {
        this.setState({
            visible: !this.state.visible
        });
    }

    onAccept() {
        this.setState({
            visible: false,
        });
        this.props.apartmentDelete({ uid: this.props.apartment.uid });
    }

    onReject() {
        this.setState({
            visible: false,
        });
    }

    render() {
        return(
            <View>
                <Confirm visible={this.state.visible}
                         onAccept={this.onAccept.bind(this)}
                         onReject={this.onReject.bind(this)}
                >
                    <Text>Do you want to delete the post of the apartment?</Text>
                </Confirm>
                <ApartmentForm { ...this.props } />
                <Button title="Save changes" text="save changes" onPress={ this.onButtonPress.bind(this) } />
                {/*<Button title="Text Schedule" text="Text Schedule" onPress={ this.onTextPress.bind(this) } />*/}
                <Button title="Delete" text="Delete" onPress={ this.onDeletePress.bind(this) } />
            </View>
        );
    }
}

const mapStateToProps = (state) => {
    const { title, imageUrl, cost, visible } = state.apartmentForm;
    return { title, imageUrl, cost, visible };
};

export default connect(mapStateToProps, {
    apartmentUpdate,
    apartmentCreate,
    apartmentSave,
    apartmentDelete,
})(ApartmentDetail);
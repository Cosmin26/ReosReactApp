import React, { Component } from 'react';
import { StyleSheet } from "react-native";
import { connect } from "react-redux";
import { editApartment } from "../actions/index";
import { Card, Button, FormLabel, FormInput } from 'react-native-elements';

class ApartmentDetail extends Component {
    constructor(props) {
        super(props);
        console.log("Before mount: ", this.props);
        console.log("Apartment: ", this.props.apartment);
        this.state = {
            id: this.props.apartment.id,
            title: this.props.apartment.title,
            img: this.props.apartment.img
        }
    }

    _updateApartment() {
        // console.log(this.state);
        console.log("Update: ", this.state.id);
        this.props.updateApartment(
            this.state.id,
            this.state.title
        )
    }

    render() {
        return (
        <Card
            title={this.state.id}
            image={this.props.apartment.img}>
            <FormLabel>Title</FormLabel>
            <FormInput placeholder={this.state.title} onChangeText={(text) => {
                this.setState({title: text})
            }}/>
            <Button
                icon={{name: 'code'}}
                backgroundColor='#03A9F4'
                onPress={() => {this._updateApartment()}}
                buttonStyle={{borderRadius: 0, marginLeft: 0, marginRight: 0, marginBottom: 0}}
                title='Update' />
        </Card>

        )
    }
}

const styles = StyleSheet.create({
    saveBtn: {
        flexDirection: 'row',
        justifyContent: 'center',
        backgroundColor: "skyblue",
        padding: 20,
    }
});

const mapDispatchToProps = (dispatch) => {
    return {
        updateApartment: (id, title) => {
            dispatch(editApartment(id, title))
        }
    }
};

export default connect(
    () => {return {}},
    mapDispatchToProps
)(ApartmentDetail);
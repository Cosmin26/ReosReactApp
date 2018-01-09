import React, { Component } from 'react';
import { View, Text, Picker, Button } from 'react-native';
import { connect } from 'react-redux';
import ApartmentForm from './ApartmentForm';
import { apartmentUpdate, apartmentCreate } from '../actions';

class CreateApartment extends Component {
    onButtonPress() {
        const { title, imageUrl, cost } = this.props;
        this.props.apartmentCreate({ title, imageUrl, cost: cost || 300 });
    }
    render() {
        return(
            <View>
                <ApartmentForm {...this.props} />
                <Button title="Create" text="create" onPress={ this.onButtonPress.bind(this) } />
            </View>
        );
    }
}

const mapStateToProps = (state) => {
    const { title, imageUrl, cost } = state.apartmentForm;
    return { title, imageUrl, cost };
};

export default connect(mapStateToProps, { apartmentUpdate, apartmentCreate })(CreateApartment);
import React, {Component} from 'react';
import {Text, View, StyleSheet, FlatList, TouchableHighlight, Image} from "react-native";
import {connect} from "react-redux";
import {Actions} from "react-native-router-flux";
import { Card, ListItem, Button } from 'react-native-elements';

class ViewApartments extends Component {

    _keyExtractor = (item, index) => item.id;

    _onSelectItem = (item) => {
        console.log(item);
        console.log("Clicked");
        Actions.apartmentDetail({apartment: item});
    };

    _renderApartmentItem = ({item}) => {
        console.log(item.img);
        return (
            <Card
                title={item.id}
                image={item.img}>
                <Text style={{marginBottom: 10}}>
                    {item.title}
                </Text>
                <Button
                    icon={{name: 'code'}}
                    backgroundColor='#03A9F4'
                    onPress={()=>this._onSelectItem(item)}
                    buttonStyle={{borderRadius: 0, marginLeft: 0, marginRight: 0, marginBottom: 0}}
                    title='Edit' />
            </Card>
        )
    };

    render() {
        console.log("ViewApartments");
        console.log("Props: ", this.props);
        return (
            <View style={styles.mainView}>
                <Text> View Apartments scene </Text>
                <FlatList
                    data={this.props.apartments}
                    keyExtractor={this._keyExtractor}
                    renderItem={this._renderApartmentItem}
                />

            </View>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        apartments: state.apartments
    }
};

const styles = StyleSheet.create({
    mainView: {
        flex: 1,
    },
});

export default connect(
    mapStateToProps,
    {}
)(ViewApartments);
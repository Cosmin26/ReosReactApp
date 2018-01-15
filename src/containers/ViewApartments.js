import React, {Component} from 'react';
import {Text, View, StyleSheet, FlatList, TouchableHighlight, Image} from "react-native";
import {connect} from "react-redux";
import {Actions} from "react-native-router-flux";
import { Card, ListItem, Button } from 'react-native-elements';
import {apartmentsFetch, apartmentsFetchAllUsers} from "../actions";
import * as _ from 'lodash';

class ViewApartments extends Component {

    _keyExtractor = (item, index) => item.id;

    _onSelectItem = (item) => {
        // console.log(item);
        // console.log("Clicked");
        if(!this.props.isAdmin) {
            Actions.apartmentDetail({apartment: item});
        }
    };

    componentWillMount() {
        if(this.props.isAdmin){
            console.log("mumu");
            this.props.apartmentsFetchAllUsers();
        }else {
            this.props.apartmentsFetch();
        }// this.createDataSource(this.props);
    }
    //
    // componentWillReceiveProps(nextProps) {
    //     this.createDataSource(nextProps);
    // }
    //
    // createDataSource({ apartments }) {
    //     const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    //     this.dataSource = ds.cloneWithRows(this.props.apartments);
    // }

    _renderApartmentItem = ({item}) => {
        return (
            <Card
                title={item.title}
                image={{uri: item.imageUrl}}>
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

// const mapStateToProps = (state) => {
//     return {
//         apartments: state.apartments
//     }
// };

const mapStateToProps = (state) => {
    const apartments = _.map(state.apartmentData, (val, uid) => {
        return {
            ...val,
            uid
        }
    });
    return { apartments };
};

const styles = StyleSheet.create({
    mainView: {
        flex: 1,
    },
});

export default connect(
    mapStateToProps,
    {apartmentsFetch,
        apartmentsFetchAllUsers}
)(ViewApartments);
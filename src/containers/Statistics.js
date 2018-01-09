import React, {Component} from 'react';
import {View, AsyncStorage, Text, StyleSheet} from 'react-native';
import {Pie} from 'react-native-pathjs-charts'
import * as _ from "lodash";
import {connect} from "react-redux";
import {apartmentsFetch} from "../actions/apartments";
import {Actions} from 'react-native-router-flux';
// import {Svg, Circle, Rect} from 'react-native-svg';

class Statistics extends Component {
    constructor(props) {
        super(props);
        this.state = {
            apartments: [],
            filtered: []
        }
    }

    componentDidMount() {
        this.fetchApartments()
    }

    fetchApartments() {
        // let apartments = await AsyncStorage.getItem("apartments");
        // apartments = JSON.parse(apartments);
        let apartments = this.props.apartments;
        console.log(apartments);
        if (apartments === null) {
            apartments = [];
        }

        let filtered = this.filterByCost(apartments);
        console.log("Filtered: ", filtered);

        this.setState({
            apartments: apartments,
            filtered: filtered
        });
    }

    filterByCost(apartments) {
        console.log("Apartments: ", apartments);
        let dict = {};
        let result = [];
        for (let i = 0; i < apartments.length; i++) {
            let cost = apartments[i].cost;
            if (dict[cost] === undefined) {
                dict[cost] = 1;
            } else {
                dict[cost]++;
            }
        }

        dict = Object.keys(dict).map((key, index) => {
            result.push({
                "cost": key,
                "count": dict[key]
            })
        });

        return result;
    }

    render() {
        let data = this.state.filtered;

        let options = {
            margin: {
                top: 20,
                left: 20,
                right: 20,
                bottom: 20
            },
            width: 350,
            height: 350,
            color: '#2980B9',
            r: 50,
            R: 150,
            legendPosition: 'topLeft',
            animate: {
                type: 'oneByOne',
                duration: 200,
                fillTransition: 3
            },
            label: {
                fontFamily: 'Arial',
                fontSize: 14,
                fontWeight: true,
                color: '#ECF0F1'
            }
        };

        return (
            <View style={styles.mainStatistics}>
                <Text style={styles.title}> How many apartments are there for each price</Text>
                <Pie
                    data={data}
                    options={options}
                    accessorKey="count"/>
            </View>
        )
    }
}

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
    mainStatistics: {
        flex: 1,
        alignItems: 'center'
    },
    title: {
        fontSize: 16
    }
});

export default connect(
    mapStateToProps,
    {apartmentsFetch}
)(Statistics);
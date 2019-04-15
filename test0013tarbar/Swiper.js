import React from "react";
import { View, Text, Button, StatusBar, AsyncStorage, StyleSheet} from "react-native";
import Swiper from 'react-native-swiper';


export default class HomeScreen extends React.Component {
    static navigationOptions = {
        tabBarVisible: false, // 隐藏底部导航栏
        header:null,  //隐藏顶部导航栏
    };
    render() {
        return (
            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                <Swiper style={styles.wrapper} showsButtons={false} loop={false}>
                    <View style={styles.slide1}>
                        <Text style={styles.text}>Hello Swiper</Text>
                    </View>
                    <View style={styles.slide2}>
                        <Text style={styles.text}>Beautiful</Text>
                    </View>
                    <View style={styles.slide3}>
                        <Button title='开始' onPress={() => {this.props.navigation.navigate('app')}}/>
                        <Text style={styles.text}>And simple</Text>
                    </View>
                </Swiper>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    wrapper: {
    },
    slide1: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#9DD6EB'
    },
    slide2: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#97CAE5'
    },
    slide3: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#92BBD9'
    },
    text: {
        color: '#fff',
        fontSize: 30,
        fontWeight: 'bold'
    }
});

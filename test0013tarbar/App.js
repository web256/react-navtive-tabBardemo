import React from "react";
import { View, Text, Button, StatusBar, AsyncStorage, StyleSheet, TouchableWithoutFeedback, TouchableHighlight, TouchableOpacity} from "react-native";
import Ionicons from 'react-native-vector-icons/Ionicons';
import Swiper from './Swiper'
import Icon from './Icon'


import { createStackNavigator, createAppContainer, createBottomTabNavigator, createSwitchNavigator } from "react-navigation";
import posed from 'react-native-pose';


// 定义点击缩放
const Scaler = posed.View({
    active: { scale: 1 },
    inactive: { scale: 0.9 }
});



class HomeScreen extends React.Component {
    // 导航栏颜色
    static navigationOptions = ({navigation}) => {
        return {
            headerLeft: (
                <Button
                    onPress={() => navigation.navigate('MyModal')}
                    title="Model"
                    color="#fff"
                />
            ),
            title:'Home',
            headerRight: (
                <Button
                    onPress={() => navigation.navigate('Details')}
                    title="Info"
                    color="#fff"
                />
            )
        }
    };

    render() {
        return (
            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                <Text>Home Screen</Text>
                <Button
                    title="Go to Details"
                    onPress={() => this.props.navigation.navigate('Details')}
                />
            </View>
        );
    }
}

class DetailsScreen extends React.Component {
    /**
     * 固定写法
     * @param navigation
     * @returns {{title: NonNullable<P["otherParam"]> | P["otherParam"]}}
     */
    static navigationOptions = ({ navigation }) => {
        return {
            title: navigation.getParam('otherParam', 'A Nested Details Screen'),
            //
            headerStyle: {
                backgroundColor: '#FFCF0C',
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
                fontWeight: 'bold',
            },
            headerRight: (
                <Button
                    // 注意这写法，这里本身就是一个函数了，不需要再写函数。
                    // 不是这种写法 onPress={() => this.props.navigation.navigate('Home')}
                    onPress={navigation.getParam('increaseCount')}
                    title="+1"
                    color="#fff"
                />
            ),
        };
    };

    state = {
        count: 1
    };

    componentDidMount(): void {
        this.props.navigation.setParams({increaseCount:this._increaseCount });

    };

    _increaseCount = () => {
        this.setState({count:this.state.count + 1});
    }

    render() {
        return (
            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                <Text>Details Screen {this.state.count}</Text>
                <Button
                    title="Go to Details... again"
                    onPress={() => this.props.navigation.navigate('Home')}
                />
                <Button
                    title="Update the title"
                    onPress={() => this.props.navigation.setParams({otherParam: 'Updated!'})}
                />
            </View>
        );
    }
}


class ProfileScreen extends React.Component {
    static navigationOptions = {
        headerVisible: false,
    }
    render() {
        return (
            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                <Text>ProfileScreen</Text>
                <Button
                    title="Go to User... again"
                    onPress={() => this.props.navigation.navigate('User')}
                />
            </View>
        );
    }
}
class UserScreen extends React.Component {
    render() {
        return (
            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                <Text>UserScreen</Text>
                <Button
                    title="Go to Profile... again"
                    onPress={() => this.props.navigation.navigate('Profile')}
                />
            </View>
        );
    }
}


const MainStack = createStackNavigator({
    Home: HomeScreen,
    Details:DetailsScreen
},{
    initialRouteName: 'Home',
    defaultNavigationOptions:{
        title:'home',
        //
        headerStyle: {
            backgroundColor: '#000000',
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
            fontWeight: 'bold',
        },
    }
});


const RootStack = createStackNavigator({
    Main: MainStack,
    MyModal:UserScreen
},{
    mode: 'modal',
    headerMode: 'none',
});

const ProfileStack = createStackNavigator({
    Profile: ProfileScreen,
}, {
    headerMode: 'screen'
});





const TabBar = props => {
    const {
        renderIcon,
        getLabelText,
        activeTintColor,
        inactiveTintColor,
        onTabPress,
        onTabLongPress,
        getAccessibilityLabel,
        navigation
    } = props

    const { routes, index: activeRouteIndex } = navigation.state
    return (
        <Scaler style={Styles.container}>
            {routes.map((route, routeIndex) => {
                const isRouteActive = routeIndex === activeRouteIndex
                const tintColor = isRouteActive ? activeTintColor : inactiveTintColor
                return (
                    <TouchableWithoutFeedback
                        key={routeIndex}
                        style={Styles.tabButton}
                        onPress={() => {
                            onTabPress({ route })
                        }}
                        onLongPress={() => {
                            onTabLongPress({ route })
                        }}
                        accessibilityLabel={getAccessibilityLabel({ route })}
                    >
                        {route.key == 'three' ? ( // 对特殊图标进行特殊处理
                            <Scaler
                                style={Styles.scalerOnline}
                                pose={isRouteActive ? 'active' : 'inactive'}
                            >
                                {renderIcon({ route, focused: isRouteActive, tintColor })}
                                <Text style={Styles.iconText}>{getLabelText({route})}</Text>
                            </Scaler>
                        ) : ( // 普通图标普通处理
                            <Scaler
                                style={Styles.scaler}
                                pose={isRouteActive ? 'active' : 'inactive'}
                            >
                                {renderIcon({ route, focused: isRouteActive, tintColor })}
                                <Text style={Styles.iconText}>{getLabelText({route})}</Text>
                            </Scaler>
                        )}
                    </TouchableWithoutFeedback>
                )
            })}
        </Scaler>
    )
}


const Styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        height: 53,
        borderWidth: 1,
        borderRadius: 1,
        shadowOffset: { width: 5, height: 10 },
        shadowOpacity: 0.75,
        elevation: 1,
        borderColor: '#EEEEEE',

    },
    tabButton: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    spotLight: {
        flex:5,
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center'
    },
    spotLightInner: {
        height: 48,
        borderRadius: 24,
        backgroundColor: '#ee0000',

    },
    scaler: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    scalerOnline: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'flex-end',
    },
    iconText: {
        fontSize: 12,
        lineHeight: 20
    }
})


const root = createBottomTabNavigator(
    {
        // 首页:
        one: {
            screen: RootStack,
            navigationOptions: () => {
                return {
                    tabBarIcon: ({ tintColor }) => {
                        var soureImge
                        if (tintColor == '#CBCBCB') {
                            soureImge = 'main'
                        } else {
                            soureImge = 'mainActive'
                        }
                        return <Icon name={soureImge} size={26} color={tintColor} />
                    }
                }
            }
        },
        //分类:
        two: {
            screen: ProfileStack,
            navigationOptions: {
                tabBarIcon: ({ tintColor }) => {
                    var soureImge
                    if (tintColor == '#CBCBCB') {
                        soureImge = 'Category'
                    } else {
                        soureImge = 'CategoryActive'
                    }
                    return <Icon name={soureImge} size={26} color={tintColor} />
                }
            }
        },
        //问诊:
        three: {
            screen: RootStack,
            navigationOptions: {
                tabBarIcon: ({ tintColor }) => {
                    var soureImge
                    if (tintColor == '#CBCBCB') {
                        soureImge = 'onLine'
                    } else {
                        soureImge = 'onLineActive'
                    }
                    return <Icon name={soureImge} size={48} color={tintColor} />
                }
            }
        },
        // 购物篮:
        four: {
            screen: ProfileStack,
            navigationOptions: {
                tabBarIcon: ({ tintColor }) => {
                    var soureImge
                    if (tintColor == '#CBCBCB') {
                        soureImge = 'OrderList'
                    } else {
                        soureImge = 'OrderListActive'
                    }
                    return <Icon name={soureImge} size={26} color={tintColor} />
                }
            }
        },
        //我的:
        five: {
            screen: RootStack,
            navigationOptions: () => {
                return {
                    tabBarIcon: ({ tintColor }) => {
                        var soureImge
                        if (tintColor == '#CBCBCB') {
                            soureImge = 'My'
                        } else {
                            soureImge = 'MyActive'
                        }
                        return <Icon name={soureImge} size={26} color={tintColor} />
                    }
                }
            }
        }
    },
    {
        initialRouteName: 'one', // 初始化页面
        tabBarComponent: TabBar,
        tabBarOptions: {
            activeTintColor: '#F34C56',
            inactiveTintColor: '#CBCBCB'
        }
    }
)

export default createAppContainer(root);
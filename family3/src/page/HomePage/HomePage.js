import React, {Component} from 'react';
import{ View, Text, StyleSheet, Button, StatusBar} from 'react-native';
import DrawerIcon from 'react-native-vector-icons/FontAwesome';
import { GoogleSignin } from 'react-native-google-signin';
import { Header, Left, Right, Button as ButtonBase , Body, Title } from 'native-base'
import { Color } from '../../assets/Assets';
import AwesomeHierarchyGraph from 'react-native-d3-tree-graph'

var root = {
    name: "",
    id: 1,
    hidden: true,
    children: [ {
            name: "Q",
            id: 16,
            no_parent: true,
            imageUrl: { href: { uri: "https://facebook.github.io/react-native/docs/assets/favicon.png"}},
            nodeImageStyle: { imageHeight: 60 , imageWidth: 60, opacity: 1 },
            nodeTextStyle: { fontSize: 12 }
        },
        {
        name: "",
        id: 2,
        no_parent: true,
        hidden: true,
        children: [{
            name: "J",
            id: 12,
            imageUrl: { href: { uri: "https://facebook.github.io/react-native/docs/assets/favicon.png"}},
            nodeImageStyle: { imageHeight: 60 , imageWidth: 60, opacity: 1 },
            nodeTextStyle: { fontSize: 12 }
        }, {
            name: "L",
            id: 13,
            no_parent: true,
            imageUrl: { href: { uri: "https://facebook.github.io/react-native/docs/assets/favicon.png"}},
            nodeImageStyle: { imageHeight: 60 , imageWidth: 60, opacity: 1 },
            nodeTextStyle: { fontSize: 12 }
        }, {
            name: "C",
            id: 3,
            imageUrl: { href: { uri: "https://facebook.github.io/react-native/docs/assets/favicon.png"}},
            nodeImageStyle: { imageHeight: 60 , imageWidth: 60, opacity: 1 },
            nodeTextStyle: { fontSize: 12 }
        }, {
            name: "",
            id: 4,
            hidden: true,
            no_parent: true,
            children: [{
                name: "D",
                id: 5,
                imageUrl: { href: { uri: "https://facebook.github.io/react-native/docs/assets/favicon.png"}},
                nodeImageStyle: { imageHeight: 60 , imageWidth: 60, opacity: 1 },
                nodeTextStyle: { fontSize: 12 }
            }, {
                name: "",
                id: 14,
                hidden: true,
                no_parent: true,
                children: [{
                    name: "P",
                    id: 15,
                    imageUrl: { href: { uri: "https://facebook.github.io/react-native/docs/assets/favicon.png"}},
                    nodeImageStyle: { imageHeight: 60 , imageWidth: 60, opacity: 1 },
                    nodeTextStyle: { fontSize: 12 }
                }]
            }, {
                name: "E",
                id: 6,
                imageUrl: { href: { uri: "https://facebook.github.io/react-native/docs/assets/favicon.png"}},
                nodeImageStyle: { imageHeight: 60 , imageWidth: 60, opacity: 1 },
                nodeTextStyle: { fontSize: 12 }
            }]
        }, {
            name: "K",
            id: 11,
            imageUrl: { href: { uri: "https://facebook.github.io/react-native/docs/assets/favicon.png"}},
            nodeImageStyle: { imageHeight: 60 , imageWidth: 60, opacity: 1 },
            nodeTextStyle: { fontSize: 12 }
        }, {
            name: "G",
            id: 7,
            imageUrl: { href: { uri: "https://facebook.github.io/react-native/docs/assets/favicon.png"}},
            nodeImageStyle: { imageHeight: 60 , imageWidth: 60, opacity: 1 },
            nodeTextStyle: { fontSize: 12 },
            children: [{
                name: "H",
                id: 8,
                imageUrl: { href: { uri: "https://facebook.github.io/react-native/docs/assets/favicon.png"}},
                nodeImageStyle: { imageHeight: 60 , imageWidth: 60, opacity: 1 },
                nodeTextStyle: { fontSize: 12 }
            }, {
                name: "I",
                id: 9,
                imageUrl: { href: { uri: "https://facebook.github.io/react-native/docs/assets/favicon.png"}},
                nodeImageStyle: { imageHeight: 60 , imageWidth: 60, opacity: 1 },
                nodeTextStyle: { fontSize: 12 }
            }]
        }]
    }, {
        name: "M",
        id: 10,
        no_parent: true,
        imageUrl: { href: { uri: "https://facebook.github.io/react-native/docs/assets/favicon.png"}},
        nodeImageStyle: { imageHeight: 60 , imageWidth: 60, opacity: 1 },
        nodeTextStyle: { fontSize: 12 },
        children: [

        ]
    },
    {
        name: "anoop",
        id: 155,
        no_parent: true,
        children: [{
            name: "H",
            id: 8,
        }, {
            name: "I",
            id: 9,
        },
        {
            name: "I",
            id: 9,
        },
        {
            name: "I",
            id: 9,
        },
        {
            name: "I",
            id: 9,
        },

      ]
    },
    {
            name: "x",
            id: 16,
            no_parent: true
        }

  ]
}

var siblings = [
  {
    source: {
        id: 3,
        name: "C"
    },
    target: {
        id: 11,
        name: "K"
    }
}, {
    source: {
        id: 12,
        name: "L"
    },
    target: {
        id: 13,
        name: "J"
    }
}, {
    source: {
        id: 5,
        name: "D"
    },
    target: {
        id: 6,
        name: "E"
    }
}, {
    source: {
        id: 16,
        name: "Q"
    },
    target: {
        id: 10,
        name: "M"
    }
}
];
 //what?
 //

export class FamilyTree extends Component {
  render() {
    return (
        <View style={styles.container}>
        <AwesomeHierarchyGraph
         root = {root}
         siblings = {siblings}
        />
       </View>
    );
  }}


export default class HomeScreen extends Component {
    static navigationOptions = {
        // drawerIcon: () => {
        //     <DrawerIcon name="home" size={20} color= {Color.SECONDARY}/>
        // }
    }
    constructor(props){
        super(props);
        this.state = {
            userData: {
                user: {
                    name: 'a'
                }
            }
        }
    }
    async componentDidMount(){
        const userData = await GoogleSignin.getCurrentUser()
        this.setState({ userData })
    }

    render(){
        return(
            <View style={styles.MainContainer}>
                <Header style = {styles.headerContainer}>
                    <StatusBar
                        backgroundColor={Color.STATUS_BAR}
                        barStyle="dark-content"
                    />
                    <Left>
                        <ButtonBase
                            transparent
                            onPress={() => this.props.navigation.openDrawer()}
                            >
                            <DrawerIcon name="navicon" size={20} color= {Color.SECONDARY}/>
                        </ButtonBase>
                    </Left>
                    <Body>
                        <Title style = {{color:Color.SECONDARY}}>Home</Title>
                    </Body>
                    <Right />
                </Header>
                <View style = {styles.contentContainer}>
                    <Text style = {styles.Text}>Welcome {this.state.userData.user.givenName}!</Text>
                    <Text style = {styles.Text}>This is the home screen</Text>
                </View>
                <FamilyTree/>
                <View style = {styles.bottomView}>
                </View>

            </View>
        )
    }
}


const styles = StyleSheet.create({

    MainContainer: {
		flex: 1,
        backgroundColor: Color.PRIMARY
    },

    contentContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },

    headerContainer: {
        alignItems: 'flex-start',
        backgroundColor: Color.PRIMARY
    },

    bottomView:{
		width: '100%',
		height: 50,
		backgroundColor: Color.PRIMARY,
		justifyContent: 'center',
		alignItems: 'center',
		position: 'absolute',
		bottom: 0
    },

    Text: {
        color: Color.SECONDARY,
    },
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#F5FCFF',
    },
    welcome: {
      fontSize: 20,
      textAlign: 'center',
      margin: 10,
    },
    instructions: {
      textAlign: 'center',
      color: '#333333',
      marginBottom: 5,
    },

});

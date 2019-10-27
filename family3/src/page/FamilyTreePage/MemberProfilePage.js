import React, {Component} from 'react'
import{ View, Text, StyleSheet, Button, StatusBar,ScrollView, RefreshControl, Dimensions} from 'react-native';
import { Header, Left, Right, Button as ButtonBase , Body, Title } from 'native-base'
import { Card, ListItem, ButtonCard, IconCard } from 'react-native-elements'
import Icon from 'react-native-vector-icons/FontAwesome';
import Spinner from 'react-native-loading-spinner-overlay';


import { Color } from '../../assets/Assets.js'
const IMAGE_WIDTH = Dimensions.get('window').width
export default class MemberProfilePage extends Component {
    constructor(){
        super();
        this.state = {

            loaded: false,
            isLoading: false,

            refreshing: false,
        }
    }

    async refresh(){
        this.setState({
            loaded: false,
            isLoading: true,

        })

        this.componentDidMount()
        setTimeout(() => {
            this.setState({refreshing: false})
        }, 2000)
    }


    render() {
        // Fix Here. getParam should only have one parameter.
    //   const node = this.props.navigation.getParam('node','nothing sent');
      const node = this.props.navigation.getParam('node','nothing sent');
      const {  isLoading , refreshing } = this.state;
      // Show spinner while loading albums
      if (isLoading){
          return (
              <View style = {styles.MainContainer}>
                  <Spinner visible={isLoading} />
              </View>
          )
      }
      console.log('recieved node', node);

        return (
            <View style={styles.MainContainer}>
                <Header style = {styles.headerContainer}>
                    <StatusBar
                        backgroundColor={Color.STATUS_BAR}
                        barStyle="light-content"
                    />
                    <Left>
                      <ButtonBase
                        transparent
                        onPress={() => this.props.navigation.goBack()}
                        >
                        <Icon name="angle-left" size={20} color= {Color.PRIMARY}/>
                      </ButtonBase>
                    </Left>
                    <Body>
                        <Title style = {{color:Color.PRIMARY}}>{node.name }</Title>
                    </Body>
                    <Right />
                </Header>
                <View style = {styles.contentContainer}>
                <ScrollView
                refreshControl={
                    <RefreshControl refreshing={refreshing} onRefresh={() => this.refresh()} />
                }>
                  <View>
                    <ProfileCard node= {node} />
                  </View>
                </ScrollView>
                </View>

            </View>
        )
    }
}
// takes a node, and then maybe a random image and displays the node and image along side it
class ProfileCard extends Component{
  constructor(props){
    super(props);
    this.state = {name:'Frarthur'};
  }
  render(){
    const node = this.props.node

    // if no image is recieved
    return(
    <View>
      <Card style = {styles.card} title =  {node.name}>
        <Text>Gender: {node.data.gender} </Text>
        <Text>DOB: {node.data.DOB.substring(0,10)} </Text>
      </Card>

    </View>);
  }
}

const styles = StyleSheet.create({

    MainContainer: {
		flex: 1,
        backgroundColor: Color.PRIMARY
    },

    contentContainer: {
        alignItems: 'center',
        justifyContent: 'center'
    },

    headerContainer: {
        alignItems: 'flex-start',
        backgroundColor: Color.PRIMARY
    },
    card: {
        backgroundColor:Color.PRIMARY,
        flex:1,
        marginLeft: '5%',
        width: '90%',
        borderRadius: 10
    },

    cardImage: {
        width: IMAGE_WIDTH * 0.90,
        height: 300,
        resizeMode: 'cover',
    },

    cardText:{
        alignSelf: 'center',
        marginTop: 10,
        marginLeft: -10,
        fontSize:15,
        color: Color.SECONDARY,
    }
})

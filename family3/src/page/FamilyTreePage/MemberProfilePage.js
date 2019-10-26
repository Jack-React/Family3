import React, {Component} from 'react'
import{ View, Text, StyleSheet, Button, StatusBar,ScrollView, RefreshControl} from 'react-native';
import { Header, Left, Right, Button as ButtonBase , Body, Title } from 'native-base'
import Icon from 'react-native-vector-icons/FontAwesome';
import Spinner from 'react-native-loading-spinner-overlay';


import { Color } from '../../assets/Assets.js'

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
                    <Text style = {{color: Color.SECONDARY}}>
                        {node.name } first a card with their info, ie profile photo? or just the first photo that pops up and dob and emails
                        then it has tiles of photos tagged witht their fname last name or fullname
                    </Text>
                </ScrollView>
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
        alignItems: 'center',
        justifyContent: 'center'
    },

    headerContainer: {
        alignItems: 'flex-start',
        backgroundColor: Color.PRIMARY
    },
})

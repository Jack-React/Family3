import React, {Component} from 'react'
import{ View, Text, StyleSheet, StatusBar, Image, TextInput, TouchableHighlight, TouchableOpacity, FlatList, ScrollView} from 'react-native';
import { Left, Button, Header, Right , Body, Title } from 'native-base'
import Icon from 'react-native-vector-icons/FontAwesome';
import GoogleAPIHandler from '../../api/GoogleAPIHandler'
import DBHandler from '../../api/DBHandler'
import { SearchBar, Divider } from 'react-native-elements';


import { Color } from '../../assets/Assets'
import AddMemberDialog from './component/AddMemberDialog'
import MemberAddedDialog from './component/MemberAddedDialog'

export default class ProfilePage extends Component {
    constructor(props){
        super(props);
        this.state = {
            search: "",
            users: null,
            showDialog: false,
            searchedUsers: [],
            selectedUser: null,
            memberAddedDialog: false
        }; 
        this.GoogleAPIHandler = new GoogleAPIHandler()
        this.DBHandler = new DBHandler()
    }
    
    async componentDidMount(){
        this.DBHandler.getAllUsers()
        .then((users) => {
            this.setState({users: users.data})})
    }

    render() {
        const { searchedUsers, search } = this.state
        return (
            <View style={styles.MainContainer}>
                <Header style = {styles.headerContainer}>
                    <StatusBar
                        backgroundColor={Color.STATUS_BAR}
                        barStyle="light-content"
                    />
                    <Left>
						<Button
							transparent
							onPress={() => this.props.navigation.goBack()}
							>
							<Icon name="angle-left" size={20} color= {Color.PRIMARY}/>
						</Button>
					</Left>
                    <Body>
                        <Title style = {{paddingLeft: 20, color:Color.PRIMARY}}>Add Member</Title>       
                    </Body>
                    <Right />
                </Header>
                <AddMemberDialog
                    visible={this.state.showDialog}
                    disableDialog={this.disableDialog.bind(this)}
                    approvalRecieved={this.approvalRecieved.bind(this)}
                />
                 <MemberAddedDialog
                    visible={this.state.memberAddedDialog}
                    disableDialog={this.disableDialog.bind(this)}
                />

                <View>
                    <View style = {{width: '100%', borderColor: 'black', padding:5, marginBottom: 10, marginTop:10}}>
                        <SearchBar
                            platform= 'android'
                            placeholder="Enter a name"
                            containerStyle = {{borderRadius: 10, elevation: 5, height: 50 }}
                            inputContainerStyle = {{paddingBottom:5}}
                            inputStyle={{fontSize: 14, marginLeft:2, paddingTop:5 }}
                            leftIconContainerStyle = {{ paddingBottom: 5 }}
                            rightIconContainerStyle = {{ paddingBottom: 5 }}
                            onChangeText= {(search) => this.updateSearch(search)}
                            value={search}
                        />
                    </View>
                </View>
                <ScrollView>
                    <FlatList
                        data = {searchedUsers}
                        renderItem = {({item, index}) => {
                            return(
                                <TouchableOpacity
                                activeOpacity= {0.5}
                                underlayColor= {Color.GREY}
                                style  = {styles.touchableButton}
                                onPress={() => {this.setState({showDialog: true, selectedUser: item})}}>
                                    <Text style = {{paddingLeft: 20}}>{`${item.firstName} ${item.lastName}`}</Text>
                                </TouchableOpacity>
                            )
                        }}
                        keyExtractor={item => item._id} 
                    />
                </ScrollView>
            </View>
        )
    }

    // Disables the dialog
    disableDialog(){
        this.setState({
            showDialog: false,
            AddMemberDialog: false,
            memberAddedDialog: false
        })
    }
    // recieve confirmation
    approvalRecieved(){
        this.addToFamily()
    }

    // Sends an invitation to target user to join the family
    async addToFamily(){
        await this.DBHandler.sendFamilyInvitation(this.state.selectedUser._id)
        this.setState({search: "", searchedUsers: [], memberAddedDialog: true})
    }
    // Update the searched images
    updateSearch(search){
        searchedUsers = [];
        if (search.length < 2){
            this.setState({search: search, searchedUsers: []})
            return
        }
            
        for (i = 0; i < this.state.users.length; i ++){
            // Checks if description includes search text
            if (this.state.users[i].firstName.toLowerCase().includes(search.toLowerCase())){
                searchedUsers.push(this.state.users[i])
                continue
            }
            if (this.state.users[i].lastName.toLowerCase().includes(search.toLowerCase())){
                searchedUsers.push(this.state.users[i])
            }
        }
        this.setState({search: search, searchedUsers: searchedUsers})
    }
}

const styles = StyleSheet.create({

    MainContainer: {
		flex: 1,
        backgroundColor: Color.PRIMARY
    },

    contentContainer: {
        marginTop: 10
        // flex: 1,
        // alignItems: 'center',
        // justifyContent: 'center'
    },

    headerContainer: {
        alignItems: 'flex-start',
        backgroundColor: Color.SECONDARY
    },

    avatarContainer: {
        paddingTop: 40,
        backgroundColor: Color.SECONDARY,
        alignItems: 'center'
    },

    buttonContainer: {
        flex: 1,
        position: 'relative',
        top: 80,
        left: 200,
        paddingLeft: 100
     },

    profileInfo: {
        backgroundColor: '#5199ad',
        borderWidth: 1, 
        borderRadius: 10,
        borderColor: '#5199ad',
        width: '60%',
        padding: 5,
        alignItems: 'stretch'
    },
    touchableButton: {
        // alignItems: 'flex-start',
        marginTop: 1,
        flexDirection: 'row',
        width: '100%',
        height: 60,
        padding: 20,
        backgroundColor: Color.PRIMARY,
        elevation: 5
    },
        
})


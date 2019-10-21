import React, { Component } from 'react'
import Dialog, { DialogContent, DialogTitle, DialogFooter, DialogButton} from 'react-native-popup-dialog';
import { Text, StyleSheet } from 'react-native'

import { Color } from '../../../assets/Assets'
import DBHandler from '../../../api/DBHandler'

export default class InvitationDialog extends Component {
    constructor() {
        super()
        this.DBHandler = DBHandler.getInstance()
        this.state = {
            familyData: null
        }
    }
    async componentDidMount(){
        const familyData = await this.DBHandler.getFamilies(this.props.invitation)
        this.setState({familyData: familyData.data})
        // console.log(familyData)
    }

    render(){
        if (this.state.familyData == null){
            return null
        }
        return (
            <Dialog
            visible={this.props.visible}
            dialogTitle={<DialogTitle 
                        title={"Family Invitation"}
                        hasTitleBar= {false}
                        style={styles.DialogTitleStyle}
                        textStyle= {styles.DialogTitleTextStyle}/>}
            dialogStyle = {styles.DialogStyle}
            onTouchOutside={() => { 
                this.props.disableDialog()
            }}
            >
                <DialogContent>
                    <Text>
                        Would you like to join {this.state.familyData.name} family? 
                    </Text>
                </DialogContent>
                <DialogFooter>
                    <DialogButton
                    text="Decline"
                    textStyle = {{color: Color.SECONDARY}}
                    onPress={() => {this.onDeclineButtonPressed()}}
                    />
                    <DialogButton
                    textStyle = {{color: Color.SECONDARY}}
                    text="Accept"
                    onPress={() => {this.onAcceptButtonPressed()}}
                    />
                </DialogFooter>
            </Dialog>
        )
    }

    // Return data to parent component
    onAcceptButtonPressed(){
        this.props.disableDialog();
        this.props.invitationApprovalRecieved(true);
    }

    onDeclineButtonPressed(){
        this.props.disableDialog();
        this.props.invitationApprovalRecieved(false);
    }
}

const styles = StyleSheet.create({
    DialogStyle: {
        width: '90%',
    },

    DialogTitleStyle: {
        paddingLeft:25, 
        alignItems: 'flex-start'
    },

    DialogTitleTextStyle: {
        fontSize: 20,
        color: Color.SECONDARY
    },

})
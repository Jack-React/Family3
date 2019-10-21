import React, { Component } from 'react'
import Dialog, { DialogContent, DialogTitle, DialogFooter, DialogButton} from 'react-native-popup-dialog';
import { Text, StyleSheet } from 'react-native'

import { Color } from '../../../assets/Assets'

export default class MemberAddedDialog extends Component {
    render(){
        return (
            <Dialog
            visible={this.props.visible}
            dialogTitle={<DialogTitle 
                        title={"Add Member"}
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
                        Invitation  Sent Successfully
                    </Text>
                </DialogContent>
                <DialogFooter>
                    <DialogButton
                    textStyle = {{color: Color.SECONDARY}}
                    text="Confirm"
                    onPress={() => {this.onButtonPressed()}}
                    />
                </DialogFooter>
            </Dialog>
        )
    }

    // Return data to parent component
    onButtonPressed(){
        this.props.disableDialog();
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
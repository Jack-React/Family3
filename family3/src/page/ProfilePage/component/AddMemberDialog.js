import React, { Component } from 'react'
import Dialog, { DialogContent, DialogTitle, DialogFooter, DialogButton} from 'react-native-popup-dialog';
import { Text, StyleSheet } from 'react-native'

import { Color } from '../../../assets/Assets'

export default class AddMemberDialog extends Component {
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
                        Are you sure you want to add this person into your family? He/ She will be able to see all your shared photos.
                    </Text>
                </DialogContent>
                <DialogFooter>
                    <DialogButton
                    text="Cancel"
                    textStyle = {{color: Color.SECONDARY}}
                    onPress={() => {this.props.disableDialog()}}
                    />
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
        this.props.approvalRecieved();
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
import React, { Component } from 'react'
import Dialog, { DialogContent, DialogTitle, DialogFooter, DialogButton} from 'react-native-popup-dialog';
import { Text, StyleSheet } from 'react-native'

import { Color } from '../../../assets/Assets'

export default class ShareConfirmationDialog extends Component {
    render(){
        return (
            <Dialog
            visible={this.props.visible}
            dialogTitle={<DialogTitle 
                        title={"Confirmation"}
                        hasTitleBar= {false}
                        style={styles.DialogTitleStyle}
                        textStyle= {styles.DialogTitleTextStyle}/>}
            dialogStyle = {styles.DialogStyle}
            onTouchOutside={() => { 
                this.props.disableDialog()
            }}
            >
                <DialogContent>
                    {this.props.share ? 
                    <Text>
                        Are you sure you want to share this album? All your family members will have access to this album.
                    </Text>
                    :
                    <Text>
                        Are you sure you want to disable sharing of this album? All your family members will not have access to this album.
                    </Text>
                    }
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
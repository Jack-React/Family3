import React, { Component } from "react";
import Dialog, { DialogContent, DialogTitle, DialogFooter, DialogButton} from 'react-native-popup-dialog';
import { View, Text, StyleSheet, TextInput } from 'react-native';
import { CheckBox } from 'react-native-elements'

import { Color } from '../../../assets/Assets'

export default class AddAlbumDialogComponent extends Component{
    constructor(){
        super()
        this.state = {
            albumName: '',
            shareable: false
        }
    }

    render(){
        return (
            <Dialog
            visible={this.props.visible}
            dialogTitle={<DialogTitle 
                        title="Album Name" 
                        hasTitleBar= {false}
                        style={styles.DialogTitleStyle}
                        textStyle= {styles.DialogTitleTextStyle}/>}
            dialogStyle = {styles.DialogStyle}
            onTouchOutside={() => { 
                this.props.disableDialog()
                this.setState({albumName: '', shareable: false})
            }}
            >
                <DialogContent>
                    <TextInput
                        placeholder="Enter Album Name..."
                        underlineColorAndroid= {Color.SECONDARY}
                        onChangeText={text => this.setState({albumName: text})}
                        value={this.state.albumName}
                    />
                    <CheckBox
                    title='Shareable'
                    checked={this.state.shareable}
                    size = {20}
                    containerStyle = {{backgroundColor: 'white', borderColor: 'white', marginLeft: -8}}
                    onPress={() => {this.updateShareable()}}/>
                </DialogContent>
                <DialogFooter>
                    <DialogButton
                    disabled = {this.state.albumName == ''}
                    textStyle={this.state.albumName == ''? styles.DialogButtonDisabledTextStyle: styles.DialogButtonTextStyle}
                    text="Create"
                    onPress={() => {this.onButtonPressed()}}
                    />
                </DialogFooter>
            </Dialog>
        )
    }

    // Change the state of the album to shareable
    updateShareable(){
        if (this.state.shareable){
            this.setState({
                shareable: false
            })
        }
        else {
            this.setState({
                shareable: true
            })
        }
    }

    // Return data to parent component
    onButtonPressed(){
        data = {
            name: this.state.albumName,
            shareable: this.state.shareable
        }
        this.setState({albumName: '', shareable: false})
        this.props.disableDialog();
        this.props.recieveAlbumDetails(data);

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

    DialogButtonTextStyle: {
        fontSize: 20,
        color: Color.SECONDARY
    },

    DialogButtonDisabledTextStyle: {
        fontSize: 20,
    },
})
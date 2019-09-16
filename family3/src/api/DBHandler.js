import APIHandler from '../api/APIHandler'
import { GoogleSignin } from 'react-native-google-signin';

// Helper class to connect to database
export default class DBHandler {
    constructor(){
        this.APIHandler = new APIHandler();
    }

    async hasAccount(){
        userData = await GoogleSignin.getCurrentUser();
        const response = await this.APIHandler.getAccount(userData.user.id);
        return response.data == null?  false: true
    }

    async getAccount(){
        userData = await GoogleSignin.getCurrentUser();
        const response = await this.APIHandler.getAccount(userData.user.id);
        return response.data
    }

    async createAccount(albumUrl){
        userData = await GoogleSignin.getCurrentUser();
        body = {
            firstName: userData.user.givenName,
            lastName: userData.user.familyName,
            _id: userData.user.id,
            email: userData.user.email,
            album: albumUrl
        }
        const response = await this.APIHandler.createAccount(body);
        return response
    }

    async getDBUserData(){
        userData = await GoogleSignin.getCurrentUser();
        const response = await this.APIHandler.getAccount(userData.user.id);
        return response.data
    }
}
import APIHandler from '../api/APIHandler'
import { GoogleSignin } from 'react-native-google-signin';



export default class DBHandler {
    constructor(){
        this.APIHandler = new APIHandler();
    }

    async hasAccount(){
        userData = await GoogleSignin.getCurrentUser();
        const response = await this.APIHandler.getAccount(userData.idToken);
        return response.data == null?  false: true
    }

    async createAccount(albumUrl){
        userData = await GoogleSignin.getCurrentUser();
        body = {
            firstName: userData.user.givenName,
            lastName: userData.user.familyName,
            _id: userData.idToken,
            email: userData.user.email,
            album: albumUrl
        }
        return await this.APIHandler.createAccount(body);
    }

    async getDBUserData(){
        userData = await GoogleSignin.getCurrentUser();
        const response = await this.APIHandler.getAccount(userData.idToken);
        return response.data
    }
}
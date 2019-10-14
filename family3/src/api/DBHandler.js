import APIHandler from '../api/APIHandler'
import { GoogleSignin } from 'react-native-google-signin';

/* Helper class to connect to database */
export default class DBHandler {
    static instance = null

    static getInstance() {
        if (DBHandler.instance == null) {
            DBHandler.instance = new DBHandler();
        }
        return this.instance;
    }

    constructor(){
        this.APIHandler = APIHandler.getInstance();
    }

    /* This function checks if the current google account also has an account with us in the database */
    async hasAccount(){
        userData = await GoogleSignin.getCurrentUser();
        const response = await this.APIHandler.getAccount(userData.user.id);
        return response.data == null?  false: true
    }

    /* This function creates an account on the database */
    async createAccount(details){
        userData = await GoogleSignin.getCurrentUser();
        console.log(details)
        body = {
            firstName: userData.user.givenName,
            lastName: userData.user.familyName,
            _id: userData.user.id,
            email: userData.user.email,
            gender: details.gender,
            DOB: details.dob
        }
        const response = await this.APIHandler.createAccount(body);
        return response
    }

    /* This function returns the details of the account from database */
    async getDBUserData(){
        userData = await GoogleSignin.getCurrentUser();
        const response = await this.APIHandler.getAccount(userData.user.id);
        return response.data
    }
}
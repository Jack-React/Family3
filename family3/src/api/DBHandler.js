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
        body = {
            firstName: userData.user.givenName,
            lastName: userData.user.familyName,
            _id: userData.user.id,
            email: userData.user.email,
            album: details.albumID,
            gender: details.gender,
            dob: details.dob
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

    /* Gets all relationship info of a user */
    // ! Go to getFamilyMembers()
    // async getRelationInfo(userid){
    //     return await this.APIHandler.getRelationInfo(userid)
    // }

    /* Gets all relationships of a user */
    async getRelation(familyid){
        return await this.APIHandler.getRelation(familyid)
    }
    
    /* Adds a shared album to the family */
    async addSharedAlbum(familyid, albumName){
        body = {
            sharedAlbums: albumName
        }
        return await this.APIHandler.addSharedAlbum(familyid, body)
    }

    /* deletes a shared album to the family */
    async deleteSharedAlbum(familyid, albumName){
        var sharedAlbums = (await this.APIHandler.getFamilies(familyid)).data.sharedAlbums
        var albumid = this.getSharedeAlbumId(sharedAlbums, albumName)
        return await this.APIHandler.deleteSharedAlbum(familyid, albumid)
    }
    
    /* Convert an album name to id where databse recognize */
    getSharedeAlbumId(sharedAlbums, albumName){
        for (i = 0; i < sharedAlbums.length; i ++){
            if (sharedAlbums[i].Album == albumName){
                return sharedAlbums[i]._id
            }
        }
    }

    /* add a person into a family */
    async addFamily(familyid){
        return await this.APIHandler.addFamily(familyid)
    }   

    /* gets members of a family */
    async getFamilyMembers(familyid){
        return await this.APIHandler.getFamilyMembers(familyid)
    }   

}
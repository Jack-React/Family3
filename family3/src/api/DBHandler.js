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
    async addSharedAlbum(familyid, album){
        body = {
            albumid: album.albumid,
            sharedToken: album.sharedToken 
        }
        return await this.APIHandler.addSharedAlbum(familyid, body)
    }

    /* deletes a shared album to the family */
    async deleteSharedAlbum(familyid, albumid){
        const sharedAlbums = (await this.APIHandler.getFamilies(familyid)).data.sharedAlbums
        const dbalbumid = this.getDbAlbumId(sharedAlbums, albumid)
        return await this.APIHandler.deleteSharedAlbum(familyid, dbalbumid)
    }
    
    /* Convert an album name to id where databse recognize */
    getDbAlbumId(sharedAlbums, albumid){
        for (i = 0; i < sharedAlbums.length; i ++){
            if (sharedAlbums[i].albumid == albumid){
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

    /* Gets the family object from back end */
    async getFamilies(familyid){
        return await this.APIHandler.getFamilies(familyid)
    }

    /* Get all users in the database */
    async getAllUsers(){
        return await this.APIHandler.getAllUsers()
    }

    /* Sends an family invitation to target user id */
    async sendFamilyInvitation(targetid){
        const userData = await this.getDBUserData()
        const familyid = userData.family
        const senderid = userData._id
        body = {
            family: familyid
        }
        this.APIHandler.sendFamilyInvitation(body, senderid, targetid)
    }

    /* Accepts an invitation to join a family */
    async acceptFamilyInvitation(){
        const userData = await this.getDBUserData()
        this.APIHandler.acceptFamilyInvitation(userData._id)
    }

    /* Declines an invitation to join a family */
    async declineFamilyInvitation(){
        const userData = await this.getDBUserData()
        this.APIHandler.declineFamilyInvitation(userData._id)
    }

}
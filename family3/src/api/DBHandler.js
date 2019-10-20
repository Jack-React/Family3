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
    async getRelationInfo(userid){
        return await this.APIHandler.getRelationInfo(userid)
    }

    /* Gets all relationships of a user */
    async getRelation(userid){
        return await this.APIHandler.getRelation(userid)
    }
    
    /* Adds a shared album to the family */
    async addSharedAlbum(familyid, album){
        body = {
            albumid: album.albumid,
            sharedToken: album.sharedToken 
        }
        console.log(body)
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

}
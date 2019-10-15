import RNFetchBlob from 'react-native-fetch-blob'
import { GoogleSignin } from 'react-native-google-signin';

import APIHandler from './APIHandler'
import DBHandler from './DBHandler'
import { Config } from '../assets/GoogleConfig'

// Helper class to connect to GoogleApi
export default class GoogelAPIHandler {
    static instance = null
    static getInstance() {
        if (GoogelAPIHandler.instance == null) {
            GoogelAPIHandler.instance = new GoogelAPIHandler();
        }
        return this.instance;
    }

    constructor() {
        this.APIHandler = APIHandler.getInstance();
        this.DBHandler = DBHandler.getInstance();
        this.dbUserData = null;
        GoogleSignin.configure(Config);
    }

    
    /* Gets user data from database */
    async getDbUserData(){
        if (this.dbUserData == null)
            this.dbUserData = await this.DBHandler.getDBUserData();
    }

    /* Gets an upload token from google photos api in order to submit and image */
    async getUploadToken(image){
        let name = image.path.split('/')
        name = name[name.length-1]
        const token = await GoogleSignin.getTokens();
        data = {
            URI: 'https://photoslibrary.googleapis.com/v1/uploads',
            method: 'POST',
            headers:  {
                'Content-Type': 'application/octet-stream',
                'Authorization': 'Bearer '+ token.accessToken,
                'X-Goog-Upload-File-Name': name,
                'X-Goog-Upload-Protocol': 'raw'
            },
            body: RNFetchBlob.wrap(image.path),
            isJson: true
        }
        response =  await this.APIHandler.sendRequest(data);
        return response.data
    }

    /* Submits an image to google photos api */
    async submitImage(uploadData, albumID){
        const mediaItems = this.processUploadImages(uploadData)
        const token = await GoogleSignin.getTokens();
        data = {
            URI: 'https://photoslibrary.googleapis.com/v1/mediaItems:batchCreate',
            headers: {
                'Authorization': 'Bearer '+ token.accessToken,
                'Content-type': 'application/json'
            },
            method: 'POST',
            body: JSON.stringify({
                "albumId": albumID,
                "newMediaItems": mediaItems
            })
        }
        response =  await this.APIHandler.sendRequest(data);
        return response
    }
    /* Converts the form of uploadData to something google photos api understands */
    processUploadImages(uploadData){
        mediaItems = []
        for (i = 0; i < uploadData.length; i ++){
            mediaItems.push({
                "description": uploadData[i].description,
                "simpleMediaItem": {
                    "uploadToken": uploadData[i].uploadToken
                }
            })
        }
        return mediaItems
    }

    /* Gets media items (images) from a google photo library */
    async getMediaItems(albumID){
        //Reponse contains an array of (id, description, productUr, mediaMetaData, filename)
        const token = await GoogleSignin.getTokens();
        await this.getDbUserData();
        data = {
            URI: 'https://photoslibrary.googleapis.com/v1/mediaItems:search',
            method: 'POST',
            headers: {
                'Authorization': 'Bearer '+ token.accessToken,
                'Content-type': 'application/json'
            },
            body: JSON.stringify({
                "pageSize":"100",
                "albumId": albumID
            })
        }
        response =  await this.APIHandler.sendRequest(data);
        return response.mediaItems
    }

    /* Creates an album in google photos */
    async createAlbum (title) {
        const token = await GoogleSignin.getTokens();
        data = {
            URI: 'https://photoslibrary.googleapis.com/v1/albums',
            method: 'POST',
            headers:  {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer '+ token.accessToken
            },
            body: JSON.stringify({
                "album": {"title": title}
            })
        }
        response = await this.APIHandler.sendRequest(data)
        return response
    };

     /* Makes an album shareable */
    async shareAlbum(albumID){
        const token = await GoogleSignin.getTokens();
        data = {
            URI: `https://photoslibrary.googleapis.com/v1/albums/${albumID}:share`,
            method: 'POST',
            headers:  {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer '+ token.accessToken
            },
            body:JSON.stringify({
                "sharedAlbumOptions": {
                    "isCollaborative": true,
                    "isCommentable": true  
                }
            })
        }
        response = await this.APIHandler.sendRequest(data)
        return response
    }

    /* Retrieve all albums created by this app from google photo */
    async getAlbums(){
        const token = await GoogleSignin.getTokens();
        await this.getDbUserData();
        data = {
            URI: 'https://photoslibrary.googleapis.com/v1/albums?excludeNonAppCreatedData=true',
            method: 'GET',
            headers: {
                'Authorization': 'Bearer '+ token.accessToken,
                'Content-type': 'application/json'
            },
        }
        response =  await this.APIHandler.sendRequest(data);
        return response
    }

    /* Retrieve all albums shared or shared by others from google photo */
    async getSharedAlbums(){
        const token = await GoogleSignin.getTokens();
        await this.getDbUserData();
        data = {
            URI: 'https://photoslibrary.googleapis.com/v1/sharedAlbums?excludeNonAppCreatedData=true',
            method: 'GET',
            headers: {
                'Authorization': 'Bearer '+ token.accessToken,
                'Content-type': 'application/json'
            },
        }
        response =  await this.APIHandler.sendRequest(data);
        return response
    }
    
    /* Unshares an Album */
    async unShareAlbum(albumID){
        const token = await GoogleSignin.getTokens();
        data = {
            URI: `https://photoslibrary.googleapis.com/v1/albums/${albumID}:unshare`,
            method: 'POST',
            headers: {
                'Authorization': 'Bearer '+ token.accessToken,
                'Content-type': 'application/json'
            },
        }
        response =  await this.APIHandler.sendRequest(data);
        return response
    }

    /* Joins a shared Album */
    async joinSharedAlbum(shareToken){
        const token = await GoogleSignin.getTokens();
        data = {
            URI: 'https://photoslibrary.googleapis.com/v1/sharedAlbums:join',
            method: 'POST',
            headers: {
                'Authorization': 'Bearer '+ token.accessToken,
                'Content-type': 'application/json'
            },
            body: JSON.stringify({
                "shareToken": shareToken
            })
        }
        response =  await this.APIHandler.sendRequest(data);
        return response
    }
    
    /* Leaves a shared Album */
    async leaveSharedAlbum(shareToken){
        const token = await GoogleSignin.getTokens();
        data = {
            URI: 'https://photoslibrary.googleapis.com/v1/sharedAlbums:leave',
            method: 'POST',
            headers: {
                'Authorization': 'Bearer '+ token.accessToken,
                'Content-type': 'application/json'
            },
            body: JSON.stringify({
                "shareToken": shareToken
            })
        }
        response =  await this.APIHandler.sendRequest(data);
        return response
    }

    /* Checks if the user has signed in */
    async isSignedIn(){
        return await GoogleSignin.isSignedIn()
    }

    /* Sign out */
    async signOut(){
        try {
            await GoogleSignin.signOut()
        }catch (error) {
            console.error(error);
        }
    }

    /* Get current user google info */ 
    async getCurrentUser(){
        return await GoogleSignin.getCurrentUser()
    }

    /* Function to sign in using google account */
	async googleSignInHandler() {
		try {
            await GoogleSignin.hasPlayServices();
            const response =  await GoogleSignin.signIn();
            return response
		} catch (error) {
			console.warn(error);
		}
	};
}


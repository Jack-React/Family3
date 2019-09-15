import { GoogleSignin, GoogleSigninButton } from 'react-native-google-signin';
import RNFetchBlob from 'react-native-fetch-blob'

import APIHandler from './APIHandler'
import DBHandler from './DBHandler'

export default class GoogelAPIHandler {
    constructor() {
        this.APIHandler = new APIHandler();
        this.DBHandler = new DBHandler();
        this.dbUserData = null;
    }

    async getDbUserData(){
        if (this.dbUserData == null)
            this.dbUserData = await this.DBHandler.getDBUserData();
    }

    async makeAlbum (title, token) {
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
        return await this.APIHandler.sendRequest(data)
    };

    async getUploadToken(image, token){
        console.log(token)
        let name = image.path.split('/')
        name = name[name.length-1]
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

    async submitImage(uploadToken, description, token){
        await this.getDbUserData();
        data = {
            URI: 'https://photoslibrary.googleapis.com/v1/mediaItems:batchCreate',
            headers: {
                'Authorization': 'Bearer '+ token.accessToken,
                'Content-type': 'application/json'
            },
            method: 'POST',
            body: JSON.stringify({
                "albumId": this.dbUserData.album,
                "newMediaItems": [
                    {
                        "description": description,
                        "simpleMediaItem": {
                            "uploadToken": uploadToken
                        }
                    }
                ]
            })
        }
        response =  await this.APIHandler.sendRequest(data);
        console.log(response)
        return response.mediaItem
    }

    async getMediaItems(token){
        /* 
         * Reponse contains an array of (id, description, productUr, mediaMetaData, filename)
         */
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
                 "albumId": this.dbUserData.album
            })
        }
        response =  await this.APIHandler.sendRequest(data);
        return response.mediaItems
    }
    
    

    async getUser(){
        return await GoogleSignin.getCurrentUser();
    }

}


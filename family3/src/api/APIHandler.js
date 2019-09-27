import RNFetchBlob from 'react-native-fetch-blob'

const ACCOUNTS = "http://52.14.226.1:8080/api/accounts"
const FAMILIES = "http://52.14.226.1:8080/api/families"


export default class APIHandler {
    // Builds a form body based on data to be used for post requests
    buildFormBody(data){
        var formBody = [];
        for (var property in data) {
            var encodedKey = encodeURIComponent(property);
            var encodedValue = encodeURIComponent(data[property]);
            formBody.push(encodedKey + "=" + encodedValue);
        }
        formBody = formBody.join("&");
        return formBody;
    }

    /* sends a get request to back end to retrieve account details */
    async getAccount(id){
        // console.log('Getting account...');
        data = {
            URI: `${ACCOUNTS}/${id}`,
            method: 'GET'
        }
       return await this.sendRequest(data)
    };

    /* Sends a post request to back end for accout creation*/
    async createAccount(body){
        // console.log("Creating Account...");
        data = {
            URI: ACCOUNTS,
            method: 'POST',
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
            body: this.buildFormBody(body)
        }
        return await this.sendRequest(data)
    };

    /* Sends a delete request to back end to delete account */
    async deleteAccount(id){
        // console.log('Deleting Account...')
        data = {
            URI:`${ACCOUNTS}/${id}`,
            method: 'DELETE',
        }
        return await this.sendRequest(data)
    };

    /* Sends a put request to back end to update account */ 
    async updateAccount(id, body){
        // console.log('Updating account...');
        data = {
            URI:`${ACCOUNTS}/${id}`,
            method: 'PUT',
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
            body: this.buildFormBody(body)
        }
        return await this.sendRequest(data)
    };

    /* Sends data to any uri based on method, headers and body */
    async sendRequest(data){
        try {
            const response = await RNFetchBlob.fetch(data.method, data.URI, data.headers, data.body);
            // if data send expects a json response
            if (data.isJson == true)
                // No need to convert to json object
                return response
            else 
                return response.json()
        }
        catch (error){
            console.warn(error);
        }
    }
};
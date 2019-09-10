import React, {Component} from 'react';

const ACCOUNTS = "http://52.14.226.1:8080/api/accounts"
const FAMILIES = "http://52.14.226.1:8080/api/families"


export default class APIHandler extends Component{
    constructor(){
        super();
    }

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

    getAccount(id){
        console.log(`Getting account with id: ${id}`);
        return fetch(`${ACCOUNTS}/${id}`, {
            method: "GET",
        })
        .then((response) => response.json())
        .then((response) => {return response})
        .catch((error) => {console.warn(error)});
    };

    createAccount(data){
        console.log("Creating Account...");
        return fetch(ACCOUNTS, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            body: this.buildFormBody(data)
        })
        .then((response) => response.json())
        .then((response) => {return response;})
        .catch((error) => {console.warn(error)});
    };


    deleteAccount(id){
        console.log(`deleting ${id} from database`);
        return fetch(`${ACCOUNTS}/${id}`, {
            method: "DELETE",
        })
        .then((response) => response.json())
        .then((response) =>{return response;})
        .catch((error) => {console.warn(error)});
    };

    updateAccount(id, data){
        console.log(`Updating data for ${id}`);
        return fetch(`${ACCOUNTS}/${id}`, {
            method: "PUT",
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            }, 
            body: this.buildFormBody(data)
        })
        .then((response) => response.json())
        .then((response) =>{return response})
        .catch((error) => {console.warn(error)});
    };



};
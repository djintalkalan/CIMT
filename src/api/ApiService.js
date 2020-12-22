import {ApiConstants} from "./ApiConstants";
import {Constants} from '../utils/Constants'


async function callApi(urlString, header, body, methodType) {
    console.log("----------- Api request is----------- ");
    console.log("url string " + urlString);
    console.log("header " + JSON.stringify(header));
    console.log("body " + JSON.stringify(body));
    console.log("methodType " + methodType)

    return fetch(urlString, {
        method: methodType,
        headers: header,
        body: methodType == "POST" ? JSON.stringify(body) : null
    })
        .then(response => {
            console.log("-----------Response is----------- ")
            console.log(response)
            if (response.status == 200) {
                return response.json()
            } else {
                throw new Error(" status code " + response.status)
            }
        })
        .then((responseJson) => {
            return responseJson
        })
        .catch((error) => {
            throw error
        })
}

async function fetchApiData(urlString, body, methodType) {
    let header = {
        "Accept": "application/json",
        "Content-Type": "application/json",
    }
    return callApi(urlString, header, body, methodType)

}

export async function loginApi(param) {
    return fetchApiData(ApiConstants.loginUser, param, Constants.API_METHOD.post)
}

export async function passwordResetApi(param) {
    return fetchApiData(ApiConstants.passwordReset, param, Constants.API_METHOD.post)
}

export async function changePassApi(param) {
    return fetchApiData(ApiConstants.changePass, param, Constants.API_METHOD.post)
}

export async function addUserApi(param) {
    return fetchApiData(ApiConstants.addUser, param, Constants.API_METHOD.post)
}

export async function getPosts() {
    return fetchApiData(ApiConstants.getPosts, '', Constants.API_METHOD.get)
}

export async function getPhotos() {
    return fetchApiData(ApiConstants.getPhotos, '', Constants.API_METHOD.get)
}

export async function getUserList() {
    return fetchApiData(ApiConstants.getUserList, '', Constants.API_METHOD.get)
}

export async function getRoleList() {
    return fetchApiData(ApiConstants.getRoleList, '', Constants.API_METHOD.get)
}

export async function addRoleApi(param) {
    return fetchApiData(ApiConstants.addRole, param, Constants.API_METHOD.post)
}

export async function getCaseList() {
    return fetchApiData(ApiConstants.getCaseList, '', Constants.API_METHOD.get)
}

export async function addCaseApi(param) {
    return fetchApiData(ApiConstants.addCase, param, Constants.API_METHOD.post)
}

export async function getOfficeList() {
    return fetchApiData(ApiConstants.getOffices, '', Constants.API_METHOD.get)
}

export async function getNatureMisconductList() {
    return fetchApiData(ApiConstants.getNatureMisconduct, '', Constants.API_METHOD.get)
}

export async function getSourceComplaintList() {
    return fetchApiData(ApiConstants.getSourceComplaint, '', Constants.API_METHOD.get)
}

export async function getDesignationList() {
    return fetchApiData(ApiConstants.getDesignation, '', Constants.API_METHOD.get)
}

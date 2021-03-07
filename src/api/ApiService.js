import { ApiConstants } from "./ApiConstants";
import { Constants } from '../utils/Constants'


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

async function fetchApiData(urlString, body, methodType, isMultipart) {
    let header = {
        "Accept": "application/json",
        "Content-Type": isMultipart ? "multipart/form-data" : "application/json",
        "Authorization": "Bearer " + JSON.parse(localStorage.getItem("userToken"))
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

export async function getCaseReport() {
    return fetchApiData(ApiConstants.getCaseReport, '', Constants.API_METHOD.get)
}
export async function getMonthlyCaseReport() {
    return fetchApiData(ApiConstants.getMonthlyCaseReport, '', Constants.API_METHOD.get)
}
export async function getDistrictReport() {
    return fetchApiData(ApiConstants.getDistrictReport, '', Constants.API_METHOD.get)
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

// export async function getOfficeList() {
//     return fetchApiData(ApiConstants.getOffices, '', Constants.API_METHOD.get)
// }

export async function getNatureMisconductList() {
    return fetchApiData(ApiConstants.getNatureMisconduct, '', Constants.API_METHOD.get)
}

export async function getSourceComplaintList() {
    return fetchApiData(ApiConstants.getSourceComplaint, '', Constants.API_METHOD.get)
}

export async function getDesignationList() {
    return fetchApiData(ApiConstants.addUpdateDelDesignation, '', Constants.API_METHOD.get)
}

export async function addDesignationApi(param) {
    return fetchApiData(ApiConstants.addUpdateDelDesignation, param, Constants.API_METHOD.post)
}

export async function updateDesignationApi(id, param) {
    return fetchApiData(ApiConstants.addUpdateDelDesignation + id, param, Constants.API_METHOD.put)
}

export async function deleteDesignationApi(param) {
    return fetchApiData(ApiConstants.addUpdateDelDesignation + param, null, Constants.API_METHOD.delete)
}

export async function getOfficesList() {
    return fetchApiData(ApiConstants.addUpdateDelOffices, '', Constants.API_METHOD.get)
}

export async function addOfficesApi(param) {
    return fetchApiData(ApiConstants.addUpdateDelOffices, param, Constants.API_METHOD.post)
}

export async function updateOfficesApi(id, param) {
    return fetchApiData(ApiConstants.addUpdateDelOffices + id, param, Constants.API_METHOD.put)
}

export async function deleteOfficesApi(param) {
    return fetchApiData(ApiConstants.addUpdateDelOffices + param, null, Constants.API_METHOD.delete)
}

export async function getDistrictList() {
    return fetchApiData(ApiConstants.addUpdateDelDistrict, '', Constants.API_METHOD.get)
}

export async function addDistrictApi(param) {
    return fetchApiData(ApiConstants.addUpdateDelDistrict, param, Constants.API_METHOD.post)
}

export async function updateDistrictApi(id, param) {
    return fetchApiData(ApiConstants.addUpdateDelDistrict + id, param, Constants.API_METHOD.put)
}

export async function deleteDistrictApi(param) {
    return fetchApiData(ApiConstants.addUpdateDelDistrict + param, null, Constants.API_METHOD.delete)
}

export async function getMisconductList() {
    return fetchApiData(ApiConstants.addUpdateDelMisconduct, '', Constants.API_METHOD.get)
}

export async function addMisconductApi(param) {
    return fetchApiData(ApiConstants.addUpdateDelMisconduct, param, Constants.API_METHOD.post)
}

export async function updateMisconductApi(id, param) {
    return fetchApiData(ApiConstants.addUpdateDelMisconduct + id, param, Constants.API_METHOD.put)
}

export async function deleteMisconductApi(param) {
    return fetchApiData(ApiConstants.addUpdateDelMisconduct + param, null, Constants.API_METHOD.delete)
}

export async function getArticlesList() {
    return fetchApiData(ApiConstants.addUpdateDelArticles, '', Constants.API_METHOD.get)
}

export async function addArticlesApi(param) {
    return fetchApiData(ApiConstants.addUpdateDelArticles, param, Constants.API_METHOD.post)
}

export async function updateArticlesApi(id, param) {
    return fetchApiData(ApiConstants.addUpdateDelArticles + id, param, Constants.API_METHOD.put)
}

export async function deleteArticlesApi(param) {
    return fetchApiData(ApiConstants.addUpdateDelArticles + param, null, Constants.API_METHOD.delete)
}

export async function uploadImageApi(param) {
    return fetchApiData(ApiConstants.uploadImageOnServer, param, Constants.API_METHOD.post,true)
}

export async function updateUserApi(id, param) {
    return fetchApiData(ApiConstants.updateUser + id, param, Constants.API_METHOD.put,true)
}

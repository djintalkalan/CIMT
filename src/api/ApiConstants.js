
const baseUrl ="https://jsonplaceholder.typicode.com"
const baseUrl_heroku ="https://cors-anywhere.herokuapp.com/https://cimt.herokuapp.com"
const baseUrl2 ="https://kartforu.com/deepak/shally_maid_api/api"
const localUrl ="http://127.0.0.1:8000"

export const ApiConstants = {
    getPhotos:baseUrl+"/photos",
    getPosts:baseUrl+"/posts",
    loginUser1:localUrl+"/customer/login.php",

    loginUser:localUrl+"/validateUser/",
    passwordReset: localUrl+"/passwordReset/",
    changePass: localUrl+"/changePassword/",

    getCaseReport:localUrl+"/getCaseReport/",
    getMonthlyCaseReport:localUrl+"/getMonthlyCaseReport/",
    getDistrictReport:localUrl+"/getDistrictReport/",
    // addDistrict:localUrl+"/district/",

    getUserList:localUrl+"/getAllUser/",
    addUser:localUrl+"/addUser/",

    getRoleList:localUrl+"/getAllRoles/",
    addRole:localUrl+"/addRole/",

    getCaseList:localUrl+"/GetAllCase/",
    addCase:localUrl+"/AddCase/",

    getNatureMisconduct:localUrl+"/natureMisconduct/",
    getSourceComplaint:localUrl+"/sourceComplaint/",

    getDesignation:localUrl+"/Designations/",
    addDesignation:localUrl+"/Designations/",

    getOffices:localUrl+"/offices/",
    addOffices:localUrl+"/offices/",

    getDistrict:localUrl+"/Districts/",
    addDistrict:localUrl+"/Districts/",

}



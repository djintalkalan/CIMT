
const baseUrl ="https://jsonplaceholder.typicode.com"
const baseUrl_heroku ="https://cors-anywhere.herokuapp.com/https://cimt.herokuapp.com"
const baseUrl2 ="https://kartforu.com/deepak/shally_maid_api/api"
const localUrl ="http://127.0.0.1:8000"

export const ApiConstants = {
    getPhotos:baseUrl+"/photos",
    getPosts:baseUrl+"/posts",
    loginUser1:baseUrl2+"/customer/login.php",

    loginUser:baseUrl_heroku+"/ValidateUser/",
    passwordReset: baseUrl_heroku+"/passwordReset/",
    changePass: baseUrl_heroku+"/changePassword/",

    getUserList:baseUrl_heroku+"/GetAllUser/",
    addUser:baseUrl_heroku+"/Adduser/",

    getRoleList:baseUrl_heroku+"/GetAllRoles/",
    addRole:baseUrl_heroku+"/AddRole/",

    getCaseList:baseUrl_heroku+"/GetAllCase/",
    addCase:baseUrl_heroku+"/AddCase/",

    getOffices:localUrl+"/offices/",
    getNatureMisconduct:localUrl+"/natureMisconduct/",
    getSourceComplaint:localUrl+"/sourceComplaint/",
    getDesignation:localUrl+"/Designations/",
}


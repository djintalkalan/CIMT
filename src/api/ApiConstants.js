
const baseUrl ="https://jsonplaceholder.typicode.com"
const baseUrl_heroku ="https://cimt.herokuapp.com"
const baseUrl2 ="https://kartforu.com/deepak/shally_maid_api/api"

export const ApiConstants = {
    getPhotos:baseUrl+"/photos",
    getPosts:baseUrl+"/posts",
    loginUser1:baseUrl2+"/customer/login.php",
    getUserList:baseUrl_heroku+"/GetAllUser/",
    loginUser:baseUrl_heroku+"/ValidateUser/",
    addUser:baseUrl_heroku+"/Adduser/",

    getRoleList:baseUrl_heroku+"/GetAllRoles/",
    addRole:baseUrl_heroku+"/AddRole/",

    getCaseList:baseUrl_heroku+"/GetAllCase/",
    addCase:baseUrl_heroku+"/AddCase/",
}


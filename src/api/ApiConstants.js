
const baseUrl ="https://jsonplaceholder.typicode.com"
const baseUrl_heroku ="https://cors-anywhere.herokuapp.com/https://cimtapp.herokuapp.com"
const baseUrl2 ="https://kartforu.com/deepak/shally_maid_api/api"

export const ApiConstants = {
    getPhotos:baseUrl+"/photos",
    getPosts:baseUrl+"/posts",
    loginUser1:baseUrl2+"/customer/login.php",
    getUserList:baseUrl_heroku+"/GetAllUser/",
    loginUser:baseUrl_heroku+"/validateuser/",
    addUser:baseUrl_heroku+"/Adduser/"
}


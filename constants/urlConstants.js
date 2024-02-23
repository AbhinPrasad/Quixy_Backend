import config from "../config/index.js"

export default {
    signUp: config.basePath("/user/signup"),
    login: config.basePath("/user/login"),
    logout: config.basePath("/user/logout"),
}
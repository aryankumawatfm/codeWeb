const mongoose = require('mongoose')
const dbConnection = async (DB_URI) => {
    try {
        const conn = await mongoose.connect("mongodb+srv://theshanumalik:DI0hIAjk00oXWGLu@cluster0.p9na2.mongodb.net/codeweblogin?retryWrites=true&w=majority");
        if (conn) {
            console.log("CONNECTED TO DB SUCCESSFULL");
        }
    } catch (error) {
        console.log("FAILED TO CONNECT", error);
    }
};

module.exports = dbConnection
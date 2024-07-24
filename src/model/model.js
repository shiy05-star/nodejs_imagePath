const dbConn = require("../../config/dbCofiguration");

const insertForm = async ( p_ap_userName,p_ap_email,p_ap_password,imagePaths)=>{
const sql = "CALL INSERT_FORM_DETAILS(?,?,?,?)";
try{
    const results= await dbConn.query(sql, [p_ap_userName,p_ap_email,p_ap_password,imagePaths]);
    return results[0];
}catch(error){

    console.error("Error executing query:", error);
        throw error;
}
}

// =====================
const getLoginDetails = async ( p_ap_email,p_ap_password)=>{
    const sql = "CALL CheckUserDetailsByEmailAndPassword(?,?)";
    try{
    
        const results= await dbConn.query(sql, [p_ap_email,p_ap_password]);
        console.log( results[0][0][0],"trywqgwjq");
        return results[0][0][0];

    }catch(error){
    
        console.error("Error executing query:", error);
            throw error;
    }
    }

module.exports = {
    insertForm,getLoginDetails
};
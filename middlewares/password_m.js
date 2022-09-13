var bcrypt = require('bcryptjs');
var salt = bcrypt.genSaltSync(10);

const setPass =(txtPassword)=>{
    return bcrypt.hashSync(txtPassword, salt);
}
const checkPass =(textPassword , dbPass)=>{
    return bcrypt.compareSync(textPassword, dbPass);
}

module.exports = {
    setPass,
    checkPass
}
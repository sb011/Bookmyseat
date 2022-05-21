const vaild = (username, email, phone, password, c_password) => {
    if(!username || !email || !phone || !password || !c_password)
        return 'Please fill all fileds'

    if(!validateEmail(email))
        return 'Invaild Email'

    if(phone.length < 0 || phone.length > 10)
        return 'Invaild Phone no'

    if(password.length < 6)
        return 'Password must be at least 6 characters'

    if(password !== c_password)
        return "Confirm Password didn't match"
}

function validateEmail(email) {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}

export default vaild;
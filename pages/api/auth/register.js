import vaild from "../../../utils/valid";
import { getAuth, createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { app, db } from "../../../utils/firebaseConfig";
import { setDoc, doc } from "firebase/firestore/lite";

export default async (req, res) =>{
    switch(req.method){
        case "POST":
            await register(req, res)
            break;
    }
}

const register = async (req, res) => {
    try {
        const auth = getAuth(app);
        const { username, email, phone, password, c_password } = req.body
        const err = vaild(username, email, phone, password, c_password)
        if(err)
            return res.status(400).json({err: err});

        const response = await createUserWithEmailAndPassword(auth, email, password)

        await setDoc(doc(db, 'users', response.user.uid), {
            username: username,
            email: email,
            phone: phone,
            role: 'user'
        })
        
        return res.json({
            msg: "Register Successfully",
            user: response.user
        })
    } catch (err) {
        return res.status(400).json({err: err.message});
    }
}
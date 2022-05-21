import { getAuth, signOut } from "firebase/auth";
import { app } from "../../../utils/firebaseConfig";

export default async (req, res) =>{
    switch(req.method){
        case "GET":
            await logout(req, res)
            break;
    }
}

const logout = async (req, res) => {
    try {
        const auth = getAuth(app);
        await signOut(auth);
        return res.json({
            msg: "logout Successfully",
        })
    } catch (error) {
        return res.status(500).json({err: error.message})
    }
}
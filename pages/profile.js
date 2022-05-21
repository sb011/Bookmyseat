import { useState } from "react";
import ProfileInfo from './../components/profileInfo';
import ProfileEdit from './../components/profileEdit';

const Profile = () => {
    const [onSetting, setOnSetting] = useState(false)
    return (
        <div>
            {
                onSetting
                ? <ProfileEdit setOnSetting={setOnSetting} />
                : <ProfileInfo setOnSetting={setOnSetting} />
            }
        </div>
    )
}

export default Profile;
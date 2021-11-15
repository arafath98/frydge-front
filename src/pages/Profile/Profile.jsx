import { useContext, useEffect } from "react";
import { useNavigate } from "react-router";
import { Context } from "../../Context";
import AddEmail from "../../components/Email/AddEmail";

export default function Profile() {
    document.title = 'Profile';
    const { isLoggedIn } = useContext(Context)
    const navigate = useNavigate()
    // const { colors, theme } = useContext(Context);

    useEffect(() => {
        if (!isLoggedIn) {
            navigate("/login")
        }
    }, [])

    const addEmail = (email) => {
        console.log(`${email} has been successfully added.`);
        // API CALL TO SEND EMAILS
    };

    return (
        <div>
            Profile
            <AddEmail addEmail={addEmail} />
        </div>
    );
};
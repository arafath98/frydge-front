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
    };

    return (
        <div>
            <AddEmail className="email-form" addEmail={addEmail} />
        </div>
    );
};
// import { useContext } from "react";

// import { Context } from "../../Context";

import AddEmail from "../../components/Email/AddEmail";

export default function Profile() {
    document.title = 'Profile';

    // const { colors, theme } = useContext(Context);

    const addEmail = (email) => {
        console.log("This email has been sent to " + email);
        // API CALL TO SEND EMAILS
    };

    return (
        <div>
            Profile


            <AddEmail addEmail={addEmail} />
        </div>
    );
};
export const auth = () => {
    const token = window.localStorage.getItem("token");
    if (token)
        return true;

    return false;
};
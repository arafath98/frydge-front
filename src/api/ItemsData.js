export const getItemsFromApi = async (token) => {
    const options = {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            "token": token,
        }
    }

    console.log("Now fetching data...");

    fetch("https://sleepy-sierra-88173.herokuapp.com/https://frydgeapp.herokuapp.com/items/", options)
        .then(response => response.json())
        .then(data => {
            return data;
        })
        .catch(err => err)
};
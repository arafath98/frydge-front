export default function Try() {

    const token = window.localStorage.getItem('token');

    const options = {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            "token": token,
        }
    }

    const fetchData = () => {

        console.log("Now fetching data...");

        fetch("https://sleepy-sierra-88173.herokuapp.com/https://frydgeapp.herokuapp.com/items/", options)
            .then(response => response.json())
            .then(data => console.log(data))
            .catch(err => console.error(err))
    }


    return (
        <div>
            TRY PAGE
            <button onClick={fetchData}>FETCH THE DATA</button>
        </div>
    )
}

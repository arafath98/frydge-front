export default function Try() {

    const token = window.localStorage.getItem('token');

    const options = {
        method: 'GET',
        headers: {
            "Authorization": "token " + token,
            'Content-Type': 'application/json',
            "token": token
        }
    }

    const fetchData = () => {

        console.log("Now fetching data...");

        fetch("http://127.0.0.1:8000/items", options)
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

import "../App.css";

function Logout() {

    return (
        <div className="App">
            <button type="button" onClick={fetch('/logout')}>Logout</button>
        </div>
    )
}

export default Logout
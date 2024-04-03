import "../App.css";

function Logout() {
    const logoutUser = async () => {
        try {
            const response = await fetch('/logout');
            if (response.ok) {
                console.log('Logout successful');
            } else {
                console.log('Logout failed');
            }
        } catch (error) {
            console.error('Error during logout:', error);
        }
    };
    return (
        <div className="App">
            <button type="button" onClick={() => logoutUser()}>Logout</button>
        </div>
    )
}

export default Logout
import Button from 'react-bootstrap/Button';
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
        <div className="form-container">
            <Button variant="primary" type="submit" onClick={() => logoutUser()}>Logout</Button>
        </div>
    )
}

export default Logout
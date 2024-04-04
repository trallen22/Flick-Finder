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
        <div className="recommend-wrapper">
            <Button variant="primary" className="recommend-button" onClick={() => logoutUser()}>Logout</Button>
        </div>
    )
}

export default Logout
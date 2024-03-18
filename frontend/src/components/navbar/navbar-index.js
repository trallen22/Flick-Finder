import React, { useEffect, useState } from "react";
import {
    Nav,
    NavLink,
    Bars,
    NavMenu,
    NavBtn,
    NavBtnLink,
} from "./navbar-elements";
import { useNavigate } from "react-router-dom";
 
const Navbar = () => {

    const [userID, setUserID] = useState({
        user_id: '-1'
      });
    
      const navigate = useNavigate();
    
      useEffect(() => {
        fetch('/get_user')
          .then((res) => res.json())
          .then((data) => {
            setUserID(data);
            // Push a new entry onto the history stack with the user ID in the URL
            navigate.push(`/user/${data.user_id}`);
          })
          .catch((error) => {
            console.log(error);
          });
      }, [navigate]);

    return (
        <>
            <Nav>
                <Bars />
                <NavMenu>
                    <NavLink to="/home" activeStyle>
                        Home
                    </NavLink>
                    <NavLink to="/top-recommendations" activeStyle>
                        Top Recommendations
                    </NavLink>
                    <NavLink to="/sign-up" activeStyle>
                        Sign Up
                    </NavLink>
                    {/* Second Nav */}
                    {/* <NavBtnLink to='/sign-in'>Sign In</NavBtnLink> */}
                </NavMenu>
                <NavBtn>
                    <NavBtnLink to="/login">
                        Login
                    </NavBtnLink>
                </NavBtn>
                <NavBtn>
                    <NavBtnLink to="/logout">
                        Logout
                    </NavBtnLink>
                </NavBtn>
                <NavBtn>
                    <NavBtnLink to="/user">
                        {userID.user_id}
                    </NavBtnLink>
                </NavBtn>
            </Nav>
        </>
    );
};
 
export default Navbar;
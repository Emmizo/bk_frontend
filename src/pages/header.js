import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import AuthService from "../services/auth.service";
const Header = () => {
  const [showHr, setShowHr] = useState(false);
  // const [showAdminBoard, setShowAdminBoard] = useState(false);
  // const [currentUser, setCurrentUser] = useState(undefined);

  useEffect(() => {
    const user = AuthService.getCurrentUser();

    if (user?.user?.role === 1) {
      setShowHr(true);
    } else {
      setShowHr(false);
    }
  }, []);

  const logOut = () => {
    AuthService.logout();
  };
  return (
    <header className='row-header'>
      {showHr === true ? (
        <div>
          <div className='login'>
            <a href='/login' className='nav-link' onClick={logOut}>
              LogOut
            </a>
          </div>
          <div className='login'>
            <Link to='/profile'>Profile</Link>
          </div>
        </div>
      ) : (
        <div>
          <div className='login'>
            <Link to='/'>Home</Link>
          </div>
          <div className='login'>
            <Link to='/login'>Login</Link>
          </div>
        </div>
      )}
    </header>
  );
};
export default Header;

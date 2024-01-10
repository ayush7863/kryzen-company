import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import navbarStyles from "../styles/Navbar.module.css";
import { Button, useToast } from "@chakra-ui/react";

const Navbar = () => {
  const [tokenFlag, setTokenFlag] = useState(null);
  const toast = useToast();

  const handleLogout = () => {
    localStorage.clear();
    toast({
      title: "Logout",
      description: `Logout Successful`,
      status: "success",
      duration: 5000,
      isClosable: true,
    });
    window.location.reload();
  };
  useEffect(() => {
    const tokenResult = localStorage.getItem("token");
    setTokenFlag(tokenResult);
  }, []);
  return (
    <nav className={navbarStyles.navbar}>
      <div>
        <Link to="/">LOGO</Link>
      </div>
      <ul className={navbarStyles.menu_links}>
        <li>
          <Link to="/register">SignUp</Link>
        </li>
        {tokenFlag ? (
          <Button onClick={handleLogout}>LOGOUT</Button>
        ) : (
          <li>
            <Link to="/login">login</Link>
          </li>
        )}

        <li>
          <Link to="/form">Form</Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;

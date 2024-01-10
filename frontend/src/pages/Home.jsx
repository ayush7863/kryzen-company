import React from "react";
import Navbar from "../Components/Navbar";
import "./Home.css";
import {Button} from "@chakra-ui/react"

const Home = () => {
  return (
    <div>
    
      <Navbar />
      <div className="admin_dashboard_div">
        <div className="welcome_div">
          <div className="row">
            <div className="col-md-12 text-center">
              <h3 className="animate-charcter">Welcome</h3>
              <h4 className="eBuzz_text">
              Simple Task Management App is here to make your bussiness grow!
              </h4>
            </div>
          </div>
        </div>
        <div className="explore_button">
          <Button>Explore Now!</Button>
        </div>
        <div className="footer">
          Copyright © 1995-2023 Inc. All Rights Reserved. Accessibility,
          User Agreement, Privacy, Payments Terms of Use, Cookies, Your Privacy
          Choices and AdChoice
        </div>
      </div>
     
    </div>
  );
};

export default Home;
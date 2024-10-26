import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import HomeScreenComponent from "../screens/homeCompo";
import LoginScreenComponent from "../screens/loginCompo";
import RegisterScreenComponent from "../screens/registerCompo";
import AppInterfaceComponent from "../screens/appInterfaceCompo";
import LocationScreenComponent from "../screens/locationCompo";

const NavigationStackComponent = () => {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomeScreenComponent />} />
          <Route path="/register-page" element={<RegisterScreenComponent />} />
          <Route path="/login-page" element={<LoginScreenComponent />} />
          <Route path="/app-interface" element={<AppInterfaceComponent />} />
          <Route path="/locationRoute-page" element={<LocationScreenComponent />}  />
        </Routes>
      </BrowserRouter>
    </>
  );
};
export default NavigationStackComponent;

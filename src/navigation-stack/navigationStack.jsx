import { BrowserRouter, Route, Routes } from "react-router-dom";
import ProtectedRoute from "../components/ProtectedRoute";
import HomeScreenComponent from "../screens/homeCompo";
import LoginScreenComponent from "../screens/loginCompo";
import RegisterScreenComponent from "../screens/registerCompo";
import AppInterfaceComponent from "../screens/appInterfaceCompo";
import LocationScreenComponent from "../screens/locationCompo";
import PaymentScreenComponent from "../screens/paymentCompo";
import MyRidesScreen from "../screens/myRidesCompo";
import MyProfileScreen from "../screens/myProfileCompo";
import OffersScreen from "../screens/offersCompo";

const NavigationStackComponent = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomeScreenComponent />} />
        <Route path="/register-page" element={<RegisterScreenComponent />} />
        <Route path="/login-page" element={<LoginScreenComponent />} />
        <Route
          path="/app-interface"
          element={
            <ProtectedRoute>
              <AppInterfaceComponent />
            </ProtectedRoute>
          }
        />
        <Route
          path="/locationRoute-page"
          element={
            <ProtectedRoute>
              <LocationScreenComponent />
            </ProtectedRoute>
          }
        />
        <Route
          path="/payment-page"
          element={
            <ProtectedRoute>
              <PaymentScreenComponent />
            </ProtectedRoute>
          }
        />
        <Route
          path="/offers"
          element={
            <ProtectedRoute>
              <OffersScreen />
            </ProtectedRoute>
          }
        />
        <Route
          path="/my-rides"
          element={
            <ProtectedRoute>
              <MyRidesScreen />
            </ProtectedRoute>
          }
        />
        <Route
          path="/my-profile"
          element={
            <ProtectedRoute>
              <MyProfileScreen />
            </ProtectedRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
};

export default NavigationStackComponent;

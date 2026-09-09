import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { API_ENDPOINTS } from "../config/api";
import { setLoggedInUser } from "../utils/auth";
import AuthLayout from "../components/AuthLayout";
import FormInput from "../components/FormInput";
import { useToast } from "../hooks/useToast";

const LoginScreenComponent = () => {
  const [loginUsername, setLoginUsername] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [formData, setFormData] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  const navigate = useNavigate();
  const location = useLocation();
  const toast = useToast();
  const successMessage = location.state?.message;

  const fetchDetails = async () => {
    setIsLoading(true);
    try {
      const { data, status } = await axios.get(API_ENDPOINTS.formDetails);
      if (status === 200) {
        setFormData(data);
        setErrorMessage("");
      }
    } catch (error) {
      console.error("Not fetching form details", error);
      const message =
        "Cannot connect to server. Run `npm start` to launch the app and API together.";
      setErrorMessage(message);
      toast.error(message);
    } finally {
      setIsLoading(false);
    }
  };

  const submitHandler = (event) => {
    event.preventDefault();
    setErrorMessage("");

    if (formData.length === 0) {
      setErrorMessage(
        "User data not loaded. Make sure the API server is running on port 3000."
      );
      return;
    }

    const user = formData.find(
      (entry) =>
        entry.username === loginUsername && entry.password === loginPassword
    );

    if (user) {
      setLoggedInUser({
        username: user.username,
        email: user.email,
        mobile: user.mobile,
      });
      toast.success(`Welcome back, ${user.username}!`);
      navigate("/app-interface");
    } else {
      const message = "Incorrect username or password. Please try again.";
      setErrorMessage(message);
      toast.error(message);
    }
  };

  useEffect(() => {
    fetchDetails();
  }, []);

  useEffect(() => {
    if (successMessage) {
      toast.success(successMessage);
    }
  }, [successMessage, toast]);

  return (
    <AuthLayout title="Welcome back" subtitle="Sign in to book your next ride">
      {successMessage && (
        <div className="mb-4 rounded-xl bg-green-50 p-3 text-sm text-green-700 ring-1 ring-green-100">
          {successMessage}
        </div>
      )}
      {isLoading ? (
        <p className="text-center text-sm text-gray-500">Loading users...</p>
      ) : (
        <form onSubmit={submitHandler} className="space-y-5">
          <FormInput
            id="loginUsername"
            label="Username"
            icon="👤"
            required
            value={loginUsername}
            onChange={(event) => setLoginUsername(event.target.value)}
          />
          <FormInput
            id="loginPassword"
            label="Password"
            type="password"
            icon="🔒"
            required
            value={loginPassword}
            onChange={(event) => setLoginPassword(event.target.value)}
          />

          {errorMessage && (
            <div className="rounded-xl bg-red-50 p-3 text-sm text-red-600">{errorMessage}</div>
          )}

          <button type="submit" className="btn-primary w-full">
            Sign in
          </button>
        </form>
      )}

      <p className="mt-8 text-center text-sm text-gray-500">
        Don&apos;t have an account?{" "}
        <Link to="/register-page" className="font-semibold text-teal-600 hover:text-teal-500">
          Register here
        </Link>
      </p>
    </AuthLayout>
  );
};

export default LoginScreenComponent;

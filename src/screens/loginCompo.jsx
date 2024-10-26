import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate

const LoginScreenComponent = () => {
  const [loginUsername, setLoginUsername] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [formData, setFormData] = useState([]);
  const [errorMessage, setErrorMessage] = useState(""); // State to handle error message

  const navigate = useNavigate(); // Initialize useNavigate

  const usernameHandler = (event) => {
    const usernameEntered = event.target.value;
    setLoginUsername(usernameEntered);
  };

  const passwordHandler = (event) => {
    const passwordEntered = event.target.value;
    setLoginPassword(passwordEntered);
  };

  const fetchDetails = async () => {
    try {
      const { data, status } = await axios.get(
        "http://localhost:3000/formDetails"
      );
      if (status === 200) {
        setFormData(data);
      }
    } catch (error) {
      console.log("Not fetching form details", error);
    }
  };

  const submitHandler = (event) => {
    event.preventDefault();

    const user = formData.find(
      (user) =>
        user.username === loginUsername && user.password === loginPassword
    );

    if (user) {
      navigate("/app-interface");
    } else {
      setErrorMessage("Incorrect credentials, please try again.");
    }
  };

  useEffect(() => {
    fetchDetails();
  }, []);

  return (
    <>
      <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <img
            alt="Your Company"
            src="https://tailwindui.com/plus/img/logos/mark.svg?color=indigo&shade=600"
            className="mx-auto h-10 w-auto"
          />
          <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
            Login
          </h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form onSubmit={submitHandler} className="space-y-6">
            <div>
              <label
                htmlFor="loginUsername"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Username
              </label>
              <div className="mt-2">
                <input
                  id="loginUsername"
                  name="loginUsername"
                  type="text"
                  required
                  value={loginUsername}
                  onChange={usernameHandler}
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between">
                <label
                  htmlFor="loginPassword"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Password
                </label>
              </div>
              <div className="mt-2">
                <input
                  id="loginPassword"
                  name="loginPassword"
                  type="password"
                  required
                  value={loginPassword}
                  onChange={passwordHandler}
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            {errorMessage && (
              <div className="text-red-500 text-sm mt-2">{errorMessage}</div>
            )}

            <div>
              <button
                type="submit"
                className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Sign in
              </button>
            </div>
          </form>

          <p className="mt-10 text-center text-sm text-gray-500">
            Don't have an account?{" "}
            <a
              href="#"
              className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500"
            >
              Register here
            </a>
          </p>
        </div>
      </div>
    </>
  );
};

export default LoginScreenComponent;

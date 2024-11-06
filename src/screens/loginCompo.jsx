import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { auth } from "../firebase";
import { signInWithEmailAndPassword } from "firebase/auth";

const LoginScreenComponent = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailSpan, setEmailSpan] = useState("");
  const [passwordSpan, setPasswordSpan] = useState("");

  const navigation = useNavigate();


  const navigateToRegister =()=>{
    navigation("/register-page")
  }

  const spanColor = {
    color: "red",
  };

  const emailHandler = (event) => {
    const emailEntered = event.target.value;
    setEmail(emailEntered);
    setEmailSpan(emailValidation(emailEntered));
  };

  const passwordHandler = (event) => {
    const passwordEntered = event.target.value;
    setPassword(passwordEntered);
    setPasswordSpan(passwordValidation(passwordEntered));
  };

  const submitHandler = async (event) => {
    event.preventDefault();

    if (!email || !password) {
      alert("Please fill out all the fields");
      return;
    }

    if (emailSpan || passwordSpan) {
      alert("Please enter valid information in all fields");
      return;
    }

    try {
      // Sign in user with Firebase Authentication
      await signInWithEmailAndPassword(auth, email, password);
      alert("Login successful!");

      // Clear form inputs
      setEmail("");
      setPassword("");

      // navigate to appScreen
      navigation("/app-interface");
    } catch (error) {
      console.error("Error logging in:", error.message);
      alert("Login failed. Please check your email and password.");
    }
  };

  const emailValidation = (emailErrorChecker) => {
    const emailRegex = /^[^\s@]+@gmail\.com$/;
    return emailErrorChecker === ""
      ? "Please enter an email ID"
      : !emailRegex.test(emailErrorChecker)
      ? "Email must end with '@gmail.com'"
      : "";
  };

  const passwordValidation = (passwordErrorChecker) => {
    return passwordErrorChecker === "" ? "Please enter your password" : "";
  };

  return (
    <div className="flex min-h-full flex-1 flex-col justify-center border">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
          Login Here!
        </h2>
      </div>

      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <form onSubmit={submitHandler} className="space-y-6">
          {/* Email Field */}
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              Email address
            </label>
            <div className="mt-2">
              <input
                id="email"
                name="email"
                type="email"
                value={email}
                onChange={emailHandler}
                autoComplete="email"
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
            <div>
              <span style={spanColor}>{emailSpan}</span>
            </div>
          </div>

          {/* Password Field */}
          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              Password
            </label>
            <div className="mt-2">
              <input
                id="password"
                name="password"
                type="password"
                value={password}
                onChange={passwordHandler}
                autoComplete="current-password"
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
            <div>
              <span style={spanColor}>{passwordSpan}</span>
            </div>
          </div>

          {/* Submit Button */}
          <div>
            <button
              type="submit"
              className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              Login
            </button>
          </div>
        </form>

        <p className="mt-10 text-center text-sm text-gray-500">
          Don't have an account?{" "}
          <button onClick={navigateToRegister}
           className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500">
            Register here
          </button>
        </p>
      </div>
    </div>
  );
};

export default LoginScreenComponent;

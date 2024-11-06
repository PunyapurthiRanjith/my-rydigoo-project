import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { auth, db } from "../firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";

const RegisterScreenComponent = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [mobile, setMobile] = useState("");
  const [password, setPassword] = useState("");
  const [checkbox, setCheckbox] = useState(false);

  const [userSpan, setUserSpan] = useState("");
  const [emailSpan, setEmailSpan] = useState("");
  const [mobileSpan, setMobileSpan] = useState("");
  const [passwordSpan, setPasswordSpan] = useState("");
  const [checkboxSpan, setCheckboxSpan] = useState("");

  const spanColor = {
    color: "red",
  };

  const navigate= useNavigate()

  const navigateToLogIn=()=>{
    navigate("/login-page")
  }

  const usernameHandler = (event) => {
    const usernameEntered = event.target.value;
    setUsername(usernameEntered);
    setUserSpan(usernameValidation(usernameEntered));
  };

  const emailHandler = (event) => {
    const emailEntered = event.target.value;
    setEmail(emailEntered);
    setEmailSpan(emailValidation(emailEntered));
  };

  const mobileHandler = (event) => {
    const mobileEntered = event.target.value;
    setMobile(mobileEntered);
    setMobileSpan(mobileValidation(mobileEntered));
  };

  const passwordHandler = (event) => {
    const passwordEntered = event.target.value;
    setPassword(passwordEntered);
    setPasswordSpan(passwordValidation(passwordEntered));
  };

  const checkboxHandler = (event) => {
    const isChecked = event.target.checked;
    setCheckbox(isChecked);
    setCheckboxSpan(checkboxValidation(isChecked));
  };

  const submitHandler = async (event) => {
    event.preventDefault();

    if (!username || !mobile || !email || !password || !checkbox) {
      alert("Please fill out all the fields");
      return;
    }

    if (userSpan || emailSpan || mobileSpan || passwordSpan || checkboxSpan) {
      alert("Please enter valid information in all fields");
      return;
    }

    try {
      // Create user with Firebase Authentication
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;

      // Store additional user details in Firestore
      await setDoc(doc(db, "users", user.uid), {
        username,
        mobile,
        email,
        createdAt: new Date(),
      });

      // Clear the form
      setUsername("");
      setEmail("");
      setMobile("");
      setPassword("");
      setCheckbox(false);
      alert("Registration successful!");
    } catch (error) {
      alert("Error creating user:");
    }
  };

  const usernameValidation = (userErrorChecker) => {
    let finalUserError = "";
    const hasCapitalLetter = /[A-Z]/.test(userErrorChecker);
    const hasNumber = /\d/.test(userErrorChecker);

    if (userErrorChecker === "") {
      finalUserError = "Please enter a username";
    } else if (userErrorChecker.length > 25) {
      finalUserError = "Username length should be less than 25 characters";
    } else if (!hasCapitalLetter) {
      finalUserError = "Username must contain at least one capital letter";
    } else if (!hasNumber) {
      finalUserError = "Username must contain at least one numeric value";
    }
    return finalUserError;
  };

  const emailValidation = (emailErrorChecker) => {
    const emailRegex = /^[^\s@]+@gmail\.com$/;
    return emailErrorChecker === ""
      ? "Please enter an email ID"
      : !emailRegex.test(emailErrorChecker)
      ? "Email must end with '@gmail.com'"
      : "";
  };

  const mobileValidation = (mobileErrorChecker) => {
    const mobileRegex = /^[6-9][0-9]{9}$/;
    return mobileErrorChecker === ""
      ? "Please enter the mobile number"
      : !mobileRegex.test(mobileErrorChecker)
      ? "Please enter a valid mobile number"
      : "";
  };

  const passwordValidation = (passwordErrorChecker) => {
    const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(passwordErrorChecker);
    const hasNumber = /\d/.test(passwordErrorChecker);
    return passwordErrorChecker === ""
      ? "Please set your password"
      : !hasSpecialChar
      ? "Password must contain at least one special character"
      : !hasNumber
      ? "Password must contain at least one numeric value"
      : "";
  };

  const checkboxValidation = (isChecked) => {
    return isChecked ? "" : "You must agree to the terms and conditions";
  };

  return (
    <>
      <div className="flex min-h-full flex-1 flex-col justify-center border">
        <div className="sm:mx-auto sm:w-full  sm:max-w-sm">
          <img
            alt="Your Company"
            src="https://tailwindui.com/plus/img/logos/mark.svg?color=indigo&shade=600"
            className="mx-auto h-10 w-auto"
          />
          <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
            Register Here!
          </h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form onSubmit={submitHandler} className="space-y-6">
            {/* Username Field */}
            <div>
              <label
                htmlFor="username"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Username
              </label>
              <div className="mt-2">
                <input
                  id="username"
                  name="username"
                  type="text"
                  value={username}
                  onChange={usernameHandler}
                  autoComplete="username"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
              <div>
                <span style={spanColor}>{userSpan}</span>
              </div>
            </div>

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

            {/* Mobile Field */}
            <div>
              <label
                htmlFor="mobile"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Mobile
              </label>
              <div className="mt-2">
                <input
                  id="mobile"
                  name="mobile"
                  type="tel"
                  value={mobile}
                  onChange={mobileHandler}
                  autoComplete="mobile"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
              <div>
                <span style={spanColor}>{mobileSpan}</span>
              </div>
            </div>

            {/* Password Field */}
            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Set-Password
              </label>
              <div className="mt-2">
                <input
                  id="password"
                  name="password"
                  type="password"
                  value={password}
                  onChange={passwordHandler}
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
              <div>
                <span style={spanColor}>{passwordSpan}</span>
              </div>
            </div>

            {/* Checkbox */}
            <div className="flex items-center mb-4">
              <input
                id="default-checkbox"
                type="checkbox"
                checked={checkbox}
                onChange={checkboxHandler}
                className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
              />
              <label
                htmlFor="default-checkbox"
                className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
              >
                Agree Terms & Conditions
              </label>
            </div>
            <span style={spanColor}>{checkboxSpan}</span>

            {/* Submit Button */}
            <div>
              <button
                type="submit"
                onClick={submitHandler}
                className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Sign in
              </button>
            </div>
          </form>

          <p className="mt-10 text-center text-sm text-gray-500">
            already have an account?{" "}
              <button onClick={navigateToLogIn}
              className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500">
                Login here
              </button>
          </p>
        </div>
      </div>
    </>
  );
};

export default RegisterScreenComponent;

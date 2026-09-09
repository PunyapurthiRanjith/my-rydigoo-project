import axios from "axios";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { API_ENDPOINTS } from "../config/api";
import AuthLayout from "../components/AuthLayout";
import FormInput from "../components/FormInput";
import { useToast } from "../hooks/useToast";

const RegisterScreenComponent = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [mobile, setMobile] = useState("");
  const [password, setPassword] = useState("");
  const [checkbox, setCheckbox] = useState(false);

  const [userSpan, setUserSpan] = useState("");
  const [emailSpan, setEMailSpan] = useState("");
  const [mobileSpan, setMobileSpan] = useState("");
  const [passwordSpan, setPasswordSpan] = useState("");
  const [checkboxSpan, setCheckboxSpan] = useState("");
  const [submitError, setSubmitError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const navigate = useNavigate();
  const toast = useToast();

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
    let finalEmailError = "";
    const emailRegex = /^[^\s@]+@gmail\.com$/;

    if (emailErrorChecker === "") {
      finalEmailError = "Please enter an email ID";
    } else if (!emailRegex.test(emailErrorChecker)) {
      finalEmailError = "Email must end with '@gmail.com'";
    }
    return finalEmailError;
  };

  const mobileValidation = (mobileErrorChecker) => {
    const mobileRegex = /^[6-9][0-9]{9}$/;
    let finalMobileError = "";
    if (mobileErrorChecker === "") {
      finalMobileError = "Please enter the mobile number";
    } else if (!mobileRegex.test(mobileErrorChecker)) {
      finalMobileError = "Please enter a valid mobile number";
    }
    return finalMobileError;
  };

  const passwordValidation = (passwordErrorChecker) => {
    let finalPasswordError = "";
    const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(passwordErrorChecker);
    const hasNumber = /\d/.test(passwordErrorChecker);

    if (passwordErrorChecker === "") {
      finalPasswordError = "Please set your password";
    } else if (!hasSpecialChar) {
      finalPasswordError = "Password must contain at least one special character";
    } else if (!hasNumber) {
      finalPasswordError = "Password must contain at least one numeric value";
    }
    return finalPasswordError;
  };

  const checkboxValidation = (isChecked) => {
    if (!isChecked) {
      return "You must agree to the terms and conditions";
    }
    return "";
  };

  const submitHandler = async (event) => {
    event.preventDefault();
    setSubmitError("");

    const userErr = usernameValidation(username);
    const emailErr = emailValidation(email);
    const mobileErr = mobileValidation(mobile);
    const passwordErr = passwordValidation(password);
    const checkboxErr = checkboxValidation(checkbox);

    setUserSpan(userErr);
    setEMailSpan(emailErr);
    setMobileSpan(mobileErr);
    setPasswordSpan(passwordErr);
    setCheckboxSpan(checkboxErr);

    if (userErr || emailErr || mobileErr || passwordErr || checkboxErr) {
      return;
    }

    setIsSubmitting(true);
    try {
      await axios.post(
        API_ENDPOINTS.formDetails,
        { username, mobile, email, password },
        { headers: { "Content-Type": "application/json" } }
      );

      navigate("/login-page", {
        state: { message: "Registration successful! Please log in." },
      });
    } catch (error) {
      console.error(error);
      const message =
        "Registration failed. Make sure the API server is running (`npm start`).";
      setSubmitError(message);
      toast.error(message);
    } finally {
      setIsSubmitting(false);
    }
  };

  const errorClass = "mt-1 text-xs text-red-500";

  return (
    <AuthLayout title="Join Rydigoo" subtitle="Create an account and start riding">
      <form onSubmit={submitHandler} className="space-y-4">
        <FormInput
          id="username"
          label="Username"
          icon="👤"
          value={username}
          onChange={(event) => {
            setUsername(event.target.value);
            setUserSpan(usernameValidation(event.target.value));
          }}
          error={userSpan}
        />
        <FormInput
          id="email"
          label="Email"
          type="email"
          icon="✉️"
          value={email}
          onChange={(event) => {
            setEmail(event.target.value);
            setEMailSpan(emailValidation(event.target.value));
          }}
          error={emailSpan}
        />
        <FormInput
          id="mobile"
          label="Mobile"
          type="tel"
          icon="📱"
          value={mobile}
          onChange={(event) => {
            setMobile(event.target.value);
            setMobileSpan(mobileValidation(event.target.value));
          }}
          error={mobileSpan}
        />
        <FormInput
          id="password"
          label="Password"
          type="password"
          icon="🔒"
          value={password}
          onChange={(event) => {
            setPassword(event.target.value);
            setPasswordSpan(passwordValidation(event.target.value));
          }}
          error={passwordSpan}
        />

        <div className="flex items-start gap-2">
          <input
            id="terms"
            type="checkbox"
            checked={checkbox}
            onChange={(event) => {
              setCheckbox(event.target.checked);
              setCheckboxSpan(checkboxValidation(event.target.checked));
            }}
            className="mt-1 h-4 w-4 rounded border-gray-300 text-teal-600"
          />
          <label htmlFor="terms" className="text-sm text-gray-600">
            I agree to the Terms &amp; Conditions
          </label>
        </div>
        {checkboxSpan && <p className={errorClass}>{checkboxSpan}</p>}

        {submitError && (
          <div className="rounded-xl bg-red-50 p-3 text-sm text-red-600">{submitError}</div>
        )}

        <button type="submit" disabled={isSubmitting} className="btn-primary w-full">
          {isSubmitting ? "Creating account..." : "Register"}
        </button>
      </form>

      <p className="mt-8 text-center text-sm text-gray-500">
        Already have an account?{" "}
        <Link to="/login-page" className="font-semibold text-teal-600 hover:text-teal-500">
          Login here
        </Link>
      </p>
    </AuthLayout>
  );
};

export default RegisterScreenComponent;

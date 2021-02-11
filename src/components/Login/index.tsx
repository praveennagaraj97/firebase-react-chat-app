import { useState, useEffect } from "react";
import { Button, Jumbotron } from "react-bootstrap";

import { firebaseAuth } from "../../firebase";
import firebase from "firebase/app";

import "./login.css";

declare const window: any;

export default function Login() {
  const [phoneNumber, setPhoneNumber] = useState("+91");
  const [error, setError] = useState(null);
  const [response, setResponse] = useState(null);
  const [captchaVerified, setCaptchaVerified] = useState(false);
  const [showOTP, setShowOTP] = useState(false);
  const [otp, setOtp] = useState("");

  useEffect(() => {
    let isCancelled: boolean = false;
    try {
      window.recaptchaVerifierResend = new firebase.auth.RecaptchaVerifier(
        "captcha-container",
        {
          size: "normal",
          callback: function () {
            setCaptchaVerified(true);
          },
          "expired-callback": function () {
            setCaptchaVerified(false);
          },
        }
      );

      if (!isCancelled) window.recaptchaVerifierResend.render();
    } catch (e) {
      // window.location.reload();
    }

    return () => {
      isCancelled = true;
    };
  }, []);

  return (
    <Jumbotron className="login-box">
      <h1 className="login-title">Login</h1>

      <form
        onSubmit={(e) => {
          e.preventDefault();
          if (showOTP) {
            oTPConfirm(otp, response);
          } else {
            handleLogin(
              Number(phoneNumber.split("+")[1]),
              setError,
              setResponse,
              setShowOTP
            );
          }
        }}
      >
        <div>
          <label htmlFor="contact-num">
            {showOTP ? "Enter OTP" : "Phone Number"} :{" "}
          </label>
          {showOTP ? (
            <input
              type="tel"
              value={otp}
              onChange={(e) => {
                setOtp(e.target.value);
              }}
            />
          ) : (
            <input
              type="tel"
              name="contact-num"
              value={phoneNumber}
              onChange={(e) => {
                setPhoneNumber(e.target.value);
              }}
            />
          )}
        </div>
        {error && <p className={"text-info text-center"}>{error}</p>}
        {!showOTP && <div id="captcha-container" />}
        <div className="login-btn">
          <Button disabled={!captchaVerified} type="submit" variant="success">
            {showOTP ? "Confirm" : "Login"}
          </Button>
        </div>
      </form>
    </Jumbotron>
  );
}

function errorSettor(error: string, setError: Function): void {
  setError(error);
  setTimeout(() => {
    setError(null);
  }, 2000);
}

async function handleLogin(
  phoneNumber: number,
  setError: Function,
  setResponse: Function,
  setShowOTP: Function
): Promise<any> {
  if (String(phoneNumber).length !== 12) {
    errorSettor("Please enter 10 digit mobile number", setError);
  }

  if (String(phoneNumber).slice(0, 2) !== "91") {
    errorSettor("Please add 91 before your 10 digit number", setError);
  }

  const appVerifier = window.recaptchaVerifierResend;
  const response = await firebaseAuth.signInWithPhoneNumber(
    `+${phoneNumber}`,
    appVerifier
  );

  setResponse(response);
  setShowOTP(true);
}

async function oTPConfirm(otp: string, response: any): Promise<any> {
  await response.confirm(otp);
}

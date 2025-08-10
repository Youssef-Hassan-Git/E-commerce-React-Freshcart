import axios from "axios";
import { useFormik } from "formik";
import React, { useRef, useState } from "react";
import { FallingLines } from "react-loader-spinner";
import { useNavigate } from "react-router-dom";
import * as yup from "yup";

export default function VerifyForgotCode() {
  const [otp, setOtp] = useState(Array(6).fill("")); // Array with 6 empty strings
  const inputRefs = useRef([]); // Refs for inputs
  const [errorMessage, setErrorMessage] = useState(null);
  const [isSuccess, setIsSuccess] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const navigate = useNavigate();

  // Handle each input change
  const handleInput = (e, index) => {
    const { value } = e.target;
    if (!/^[0-9]?$/.test(value)) return;

    const updatedOtp = [...otp];
    updatedOtp[index] = value;
    setOtp(updatedOtp);

    // Update Formik field
    verifyCodeForm.setFieldValue("resetCode", updatedOtp.join(""));

    // Move focus to next box
    if (value && index < otp.length - 1) {
      inputRefs.current[index + 1].focus();
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputRefs.current[index - 1].focus();
    }
  };

  const handlePaste = (e) => {
    e.preventDefault();
    const text = e.clipboardData.getData("text");
    if (!new RegExp(`^[0-9]{${otp.length}}$`).test(text)) return;

    setOtp(text.split(""));
    verifyCodeForm.setFieldValue("resetCode", text);
  };

  // Formik setup
  const verifyCodeForm = useFormik({
    initialValues: {
      resetCode: "",
    },
    validationSchema: yup.object().shape({
      resetCode: yup
        .string()
        .length(6, "Code must be 6 digits")
        .required("Verification Code is required"),
    }),
    onSubmit: (values) => {
      setIsSubmitted(true);
      axios
        .post(
          "https://ecommerce.routemisr.com/api/v1/auth/verifyResetCode",
          values
        )
        .then((res) => {
          setIsSubmitted(false);
          setIsSuccess(true);
          setTimeout(() => {
            navigate("/resetpassword");
          }, 3000);
        })
        .catch((err) => {
          setIsSubmitted(false);
          setErrorMessage(err?.response?.data?.message);
          setTimeout(() => {
            setErrorMessage(null);
          }, 4000);
        });
    },
  });

  return (
    <div className="container mx-auto">
      <div className="md:flex flex-row items-center justify-center gap-3 py-10">
        <div className="md:w-[70%]">
          <div className="p-6 bg-white shadow-2xl shadow-gray-400 rounded-xl">
            <form id="otp-form" onSubmit={verifyCodeForm.handleSubmit}>
              <h2 className="text-2xl font-bold text-emerald-600 text-center">
                <i className="fa-solid fa-key text-emerald-400 text-xl m-1"></i>
                Verify Code
              </h2>
              <p className="text-emerald-700 text-center m-3">
                Please enter the verification code sent to your email.
              </p>

              {/* OTP inputs */}
              <div className="flex justify-center gap-2 m-4">
                {otp.map((digit, index) => (
                  <input
                    key={index}
                    type="text"
                    maxLength={1}
                    value={digit}
                    onChange={(e) => handleInput(e, index)} // fixed handler
                    onKeyDown={(e) => handleKeyDown(e, index)}
                    onPaste={handlePaste}
                    ref={(el) => (inputRefs.current[index] = el)}
                    className="text-center m-2 border-2 focus:outline-none focus:ring-2 focus:ring-emerald-500 transition p-2 rounded-2xl border-emerald-500 w-12 text-lg"
                  />
                ))}
              </div>

              {/* Validation error */}
              {verifyCodeForm.errors.resetCode &&
              verifyCodeForm.touched.resetCode ? (
                <div
                  className="flex items-center p-4 mb-4 text-sm text-red-800 border-b border-red-300 rounded-lg bg-red-50 m-3"
                  role="alert"
                >
                  <svg
                    className="shrink-0 inline w-4 h-4 me-3"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z" />
                  </svg>
                  <div>{verifyCodeForm.errors.resetCode}</div>
                </div>
              ) : null}

              {/* Submit button */}
              <button
                disabled={!verifyCodeForm.isValid || isSubmitted}
                className="bg-emerald-500 text-center hover:bg-emerald-600 rounded-xl shadow-lg shadow-gray-300 px-5 py-3 text-white w-full mt-3"
              >
                {isSubmitted ? (
                  <div className="flex justify-center items-center">
                    <FallingLines
                      color="#fff"
                      width="30"
                      visible={true}
                      ariaLabel="falling-circles-loading"
                    />
                  </div>
                ) : (
                  "Submit Code"
                )}
              </button>

              {/* Error message */}
              {errorMessage && (
                <div
                  className="flex items-center p-4 mb-4 text-sm text-red-800 border border-red-300 rounded-lg bg-red-50 m-3"
                  role="alert"
                >
                  <svg
                    className="shrink-0 inline w-4 h-4 me-3"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z" />
                  </svg>
                  <div>{errorMessage}</div>
                </div>
              )}

              {/* Success message */}
              {isSuccess && (
                <div
                  className="flex items-center p-4 mb-4 text-sm text-green-800 border border-green-300 rounded-lg bg-green-50 m-3"
                  role="alert"
                >
                  <i className="fa-solid fa-check text-white bg-green-500 rounded-md p-1.5 me-2"></i>
                  <div>
                    <p>Code verified successfully!</p>
                  </div>
                </div>
              )}
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

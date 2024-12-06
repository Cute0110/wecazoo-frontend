"use client";

import React, { useState } from "react";
import { ChevronDownIcon } from "lucide-react";
import Link from "next/link";

const AuthScreen = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
    ageConfirmation: false,
    emailConfirmation: false,
  });
  // const router = useRouter();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // Specify the type
    const { name, type, checked, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: type === "checkbox" ? checked : value, // Handle checkbox and text input
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    // Specify the type
    e.preventDefault();
    console.log("Form submitted:", formData);
    // Handle authentication logic here
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-xl bg-white rounded-lg shadow-md p-12">
        <div className="flex mb-4 rounded-[10px] overflow-clip">
          <button
            className={`text-white text-sm flex-1 py-3 ${
              isLogin ? "bg-background " : "bg-muted"
            }`}
            onClick={() => setIsLogin(true)}
          >
            Login
          </button>
          <button
            className={`text-white text-sm flex-1 py-3 ${
              !isLogin ? "bg-background " : "bg-muted"
            }`}
            onClick={() => setIsLogin(false)}
          >
            Sign up
          </button>
        </div>
        <form onSubmit={handleSubmit}>
          <h2 className="text-background text-2xl font-medium text-center mb-4">
            {isLogin ? "Login" : "Sign up"}
          </h2>
          {!isLogin && (
            <div className="mb-4">
              <label
                htmlFor="fullName"
                className="block mb-2 text-background font-semibold"
              >
                Full Name
              </label>
              <input
                type="text"
                id="fullName"
                name="fullName"
                value={formData.fullName}
                onChange={handleInputChange}
                className="w-full p-2 border rounded-xl"
                required
              />
            </div>
          )}
          <div className="mb-4">
            <label
              htmlFor="email"
              className="block mb-2  text-background font-semibold"
            >
              Email Address
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              className="w-full p-2 border rounded-xl"
              required
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="password"
              className="block mb-2  text-background font-semibold"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleInputChange}
              className="w-full p-2 border rounded-xl"
              required
            />
            {isLogin && (
              <Link
                href="#"
                className="text-sm text-[#1BB96B] block text-right font-semibold mt-1"
              >
                Forgot password?
              </Link>
            )}
          </div>
          {!isLogin && (
            <div className="mb-4">
              <label
                htmlFor="confirmPassword"
                className="block mb-2  text-background font-semibold"
              >
                Confirm Password
              </label>
              <input
                type="password"
                id="confirmPassword"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleInputChange}
                className="w-full p-2 border rounded-xl"
                required
              />
            </div>
          )}
          {!isLogin && (
            <div>
              <label
                htmlFor="referralCode"
                className="mb-1 flex items-center gap-1 cursor-pointer text-muted"
              >
                <span className="">Enter Referral/Promo Code</span>
                <ChevronDownIcon size={16} />
              </label>
              <input
                id="referralCode"
                type="text"
                placeholder="Referral/Promo Code"
                className="w-full p-2 border rounded-xl"
              />
              <div className="flex items-center mt-4 mb-2">
                <input
                  type="checkbox"
                  id="ageConfirmation"
                  name="ageConfirmation"
                  checked={formData.ageConfirmation}
                  onChange={handleInputChange}
                  className="mr-2"
                  required
                />
                <label
                  htmlFor="ageConfirmation"
                  className="text-background font-normal text-sm"
                >
                  I confirm I'm 18 years or older
                </label>
              </div>
              <div className="mb-4 flex items-center">
                <input
                  type="checkbox"
                  id="emailConfirmation"
                  name="emailConfirmation"
                  checked={formData.emailConfirmation}
                  onChange={handleInputChange}
                  className="mr-2"
                  required
                />
                <label
                  htmlFor="emailConfirmation"
                  className="text-background font-normal text-sm"
                >
                  I opt-in for promotional emails from Wecazoo
                </label>
              </div>
            </div>
          )}

          <button
            type="submit"
            className="w-full bg-green-500 text-white text-[22px] font-medium py-3 rounded-[10px] hover:bg-green-600"
          >
            {isLogin ? "Login" : "Sign Up"}
          </button>
        </form>
        <p className="mt-4 text-sm mx-auto max-w-md text-center text-background">
          By clicking {isLogin ? "Login" : "Sign Up"}, you agree to our{" "}
          <Link href="#" className="text-[#1BB96B]">
            terms of service{" "}
          </Link>
          and that you have read our{" "}
          <Link href="/privacy" className="text-[#1BB96B]">
            privacy policy
          </Link>
          .
        </p>
      </div>
    </div>
  );
};

export default AuthScreen;

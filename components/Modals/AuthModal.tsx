"use client";

import React, { useEffect, useState } from "react";
import { signInWithPopup } from "firebase/auth";
import { auth, googleProvider } from "@/lib/firebase";
import { ChevronDownIcon, Eye, EyeOff } from "lucide-react";
import Link from "next/link";
import { Modal } from "antd";
import axiosInstance from "@/lib/action";
import { useAuth } from "@/lib/authContext";
import { notification } from 'antd';
import type { NotificationArgsProps } from 'antd';
import { eot, dot } from '@/lib/cryptoUtils';
import CustomerSupport from "./CustomerSupport";
import GoogleImg from '@/public/images/google.svg';

type NotificationPlacement = NotificationArgsProps['placement'];
type NotificationType = 'success' | 'info' | 'warning' | 'error';

const AuthModal = ({ isModalOpen, onModalClose, modalType }: any) => {
    const [isLogin, setIsLogin] = useState(modalType);
    const [isLoading, setIsLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [showSupportModal, setShowSupportModal] = useState(false);
    const [formData, setFormData] = useState({
        fullName: "",
        email: "",
        password: "",
        confirmPassword: "",
        promoCode: "",
        termsConfirmation: true,
        ageConfirmation: false,
        emailConfirmation: false,
    });

    const { setIsAuthenticated, setAuthData } = useAuth();
    const [api, contextHolder] = notification.useNotification();

    useEffect(() => {
        setIsLogin(modalType);
    }, [modalType]);

    const openNotification = (type: NotificationType, title: any, content: any, placement: NotificationPlacement) => {
        api[type]({
            message: title,
            description: content,
            duration: 2,
            placement,
        });
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, type, checked, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: type === "checkbox" ? checked : value,
        }));
    };

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        setIsLoading(true);

        if (isLogin) {
            try {
                const response = await axiosInstance.post('/api/login', eot({ emailAddress: formData.email, password: formData.password }));
                const res = dot(response.data);
                if (res.status == 1) {
                    openNotification('success', 'Success', 'Logged In successfully!', 'topRight');
                    const token = res.token;
                    localStorage.setItem('authToken', token);
                    setIsAuthenticated(true);
                    setAuthData(res.userData);
                    onModalClose();
                } else {
                    openNotification('error', 'Error', res.msg, 'topRight');
                }
            } catch (error) {
                openNotification('error', 'Error', "Login Failed!", 'topRight');
            } finally {
                setIsLoading(false);
            }
        } else {
            try {
                const response = await axiosInstance.post('/api/register', eot({ emailAddress: formData.email, password: formData.password, promoCode: formData.promoCode }));
                const res = dot(response.data);
                if (res.status == 1) {
                    openNotification('success', 'Success', 'Registered successfully!', 'topRight');
                    setIsLogin(true);
                } else {
                    openNotification('error', 'Error', res.msg, 'topRight');
                }
            } catch (error) {
                openNotification('error', 'Error', "Register Failed!", 'topRight');
            } finally {
                setIsLoading(false);
            }
        }
    };

    const handleOk = () => {
        onModalClose();
    };

    const handleCancel = () => {
        onModalClose();
    };


    const signInWithGoogle = async () => {
        setIsLoading(true);
        try {
            const result = await signInWithPopup(auth, googleProvider);

            try {
                const response = await axiosInstance.post('/api/google_login', eot({ emailAddress: result.user.email, password: "", promoCode: formData.promoCode }));
                const res = dot(response.data);
                if (res.status == 1) {
                    openNotification('success', 'Success', 'Logged In successfully!', 'topRight');
                    const token = res.token;
                    localStorage.setItem('authToken', token);
                    setIsAuthenticated(true);
                    setAuthData(res.userData);
                    onModalClose();
                } else {
                    openNotification('error', 'Error', res.msg, 'topRight');
                }
            } catch (error) {
                openNotification('error', 'Error', "Login Failed!", 'topRight');
            } finally {
                setIsLoading(false);
            }
        } catch (error) {
            openNotification('error', 'Error', "Login Failed!", 'topRight');
        } finally {
            setIsLoading(false);
        }
    }

    return (
        <>
            {contextHolder}
            <Modal centered open={isModalOpen} onOk={handleOk} onCancel={handleCancel} footer={null}>
                <div className="flex flex-col items-center bg-[#060019]">
                    <div className="w-full max-w-xl h-full bg-[#060019] rounded-lg shadow-md p-12">
                        <form onSubmit={handleSubmit}>
                            <h2 className="text-white text-2xl font-bold text-center">
                                {isLogin ? "Welcome Back" : "Welcome to Wecazoo"}
                            </h2>
                            <h1 className="text-gray-400 text-lg text-center mb-4">
                                {isLogin ? "Sign In to Access Your Account" : "Sign Up to Get Started"}
                            </h1>
                            <button
                                className="flex justify-center items-center w-full gap-4 border border-gray-600 h-14 rounded-md"
                                onClick={signInWithGoogle}
                                type="button"
                                disabled={!formData.termsConfirmation || isLoading}
                            >
                                {isLoading ?
                                    <div className="h-full w-full flex items-center justify-center">
                                        <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-white" />
                                    </div>
                                    :
                                    <>
                                        <img src={"/images/google.svg"} className="h-6 w-auto text-gray-300" />
                                        <span className={`font-bold text-lg ${formData.termsConfirmation ? "text-white" : "text-gray-600"} `}>Sign in with Google</span>
                                    </>
                                }
                            </button>
                            <div className="my-4 text-white">
                                By using Wecazoo, you agree to the<span className="underline cursor-pointer ml-[4px]">Terms & Conditions</span> .
                            </div>
                            <div className="flex items-center w-full gap-4 mb-4">
                                <div className="border-t-[1px] border-gray-600 flex-1"></div>
                                <span className="text-gray-600">or</span>
                                <div className="border-t-[1px] border-gray-600 flex-1"></div>
                            </div>
                            <div className="mb-4">
                                <label
                                    htmlFor="email"
                                    className="block mb-2 text-white font-semibold"
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
                                    className="block mb-2 text-white font-semibold"
                                >
                                    Password
                                </label>
                                <div className="relative">
                                    <input
                                        type={showPassword ? "text" : "password"}
                                        id="password"
                                        name="password"
                                        value={formData.password}
                                        onChange={handleInputChange}
                                        className="w-full p-2 border rounded-xl pr-10"
                                        required
                                    />
                                    <button
                                        type="button"
                                        onClick={togglePasswordVisibility}
                                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-600 hover:text-gray-800"
                                    >
                                        {showPassword ? (
                                            <EyeOff className="h-5 w-5" />
                                        ) : (
                                            <Eye className="h-5 w-5" />
                                        )}
                                    </button>
                                </div>
                                {isLogin && (
                                    <button
                                        type="button"
                                        onClick={() => setShowSupportModal(true)}
                                        className="text-sm text-[#1BB96B] block text-right font-semibold mt-1 hover:text-[#148F53]"
                                    >
                                        Forgot password?
                                    </button>
                                )}
                            </div>
                            {!isLogin && (
                                <div>
                                    <div className="mb-4">
                                        <label
                                            htmlFor="promoCode"
                                            className="block mb-2 text-white font-semibold"
                                        >
                                            Promo Code (optional)
                                        </label>
                                        <input
                                            type="text"
                                            id="promoCode"
                                            name="promoCode"
                                            placeholder="Promo Code"
                                            value={formData.promoCode}
                                            onChange={handleInputChange}
                                            className="w-full p-2 border rounded-xl"
                                        />
                                    </div>
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
                                            className="text-white font-normal text-sm"
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
                                            className="text-white font-normal text-sm"
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
                                {isLoading ?
                                    <div className="h-full w-full flex items-center justify-center">
                                        <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-white" />
                                    </div> :
                                    <span>
                                        {isLogin ? "Sign In" : "Sign Up"}
                                    </span>
                                }
                            </button>
                        </form>
                        {isLogin ?
                            <p className="mt-4 text-sm mx-auto max-w-md text-center text-white">
                                New to Wecazoo?{" "}
                                <span onClick={() => setIsLogin(false)} className="text-[#1BB96B] cursor-pointer hover:text-[#148F53]">
                                    Create account
                                </span>
                            </p> :
                            <p className="mt-4 text-sm mx-auto max-w-md text-center text-white">
                                Already have an account?{" "}
                                <span onClick={() => setIsLogin(true)} className="text-[#1BB96B] cursor-pointer hover:text-[#148F53]">
                                    Sign In
                                </span>
                            </p>
                        }
                    </div>
                </div>
            </Modal>

            <CustomerSupport
                isModalOpen={showSupportModal}
                onModalClose={() => setShowSupportModal(false)}
                modalTitle="Password Reset"
            />
        </>
    );
};

export default AuthModal;
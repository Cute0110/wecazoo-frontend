"use client";

import React, { useEffect, useState } from "react";
import { ChevronDownIcon } from "lucide-react";
import Link from "next/link";
import { Modal } from "antd";
import axiosInstance from "@/lib/action";
import { useAuth } from "@/lib/authContext";
import { notification } from 'antd';
import type { NotificationArgsProps } from 'antd';
import { eot, dot } from '@/lib/cryptoUtils';

type NotificationPlacement = NotificationArgsProps['placement'];
type NotificationType = 'success' | 'info' | 'warning' | 'error';

const AuthModal = ({ isModalOpen, onModalClose, modalType }: any) => {
    const [isLogin, setIsLogin] = useState(modalType);
    const [formData, setFormData] = useState({
        fullName: "",
        email: "",
        password: "",
        confirmPassword: "",
        promoCode: "",
        ageConfirmation: false,
        emailConfirmation: false,
    });
    // const router = useRouter();
    const { setIsAuthenticated, setAuthData } = useAuth();
    const [api, contextHolder] = notification.useNotification();

    const openNotification = (type: NotificationType, title: any, content: any, placement: NotificationPlacement) => {
        api[type]({
            message: title,
            description: content,
            duration: 2,
            placement,
        });
    };

    useEffect(() => {
        setIsLogin(modalType);
    }, [modalType]);

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
                openNotification('error', 'Error', "Network error!", 'topRight');
            }
        } else {
            try {

                const response = await axiosInstance.post('/api/register', eot({ emailAddress: formData.email, password: formData.password, promoCode: formData.promoCode }));
                const res = dot(response.data);
                if (res.status == 1) {
                    openNotification('success', 'Success', 'Registerd successfully!', 'topRight');
                    setIsLogin(true);
                } else {
                    openNotification('error', 'Error', res.msg, 'topRight');
                }
            } catch (error) {
                openNotification('error', 'Error', "Network error!", 'topRight');
            }
        }

        // Handle authentication logic here
    };

    const handleOk = () => {
        onModalClose();
    };

    const handleCancel = () => {
        onModalClose();
    };

    return (
        <>
            {contextHolder}
            <Modal centered open={isModalOpen} onOk={handleOk} onCancel={handleCancel} footer={null}>
                <div className="flex flex-col items-center bg-[#060019]">
                    <div className="w-full max-w-xl h-full bg-[#060019] rounded-lg shadow-md p-12">
                        <form onSubmit={handleSubmit}>
                            <h2 className="text-white text-2xl font-medium text-center mb-4">
                                {isLogin ? "Sign In" : "Sign Up"}
                            </h2>
                            {/* {!isLogin && (
                            <div className="mb-4">
                                <label
                                    htmlFor="fullName"
                                    className="block mb-2 text-white font-semibold"
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
                        )} */}
                            <div className="mb-4">
                                <label
                                    htmlFor="email"
                                    className="block mb-2  text-white font-semibold"
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
                                    className="block mb-2  text-white font-semibold"
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
                            {/* {!isLogin && (
                            <div className="mb-4">
                                <label
                                    htmlFor="confirmPassword"
                                    className="block mb-2  text-white font-semibold"
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
                        )} */}
                            {!isLogin && (
                                <div>
                                    <div className="mb-4">
                                        <label
                                            htmlFor="promoCode"
                                            className="block mb-2  text-white font-semibold"
                                        >
                                            Promo Code (optional)
                                        </label>
                                        <input
                                            type="promoCode"
                                            id="promoCode"
                                            name="promoCode"
                                            placeholder="Promo Code"
                                            value={formData.promoCode}
                                            onChange={handleInputChange}
                                            className="w-full p-2 border rounded-xl"
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
                                    {/* <label
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
                                /> */}
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
                                {isLogin ? "Login" : "Sign Up"}
                            </button>
                        </form>
                        {isLogin ?
                            <p className="mt-4 text-sm mx-auto max-w-md text-center text-white">
                                New to Wecazoo?{" "}
                                <span onClick={() => setIsLogin(false)} className="text-[#1BB96B] cursor-pointer">
                                    Create account
                                </span>
                            </p> :
                            <p className="mt-4 text-sm mx-auto max-w-md text-center text-white">
                                Already have an account?{" "}
                                <span onClick={() => setIsLogin(true)} className="text-[#1BB96B] cursor-pointer">
                                    Sign In
                                </span>
                            </p>
                        }
                        {/* <p className="mt-4 text-sm mx-auto max-w-md text-center text-white">
                        By clicking {isLogin ? "Login" : "Sign Up"}, you agree to our{" "}
                        <Link href="#" className="text-[#1BB96B]">
                            terms of service{" "}
                        </Link>
                        and that you have read our{" "}
                        <Link href="/privacy" className="text-[#1BB96B]">
                            privacy policy
                        </Link>
                        .
                    </p> */}
                    </div>
                </div>
            </Modal>
        </>
    );
};

export default AuthModal;

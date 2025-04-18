import React, { useEffect, useState } from 'react';
import { Checkbox, Input, InputNumber, Modal, notification, Select, Slider } from 'antd';
import { v4 as uuidv4 } from 'uuid';

const CreateModal = ({ selectedData, isModalOpen, setIsModalOpen, modalTitle, onTransactionConfirm }: any) => {
    const [payVal, setPayVal] = useState(1);
    const [api, contextHolder] = notification.useNotification();

    type NotificationType = 'success' | 'info' | 'warning' | 'error';

    const openNotification = (type: NotificationType, placement: any, title: any, content: any) => {
        api[type]({
            message: title,
            description: content,
            placement,
            duration: 2,
        });
    };

    const handleOk = async () => {
        if (payVal > selectedData.profit) {
            openNotification("warning", "top", "Warning", "Payout amount is bigger than profit!");
        } else {
            onTransactionConfirm(selectedData.id, payVal);
            setIsModalOpen(false);
            setPayVal(1);
        }
    };

    const handleCancel = () => {
        setIsModalOpen(false);
        setPayVal(1);
    };

    const onPayAmountChange = (value: any) => {
        setPayVal(value);
    };

    return (
        <>
            {contextHolder}
            <div className={`${isModalOpen ? "opacity-100 visible" : "opacity-0 invisible"} w-[100vw] flex justify-center z-[999] fixed top-0 left-0 transition-opacity duration-300 ease-in-out`}>
                <div className={`absolute z-20 w-[400px] max-h-[80vh] overflow-y-auto bg-white dark:bg-boxdark-2 mt-[100px] p-[20px] rounded-md update-provider-modal-margin-left no-scrollbar transform transition-all duration-300 ease-in-out ${isModalOpen ? "translate-y-0 opacity-100" : "-translate-y-10 opacity-0"}`} >
                    <div className="relative pb-2 overflow-y-auto px-2">
                        <h2 className="text-base font-semibold leading-7 text-gray-900">Pay Influencer</h2>
                        <div className="my-4 border border-b-1 w-full border-[#313D4A]"></div>
                        <div className="mt-2 grid grid-cols-2 gap-x-6 gap-y-8 mb-4">
                            <div>
                                <label className="block text-sm font-medium leading-6 text-gray-900">Name</label>
                                <div className="mt-2">
                                    <input
                                        type="name"
                                        id="name"
                                        name="name"
                                        placeholder="Input name"
                                        value={selectedData?.name}
                                        className="w-full p-2 border rounded-xl bg-[#FFF] text-black cursor-not-allowed"
                                        disabled={true}
                                    />
                                </div>
                            </div>
                            <div>
                                <label className="block text-sm font-medium leading-6 text-gray-900">Profit</label>
                                <div className="mt-2">
                                    <input
                                        type="profit"
                                        id="profit"
                                        name="profit"
                                        placeholder="profit"
                                        value={selectedData?.profit}
                                        className="w-full p-2 border rounded-xl bg-[#FFF] text-black cursor-not-allowed"
                                        disabled={true}
                                    />
                                </div>
                            </div>
                        </div>
                        <div className="mt-2 grid grid-cols-2 gap-x-6 gap-y-8 mb-4">
                            <div>
                                <label className="block text-sm font-medium leading-6 text-gray-900">Payout Amount</label>
                                <InputNumber<number>
                                    min={0}
                                    max={selectedData?.profit}
                                    className="dark:bg-boxdark dark:placeholder:text-white dark:border-none"
                                    value={payVal}
                                    style={{ width: "100%" }}
                                    parser={(value) => value?.replace('%', '') as unknown as number}
                                    onChange={onPayAmountChange}
                                />
                            </div>
                        </div>
                        <div className="my-4 border border-b-1 w-full border-[#313D4A]"></div>
                        <div className='mt-6 flex items-center justify-end gap-x-2'>
                            <div className="flex items-center justify-end gap-x-2">
                                <button onClick={handleCancel} type="button" className="rounded-md mr-2 border border-1 border-[rgb(247,79,117)] px-3 py-2 text-sm font-semibold text-[rgb(247,79,117)] hover:bg-[rgb(247,79,117)] hover:text-white">
                                    Cancel
                                </button>
                                <button onClick={handleOk} type="button" className="rounded-md mr-2 border border-1 border-[#1677ff] px-3 py-2 text-sm font-semibold text-[#1677ff] hover:bg-[#1677ff] hover:text-white">
                                    Confirm
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
                <div onClick={handleCancel} className={`fixed z-10 bg-black dark:bg-white transform transition-all duration-300 ease-in-out ${isModalOpen ? "opacity-50" : "opacity-0"}`} style={{ width: "calc(100vw)", height: "calc(100vh)" }}></div>
            </div>
        </>
    );
};

export default CreateModal;
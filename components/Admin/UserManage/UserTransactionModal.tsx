import React, { useEffect, useState } from 'react';
import { Checkbox, Input, InputNumber, notification, Select, Slider } from 'antd';

const UserTransactionModal = ({ selectedUserData, isModalOpen, setIsModalOpen, onUserTransactionConfirm }: any) => {
    const [amountVal, setAmountVal] = useState(0);
    const [chargeType, setChargeType] = useState(1);
    
    const [api, contextHolder] = notification.useNotification();

    const chargeTypeArrays = ["Withdraw", "Deposit"];
    type NotificationType = 'success' | 'info' | 'warning' | 'error';

    const openNotification = (type: NotificationType, placement: any, title: any, content: any) => {
        api[type]({
            message: title,
            description: content,
            placement,
            duration: 2,
        });
    };

    const handleOk = () => {
        if (amountVal != 0) {
            const newBalance = chargeType == 1 ? selectedUserData.balance + amountVal : selectedUserData.balance - amountVal;
            onUserTransactionConfirm(selectedUserData.id, newBalance, amountVal, chargeType);
            setIsModalOpen(false);
            setAmountVal(0);
            setChargeType(1);
        } else {
            openNotification('warning', 'top', 'Warning', 'Please input correct amount');
        }
    };

    const handleCancel = () => {
        setIsModalOpen(false);
        setAmountVal(0);
        setChargeType(1);
    };

    const onSelectChange = (value: any) => {
        setChargeType(value);
        setAmountVal(0);
    };

    const onDepositAmountChange = (value: any) => {
        setAmountVal(value);
    };

    const onWithDrawAmountChange = (value: any) => {
        setAmountVal(value);
    };

    return (
        <>
            {contextHolder}
            {selectedUserData ?
                <div className={`${isModalOpen ? "opacity-100 visible" : "opacity-0 invisible"} w-[100vw] flex justify-center z-[999] fixed top-0 left-0 transition-opacity duration-300 ease-in-out`}>
                    <div className={`absolute z-20 w-[400px] max-h-[80vh] overflow-y-auto bg-white dark:bg-boxdark-2 mt-[100px] p-[20px] rounded-md update-provider-modal-margin-left no-scrollbar transform transition-all duration-300 ease-in-out ${isModalOpen ? "translate-y-0 opacity-100" : "-translate-y-10 opacity-0"}`} >
                        <div className="relative pb-2 overflow-y-auto px-2">
                            <h2 className="text-base font-semibold leading-7 text-gray-900">User Exchange</h2>
                            <div className="my-4 border border-b-1 w-full border-[#313D4A]"></div>
                            <div className='text-black'>User Balance : {selectedUserData.balance}$</div>
                            <div className="mt-2 grid grid-cols-2 gap-x-6 gap-y-8 mb-4">
                                <div>
                                    <label className="block text-sm font-medium leading-6 text-gray-900">Balance</label>
                                    {chargeType == 1 ?
                                        <div className="mt-2">
                                            <InputNumber<number>
                                                min={0}
                                                max={1000}
                                                className="dark:bg-boxdark dark:placeholder:text-white dark:border-none"
                                                value={amountVal}
                                                style={{ width: "100%" }}
                                                parser={(value) => value?.replace('%', '') as unknown as number}
                                                onChange={onDepositAmountChange}
                                            />
                                        </div>
                                        : <div className="mt-2">
                                            <InputNumber<number>
                                                min={0}
                                                max={selectedUserData.balance}
                                                className="dark:bg-boxdark dark:placeholder:text-white dark:border-none"
                                                value={amountVal}
                                                style={{ width: "100%" }}
                                                parser={(value) => value?.replace('%', '') as unknown as number}
                                                onChange={onWithDrawAmountChange}
                                            />
                                        </div>}
                                </div>
                                <div>
                                    <label className="block text-sm font-medium leading-6 text-gray-900">Type</label>
                                    <div className="mt-2">
                                        <Select
                                            placeholder="Select currency"
                                            value={chargeType}
                                            style={{ width: "100%" }}
                                            options={chargeTypeArrays.map((item: any, index: any) => ({ label: item, value: index }))}
                                            onSelect={onSelectChange}
                                        />
                                    </div>
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
                </div> : ""}
        </>
    );
};

export default UserTransactionModal;
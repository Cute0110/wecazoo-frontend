import React, { useEffect, useState } from 'react';
import { Checkbox, Input, InputNumber, Modal, notification, Select, Slider } from 'antd';
import { v4 as uuidv4 } from 'uuid';

const CreateModal = ({ isModalOpen, setIsModalOpen, modalTitle, onCreate }: any) => {
    const [nameVal, setNameVal] = useState("");
    const [promoCodeVal, setPromoCodeVal] = useState("");

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

    const handleOk = async () => {
        if (nameVal != "" && promoCodeVal != "") {
            onCreate(nameVal, promoCodeVal);
            setIsModalOpen(false);
            setNameVal("");
            setPromoCodeVal("");
        } else {
            if (nameVal == "") {
                openNotification('warning', 'top', 'Warning', 'Please input name!');
            } else if (promoCodeVal == "") {
                openNotification('warning', 'top', 'Warning', 'Please generate code!');
            }
        }
    };

    const handleCancel = () => {
        setIsModalOpen(false);
        setNameVal("");
        setPromoCodeVal("");
    };

    const onNameChange = (event: any) => {
        setNameVal(event.target.value);
    };

    const onCodeGenerate = () => {
        const randomUUID = uuidv4().slice(9, 23);
        setPromoCodeVal(randomUUID);
    }

    return (
        <>
            {contextHolder}
            <Modal title={modalTitle} centered open={isModalOpen} onOk={handleOk} onCancel={handleCancel} footer={null} width="500px">
                <div className='h-[300px] overflow-y-auto'>
                    <div className="my-4 border border-b-1 w-full border-[#313D4A]"></div>
                    <div className="mt-2 grid grid-cols-2 gap-x-6 gap-y-8 mb-4">
                        <div>
                            <label className="block text-sm font-medium leading-6 text-white">Name</label>
                            <div className="mt-2">
                                <input
                                    type="name"
                                    id="name"
                                    name="name"
                                    placeholder="Input name"
                                    value={nameVal}
                                    onChange={onNameChange}
                                    className="w-[400px] p-2 border rounded-xl bg-[#2A253A] text-white"
                                    required
                                />
                            </div>
                        </div>
                    </div>
                    <div className="mt-2 grid grid-cols-2 gap-x-6 gap-y-8 mb-4">
                        <div>
                            <label className="block text-sm font-medium leading-6 text-white">Promo Code</label>
                            <div className="flex items-center justify-start mt-2 w-[400px]">
                                <input
                                    type="name"
                                    id="name"
                                    name="name"
                                    placeholder="Generate promo code"
                                    value={promoCodeVal}
                                    className="w-[300px] p-2 border rounded-xl bg-[#2A253A] text-white cursor-not-allowed"
                                    required
                                    disabled={true}
                                />
                                <button onClick={onCodeGenerate} type="button" className="rounded-md ml-2 border border-1 border-[#4cbb17] px-3 py-2 text-sm font-semibold text-[#4cbb17] hover:bg-[#4cbb17] hover:text-white">
                                    Generate
                                </button>
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
            </Modal>
        </>
    );
};

export default CreateModal;
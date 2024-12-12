import React, { useEffect, useState } from 'react';
import { Checkbox, Input, InputNumber, Modal, notification, Select, Slider } from 'antd';
import { v4 as uuidv4 } from 'uuid';

const CreateModal = ({ selectedData, isModalOpen, setIsModalOpen, modalTitle, onTransactionConfirm }: any) => {
    const [payVal, setPayVal] = useState(1);
    const [api, contextHolder] = notification.useNotification();

    console.log(selectedData);

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
                                    value={selectedData?.name}
                                    className="p-2 border rounded-xl bg-[#2A253A] text-white"
                                    disabled={true}
                                />
                            </div>
                        </div>
                        <div>
                            <label className="block text-sm font-medium leading-6 text-white">Profit</label>
                            <div className="mt-2">
                                <input
                                    type="name"
                                    id="name"
                                    name="name"
                                    placeholder="Input name"
                                    value={selectedData?.profit.toFixed(2)}
                                    className="p-2 border rounded-xl bg-[#2A253A] text-white"
                                    disabled={true}
                                />
                            </div>
                        </div>
                    </div>
                    <div className="mt-2 grid grid-cols-2 gap-x-6 gap-y-8 mb-4">
                        <div>
                            <label className="block text-sm font-medium leading-6 text-white">Payout Amount</label>
                            <div className="flex items-center justify-start mt-2 w-[400px]">
                                <InputNumber<number>
                                    min={1}
                                    max={selectedData?.profit}
                                    className="dark:bg-boxdark dark:placeholder:text-white dark:border-none"
                                    value={payVal}
                                    style={{ width: "100%" }}
                                    parser={(value) => value?.replace('%', '') as unknown as number}
                                    onChange={onPayAmountChange}
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
            </Modal>
        </>
    );
};

export default CreateModal;
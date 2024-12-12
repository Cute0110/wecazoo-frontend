import React from 'react';
import {QuestionCircleOutlined} from '@ant-design/icons';

const DeleteConfirmModal = ({ isModalOpen, setIsModalOpen, onConfirmAction}: any) => {

    const handleOk = () => {
        setIsModalOpen(false);
        onConfirmAction();
    };

    const handleCancel = () => {
        setIsModalOpen(false);
    };

    return (
        <>
            <div className={`${isModalOpen ? "opacity-100 visible" : "opacity-0 invisible"} w-[100vw] flex justify-center z-[999] fixed top-0 left-0 transition-opacity duration-300 ease-in-out`}>
                <div className={`absolute z-20 w-[400px] max-h-[80vh] overflow-y-auto bg-white dark:bg-boxdark-2 mt-[100px] p-[20px] rounded-md no-scrollbar transform transition-all duration-300 ease-in-out ${isModalOpen ? "translate-y-0 opacity-100" : "-translate-y-10 opacity-0"}`} >
                    <div className="relative pb-2 overflow-y-auto px-2">
                        <h2 className="text-base leading-7 text-gray-900" style={{fontSize: "25px"}}> <QuestionCircleOutlined /> Delete Agent?</h2>
                        <div className="my-4 border border-b-1 w-full border-[#313D4A]"></div>
                        <span className="text-base leading-7 text-gray-900 text-[15px] pl-[30px]">Do you really want to delete?</span>
                    </div>
                    <div className='grid grid-cols-1 gap-4'>
                        <div className="flex items-center justify-end gap-x-2">
                            <button onClick={handleCancel} type="button" className="rounded-md mr-2 border border-1 border-[rgb(247,79,117)] px-3 py-2 text-sm font-semibold text-[rgb(247,79,117)] hover:bg-[rgb(247,79,117)] hover:text-white">
                                No
                            </button>
                            <button onClick={handleOk} type="button" className="rounded-md mr-2 border border-1 border-[#1677ff] px-3 py-2 text-sm font-semibold text-[#1677ff] hover:bg-[#1677ff] hover:text-white">
                                Yes
                            </button>
                        </div>
                    </div>
                </div>
                <div onClick={handleCancel} className={`fixed z-10 bg-black dark:bg-white transform transition-all duration-300 ease-in-out ${isModalOpen ? "opacity-50" : "opacity-0"}`} style={{ width: "calc(100vw)", height: "calc(100vh)" }}></div>
            </div>
        </>
    );
};

export default DeleteConfirmModal;
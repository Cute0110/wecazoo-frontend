import React, { useEffect, useState } from 'react';
import { Checkbox, Input, InputNumber, notification, Select, Slider } from 'antd';

const { TextArea } = Input;

const HeadTitle = ({ title, onSortClick, sortDir }: any) => {
    return (
        <span className='flex w-full cursor-pointer align-center items-center' onClick={() => onSortClick(title)}>{title}
            <span className="ant-table-column-sorter ant-table-column-sorter-full flex" style={{ marginLeft: 'auto' }}>
                <span className="ant-table-column-sorter-inner" aria-hidden="true">
                    <span role="img" aria-label="caret-up" className={`anticon anticon-caret-up ant-table-column-sorter-up ${sortDir == 1 ? "active" : ""}`}>
                        <svg viewBox="0 0 1024 1024" focusable="false" data-icon="caret-up" width="1em" height="1em" fill="currentColor" aria-hidden="true">
                            <path d="M858.9 689L530.5 308.2c-9.4-10.9-27.5-10.9-37 0L165.1 689c-12.2 14.2-1.2 35 18.5 35h656.8c19.7 0 30.7-20.8 18.5-35z">
                            </path>
                        </svg>
                    </span>
                    <span role="img" aria-label="caret-down" className={`anticon anticon-caret-down ant-table-column-sorter-down ${sortDir == 2 ? "active" : ""}`}>
                        <svg viewBox="0 0 1024 1024" focusable="false" data-icon="caret-down" width="1em" height="1em" fill="currentColor" aria-hidden="true">
                            <path d="M840.4 300H183.6c-19.7 0-30.7 20.8-18.5 35l328.4 380.8c9.4 10.9 27.5 10.9 37 0L858.9 335c12.2-14.2 1.2-35-18.5-35z">
                            </path>
                        </svg>
                    </span>
                </span>
            </span>
        </span>
    );
};

export default HeadTitle;
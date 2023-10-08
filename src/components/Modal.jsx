import React from 'react';

const Modal = ({ isOpen, onClose, children }) => {
    return (
        <>
            {isOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center">
                    <div className="fixed inset-0 bg-gray-500 opacity-75"></div>
                    <div className="relative bg-white w-1/2 rounded-lg shadow-lg">
                        <button className="absolute font-bold top-0 right-0 m-4 text-gray-700 hover:text-gray-900" onClick={onClose}>
                            X
                        </button>
                        <div className="p-4">{children}</div>
                    </div>
                </div>
            )}
        </>
    );
};

export default Modal;

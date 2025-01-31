import React, { useEffect } from 'react';

const PopUp = ({ open, onClose, onConfirm , children}) => {
    useEffect(() => {
        if (open) {
            document.body.style.overflow = 'hidden'; 
        } else {
            document.body.style.overflow = 'auto'; 
        }
        return () => {
            document.body.style.overflow = 'auto';
        };
    }, [open]);
    if (!open) return null;
    
    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm flex justify-center items-center z-50">
           {children}
        </div>
    );
};

export default PopUp;

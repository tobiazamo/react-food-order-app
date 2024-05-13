import {createPortal} from "react-dom";
import {useEffect, useRef} from "react";

export default function Modal({children, open, onClose, className = ''}) {
    const dialog = useRef(null);

    useEffect(() => {
        const currentDialog = dialog.current;

        if (open) {
            currentDialog.showModal();
        }

        return () => currentDialog.close();
    }, [open]);
    return (
        createPortal(
            <dialog ref={dialog} className={`modal ${className}`} onClose={onClose}>
                {children}
            </dialog>
            , document.getElementById('modal'))
    )
}
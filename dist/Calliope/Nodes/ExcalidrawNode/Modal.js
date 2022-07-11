import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */
import './Modal.css';
import { useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
function PortalImpl({ onClose, children, title, closeOnClickOutside, }) {
    const modalRef = useRef();
    useEffect(() => {
        if (modalRef.current !== null) {
            modalRef.current.focus();
        }
    }, []);
    useEffect(() => {
        let modalOverlayElement = null;
        const handler = (event) => {
            if (event.keyCode === 27) {
                onClose();
            }
        };
        const clickOutsideHandler = (event) => {
            const target = event.target;
            if (modalRef.current !== null &&
                !modalRef.current.contains(target) &&
                closeOnClickOutside) {
                onClose();
            }
        };
        if (modalRef.current !== null) {
            modalOverlayElement = modalRef.current?.parentElement;
            if (modalOverlayElement !== null) {
                modalOverlayElement?.addEventListener('click', clickOutsideHandler);
            }
        }
        window.addEventListener('keydown', handler);
        return () => {
            window.removeEventListener('keydown', handler);
            if (modalOverlayElement !== null) {
                modalOverlayElement?.removeEventListener('click', clickOutsideHandler);
            }
        };
    }, [closeOnClickOutside, onClose]);
    return (_jsx("div", { className: "Modal__overlay", role: "dialog", children: _jsxs("div", { className: "Modal__modal", tabIndex: -1, ref: modalRef, children: [_jsx("h2", { className: "Modal__title", children: title }), _jsx("button", { className: "Modal__closeButton", "aria-label": "Close modal", type: "button", onClick: onClose, children: "X" }), _jsx("div", { className: "Modal__content", children: children })] }) }));
}
export default function Modal({ onClose, children, title, closeOnClickOutside = false, }) {
    return createPortal(_jsx(PortalImpl, { onClose: onClose, title: title, closeOnClickOutside: closeOnClickOutside, children: children }), document.body);
}

import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */
import { Excalidraw } from '@excalidraw/excalidraw';
import { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import Button from './Button.tsx';
import Modal from './Modal.tsx';
import './ExcalidrawModal.css';
/**
 * @explorer-desc
 * A component which renders a modal with Excalidraw (a painting app)
 * which can be used to export an editable image
 */
export default function ExcalidrawModal({ closeOnClickOutside = false, onSave, initialElements, isShown = false, onHide, onDelete, }) {
    const excaliDrawModelRef = useRef(null);
    const [discardModalOpen, setDiscardModalOpen] = useState(false);
    const [elements, setElements] = useState(initialElements);
    useEffect(() => {
        if (excaliDrawModelRef.current !== null) {
            excaliDrawModelRef.current.focus();
        }
    }, []);
    useEffect(() => {
        let modalOverlayElement = null;
        const clickOutsideHandler = (event) => {
            const target = event.target;
            if (excaliDrawModelRef.current !== null &&
                !excaliDrawModelRef.current.contains(target) &&
                closeOnClickOutside) {
                onDelete();
            }
        };
        if (excaliDrawModelRef.current !== null) {
            modalOverlayElement = excaliDrawModelRef.current?.parentElement;
            if (modalOverlayElement !== null) {
                modalOverlayElement?.addEventListener('click', clickOutsideHandler);
            }
        }
        return () => {
            if (modalOverlayElement !== null) {
                modalOverlayElement?.removeEventListener('click', clickOutsideHandler);
            }
        };
    }, [closeOnClickOutside, onDelete]);
    const save = () => {
        if (elements.filter((el) => !el.isDeleted).length > 0) {
            onSave(elements);
        }
        else {
            // delete node if the scene is clear
            onDelete();
        }
        onHide();
    };
    const discard = () => {
        if (elements.filter((el) => !el.isDeleted).length === 0) {
            // delete node if the scene is clear
            onDelete();
        }
        else {
            //Otherwise, show confirmation dialog before closing
            setDiscardModalOpen(true);
        }
    };
    function ShowDiscardDialog() {
        return (_jsxs(Modal, { title: "Discard", onClose: () => {
                setDiscardModalOpen(false);
            }, closeOnClickOutside: true, children: ["Are you sure you want to discard the changes?", _jsxs("div", { className: "ExcalidrawModal__discardModal", children: [_jsx(Button, { onClick: () => {
                                setDiscardModalOpen(false);
                                onHide();
                            }, children: "Discard" }), ' ', _jsx(Button, { onClick: () => {
                                setDiscardModalOpen(false);
                            }, children: "Cancel" })] })] }));
    }
    if (isShown === false) {
        return null;
    }
    const onChange = (els) => {
        setElements(els);
    };
    return createPortal(_jsx("div", { className: "ExcalidrawModal__overlay", role: "dialog", children: _jsx("div", { className: "ExcalidrawModal__modal", ref: excaliDrawModelRef, tabIndex: -1, children: _jsxs("div", { className: "ExcalidrawModal__row", children: [discardModalOpen && _jsx(ShowDiscardDialog, {}), _jsx(Excalidraw, { onChange: onChange, initialData: {
                            appState: { isLoading: false },
                            elements: initialElements,
                        } }), _jsxs("div", { className: "ExcalidrawModal__actions", children: [_jsx("button", { className: "action-button", onClick: discard, children: "Discard" }), _jsx("button", { className: "action-button", onClick: save, children: "Save" })] })] }) }) }), document.body);
}

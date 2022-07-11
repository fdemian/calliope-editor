import { jsxs as _jsxs, jsx as _jsx, Fragment as _Fragment } from "react/jsx-runtime";
/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */
import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext';
import { $deleteTableColumn, $getElementGridForTableNode, $getTableCellNodeFromLexicalNode, $getTableColumnIndexFromTableCellNode, $getTableNodeFromLexicalNodeOrThrow, $getTableRowIndexFromTableCellNode, $insertTableColumn, $insertTableRow, $isTableCellNode, $isTableRowNode, $removeTableRowAtIndex, getTableSelectionFromTableElement, TableCellHeaderStates, TableCellNode, } from '@lexical/table';
import { $getSelection, $isGridSelection, $isRangeSelection, $setSelection, } from 'lexical';
import { useCallback, useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
function TableActionMenu({ onClose, tableCellNode: _tableCellNode, setIsMenuOpen, contextRef, }) {
    const [editor] = useLexicalComposerContext();
    const dropDownRef = useRef();
    const [tableCellNode, updateTableCellNode] = useState(_tableCellNode);
    const [selectionCounts, updateSelectionCounts] = useState({
        columns: 1,
        rows: 1,
    });
    useEffect(() => {
        return editor.registerMutationListener(TableCellNode, (nodeMutations) => {
            const nodeUpdated = nodeMutations.get(tableCellNode.getKey()) === 'updated';
            if (nodeUpdated) {
                editor.getEditorState().read(() => {
                    updateTableCellNode(tableCellNode.getLatest());
                });
            }
        });
    }, [editor, tableCellNode]);
    useEffect(() => {
        editor.getEditorState().read(() => {
            const selection = $getSelection();
            if ($isGridSelection(selection)) {
                const selectionShape = selection.getShape();
                updateSelectionCounts({
                    columns: selectionShape.toX - selectionShape.fromX + 1,
                    rows: selectionShape.toY - selectionShape.fromY + 1,
                });
            }
        });
    }, [editor]);
    useEffect(() => {
        const menuButtonElement = contextRef.current;
        const dropDownElement = dropDownRef.current;
        if (menuButtonElement != null && dropDownElement != null) {
            const menuButtonRect = menuButtonElement.getBoundingClientRect();
            dropDownElement.style.opacity = '1';
            dropDownElement.style.left = `${menuButtonRect.left + menuButtonRect.width + window.pageXOffset + 5}px`;
            dropDownElement.style.top = `${menuButtonRect.top + window.pageYOffset}px`;
        }
    }, [contextRef, dropDownRef]);
    useEffect(() => {
        function handleClickOutside(event) {
            if (dropDownRef.current != null &&
                contextRef.current != null &&
                !dropDownRef.current.contains(event.target) &&
                !contextRef.current.contains(event.target)) {
                setIsMenuOpen(false);
            }
        }
        window.addEventListener('click', handleClickOutside);
        return () => window.removeEventListener('click', handleClickOutside);
    }, [setIsMenuOpen, contextRef]);
    const clearTableSelection = useCallback(() => {
        editor.update(() => {
            if (tableCellNode.isAttached()) {
                const tableNode = $getTableNodeFromLexicalNodeOrThrow(tableCellNode);
                const tableElement = editor.getElementByKey(tableNode.getKey());
                if (!tableElement) {
                    throw new Error('Expected to find tableElement in DOM');
                }
                const tableSelection = getTableSelectionFromTableElement(tableElement);
                tableSelection.clearHighlight();
                tableNode.markDirty();
                updateTableCellNode(tableCellNode.getLatest());
            }
            $setSelection(null);
        });
    }, [editor, tableCellNode]);
    const insertTableRowAtSelection = useCallback((shouldInsertAfter) => {
        editor.update(() => {
            const selection = $getSelection();
            const tableNode = $getTableNodeFromLexicalNodeOrThrow(tableCellNode);
            let tableRowIndex;
            if ($isGridSelection(selection)) {
                const selectionShape = selection.getShape();
                tableRowIndex = shouldInsertAfter
                    ? selectionShape.toY
                    : selectionShape.fromY;
            }
            else {
                tableRowIndex = $getTableRowIndexFromTableCellNode(tableCellNode);
            }
            const grid = $getElementGridForTableNode(editor, tableNode);
            $insertTableRow(tableNode, tableRowIndex, shouldInsertAfter, selectionCounts.rows, grid);
            clearTableSelection();
            onClose();
        });
    }, [editor, tableCellNode, selectionCounts.rows, clearTableSelection, onClose]);
    const insertTableColumnAtSelection = useCallback((shouldInsertAfter) => {
        editor.update(() => {
            const selection = $getSelection();
            const tableNode = $getTableNodeFromLexicalNodeOrThrow(tableCellNode);
            let tableColumnIndex;
            if ($isGridSelection(selection)) {
                const selectionShape = selection.getShape();
                tableColumnIndex = shouldInsertAfter
                    ? selectionShape.toX
                    : selectionShape.fromX;
            }
            else {
                tableColumnIndex =
                    $getTableColumnIndexFromTableCellNode(tableCellNode);
            }
            $insertTableColumn(tableNode, tableColumnIndex, shouldInsertAfter, selectionCounts.columns);
            clearTableSelection();
            onClose();
        });
    }, [
        editor,
        tableCellNode,
        selectionCounts.columns,
        clearTableSelection,
        onClose,
    ]);
    const deleteTableRowAtSelection = useCallback(() => {
        editor.update(() => {
            const tableNode = $getTableNodeFromLexicalNodeOrThrow(tableCellNode);
            const tableRowIndex = $getTableRowIndexFromTableCellNode(tableCellNode);
            $removeTableRowAtIndex(tableNode, tableRowIndex);
            clearTableSelection();
            onClose();
        });
    }, [editor, tableCellNode, clearTableSelection, onClose]);
    const deleteTableAtSelection = useCallback(() => {
        editor.update(() => {
            const tableNode = $getTableNodeFromLexicalNodeOrThrow(tableCellNode);
            tableNode.remove();
            clearTableSelection();
            onClose();
        });
    }, [editor, tableCellNode, clearTableSelection, onClose]);
    const deleteTableColumnAtSelection = useCallback(() => {
        editor.update(() => {
            const tableNode = $getTableNodeFromLexicalNodeOrThrow(tableCellNode);
            const tableColumnIndex = $getTableColumnIndexFromTableCellNode(tableCellNode);
            $deleteTableColumn(tableNode, tableColumnIndex);
            clearTableSelection();
            onClose();
        });
    }, [editor, tableCellNode, clearTableSelection, onClose]);
    const toggleTableRowIsHeader = useCallback(() => {
        editor.update(() => {
            const tableNode = $getTableNodeFromLexicalNodeOrThrow(tableCellNode);
            const tableRowIndex = $getTableRowIndexFromTableCellNode(tableCellNode);
            const tableRows = tableNode.getChildren();
            if (tableRowIndex >= tableRows.length || tableRowIndex < 0) {
                throw new Error('Expected table cell to be inside of table row.');
            }
            const tableRow = tableRows[tableRowIndex];
            if (!$isTableRowNode(tableRow)) {
                throw new Error('Expected table row');
            }
            tableRow.getChildren().forEach((tableCell) => {
                if (!$isTableCellNode(tableCell)) {
                    throw new Error('Expected table cell');
                }
                tableCell.toggleHeaderStyle(TableCellHeaderStates.ROW);
            });
            clearTableSelection();
            onClose();
        });
    }, [editor, tableCellNode, clearTableSelection, onClose]);
    const toggleTableColumnIsHeader = useCallback(() => {
        editor.update(() => {
            const tableNode = $getTableNodeFromLexicalNodeOrThrow(tableCellNode);
            const tableColumnIndex = $getTableColumnIndexFromTableCellNode(tableCellNode);
            const tableRows = tableNode.getChildren();
            for (let r = 0; r < tableRows.length; r++) {
                const tableRow = tableRows[r];
                if (!$isTableRowNode(tableRow)) {
                    throw new Error('Expected table row');
                }
                const tableCells = tableRow.getChildren();
                if (tableColumnIndex >= tableCells.length || tableColumnIndex < 0) {
                    throw new Error('Expected table cell to be inside of table row.');
                }
                const tableCell = tableCells[tableColumnIndex];
                if (!$isTableCellNode(tableCell)) {
                    throw new Error('Expected table cell');
                }
                tableCell.toggleHeaderStyle(TableCellHeaderStates.COLUMN);
            }
            clearTableSelection();
            onClose();
        });
    }, [editor, tableCellNode, clearTableSelection, onClose]);
    return createPortal(
    // eslint-disable-next-line jsx-a11y/no-static-element-interactions
    _jsxs("div", { className: "dropdown", style: { position: 'absolute' }, ref: dropDownRef, onClick: (e) => {
            e.stopPropagation();
        }, children: [_jsx("button", { className: "item", onClick: () => insertTableRowAtSelection(false), children: _jsxs("span", { className: "text", children: ["Insert", ' ', selectionCounts.rows === 1 ? 'row' : `${selectionCounts.rows} rows`, ' ', "above"] }) }), _jsx("button", { className: "item", onClick: () => insertTableRowAtSelection(true), children: _jsxs("span", { className: "text", children: ["Insert", ' ', selectionCounts.rows === 1 ? 'row' : `${selectionCounts.rows} rows`, ' ', "below"] }) }), _jsx("hr", {}), _jsx("button", { className: "item", onClick: () => insertTableColumnAtSelection(false), children: _jsxs("span", { className: "text", children: ["Insert", ' ', selectionCounts.columns === 1
                            ? 'column'
                            : `${selectionCounts.columns} columns`, ' ', "left"] }) }), _jsx("button", { className: "item", onClick: () => insertTableColumnAtSelection(true), children: _jsxs("span", { className: "text", children: ["Insert", ' ', selectionCounts.columns === 1
                            ? 'column'
                            : `${selectionCounts.columns} columns`, ' ', "right"] }) }), _jsx("hr", {}), _jsx("button", { className: "item", onClick: () => deleteTableColumnAtSelection(), children: _jsx("span", { className: "text", children: "Delete column" }) }), _jsx("button", { className: "item", onClick: () => deleteTableRowAtSelection(), children: _jsx("span", { className: "text", children: "Delete row" }) }), _jsx("button", { className: "item", onClick: () => deleteTableAtSelection(), children: _jsx("span", { className: "text", children: "Delete table" }) }), _jsx("hr", {}), _jsx("button", { className: "item", onClick: () => toggleTableRowIsHeader(), children: _jsxs("span", { className: "text", children: [(tableCellNode.__headerState & TableCellHeaderStates.ROW) ===
                            TableCellHeaderStates.ROW
                            ? 'Remove'
                            : 'Add', ' ', "row header"] }) }), _jsx("button", { className: "item", onClick: () => toggleTableColumnIsHeader(), children: _jsxs("span", { className: "text", children: [(tableCellNode.__headerState & TableCellHeaderStates.COLUMN) ===
                            TableCellHeaderStates.COLUMN
                            ? 'Remove'
                            : 'Add', ' ', "column header"] }) })] }), document.body);
}
function TableCellActionMenuContainer() {
    const [editor] = useLexicalComposerContext();
    const menuButtonRef = useRef(null);
    const menuRootRef = useRef(null);
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [tableCellNode, setTableMenuCellNode] = useState(null);
    const moveMenu = useCallback(() => {
        const menu = menuButtonRef.current;
        const selection = $getSelection();
        const nativeSelection = window.getSelection();
        const activeElement = document.activeElement;
        if (selection == null || menu == null) {
            setTableMenuCellNode(null);
            return;
        }
        const rootElement = editor.getRootElement();
        if ($isRangeSelection(selection) &&
            rootElement !== null &&
            rootElement.contains(nativeSelection.anchorNode)) {
            const tableCellNodeFromSelection = $getTableCellNodeFromLexicalNode(selection.anchor.getNode());
            if (tableCellNodeFromSelection == null) {
                setTableMenuCellNode(null);
                return;
            }
            const tableCellParentNodeDOM = editor.getElementByKey(tableCellNodeFromSelection.getKey());
            if (tableCellParentNodeDOM == null) {
                setTableMenuCellNode(null);
                return;
            }
            setTableMenuCellNode(tableCellNodeFromSelection);
        }
        else if (!activeElement) {
            setTableMenuCellNode(null);
        }
    }, [editor]);
    useEffect(() => {
        return editor.registerUpdateListener(() => {
            editor.getEditorState().read(() => {
                moveMenu();
            });
        });
    });
    useEffect(() => {
        const menuButtonDOM = menuButtonRef.current;
        if (menuButtonDOM != null && tableCellNode != null) {
            const tableCellNodeDOM = editor.getElementByKey(tableCellNode.getKey());
            if (tableCellNodeDOM != null) {
                const tableCellRect = tableCellNodeDOM.getBoundingClientRect();
                const menuRect = menuButtonDOM.getBoundingClientRect();
                menuButtonDOM.style.opacity = '1';
                menuButtonDOM.style.left = `${tableCellRect.left +
                    window.pageXOffset -
                    menuRect.width +
                    tableCellRect.width -
                    10}px`;
                menuButtonDOM.style.top = `${tableCellRect.top + window.pageYOffset + 5}px`;
            }
            else {
                menuButtonDOM.style.opacity = '0';
            }
        }
    }, [menuButtonRef, tableCellNode, editor]);
    const prevTableCellDOM = useRef(tableCellNode);
    useEffect(() => {
        if (prevTableCellDOM.current !== tableCellNode) {
            setIsMenuOpen(false);
        }
        prevTableCellDOM.current = tableCellNode;
    }, [prevTableCellDOM, tableCellNode]);
    return (_jsx("div", { className: "table-cell-action-button-container", ref: menuButtonRef, children: tableCellNode != null && (_jsxs(_Fragment, { children: [_jsx("button", { className: "table-cell-action-button chevron-down", onClick: (e) => {
                        e.stopPropagation();
                        setIsMenuOpen(!isMenuOpen);
                    }, ref: menuRootRef, children: _jsx("i", { className: "chevron-down" }) }), isMenuOpen && (_jsx(TableActionMenu, { contextRef: menuRootRef, setIsMenuOpen: setIsMenuOpen, onClose: () => setIsMenuOpen(false), tableCellNode: tableCellNode }))] })) }));
}
export default function TableActionMenuPlugin() {
    return createPortal(_jsx(TableCellActionMenuContainer, {}), document.body);
}

import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */
import { Suspense } from 'react';
import './LinkPreview.css';
// Cached responses or running request promises
const PREVIEW_CACHE = {};
const URL_MATCHER = /((https?:\/\/(www\.)?)|(www\.))[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_+.~#?&//=]*)/;
function useSuspenseRequest(url) {
    let cached = PREVIEW_CACHE[url];
    if (!url.match(URL_MATCHER)) {
        return { preview: null };
    }
    if (!cached) {
        cached = PREVIEW_CACHE[url] = fetch(`/api/link-preview?url=${encodeURI(url)}`)
            .then((response) => response.json())
            .then((preview) => {
            PREVIEW_CACHE[url] = preview;
            return preview;
        })
            .catch(() => {
            PREVIEW_CACHE[url] = { preview: null };
        });
    }
    if (cached instanceof Promise) {
        throw cached;
    }
    return cached;
}
function LinkPreviewContent({ url, }) {
    const { preview } = useSuspenseRequest(url);
    if (preview === null) {
        return null;
    }
    return (_jsxs("div", { className: "LinkPreview__container", children: [preview.img && (_jsx("div", { className: "LinkPreview__imageWrapper", children: _jsx("img", { src: preview.img, alt: preview.title, className: "LinkPreview__image" }) })), preview.domain && (_jsx("div", { className: "LinkPreview__domain", children: preview.domain })), preview.title && (_jsx("div", { className: "LinkPreview__title", children: preview.title })), preview.description && (_jsx("div", { className: "LinkPreview__description", children: preview.description }))] }));
}
function Glimmer(props) {
    return (_jsx("div", { className: "LinkPreview__glimmer", ...props, style: {
            animationDelay: String((props.index || 0) * 300),
            ...(props.style || {}),
        } }));
}
export default function LinkPreview({ url, }) {
    return (_jsx(Suspense, { fallback: _jsxs(_Fragment, { children: [_jsx(Glimmer, { style: { height: '80px' }, index: 0 }), _jsx(Glimmer, { style: { width: '60%' }, index: 1 }), _jsx(Glimmer, { style: { width: '80%' }, index: 2 })] }), children: _jsx(LinkPreviewContent, { url: url }) }));
}

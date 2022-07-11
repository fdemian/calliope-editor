/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @flow strict
 */
import { useEffect, useLayoutEffect } from 'react';
import { CAN_USE_DOM } from './canUseDOM';
const useLayoutEffectImpl = CAN_USE_DOM
    ? useLayoutEffect
    : useEffect;
export default useLayoutEffectImpl;
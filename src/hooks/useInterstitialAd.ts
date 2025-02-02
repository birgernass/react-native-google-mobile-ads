/*
 * Copyright (c) 2016-present Invertase Limited & Contributors
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this library except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 */

import { useState } from 'react';
import useDeepCompareEffect from 'use-deep-compare-effect';

import { InterstitialAd } from '../ads/InterstitialAd';
import { AdHookReturns } from '../types/AdStates';
import { RequestOptions } from '../types/RequestOptions';

import { useFullScreenAd } from './useFullScreenAd';

/**
 * React Hook for Interstitial Ad.
 *
 * @param adUnitId The Ad Unit ID for the Interstitial Ad. You can find this on your Google Mobile Ads dashboard. You can destroy ad instance by setting this value to null.
 * @param requestOptions Optional RequestOptions used to load the ad.
 */
export function useInterstitialAd(
  adUnitId: string | null,
  requestOptions: RequestOptions = {},
): Omit<AdHookReturns, 'adReward'> {
  const [interstitialAd, setInterstitialAd] = useState<InterstitialAd | null>(null);

  useDeepCompareEffect(() => {
    setInterstitialAd(() => {
      return adUnitId ? InterstitialAd.createForAdRequest(adUnitId, requestOptions) : null;
    });
  }, [adUnitId, requestOptions]);

  return useFullScreenAd(interstitialAd);
}

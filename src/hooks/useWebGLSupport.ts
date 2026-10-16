import { useState, useEffect } from 'react';

export function useWebGLSupport() {
  const [isSupported, setIsSupported] = useState<boolean>(true);
  const [isLowSpec, setIsLowSpec] = useState<boolean>(false);

  useEffect(() => {
    try {
      const canvas = document.createElement('canvas');
      const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
      
      if (!gl) {
        setIsSupported(false);
        return;
      }

      // Check for low device memory or low hardware concurrency
      const nav = navigator as Navigator & {
        deviceMemory?: number;
        hardwareConcurrency?: number;
      };

      const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
        navigator.userAgent
      );

      const hasLowMemory = nav.deviceMemory ? nav.deviceMemory <= 2 : false;
      const hasLowCores = nav.hardwareConcurrency ? nav.hardwareConcurrency <= 2 : false;

      if (isMobile && (hasLowMemory || hasLowCores)) {
        setIsLowSpec(true);
      }
    } catch {
      setIsSupported(false);
    }
  }, []);

  return { isSupported, isLowSpec };
}

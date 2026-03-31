import { onBeforeUnmount, onMounted, ref } from 'vue';

type ConnectionLike = {
  saveData?: boolean;
};

type LegacyMediaQueryList = MediaQueryList & {
  addListener?: (listener: (event: MediaQueryListEvent) => void) => void;
  removeListener?: (listener: (event: MediaQueryListEvent) => void) => void;
};

type NavigatorWithHints = Navigator & {
  connection?: ConnectionLike;
  deviceMemory?: number;
};

export const useDeviceProfile = () => {
  const isWeakDevice = ref(false);

  let mediaQuery: MediaQueryList | null = null;

  const evaluateDevice = () => {
    if (!import.meta.client) {
      return;
    }

    const nav = navigator as NavigatorWithHints;
    const coarsePointer = mediaQuery?.matches ?? false;
    const lowCpu = typeof nav.hardwareConcurrency === 'number' && nav.hardwareConcurrency > 0 && nav.hardwareConcurrency <= 4;
    const lowMemory = typeof nav.deviceMemory === 'number' && nav.deviceMemory > 0 && nav.deviceMemory <= 4;
    const saveData = nav.connection?.saveData === true;
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    isWeakDevice.value = reducedMotion || saveData || (coarsePointer && (lowCpu || lowMemory));
  };

  onMounted(() => {
    if (!import.meta.client) {
      return;
    }

    mediaQuery = window.matchMedia('(pointer: coarse)');
    evaluateDevice();

    const legacyMediaQuery = mediaQuery as LegacyMediaQueryList;

    if (typeof legacyMediaQuery.addEventListener === 'function') {
      legacyMediaQuery.addEventListener('change', evaluateDevice);
      return;
    }

    if (typeof legacyMediaQuery.addListener === 'function') {
      legacyMediaQuery.addListener(evaluateDevice);
    }
  });

  onBeforeUnmount(() => {
    if (!mediaQuery) {
      return;
    }

    const legacyMediaQuery = mediaQuery as LegacyMediaQueryList;

    if (typeof legacyMediaQuery.removeEventListener === 'function') {
      legacyMediaQuery.removeEventListener('change', evaluateDevice);
      return;
    }

    if (typeof legacyMediaQuery.removeListener === 'function') {
      legacyMediaQuery.removeListener(evaluateDevice);
    }
  });

  return { isWeakDevice };
};

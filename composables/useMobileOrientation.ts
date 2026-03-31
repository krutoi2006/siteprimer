import { onBeforeUnmount, onMounted, ref } from 'vue';

export const useMobileOrientation = () => {
  const isMobilePortrait = ref(false);
  const isMobile = ref(false);

  let frameId = 0;

  const checkOrientation = () => {
    const mobileCheck = window.innerWidth <= 768;
    const nextPortrait = mobileCheck && window.innerHeight > window.innerWidth;

    if (isMobile.value !== mobileCheck) {
      isMobile.value = mobileCheck;
    }

    if (isMobilePortrait.value !== nextPortrait) {
      isMobilePortrait.value = nextPortrait;
    }
  };

  const handleResize = () => {
    if (frameId) {
      window.cancelAnimationFrame(frameId);
    }

    frameId = window.requestAnimationFrame(checkOrientation);
  };

  onMounted(() => {
    if (!import.meta.client) {
      return;
    }

    checkOrientation();
    window.addEventListener('resize', handleResize, { passive: true });
    window.addEventListener('orientationchange', handleResize, { passive: true });
  });

  onBeforeUnmount(() => {
    if (!import.meta.client) {
      return;
    }

    if (frameId) {
      window.cancelAnimationFrame(frameId);
    }

    window.removeEventListener('resize', handleResize);
    window.removeEventListener('orientationchange', handleResize);
  });

  return { isMobilePortrait, isMobile };
};

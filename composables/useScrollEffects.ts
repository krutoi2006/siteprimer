import { onBeforeUnmount, onMounted, ref, type Ref } from 'vue';

export const useScrollEffects = (rootRef: Ref<HTMLElement | null>, threshold = 50) => {
  const isScrolled = ref(false);

  let frameId = 0;
  let resizeFrameId = 0;
  let lastScrolled = false;
  let enableParallax = false;
  let lastTechnologyParallax = '';
  let lastConstructionParallax = '';

  const applyScrollEffects = () => {
    frameId = 0;

    const currentScrollY = window.scrollY;
    const root = rootRef.value;

    if (root) {
      const nextTechnologyParallax = enableParallax ? `${currentScrollY * 0.03}px` : '0px';
      const nextConstructionParallax = enableParallax ? `${currentScrollY * 0.02}px` : '0px';

      if (nextTechnologyParallax !== lastTechnologyParallax) {
        lastTechnologyParallax = nextTechnologyParallax;
        root.style.setProperty('--technology-parallax', nextTechnologyParallax);
      }

      if (nextConstructionParallax !== lastConstructionParallax) {
        lastConstructionParallax = nextConstructionParallax;
        root.style.setProperty('--construction-parallax', nextConstructionParallax);
      }
    }

    const nextScrolled = currentScrollY > threshold;
    if (nextScrolled !== lastScrolled) {
      lastScrolled = nextScrolled;
      isScrolled.value = nextScrolled;
    }
  };

  const handleScroll = () => {
    if (frameId) {
      return;
    }

    frameId = window.requestAnimationFrame(applyScrollEffects);
  };

  const syncViewportMode = () => {
    resizeFrameId = 0;
    const nextEnableParallax = window.innerWidth > 768;

    if (nextEnableParallax !== enableParallax) {
      enableParallax = nextEnableParallax;
    }

    if (frameId) {
      window.cancelAnimationFrame(frameId);
      frameId = 0;
    }

    applyScrollEffects();
  };

  const handleResize = () => {
    if (resizeFrameId) {
      window.cancelAnimationFrame(resizeFrameId);
    }

    resizeFrameId = window.requestAnimationFrame(syncViewportMode);
  };

  onMounted(() => {
    if (!import.meta.client) {
      return;
    }

    enableParallax = window.innerWidth > 768;
    lastScrolled = window.scrollY > threshold;
    applyScrollEffects();
    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleResize, { passive: true });
  });

  onBeforeUnmount(() => {
    if (!import.meta.client) {
      return;
    }

    if (frameId) {
      window.cancelAnimationFrame(frameId);
    }

    if (resizeFrameId) {
      window.cancelAnimationFrame(resizeFrameId);
    }

    window.removeEventListener('scroll', handleScroll);
    window.removeEventListener('resize', handleResize);
  });

  return isScrolled;
};

import { defineComponent, onBeforeUnmount, onMounted, ref, watch, type CSSProperties, type PropType } from 'vue';

const isMobileScreen = () => import.meta.client && window.innerWidth <= 768;

type Direction = 'up' | 'left' | 'right' | 'none';

const transformByDirection: Record<Direction, string> = {
  up: 'translate3d(0, 24px, 0)',
  left: 'translate3d(-24px, 0, 0)',
  right: 'translate3d(24px, 0, 0)',
  none: 'translate3d(0, 0, 0)',
};

const mobileTransformByDirection: Record<Direction, string> = {
  up: 'translateY(16px)',
  left: 'translateX(-16px)',
  right: 'translateX(16px)',
  none: 'none',
};

const observerCallbacks = new WeakMap<Element, () => void>();
let sharedObserver: IntersectionObserver | null = null;

const getSharedObserver = () => {
  if (!import.meta.client || !('IntersectionObserver' in window)) {
    return null;
  }

  if (!sharedObserver) {
    sharedObserver = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) {
            continue;
          }

          const callback = observerCallbacks.get(entry.target);
          if (!callback) {
            continue;
          }

          callback();
          observerCallbacks.delete(entry.target);
          sharedObserver?.unobserve(entry.target);
        }
      },
      {
        threshold: 0.01,
        rootMargin: isMobileScreen() ? '0px 0px 4% 0px' : '0px 0px 12% 0px',
      },
    );
  }

  return sharedObserver;
};

export default defineComponent({
  name: 'Reveal',
  props: {
    delay: {
      type: Number,
      default: 0,
    },
    direction: {
      type: String as PropType<Direction>,
      default: 'up',
    },
    isReady: {
      type: Boolean,
      default: true,
    },
  },
  setup(props, { slots }) {
    const elementRef = ref<HTMLElement | null>(null);
    const isVisible = ref(props.isReady);
    let observedElement: HTMLElement | null = null;
    let rafId = 0;

    const isNearViewport = (element: HTMLElement) => {
      const rect = element.getBoundingClientRect();
      const viewportHeight = window.innerHeight || document.documentElement.clientHeight;

      return rect.top <= viewportHeight * 1.1 && rect.bottom >= viewportHeight * -0.15;
    };

    const disconnect = () => {
      if (!observedElement) {
        return;
      }

      observerCallbacks.delete(observedElement);
      sharedObserver?.unobserve(observedElement);
      observedElement = null;
    };

    const applyVisibilityState = () => {
      rafId = 0;
      disconnect();

      if (!import.meta.client) {
        return;
      }

      if (!props.isReady) {
        isVisible.value = false;
        return;
      }

      const element = elementRef.value;
      if (!element) {
        return;
      }

      if (window.matchMedia('(prefers-reduced-motion: reduce)').matches || !('IntersectionObserver' in window) || isNearViewport(element)) {
        isVisible.value = true;
        return;
      }

      if (isVisible.value) {
        isVisible.value = false;
      }

      const observer = getSharedObserver();
      if (!observer) {
        isVisible.value = true;
        return;
      }

      observedElement = element;
      observerCallbacks.set(element, () => {
        if (!isVisible.value) {
          isVisible.value = true;
        }
      });
      observer.observe(element);
    };

    const scheduleVisibilityCheck = () => {
      if (!import.meta.client) {
        return;
      }

      if (rafId) {
        window.cancelAnimationFrame(rafId);
      }

      rafId = window.requestAnimationFrame(applyVisibilityState);
    };

    onMounted(scheduleVisibilityCheck);

    watch(
      () => props.isReady,
      () => {
        scheduleVisibilityCheck();
      },
    );

    onBeforeUnmount(() => {
      if (rafId) {
        window.cancelAnimationFrame(rafId);
      }

      disconnect();
    });

    const mobile = isMobileScreen();

    return () => {
      const style: CSSProperties = mobile
        ? {
            opacity: isVisible.value ? 1 : 0,
            transform: isVisible.value ? 'none' : mobileTransformByDirection[props.direction],
            transition: `opacity 0.35s ease ${props.delay}ms, transform 0.35s ease ${props.delay}ms`,
          }
        : {
            opacity: isVisible.value ? 1 : 0,
            transform: isVisible.value ? 'translate3d(0, 0, 0)' : transformByDirection[props.direction],
            transition: `opacity 0.65s cubic-bezier(0.17, 0.55, 0.55, 1) ${props.delay}ms, transform 0.65s cubic-bezier(0.17, 0.55, 0.55, 1) ${props.delay}ms`,
            willChange: isVisible.value ? undefined : 'opacity, transform',
          };

      return (
        <div ref={elementRef} style={style} class="reveal-motion">
          {slots.default?.()}
        </div>
      );
    };
  },
});

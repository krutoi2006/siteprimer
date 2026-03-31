import { defineComponent, onBeforeUnmount, onMounted, ref, watch, type CSSProperties, type PropType } from 'vue';

type Direction = 'up' | 'left' | 'right' | 'none';

const transformByDirection: Record<Direction, string> = {
  up: 'translateY(40px)',
  left: 'translateX(-40px)',
  right: 'translateX(40px)',
  none: 'translate(0)',
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
      { threshold: 0.1 },
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
    const isVisible = ref(false);
    let observedElement: HTMLElement | null = null;

    const disconnect = () => {
      if (!observedElement) {
        return;
      }

      observerCallbacks.delete(observedElement);
      sharedObserver?.unobserve(observedElement);
      observedElement = null;
    };

    const setupObserver = () => {
      disconnect();

      if (!props.isReady || isVisible.value || !import.meta.client) {
        return;
      }

      const element = elementRef.value;
      if (!element) {
        return;
      }

      if (!('IntersectionObserver' in window)) {
        isVisible.value = true;
        return;
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

    onMounted(setupObserver);

    watch(
      () => props.isReady,
      () => {
        setupObserver();
      },
    );

    onBeforeUnmount(disconnect);

    return () => {
      const style: CSSProperties = {
        opacity: isVisible.value ? 1 : 0,
        transform: isVisible.value ? 'translate(0)' : transformByDirection[props.direction],
        transition: `opacity 0.8s cubic-bezier(0.17, 0.55, 0.55, 1) ${props.delay}ms, transform 0.8s cubic-bezier(0.17, 0.55, 0.55, 1) ${props.delay}ms`,
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

import { defineComponent, ref } from 'vue';

export default defineComponent({
  name: 'ScipVisualization',
  props: {
    isMobile: {
      type: Boolean,
      default: false,
    },
  },
  setup(props) {
    const isExpanded = ref(false);

    const toggleExpanded = () => {
      if (props.isMobile) {
        isExpanded.value = !isExpanded.value;
      }
    };

    const handleKeydown = (event: KeyboardEvent) => {
      if (!props.isMobile) {
        return;
      }

      if (event.key === 'Enter' || event.key === ' ') {
        event.preventDefault();
        isExpanded.value = !isExpanded.value;
      }
    };

    return () => (
      props.isMobile ? (
        <div
          class="group relative mx-auto flex h-[320px] w-full max-w-[320px] cursor-pointer select-none items-center justify-center overflow-visible"
          style={{ perspective: '1200px', touchAction: 'manipulation' }}
          role="button"
          tabindex={0}
          aria-pressed={isExpanded.value ? 'true' : 'false'}
          aria-label="Toggle SCIP layers"
          onClick={toggleExpanded}
          onKeydown={handleKeydown}
        >
          <div
            class="relative h-60 w-40 transition-transform duration-1000 ease-[cubic-bezier(0.25,0.1,0.25,1)]"
            style={{
              transform: isExpanded.value
                ? 'translateX(-10px) rotateX(60deg) rotateZ(-45deg) scale(1.02)'
                : 'translateX(-10px) rotateX(60deg) rotateZ(-45deg)',
              transformStyle: 'preserve-3d',
            }}
          >
            <div
              class={`absolute inset-0 flex items-start justify-end border border-stone-200 bg-stone-100 p-3 shadow-[0_18px_34px_rgba(0,0,0,0.09)] transition-transform duration-1000 ease-[cubic-bezier(0.25,0.1,0.25,1)] ${
                isExpanded.value ? '[transform:translateZ(-54px)]' : '[transform:translateZ(-30px)]'
              }`}
            >
              <div class="origin-top-right translate-y-7 rotate-90 text-[9px] font-bold tracking-[0.16em] text-stone-400">ИНТЕРЬЕР</div>
            </div>
            <div
              class={`absolute inset-0 border border-slate-300/40 transition-transform duration-1000 ease-[cubic-bezier(0.25,0.1,0.25,1)] ${
                isExpanded.value ? '[transform:translateZ(-14px)]' : '[transform:translateZ(0px)]'
              }`}
              style={{
                backgroundImage:
                  'repeating-linear-gradient(0deg, transparent, transparent 15px, rgba(148, 163, 184, 0.3) 15px, rgba(148, 163, 184, 0.3) 16px), repeating-linear-gradient(90deg, transparent, transparent 15px, rgba(148, 163, 184, 0.3) 15px, rgba(148, 163, 184, 0.3) 16px)',
              }}
            />
            <div
              class={`absolute inset-0 flex items-center justify-center border border-stone-100 bg-white/90 shadow-[0_0_24px_rgba(0,0,0,0.04)] transition-transform duration-1000 ease-[cubic-bezier(0.25,0.1,0.25,1)] ${
                isExpanded.value ? '[transform:translateZ(46px)]' : '[transform:translateZ(32px)]'
              }`}
            >
              <div class="rounded-full border border-white/60 bg-white/60 px-3 py-1.5 text-center">
                <div class="text-[9px] font-bold tracking-[0.16em] text-stone-500">ЯДРО EPS</div>
              </div>
            </div>
            <div
              class={`absolute inset-0 border border-slate-300/40 transition-transform duration-1000 ease-[cubic-bezier(0.25,0.1,0.25,1)] ${
                isExpanded.value ? '[transform:translateZ(94px)]' : '[transform:translateZ(64px)]'
              }`}
              style={{
                backgroundImage:
                  'repeating-linear-gradient(0deg, transparent, transparent 15px, rgba(148, 163, 184, 0.3) 15px, rgba(148, 163, 184, 0.3) 16px), repeating-linear-gradient(90deg, transparent, transparent 15px, rgba(148, 163, 184, 0.3) 15px, rgba(148, 163, 184, 0.3) 16px)',
              }}
            />
            <div
              class={`absolute inset-0 flex items-end border border-stone-400 bg-stone-300 p-3 opacity-95 shadow-[18px_24px_40px_rgba(0,0,0,0.18)] transition-transform duration-1000 ease-[cubic-bezier(0.25,0.1,0.25,1)] ${
                isExpanded.value ? '[transform:translateZ(132px)]' : '[transform:translateZ(96px)]'
              }`}
            >
              <div class="text-[9px] font-bold leading-none tracking-[0.14em] text-stone-600">СТРУКТУРНЫЙ БЕТОН</div>
            </div>
            <div class={`absolute -bottom-12 left-1/2 -translate-x-1/2 whitespace-nowrap text-[9px] font-medium tracking-[0.18em] text-stone-400 transition-opacity duration-500 ${isExpanded.value ? 'opacity-0' : 'opacity-100'}`}>
              TAP TO VIEW LAYERS
            </div>
          </div>
        </div>
      ) : (
        <div
          class="group relative flex aspect-square w-full cursor-pointer items-center justify-center overflow-visible md:h-[600px]"
          style={{ perspective: '1200px' }}
        >
          <div
            class="relative h-72 w-48 transition-transform duration-1000 ease-[cubic-bezier(0.25,0.1,0.25,1)] group-hover:scale-105 sm:h-96 sm:w-64"
            style={{ transform: 'rotateX(60deg) rotateZ(-45deg)', transformStyle: 'preserve-3d' }}
          >
            <div class="absolute inset-0 flex items-start justify-end border border-stone-200 bg-stone-100 p-4 shadow-[0_20px_40px_rgba(0,0,0,0.1)] transition-transform duration-1000 ease-[cubic-bezier(0.25,0.1,0.25,1)] [transform:translateZ(-40px)] group-hover:[transform:translateZ(-80px)]">
              <div class="origin-top-right translate-y-8 rotate-90 text-[10px] font-bold tracking-[0.2em] text-stone-400">ИНТЕРЬЕР</div>
            </div>
            <div
              class="absolute inset-0 border border-slate-300/40 transition-transform duration-1000 ease-[cubic-bezier(0.25,0.1,0.25,1)] [transform:translateZ(0px)] group-hover:[transform:translateZ(-20px)]"
              style={{
                backgroundImage:
                  'repeating-linear-gradient(0deg, transparent, transparent 15px, rgba(148, 163, 184, 0.3) 15px, rgba(148, 163, 184, 0.3) 16px), repeating-linear-gradient(90deg, transparent, transparent 15px, rgba(148, 163, 184, 0.3) 15px, rgba(148, 163, 184, 0.3) 16px)',
              }}
            />
            <div class="absolute inset-0 flex items-center justify-center border border-stone-100 bg-white/90 shadow-[0_0_30px_rgba(0,0,0,0.05)] transition-transform duration-1000 ease-[cubic-bezier(0.25,0.1,0.25,1)] [transform:translateZ(40px)] group-hover:[transform:translateZ(60px)]">
              <div class="rounded-full border border-white/60 bg-white/60 px-4 py-2 text-center">
                <div class="text-[10px] font-bold tracking-[0.2em] text-stone-500">ЯДРО EPS</div>
              </div>
            </div>
            <div
              class="absolute inset-0 border border-slate-300/40 transition-transform duration-1000 ease-[cubic-bezier(0.25,0.1,0.25,1)] [transform:translateZ(80px)] group-hover:[transform:translateZ(140px)]"
              style={{
                backgroundImage:
                  'repeating-linear-gradient(0deg, transparent, transparent 15px, rgba(148, 163, 184, 0.3) 15px, rgba(148, 163, 184, 0.3) 16px), repeating-linear-gradient(90deg, transparent, transparent 15px, rgba(148, 163, 184, 0.3) 15px, rgba(148, 163, 184, 0.3) 16px)',
              }}
            />
            <div class="absolute inset-0 flex items-end border border-stone-400 bg-stone-300 p-4 opacity-95 shadow-[20px_30px_50px_rgba(0,0,0,0.2)] transition-transform duration-1000 ease-[cubic-bezier(0.25,0.1,0.25,1)] [transform:translateZ(120px)] group-hover:[transform:translateZ(200px)]">
              <div class="text-[10px] font-bold tracking-[0.2em] text-stone-600">СТРУКТУРНЫЙ БЕТОН</div>
            </div>
            <div class="absolute -bottom-16 left-1/2 -translate-x-1/2 whitespace-nowrap text-[10px] font-medium tracking-widest text-stone-400 opacity-0 transition-opacity duration-500 group-hover:opacity-100">
              НАВЕДИТЕ ДЛЯ ПРОСМОТРА СЛОЕВ
            </div>
          </div>
        </div>
      )
    );
  },
});

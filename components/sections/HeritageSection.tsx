import { defineComponent, onBeforeUnmount, onMounted, ref, type CSSProperties } from 'vue';

export default defineComponent({
  name: 'HeritageSection',
  props: {
    isMobile: {
      type: Boolean,
      default: false,
    },
  },
  setup(props) {
    const hoveredEpoch = ref<'old' | 'new' | null>(null);
    const supportsHover = ref(false);
    let mediaQuery: MediaQueryList | null = null;

    const updateHoverSupport = () => {
      supportsHover.value = Boolean(mediaQuery?.matches);
    };

    const activateEpoch = (epoch: 'old' | 'new') => {
      hoveredEpoch.value = epoch;
    };

    onMounted(() => {
      if (!import.meta.client) {
        return;
      }

      mediaQuery = window.matchMedia('(hover: hover) and (pointer: fine)');
      updateHoverSupport();
      mediaQuery.addEventListener('change', updateHoverSupport);
    });

    onBeforeUnmount(() => {
      mediaQuery?.removeEventListener('change', updateHoverSupport);
    });

    return () => (
      <section
        class="relative overflow-hidden border-t border-stone-200 bg-stone-50 py-24"
        style={{ contentVisibility: 'auto', containIntrinsicSize: props.isMobile ? '700px' : '820px' } as CSSProperties}
      >
        <div class="mx-auto mb-16 max-w-7xl px-6 text-center md:px-12">
          <h2 class="bronze-text overflow-visible text-3xl font-light leading-[1.18] tracking-tighter md:text-5xl pt-[0.06em] pb-[0.16em]">
            От монументальности прошлого <span class="font-medium italic">к технологиям будущего.</span>
          </h2>
        </div>

        <div class="mx-auto h-[600px] max-w-7xl px-6 md:h-[700px] md:px-12">
          <div class="flex h-full w-full flex-col gap-[2px] overflow-hidden bg-stone-300 shadow-2xl md:flex-row">
            <div
              class="relative h-full cursor-pointer touch-manipulation overflow-hidden bg-stone-900"
              style={{
                flex: hoveredEpoch.value === 'old' ? 2 : hoveredEpoch.value === 'new' ? 0.6 : 1,
                transition: 'flex 0.8s cubic-bezier(0.25, 1, 0.5, 1)',
              }}
              role="button"
              tabindex={0}
              aria-expanded={hoveredEpoch.value === 'old'}
              onMouseenter={supportsHover.value ? () => (hoveredEpoch.value = 'old') : undefined}
              onMouseleave={supportsHover.value ? () => (hoveredEpoch.value = null) : undefined}
              onClick={() => activateEpoch('old')}
              onKeydown={(event: KeyboardEvent) => {
                if (event.key === 'Enter' || event.key === ' ') {
                  event.preventDefault();
                  activateEpoch('old');
                }
              }}
            >
              <img
                src="/image/zamok.webp"
                alt=""
                aria-hidden="true"
                loading="lazy"
                decoding="async"
                fetchpriority="low"
                class="absolute inset-0 h-full w-full object-cover"
              />
              <div class={['absolute inset-0 transition-colors duration-700', hoveredEpoch.value === 'old' ? 'bg-stone-900/40' : 'bg-stone-900/60']} />

              <div class="absolute inset-0 flex flex-col justify-end p-8 md:p-12">
                <div class={['transform transition-[transform,opacity] duration-700', hoveredEpoch.value === 'old' ? 'translate-y-0 opacity-100' : 'translate-y-4 md:opacity-80']}>
                  <div class="mb-3 text-xs font-bold uppercase tracking-[0.2em] text-[#dcb589]">~ 1000 г. н.э.</div>
                  <h3 class="mb-2 whitespace-nowrap text-3xl font-light text-white md:text-4xl">Каменные замки</h3>

                  <div class={['grid transition-[grid-template-rows,opacity] duration-700 ease-in-out', hoveredEpoch.value === 'old' ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0']}>
                    <div class="overflow-hidden">
                      <p class="max-w-sm pt-4 text-sm font-light text-stone-300 md:text-base">
                        Вершина инженерии своего времени. Технологии, создавшие эталон долговечности и надежности. Мы отдаем дань уважения
                        их монументальности.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div
              class="relative h-full cursor-pointer touch-manipulation overflow-hidden bg-stone-900"
              style={{
                flex: hoveredEpoch.value === 'new' ? 2 : hoveredEpoch.value === 'old' ? 0.6 : 1,
                transition: 'flex 0.8s cubic-bezier(0.25, 1, 0.5, 1)',
              }}
              role="button"
              tabindex={0}
              aria-expanded={hoveredEpoch.value === 'new'}
              onMouseenter={supportsHover.value ? () => (hoveredEpoch.value = 'new') : undefined}
              onMouseleave={supportsHover.value ? () => (hoveredEpoch.value = null) : undefined}
              onClick={() => activateEpoch('new')}
              onKeydown={(event: KeyboardEvent) => {
                if (event.key === 'Enter' || event.key === ' ') {
                  event.preventDefault();
                  activateEpoch('new');
                }
              }}
            >
              <img
                src="/image/projects/portfolio-02.webp"
                alt=""
                aria-hidden="true"
                loading="lazy"
                decoding="async"
                fetchpriority="low"
                class="absolute inset-0 h-full w-full object-cover"
              />
              <div class={['absolute inset-0 transition-colors duration-700', hoveredEpoch.value === 'new' ? 'bg-stone-900/40' : 'bg-stone-900/60']} />

              <div class="absolute inset-0 flex flex-col justify-end p-8 md:p-12">
                <div class={['transform transition-[transform,opacity] duration-700', hoveredEpoch.value === 'new' ? 'translate-y-0 opacity-100' : 'translate-y-4 md:opacity-80']}>
                  <div class="mb-3 text-xs font-bold uppercase tracking-[0.2em] text-[#dcb589]">Наши дни</div>
                  <h3 class="mb-2 whitespace-nowrap text-3xl font-light text-white md:text-4xl">CLT и SCIP</h3>

                  <div class={['grid transition-[grid-template-rows,opacity] duration-700 ease-in-out', hoveredEpoch.value === 'new' ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0']}>
                    <div class="overflow-hidden">
                      <p class="max-w-sm pt-4 text-sm font-light text-stone-300 md:text-base">
                        Эволюция прочности. Мы переносим надежность прошлого в наше время, наделяя ее абсолютным комфортом и интеллектом
                        современных материалов.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  },
});

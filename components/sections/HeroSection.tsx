import { useHead } from '#imports';
import { ArrowRight, ChevronDown } from 'lucide-vue-next';
import { defineComponent, ref, watch, type PropType } from 'vue';
import Reveal from '~/components/ui/Reveal';
import { heroImages } from '~/data/siteContent';

export default defineComponent({
  name: 'HeroSection',
  props: {
    isMobile: {
      type: Boolean,
      default: false,
    },
    isLoading: {
      type: Boolean,
      default: false,
    },
    navigateToSection: {
      type: Function as PropType<(event: Event | MouseEvent, id: string) => void>,
      required: true,
    },
  },
  setup(props) {
    const heroSlide = ref({ prev: heroImages.length - 1, current: 0 });
    const isReady = ref(false);

    useHead({
      link: [
        { rel: 'preload', as: 'image', href: '/image/logo.webp' },
        { rel: 'preload', as: 'image', href: heroImages[0] },
      ],
    });

    const handleManualSlide = (index: number) => {
      if (index === heroSlide.value.current) {
        return;
      }

      heroSlide.value = {
        prev: heroSlide.value.current,
        current: index,
      };
    };

    watch(
      () => props.isLoading,
      (loading, _prev, onCleanup) => {
        if (!import.meta.client) {
          return;
        }

        if (loading) {
          isReady.value = false;
          return;
        }

        isReady.value = true;

        const timer = window.setInterval(() => {
          heroSlide.value = {
            prev: heroSlide.value.current,
            current: (heroSlide.value.current + 1) % heroImages.length,
          };
        }, 6000);

        onCleanup(() => {
          window.clearInterval(timer);
        });
      },
      { immediate: true },
    );

    return () => {
      const currentSlide = heroSlide.value.current;
      const previousSlide = heroSlide.value.prev;
      const isReadyValue = isReady.value;

      return (
        <section id="hero" class="relative h-screen w-full overflow-hidden bg-stone-950">
          <div class="absolute inset-0 h-full w-full">
            {heroImages.map((src, index) => {
              let zIndex = 0;
              let clipPath = 'inset(0 100% 0 0)';
              let transition = '';

              if (index === currentSlide) {
                zIndex = 20;
                clipPath = 'inset(0 0 0 0)';
                transition = 'clip-path 1.5s cubic-bezier(0.77, 0, 0.175, 1)';
              } else if (index === previousSlide) {
                zIndex = 10;
                clipPath = 'inset(0 0 0 0)';
                transition = 'none';
              }

              return (
                <div key={src} class="absolute inset-0 h-full w-full" style={{ zIndex, clipPath, transition }}>
                  <div
                    class={['absolute inset-0 h-full w-full scale-105', props.isMobile ? '' : 'will-change-transform']}
                    style={{
                      transform: 'scale(1.05)',
                      backgroundImage: `url(${src})`,
                      backgroundSize: 'cover',
                      backgroundPosition: 'center',
                    }}
                  />
                </div>
              );
            })}
          </div>

          <div class="absolute inset-0 z-30 bg-gradient-to-b from-stone-900/60 via-stone-900/30 to-stone-900/80" />

          <div class="relative z-40 mx-auto flex h-full max-w-7xl flex-col justify-end px-6 pb-20 sm:pb-24 md:px-12 md:pb-32">
            <Reveal isReady={isReadyValue} delay={200}>
              <div class="mb-6 flex items-center gap-4">
                <div class="h-[1px] w-12 bg-white" />
                <span class="text-xs font-bold uppercase tracking-[0.2em] text-white">Будущее строительства</span>
              </div>
            </Reveal>

            <Reveal isReady={isReadyValue} delay={400}>
              <h1 class="bronze-text-light mb-6 max-w-4xl text-4xl font-light leading-[1.1] tracking-tighter sm:text-5xl md:text-7xl lg:text-8xl">
                Архитектурная чистота.
                <br />
                <span class="bg-gradient-to-r from-[#f8d5a6] to-white/60 bg-clip-text font-medium text-transparent">Инженерия на века.</span>
              </h1>
            </Reveal>

            <Reveal isReady={isReadyValue} delay={600}>
              <div class="flex flex-col items-start gap-6 sm:flex-row sm:items-center">
                <button
                  onClick={(event: MouseEvent) => props.navigateToSection(event, 'technology')}
                  class="group flex w-full items-center justify-center gap-2 bg-white px-8 py-4 text-sm font-medium text-stone-900 transition-colors hover:bg-stone-100 sm:w-auto"
                >
                  Изучить технологию SCIP
                  <ArrowRight size={16} class="transition-transform group-hover:translate-x-1" />
                </button>
              </div>
            </Reveal>
          </div>

          <div class={['absolute bottom-10 right-6 z-40 flex items-center gap-3 transition-opacity duration-1000 md:right-12', isReadyValue ? 'opacity-100' : 'opacity-0']}>
            {heroImages.map((_, index) => (
              <button
                key={index}
                onClick={() => handleManualSlide(index)}
                class="h-[3px] rounded-full transition-all duration-500"
                aria-label={`Перейти к слайду ${index + 1}`}
                style={{
                  width: index === currentSlide ? '32px' : '16px',
                  backgroundColor: index === currentSlide ? '#ffffff' : 'rgba(255,255,255,0.3)',
                  cursor: 'pointer',
                }}
              />
            ))}
          </div>

          <div
            class={[
              'absolute bottom-8 left-1/2 z-40 -translate-x-1/2 cursor-pointer text-white/50 transition-opacity duration-1000 animate-bounce',
              isReadyValue ? 'opacity-100' : 'opacity-0',
            ]}
            onClick={(event: MouseEvent) => props.navigateToSection(event, 'vision')}
          >
            <ChevronDown size={24} />
          </div>
        </section>
      );
    };
  },
});

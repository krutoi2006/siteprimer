import { useHead } from '#imports';
import { ArrowRight, ChevronDown } from 'lucide-vue-next';
import { defineComponent, ref, watch, type PropType } from 'vue';
import Reveal from '~/components/ui/Reveal';

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
    isWeakDevice: {
      type: Boolean,
      default: false,
    },
    navigateToSection: {
      type: Function as PropType<(event: Event | MouseEvent, id: string) => void>,
      required: true,
    },
  },
  setup(props) {
    const isReady = ref(false);

    useHead({
      link: [
        { rel: 'preload', as: 'image', href: '/image/logo.webp' },
        { rel: 'preload', as: 'video', href: '/video/SAS.mp4', type: 'video/mp4' },
      ],
    });

    watch(
      () => props.isLoading,
      (loading) => {
        if (loading) {
          isReady.value = false;
          return;
        }

        isReady.value = true;
      },
      { immediate: true },
    );

    return () => {
      const isReadyValue = isReady.value;

      return (
        <section id="hero" class="relative h-screen w-full overflow-hidden bg-stone-950">
          <div class="absolute inset-0 h-full w-full">
            <video
              class={['absolute inset-0 h-full w-full object-cover', props.isWeakDevice ? '' : 'will-change-transform']}
              autoplay
              muted
              loop
              playsinline
              preload={props.isWeakDevice ? 'metadata' : 'auto'}
            >
              <source src="/video/SAS.mp4" type="video/mp4" />
            </video>
          </div>

          <div class="absolute inset-0 z-30 bg-gradient-to-b from-stone-900/60 via-stone-900/30 to-stone-900/80" />

          <div class="relative z-40 mx-auto flex h-full max-w-7xl flex-col justify-end px-5 pb-14 sm:px-6 sm:pb-20 md:px-12 md:pb-32">
            <Reveal isReady={isReadyValue} delay={200}>
              <div class="mb-4 flex items-center gap-3 sm:mb-6 sm:gap-4">
                <div class="h-[1px] w-8 bg-white sm:w-12" />
                <span class="text-[10px] font-bold uppercase tracking-[0.2em] text-white sm:text-xs">Будущее строительства</span>
              </div>
            </Reveal>

            <Reveal isReady={isReadyValue} delay={400}>
              <h1 class="bronze-text-light mb-4 max-w-5xl text-[1.2rem] font-light leading-[1.08] tracking-[-0.03em] sm:mb-6 sm:text-2xl md:text-4xl lg:text-5xl xl:text-6xl">
                <span class="block">Дом который вы искали и нашли</span>
                <span class="block">В него хочется возвращаться</span>
                <span class="block">Неповторимость во всем</span>
              </h1>
            </Reveal>

            <Reveal isReady={isReadyValue} delay={600}>
              <div class="flex flex-col items-start gap-4 sm:flex-row sm:items-center sm:gap-6">
                <button
                  onClick={(event: MouseEvent) => props.navigateToSection(event, 'technology')}
                  class="group flex w-full items-center justify-center gap-2 bg-white px-6 py-3 text-xs font-medium text-stone-900 transition-colors hover:bg-stone-100 sm:w-auto sm:px-8 sm:py-4 sm:text-sm"
                >
                  Изучить технологию SCIP
                  <ArrowRight size={16} class="transition-transform group-hover:translate-x-1" />
                </button>
              </div>
            </Reveal>
          </div>

          <div
            class={[
              'absolute bottom-4 left-1/2 z-40 -translate-x-1/2 cursor-pointer text-white/50 transition-opacity duration-1000 sm:bottom-8',
              props.isMobile ? '' : 'animate-bounce',
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

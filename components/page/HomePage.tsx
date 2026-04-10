import { useSeoMeta } from '#imports';
import { ArrowRight, X } from 'lucide-vue-next';
import {
  defineAsyncComponent,
  defineComponent,
  onBeforeUnmount,
  onMounted,
  ref,
  watch,
  type CSSProperties,
} from 'vue';
import HomeClosingSections from '~/components/page/home/HomeClosingSections';
import HomeProcessSections from '~/components/page/home/HomeProcessSections';
import HomeVisionSection from '~/components/page/home/HomeVisionSection';
import HeritageSection from '~/components/sections/HeritageSection';
import HeroSection from '~/components/sections/HeroSection';
import { useDeviceProfile } from '~/composables/useDeviceProfile';
import { useMobileOrientation } from '~/composables/useMobileOrientation';
import { useScrollEffects } from '~/composables/useScrollEffects';
import { navItems } from '~/data/siteContent';

const HomeTechnologySection = defineAsyncComponent(() => import('~/components/page/home/HomeTechnologySection'));
const HomeBuildSections = defineAsyncComponent(() => import('~/components/page/home/HomeBuildSections'));
const HomeProjectsSection = defineAsyncComponent(() => import('~/components/page/home/HomeProjectsSection'));
const HomeFaqSection = defineAsyncComponent(() => import('~/components/page/home/HomeFaqSection'));

export default defineComponent({
  name: 'IndexPage',
  setup() {
    useSeoMeta({
      title: 'Santilli Architecture',
      description:
        'Архитектурный лендинг Santilli Architecture о технологии SCIP, проектировании, строительстве и сопровождении частных резиденций.',
    });

    const rootRef = ref<HTMLElement | null>(null);
    const isMenuOpen = ref(false);
    const isLoading = ref(true);
    const isFadingOut = ref(false);
    const isModalOpen = ref(false);

    const isScrolled = useScrollEffects(rootRef);
    const { isWeakDevice } = useDeviceProfile();
    const { isMobilePortrait, isMobile } = useMobileOrientation();

    let fadeTimer: number | undefined;
    let removeTimer: number | undefined;

    const openModal = () => {
      isModalOpen.value = true;
    };

    const closeModal = () => {
      isModalOpen.value = false;
    };

    const scrollToSection = (event: Event | MouseEvent, id: string) => {
      event.preventDefault?.();

      if (!import.meta.client) {
        return;
      }

      const element = document.getElementById(id);
      if (element) {
        const headerOffset = 80;
        const elementPosition = element.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth',
        });
      }

      isMenuOpen.value = false;
    };

    const rootStyle = {
      '--technology-parallax': '0px',
      '--construction-parallax': '0px',
    } as CSSProperties;

    onMounted(() => {
      if (!import.meta.client) {
        return;
      }

      fadeTimer = window.setTimeout(() => {
        isFadingOut.value = true;
      }, 1600);

      removeTimer = window.setTimeout(() => {
        isLoading.value = false;
      }, 2200);
    });

    watch(
      [isModalOpen, isMenuOpen, isLoading],
      ([modalOpen, menuOpen, loading]) => {
        if (!import.meta.client) {
          return;
        }

        document.body.style.overflow = modalOpen || menuOpen || loading ? 'hidden' : 'unset';
      },
      { immediate: true },
    );

    onBeforeUnmount(() => {
      if (!import.meta.client) {
        return;
      }

      if (fadeTimer) {
        window.clearTimeout(fadeTimer);
      }

      if (removeTimer) {
        window.clearTimeout(removeTimer);
      }

      document.body.style.overflow = 'unset';
    });

    return () => {
      const isMenuOpenValue = isMenuOpen.value;
      const isScrolledValue = isScrolled.value;
      const isModalOpenValue = isModalOpen.value;
      const isLoadingValue = isLoading.value;
      const isFadingOutValue = isFadingOut.value;
      const isMobileValue = isMobile.value;
      const isMobilePortraitValue = isMobilePortrait.value;
      const isWeakDeviceValue = isWeakDevice.value;

      return (
        <div
          ref={rootRef}
          style={rootStyle}
          class={[
            'min-h-screen overflow-x-hidden bg-stone-50 font-sans text-stone-900 selection:bg-stone-300 selection:text-stone-900',
            isWeakDeviceValue ? 'device-weak' : '',
          ]}
        >
          {isLoadingValue ? (
            <div
              class={[
                'fixed inset-0 z-[100] flex items-center justify-center bg-white transition-opacity duration-1000 ease-in-out',
                isFadingOutValue ? 'pointer-events-none opacity-0' : 'opacity-100',
              ]}
            >
              <div class={['transform transition-[transform,opacity] duration-[1800ms] ease-out', isFadingOutValue ? 'scale-[1.03] opacity-0' : 'scale-100 opacity-100']}>
                <img
                  src="/image/logo.webp"
                  alt="Santilli Architecture Logo"
                  loading="eager"
                  decoding="async"
                  class="w-64 object-contain md:w-96"
                />
              </div>
            </div>
          ) : null}

          <div
            class={[
              'fixed inset-0 z-[200] flex items-center justify-center p-4 transition-all duration-500 sm:p-6',
              isModalOpenValue ? 'visible opacity-100' : 'invisible pointer-events-none opacity-0',
            ]}
          >
            <div class="absolute inset-0 bg-stone-900/60 backdrop-blur-sm transition-opacity" onClick={closeModal} />

            <div
              class={[
                'relative w-full max-w-lg bg-white p-8 shadow-2xl transition-all duration-500 ease-out md:p-12',
                isModalOpenValue ? 'translate-y-0 scale-100' : 'translate-y-8 scale-95',
              ]}
            >
              <button onClick={closeModal} class="absolute right-6 top-6 text-stone-400 transition-colors hover:text-stone-900">
                <X size={24} strokeWidth={1.5} />
              </button>

              <div class="mb-10">
                <h3 class="bronze-text mb-3 text-3xl font-light tracking-tight">Частная консультация</h3>
                <p class="text-sm leading-relaxed text-stone-500">
                  Оставьте свои контактные данные, и наш ведущий архитектор свяжется с вами для обсуждения вашего проекта.
                </p>
              </div>

              <form
                class="space-y-6"
                onSubmit={(event: Event) => {
                  event.preventDefault();
                }}
              >
                <div class="space-y-1">
                  <label for="name" class="text-xs font-bold uppercase tracking-widest text-stone-400">
                    Ваше Имя
                  </label>
                  <input
                    type="text"
                    id="name"
                    required
                    class="w-full border-b border-stone-200 bg-transparent py-2 text-stone-900 transition-colors focus:border-stone-900 focus:outline-none"
                  />
                </div>

                <div class="grid grid-cols-1 gap-6 sm:grid-cols-2">
                  <div class="space-y-1">
                    <label for="phone" class="text-xs font-bold uppercase tracking-widest text-stone-400">
                      Телефон
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      required
                      class="w-full border-b border-stone-200 bg-transparent py-2 text-stone-900 transition-colors focus:border-stone-900 focus:outline-none"
                    />
                  </div>
                  <div class="space-y-1">
                    <label for="email" class="text-xs font-bold uppercase tracking-widest text-stone-400">
                      Email
                    </label>
                    <input
                      type="email"
                      id="email"
                      required
                      class="w-full border-b border-stone-200 bg-transparent py-2 text-stone-900 transition-colors focus:border-stone-900 focus:outline-none"
                    />
                  </div>
                </div>

                <div class="space-y-1">
                  <label for="details" class="text-xs font-bold uppercase tracking-widest text-stone-400">
                    Кратко о проекте (опционально)
                  </label>
                  <textarea
                    id="details"
                    rows={3}
                    class="w-full resize-none border-b border-stone-200 bg-transparent py-2 text-stone-900 transition-colors focus:border-stone-900 focus:outline-none"
                  />
                </div>

                <button type="submit" class="mt-8 w-full bg-stone-900 px-8 py-4 text-sm font-medium text-white transition-colors hover:bg-stone-800">
                  Отправить запрос
                </button>
                <p class="mt-4 text-center text-[10px] uppercase tracking-widest text-stone-400">Ваши данные надежно защищены</p>
              </form>
            </div>
          </div>

          <nav
            class={[
              'fixed w-full transition-all duration-500',
              isMenuOpenValue ? 'z-[70]' : 'z-50',
              isScrolledValue ? 'bg-white/80 py-4 backdrop-blur-lg' : 'bg-transparent py-6',
            ]}
          >
            <div class="mx-auto flex max-w-7xl items-center justify-between px-6 md:px-12">
              <div
                class={[
                  'group flex cursor-pointer items-center gap-2 transition-opacity duration-300',
                  isMenuOpenValue ? 'pointer-events-none opacity-0 md:pointer-events-auto md:opacity-100' : 'opacity-100',
                ]}
                onClick={(event: MouseEvent) => scrollToSection(event, 'hero')}
              >
                <div class="flex h-8 w-8 items-center justify-center bg-stone-900 transition-transform duration-500 group-hover:rotate-90">
                  <div class="h-3 w-3 border border-white" />
                </div>
                <span class={['text-xl font-medium tracking-tight transition-colors duration-500', isScrolledValue ? 'bronze-text' : 'bronze-text-light']}>
                  SANTILLI
                </span>
                <div
                  class={[
                    'overflow-hidden rounded-full border transition-all duration-500',
                    isScrolledValue
                      ? 'border-stone-200 bg-white/90 shadow-[0_8px_24px_rgba(28,25,23,0.08)]'
                      : 'border-white/15 bg-white/10 backdrop-blur-sm',
                  ]}
                >
                  <img src="/image/23.webp" alt="Italy and Russia" class="h-9 w-16 object-contain" />
                </div>
              </div>

              <div class="hidden items-center gap-6 lg:gap-8 xl:gap-10 md:flex">
                {navItems.map((item) => (
                  <a
                    key={item.id}
                    href={`#${item.id}`}
                    onClick={(event: MouseEvent) => scrollToSection(event, item.id)}
                    class={[
                      'text-sm font-medium transition-colors duration-300 hover:text-stone-400',
                      isScrolledValue ? 'text-stone-600 hover:text-stone-900' : 'text-stone-300 hover:text-white',
                    ]}
                  >
                    {item.label}
                  </a>
                ))}
                <button
                  onClick={openModal}
                  class={[
                    'group flex items-center gap-2 px-6 py-2.5 text-sm font-medium transition-all duration-300',
                    isScrolledValue ? 'bg-stone-900 text-white hover:bg-stone-800' : 'bg-white text-stone-900 hover:bg-stone-200',
                  ]}
                >
                  Связаться
                  <ArrowRight size={14} class="transition-transform group-hover:translate-x-1" />
                </button>
              </div>

              <button
                type="button"
                aria-label={isMenuOpenValue ? 'Close menu' : 'Open menu'}
                class={[
                  'relative z-[60] flex h-11 w-11 items-center justify-center rounded-full text-stone-900 transition-all duration-300 md:hidden',
                  isScrolledValue ? 'bg-white shadow-sm ring-1 ring-stone-200/80 hover:bg-white' : 'bg-transparent shadow-none ring-0 hover:bg-transparent',
                ]}
                onClick={() => {
                  isMenuOpen.value = !isMenuOpen.value;
                }}
              >
                <span
                  class={[
                    'absolute h-[2px] w-5 rounded-full bg-current transition-all duration-500 ease-out',
                    isMenuOpenValue ? 'translate-y-0 rotate-45' : '-translate-y-[7px]',
                  ]}
                />
                <span
                  class={[
                    'absolute h-[2px] w-5 rounded-full bg-current transition-all duration-300 ease-out',
                    isMenuOpenValue ? 'scale-x-0 opacity-0' : 'scale-x-100 opacity-100',
                  ]}
                />
                <span
                  class={[
                    'absolute h-[2px] w-5 rounded-full bg-current transition-all duration-500 ease-out',
                    isMenuOpenValue ? 'translate-y-0 -rotate-45' : 'translate-y-[7px]',
                  ]}
                />
              </button>
            </div>
          </nav>

          <div
            class={[
              'fixed inset-0 z-[55] bg-stone-50 px-6 pb-8 pt-28 transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] md:hidden',
              isMenuOpenValue ? 'visible translate-y-0 opacity-100' : 'invisible pointer-events-none -translate-y-full opacity-0',
            ]}
          >
            <div class="flex min-h-full flex-col gap-6 text-xl font-light tracking-tight sm:text-2xl">
              {navItems.map((item) => (
                <a
                  key={item.id}
                  href={`#${item.id}`}
                  onClick={(event: MouseEvent) => scrollToSection(event, item.id)}
                  class="border-b border-stone-300 pb-4 text-2xl font-medium leading-tight text-stone-950 sm:text-[2rem]"
                >
                  {item.label}
                </a>
              ))}
              <button
                onClick={() => {
                  isMenuOpen.value = false;
                  openModal();
                }}
                class="mt-auto flex w-full items-center justify-center gap-2 bg-stone-900 px-6 py-4 text-sm font-medium text-white"
              >
                Начать проект
              </button>
            </div>
          </div>

          <HeroSection
            isMobile={isMobileValue}
            isWeakDevice={isWeakDeviceValue}
            isLoading={isLoadingValue}
            navigateToSection={scrollToSection}
          />

          <HeritageSection isMobile={isMobileValue} />
          <HomeVisionSection />
          <HomeProcessSections isMobile={isMobileValue} />
          <HomeTechnologySection isMobile={isMobileValue} />
          <HomeBuildSections isMobile={isMobileValue} />
          <HomeProjectsSection isMobile={isMobileValue} isMobilePortrait={isMobilePortraitValue} />
          <HomeFaqSection />
          <HomeClosingSections openModal={openModal} navigateToSection={scrollToSection} />
        </div>
      );
    };
  },
});

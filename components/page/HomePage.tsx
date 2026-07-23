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
import { withSiteBase } from '~/utils/withSiteBase';

const HomeTechnologySection = defineAsyncComponent(() => import('~/components/page/home/HomeTechnologySection'));
const HomeBuildSections = defineAsyncComponent(() => import('~/components/page/home/HomeBuildSections'));
const HomeProjectsSection = defineAsyncComponent(() => import('~/components/page/home/HomeProjectsSection'));
const HomeFaqSection = defineAsyncComponent(() => import('~/components/page/home/HomeFaqSection'));

export default defineComponent({
  name: 'IndexPage',
  setup() {
      useSeoMeta({
        title: 'ЭвоСтройТех',
        description:
          'ЭвоСтройТех — лендинг о технологии SCIP, проектировании, строительстве и сопровождении монолитных домов нового поколения.',
      });

    const rootRef = ref<HTMLElement | null>(null);
    const isMenuOpen = ref(false);
    const isLoading = ref(true);
    const isFadingOut = ref(false);
    const isModalOpen = ref(false);
    const lockedScrollY = ref(0);
    const logoSrc = withSiteBase('/image/logo.webp');
    const badgeImageSrc = withSiteBase('/image/23.webp');

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

        const shouldLock = modalOpen || menuOpen || loading;
        const { body, documentElement } = document;

        if (shouldLock) {
          lockedScrollY.value = window.scrollY;
          body.style.position = 'fixed';
          body.style.top = `-${lockedScrollY.value}px`;
          body.style.left = '0';
          body.style.right = '0';
          body.style.width = '100%';
          body.style.overflow = 'hidden';
          documentElement.style.overflow = 'hidden';
          return;
        }

        const scrollY = lockedScrollY.value;
        body.style.position = '';
        body.style.top = '';
        body.style.left = '';
        body.style.right = '';
        body.style.width = '';
        body.style.overflow = '';
        documentElement.style.overflow = '';
        window.scrollTo({ top: scrollY, behavior: 'auto' });
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

      document.body.style.position = '';
      document.body.style.top = '';
      document.body.style.left = '';
      document.body.style.right = '';
      document.body.style.width = '';
      document.body.style.overflow = '';
      document.documentElement.style.overflow = '';
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
                  src={logoSrc}
                  alt="ЭвоСтройТех Logo"
                  loading="eager"
                  decoding="async"
                  class="w-64 object-contain md:w-96"
                />
              </div>
            </div>
          ) : null}

          <div
            class={[
              'fixed inset-0 z-[200] overflow-y-auto p-3 transition-all duration-500 sm:p-6',
              isModalOpenValue ? 'visible opacity-100' : 'invisible pointer-events-none opacity-0',
            ]}
          >
            <div class="fixed inset-0 bg-stone-900/60 backdrop-blur-sm transition-opacity" onClick={closeModal} />

            <div
              class={[
                'relative z-10 mx-auto flex min-h-full w-full max-w-lg items-center py-4 sm:py-8',
              ]}
            >
              <div
                class={[
                  'relative w-full bg-white p-5 shadow-2xl transition-all duration-500 ease-out sm:p-8 md:p-12',
                isModalOpenValue ? 'translate-y-0 scale-100' : 'translate-y-8 scale-95',
              ]}
            >
              <button onClick={closeModal} class="absolute right-6 top-6 text-stone-400 transition-colors hover:text-stone-900">
                <X size={24} strokeWidth={1.5} />
              </button>

              <div class="mb-6 sm:mb-8">
                <h3 class="bronze-text mb-3 text-2xl font-light tracking-tight sm:text-3xl">Свяжитесь с нами</h3>
                <p class="text-sm leading-relaxed text-stone-500 sm:text-base">
                  Форму заявки убрали. Для обращения просто позвоните по номеру ниже, и мы сразу обсудим ваш проект.
                </p>
              </div>

              <div class="space-y-5">
                <a
                  href="tel:+79770899632"
                  class="flex items-center justify-center bg-stone-900 px-6 py-4 text-center text-lg font-medium tracking-[0.08em] text-white transition-colors hover:bg-stone-800 sm:text-xl"
                >
                  +7 977 089-96-32
                </a>
                <a
                  href="mailto:info@evostroytec.ru"
                  class="flex items-center justify-center break-all bg-stone-900 px-6 py-4 text-center text-lg font-medium tracking-[0.08em] text-white transition-colors hover:bg-stone-800 sm:text-xl"
                >
                  info@evostroytec.ru
                </a>
                <p class="text-center text-[11px] uppercase tracking-[0.22em] text-stone-400">
                  Контакты для обращения
                </p>
              </div>
              </div>
            </div>
          </div>

          <nav
            class={[
              'fixed w-full transition-all duration-500',
              isMenuOpenValue ? 'z-[70]' : 'z-50',
              isScrolledValue ? 'bg-white/80 py-3 backdrop-blur-lg sm:py-4' : 'bg-transparent py-4 sm:py-6',
            ]}
          >
            <div class="mx-auto flex max-w-7xl items-center justify-between px-5 sm:px-6 md:px-12">
              <div
                class={[
                  'group flex cursor-pointer items-center gap-2 transition-opacity duration-300',
                  isMenuOpenValue ? 'pointer-events-none opacity-0 md:pointer-events-auto md:opacity-100' : 'opacity-100',
                ]}
                onClick={(event: MouseEvent) => scrollToSection(event, 'hero')}
              >
                <div class="flex h-7 w-7 items-center justify-center bg-stone-900 transition-transform duration-500 group-hover:rotate-90 sm:h-8 sm:w-8">
                  <div class="h-2.5 w-2.5 border border-white sm:h-3 sm:w-3" />
                </div>
                <span class={['text-lg font-medium tracking-tight transition-colors duration-500 sm:text-xl', isScrolledValue ? 'bronze-text' : 'bronze-text-light']}>
                  ЭвоСтройТех
                </span>
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
                <div
                  class={[
                    'ml-2 overflow-hidden rounded-full border p-1 transition-all duration-500',
                    isScrolledValue
                      ? 'border-stone-200 bg-white/90 shadow-[0_8px_24px_rgba(28,25,23,0.08)]'
                      : 'border-white/15 bg-white/10 backdrop-blur-sm',
                  ]}
                >
                  <img src={badgeImageSrc} alt="Italy and Russia" class="h-[72px] w-32 object-contain" />
                </div>
              </div>

              <div class="flex items-center gap-2 md:hidden">
                <div
                  class={[
                    'overflow-hidden rounded-full border p-1 transition-all duration-500',
                    isScrolledValue
                      ? 'border-stone-200 bg-white/90 shadow-[0_8px_24px_rgba(28,25,23,0.08)]'
                      : 'border-white/15 bg-white/10 backdrop-blur-sm',
                  ]}
                >
                  <img src={badgeImageSrc} alt="Italy and Russia" class="h-10 w-[74px] object-contain sm:h-11 sm:w-20" />
                </div>

                <button
                  type="button"
                  aria-label={isMenuOpenValue ? 'Close menu' : 'Open menu'}
                  class={[
                    'relative z-[60] flex h-10 w-10 items-center justify-center rounded-full transition-all duration-300 sm:h-11 sm:w-11',
                    isMenuOpenValue
                      ? 'text-stone-900'
                      : isScrolledValue
                        ? 'bg-white text-stone-900 shadow-sm ring-1 ring-stone-200/80 hover:bg-white'
                        : 'bg-white/10 text-white backdrop-blur-sm hover:bg-white/20',
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
            </div>
          </nav>

          <div
            class={[
              'fixed inset-0 z-[55] overflow-y-auto bg-stone-50 px-5 pb-6 pt-20 transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] sm:px-6 sm:pb-8 sm:pt-24 md:hidden',
              isMenuOpenValue ? 'visible translate-y-0 opacity-100' : 'invisible pointer-events-none -translate-y-full opacity-0',
            ]}
          >
            <div class="flex min-h-full flex-col gap-4 text-xl font-light tracking-tight sm:gap-6 sm:text-2xl">
              {navItems.map((item) => (
                <a
                  key={item.id}
                  href={`#${item.id}`}
                  onClick={(event: MouseEvent) => scrollToSection(event, item.id)}
                  class="border-b border-stone-200 pb-3 text-xl font-medium leading-tight text-stone-950 transition-colors active:text-stone-500 sm:pb-4 sm:text-2xl"
                >
                  {item.label}
                </a>
              ))}
              <button
                onClick={() => {
                  isMenuOpen.value = false;
                  openModal();
                }}
                class="mt-auto flex w-full items-center justify-center gap-2 bg-stone-900 px-6 py-3.5 text-sm font-medium text-white active:bg-stone-700 sm:py-4"
              >
                Начать проект
              </button>
            </div>
          </div>

          <section class="relative overflow-hidden bg-stone-950 text-stone-100">
            <div class="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(245,158,11,0.16),transparent_34%),linear-gradiнаent(160deg,rgba(24,24,27,0.98)_0%,rgba(12,10,9,1)_52%,rgba(28,25,23,0.98)_100%)]" />
            <div class="absolute left-1/2 top-24 h-48 w-48 -translate-x-1/2 rounded-full bg-amber-200/10 blur-3xl sm:h-72 sm:w-72" />

            <div class="relative mx-auto flex min-h-[92vh] max-w-6xl flex-col px-5 pb-16 pt-28 sm:px-6 sm:pb-20 sm:pt-32 md:px-12 md:pt-36">
              <div class="mx-auto max-w-5xl text-center">
                <h1 class="bronze-text-light mt-5 text-4xl font-light uppercase leading-[0.96] tracking-[-0.05em] sm:mt-6 sm:text-5xl md:text-6xl lg:text-7xl xl:text-[5.5rem]">
                  ЭВОЛЮЦИОННЫЕ СТРОИТЕЛЬНЫЕ ТЕХНОЛОГИИ
                </h1>
              </div>

              <div class="mx-auto mt-10 h-px w-24 bg-gradient-to-r from-transparent via-amber-200/80 to-transparent sm:mt-12 sm:w-36" />

              <div class="mx-auto mt-10 w-full max-w-4xl border border-white/10 bg-white/5 p-6 backdrop-blur-sm sm:mt-12 sm:p-8 md:p-10">
                <h2 class="text-center text-3xl font-light tracking-[-0.04em] text-white sm:text-4xl md:text-[2.75rem]">ЭвоСтройТех</h2>

                <div class="mt-6 space-y-5 text-sm leading-relaxed text-stone-300 sm:mt-8 sm:text-base md:text-lg">
                  <p class="text-balance text-center">
                    Высокопрочный монолитный железобетонный дом по цене и скорости каркасного строительства. Без компромиссов в безопасности, долговечности и комфорте.
                  </p>
                  <p class="text-balance text-center">
                    Пуленепробиваемый, сейсмостойкий, взрывоустойчивый, как дополнительная защита для танка из сетки и композитных материалов.
                  </p>
                  <p class="text-balance text-center">
                    Перфекционисты, Дизайнеры, Архитекторы, Экологи, особенно Музыканты, присядьте, чтоб не упасть в приятный обморок.
                  </p>
                  <p class="text-balance text-center text-stone-100">
                    Вопрос, который нам всегда задают — почему мы раньше не знали о вашей технологии строительства домов.
                  </p>
                </div>
              </div>

              <div class="mx-auto mt-8 w-full max-w-4xl border border-amber-200/20 bg-amber-100/5 px-6 py-6 text-center sm:mt-10 sm:px-8 sm:py-7 md:px-10 md:py-8">
                <p class="bronze-text-light text-lg font-light uppercase leading-tight tracking-[-0.04em] sm:text-2xl md:text-3xl lg:text-[2.2rem]">
                  МЫ СТРОИМ ЭВОЛЮЦИОННЫЕ МОНОЛИТНЫЕ ДОМА, ЧТОБЫ ЗАЩИТИТЬ ВАС И БЛИЗКИХ, ВАШИ ИНВЕСТИЦИИ.
                </p>
              </div>
            </div>
          </section>

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

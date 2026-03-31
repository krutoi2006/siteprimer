import { useSeoMeta } from '#imports';
import { ArrowRight, Clock, Shield, Smartphone, Wind, X } from 'lucide-vue-next';
import {
  defineComponent,
  onBeforeUnmount,
  onMounted,
  ref,
  watch,
  type CSSProperties,
} from 'vue';
import HeritageSection from '~/components/sections/HeritageSection';
import HeroSection from '~/components/sections/HeroSection';
import ScipVisualization from '~/components/sections/ScipVisualization';
import BriefAccordionItem from '~/components/ui/BriefAccordionItem';
import Reveal from '~/components/ui/Reveal';
import { useDeviceProfile } from '~/composables/useDeviceProfile';
import { useMobileOrientation } from '~/composables/useMobileOrientation';
import { useScrollEffects } from '~/composables/useScrollEffects';
import {
  architectureCards,
  budgetCards,
  companyLinks,
  conceptPoints,
  constructionStages,
  contactHighlights,
  contactLinks,
  designLayers,
  engineeringCards,
  handoverDocs,
  navItems,
  projectCards,
  siteInsights,
  stats,
  supervisionCards,
  supportCards,
} from '~/data/siteContent';

const technologyFeatures = [
  {
    Icon: Wind,
    title: 'Пассивная теплоэффективность',
    desc: 'Сплошное ядро из EPS устраняет тепловые мосты, кардинально снижая энергопотребление на отопление и охлаждение. Испытайте истинный климат-контроль.',
  },
  {
    Icon: Shield,
    title: 'Монолитная устойчивость',
    desc: 'Двойные слои железобетона создают структуру, изначально устойчивую к сейсмической активности, ураганным ветрам и огню. Крепость, замаскированная под искусство.',
  },
  {
    Icon: Clock,
    title: 'Ускоренное строительство',
    desc: 'Легкая панельная система позволяет проводить быструю сборку перед нанесением бетона, значительно сокращая сроки проекта без ущерба для качества.',
  },
];

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
    const activeBriefId = ref<string | null>(null);

    const isScrolled = useScrollEffects(rootRef);
    const { isWeakDevice } = useDeviceProfile();
    const { isMobilePortrait, isMobile } = useMobileOrientation();

    let fadeTimer: number | undefined;
    let removeTimer: number | undefined;

    const toggleBrief = (id: string) => {
      activeBriefId.value = activeBriefId.value === id ? null : id;
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

    const getDeferredSectionStyle = (size: '900px' | '1200px'): CSSProperties | undefined =>
      isMobile.value ? ({ contentVisibility: 'auto', containIntrinsicSize: size } as CSSProperties) : undefined;

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
      }, 2500);

      removeTimer = window.setTimeout(() => {
        isLoading.value = false;
      }, 3500);
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
              <div class={['transform transition-all duration-[3000ms] ease-out', isFadingOutValue ? 'scale-105 blur-sm' : 'scale-100 blur-0']}>
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

              <div class="hidden items-center gap-10 md:flex">
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
                  onClick={() => {
                    isModalOpen.value = true;
                  }}
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
                  isModalOpen.value = true;
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

          <section id="vision" class="relative bg-stone-50 py-32 md:py-48">
            <div class="mx-auto max-w-7xl px-6 md:px-12">
              <div class="grid grid-cols-1 gap-16 lg:grid-cols-12 lg:gap-8">
                <div class="lg:col-span-5">
                  <Reveal>
                    <h2 class="bronze-text overflow-visible text-3xl font-light leading-[1.18] tracking-tighter pt-[0.06em] pb-[0.16em] md:text-5xl">
                      Мы не просто строим дома.
                      <br />
                      <span class="font-medium">Мы создаем устойчивые убежища.</span>
                    </h2>
                  </Reveal>
                </div>
                <div class="flex flex-col gap-8 text-lg leading-relaxed text-stone-600 lg:col-span-6 lg:col-start-7">
                  <Reveal delay={200}>
                    <p>
                      SANTILLI представляет собой сдвиг парадигмы в развитии недвижимости. Объединяя высококлассный архитектурный дизайн с
                      передовой технологией структурных изоляционных панелей (SCIP), мы создаем жилые пространства, которые эстетически
                      великолепны и структурно неуязвимы.
                    </p>
                  </Reveal>
                  <Reveal delay={400}>
                    <p>
                      Наша методология устраняет компромиссы традиционного строительства. Мы предлагаем пространства с глубокой
                      теплоэффективностью, абсолютной акустической тишиной и устойчивостью к самым экстремальным условиям окружающей среды
                      — и все это при сокращении сроков строительства до 40%.
                    </p>
                  </Reveal>
                  <Reveal delay={600}>
                    <div class="group flex w-max cursor-pointer items-center gap-4 font-medium text-stone-900">
                      <span>Читать наш манифест</span>
                      <div class="h-[1px] w-8 bg-stone-900 transition-all duration-300 group-hover:w-12" />
                    </div>
                  </Reveal>
                </div>
              </div>
            </div>
          </section>

          <section class="relative overflow-hidden bg-stone-950 text-stone-900" style={getDeferredSectionStyle('900px')}>
            <div class="absolute inset-0">
              <div
                class={['absolute inset-x-0 -bottom-24 -top-24 scale-[1.08]', isMobileValue ? '' : 'will-change-transform']}
                style={{
                  transform: isMobileValue ? 'scale(1.08)' : 'translateY(var(--technology-parallax)) scale(1.08)',
                  backgroundImage: 'url(/image/dom2.webp)',
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                }}
              />
              <div class="absolute inset-0 bg-[linear-gradient(115deg,rgba(12,10,9,0.92)_10%,rgba(28,25,23,0.78)_45%,rgba(28,25,23,0.42)_100%)]" />
            </div>

            <div class="relative z-10 mx-auto max-w-7xl px-6 py-32 md:px-12 md:py-40">
              <div class="grid grid-cols-1 items-end gap-12 lg:grid-cols-12 lg:gap-10">
                <div class="lg:col-span-7">
                  <Reveal>
                    <div class="mb-4 text-xs font-bold uppercase tracking-[0.2em] text-stone-300">Старт проекта</div>
                    <h2 class="mb-6 text-4xl font-light leading-[1.05] tracking-tighter text-white md:text-6xl">Первичный контакт</h2>
                    <p class="max-w-2xl text-lg leading-relaxed text-stone-200">
                      Первая встреча дает клиенту ясность: мы обсуждаем задачу, показываем близкие по духу дома, сравниваем CLT и SCIP и
                      задаем честный диапазон бюджета.
                    </p>
                  </Reveal>

                  <Reveal delay={150}>
                    <p class="mt-8 max-w-2xl border-l border-white/30 pl-6 text-sm uppercase tracking-[0.16em] text-stone-200/90">
                      Пустых эскизов до понимания участка и реальной задачи мы не делаем.
                    </p>
                  </Reveal>
                </div>

                <div class="lg:col-span-4 lg:col-start-9">
                  <div class="grid gap-4" style={{ overflowAnchor: 'none' }}>
                    {contactHighlights.map((item, index) => (
                      <Reveal key={item.title} delay={index * 120}>
                        <BriefAccordionItem
                          id={`contact-${index}`}
                          activeId={activeBriefId}
                          onToggle={toggleBrief}
                          brief={item.desc}
                          briefTheme="dark"
                          buttonClass="group w-full border border-white/10 bg-white/5 p-6 text-left backdrop-blur-md transition-all duration-500 hover:border-white/20 hover:bg-white/10"
                          iconClass="mt-1 shrink-0 text-stone-300"
                          renderHeader={() => (
                            <div class="flex-1 pr-3">
                              <div class="mb-3 text-xs font-bold uppercase tracking-[0.18em] text-stone-300">{String(index + 1).padStart(2, '0')}</div>
                              <h3 class="text-xl font-medium leading-snug text-white">{item.title}</h3>
                            </div>
                          )}
                        />
                      </Reveal>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </section>

          <section class="relative overflow-hidden border-b border-stone-200 bg-stone-50 py-32">
            <div class="ambient-orb absolute -top-20 right-0 h-[420px] w-[420px] rounded-full bg-stone-200/50 opacity-70 blur-3xl" />
            <div class="relative z-10 mx-auto max-w-7xl px-6 md:px-12">
              <div class="grid grid-cols-1 gap-14 lg:grid-cols-12 lg:gap-8">
                <div class="lg:col-span-5">
                  <Reveal>
                    <div class="mb-4 text-xs font-bold uppercase tracking-[0.2em] text-stone-400">Исходные данные</div>
                    <h2 class="bronze-text mb-6 overflow-visible text-4xl font-light leading-[1.18] tracking-tighter pt-[0.06em] pb-[0.16em] md:text-5xl">
                      Выезд на участок и изыскания
                    </h2>
                    <p class="text-lg leading-relaxed text-stone-600">
                      Мы изучаем участок лично, потому что настоящее проектирование начинается не с плана из архива, а с живого понимания
                      места.
                    </p>
                  </Reveal>

                  <Reveal delay={180}>
                    <div class="mt-10 bg-stone-900 p-8 text-stone-50 md:p-10">
                      <div class="mb-3 text-xs font-bold uppercase tracking-[0.18em] text-stone-400">Важно</div>
                      <p class="text-2xl font-light leading-tight">Кадастрового плана недостаточно для настоящего проектирования.</p>
                    </div>
                  </Reveal>
                </div>

                <div class="grid gap-4 lg:col-span-6 lg:col-start-7">
                  {siteInsights.map((item, index) => (
                    <Reveal key={item.title} delay={index * 120}>
                      <BriefAccordionItem
                        id={`site-${index}`}
                        activeId={activeBriefId}
                        onToggle={toggleBrief}
                        brief={item.desc}
                        buttonClass="group w-full border border-stone-200 bg-white p-6 text-left backdrop-blur-md transition-all duration-500 hover:border-stone-300 hover:bg-stone-50 md:p-7"
                        iconClass="mt-1 shrink-0 text-stone-400"
                        renderHeader={() => (
                          <div class="flex-1 pr-3">
                            <div class="mb-3 text-xs font-bold uppercase tracking-[0.18em] text-stone-400">{String(index + 1).padStart(2, '0')}</div>
                            <h3 class="text-xl font-medium leading-snug text-stone-900">{item.title}</h3>
                          </div>
                        )}
                      />
                    </Reveal>
                  ))}
                </div>
              </div>
            </div>
          </section>

          <section class="relative overflow-hidden border-b border-stone-200 bg-white py-32">
            <div class="mx-auto max-w-7xl px-6 md:px-12">
              <div class="grid grid-cols-1 items-start gap-10 lg:grid-cols-12 lg:gap-8">
                <div class="lg:col-span-5">
                  <Reveal>
                    <div class="mb-4 text-xs font-bold uppercase tracking-[0.2em] text-stone-400">Концепция</div>
                    <h2 class="bronze-text mb-6 overflow-visible text-4xl font-light leading-[1.18] tracking-tighter pt-[0.06em] pb-[0.16em] md:text-5xl">
                      Эскиз с привязкой к участку
                    </h2>
                    <p class="text-lg leading-relaxed text-stone-600">
                      Концепция появляется только после реальных данных. Дом сразу проектируется под конкретный рельеф, ориентацию,
                      ограничения участка и логику основания.
                    </p>
                  </Reveal>
                </div>

                <div class="grid gap-6 lg:col-span-7">
                  <div class="grid gap-4">
                    {conceptPoints.map((point, index) => (
                      <Reveal key={point.title} delay={index * 100}>
                        <BriefAccordionItem
                          id={`concept-${index}`}
                          activeId={activeBriefId}
                          onToggle={toggleBrief}
                          brief={point.desc}
                          buttonClass="w-full border border-stone-200 bg-stone-50 px-5 py-6 text-left transition-colors duration-300 hover:bg-stone-100"
                          iconClass="mt-0.5 shrink-0 text-stone-400"
                          renderHeader={() => <p class="pr-3 text-sm font-medium leading-relaxed text-stone-700">{point.title}</p>}
                        />
                      </Reveal>
                    ))}
                  </div>

                  <Reveal delay={220}>
                    <div class="border border-stone-200 bg-stone-50 p-8 md:p-10">
                      <div class="mb-4 text-xs font-bold uppercase tracking-[0.2em] text-stone-400">Проектная база</div>
                      <h3 class="mb-5 text-3xl font-light tracking-tight text-stone-900 md:text-4xl">Архитектура и конструктив</h3>
                      <p class="mb-8 max-w-3xl text-lg leading-relaxed text-stone-600">
                        Здесь образ дома превращается в точную систему строительства. У CLT и SCIP разная конструктивная логика, но в обоих
                        случаях она доводится до ясной инженерной основы.
                      </p>
                      <div class="grid gap-4">
                        {architectureCards.map((item, index) => (
                          <BriefAccordionItem
                            key={item.title}
                            id={`architecture-${index}`}
                            activeId={activeBriefId}
                            onToggle={toggleBrief}
                            brief={item.desc}
                            buttonClass="w-full border border-stone-200 bg-white p-5 text-left backdrop-blur-md transition-all duration-500 hover:border-stone-300 hover:bg-stone-50"
                            iconClass="shrink-0 text-stone-400"
                            renderHeader={() => <div class="flex-1 pr-3 text-xs font-bold uppercase tracking-[0.18em] text-stone-400">{item.title}</div>}
                          />
                        ))}
                      </div>
                    </div>
                  </Reveal>
                </div>
              </div>
            </div>
          </section>

          <section class="relative overflow-hidden bg-stone-900 py-32 text-stone-50">
            <div class="ambient-orb absolute -top-20 left-0 h-[420px] w-[420px] rounded-full bg-[#b88a58]/15 blur-3xl" />
            <div class="ambient-orb absolute -bottom-20 right-0 h-[420px] w-[420px] rounded-full bg-white/5 blur-3xl" />
            <div class="relative z-10 mx-auto max-w-7xl px-6 md:px-12">
              <div class="grid grid-cols-1 items-center gap-12 lg:grid-cols-12">
                <div class="lg:col-span-6">
                  <Reveal>
                    <div class="mb-4 text-xs font-bold uppercase tracking-[0.2em] text-stone-400">Ключевой принцип</div>
                    <h2 class="mb-6 text-4xl font-light leading-[1.05] tracking-tighter text-white md:text-6xl">Дизайн до инженерии</h2>
                    <p class="max-w-2xl text-lg leading-relaxed text-stone-300">
                      Интерьер и экстерьер мы разрабатываем раньше инженерных систем, чтобы розетки, свет, воздух, вода и тепло следовали за
                      реальной жизнью дома, а не спорили с ней.
                    </p>
                  </Reveal>

                  <Reveal delay={180}>
                    <p class="mt-8 max-w-2xl border-l border-white/20 pl-6 text-sm uppercase tracking-[0.16em] text-stone-300">
                      Без дизайн-проекта инженерия превращается в догадки.
                    </p>
                  </Reveal>
                </div>

                <div class="lg:col-span-5 lg:col-start-8">
                  <Reveal delay={220}>
                    <div class="relative">
                      <div class="absolute -inset-4 border border-white/10" />
                      <div class="relative space-y-4 border border-white/10 bg-white/5 p-8 backdrop-blur-md">
                        {designLayers.map((item, index) => (
                          <BriefAccordionItem
                            key={item.title}
                            id={`design-${index}`}
                            activeId={activeBriefId}
                            onToggle={toggleBrief}
                            brief={item.desc}
                            briefTheme="dark"
                            buttonClass="w-full border-b border-white/10 pb-4 text-left last:border-b-0 last:pb-0"
                            iconClass="mt-1 shrink-0 text-stone-300"
                            renderHeader={() => (
                              <div class="flex items-start gap-4">
                                <div class="mt-1 text-xs font-bold uppercase tracking-[0.18em] text-stone-400">{String(index + 1).padStart(2, '0')}</div>
                                <p class="pr-3 text-lg leading-relaxed text-stone-200">{item.title}</p>
                              </div>
                            )}
                          />
                        ))}
                      </div>
                    </div>
                  </Reveal>
                </div>
              </div>
            </div>
          </section>

          <section id="technology" class="relative overflow-hidden border-y border-stone-200 bg-white py-32" style={getDeferredSectionStyle('1200px')}>
            <div class="absolute right-0 top-0 hidden h-full w-1/2 -z-10 bg-stone-50/50 lg:block" />
            <div class="mx-auto max-w-7xl px-6 md:px-12">
              <div class="mx-auto mb-24 max-w-3xl md:text-center">
                <Reveal>
                  <div class="mb-4 text-xs font-bold uppercase tracking-[0.2em] text-stone-400">Ключевая технология</div>
                  <h2 class="bronze-text mb-6 overflow-visible text-4xl font-light leading-[1.18] tracking-tighter pt-[0.06em] pb-[0.16em] md:text-6xl">
                    Анатомия <span class="font-medium">совершенства.</span>
                  </h2>
                  <p class="text-lg text-stone-500">
                    SCIP (Структурные Изоляционные Панели) — это передовая строительная система, заменяющая традиционный каркас и кладку.
                    Она образует монолитную, неразрушимую оболочку, которая дышит, изолирует и защищает.
                  </p>
                </Reveal>
              </div>

              <div class="grid grid-cols-1 items-center gap-16 lg:grid-cols-2">
                <div class="relative order-2 overflow-visible lg:order-1">
                  <Reveal direction="none">
                    <ScipVisualization isMobile={isMobileValue} />
                  </Reveal>
                  <Reveal delay={180}>
                    <div class="relative z-10 mx-auto -mt-2 w-full max-w-[300px] sm:max-w-[340px] lg:ml-28 lg:translate-x-[20px]">
                      <div class="float-card group border border-stone-200/90 bg-white/85 p-4 shadow-[0_30px_80px_rgba(28,25,23,0.12)] backdrop-blur-md transition-shadow duration-700 hover:shadow-[0_40px_90px_rgba(28,25,23,0.16)]">
                        <div class="mb-3 flex items-center gap-4">
                          <span class="whitespace-nowrap text-[10px] font-bold uppercase tracking-[0.2em] text-stone-400">Сечение SCIP</span>
                          <div class="h-px flex-1 bg-gradient-to-r from-stone-200 to-transparent" />
                        </div>
                        <div class="overflow-hidden border border-stone-100 bg-stone-50">
                          <img
                            src="/image/i222.webp"
                            alt="Сечение SCIP панели"
                            loading="lazy"
                            decoding="async"
                            class="w-full bg-white object-contain transition-transform duration-700 group-hover:scale-[1.015]"
                          />
                        </div>
                        <p class="mt-3 text-sm leading-relaxed text-stone-500">
                          Реальный срез панели показывает логику слоев, армирования и изоляции в той последовательности, в которой система
                          работает в доме.
                        </p>
                      </div>
                    </div>
                  </Reveal>
                </div>

                <div class="order-1 flex flex-col gap-12 lg:order-2">
                  {technologyFeatures.map((feature, index) => (
                    <Reveal key={feature.title} delay={index * 200} direction="left">
                      <div class="group flex gap-6">
                        <div class="mt-1 flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-stone-100 text-stone-600 transition-colors duration-500 group-hover:bg-stone-900 group-hover:text-white">
                          <feature.Icon size={24} strokeWidth={1.5} />
                        </div>
                        <div>
                          <h3 class="mb-3 text-xl font-medium text-stone-900">{feature.title}</h3>
                          <p class="leading-relaxed text-stone-500">{feature.desc}</p>
                        </div>
                      </div>
                    </Reveal>
                  ))}
                </div>
              </div>
            </div>
          </section>

          <section class="relative overflow-hidden border-b border-stone-200 bg-stone-50 py-32">
            <div class="ambient-orb absolute left-0 top-0 h-[360px] w-[360px] rounded-full bg-stone-200/40 blur-3xl" />
            <div class="relative z-10 mx-auto max-w-7xl px-6 md:px-12">
              <div class="mb-20 grid grid-cols-1 gap-10 lg:grid-cols-12 lg:gap-8">
                <div class="lg:col-span-4">
                  <Reveal>
                    <div class="mb-4 text-xs font-bold uppercase tracking-[0.2em] text-stone-400">Системы дома</div>
                    <h2 class="bronze-text mb-6 overflow-visible text-4xl font-light leading-[1.18] tracking-tighter pt-[0.06em] pb-[0.16em] md:text-5xl">
                      Инженерное проектирование
                    </h2>
                    <p class="text-lg leading-relaxed text-stone-600">
                      После утвержденного дизайна инженерия встает на свое место: точно, заранее и без импровизации на площадке.
                    </p>
                  </Reveal>
                </div>

                <div class="grid gap-4 lg:col-span-8">
                  {engineeringCards.map((item, index) => (
                    <Reveal key={item.title} delay={index * 110}>
                      <BriefAccordionItem
                        id={`engineering-${index}`}
                        activeId={activeBriefId}
                        onToggle={toggleBrief}
                        brief={item.desc}
                        buttonClass="group w-full border border-stone-200 bg-white p-6 text-left backdrop-blur-md transition-all duration-500 hover:border-stone-300 hover:bg-stone-50 md:p-7"
                        iconClass="mt-1 shrink-0 text-stone-400"
                        renderHeader={() => (
                          <div class="flex-1 pr-3">
                            <div class="mb-3 text-xs font-bold uppercase tracking-[0.18em] text-stone-400">{String(index + 1).padStart(2, '0')}</div>
                            <h3 class="text-xl font-medium leading-snug text-stone-900">{item.title}</h3>
                          </div>
                        )}
                      />
                    </Reveal>
                  ))}
                </div>
              </div>

              <div class="grid grid-cols-1 items-start gap-10 lg:grid-cols-12 lg:gap-8">
                <div class="lg:col-span-4">
                  <Reveal>
                    <div class="mb-4 text-xs font-bold uppercase tracking-[0.2em] text-stone-400">Финансовая ясность</div>
                    <h2 class="bronze-text mb-6 overflow-visible text-4xl font-light leading-[1.18] tracking-tighter pt-[0.06em] pb-[0.16em] md:text-5xl">
                      Смета и защита бюджета
                    </h2>
                    <p class="text-lg leading-relaxed text-stone-600">
                      Когда архитектура, дизайн и инженерия согласованы, бюджет становится предсказуемым и защищенным.
                    </p>
                  </Reveal>
                </div>

                <div class="space-y-4 lg:col-span-8">
                  {budgetCards.map((item, index) => (
                    <Reveal key={item.title} delay={index * 100}>
                      <BriefAccordionItem
                        id={`budget-${index}`}
                        activeId={activeBriefId}
                        onToggle={toggleBrief}
                        brief={item.desc}
                        buttonClass="group w-full border border-stone-200 bg-white px-6 py-5 text-left transition-all duration-500 hover:border-stone-300 hover:shadow-[0_18px_50px_rgba(28,25,23,0.06)]"
                        headerClass="flex flex-col gap-3 md:flex-row md:items-start md:justify-between"
                        iconClass="mt-1 shrink-0 text-stone-400"
                        renderHeader={() => (
                          <div class="flex-1 pr-3">
                            <h3 class="text-xl font-medium leading-snug text-stone-900">{item.title}</h3>
                          </div>
                        )}
                      />
                    </Reveal>
                  ))}
                </div>
              </div>
            </div>
          </section>

          <section class="relative overflow-hidden bg-stone-950 py-32 text-stone-50">
            <div class="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(255,255,255,0.08),transparent_38%)]" />
            <div class="relative z-10 mx-auto max-w-7xl px-6 md:px-12">
              <div class="grid grid-cols-1 items-start gap-10 lg:grid-cols-12 lg:gap-8">
                <div class="lg:col-span-5">
                  <Reveal>
                    <div class="mb-4 text-xs font-bold uppercase tracking-[0.2em] text-stone-400">Контроль реализации</div>
                    <h2 class="mb-6 text-4xl font-light leading-[1.05] tracking-tighter text-white md:text-6xl">
                      Авторский и технический надзор
                    </h2>
                    <p class="max-w-2xl text-lg leading-relaxed text-stone-300">
                      Во время строительства мы сопровождаем исполнение, проверяем скрытые работы и удерживаем качество на уровне проекта,
                      а не на уровне случайности.
                    </p>
                  </Reveal>
                </div>

                <div class="grid gap-4 lg:col-span-6 lg:col-start-7">
                  {supervisionCards.map((item, index) => (
                    <Reveal key={item.title} delay={index * 120}>
                      <BriefAccordionItem
                        id={`supervision-${index}`}
                        activeId={activeBriefId}
                        onToggle={toggleBrief}
                        brief={item.desc}
                        briefTheme="dark"
                        buttonClass="w-full border border-white/10 bg-white/5 p-6 text-left backdrop-blur-sm transition-all duration-500 hover:bg-white/[0.07] md:p-7"
                        iconClass="mt-1 shrink-0 text-stone-300"
                        renderHeader={() => (
                          <div class="flex-1 pr-3">
                            <div class="mb-3 text-xs font-bold uppercase tracking-[0.18em] text-stone-400">{String(index + 1).padStart(2, '0')}</div>
                            <h3 class="text-xl font-medium leading-snug text-white">{item.title}</h3>
                          </div>
                        )}
                      />
                    </Reveal>
                  ))}
                </div>
              </div>
            </div>
          </section>

          <section class="relative overflow-hidden bg-stone-950 text-stone-50" style={getDeferredSectionStyle('900px')}>
            <div class="absolute inset-0">
              <img
                src="/image/dom7.webp"
                alt=""
                loading="lazy"
                decoding="async"
                class={['absolute inset-0 h-full w-full object-cover scale-[1.08]', isMobileValue ? '' : 'will-change-transform']}
                style={{ transform: isMobileValue ? 'scale(1.08)' : 'translateY(var(--construction-parallax)) scale(1.08)' }}
              />
            </div>

            <div class="relative z-10 mx-auto max-w-7xl px-6 py-20 sm:py-24 md:px-12 md:py-40">
              <div class="w-full max-w-[320px] sm:max-w-3xl">
                <Reveal>
                  <div class="max-w-[320px] border border-white/30 bg-white/60 px-5 py-6 backdrop-blur-md sm:max-w-2xl sm:px-8 sm:py-9">
                    <div class="mb-4 text-xs font-bold uppercase tracking-[0.2em] text-stone-900">Реализация</div>
                    <h2 class="mb-5 break-words text-2xl font-light leading-[1.08] tracking-tighter text-stone-950 sm:mb-6 sm:text-4xl md:text-6xl">
                      Строительство и монтаж
                    </h2>
                    <p class="break-words text-sm leading-relaxed text-stone-900 sm:text-lg">
                      Реализация идет по ясной последовательности: фундамент, сборка CLT или SCIP, кровля, фасады, инженерия, отделка и
                      точное доведение дома до готовности.
                    </p>
                  </div>
                </Reveal>

                <div class="mt-8 grid max-w-[320px] grid-cols-1 gap-2 sm:mt-10 sm:max-w-3xl sm:gap-3" style={{ overflowAnchor: 'none' }}>
                  {constructionStages.map((stage, index) => (
                    <Reveal key={stage.title} delay={index * 90}>
                      <BriefAccordionItem
                        id={`construction-${index}`}
                        activeId={activeBriefId}
                        onToggle={toggleBrief}
                        brief={stage.desc}
                        buttonClass="h-full w-full border border-white/30 bg-white/55 px-4 py-3 text-left text-sm font-medium text-stone-900 backdrop-blur-md transition-colors duration-300 hover:bg-white/70 sm:px-5"
                        headerClass="flex items-center justify-between gap-3"
                        iconClass=""
                        iconSize={14}
                        renderHeader={() => <span class="pr-3 leading-snug">{stage.title}</span>}
                      />
                    </Reveal>
                  ))}
                </div>
              </div>
            </div>
          </section>

          <section
            id="projects"
            class="relative flex min-h-[100vh] items-center overflow-hidden bg-stone-900 py-32 text-stone-50 md:block md:min-h-0"
            style={getDeferredSectionStyle('1200px')}
          >
            {isMobilePortraitValue ? (
              <div class="absolute inset-0 flex h-full w-full flex-col items-center justify-center">
                <img
                  src="https://images.unsplash.com/photo-1512917774080-9991f1c4c750?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80"
                  alt="Project Background"
                  loading="lazy"
                  decoding="async"
                  class="absolute inset-0 h-full w-full object-cover opacity-20"
                />
                <div class="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.58)_0%,rgba(255,255,255,0.32)_36%,rgba(245,245,244,0.16)_64%,rgba(28,25,23,0.06)_100%)] backdrop-blur-sm" />

                <div class="relative z-10 flex max-w-sm flex-col items-center justify-center p-8 text-center">
                  <div class="relative mb-12">
                    <div class="ambient-orb absolute inset-x-6 inset-y-5 rounded-full bg-white/24 blur-2xl" />
                    <img
                      src="/image/logo2.webp"
                      alt="Brand Logo2"
                      loading="lazy"
                      decoding="async"
                      class="relative w-52 opacity-90 drop-shadow-[0_18px_40px_rgba(255,255,255,0.18)]"
                    />
                  </div>
                  <div class="relative mb-6 flex h-24 w-24 items-center justify-center">
                    <Smartphone
                      size={56}
                      strokeWidth={1}
                      class="device-weak-spin absolute text-[#f8d5a6]"
                      style={{ animation: 'phoneRotate 2.5s ease-in-out infinite' }}
                    />
                  </div>
                  <h3 class="bronze-text-light mb-4 text-2xl font-light uppercase tracking-widest">Переверните экран</h3>
                  <p class="text-sm font-light leading-relaxed text-stone-400">
                    Для просмотра избранных работ переведите устройство в горизонтальное положение.
                  </p>
                </div>
              </div>
            ) : (
              <div class={['mx-auto w-full max-w-7xl px-6 py-16 md:px-12 md:py-0', isMobileValue && !isMobilePortraitValue ? 'animate-projects-reveal' : '']}>
                <div class="mb-24 flex flex-col items-end justify-between gap-8 md:flex-row">
                  <Reveal>
                    <h2 class="bronze-text-light text-4xl font-light tracking-tighter md:text-6xl">
                      Избранные <span class="font-medium">Работы</span>
                    </h2>
                  </Reveal>
                  <Reveal delay={200}>
                    <button class="border border-stone-700 px-6 py-3 text-sm font-medium transition-colors duration-300 hover:bg-stone-50 hover:text-stone-900">
                      Смотреть всё портфолио
                    </button>
                  </Reveal>
                </div>

                <div class="grid grid-cols-1 gap-8 md:grid-cols-2 md:gap-12">
                  {projectCards.map((project) => (
                    <div key={project.title} class={[project.featured ? 'group cursor-pointer md:col-span-2' : 'group cursor-pointer']}>
                      <Reveal delay={project.delay}>
                        <div class={['relative overflow-hidden bg-stone-800', project.featured ? 'aspect-[21/9]' : 'aspect-[4/5]']}>
                          <img
                            src={project.image}
                            loading="lazy"
                            decoding="async"
                            alt={project.alt}
                            class="h-full w-full object-cover opacity-80 transition-transform duration-1000 ease-out group-hover:scale-105 group-hover:opacity-100"
                          />
                          <div class="absolute inset-0 bg-gradient-to-t from-stone-900/80 via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
                          <div class="absolute bottom-8 left-8 right-8 flex translate-y-4 items-end justify-between opacity-0 transition-all duration-500 ease-out group-hover:translate-y-0 group-hover:opacity-100">
                            <div>
                              <h3 class={[project.featured ? 'bronze-text-light mb-2 text-3xl font-medium' : 'bronze-text-light mb-1 text-2xl font-medium']}>
                                {project.title}
                              </h3>
                              <p class={project.featured ? 'text-sm tracking-wider text-stone-300' : 'text-xs tracking-wider text-stone-300'}>{project.location}</p>
                            </div>
                            {project.featured ? (
                              <div class="flex h-12 w-12 items-center justify-center rounded-full bg-white/10 backdrop-blur-md">
                                <ArrowRight size={20} />
                              </div>
                            ) : null}
                          </div>
                        </div>
                      </Reveal>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </section>

          <section class="border-b border-stone-200 bg-stone-100 py-24">
            <div class="mx-auto max-w-7xl px-6 md:px-12">
              <div class="grid grid-cols-2 gap-12 divide-x divide-stone-200 md:grid-cols-4">
                {stats.map((stat, index) => (
                  <div key={stat.label} class="flex flex-col items-center px-4 text-center">
                    <Reveal delay={index * 100}>
                      <div class="mb-2 text-3xl font-light text-stone-900 md:text-5xl">{stat.value}</div>
                      <div class="text-xs font-bold uppercase tracking-[0.1em] text-stone-500">{stat.label}</div>
                    </Reveal>
                  </div>
                ))}
              </div>
            </div>
          </section>

          <section class="relative overflow-hidden border-b border-stone-200 bg-white py-32" style={getDeferredSectionStyle('900px')}>
            <div class="ambient-orb absolute right-0 top-0 h-[420px] w-[420px] rounded-full bg-stone-100 opacity-80 blur-3xl" />
            <div class="relative z-10 mx-auto max-w-7xl px-6 md:px-12">
              <div class="grid grid-cols-1 items-start gap-10 lg:grid-cols-12 lg:gap-8">
                <div class="lg:col-span-4">
                  <Reveal>
                    <div class="mb-4 text-xs font-bold uppercase tracking-[0.2em] text-stone-400">Передача объекта</div>
                    <h2 class="bronze-text mb-6 overflow-visible text-4xl font-light leading-[1.18] tracking-tighter pt-[0.06em] pb-[0.16em] md:text-5xl">
                      Сдача объекта и паспорт дома
                    </h2>
                    <p class="text-lg leading-relaxed text-stone-600">
                      Клиент получает не только готовый дом, но и полный комплект данных для спокойной эксплуатации, сервиса и дальнейшей
                      истории объекта.
                    </p>
                  </Reveal>
                </div>

                <div class="grid gap-4 lg:col-span-8">
                  {handoverDocs.map((item, index) => (
                    <Reveal key={item.title} delay={index * 110}>
                      <BriefAccordionItem
                        id={`handover-${index}`}
                        activeId={activeBriefId}
                        onToggle={toggleBrief}
                        brief={item.desc}
                        buttonClass="group w-full border border-stone-200 bg-stone-50 p-6 text-left backdrop-blur-md transition-all duration-500 hover:border-stone-300 hover:bg-white md:p-7"
                        iconClass="mt-1 shrink-0 text-stone-400"
                        renderHeader={() => (
                          <div class="flex-1 pr-3">
                            <div class="mb-3 text-xs font-bold uppercase tracking-[0.18em] text-stone-400">{String(index + 1).padStart(2, '0')}</div>
                            <p class="text-lg leading-relaxed text-stone-700">{item.title}</p>
                          </div>
                        )}
                      />
                    </Reveal>
                  ))}
                </div>
              </div>

              <div class="mt-20 border border-stone-200 bg-stone-50 p-8 md:p-12">
                <div class="grid grid-cols-1 items-center gap-8 lg:grid-cols-12">
                  <div class="lg:col-span-5">
                    <Reveal>
                      <div class="mb-4 text-xs font-bold uppercase tracking-[0.2em] text-stone-400">После сдачи</div>
                      <h3 class="mb-4 text-3xl font-light tracking-tight text-stone-900 md:text-4xl">Гарантия и сопровождение</h3>
                      <p class="text-lg leading-relaxed text-stone-600">
                        Наше участие не заканчивается ключами. Мы остаемся на связи по гарантии, сервисным вопросам и ведем цифровой кабинет
                        владельца с документами и инженерной информацией дома.
                      </p>
                    </Reveal>
                  </div>

                  <div class="lg:col-span-6 lg:col-start-7">
                    <Reveal delay={160}>
                      <div class="grid gap-4">
                        {supportCards.map((item, index) => (
                          <BriefAccordionItem
                            key={item.title}
                            id={`support-${index}`}
                            activeId={activeBriefId}
                            onToggle={toggleBrief}
                            brief={item.desc}
                            buttonClass="w-full border border-stone-200 bg-white p-5 text-left backdrop-blur-md transition-all duration-500 hover:border-stone-300 hover:bg-stone-50"
                            iconClass="shrink-0 text-stone-400"
                            renderHeader={() => <div class="flex-1 pr-3 text-xs font-bold uppercase tracking-[0.18em] text-stone-400">{item.title}</div>}
                          />
                        ))}
                      </div>
                    </Reveal>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <section id="studio" class="relative overflow-hidden bg-stone-50 py-32" style={getDeferredSectionStyle('900px')}>
            <div class="ambient-orb absolute right-0 top-0 h-[800px] w-[800px] translate-x-1/3 -translate-y-1/2 rounded-full bg-stone-200/50 opacity-50 blur-3xl" />
            <div class="ambient-orb absolute bottom-0 left-0 h-[600px] w-[600px] -translate-x-1/3 translate-y-1/2 rounded-full bg-stone-200/50 opacity-50 blur-3xl" />

            <div class="relative z-10 mx-auto max-w-4xl px-6 text-center">
              <Reveal>
                <h2 class="bronze-text mb-8 overflow-visible text-4xl font-light leading-[1.18] tracking-tighter pt-[0.06em] pb-[0.16em] md:text-6xl">
                  Готовы построить <span class="font-medium italic">будущее?</span>
                </h2>
                <p class="mx-auto mb-12 max-w-2xl text-lg text-stone-600">
                  Закажите резиденцию от Santilli Architecture и испытайте пересечение высококлассного дизайна и структурной неуязвимости.
                </p>
                <button
                  onClick={() => {
                    isModalOpen.value = true;
                  }}
                  class="group inline-flex items-center gap-3 bg-stone-900 px-10 py-5 text-sm font-medium text-white shadow-2xl shadow-stone-900/20 transition-all duration-300 hover:-translate-y-1 hover:bg-stone-800 hover:shadow-stone-900/40"
                >
                  Назначить частную консультацию
                  <ArrowRight size={16} class="transition-transform group-hover:translate-x-1" />
                </button>
              </Reveal>
            </div>
          </section>

          <footer class="border-t border-stone-900 bg-stone-950 py-20 text-stone-400" style={getDeferredSectionStyle('900px')}>
            <div class="mx-auto max-w-7xl px-6 md:px-12">
              <div class="mb-16 grid grid-cols-1 gap-16 md:grid-cols-4">
                <div class="col-span-1 md:col-span-2">
                  <div class="mb-8 flex cursor-pointer items-center gap-2" onClick={(event: MouseEvent) => scrollToSection(event, 'hero')}>
                    <div class="flex h-6 w-6 items-center justify-center bg-white">
                      <div class="h-2 w-2 border border-stone-900" />
                    </div>
                    <span class="text-lg font-medium tracking-tight text-white">SANTILLI</span>
                  </div>
                  <p class="max-w-sm leading-relaxed text-stone-500">
                    Открываем будущее элитной недвижимости с помощью передовой технологии SCIP и бескомпромиссного архитектурного дизайна.
                  </p>
                </div>

                <div>
                  <h4 class="mb-6 text-sm font-medium tracking-wide text-white">Компания</h4>
                  <ul class="space-y-4 text-sm">
                    {companyLinks.map((link) => (
                      <li key={link.id}>
                        <a href={`#${link.id}`} onClick={(event: MouseEvent) => scrollToSection(event, link.id)} class="transition-colors hover:text-white">
                          {link.label}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h4 class="mb-6 text-sm font-medium tracking-wide text-white">Связь</h4>
                  <ul class="space-y-4 text-sm">
                    {contactLinks.map((label) => (
                      <li key={label}>
                        <a href="#" class="transition-colors hover:text-white">
                          {label}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div class="flex flex-col items-center justify-between border-t border-stone-800 pt-8 text-xs text-stone-600 md:flex-row">
                <p>&copy; 2026 Santilli Architecture. Все права защищены.</p>
                <div class="mt-4 flex gap-6 md:mt-0">
                  <a href="#" class="transition-colors hover:text-white">
                    Политика конфиденциальности
                  </a>
                  <a href="#" class="transition-colors hover:text-white">
                    Условия использования
                  </a>
                </div>
              </div>
            </div>
          </footer>
        </div>
      );
    };
  },
});

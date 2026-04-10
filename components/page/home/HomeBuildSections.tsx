import { defineComponent, ref, type CSSProperties } from 'vue';
import BriefAccordionItem from '~/components/ui/BriefAccordionItem';
import Reveal from '~/components/ui/Reveal';
import {
  budgetCards,
  constructionStages,
  engineeringCards,
  supervisionCards,
} from '~/data/siteContent';

const handoverSectionStyle = {
  contentVisibility: 'auto',
  containIntrinsicSize: '900px',
} as CSSProperties;

export default defineComponent({
  name: 'HomeBuildSections',
  props: {
    isMobile: {
      type: Boolean,
      default: false,
    },
  },
  setup(props) {
    const engineeringActiveId = ref<string | null>(null);
    const budgetActiveId = ref<string | null>(null);
    const supervisionActiveId = ref<string | null>(null);
    const constructionActiveId = ref<string | null>(null);

    const toggleAccordion = (state: { value: string | null }, id: string) => {
      state.value = state.value === id ? null : id;
    };

    return () => {
      const isMobileValue = props.isMobile;

      return (
        <>
          <section class="relative overflow-hidden border-b border-stone-200 bg-stone-50 py-32">
            <div class="ambient-orb absolute left-0 top-0 h-[360px] w-[360px] rounded-full bg-stone-200/40 blur-3xl" />
            <div class="relative z-10 mx-auto max-w-7xl px-6 md:px-12">
              <div class="mb-20 grid grid-cols-1 gap-10 lg:grid-cols-12 lg:gap-8">
                <div class="lg:col-span-4">
                  <Reveal>
                    <h2 class="bronze-text mb-6 overflow-visible pb-[0.16em] pt-[0.06em] text-4xl font-light leading-[1.18] tracking-tighter md:text-5xl">
                      Строительство коробки
                    </h2>
                    <p class="text-lg leading-relaxed text-stone-600">
                      Закладываем основание, собираем конструкции и закрываем дом по проекту.
                    </p>
                  </Reveal>
                </div>

                <div class="grid gap-4 lg:col-span-8">
                  {engineeringCards.map((item, index) => (
                    <Reveal key={item.title} delay={index * 110}>
                      <BriefAccordionItem
                        id={`engineering-${index}`}
                        activeId={engineeringActiveId}
                        onToggle={(id) => toggleAccordion(engineeringActiveId, id)}
                        brief={item.desc}
                        detail={item.detail}
                        panelSpace="clamp(13rem, 30vw, 18rem)"
                        buttonClass="group w-full border border-stone-200 bg-white p-6 text-left transition-[background-color,border-color] duration-500 hover:border-stone-300 hover:bg-stone-50 md:p-7"
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

              <div class="grid grid-cols-1 items-start gap-10 lg:grid-cols-12 lg:gap-8">
                <div class="lg:col-span-4">
                  <Reveal>
                    <h2 class="bronze-text mb-6 overflow-visible pb-[0.16em] pt-[0.06em] text-4xl font-light leading-[1.18] tracking-tighter md:text-5xl">
                      Инженерия и отделка
                    </h2>
                    <p class="text-lg leading-relaxed text-stone-600">
                      Монтируем инженерные системы, делаем отделку и доводим дом до полной готовности.
                    </p>
                  </Reveal>
                </div>

                <div class="space-y-4 lg:col-span-8">
                  {budgetCards.map((item, index) => (
                    <Reveal key={item.title} delay={index * 100}>
                      <BriefAccordionItem
                        id={`budget-${index}`}
                        activeId={budgetActiveId}
                        onToggle={(id) => toggleAccordion(budgetActiveId, id)}
                        brief={item.desc}
                        detail={item.detail}
                        panelSpace="clamp(13rem, 30vw, 18rem)"
                        buttonClass="group w-full border border-stone-200 bg-white px-6 py-5 text-left transition-[border-color,box-shadow] duration-500 hover:border-stone-300 hover:shadow-[0_18px_50px_rgba(28,25,23,0.06)]"
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
                    <div class="mb-4 text-xs font-bold uppercase tracking-[0.2em] text-stone-400">Во время стройки</div>
                    <h2 class="mb-6 text-4xl font-light leading-[1.05] tracking-tighter text-white md:text-6xl">
                      Что вы контролируете лично
                    </h2>
                    <p class="max-w-2xl text-lg leading-relaxed text-stone-300">
                      Ход стройки в чате с прорабом, качество на каждом этапе, соответствие дизайн-проекту.
                    </p>
                  </Reveal>
                </div>

                <div class="grid gap-4 lg:col-span-6 lg:col-start-7">
                  {supervisionCards.map((item, index) => (
                    <Reveal key={item.title} delay={index * 120}>
                      <BriefAccordionItem
                        id={`supervision-${index}`}
                        activeId={supervisionActiveId}
                        onToggle={(id) => toggleAccordion(supervisionActiveId, id)}
                        brief={item.desc}
                        detail={item.detail}
                        briefTheme="dark"
                        buttonClass="w-full border border-white/10 bg-white/5 p-6 text-left transition-colors duration-500 hover:bg-white/[0.07] md:p-7"
                        iconClass="mt-1 shrink-0 text-stone-300"
                        renderHeader={() => (
                          <div class="flex-1 pr-3">
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

          <section class="relative overflow-hidden bg-stone-950 text-stone-50" style={handoverSectionStyle}>
            <div class="absolute inset-0">
              <img
                src="/image/projects/portfolio-11.webp"
                alt=""
                loading="lazy"
                decoding="async"
                class={['absolute inset-0 h-full w-full object-cover', isMobileValue ? '' : 'will-change-transform']}
                style={{ transform: isMobileValue ? 'none' : 'translateY(var(--construction-parallax)) scale(1.08)' }}
              />
            </div>

            <div class="relative z-10 mx-auto max-w-7xl px-6 py-20 sm:py-24 md:min-h-[860px] md:px-12 md:pb-32 md:pt-56 lg:min-h-[920px] lg:pb-36 lg:pt-64">
              <div class="w-full max-w-[320px] sm:max-w-3xl md:max-w-[56rem] md:grid md:grid-cols-[minmax(0,1.15fr)_minmax(0,1fr)] md:items-start md:gap-5 lg:gap-6">
                <Reveal>
                  <div class="max-w-[320px] border border-white/30 bg-white/60 px-5 py-6 backdrop-blur-md sm:max-w-2xl sm:px-8 sm:py-9 md:max-w-none">
                    <h2 class="mb-5 break-words text-2xl font-light leading-[1.08] tracking-tighter text-stone-950 sm:mb-6 sm:text-4xl md:text-6xl">
                      Сдача и жизнь в доме
                    </h2>
                    <p class="break-words text-sm leading-relaxed text-stone-900 sm:text-lg">
                      Принимаете дом по чек-листу, получаете документы и остаётесь с поддержкой после сдачи.
                    </p>
                  </div>
                </Reveal>

                <div
                  class="handover-stage-grid mt-8 grid max-w-[320px] grid-cols-1 gap-2 sm:mt-10 sm:max-w-3xl sm:gap-3 md:mt-16 md:max-w-none lg:mt-20"
                  style={{ overflowAnchor: 'none' }}
                >
                  {constructionStages.map((item, index) => (
                    <Reveal key={item.title} delay={isMobileValue ? 0 : index * 90}>
                      <BriefAccordionItem
                        id={`construction-${index}`}
                        activeId={constructionActiveId}
                        onToggle={(id) => toggleAccordion(constructionActiveId, id)}
                        brief={item.desc}
                        detail={item.detail}
                        panelSpace="clamp(13rem, 30vw, 18rem)"
                        buttonClass="h-full w-full border border-white/30 bg-white/55 px-4 py-3 text-left text-sm font-medium text-stone-900 transition-colors duration-300 hover:bg-white/70 sm:px-5"
                        headerClass="flex items-center justify-between gap-3"
                        iconClass=""
                        iconSize={14}
                        renderHeader={() => <span class="pr-3 leading-snug">{item.title}</span>}
                      />
                    </Reveal>
                  ))}
                </div>
              </div>
            </div>
          </section>
        </>
      );
    };
  },
});

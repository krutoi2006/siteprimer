import { defineComponent, ref, type CSSProperties } from 'vue';
import BriefAccordionItem from '~/components/ui/BriefAccordionItem';
import Reveal from '~/components/ui/Reveal';
import {
  architectureCards,
  conceptPoints,
  contactHighlights,
  designLayers,
  siteInsights,
} from '~/data/siteContent';

const processSectionStyle = {
  contentVisibility: 'auto',
  containIntrinsicSize: '900px',
} as CSSProperties;

export default defineComponent({
  name: 'HomeProcessSections',
  props: {
    isMobile: {
      type: Boolean,
      default: false,
    },
  },
  setup(props) {
    const contactActiveId = ref<string | null>(null);
    const siteActiveId = ref<string | null>(null);
    const conceptActiveId = ref<string | null>(null);
    const architectureActiveId = ref<string | null>(null);
    const designActiveId = ref<string | null>(null);

    const toggleAccordion = (state: { value: string | null }, id: string) => {
      state.value = state.value === id ? null : id;
    };

    return () => {
      const isMobileValue = props.isMobile;

      return (
        <>
        <section id="process" class="relative overflow-hidden bg-stone-950 text-stone-900" style={processSectionStyle}>
          <div class="absolute inset-0">
            <div class="absolute inset-0 bg-[linear-gradient(115deg,rgba(12,10,9,0.98)_10%,rgba(28,25,23,0.9)_48%,rgba(41,37,36,0.88)_100%)]" />
            <div class="absolute left-1/2 top-10 h-48 w-48 -translate-x-1/2 rounded-full bg-amber-200/10 blur-3xl sm:top-14 sm:h-64 sm:w-64" />
          </div>

            <div class="relative z-10 mx-auto max-w-7xl px-5 py-20 sm:px-6 sm:py-24 md:px-12 md:py-40">
              <div class="grid grid-cols-1 items-end gap-10 sm:gap-12 lg:grid-cols-12 lg:gap-10">
                <div class="lg:col-span-7">
                  <Reveal>
                    <div class="mb-3 text-[10px] font-bold uppercase tracking-[0.2em] text-stone-300 sm:mb-4 sm:text-xs">Этапы работ</div>
                    <h2 class="mb-4 text-3xl font-light leading-[1.05] tracking-tighter text-white sm:mb-6 sm:text-4xl md:text-6xl">
                      Этапы работ
                      <br />
                      <span class="font-medium">от желания построить дом до жизни в своём доме</span>
                    </h2>
                    <p class="max-w-2xl text-base leading-relaxed text-stone-200 sm:text-lg">
                      Спокойно проводим вас через весь путь: от первой заявки и проектирования до сдачи дома, гарантий и поддержки после
                      въезда.
                    </p>
                  </Reveal>

                  <Reveal delay={150}>
                    <p class="mt-6 max-w-2xl border-l border-white/30 pl-4 text-xs uppercase tracking-[0.16em] text-stone-200/90 sm:mt-8 sm:pl-6 sm:text-sm">
                      Что вы получаете, работая с нами
                    </p>
                  </Reveal>
                </div>

                <div class="lg:col-span-4 lg:col-start-9">
                  <div class="grid gap-3 sm:gap-4" style={{ overflowAnchor: 'none' }}>
                    {contactHighlights.map((item, index) => (
                      <Reveal key={item.title} delay={index * 120}>
                        <BriefAccordionItem
                          id={`contact-${index}`}
                          activeId={contactActiveId}
                          onToggle={(id) => toggleAccordion(contactActiveId, id)}
                          brief={item.desc}
                          briefTheme="dark"
                          panelSpace="clamp(7rem, 14vw, 8.75rem)"
                          buttonClass="group w-full border border-white/10 bg-white/5 p-4 text-left transition-[background-color,border-color] duration-500 hover:border-white/20 hover:bg-white/10 sm:p-5"
                          iconClass="mt-1 shrink-0 text-stone-300"
                          renderHeader={() => (
                            <div class="flex-1 pr-3">
                              <h3 class="text-lg font-medium leading-snug text-white sm:text-xl">{item.title}</h3>
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

          <section class="relative overflow-hidden border-b border-stone-200 bg-stone-50 py-16 sm:py-18 md:py-24">
            <div class="ambient-orb absolute -top-20 right-0 h-[420px] w-[420px] rounded-full bg-stone-200/50 opacity-70 blur-3xl" />
            <div class="relative z-10 mx-auto max-w-7xl px-5 sm:px-6 md:px-12">
              <div class="grid grid-cols-1 gap-8 sm:gap-10 lg:grid-cols-12 lg:gap-8">
                <div class="lg:col-span-5">
                  <Reveal>
                    <h2 class="bronze-text mb-4 overflow-visible pb-[0.16em] pt-[0.06em] text-3xl font-light leading-[1.18] tracking-tighter sm:mb-6 sm:text-4xl md:text-5xl">
                      Проектирование
                    </h2>
                    <p class="text-base leading-relaxed text-stone-600 sm:text-lg">
                      От первого звонка и выезда на участок до полного комплекта проектной документации. Сначала собираем точные исходные
                      данные, а потом принимаем решения, на которых будет стоять дом.
                    </p>
                  </Reveal>

                  <Reveal delay={180}>
                    <div class="mt-6 bg-stone-900 p-6 text-stone-50 sm:mt-8 sm:p-7 md:p-8">
                      <div class="mb-2 text-[10px] font-bold uppercase tracking-[0.18em] text-stone-400 sm:mb-3 sm:text-xs">Важно</div>
                      <p class="text-xl font-light leading-tight sm:text-2xl">Без этого фундамент проектировать нельзя — как строить на ощупь?</p>
                    </div>
                  </Reveal>
                </div>

                <div class="grid gap-3 sm:gap-4 lg:col-span-6 lg:col-start-7">
                  {siteInsights.map((item, index) => (
                    <Reveal key={item.title} delay={index * 120}>
                      <BriefAccordionItem
                        id={`site-${index}`}
                        activeId={siteActiveId}
                        onToggle={(id) => toggleAccordion(siteActiveId, id)}
                        brief={item.desc}
                        detail={item.detail}
                        panelSpace="clamp(7.5rem, 16vw, 10rem)"
                        buttonClass="group w-full border border-stone-200 bg-white p-4 text-left transition-[background-color,border-color] duration-500 hover:border-stone-300 hover:bg-stone-50 sm:p-4 md:p-5"
                        iconClass="mt-1 shrink-0 text-stone-400"
                        renderHeader={() => (
                          <div class="flex-1 pr-3">
                            <h3 class="text-lg font-medium leading-snug text-stone-900 sm:text-xl">{item.title}</h3>
                          </div>
                        )}
                      />
                    </Reveal>
                  ))}
                </div>
              </div>
            </div>
          </section>

          <section class="relative overflow-hidden border-b border-stone-200 bg-white py-16 sm:py-18 md:py-24">
            <div class="mx-auto max-w-7xl px-5 sm:px-6 md:px-12">
              <div class="grid grid-cols-1 items-start gap-6 sm:gap-8 lg:grid-cols-12 lg:gap-8">
                <div class="lg:col-span-5">
                  <Reveal>
                    <h2 class="bronze-text mb-4 overflow-visible pb-[0.16em] pt-[0.06em] text-3xl font-light leading-[1.18] tracking-tighter sm:mb-6 sm:text-4xl md:text-5xl">
                      Дизайн, инженерия и смета
                    </h2>
                    <p class="text-base leading-relaxed text-stone-600 sm:text-lg">
                      Продолжаем проектирование до полного комплекта: дизайн-проект, инженерные разделы и смета до начала работ.
                    </p>
                  </Reveal>
                </div>

                <div class="grid gap-3 sm:gap-5 lg:col-span-7">
                  <div class="grid gap-3 sm:gap-4">
                    {conceptPoints.map((item, index) => (
                      <Reveal key={item.title} delay={index * 100}>
                        <BriefAccordionItem
                          id={`concept-${index}`}
                          activeId={conceptActiveId}
                          onToggle={(id) => toggleAccordion(conceptActiveId, id)}
                          brief={item.desc}
                          detail={item.detail}
                          panelSpace="clamp(10rem, 22vw, 14rem)"
                          buttonClass="w-full border border-stone-200 bg-stone-50 px-4 py-4 text-left transition-colors duration-300 hover:bg-stone-100 sm:px-5 sm:py-5"
                          iconClass="mt-0.5 shrink-0 text-stone-400"
                          renderHeader={() => <p class="pr-3 text-sm font-medium leading-relaxed text-stone-700">{item.title}</p>}
                        />
                      </Reveal>
                    ))}
                  </div>

                  <Reveal delay={220}>
                    <div class="border border-stone-200 bg-stone-50 p-5 sm:p-7 md:p-8">
                      <h3 class="mb-4 text-2xl font-light tracking-tight text-stone-900 sm:mb-5 sm:text-3xl md:text-4xl">Смета до старта стройки</h3>
                      <p class="mb-5 max-w-3xl text-base leading-relaxed text-stone-600 sm:mb-6 sm:text-lg">
                        Фиксируем итоговую цену до начала работ и заранее показываем, из чего она складывается.
                      </p>
                      <div class="grid gap-3 sm:gap-4">
                        {architectureCards.map((item, index) => (
                          <BriefAccordionItem
                            key={item.title}
                            id={`architecture-${index}`}
                            activeId={architectureActiveId}
                            onToggle={(id) => toggleAccordion(architectureActiveId, id)}
                            brief={item.desc}
                            detail={item.detail}
                            panelSpace="clamp(9rem, 20vw, 12rem)"
                            buttonClass="w-full border border-stone-200 bg-white p-4 text-left transition-[background-color,border-color] duration-500 hover:border-stone-300 hover:bg-stone-50 sm:p-4 md:p-5"
                            iconClass="shrink-0 text-stone-400"
                            renderHeader={() => <div class="flex-1 pr-3 text-sm font-medium leading-relaxed text-stone-700">{item.title}</div>}
                          />
                        ))}
                      </div>
                    </div>
                  </Reveal>
                </div>
              </div>
            </div>
          </section>

          <section class="relative overflow-hidden bg-stone-900 py-16 text-stone-50 sm:py-18 md:py-24">
            <div class="ambient-orb absolute -top-20 left-0 h-[420px] w-[420px] rounded-full bg-[#b88a58]/15 blur-3xl" />
            <div class="ambient-orb absolute -bottom-20 right-0 h-[420px] w-[420px] rounded-full bg-white/5 blur-3xl" />
            <div class="relative z-10 mx-auto max-w-7xl px-5 sm:px-6 md:px-12">
              <div class="grid grid-cols-1 items-center gap-8 sm:gap-10 lg:grid-cols-12">
                <div class="lg:col-span-6">
                  <Reveal>
                    <h2 class="mb-4 text-3xl font-light leading-[1.05] tracking-tighter text-white sm:mb-6 sm:text-4xl md:text-6xl">Подготовка к стройке</h2>
                    <p class="max-w-2xl text-base leading-relaxed text-stone-300 sm:text-lg">
                      Когда проект и смета готовы, оформляем договор, документы и точно сажаем дом на участок.
                    </p>
                  </Reveal>

                  <Reveal delay={180}>
                    <p class="mt-6 max-w-2xl border-l border-white/20 pl-4 text-xs uppercase tracking-[0.16em] text-stone-300 sm:mt-8 sm:pl-6 sm:text-sm">
                      После проекта и только если вы подтвердили заказ.
                    </p>
                  </Reveal>
                </div>

                <div class="lg:col-span-5 lg:col-start-8">
                  <Reveal delay={220}>
                    <div class="relative">
                      <div class="absolute -inset-2.5 border border-white/10 sm:-inset-3" />
                      <div class="relative space-y-2.5 border border-white/10 bg-white/5 p-4 backdrop-blur-md sm:space-y-3 sm:p-6">
                        {designLayers.map((item, index) => (
                          <BriefAccordionItem
                            key={item.title}
                            id={`design-${index}`}
                            activeId={designActiveId}
                            onToggle={(id) => toggleAccordion(designActiveId, id)}
                            brief={item.desc}
                            detail={item.detail}
                            briefTheme="dark"
                            panelSpace="clamp(7.5rem, 16vw, 10rem)"
                            buttonClass="w-full border-b border-white/10 pb-2 text-left last:border-b-0 last:pb-0 sm:pb-2.5"
                            iconClass="mt-1 shrink-0 text-stone-300"
                            renderHeader={() => <p class="pr-3 text-base leading-relaxed text-stone-200 sm:text-lg">{item.title}</p>}
                          />
                        ))}
                      </div>
                    </div>
                  </Reveal>
                </div>
              </div>
            </div>
          </section>
        </>
      );
    };
  },
});

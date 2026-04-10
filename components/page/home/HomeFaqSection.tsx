import { defineComponent, ref, type CSSProperties } from 'vue';
import BriefAccordionItem from '~/components/ui/BriefAccordionItem';
import Reveal from '~/components/ui/Reveal';
import {
  handoverDocs,
  supportCards,
} from '~/data/siteContent';

const faqSectionStyle = {
  contentVisibility: 'auto',
  containIntrinsicSize: '900px',
} as CSSProperties;

export default defineComponent({
  name: 'HomeFaqSection',
  setup() {
    const handoverActiveId = ref<string | null>(null);
    const supportActiveId = ref<string | null>(null);

    const toggleAccordion = (state: { value: string | null }, id: string) => {
      state.value = state.value === id ? null : id;
    };

    return () => (
      <section id="faq" class="relative overflow-hidden border-b border-stone-200 bg-white py-32" style={faqSectionStyle}>
        <div class="ambient-orb absolute right-0 top-0 h-[420px] w-[420px] rounded-full bg-stone-100 opacity-80 blur-3xl" />
        <div class="relative z-10 mx-auto max-w-7xl px-6 md:px-12">
          <div class="grid grid-cols-1 items-start gap-10 lg:grid-cols-12 lg:gap-8">
            <div class="lg:col-span-4">
              <Reveal>
                <div class="mb-4 text-xs font-bold uppercase tracking-[0.2em] text-stone-400">FAQ</div>
                <h2 class="bronze-text mb-6 overflow-visible pb-[0.16em] pt-[0.06em] text-4xl font-light leading-[1.18] tracking-tighter md:text-5xl">
                  Частые вопросы по строительству
                </h2>
                <p class="text-lg leading-relaxed text-stone-600">
                  Собрали вопросы, которые чаще всего возникают до старта стройки и во время принятия решений.
                </p>
              </Reveal>
            </div>

            <div class="grid gap-4 lg:col-span-8">
              {handoverDocs.map((item, index) => (
                <Reveal key={item.title} delay={index * 110}>
                  <BriefAccordionItem
                    id={`handover-${index}`}
                    activeId={handoverActiveId}
                    onToggle={(id) => toggleAccordion(handoverActiveId, id)}
                    brief={item.desc}
                    panelSpace="clamp(10rem, 24vw, 13rem)"
                    buttonClass="group w-full border border-stone-200 bg-stone-50 p-6 text-left transition-[background-color,border-color] duration-500 hover:border-stone-300 hover:bg-white md:p-7"
                    iconClass="mt-1 shrink-0 text-stone-400"
                    renderHeader={() => (
                      <div class="flex-1 pr-3">
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
                  <div class="mb-4 text-xs font-bold uppercase tracking-[0.2em] text-stone-400">Ещё вопросы</div>
                  <h3 class="mb-4 text-3xl font-light tracking-tight text-stone-900 md:text-4xl">Что ещё важно знать до старта</h3>
                  <p class="text-lg leading-relaxed text-stone-600">
                    Здесь два вопроса, которые чаще всего влияют на решение: можно ли начать без проекта и зачем нужен технический
                    надзор.
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
                        activeId={supportActiveId}
                        onToggle={(id) => toggleAccordion(supportActiveId, id)}
                        brief={item.desc}
                        panelSpace="clamp(10rem, 24vw, 13rem)"
                        buttonClass="w-full border border-stone-200 bg-white p-5 text-left transition-[background-color,border-color] duration-500 hover:border-stone-300 hover:bg-stone-50"
                        iconClass="shrink-0 text-stone-400"
                        renderHeader={() => <div class="flex-1 pr-3 text-sm font-medium leading-relaxed text-stone-700">{item.title}</div>}
                      />
                    ))}
                  </div>
                </Reveal>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  },
});

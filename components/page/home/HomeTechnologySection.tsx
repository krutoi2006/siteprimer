import { ChevronDown, Clock, Shield, Wind } from 'lucide-vue-next';
import { defineComponent, ref, type CSSProperties } from 'vue';
import ScipVisualization from '~/components/sections/ScipVisualization';
import Reveal from '~/components/ui/Reveal';
import { technologyAccordionCards } from '~/data/siteContent';

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

const technologySectionStyle = {
  contentVisibility: 'auto',
  containIntrinsicSize: '1200px',
} as CSSProperties;

export default defineComponent({
  name: 'HomeTechnologySection',
  props: {
    isMobile: {
      type: Boolean,
      default: false,
    },
  },
  setup(props) {
    const activeTechnologyCard = ref<string | null>(null);

    const toggleTechnologyCard = (id: string) => {
      activeTechnologyCard.value = activeTechnologyCard.value === id ? null : id;
    };

    return () => (
      <section id="technology" class="relative overflow-hidden border-y border-stone-200 bg-white py-32" style={technologySectionStyle}>
        <div class="absolute right-0 top-0 -z-10 hidden h-full w-1/2 bg-stone-50/50 lg:block" />
        <div class="mx-auto max-w-7xl px-6 md:px-12">
          <div class="mx-auto mb-24 max-w-3xl md:text-center">
            <Reveal>
              <div class="mb-4 text-xs font-bold uppercase tracking-[0.2em] text-stone-400">Ключевая технология</div>
              <h2 class="bronze-text mb-6 overflow-visible pb-[0.16em] pt-[0.06em] text-4xl font-light leading-[1.18] tracking-tighter md:text-6xl">
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
                <ScipVisualization isMobile={props.isMobile} />
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

          <div class="mt-24 space-y-5 border-t border-stone-200 pt-24">
            {technologyAccordionCards.map((card, index) => {
              const isOpen = activeTechnologyCard.value === card.title;

              return (
                <Reveal key={card.title} delay={index * 90}>
                  <div class="overflow-hidden border border-stone-200 bg-stone-50/80 backdrop-blur-sm">
                    <button
                      type="button"
                      aria-expanded={isOpen}
                      aria-controls={`technology-card-${index}`}
                      onClick={() => toggleTechnologyCard(card.title)}
                      class="group relative flex min-h-[180px] w-full items-center justify-center px-8 py-10 text-center transition-[background-color,border-color] duration-300 hover:bg-white md:min-h-[220px] md:px-16 md:py-14"
                    >
                      <span class="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-stone-300 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                      <ChevronDown
                        size={18}
                        class={['absolute right-6 top-6 text-stone-400 transition-transform duration-300 md:right-8 md:top-8', isOpen ? 'rotate-180' : '']}
                      />
                      <h3 class="max-w-4xl text-3xl font-light leading-[1.06] tracking-tighter text-stone-900 md:text-5xl">
                        {card.title}
                      </h3>
                    </button>

                    <div
                      id={`technology-card-${index}`}
                      class={['grid overflow-hidden transition-[grid-template-rows,opacity] duration-500 ease-out', isOpen ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0']}
                    >
                      <div class="overflow-hidden">
                        <div
                          class={[
                            'border-t border-stone-200 bg-white px-6 py-6 text-stone-600 transition-[transform,opacity] duration-500 md:px-10 md:py-8',
                            isOpen ? 'translate-y-0 opacity-100' : 'translate-y-2 opacity-0',
                          ]}
                        >
                          <div class="mx-auto grid max-w-5xl gap-5 md:gap-6">
                            {card.paragraphs.map((paragraph) => (
                              <p key={paragraph.slice(0, 32)} class="text-base leading-8 md:text-lg md:leading-9">
                                {paragraph}
                              </p>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>
    );
  },
});

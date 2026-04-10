import { Smartphone } from 'lucide-vue-next';
import { defineComponent, type CSSProperties } from 'vue';
import Reveal from '~/components/ui/Reveal';
import {
  portfolioGapCards,
  projectCards,
  stats,
} from '~/data/siteContent';

const projectSectionStyle = {
  contentVisibility: 'auto',
  containIntrinsicSize: '1200px',
} as CSSProperties;

const projectGridItems = (() => {
  const items: Array<{
    isGap: boolean;
    key: string;
    project: (typeof projectCards)[number];
  }> = [];

  let desktopColumn = 0;
  let gapIndex = 0;

  const appendGapCard = () => {
    const gapCard = portfolioGapCards[gapIndex];

    if (!gapCard) {
      return;
    }

    items.push({
      isGap: true,
      key: `gap-${gapIndex}-${gapCard.title}`,
      project: gapCard,
    });
    gapIndex += 1;
    desktopColumn = 0;
  };

  projectCards.forEach((project, index) => {
    if (project.featured && desktopColumn === 1) {
      appendGapCard();
    }

    items.push({
      isGap: false,
      key: `project-${index}-${project.title}`,
      project,
    });

    if (project.featured) {
      desktopColumn = 0;
      return;
    }

    desktopColumn = desktopColumn === 0 ? 1 : 0;
  });

  if (desktopColumn === 1) {
    appendGapCard();
  }

  return items;
})();

export default defineComponent({
  name: 'HomeProjectsSection',
  props: {
    isMobile: {
      type: Boolean,
      default: false,
    },
    isMobilePortrait: {
      type: Boolean,
      default: false,
    },
  },
  setup(props) {
    return () => (
      <>
        <section
          id="projects"
          class="relative flex min-h-[100vh] items-center overflow-hidden bg-stone-900 py-32 text-stone-50 md:block md:min-h-0"
          style={projectSectionStyle}
        >
          {props.isMobilePortrait ? (
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
            <div class={['mx-auto w-full max-w-7xl px-6 py-16 md:px-12 md:py-0', props.isMobile ? 'animate-projects-reveal' : '']}>
              <div class="mb-24">
                <Reveal>
                  <h2 class="bronze-text-light overflow-visible pb-[0.16em] pt-[0.06em] text-4xl font-light leading-[1.18] tracking-tighter md:text-6xl">
                    Избранные <span class="font-medium">Работы</span>
                  </h2>
                </Reveal>
              </div>

              <div class="grid grid-cols-1 gap-8 md:grid-cols-2 md:gap-12">
                {projectGridItems.map((item) => {
                  const project = item.project;

                  return (
                    <div
                      key={item.key}
                      class={[
                        project.featured ? 'group cursor-pointer md:col-span-2' : 'group cursor-pointer',
                        item.isGap ? 'hidden md:block' : '',
                      ]}
                    >
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
                          <div class="absolute bottom-8 left-8 right-8 flex translate-y-4 items-end justify-between opacity-0 transition-[transform,opacity] duration-500 ease-out group-hover:translate-y-0 group-hover:opacity-100">
                            <div>
                              <h3 class={[project.featured ? 'bronze-text-light mb-2 text-3xl font-medium' : 'bronze-text-light mb-1 text-2xl font-medium']}>
                                {project.title}
                              </h3>
                              <p class={project.featured ? 'text-sm tracking-wider text-stone-300' : 'text-xs tracking-wider text-stone-300'}>{project.location}</p>
                            </div>
                          </div>
                        </div>
                      </Reveal>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </section>

        <section class="border-b border-stone-200 bg-stone-100 py-16 sm:py-20 md:py-24">
          <div class="mx-auto max-w-7xl px-5 sm:px-6 md:px-12">
            <div class="grid grid-cols-2 gap-6 sm:gap-8 md:grid-cols-4 md:gap-12 md:divide-x md:divide-stone-200">
              {stats.map((stat, index) => (
                <div
                  key={stat.label}
                  class={[
                    'flex flex-col items-center text-center',
                    index % 2 === 1 ? 'border-l border-stone-200 pl-6 sm:pl-8 md:border-l-0 md:pl-4' : 'pr-2 md:px-4',
                    index >= 2 ? 'border-t border-stone-200 pt-6 sm:pt-8 md:border-t-0 md:pt-0' : 'pb-2 md:pb-0',
                  ]}
                >
                  <Reveal delay={index * 100}>
                    <div class="mb-2 text-2xl font-light text-stone-900 sm:text-3xl md:text-5xl">{stat.value}</div>
                    <div class="text-[10px] font-bold uppercase tracking-[0.1em] text-stone-500 sm:text-xs">{stat.label}</div>
                  </Reveal>
                </div>
              ))}
            </div>
          </div>
        </section>
      </>
    );
  },
});

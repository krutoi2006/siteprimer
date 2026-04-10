import { defineComponent } from 'vue';
import Reveal from '~/components/ui/Reveal';

export default defineComponent({
  name: 'HomeVisionSection',
  setup() {
    return () => (
      <section id="vision" class="relative bg-stone-50 py-32 md:py-48">
        <div class="mx-auto max-w-7xl px-6 md:px-12">
          <div class="grid grid-cols-1 gap-16 lg:grid-cols-12 lg:gap-8">
            <div class="lg:col-span-5">
              <Reveal>
                <h2 class="bronze-text overflow-visible pb-[0.16em] pt-[0.06em] text-3xl font-light leading-[1.18] tracking-tighter md:text-5xl">
                  Мы не просто строим дома
                  <br />
                  <span class="font-medium">Мы создаем устойчивые убежища</span>
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
    );
  },
});

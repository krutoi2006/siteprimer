import { ArrowRight, Instagram, Linkedin, MessageCircle, Send, Smartphone } from 'lucide-vue-next';
import { defineComponent, type CSSProperties, type PropType } from 'vue';
import Reveal from '~/components/ui/Reveal';
import {
  companyLinks,
  socialLinks,
} from '~/data/siteContent';

const studioSectionStyle = {
  contentVisibility: 'auto',
  containIntrinsicSize: '900px',
} as CSSProperties;

const footerSectionStyle = {
  contentVisibility: 'auto',
  containIntrinsicSize: '900px',
} as CSSProperties;

export default defineComponent({
  name: 'HomeClosingSections',
  props: {
    openModal: {
      type: Function as PropType<() => void>,
      required: true,
    },
    navigateToSection: {
      type: Function as PropType<(event: Event | MouseEvent, id: string) => void>,
      required: true,
    },
  },
  setup(props) {
    const getSocialIcon = (label: string) => {
      switch (label) {
        case 'Telegram':
          return Send;
        case 'WhatsApp':
          return MessageCircle;
        case 'Instagram':
          return Instagram;
        case 'LinkedIn':
          return Linkedin;
        default:
          return Smartphone;
      }
    };

    return () => (
      <>
        <section id="studio" class="relative overflow-hidden bg-stone-50 py-32" style={studioSectionStyle}>
          <div class="ambient-orb absolute right-0 top-0 h-[800px] w-[800px] translate-x-1/3 -translate-y-1/2 rounded-full bg-stone-200/50 opacity-50 blur-3xl" />
          <div class="ambient-orb absolute bottom-0 left-0 h-[600px] w-[600px] -translate-x-1/3 translate-y-1/2 rounded-full bg-stone-200/50 opacity-50 blur-3xl" />

          <div class="relative z-10 mx-auto max-w-4xl px-6 text-center">
            <Reveal>
              <h2 class="bronze-text mb-8 overflow-visible pb-[0.16em] pt-[0.06em] text-4xl font-light leading-[1.18] tracking-tighter md:text-6xl">
                Готовы построить <span class="font-medium italic">будущее?</span>
              </h2>
              <p class="mx-auto mb-12 max-w-2xl text-lg text-stone-600">
                Закажите резиденцию от Santilli Architecture и испытайте пересечение высококлассного дизайна и структурной неуязвимости.
              </p>
              <button
                onClick={props.openModal}
                class="group inline-flex items-center gap-3 bg-stone-900 px-10 py-5 text-sm font-medium text-white shadow-2xl shadow-stone-900/20 transition-[transform,background-color,box-shadow] duration-300 hover:-translate-y-1 hover:bg-stone-800 hover:shadow-stone-900/40"
              >
                Назначить частную консультацию
                <ArrowRight size={16} class="transition-transform group-hover:translate-x-1" />
              </button>
            </Reveal>
          </div>
        </section>

        <footer class="border-t border-stone-900 bg-stone-950 py-20 text-stone-400" style={footerSectionStyle}>
          <div class="mx-auto max-w-7xl px-6 md:px-12">
            <div class="mb-16 grid grid-cols-1 gap-16 md:grid-cols-4">
              <div class="col-span-1 md:col-span-2">
                <div class="mb-8 flex cursor-pointer items-center gap-2" onClick={(event: MouseEvent) => props.navigateToSection(event, 'hero')}>
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
                      <a
                        href={`#${link.id}`}
                        onClick={(event: MouseEvent) => props.navigateToSection(event, link.id)}
                        class="transition-colors hover:text-white"
                      >
                        {link.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h4 class="mb-6 text-sm font-medium tracking-wide text-white">Связь</h4>
                <div class="flex flex-wrap items-center gap-3">
                  {socialLinks.map((link) => {
                    const Icon = getSocialIcon(link.label);

                    return (
                      <a
                        key={link.label}
                        href={link.href}
                        aria-label={link.label}
                        title={link.label}
                        class="group flex h-11 w-11 items-center justify-center rounded-full border border-stone-800 bg-stone-900/60 text-stone-400 transition-[transform,border-color,color,background-color] duration-300 hover:-translate-y-0.5 hover:border-stone-500 hover:bg-stone-900 hover:text-white"
                      >
                        <Icon size={18} strokeWidth={1.8} />
                      </a>
                    );
                  })}
                </div>
              </div>
            </div>

            <div class="flex flex-col items-center justify-center border-t border-stone-800 pt-8 text-xs text-stone-600 md:flex-row md:justify-end">
              <div class="flex gap-6">
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
      </>
    );
  },
});

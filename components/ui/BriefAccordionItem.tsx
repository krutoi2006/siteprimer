import { ChevronDown } from 'lucide-vue-next';
import { computed, defineComponent, type CSSProperties, type PropType, type Ref, type VNodeChild } from 'vue';

type BriefTheme = 'light' | 'dark';

export default defineComponent({
  name: 'BriefAccordionItem',
  props: {
    id: {
      type: String,
      required: true,
    },
    activeId: {
      type: Object as PropType<Ref<string | null>>,
      required: true,
    },
    onToggle: {
      type: Function as PropType<(id: string) => void>,
      required: true,
    },
    brief: {
      type: String,
      required: true,
    },
    detail: {
      type: String,
      default: '',
    },
    renderHeader: {
      type: Function as PropType<(isOpen: boolean) => VNodeChild>,
      required: true,
    },
    briefTheme: {
      type: String as PropType<BriefTheme>,
      default: 'light',
    },
    buttonClass: {
      type: String,
      required: true,
    },
    headerClass: {
      type: String,
      default: 'flex items-start justify-between gap-4',
    },
    iconClass: {
      type: String,
      default: '',
    },
    iconSize: {
      type: Number,
      default: 16,
    },
    stableSize: {
      type: Boolean,
      default: false,
    },
    panelSpace: {
      type: String,
      default: 'clamp(4.75rem, 10vw, 6rem)',
    },
  },
  setup(props) {
    const isOpen = computed(() => props.activeId.value === props.id);
    const panelStyle = computed<CSSProperties | undefined>(() =>
      props.stableSize
        ? ({
            '--brief-panel-space': props.panelSpace,
          } as CSSProperties)
        : undefined,
    );

    const handleToggle = () => {
      props.onToggle(props.id);
    };

    return () => (
      <div
        style={panelStyle.value}
        class={['brief-card', props.stableSize ? 'brief-card-stable' : '']}
      >
        <button
          type="button"
          onClick={handleToggle}
          aria-expanded={isOpen.value}
          aria-controls={`brief-panel-${props.id}`}
          class={['brief-card-trigger w-full touch-manipulation text-left', props.buttonClass]}
        >
          <div class={props.headerClass}>
            {props.renderHeader(isOpen.value)}
            <ChevronDown
              size={props.iconSize}
              class={['transition-transform duration-300', props.iconClass, isOpen.value ? 'rotate-180' : '']}
            />
          </div>
        </button>

        <div
          id={`brief-panel-${props.id}`}
          class={[
            'brief-panel',
            props.stableSize
              ? 'brief-panel-stable'
              : 'brief-panel-dynamic grid overflow-hidden',
            props.stableSize ? '' : isOpen.value ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0',
          ]}
        >
          <div class={props.stableSize ? 'brief-panel-shell overflow-hidden pt-3' : 'overflow-hidden pt-4'}>
            <div
              aria-hidden={!isOpen.value}
              class={[
                'brief-panel-inner brief-panel-content text-left',
                isOpen.value ? 'translate-y-0 opacity-100' : 'translate-y-1 opacity-0 pointer-events-none',
                props.briefTheme === 'dark'
                  ? props.stableSize
                    ? 'border border-white/15 bg-white/10 px-4 py-3 text-sm leading-6 text-stone-200 sm:pr-6'
                    : 'border border-white/15 bg-white/10 px-5 py-4 text-sm leading-7 text-stone-200 sm:pr-8'
                  : props.stableSize
                    ? 'border border-stone-200 bg-white/80 px-4 py-3 text-sm leading-6 text-stone-600 sm:pr-6'
                    : 'border border-stone-200 bg-white/80 px-5 py-4 text-sm leading-7 text-stone-600 sm:pr-8',
              ]}
            >
              <p>{props.brief}</p>
              {props.detail ? (
                <div
                  class={[
                    'mt-3 border-t pt-3',
                    props.briefTheme === 'dark' ? 'border-white/15' : 'border-stone-200',
                  ]}
                >
                  <div
                    class={[
                      'mb-2 text-[10px] font-bold uppercase tracking-[0.18em]',
                      props.briefTheme === 'dark' ? 'text-stone-300' : 'text-stone-400',
                    ]}
                  >
                    Подробнее
                  </div>
                  <p>{props.detail}</p>
                </div>
              ) : null}
            </div>
          </div>
        </div>
      </div>
    );
  },
});

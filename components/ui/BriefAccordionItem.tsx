import { ChevronDown } from 'lucide-vue-next';
import { computed, defineComponent, type PropType, type Ref, type VNodeChild } from 'vue';

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
  },
  setup(props) {
    const isOpen = computed(() => props.activeId.value === props.id);

    const handleToggle = () => {
      props.onToggle(props.id);
    };

    return () => (
      <button
        type="button"
        onClick={handleToggle}
        aria-expanded={isOpen.value}
        class={['touch-manipulation', props.buttonClass]}
      >
        <div class={props.headerClass}>
          {props.renderHeader(isOpen.value)}
          <ChevronDown
            size={props.iconSize}
            class={['transition-transform duration-300', props.iconClass, isOpen.value ? 'rotate-180' : '']}
          />
        </div>

        <div
          class={[
            'brief-panel grid overflow-hidden transition-[grid-template-rows,opacity,margin] duration-700 ease-[cubic-bezier(0.22,1,0.36,1)]',
            isOpen.value ? 'mt-4 grid-rows-[1fr] opacity-100' : 'mt-0 grid-rows-[0fr] opacity-0',
          ]}
        >
          <div class="overflow-hidden">
            <div
              class={[
                'brief-panel-inner text-left transition-all duration-700 ease-[cubic-bezier(0.22,1,0.36,1)]',
                isOpen.value ? 'translate-y-0 scale-100' : '-translate-y-2 scale-[0.985]',
                props.briefTheme === 'dark'
                  ? 'border border-white/15 bg-white/10 px-5 py-4 text-sm leading-7 text-stone-200 backdrop-blur-sm sm:pr-8'
                  : 'border border-stone-200 bg-white/80 px-5 py-4 text-sm leading-7 text-stone-600 backdrop-blur-sm sm:pr-8',
              ]}
            >
              {props.brief}
            </div>
          </div>
        </div>
      </button>
    );
  },
});

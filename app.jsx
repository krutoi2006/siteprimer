import React, { useState, useEffect, useRef } from 'react';
import { X, ArrowRight, ChevronDown, Wind, Shield, Clock, Smartphone } from 'lucide-react';

// --- ХУКИ И ВСПОМОГАТЕЛЬНЫЕ КОМПОНЕНТЫ ---

const useScrollEffects = (rootRef, threshold = 50) => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    let frameId = 0;
    let lastScrolled = window.scrollY > threshold;

    const applyScrollEffects = () => {
      frameId = 0;

      const currentScrollY = window.scrollY;
      const root = rootRef.current;

      if (root) {
        root.style.setProperty('--hero-parallax', `${currentScrollY * 0.4}px`);
        root.style.setProperty('--technology-parallax', `${currentScrollY * 0.03}px`);
        root.style.setProperty('--construction-parallax', `${currentScrollY * 0.02}px`);
      }

      const nextScrolled = currentScrollY > threshold;
      if (nextScrolled !== lastScrolled) {
        lastScrolled = nextScrolled;
        setIsScrolled(nextScrolled);
      }
    };

    const handleScroll = () => {
      if (frameId) return;
      frameId = window.requestAnimationFrame(applyScrollEffects);
    };

    applyScrollEffects();
    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      if (frameId) window.cancelAnimationFrame(frameId);
      window.removeEventListener('scroll', handleScroll);
    };
  }, [rootRef, threshold]);

  return isScrolled;
};

const useMobileOrientation = () => {
  const [isMobilePortrait, setIsMobilePortrait] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkOrientation = () => {
      const mobileCheck = window.innerWidth <= 768;
      setIsMobile(mobileCheck);
      setIsMobilePortrait(mobileCheck && window.innerHeight > window.innerWidth);
    };

    checkOrientation();
    window.addEventListener('resize', checkOrientation);

    return () => window.removeEventListener('resize', checkOrientation);
  }, []);

  return { isMobilePortrait, isMobile };
};

const Reveal = ({ children, delay = 0, direction = 'up', isReady = true }) => {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    if (!isReady) return;
    
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.1 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [isReady]);

  let transform = 'translateY(40px)';
  if (direction === 'left') transform = 'translateX(-40px)';
  if (direction === 'right') transform = 'translateX(40px)';
  if (direction === 'none') transform = 'translate(0)';

  return (
    <div
      ref={ref}
      style={{
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? 'translate(0)' : transform,
        transition: `opacity 0.8s cubic-bezier(0.17, 0.55, 0.55, 1) ${delay}ms, transform 0.8s cubic-bezier(0.17, 0.55, 0.55, 1) ${delay}ms`,
      }}
    >
      {children}
    </div>
  );
};

// Интерактивная 3D визуализация технологии
const ScipVisualization = React.memo(function ScipVisualization() {
  return (
    <div className="relative w-full aspect-square md:h-[600px] flex items-center justify-center group cursor-pointer" style={{ perspective: '1200px' }}>
      <div 
        className="relative w-48 sm:w-64 h-72 sm:h-96 transition-transform duration-1000 ease-[cubic-bezier(0.25,0.1,0.25,1)] group-hover:scale-105" 
        style={{ transform: 'rotateX(60deg) rotateZ(-45deg)', transformStyle: 'preserve-3d' }}
      >
        <div className="absolute inset-0 bg-stone-100 border border-stone-200 shadow-[0_20px_40px_rgba(0,0,0,0.1)] transition-all duration-1000 ease-[cubic-bezier(0.25,0.1,0.25,1)] [transform:translateZ(-40px)] group-hover:[transform:translateZ(-80px)] flex items-start justify-end p-4">
          <div className="text-[10px] font-bold tracking-[0.2em] text-stone-400 rotate-90 origin-top-right translate-y-8">ИНТЕРЬЕР</div>
        </div>
        <div className="absolute inset-0 border border-slate-300/40 transition-all duration-1000 ease-[cubic-bezier(0.25,0.1,0.25,1)] [transform:translateZ(0px)] group-hover:[transform:translateZ(-20px)]" style={{ backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 15px, rgba(148, 163, 184, 0.3) 15px, rgba(148, 163, 184, 0.3) 16px), repeating-linear-gradient(90deg, transparent, transparent 15px, rgba(148, 163, 184, 0.3) 15px, rgba(148, 163, 184, 0.3) 16px)' }}/>
        <div className="absolute inset-0 bg-white/80 backdrop-blur-md border border-stone-100 shadow-[0_0_30px_rgba(0,0,0,0.05)] transition-all duration-1000 ease-[cubic-bezier(0.25,0.1,0.25,1)] [transform:translateZ(40px)] group-hover:[transform:translateZ(60px)] flex items-center justify-center">
           <div className="text-center bg-white/50 px-4 py-2 rounded-full backdrop-blur-lg border border-white/60">
             <div className="text-[10px] font-bold tracking-[0.2em] text-stone-500">ЯДРО EPS</div>
           </div>
        </div>
        <div className="absolute inset-0 border border-slate-300/40 transition-all duration-1000 ease-[cubic-bezier(0.25,0.1,0.25,1)] [transform:translateZ(80px)] group-hover:[transform:translateZ(140px)]" style={{ backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 15px, rgba(148, 163, 184, 0.3) 15px, rgba(148, 163, 184, 0.3) 16px), repeating-linear-gradient(90deg, transparent, transparent 15px, rgba(148, 163, 184, 0.3) 15px, rgba(148, 163, 184, 0.3) 16px)' }}/>
        <div className="absolute inset-0 bg-stone-300 border border-stone-400 shadow-[20px_30px_50px_rgba(0,0,0,0.2)] transition-all duration-1000 ease-[cubic-bezier(0.25,0.1,0.25,1)] [transform:translateZ(120px)] group-hover:[transform:translateZ(200px)] opacity-95 flex items-end p-4">
            <div className="text-[10px] font-bold tracking-[0.2em] text-stone-600">СТРУКТУРНЫЙ БЕТОН</div>
        </div>
        <div className="absolute -bottom-16 left-1/2 -translate-x-1/2 text-[10px] font-medium tracking-widest text-stone-400 opacity-0 transition-opacity duration-500 group-hover:opacity-100 whitespace-nowrap">
          НАВЕДИТЕ ДЛЯ ПРОСМОТРА СЛОЕВ
        </div>
      </div>
    </div>
  );
});


// --- ГЛАВНОЕ ПРИЛОЖЕНИЕ ---

const HeritageSection = () => {
  const [hoveredEpoch, setHoveredEpoch] = useState(null);

  return (
    <section className="py-24 bg-stone-50 overflow-hidden relative border-t border-stone-200">
      <div className="max-w-7xl mx-auto px-6 md:px-12 mb-16 text-center">
        <h2 className="text-3xl md:text-5xl font-light tracking-tighter bronze-text leading-[1.18] pt-[0.06em] pb-[0.16em] overflow-visible">
          От монументальности прошлого <span className="font-medium italic">к технологиям будущего.</span>
        </h2>
      </div>

      <div className="max-w-7xl mx-auto px-6 md:px-12 h-[600px] md:h-[700px]">
        <div className="w-full h-full flex flex-col md:flex-row gap-[2px] bg-stone-300 overflow-hidden shadow-2xl">
          <div
            className="relative h-full overflow-hidden cursor-pointer bg-stone-900"
            style={{
              flex: hoveredEpoch === 'old' ? 2 : hoveredEpoch === 'new' ? 0.6 : 1,
              transition: 'flex 0.8s cubic-bezier(0.25, 1, 0.5, 1)',
            }}
            onMouseEnter={() => setHoveredEpoch('old')}
            onMouseLeave={() => setHoveredEpoch(null)}
          >
            <div
              className="absolute inset-0 bg-cover bg-center"
              style={{ backgroundImage: `url('/image/zamok.webp')` }}
            />
            <div className={`absolute inset-0 transition-colors duration-700 ${hoveredEpoch === 'old' ? 'bg-stone-900/40' : 'bg-stone-900/60'}`} />

            <div className="absolute inset-0 p-8 md:p-12 flex flex-col justify-end">
              <div className={`transition-all duration-700 transform ${hoveredEpoch === 'old' ? 'translate-y-0 opacity-100' : 'translate-y-4 md:opacity-80'}`}>
                <div className="text-[#dcb589] text-xs font-bold tracking-[0.2em] uppercase mb-3">~ 1000 г. н.э.</div>
                <h3 className="text-3xl md:text-4xl font-light text-white mb-2 whitespace-nowrap">Каменные замки</h3>

                <div className={`grid transition-all duration-700 ease-in-out ${hoveredEpoch === 'old' ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'}`}>
                  <div className="overflow-hidden">
                    <p className="text-stone-300 font-light max-w-sm text-sm md:text-base pt-4">
                      Вершина инженерии своего времени. Технологии, создавшие эталон долговечности и надежности.
                      Мы отдаем дань уважения их монументальности.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div
            className="relative h-full overflow-hidden cursor-pointer bg-stone-900"
            style={{
              flex: hoveredEpoch === 'new' ? 2 : hoveredEpoch === 'old' ? 0.6 : 1,
              transition: 'flex 0.8s cubic-bezier(0.25, 1, 0.5, 1)',
            }}
            onMouseEnter={() => setHoveredEpoch('new')}
            onMouseLeave={() => setHoveredEpoch(null)}
          >
            <div
              className="absolute inset-0 bg-cover bg-center"
              style={{ backgroundImage: `url('/image/dom1.webp')` }}
            />
            <div className={`absolute inset-0 transition-colors duration-700 ${hoveredEpoch === 'new' ? 'bg-stone-900/40' : 'bg-stone-900/60'}`} />

            <div className="absolute inset-0 p-8 md:p-12 flex flex-col justify-end">
              <div className={`transition-all duration-700 transform ${hoveredEpoch === 'new' ? 'translate-y-0 opacity-100' : 'translate-y-4 md:opacity-80'}`}>
                <div className="text-[#dcb589] text-xs font-bold tracking-[0.2em] uppercase mb-3">Наши дни</div>
                <h3 className="text-3xl md:text-4xl font-light text-white mb-2 whitespace-nowrap">CLT и SCIP</h3>

                <div className={`grid transition-all duration-700 ease-in-out ${hoveredEpoch === 'new' ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'}`}>
                  <div className="overflow-hidden">
                    <p className="text-stone-300 font-light max-w-sm text-sm md:text-base pt-4">
                      Эволюция прочности. Мы переносим надежность прошлого в наше время, наделяя ее
                      абсолютным комфортом и интеллектом современных материалов.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default function App() {
  const rootRef = useRef(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const isScrolled = useScrollEffects(rootRef);
  const { isMobilePortrait, isMobile } = useMobileOrientation();

  // Состояния для экрана загрузки
  const [isLoading, setIsLoading] = useState(true);
  const [isFadingOut, setIsFadingOut] = useState(false);
  const [appReady, setAppReady] = useState(false);
  
  // Состояние модального окна (Форма консультации)
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Изображения для карусели главного экрана
  const heroImages = [
    '/image/dom5.webp',
    '/image/dom4.webp',
    '/image/dom7.webp'
  ];

  const [heroIndices, setHeroIndices] = useState({ prev: heroImages.length - 1, current: 0 });

  // Логика экрана загрузки
  useEffect(() => {
    document.body.style.overflow = 'hidden';

    const fadeTimer = setTimeout(() => {
      setIsFadingOut(true);
    }, 2500);

    const removeTimer = setTimeout(() => {
      setIsLoading(false);
      setAppReady(true);
      document.body.style.overflow = 'unset';
    }, 3500);

    return () => {
      clearTimeout(fadeTimer);
      clearTimeout(removeTimer);
    };
  }, []);

  // Блокировка скролла при открытом модальном окне
  useEffect(() => {
    if ((isModalOpen || isMenuOpen) && !isLoading) {
      document.body.style.overflow = 'hidden';
    } else if (!isLoading) {
      document.body.style.overflow = 'unset';
    }
    
    return () => {
      if (!isLoading) document.body.style.overflow = 'unset';
    };
  }, [isModalOpen, isMenuOpen, isLoading]);

  // Автоматическое перелистывание карусели
  useEffect(() => {
    if (!appReady) return;

    const timer = setInterval(() => {
      setHeroIndices(prev => ({
        prev: prev.current,
        current: (prev.current + 1) % heroImages.length
      }));
    }, 6000);
    
    return () => clearInterval(timer);
  }, [appReady, heroImages.length]);

  const handleManualSlide = (index) => {
    if (index === heroIndices.current) return;
    setHeroIndices({ prev: heroIndices.current, current: index });
  };

  const scrollToSection = (e, id) => {
    e.preventDefault();
    const element = document.getElementById(id);
    if (element) {
      const headerOffset = 80;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth"
      });
    }
    setIsMenuOpen(false);
  };

  const navItems = [
    { label: 'Введение', id: 'vision' },
    { label: 'Технологии', id: 'technology' },
    { label: 'Проекты', id: 'projects' },
    { label: 'Студия', id: 'studio' }
  ];

  const contactHighlights = [
    { title: 'Консультация', desc: 'Спокойно разбираем задачу, сценарий жизни и желаемый уровень дома.' },
    { title: 'Референсы', desc: 'Показываем релевантные решения, а не абстрактные обещания.' },
    { title: 'Бюджет', desc: 'Даем честный диапазон стоимости и понимаем рамку проекта заранее.' },
    { title: 'CLT или SCIP', desc: 'Сравниваем две технологии по логике дома, срокам и будущей эксплуатации.' }
  ];

  const siteInsights = [
    {
      title: 'Рельеф и геология',
      desc: 'Смотрим, как участок принимает дом и какое основание действительно оправдано.'
    },
    {
      title: 'Подъезд и логистика',
      desc: 'Проверяем технику, маршруты доставки и реальные условия монтажа.'
    },
    {
      title: 'Коммуникации и инсоляция',
      desc: 'Оцениваем точки подключения, солнце, виды и приватность будущих пространств.'
    },
    {
      title: 'Соседи и деревья',
      desc: 'Учитываем окружающую застройку, существующие насаждения и линии обзора.'
    }
  ];

  const conceptPoints = [
    {
      title: 'Посадка на реальный рельеф и ориентацию по солнцу',
      desc: 'Дом сразу получает правильную позицию на участке и естественную логику освещения в течение дня.'
    },
    {
      title: 'Точная логика фундамента, дренажа и подъезда',
      desc: 'Решения по основанию и логистике рождаются не на стройке, а еще на стадии концепции.'
    },
    {
      title: 'Учет ограничений участка, приватности и видовых осей',
      desc: 'Мы заранее связываем архитектуру с соседями, видами, отступами и сценариями приватности.'
    },
    {
      title: 'Архитектура, которая сразу мыслится как будущая стройка',
      desc: 'Эскиз сразу проверяется на реализуемость, чтобы красота не расходилась с реальным строительством.'
    }
  ];

  const architectureCards = [
    {
      title: 'CLT',
      desc: 'Работаем с точностью панелей, узлов и сборочной геометрии, чтобы дерево читалось как архитектура и как система.'
    },
    {
      title: 'SCIP',
      desc: 'Собираем монолитную оболочку с заранее выверенными нагрузками, узлами, толщинами и последовательностью работ.'
    }
  ];

  const designLayers = [
    {
      title: 'Планировочные сценарии и мебель',
      desc: 'Инженерия получает реальные точки привязки только тогда, когда понятен образ жизни внутри дома.'
    },
    {
      title: 'Материалы, фактуры и внешний образ дома',
      desc: 'Выбор оболочки и внутренней атмосферы заранее задает технические решения без компромиссов на финише.'
    },
    {
      title: 'Сценарии света, воздуха и ежедневного маршрута жизни',
      desc: 'Мы проектируем не просто комнаты, а последовательность ощущений и привычных действий семьи.'
    }
  ];

  const engineeringCards = [
    {
      title: 'Электрика и освещение',
      desc: 'Привязываем группы, выводы и световые сцены к реальному интерьеру, а не к догадкам на стройке.'
    },
    {
      title: 'Вода и канализация',
      desc: 'Трассируем мокрые зоны и сервисные узлы точно по утвержденной логике пространства.'
    },
    {
      title: 'Отопление и вентиляция',
      desc: 'Собираем комфортный микроклимат под архитектуру дома, сезонность и образ жизни семьи.'
    },
    {
      title: 'Слаботочные системы',
      desc: 'Интернет, безопасность, мультимедиа и автоматика закладываются сразу, а не добавляются постфактум.'
    }
  ];

  const budgetCards = [
    { title: 'Фиксированная смета', desc: 'После утверждения архитектуры, дизайна и инженерии стоимость перестает быть размытой.' },
    { title: 'Объемы работ', desc: 'Клиент видит, из чего складывается стройка и какие этапы входят в реализацию.' },
    { title: 'Спецификация материалов', desc: 'Каждая ключевая позиция получает понятное и проверяемое наполнение.' },
    { title: 'График оплат', desc: 'Платежи увязаны с этапами работ, а не с неопределенными обещаниями.' }
  ];

  const supervisionCards = [
    {
      title: 'Авторский контроль',
      desc: 'Следим, чтобы архитектура, материалы и детали были реализованы в той точности, в которой были задуманы.'
    },
    {
      title: 'Техническая проверка',
      desc: 'Контролируем скрытые работы, узлы, геометрию и соответствие проектной документации.'
    },
    {
      title: 'Раннее выявление отклонений',
      desc: 'Замечаем расхождения до того, как они превращаются в дорогие компромиссы на финале.'
    }
  ];

  const constructionStages = [
    {
      title: 'Фундамент',
      desc: 'Основание выполняется по логике участка, геологии и выбранной конструктивной системы.'
    },
    {
      title: 'Сборка CLT или SCIP',
      desc: 'Несущая система собирается в четкой проектной последовательности без случайных решений на площадке.'
    },
    {
      title: 'Кровля и фасады',
      desc: 'Контур дома закрывается в точном соответствии с архитектурным образом и узлами проекта.'
    },
    {
      title: 'Инженерия и чистовая отделка',
      desc: 'Финишные работы опираются на заранее согласованные инженерные и дизайнерские сценарии.'
    }
  ];

  const handoverDocs = [
    {
      title: 'Проектные материалы и актуальные схемы',
      desc: 'Клиент получает полный комплект документов, отражающих реальную конфигурацию построенного дома.'
    },
    {
      title: 'Инженерные чертежи и акты скрытых работ',
      desc: 'Все скрытые решения остаются зафиксированными и доступны для сервиса и эксплуатации.'
    },
    {
      title: 'Геология, геодезия и сертификаты материалов',
      desc: 'Важные исходные данные и подтверждения качества передаются вместе с домом, а не теряются после стройки.'
    },
    {
      title: 'Инструкции по эксплуатации и паспорт дома',
      desc: 'У владельца остается понятная база для спокойного использования и обслуживания объекта.'
    }
  ];

  const supportCards = [
    {
      title: 'Гарантия',
      desc: 'Фиксированные обязательства и понятная реакция на каждый запрос.'
    },
    {
      title: 'Поддержка',
      desc: 'Консультации по эксплуатации, настройкам и обновлениям систем.'
    },
    {
      title: 'Цифровой кабинет',
      desc: 'Единая цифровая точка доступа ко всем схемам, актам и паспортам.'
    }
  ];

  const [activeBriefs, setActiveBriefs] = useState({});

  const toggleBrief = (id) => {
    setActiveBriefs((prev) => (prev[id] ? {} : { [id]: true }));
  };

  const renderBrief = (id, content, theme = 'light') => (
    <div
      className={`grid overflow-hidden transition-[grid-template-rows,opacity,margin] duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] ${
        activeBriefs[id] ? 'mt-4 grid-rows-[1fr] opacity-100' : 'mt-0 grid-rows-[0fr] opacity-0'
      }`}
    >
      <div className="overflow-hidden">
        <div
          className={`text-left transition-all duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] ${
            activeBriefs[id] ? 'translate-y-0 scale-100' : '-translate-y-2 scale-[0.985]'
          } ${
            theme === 'dark'
              ? 'border border-white/15 bg-white/10 px-5 py-4 text-sm leading-7 text-stone-200 backdrop-blur-sm sm:pr-8'
              : 'border border-stone-200 bg-white/80 px-5 py-4 text-sm leading-7 text-stone-600 backdrop-blur-sm sm:pr-8'
          }`}
        >
          {content}
        </div>
      </div>
    </div>
  );

  return (
    <div
      ref={rootRef}
      style={{
        '--hero-parallax': '0px',
        '--technology-parallax': '0px',
        '--construction-parallax': '0px',
      }}
      className="font-sans text-stone-900 bg-stone-50 min-h-screen overflow-x-hidden selection:bg-stone-300 selection:text-stone-900"
    >
      <style dangerouslySetInnerHTML={{ __html: `
        .bronze-text {
          background: linear-gradient(-45deg, #4a3320 0%, #a67c52 25%, #dcb589 50%, #a67c52 75%, #4a3320 100%);
          background-size: 300% auto;
          color: transparent;
          -webkit-background-clip: text;
          background-clip: text;
          animation: shine 6s linear infinite;
          text-shadow: 0px 4px 20px rgba(166, 124, 82, 0.2);
        }

        .bronze-text-light {
          background: linear-gradient(-45deg, #b88a58 0%, #f8d5a6 25%, #ffffff 50%, #f8d5a6 75%, #b88a58 100%);
          background-size: 300% auto;
          color: transparent;
          -webkit-background-clip: text;
          background-clip: text;
          animation: shine 6s linear infinite;
          text-shadow: 0px 4px 20px rgba(248, 213, 166, 0.3);
        }

        @keyframes shine {
          to { background-position: 300% center; }
        }

        @keyframes phoneRotate {
          0%, 20% { transform: rotate(0deg); }
          50%, 70% { transform: rotate(-90deg); }
          100% { transform: rotate(0deg); }
        }

        @keyframes slideDownProjects {
          0% { opacity: 0; transform: translateY(-100px); }
          100% { opacity: 1; transform: translateY(0); }
        }

        @keyframes softFloatCard {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-6px); }
        }

        .animate-projects-reveal {
          animation: slideDownProjects 1.2s cubic-bezier(0.2, 0.8, 0.2, 1) forwards;
        }

        .float-card {
          animation: softFloatCard 7s ease-in-out infinite;
        }

        @media (prefers-reduced-motion: reduce) {
          .float-card {
            animation: none;
          }
        }
      ` }} />
      
      {/* Экран загрузки (Прелоадер) */}
      {isLoading && (
        <div 
          className={`fixed inset-0 z-[100] bg-white flex items-center justify-center transition-opacity duration-1000 ease-in-out ${
            isFadingOut ? 'opacity-0 pointer-events-none' : 'opacity-100'
          }`}
        >
          <div className={`transform transition-all duration-[3000ms] ease-out ${isFadingOut ? 'scale-105 blur-sm' : 'scale-100 blur-0'}`}>
            <img 
              src="image/logo.webp" 
              alt="Santilli Architecture Logo" 
              className="w-64 md:w-96 object-contain"
            />
          </div>
        </div>
      )}

      {/* Модальное окно (Форма консультации) */}
      <div 
        className={`fixed inset-0 z-[200] flex items-center justify-center p-4 sm:p-6 transition-all duration-500 ${
          isModalOpen ? 'opacity-100 visible' : 'opacity-0 invisible pointer-events-none'
        }`}
      >
        {/* Затемняющий фон */}
        <div 
          className="absolute inset-0 bg-stone-900/60 backdrop-blur-sm transition-opacity"
          onClick={() => setIsModalOpen(false)}
        ></div>

        {/* Контейнер формы */}
        <div 
          className={`relative w-full max-w-lg bg-white p-8 md:p-12 shadow-2xl transition-all duration-500 ease-out transform ${
            isModalOpen ? 'translate-y-0 scale-100' : 'translate-y-8 scale-95'
          }`}
        >
          <button 
            onClick={() => setIsModalOpen(false)}
            className="absolute top-6 right-6 text-stone-400 hover:text-stone-900 transition-colors"
          >
            <X size={24} strokeWidth={1.5} />
          </button>

          <div className="mb-10">
            <h3 className="text-3xl font-light tracking-tight bronze-text mb-3">Частная консультация</h3>
            <p className="text-sm text-stone-500 leading-relaxed">
              Оставьте свои контактные данные, и наш ведущий архитектор свяжется с вами для обсуждения вашего проекта.
            </p>
          </div>

          <form className="space-y-6" onSubmit={(e) => { e.preventDefault(); /* Логика отправки здесь */ }}>
            <div className="space-y-1">
              <label htmlFor="name" className="text-xs font-bold tracking-widest text-stone-400 uppercase">Ваше Имя</label>
              <input 
                type="text" 
                id="name" 
                required
                className="w-full bg-transparent border-b border-stone-200 py-2 focus:outline-none focus:border-stone-900 transition-colors text-stone-900"
              />
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="space-y-1">
                <label htmlFor="phone" className="text-xs font-bold tracking-widest text-stone-400 uppercase">Телефон</label>
                <input 
                  type="tel" 
                  id="phone" 
                  required
                  className="w-full bg-transparent border-b border-stone-200 py-2 focus:outline-none focus:border-stone-900 transition-colors text-stone-900"
                />
              </div>
              <div className="space-y-1">
                <label htmlFor="email" className="text-xs font-bold tracking-widest text-stone-400 uppercase">Email</label>
                <input 
                  type="email" 
                  id="email" 
                  required
                  className="w-full bg-transparent border-b border-stone-200 py-2 focus:outline-none focus:border-stone-900 transition-colors text-stone-900"
                />
              </div>
            </div>

            <div className="space-y-1">
              <label htmlFor="details" className="text-xs font-bold tracking-widest text-stone-400 uppercase">Кратко о проекте (опционально)</label>
              <textarea 
                id="details" 
                rows="3"
                className="w-full bg-transparent border-b border-stone-200 py-2 focus:outline-none focus:border-stone-900 transition-colors text-stone-900 resize-none"
              ></textarea>
            </div>

            <button 
              type="submit" 
              className="w-full bg-stone-900 text-white px-8 py-4 text-sm font-medium hover:bg-stone-800 transition-colors mt-8"
            >
              Отправить запрос
            </button>
            <p className="text-center text-[10px] text-stone-400 uppercase tracking-widest mt-4">
              Ваши данные надежно защищены
            </p>
          </form>
        </div>
      </div>

      {/* Навигация */}
      <nav className={`fixed w-full ${isMenuOpen ? 'z-[70]' : 'z-50'} transition-all duration-500 ${isScrolled ? 'bg-white/80 backdrop-blur-lg py-4' : 'bg-transparent py-6'}`}>
        <div className="max-w-7xl mx-auto px-6 md:px-12 flex justify-between items-center">
          <div
            className={`flex items-center gap-2 cursor-pointer group transition-opacity duration-300 ${
              isMenuOpen ? 'opacity-0 pointer-events-none md:opacity-100 md:pointer-events-auto' : 'opacity-100'
            }`}
            onClick={(e) => scrollToSection(e, 'hero')}
          >
            <div className="w-8 h-8 bg-stone-900 flex items-center justify-center transition-transform duration-500 group-hover:rotate-90">
              <div className="w-3 h-3 border border-white"></div>
            </div>
            <span className={`text-xl font-medium tracking-tight transition-colors duration-500 ${isScrolled ? 'bronze-text' : 'bronze-text-light'}`}>SANTILLI</span>
            <div
              className={`overflow-hidden rounded-full border transition-all duration-500 ${
                isScrolled
                  ? 'border-stone-200 bg-white/90 shadow-[0_8px_24px_rgba(28,25,23,0.08)]'
                  : 'border-white/15 bg-white/10 backdrop-blur-sm'
              }`}
            >
              <img
                src="/image/23.webp"
                alt="Italy and Russia"
                className="h-9 w-16 object-contain"
              />
            </div>
          </div>
          
          <div className="hidden md:flex items-center gap-10">
            {navItems.map((item) => (
              <a 
                key={item.id} 
                href={`#${item.id}`} 
                onClick={(e) => scrollToSection(e, item.id)}
                className={`text-sm font-medium transition-colors duration-300 hover:text-stone-400 ${isScrolled ? 'text-stone-600 hover:text-stone-900' : 'text-stone-300 hover:text-white'}`}
              >
                {item.label}
              </a>
            ))}
            <button 
              onClick={() => setIsModalOpen(true)}
              className={`text-sm font-medium px-6 py-2.5 transition-all duration-300 flex items-center gap-2 group ${isScrolled ? 'bg-stone-900 text-white hover:bg-stone-800' : 'bg-white text-stone-900 hover:bg-stone-200'}`}
            >
              Связаться
              <ArrowRight size={14} className="transition-transform group-hover:translate-x-1" />
            </button>
          </div>

          <button
            type="button"
            aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
            className={`relative z-[60] flex h-11 w-11 items-center justify-center rounded-full text-stone-900 transition-all duration-300 md:hidden ${
              isScrolled
                ? 'bg-white shadow-sm ring-1 ring-stone-200/80 hover:bg-white'
                : 'bg-transparent shadow-none ring-0 hover:bg-transparent'
            }`}
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <span
              className={`absolute h-[2px] w-5 rounded-full bg-current transition-all duration-500 ease-out ${
                isMenuOpen ? 'translate-y-0 rotate-45' : '-translate-y-[7px]'
              }`}
            />
            <span
              className={`absolute h-[2px] w-5 rounded-full bg-current transition-all duration-300 ease-out ${
                isMenuOpen ? 'scale-x-0 opacity-0' : 'scale-x-100 opacity-100'
              }`}
            />
            <span
              className={`absolute h-[2px] w-5 rounded-full bg-current transition-all duration-500 ease-out ${
                isMenuOpen ? 'translate-y-0 -rotate-45' : 'translate-y-[7px]'
              }`}
            />
          </button>
        </div>
      </nav>

      {/* Мобильное меню */}
      <div
        className={`fixed inset-0 z-[55] bg-stone-50 px-6 pt-28 pb-8 transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] md:hidden ${
          isMenuOpen ? 'visible translate-y-0 opacity-100' : 'invisible -translate-y-full opacity-0 pointer-events-none'
        }`}
      >
        <div className="flex min-h-full flex-col gap-6 text-xl font-light tracking-tight sm:text-2xl">
          <div className="hidden items-center justify-end">
            <button
              type="button"
              aria-label="Close menu"
              onClick={() => setIsMenuOpen(false)}
              className="flex items-center gap-2 text-sm font-medium uppercase tracking-[0.18em] text-stone-500 transition-colors hover:text-stone-900"
            >
              <X size={18} strokeWidth={1.75} />
              Закрыть
            </button>
          </div>
          {navItems.map((item) => (
            <a 
              key={item.id} 
              href={`#${item.id}`} 
              onClick={(e) => scrollToSection(e, item.id)} 
              className="border-b border-stone-300 pb-4 text-2xl font-medium leading-tight text-stone-950 sm:text-[2rem]"
            >
              {item.label}
            </a>
          ))}
          <button 
            onClick={() => { setIsMenuOpen(false); setIsModalOpen(true); }}
            className="mt-auto flex w-full items-center justify-center gap-2 bg-stone-900 px-6 py-4 text-sm font-medium text-white"
          >
            Начать проект
          </button>
        </div>
      </div>

      {/* Hero Секция с эффектом слайдера слева-направо */}
      <section id="hero" className="relative h-screen w-full bg-stone-950 overflow-hidden">
        
        {/* Карусель изображений */}
        <div className="absolute inset-0 w-full h-full">
          {heroImages.map((src, idx) => {
            let zIndex = 0;
            let clipPath = 'inset(0 100% 0 0)'; 
            let transition = '';

            if (idx === heroIndices.current) {
              zIndex = 20;
              clipPath = 'inset(0 0 0 0)';
              transition = 'clip-path 1.5s cubic-bezier(0.77, 0, 0.175, 1)';
            } else if (idx === heroIndices.prev) {
              zIndex = 10;
              clipPath = 'inset(0 0 0 0)';
              transition = 'none';
            }

            return (
              <div
                key={idx}
                className="absolute inset-0 w-full h-full"
                style={{ zIndex, clipPath, transition }}
              >
                <div
                  className="absolute inset-0 w-full h-full scale-105 will-change-transform"
                  style={{
                    transform: 'scale(1.05)',
                    backgroundImage: `url(${src})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                  }}
                />
              </div>
            );
          })}
        </div>

        <div className="absolute inset-0 bg-gradient-to-b from-stone-900/60 via-stone-900/30 to-stone-900/80 z-30" />
        
        <div className="relative z-40 h-full max-w-7xl mx-auto px-6 md:px-12 flex flex-col justify-end pb-20 sm:pb-24 md:pb-32">
          <Reveal isReady={appReady} delay={200}>
            <div className="flex items-center gap-4 mb-6">
              <div className="h-[1px] w-12 bg-white"></div>
              <span className="text-white text-xs font-bold tracking-[0.2em] uppercase">Будущее строительства</span>
            </div>
          </Reveal>
          
          <Reveal isReady={appReady} delay={400}>
            <h1 className="max-w-4xl text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-light bronze-text-light tracking-tighter leading-[1.1] mb-6 sm:mb-8">
              Архитектурная чистота.<br />
              <span className="font-medium text-transparent bg-clip-text bg-gradient-to-r from-[#f8d5a6] to-white/60">Инженерия на века.</span>
            </h1>
          </Reveal>

          <Reveal isReady={appReady} delay={600}>
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6">
              <button onClick={(e) => scrollToSection(e, 'technology')} className="flex w-full items-center justify-center gap-2 bg-white px-8 py-4 text-sm font-medium text-stone-900 hover:bg-stone-100 transition-colors group sm:w-auto">
                Изучить технологию SCIP
                <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
              </button>
            </div>
          </Reveal>
        </div>
        
        <div className={`absolute bottom-10 right-6 md:right-12 z-40 flex gap-3 items-center transition-opacity duration-1000 ${appReady ? 'opacity-100' : 'opacity-0'}`}>
          {heroImages.map((_, idx) => (
            <button
              key={idx}
              onClick={() => handleManualSlide(idx)}
              className="h-[3px] transition-all duration-500 rounded-full"
              aria-label={`Перейти к слайду ${idx + 1}`}
              style={{
                width: idx === heroIndices.current ? '32px' : '16px',
                backgroundColor: idx === heroIndices.current ? '#ffffff' : 'rgba(255,255,255,0.3)',
                cursor: 'pointer'
              }}
            />
          ))}
        </div>

        <div className={`absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce text-white/50 cursor-pointer z-40 transition-opacity duration-1000 ${appReady ? 'opacity-100' : 'opacity-0'}`} onClick={(e) => scrollToSection(e, 'vision')}>
          <ChevronDown size={24} />
        </div>
      </section>

      {/* Секция Видение */}
      <HeritageSection />

      <section id="vision" className="py-32 md:py-48 bg-stone-50 relative">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-8">
            <div className="lg:col-span-5">
              <Reveal>
                <h2 className="text-3xl md:text-5xl font-light tracking-tighter bronze-text leading-[1.18] pt-[0.06em] pb-[0.16em] overflow-visible">
                  Мы не просто строим дома.<br />
                  <span className="font-medium">Мы создаем устойчивые убежища.</span>
                </h2>
              </Reveal>
            </div>
            <div className="lg:col-span-6 lg:col-start-7 text-stone-600 text-lg leading-relaxed flex flex-col gap-8">
              <Reveal delay={200}>
                <p>
                  SANTILLI представляет собой сдвиг парадигмы в развитии недвижимости. Объединяя высококлассный архитектурный дизайн с передовой технологией структурных изоляционных панелей (SCIP), мы создаем жилые пространства, которые эстетически великолепны и структурно неуязвимы.
                </p>
              </Reveal>
              <Reveal delay={400}>
                <p>
                  Наша методология устраняет компромиссы традиционного строительства. Мы предлагаем пространства с глубокой теплоэффективностью, абсолютной акустической тишиной и устойчивостью к самым экстремальным условиям окружающей среды — и все это при сокращении сроков строительства до 40%.
                </p>
              </Reveal>
              <Reveal delay={600}>
                 <div className="flex items-center gap-4 text-stone-900 font-medium cursor-pointer group w-max">
                   <span>Читать наш манифест</span>
                   <div className="w-8 h-[1px] bg-stone-900 transition-all duration-300 group-hover:w-12"></div>
                 </div>
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      {/* Демонстрация Технологии */}
      <section className="relative overflow-hidden bg-stone-950 text-stone-900">
        <div className="absolute inset-0">
          <div
            className="absolute inset-x-0 -top-24 -bottom-24 scale-[1.08] will-change-transform"
            style={{
              transform: isMobile ? 'scale(1.08)' : 'translateY(var(--technology-parallax)) scale(1.08)',
              backgroundImage: 'url(/image/dom2.webp)',
              backgroundSize: 'cover',
              backgroundPosition: 'center'
            }}
          />
          <div className="absolute inset-0 bg-[linear-gradient(115deg,rgba(12,10,9,0.92)_10%,rgba(28,25,23,0.78)_45%,rgba(28,25,23,0.42)_100%)]" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12 py-32 md:py-40">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-10 items-end">
            <div className="lg:col-span-7">
              <Reveal>
                <div className="text-xs font-bold tracking-[0.2em] text-stone-300 uppercase mb-4">Старт проекта</div>
                <h2 className="text-4xl md:text-6xl font-light tracking-tighter text-white leading-[1.05] mb-6">
                  Первичный контакт
                </h2>
                <p className="max-w-2xl text-lg text-stone-200 leading-relaxed">
                  Первая встреча дает клиенту ясность: мы обсуждаем задачу, показываем близкие по духу дома, сравниваем CLT и SCIP и задаем честный диапазон бюджета.
                </p>
              </Reveal>

              <Reveal delay={150}>
                <p className="mt-8 max-w-2xl border-l border-white/30 pl-6 text-sm uppercase tracking-[0.16em] text-stone-200/90">
                  Пустых эскизов до понимания участка и реальной задачи мы не делаем.
                </p>
              </Reveal>
            </div>

            <div className="lg:col-span-4 lg:col-start-9">
              <div className="grid gap-4" style={{ overflowAnchor: 'none' }}>
                {contactHighlights.map((item, idx) => (
                  <Reveal key={item.title} delay={idx * 120}>
                    <button
                      type="button"
                      onClick={() => toggleBrief(`contact-${idx}`)}
                      aria-expanded={Boolean(activeBriefs[`contact-${idx}`])}
                      className="group w-full border border-white/10 bg-white/5 p-6 text-left backdrop-blur-md transition-all duration-500 hover:bg-white/10 hover:border-white/20"
                    >
                      <div className="flex items-start justify-between gap-4">
                        <div className="flex-1 pr-3">
                          <div className="text-xs font-bold tracking-[0.18em] text-stone-300 uppercase mb-3">
                            {String(idx + 1).padStart(2, '0')}
                          </div>
                          <h3 className="text-xl font-medium leading-snug text-white">{item.title}</h3>
                        </div>
                        <ChevronDown size={16} className={`mt-1 shrink-0 text-stone-300 transition-transform duration-300 ${activeBriefs[`contact-${idx}`] ? 'rotate-180' : ''}`} />
                      </div>
                      {renderBrief(`contact-${idx}`, item.desc, 'dark')}
                    </button>
                  </Reveal>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-32 bg-stone-50 relative overflow-hidden border-b border-stone-200">
        <div className="absolute -top-20 right-0 h-[420px] w-[420px] rounded-full bg-stone-200/50 blur-3xl opacity-70" />
        <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-14 lg:gap-8">
            <div className="lg:col-span-5">
              <Reveal>
                <div className="text-xs font-bold tracking-[0.2em] text-stone-400 uppercase mb-4">Исходные данные</div>
                <h2 className="text-4xl md:text-5xl font-light tracking-tighter bronze-text leading-[1.18] pt-[0.06em] pb-[0.16em] overflow-visible mb-6">
                  Выезд на участок и изыскания
                </h2>
                <p className="text-lg text-stone-600 leading-relaxed">
                  Мы изучаем участок лично, потому что настоящее проектирование начинается не с плана из архива, а с живого понимания места.
                </p>
              </Reveal>

              <Reveal delay={180}>
                <div className="mt-10 bg-stone-900 text-stone-50 p-8 md:p-10">
                  <div className="text-xs font-bold tracking-[0.18em] text-stone-400 uppercase mb-3">Важно</div>
                  <p className="text-2xl font-light leading-tight">
                    Кадастрового плана недостаточно для настоящего проектирования.
                  </p>
                </div>
              </Reveal>
            </div>

            <div className="lg:col-span-6 lg:col-start-7 grid gap-4">
              {siteInsights.map((item, idx) => (
                <Reveal key={item.title} delay={idx * 120}>
                  <button
                    type="button"
                    onClick={() => toggleBrief(`site-${idx}`)}
                    aria-expanded={Boolean(activeBriefs[`site-${idx}`])}
                    className="group w-full border border-stone-200 bg-white p-6 text-left backdrop-blur-md transition-all duration-500 hover:bg-stone-50 hover:border-stone-300 md:p-7"
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex-1 pr-3">
                        <div className="text-xs font-bold tracking-[0.18em] text-stone-400 uppercase mb-3">
                          {String(idx + 1).padStart(2, '0')}
                        </div>
                        <h3 className="text-xl font-medium leading-snug text-stone-900">{item.title}</h3>
                      </div>
                      <ChevronDown size={16} className={`mt-1 shrink-0 text-stone-400 transition-transform duration-300 ${activeBriefs[`site-${idx}`] ? 'rotate-180' : ''}`} />
                    </div>
                    {renderBrief(`site-${idx}`, item.desc)}
                  </button>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="py-32 bg-white relative overflow-hidden border-b border-stone-200">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8 items-start">
            <div className="lg:col-span-5">
              <Reveal>
                <div className="text-xs font-bold tracking-[0.2em] text-stone-400 uppercase mb-4">Концепция</div>
                <h2 className="text-4xl md:text-5xl font-light tracking-tighter bronze-text leading-[1.18] pt-[0.06em] pb-[0.16em] overflow-visible mb-6">
                  Эскиз с привязкой к участку
                </h2>
                <p className="text-lg text-stone-600 leading-relaxed">
                  Концепция появляется только после реальных данных. Дом сразу проектируется под конкретный рельеф, ориентацию, ограничения участка и логику основания.
                </p>
              </Reveal>
            </div>

            <div className="lg:col-span-7 grid gap-6">
              <div className="grid gap-4">
                {conceptPoints.map((point, idx) => (
                  <Reveal key={point.title} delay={idx * 100}>
                    <button
                      type="button"
                      onClick={() => toggleBrief(`concept-${idx}`)}
                      aria-expanded={Boolean(activeBriefs[`concept-${idx}`])}
                      className="w-full border border-stone-200 bg-stone-50 px-5 py-6 text-left transition-colors duration-300 hover:bg-stone-100"
                    >
                      <div className="flex items-start justify-between gap-4">
                        <p className="pr-3 text-sm font-medium leading-relaxed text-stone-700">{point.title}</p>
                        <ChevronDown size={16} className={`mt-0.5 shrink-0 text-stone-400 transition-transform duration-300 ${activeBriefs[`concept-${idx}`] ? 'rotate-180' : ''}`} />
                      </div>
                      {renderBrief(`concept-${idx}`, point.desc)}
                    </button>
                  </Reveal>
                ))}
              </div>

              <Reveal delay={220}>
                <div className="border border-stone-200 bg-stone-50 p-8 md:p-10">
                  <div className="text-xs font-bold tracking-[0.2em] text-stone-400 uppercase mb-4">Проектная база</div>
                  <h3 className="text-3xl md:text-4xl font-light tracking-tight text-stone-900 mb-5">
                    Архитектура и конструктив
                  </h3>
                  <p className="max-w-3xl text-lg text-stone-600 leading-relaxed mb-8">
                    Здесь образ дома превращается в точную систему строительства. У CLT и SCIP разная конструктивная логика, но в обоих случаях она доводится до ясной инженерной основы.
                  </p>
                  <div className="grid gap-4">
                    {architectureCards.map((item, idx) => (
                      <button
                        key={item.title}
                        type="button"
                        onClick={() => toggleBrief(`architecture-${idx}`)}
                        aria-expanded={Boolean(activeBriefs[`architecture-${idx}`])}
                        className="w-full border border-stone-200 bg-white p-5 text-left backdrop-blur-md transition-all duration-500 hover:bg-stone-50 hover:border-stone-300"
                      >
                        <div className="flex items-start justify-between gap-4">
                          <div className="flex-1 pr-3 text-xs font-bold tracking-[0.18em] text-stone-400 uppercase">{item.title}</div>
                          <ChevronDown size={16} className={`shrink-0 text-stone-400 transition-transform duration-300 ${activeBriefs[`architecture-${idx}`] ? 'rotate-180' : ''}`} />
                        </div>
                        {renderBrief(`architecture-${idx}`, item.desc)}
                      </button>
                    ))}
                  </div>
                </div>
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      <section className="py-32 bg-stone-900 text-stone-50 relative overflow-hidden">
        <div className="absolute -top-20 left-0 h-[420px] w-[420px] rounded-full bg-[#b88a58]/15 blur-3xl" />
        <div className="absolute -bottom-20 right-0 h-[420px] w-[420px] rounded-full bg-white/5 blur-3xl" />
        <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-6">
              <Reveal>
                <div className="text-xs font-bold tracking-[0.2em] text-stone-400 uppercase mb-4">Ключевой принцип</div>
                <h2 className="text-4xl md:text-6xl font-light tracking-tighter text-white leading-[1.05] mb-6">
                  Дизайн до инженерии
                </h2>
                <p className="max-w-2xl text-lg text-stone-300 leading-relaxed">
                  Интерьер и экстерьер мы разрабатываем раньше инженерных систем, чтобы розетки, свет, воздух, вода и тепло следовали за реальной жизнью дома, а не спорили с ней.
                </p>
              </Reveal>

              <Reveal delay={180}>
                <p className="mt-8 max-w-2xl border-l border-white/20 pl-6 text-sm uppercase tracking-[0.16em] text-stone-300">
                  Без дизайн-проекта инженерия превращается в догадки.
                </p>
              </Reveal>
            </div>

            <div className="lg:col-span-5 lg:col-start-8">
              <Reveal delay={220}>
                <div className="relative">
                  <div className="absolute -inset-4 border border-white/10" />
                  <div className="relative space-y-4 border border-white/10 bg-white/5 p-8 backdrop-blur-md">
                    {designLayers.map((item, idx) => (
                      <button
                        key={item.title}
                        type="button"
                        onClick={() => toggleBrief(`design-${idx}`)}
                        aria-expanded={Boolean(activeBriefs[`design-${idx}`])}
                        className="w-full border-b border-white/10 pb-4 text-left last:border-b-0 last:pb-0"
                      >
                        <div className="flex items-start gap-4">
                          <div className="mt-1 text-xs font-bold tracking-[0.18em] text-stone-400 uppercase">
                            {String(idx + 1).padStart(2, '0')}
                          </div>
                          <div className="flex-1">
                            <div className="flex items-start justify-between gap-4">
                              <p className="pr-3 text-lg leading-relaxed text-stone-200">{item.title}</p>
                              <ChevronDown size={16} className={`mt-1 shrink-0 text-stone-300 transition-transform duration-300 ${activeBriefs[`design-${idx}`] ? 'rotate-180' : ''}`} />
                            </div>
                            {renderBrief(`design-${idx}`, item.desc, 'dark')}
                          </div>
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      <section id="technology" className="py-32 bg-white relative overflow-hidden border-y border-stone-200">
        <div className="absolute top-0 right-0 w-1/2 h-full bg-stone-50/50 -z-10 hidden lg:block"></div>
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          
          <div className="mb-24 md:text-center max-w-3xl mx-auto">
            <Reveal>
              <div className="text-xs font-bold tracking-[0.2em] text-stone-400 uppercase mb-4">Ключевая технология</div>
              <h2 className="text-4xl md:text-6xl font-light tracking-tighter bronze-text leading-[1.18] pt-[0.06em] pb-[0.16em] overflow-visible mb-6">
                Анатомия <span className="font-medium">совершенства.</span>
              </h2>
              <p className="text-stone-500 text-lg">
                SCIP (Структурные Изоляционные Панели) — это передовая строительная система, заменяющая традиционный каркас и кладку. Она образует монолитную, неразрушимую оболочку, которая дышит, изолирует и защищает.
              </p>
            </Reveal>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            
            <div className="order-2 lg:order-1 relative">
              <Reveal direction="none">
                <ScipVisualization />
              </Reveal>
              <Reveal delay={180}>
                <div className="relative z-10 mx-auto -mt-2 w-full max-w-[300px] sm:max-w-[340px] lg:ml-28 lg:translate-x-[20px]">
                  <div className="float-card group border border-stone-200/90 bg-white/85 p-4 shadow-[0_30px_80px_rgba(28,25,23,0.12)] backdrop-blur-md transition-shadow duration-700 hover:shadow-[0_40px_90px_rgba(28,25,23,0.16)]">
                    <div className="mb-3 flex items-center gap-4">
                      <span className="text-[10px] font-bold tracking-[0.2em] text-stone-400 uppercase whitespace-nowrap">
                        Сечение SCIP
                      </span>
                      <div className="h-px flex-1 bg-gradient-to-r from-stone-200 to-transparent" />
                    </div>
                    <div className="overflow-hidden border border-stone-100 bg-stone-50">
                      <img
                        src="/image/i222.webp"
                        alt="Сечение SCIP панели"
                        loading="lazy"
                        decoding="async"
                        className="w-full bg-white object-contain transition-transform duration-700 group-hover:scale-[1.015]"
                      />
                    </div>
                    <p className="mt-3 text-sm leading-relaxed text-stone-500">
                      Реальный срез панели показывает логику слоев, армирования и изоляции в той последовательности, в которой система работает в доме.
                    </p>
                  </div>
                </div>
              </Reveal>
            </div>

            <div className="order-1 lg:order-2 flex flex-col gap-12">
              {[
                { 
                  icon: <Wind size={24} strokeWidth={1.5} />, 
                  title: 'Пассивная теплоэффективность', 
                  desc: 'Сплошное ядро из EPS устраняет тепловые мосты, кардинально снижая энергопотребление на отопление и охлаждение. Испытайте истинный климат-контроль.' 
                },
                { 
                  icon: <Shield size={24} strokeWidth={1.5} />, 
                  title: 'Монолитная устойчивость', 
                  desc: 'Двойные слои железобетона создают структуру, изначально устойчивую к сейсмической активности, ураганным ветрам и огню. Крепость, замаскированная под искусство.' 
                },
                { 
                  icon: <Clock size={24} strokeWidth={1.5} />, 
                  title: 'Ускоренное строительство', 
                  desc: 'Легкая панельная система позволяет проводить быструю сборку перед нанесением бетона, значительно сокращая сроки проекта без ущерба для качества.' 
                }
              ].map((feature, idx) => (
                <Reveal key={idx} delay={idx * 200} direction="left">
                  <div className="flex gap-6 group">
                    <div className="mt-1 w-12 h-12 rounded-full bg-stone-100 flex items-center justify-center text-stone-600 transition-colors duration-500 group-hover:bg-stone-900 group-hover:text-white shrink-0">
                      {feature.icon}
                    </div>
                    <div>
                      <h3 className="text-xl font-medium text-stone-900 mb-3">{feature.title}</h3>
                      <p className="text-stone-500 leading-relaxed">
                        {feature.desc}
                      </p>
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>

          </div>
        </div>
      </section>

      {/* Избранные проекты */}
      <section className="py-32 bg-stone-50 relative overflow-hidden border-b border-stone-200">
        <div className="absolute top-0 left-0 h-[360px] w-[360px] rounded-full bg-stone-200/40 blur-3xl" />
        <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8 mb-20">
            <div className="lg:col-span-4">
              <Reveal>
                <div className="text-xs font-bold tracking-[0.2em] text-stone-400 uppercase mb-4">Системы дома</div>
                <h2 className="text-4xl md:text-5xl font-light tracking-tighter bronze-text leading-[1.18] pt-[0.06em] pb-[0.16em] overflow-visible mb-6">
                  Инженерное проектирование
                </h2>
                <p className="text-lg text-stone-600 leading-relaxed">
                  После утвержденного дизайна инженерия встает на свое место: точно, заранее и без импровизации на площадке.
                </p>
              </Reveal>
            </div>

            <div className="lg:col-span-8 grid gap-4">
              {engineeringCards.map((item, idx) => (
                <Reveal key={item.title} delay={idx * 110}>
                  <button
                    type="button"
                    onClick={() => toggleBrief(`engineering-${idx}`)}
                    aria-expanded={Boolean(activeBriefs[`engineering-${idx}`])}
                    className="group w-full border border-stone-200 bg-white p-6 text-left backdrop-blur-md transition-all duration-500 hover:bg-stone-50 hover:border-stone-300 md:p-7"
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex-1 pr-3">
                        <div className="text-xs font-bold tracking-[0.18em] text-stone-400 uppercase mb-3">
                          {String(idx + 1).padStart(2, '0')}
                        </div>
                        <h3 className="text-xl font-medium leading-snug text-stone-900">{item.title}</h3>
                      </div>
                      <ChevronDown size={16} className={`mt-1 shrink-0 text-stone-400 transition-transform duration-300 ${activeBriefs[`engineering-${idx}`] ? 'rotate-180' : ''}`} />
                    </div>
                    {renderBrief(`engineering-${idx}`, item.desc)}
                  </button>
                </Reveal>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8 items-start">
            <div className="lg:col-span-4">
              <Reveal>
                <div className="text-xs font-bold tracking-[0.2em] text-stone-400 uppercase mb-4">Финансовая ясность</div>
                <h2 className="text-4xl md:text-5xl font-light tracking-tighter bronze-text leading-[1.18] pt-[0.06em] pb-[0.16em] overflow-visible mb-6">
                  Смета и защита бюджета
                </h2>
                <p className="text-lg text-stone-600 leading-relaxed">
                  Когда архитектура, дизайн и инженерия согласованы, бюджет становится предсказуемым и защищенным.
                </p>
              </Reveal>
            </div>

            <div className="lg:col-span-8 space-y-4">
              {budgetCards.map((item, idx) => (
                <Reveal key={item.title} delay={idx * 100}>
                  <button
                    type="button"
                    onClick={() => toggleBrief(`budget-${idx}`)}
                    aria-expanded={Boolean(activeBriefs[`budget-${idx}`])}
                    className="group w-full border border-stone-200 bg-white px-6 py-5 text-left transition-all duration-500 hover:border-stone-300 hover:shadow-[0_18px_50px_rgba(28,25,23,0.06)]"
                  >
                    <div className="flex flex-col gap-3 md:flex-row md:items-start md:justify-between">
                      <div className="flex-1 pr-3">
                        <h3 className="text-xl font-medium leading-snug text-stone-900">{item.title}</h3>
                      </div>
                      <ChevronDown size={16} className={`mt-1 shrink-0 text-stone-400 transition-transform duration-300 ${activeBriefs[`budget-${idx}`] ? 'rotate-180' : ''}`} />
                    </div>
                    {renderBrief(`budget-${idx}`, item.desc)}
                  </button>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="py-32 bg-stone-950 text-stone-50 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(255,255,255,0.08),transparent_38%)]" />
        <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8 items-start">
            <div className="lg:col-span-5">
              <Reveal>
                <div className="text-xs font-bold tracking-[0.2em] text-stone-400 uppercase mb-4">Контроль реализации</div>
                <h2 className="text-4xl md:text-6xl font-light tracking-tighter text-white leading-[1.05] mb-6">
                  Авторский и технический надзор
                </h2>
                <p className="max-w-2xl text-lg text-stone-300 leading-relaxed">
                  Во время строительства мы сопровождаем исполнение, проверяем скрытые работы и удерживаем качество на уровне проекта, а не на уровне случайности.
                </p>
              </Reveal>
            </div>

            <div className="lg:col-span-6 lg:col-start-7 grid gap-4">
              {supervisionCards.map((item, idx) => (
                <Reveal key={item.title} delay={idx * 120}>
                  <button
                    type="button"
                    onClick={() => toggleBrief(`supervision-${idx}`)}
                    aria-expanded={Boolean(activeBriefs[`supervision-${idx}`])}
                    className="w-full border border-white/10 bg-white/5 p-6 text-left backdrop-blur-sm md:p-7 transition-all duration-500 hover:bg-white/[0.07]"
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex-1 pr-3">
                        <div className="text-xs font-bold tracking-[0.18em] text-stone-400 uppercase mb-3">
                          {String(idx + 1).padStart(2, '0')}
                        </div>
                        <h3 className="text-xl font-medium leading-snug text-white">{item.title}</h3>
                      </div>
                      <ChevronDown size={16} className={`mt-1 shrink-0 text-stone-300 transition-transform duration-300 ${activeBriefs[`supervision-${idx}`] ? 'rotate-180' : ''}`} />
                    </div>
                    {renderBrief(`supervision-${idx}`, item.desc, 'dark')}
                  </button>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="relative overflow-hidden bg-stone-950 text-stone-50">
        <div className="absolute inset-0">
          <img
            src="/image/dom7.webp"
            alt=""
            className="absolute inset-0 h-full w-full object-cover scale-[1.08] will-change-transform"
            style={{ transform: isMobile ? 'scale(1.08)' : 'translateY(var(--construction-parallax)) scale(1.08)' }}
          />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12 py-20 sm:py-24 md:py-40">
          <div className="max-w-[320px] sm:max-w-3xl w-full">
            <Reveal>
              <div className="max-w-[320px] sm:max-w-2xl border border-white/30 bg-white/60 px-5 py-6 backdrop-blur-md sm:px-8 sm:py-9">
                <div className="text-xs font-bold tracking-[0.2em] text-stone-900 uppercase mb-4">Реализация</div>
                <h2 className="text-2xl sm:text-4xl md:text-6xl font-light tracking-tighter text-stone-950 leading-[1.08] break-words mb-5 sm:mb-6">
                  Строительство и монтаж
                </h2>
                <p className="text-sm sm:text-lg text-stone-900 leading-relaxed break-words">
                  Реализация идет по ясной последовательности: фундамент, сборка CLT или SCIP, кровля, фасады, инженерия, отделка и точное доведение дома до готовности.
                </p>
              </div>
            </Reveal>

            <div className="mt-8 sm:mt-10 grid max-w-[320px] sm:max-w-3xl grid-cols-1 gap-2 sm:gap-3" style={{ overflowAnchor: 'none' }}>
              {constructionStages.map((stage, idx) => (
                <Reveal key={stage.title} delay={idx * 90}>
                  <button
                    type="button"
                    onClick={() => toggleBrief(`construction-${idx}`)}
                    aria-expanded={Boolean(activeBriefs[`construction-${idx}`])}
                    className="h-full w-full border border-white/30 bg-white/55 px-4 py-3 text-left text-sm font-medium text-stone-900 backdrop-blur-md transition-colors duration-300 hover:bg-white/70 sm:px-5"
                  >
                    <div className="flex items-center justify-between gap-3">
                      <span className="pr-3 leading-snug">{stage.title}</span>
                      <ChevronDown size={14} className={`transition-transform duration-300 ${activeBriefs[`construction-${idx}`] ? 'rotate-180' : ''}`} />
                    </div>
                    {renderBrief(`construction-${idx}`, stage.desc, 'light')}
                  </button>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section id="projects" className="py-32 bg-stone-900 text-stone-50 relative min-h-[100vh] md:min-h-0 flex items-center md:block overflow-hidden">
        {isMobilePortrait ? (
          <div className="absolute inset-0 w-full h-full flex flex-col items-center justify-center">
            <img
              src="https://images.unsplash.com/photo-1512917774080-9991f1c4c750?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80"
              alt="Project Background"
              className="absolute inset-0 w-full h-full object-cover opacity-20"
            />
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.58)_0%,rgba(255,255,255,0.32)_36%,rgba(245,245,244,0.16)_64%,rgba(28,25,23,0.06)_100%)] backdrop-blur-sm"></div>

            <div className="relative z-10 flex max-w-sm flex-col items-center justify-center p-8 text-center">
              <div className="relative mb-12">
                <div className="absolute inset-x-6 inset-y-5 rounded-full bg-white/24 blur-2xl" />
                <img
                  src="image/logo2.webp"
                  alt="Brand Logo2"
                  className="relative w-52 opacity-90 drop-shadow-[0_18px_40px_rgba(255,255,255,0.18)]"
                />
              </div>
              <div className="relative mb-6 flex h-24 w-24 items-center justify-center">
                <Smartphone size={56} strokeWidth={1} className="absolute text-[#f8d5a6]" style={{ animation: 'phoneRotate 2.5s ease-in-out infinite' }} />
              </div>
              <h3 className="bronze-text-light mb-4 text-2xl font-light uppercase tracking-widest">
                Переверните экран
              </h3>
              <p className="text-sm font-light leading-relaxed text-stone-400">
                Для просмотра избранных работ переведите устройство в горизонтальное положение.
              </p>
            </div>
          </div>
        ) : (
          <div className={`max-w-7xl mx-auto px-6 md:px-12 w-full py-16 md:py-0 ${isMobile && !isMobilePortrait ? 'animate-projects-reveal' : ''}`}>
            <div className="flex flex-col md:flex-row justify-between items-end gap-8 mb-24">
              <Reveal>
                <h2 className="text-4xl md:text-6xl font-light tracking-tighter bronze-text-light">
                  Избранные <span className="font-medium">Работы</span>
                </h2>
              </Reveal>
              <Reveal delay={200}>
                <button className="text-sm font-medium border border-stone-700 px-6 py-3 hover:bg-stone-50 hover:text-stone-900 transition-colors duration-300">
                  Смотреть всё портфолио
                </button>
              </Reveal>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
              <div className="md:col-span-2 group cursor-pointer">
                <Reveal>
                  <div className="relative overflow-hidden aspect-[21/9] bg-stone-800">
                    <img 
                      src="/image/dom1.webp" 
                      alt="Современная Вилла" 
                      className="object-cover w-full h-full transition-transform duration-1000 ease-out group-hover:scale-105 opacity-80 group-hover:opacity-100"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-stone-900/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                    <div className="absolute bottom-8 left-8 right-8 flex justify-between items-end translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500 ease-out">
                      <div>
                        <h3 className="text-3xl font-medium mb-2 bronze-text-light">Вилла Этель</h3>
                        <p className="text-stone-300 tracking-wider text-sm">СТОКГОЛЬМСКИЙ АРХИПЕЛАГ</p>
                      </div>
                      <div className="w-12 h-12 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center">
                        <ArrowRight size={20} />
                      </div>
                    </div>
                  </div>
                </Reveal>
              </div>

              <div className="group cursor-pointer">
                <Reveal delay={200}>
                  <div className="relative overflow-hidden aspect-[4/5] bg-stone-800">
                    <img 
                      src="/image/dom2.webp" 
                      alt="Прибрежный Дом" 
                      className="object-cover w-full h-full transition-transform duration-1000 ease-out group-hover:scale-105 opacity-80 group-hover:opacity-100"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-stone-900/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                    <div className="absolute bottom-8 left-8 right-8 flex justify-between items-end translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500 ease-out">
                      <div>
                        <h3 className="text-2xl font-medium mb-1 bronze-text-light">Дом Горизонта</h3>
                        <p className="text-stone-300 tracking-wider text-xs">МАЛИБУ, КАЛИФОРНИЯ</p>
                      </div>
                    </div>
                  </div>
                </Reveal>
              </div>

              <div className="group cursor-pointer">
                <Reveal delay={400}>
                  <div className="relative overflow-hidden aspect-[4/5] bg-stone-800">
                    <img 
                      src="/image/dom4.webp" 
                      alt="Урбанистический Минимализм" 
                      className="object-cover w-full h-full transition-transform duration-1000 ease-out group-hover:scale-105 opacity-80 group-hover:opacity-100"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-stone-900/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                    <div className="absolute bottom-8 left-8 right-8 flex justify-between items-end translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500 ease-out">
                      <div>
                        <h3 className="text-2xl font-medium mb-1 bronze-text-light">Павильон Крест Вью</h3>
                        <p className="text-stone-300 tracking-wider text-xs">АСПЕН, КОЛОРАДО</p>
                      </div>
                    </div>
                  </div>
                </Reveal>
              </div>
            </div>
          </div>
        )}
      </section>

      {/* Статистика / Доверие */}
      <section className="py-24 bg-stone-100 border-b border-stone-200">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-12 divide-x divide-stone-200">
            {[
              { label: 'Экономия энергии', value: 'До 60%' },
              { label: 'Срок службы', value: '100+ Лет' },
              { label: 'Время сборки', value: '-40%' },
              { label: 'Звукоизоляция', value: 'STC 60+' }
            ].map((stat, idx) => (
              <div key={idx} className="flex flex-col items-center text-center px-4">
                <Reveal delay={idx * 100}>
                  <div className="text-3xl md:text-5xl font-light text-stone-900 mb-2">{stat.value}</div>
                  <div className="text-xs font-bold tracking-[0.1em] text-stone-500 uppercase">{stat.label}</div>
                </Reveal>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Секция (Студия) */}
      <section className="py-32 bg-white relative overflow-hidden border-b border-stone-200">
        <div className="absolute top-0 right-0 h-[420px] w-[420px] rounded-full bg-stone-100 blur-3xl opacity-80" />
        <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8 items-start">
            <div className="lg:col-span-4">
              <Reveal>
                <div className="text-xs font-bold tracking-[0.2em] text-stone-400 uppercase mb-4">Передача объекта</div>
                <h2 className="text-4xl md:text-5xl font-light tracking-tighter bronze-text leading-[1.18] pt-[0.06em] pb-[0.16em] overflow-visible mb-6">
                  Сдача объекта и паспорт дома
                </h2>
                <p className="text-lg text-stone-600 leading-relaxed">
                  Клиент получает не только готовый дом, но и полный комплект данных для спокойной эксплуатации, сервиса и дальнейшей истории объекта.
                </p>
              </Reveal>
            </div>

            <div className="lg:col-span-8 grid gap-4">
              {handoverDocs.map((item, idx) => (
                <Reveal key={item.title} delay={idx * 110}>
                  <button
                    type="button"
                    onClick={() => toggleBrief(`handover-${idx}`)}
                    aria-expanded={Boolean(activeBriefs[`handover-${idx}`])}
                    className="group w-full border border-stone-200 bg-stone-50 p-6 text-left backdrop-blur-md transition-all duration-500 hover:bg-white hover:border-stone-300 md:p-7"
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex-1 pr-3">
                        <div className="text-xs font-bold tracking-[0.18em] text-stone-400 uppercase mb-3">
                          {String(idx + 1).padStart(2, '0')}
                        </div>
                        <p className="text-lg leading-relaxed text-stone-700">{item.title}</p>
                      </div>
                      <ChevronDown size={16} className={`mt-1 shrink-0 text-stone-400 transition-transform duration-300 ${activeBriefs[`handover-${idx}`] ? 'rotate-180' : ''}`} />
                    </div>
                    {renderBrief(`handover-${idx}`, item.desc)}
                  </button>
                </Reveal>
              ))}
            </div>
          </div>

          <div className="mt-20 border border-stone-200 bg-stone-50 p-8 md:p-12">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              <div className="lg:col-span-5">
                <Reveal>
                  <div className="text-xs font-bold tracking-[0.2em] text-stone-400 uppercase mb-4">После сдачи</div>
                  <h3 className="text-3xl md:text-4xl font-light tracking-tight text-stone-900 mb-4">
                    Гарантия и сопровождение
                  </h3>
                  <p className="text-lg text-stone-600 leading-relaxed">
                    Наше участие не заканчивается ключами. Мы остаемся на связи по гарантии, сервисным вопросам и ведем цифровой кабинет владельца с документами и инженерной информацией дома.
                  </p>
                </Reveal>
              </div>

              <div className="lg:col-span-6 lg:col-start-7">
                <Reveal delay={160}>
                  <div className="grid gap-4">
                    {supportCards.map((item, idx) => (
                      <button
                        key={item.title}
                        type="button"
                        onClick={() => toggleBrief(`support-${idx}`)}
                        aria-expanded={Boolean(activeBriefs[`support-${idx}`])}
                        className="w-full border border-stone-200 bg-white p-5 text-left backdrop-blur-md transition-all duration-500 hover:bg-stone-50 hover:border-stone-300"
                      >
                        <div className="flex items-start justify-between gap-4">
                          <div className="flex-1 pr-3 text-xs font-bold tracking-[0.18em] text-stone-400 uppercase">{item.title}</div>
                          <ChevronDown size={16} className={`shrink-0 text-stone-400 transition-transform duration-300 ${activeBriefs[`support-${idx}`] ? 'rotate-180' : ''}`} />
                        </div>
                        {renderBrief(`support-${idx}`, item.desc)}
                      </button>
                    ))}
                  </div>
                </Reveal>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="studio" className="py-32 bg-stone-50 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-stone-200/50 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3 opacity-50"></div>
        <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-stone-200/50 rounded-full blur-3xl translate-y-1/2 -translate-x-1/3 opacity-50"></div>
        
        <div className="max-w-4xl mx-auto px-6 text-center relative z-10">
          <Reveal>
            <h2 className="text-4xl md:text-6xl font-light tracking-tighter bronze-text leading-[1.18] pt-[0.06em] pb-[0.16em] overflow-visible mb-8">
              Готовы построить <span className="font-medium italic">будущее?</span>
            </h2>
            <p className="text-lg text-stone-600 mb-12 max-w-2xl mx-auto">
              Закажите резиденцию от Santilli Architecture и испытайте пересечение высококлассного дизайна и структурной неуязвимости.
            </p>
            <button 
              onClick={() => setIsModalOpen(true)}
              className="bg-stone-900 text-white px-10 py-5 text-sm font-medium hover:bg-stone-800 transition-all duration-300 shadow-2xl shadow-stone-900/20 hover:shadow-stone-900/40 hover:-translate-y-1 inline-flex items-center gap-3 group"
            >
              Назначить частную консультацию
              <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
            </button>
          </Reveal>
        </div>
      </section>

      {/* Подвал */}
      <footer className="bg-stone-950 text-stone-400 py-20 border-t border-stone-900">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-16 mb-16">
            <div className="col-span-1 md:col-span-2">
              <div className="flex items-center gap-2 mb-8 cursor-pointer" onClick={(e) => scrollToSection(e, 'hero')}>
                <div className="w-6 h-6 bg-white flex items-center justify-center">
                  <div className="w-2 h-2 border border-stone-900"></div>
                </div>
                <span className="text-lg font-medium tracking-tight text-white">SANTILLI</span>
              </div>
              <p className="max-w-sm text-stone-500 leading-relaxed">
                Открываем будущее элитной недвижимости с помощью передовой технологии SCIP и бескомпромиссного архитектурного дизайна.
              </p>
            </div>
            
            <div>
              <h4 className="text-white font-medium mb-6 tracking-wide text-sm">Компания</h4>
              <ul className="space-y-4 text-sm">
                <li><a href="#vision" onClick={(e) => scrollToSection(e, 'vision')} className="hover:text-white transition-colors">Видение и Студия</a></li>
                <li><a href="#technology" onClick={(e) => scrollToSection(e, 'technology')} className="hover:text-white transition-colors">Технология SCIP</a></li>
                <li><a href="#projects" onClick={(e) => scrollToSection(e, 'projects')} className="hover:text-white transition-colors">Избранные Работы</a></li>
                <li><a href="#studio" onClick={(e) => scrollToSection(e, 'studio')} className="hover:text-white transition-colors">Устойчивость</a></li>
              </ul>
            </div>

            <div>
              <h4 className="text-white font-medium mb-6 tracking-wide text-sm">Связь</h4>
              <ul className="space-y-4 text-sm">
                <li><a href="#" className="hover:text-white transition-colors">Контакты</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Пресса и Медиа</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Instagram</a></li>
                <li><a href="#" className="hover:text-white transition-colors">LinkedIn</a></li>
              </ul>
            </div>
          </div>

          <div className="flex flex-col md:flex-row justify-between items-center pt-8 border-t border-stone-800 text-xs text-stone-600">
            <p>&copy; 2026 Santilli Architecture. Все права защищены.</p>
            <div className="flex gap-6 mt-4 md:mt-0">
              <a href="#" className="hover:text-white transition-colors">Политика конфиденциальности</a>
              <a href="#" className="hover:text-white transition-colors">Условия использования</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

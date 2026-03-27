import React, { useState, useEffect, useRef } from 'react';
import { Menu, X, ArrowRight, ChevronDown, Wind, Shield, Clock } from 'lucide-react';

// --- ХУКИ И ВСПОМОГАТЕЛЬНЫЕ КОМПОНЕНТЫ ---

const useScroll = () => {
  const [scrollY, setScrollY] = useState(0);
  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  return scrollY;
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
        transition: `all 0.8s cubic-bezier(0.17, 0.55, 0.55, 1) ${delay}ms`,
      }}
    >
      {children}
    </div>
  );
};

// Интерактивная 3D визуализация технологии
const ScipVisualization = () => {
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
};


// --- ГЛАВНОЕ ПРИЛОЖЕНИЕ ---

export default function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const scrollY = useScroll();

  // Состояния для экрана загрузки
  const [isLoading, setIsLoading] = useState(true);
  const [isFadingOut, setIsFadingOut] = useState(false);
  const [appReady, setAppReady] = useState(false);
  
  // Состояние модального окна (Форма консультации)
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Изображения для карусели главного экрана
  const heroImages = [
    'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?ixlib=rb-4.0.3&auto=format&fit=crop&w=2850&q=80',
    'https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?ixlib=rb-4.0.3&auto=format&fit=crop&w=2850&q=80',
    'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?ixlib=rb-4.0.3&auto=format&fit=crop&w=2850&q=80'
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
    if (isModalOpen && !isLoading) {
      document.body.style.overflow = 'hidden';
    } else if (!isLoading) {
      document.body.style.overflow = 'unset';
    }
    
    return () => {
      if (!isLoading) document.body.style.overflow = 'unset';
    };
  }, [isModalOpen, isLoading]);

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
  }, [heroIndices.current, appReady]);

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
    { label: 'Видение', id: 'vision' },
    { label: 'Технологии', id: 'technology' },
    { label: 'Проекты', id: 'projects' },
    { label: 'Студия', id: 'studio' }
  ];

  return (
    <div className="font-sans text-stone-900 bg-stone-50 min-h-screen overflow-x-hidden selection:bg-stone-300 selection:text-stone-900">
      
      {/* Экран загрузки (Прелоадер) */}
      {isLoading && (
        <div 
          className={`fixed inset-0 z-[100] bg-white flex items-center justify-center transition-opacity duration-1000 ease-in-out ${
            isFadingOut ? 'opacity-0 pointer-events-none' : 'opacity-100'
          }`}
        >
          <div className={`transform transition-all duration-[3000ms] ease-out ${isFadingOut ? 'scale-105 blur-sm' : 'scale-100 blur-0'}`}>
            <img 
              src="/public/image/logo.webp" 
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
            <h3 className="text-3xl font-light tracking-tight text-stone-900 mb-3">Частная консультация</h3>
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
      <nav className={`fixed w-full z-50 transition-all duration-500 ${scrollY > 50 ? 'bg-white/80 backdrop-blur-lg py-4' : 'bg-transparent py-6'}`}>
        <div className="max-w-7xl mx-auto px-6 md:px-12 flex justify-between items-center">
          <div className="flex items-center gap-2 cursor-pointer group" onClick={(e) => scrollToSection(e, 'hero')}>
            <div className="w-8 h-8 bg-stone-900 flex items-center justify-center transition-transform duration-500 group-hover:rotate-90">
              <div className="w-3 h-3 border border-white"></div>
            </div>
            <span className={`text-xl font-medium tracking-tight transition-colors duration-500 ${scrollY > 50 ? 'text-stone-900' : 'text-white'}`}>SANTILLI</span>
          </div>
          
          <div className="hidden md:flex items-center gap-10">
            {navItems.map((item) => (
              <a 
                key={item.id} 
                href={`#${item.id}`} 
                onClick={(e) => scrollToSection(e, item.id)}
                className={`text-sm font-medium transition-colors duration-300 hover:text-stone-400 ${scrollY > 50 ? 'text-stone-600 hover:text-stone-900' : 'text-stone-300 hover:text-white'}`}
              >
                {item.label}
              </a>
            ))}
            <button 
              onClick={() => setIsModalOpen(true)}
              className={`text-sm font-medium px-6 py-2.5 transition-all duration-300 flex items-center gap-2 group ${scrollY > 50 ? 'bg-stone-900 text-white hover:bg-stone-800' : 'bg-white text-stone-900 hover:bg-stone-200'}`}
            >
              Связаться
              <ArrowRight size={14} className="transition-transform group-hover:translate-x-1" />
            </button>
          </div>

          <button className={`md:hidden ${scrollY > 50 ? 'text-stone-900' : 'text-white'}`} onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </nav>

      {/* Мобильное меню */}
      <div className={`fixed inset-0 bg-stone-50 z-40 transition-transform duration-500 ease-in-out md:hidden ${isMenuOpen ? 'translate-y-0' : '-translate-y-full'} pt-32 px-6`}>
        <div className="flex flex-col gap-8 text-2xl font-light tracking-tight">
          {navItems.map((item) => (
            <a 
              key={item.id} 
              href={`#${item.id}`} 
              onClick={(e) => scrollToSection(e, item.id)} 
              className="border-b border-stone-200 pb-4 text-stone-900"
            >
              {item.label}
            </a>
          ))}
          <button 
            onClick={() => { setIsMenuOpen(false); setIsModalOpen(true); }}
            className="mt-8 text-sm font-medium bg-stone-900 text-white px-6 py-4 flex items-center justify-center gap-2"
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
                  className="absolute inset-0 w-full h-full scale-105"
                  style={{
                    transform: `translateY(${scrollY * 0.4}px) scale(1.05)`,
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
        
        <div className="relative z-40 h-full max-w-7xl mx-auto px-6 md:px-12 flex flex-col justify-end pb-24 md:pb-32">
          <Reveal isReady={appReady} delay={200}>
            <div className="flex items-center gap-4 mb-6">
              <div className="h-[1px] w-12 bg-white"></div>
              <span className="text-white text-xs font-bold tracking-[0.2em] uppercase">Будущее строительства</span>
            </div>
          </Reveal>
          
          <Reveal isReady={appReady} delay={400}>
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-light text-white tracking-tighter leading-[1.1] mb-8 max-w-4xl">
              Архитектурная чистота.<br />
              <span className="font-medium text-transparent bg-clip-text bg-gradient-to-r from-white to-white/60">Инженерия на века.</span>
            </h1>
          </Reveal>

          <Reveal isReady={appReady} delay={600}>
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6">
              <button onClick={(e) => scrollToSection(e, 'technology')} className="bg-white text-stone-900 px-8 py-4 text-sm font-medium hover:bg-stone-100 transition-colors flex items-center gap-2 group">
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
      <section id="vision" className="py-32 md:py-48 bg-stone-50 relative">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-8">
            <div className="lg:col-span-5">
              <Reveal>
                <h2 className="text-3xl md:text-5xl font-light tracking-tighter text-stone-900 leading-tight">
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
      <section id="technology" className="py-32 bg-white relative overflow-hidden border-y border-stone-200">
        <div className="absolute top-0 right-0 w-1/2 h-full bg-stone-50/50 -z-10 hidden lg:block"></div>
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          
          <div className="mb-24 md:text-center max-w-3xl mx-auto">
            <Reveal>
              <div className="text-xs font-bold tracking-[0.2em] text-stone-400 uppercase mb-4">Ключевая технология</div>
              <h2 className="text-4xl md:text-6xl font-light tracking-tighter text-stone-900 mb-6">
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
      <section id="projects" className="py-32 bg-stone-900 text-stone-50">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <div className="flex flex-col md:flex-row justify-between items-end gap-8 mb-24">
            <Reveal>
              <h2 className="text-4xl md:text-6xl font-light tracking-tighter">
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
                    src="https://images.unsplash.com/photo-1512917774080-9991f1c4c750?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80" 
                    alt="Современная Вилла" 
                    className="object-cover w-full h-full transition-transform duration-1000 ease-out group-hover:scale-105 opacity-80 group-hover:opacity-100"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-stone-900/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  <div className="absolute bottom-8 left-8 right-8 flex justify-between items-end translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500 ease-out">
                    <div>
                      <h3 className="text-3xl font-medium mb-2">Вилла Этель</h3>
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
                    src="https://images.unsplash.com/photo-1600607686527-6fb886090705?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80" 
                    alt="Прибрежный Дом" 
                    className="object-cover w-full h-full transition-transform duration-1000 ease-out group-hover:scale-105 opacity-80 group-hover:opacity-100"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-stone-900/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  <div className="absolute bottom-8 left-8 right-8 flex justify-between items-end translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500 ease-out">
                    <div>
                      <h3 className="text-2xl font-medium mb-1">Дом Горизонта</h3>
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
                    src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80" 
                    alt="Урбанистический Минимализм" 
                    className="object-cover w-full h-full transition-transform duration-1000 ease-out group-hover:scale-105 opacity-80 group-hover:opacity-100"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-stone-900/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  <div className="absolute bottom-8 left-8 right-8 flex justify-between items-end translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500 ease-out">
                    <div>
                      <h3 className="text-2xl font-medium mb-1">Павильон Крест Вью</h3>
                      <p className="text-stone-300 tracking-wider text-xs">АСПЕН, КОЛОРАДО</p>
                    </div>
                  </div>
                </div>
              </Reveal>
            </div>

          </div>
        </div>
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
      <section id="studio" className="py-32 bg-stone-50 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-stone-200/50 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3 opacity-50"></div>
        <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-stone-200/50 rounded-full blur-3xl translate-y-1/2 -translate-x-1/3 opacity-50"></div>
        
        <div className="max-w-4xl mx-auto px-6 text-center relative z-10">
          <Reveal>
            <h2 className="text-4xl md:text-6xl font-light tracking-tighter text-stone-900 mb-8">
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
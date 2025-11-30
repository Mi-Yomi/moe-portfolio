import { createContext, useContext, useState } from 'react'

const translations = {
  en: {
    // Navbar
    nav: {
      home: 'Home',
      work: 'Work',
      tools: 'Tools',
      about: 'About',
      faq: 'FAQ',
      contact: 'Contact',
      freelance: 'Freelance',
    },
    // Hero
    hero: {
      available: 'Available for work',
      line1: "Hey! I'm a Software Developer building fast, reliable and clean digital experiences.",
      line2: "I work at the intersection of frontend, backend, and UI engineering — turning ideas into real, working products.",
      line3: "From interactive dashboards to full-stack apps, I focus on clarity, performance, and modern engineering practices.",
      cta: "Let's connect!",
      viewProjects: "View Projects",
    },
    // Work
    work: {
      label: '01 — Selected Work',
      title: 'Featured Projects',
      viewAll: 'View all projects',
      comingSoon: 'Coming Soon',
    },
    // Tools
    tools: {
      label: '02 — Tools & Skills',
      title1: 'My skills',
      title2: 'and knowledge',
      years: 'years',
      year: 'year',
    },
    // About
    about: {
      availableBadge: 'Available For Work',
      paragraph1: "Hey there! I'm Anuar — a developer from Kazakhstan 🇰🇿 who loves creating tech-forward and user-friendly products.",
      paragraph2: "I'm a fan of clean code, modern architecture, and beautiful, intuitive interfaces.",
      paragraph3: "I work across multiple directions:",
      skills: [
        "Frontend (React, Next.js, TypeScript, UI components, animations, design systems)",
        "Backend (Laravel, Docker, API, authentication, real-world services)",
        "Mobile & Game Dev (Flutter, Unreal Engine, UI logic, prototypes)",
        "UX/UI when the product needs a clear and stylish interface"
      ],
      paragraph4: "I love turning complex things into simple, fast, and working solutions.",
      paragraph5: "If you need to build a web app, create a product interface, improve user experience, or build something from scratch — that's my vibe 😄",
      paragraph6: "When I'm not coding, I'm learning new technologies, pushing projects to GitHub, watching sci-fi, listening to Billie Eilish, and collecting Arcane-style references 🎧✨",
      paragraph7: "I love discussing ideas, thinking about products, and finding bold, modern solutions.",
      paragraph8: "If you're looking for a developer who actually gets things done — let's work together! 💬",
      resume: 'View Resume',
      photoCaption: 'Pick me!',
    },
    // FAQ
    faq: {
      label: 'FAQ',
      title: 'Common questions',
      questions: [
        {
          question: 'What services do you offer?',
          answer: `I create modern web applications and interfaces that work fast and are easy to use.

My main areas:
— Frontend development (React, Next.js, TypeScript)
— Backend development (Laravel, Docker, API)
— UI/UX design and prototyping
— Building landing pages, SaaS prototypes, and internal systems
— Support and development of existing projects

If you need a turnkey product — from idea to launch, I do that too.`,
        },
        {
          question: 'What is your design process?',
          answer: `I work transparently and step-by-step — so you always know what's happening on the project:

1. Task discussion — I analyze the goal, audience, and functionality.
2. Prototype or concept — I show how the product will look and work.
3. Development — frontend + backend, device adaptation.
4. Testing — checking stability, speed, and UX.
5. Launch — deployment to hosting and domain setup.
6. Support — if modifications or improvements are needed.

Each stage is documented in messages for full transparency.`,
        },
        {
          question: 'How long does a typical project take?',
          answer: `It depends on the scale:

— Landing page — 3 to 7 days
— Small web application — 1–3 weeks
— Full product (frontend + backend) — 3–6 weeks

After discussing the task, I provide an exact timeline and work plan.`,
        },
        {
          question: 'Do you work with remote clients?',
          answer: `Yes, of course!

I do most projects remotely — calls, reports, demos, and development happen conveniently for the client.

I work with Kazakhstan and international clients.`,
        },
      ],
    },
    // Contact
    contact: {
      label: 'Contact',
      title1: "Let's work",
      title2: 'together',
      getInTouch: 'Get in touch',
      footer: 'All rights reserved.',
    },
    // Modal
    modal: {
      title: 'Get in touch',
      subtitle: 'Fill in your details and I\'ll get back to you',
      name: 'Your name',
      email: 'Email',
      phone: 'Phone number',
      message: 'Your message',
      send: 'Send message',
      sending: 'Sending...',
      success: 'Message sent!',
      close: 'Close',
    },
  },
  ru: {
    // Navbar
    nav: {
      home: 'Главная',
      work: 'Работы',
      tools: 'Навыки',
      about: 'Обо мне',
      faq: 'FAQ',
      contact: 'Контакты',
      freelance: 'Фриланс',
    },
    // Hero
    hero: {
      available: 'Открыт для работы',
      line1: "Привет! Я Software Developer, создающий быстрые, надёжные и чистые цифровые решения.",
      line2: "Я работаю на стыке frontend, backend и UI-инженерии — превращаю идеи в реальные, работающие продукты.",
      line3: "От интерактивных дашбордов до full-stack приложений — я фокусируюсь на ясности, производительности и современных практиках разработки.",
      cta: 'Связаться!',
      viewProjects: 'Смотреть проекты',
    },
    // Work
    work: {
      label: '01 — Избранные работы',
      title: 'Проекты',
      viewAll: 'Все проекты',
      comingSoon: 'Скоро',
    },
    // Tools
    tools: {
      label: '02 — Инструменты и навыки',
      title1: 'Мои навыки',
      title2: 'и знания',
      years: 'лет',
      year: 'год',
    },
    // About
    about: {
      availableBadge: 'Открыт для работы',
      paragraph1: "Привет! Я Ануар — разработчик из Казахстана 🇰🇿, который любит создавать технологичные и удобные продукты.",
      paragraph2: "Я фанат чистого кода, современной архитектуры и красивых, понятных интерфейсов.",
      paragraph3: "Я работаю сразу в нескольких направлениях:",
      skills: [
        "Frontend (React, Next.js, TypeScript, UI-компоненты, анимации, дизайн-системы)",
        "Backend (Laravel, Docker, API, авторизация, real-world сервисы)",
        "Mobile & Game Dev (Flutter, Unreal Engine, UI-логика, прототипы)",
        "UX/UI, когда нужно упаковать продукт в понятный и стильный интерфейс"
      ],
      paragraph4: "Мне нравится превращать сложные вещи в простые, быстрые и работающие.",
      paragraph5: "Если нужно собрать веб-приложение, сделать продуктовый интерфейс, улучшить опыт пользователей или построить что-то с нуля — это мой вайб 😄",
      paragraph6: "Когда я не кодю, я учусь новым технологиям, качаю проекты на GitHub, смотрю sci-fi, слушаю Billie Eilish и собираю референсы в стиле Arcane 🎧✨",
      paragraph7: "Люблю обсуждать идеи, думать над продуктами и искать смелые, современные решения.",
      paragraph8: "Если ты в поиске разработчика, который реально делает дело — давай работать вместе! 💬",
      resume: 'Смотреть резюме',
      photoCaption: 'Выбери меня!',
    },
    // FAQ
    faq: {
      label: 'FAQ',
      title: 'Частые вопросы',
      questions: [
        {
          question: 'Какие услуги вы предлагаете?',
          answer: `Я создаю современные веб-приложения и интерфейсы, которые быстро работают и удобно использовать.

Мои основные направления:
— Frontend-разработка (React, Next.js, TypeScript)
— Backend-разработка (Laravel, Docker, API)
— UI/UX дизайн и прототипирование
— Сборка лендингов, SaaS-прототипов и внутренних систем
— Поддержка и развитие текущих проектов

Если вам нужен продукт «под ключ» — от идеи до публикации, я тоже этим занимаюсь.`,
        },
        {
          question: 'Какой у вас процесс работы?',
          answer: `Я работаю прозрачно и поэтапно — чтобы вы всегда понимали, что происходит на проекте:

1. Обсуждение задачи — разбираю цель, аудиторию и функционал.
2. Прототип или концепт — показываю, как будет выглядеть и работать продукт.
3. Разработка — frontend + backend, адаптация под устройства.
4. Тестирование — проверка стабильности, скорости и UX.
5. Запуск — выкладка на хостинг и настройка домена.
6. Поддержка — если нужна доработка или улучшения.

Каждый этап фиксируется в сообщениях, чтобы всё было прозрачно.`,
        },
        {
          question: 'Сколько времени занимает типичный проект?',
          answer: `Это зависит от масштаба:

— Лендинг — от 3 до 7 дней
— Небольшое веб-приложение — 1–3 недели
— Полноценный продукт (frontend + backend) — 3–6 недель

После обсуждения задачи я даю точный срок и план работ.`,
        },
        {
          question: 'Работаете ли вы с удалёнными клиентами?',
          answer: `Да, конечно!

Большинство проектов я делаю удалённо — созвоны, отчёты, демо и разработка проходят удобно для клиента.

Работаю с Казахстаном и зарубежными заказчиками.`,
        },
      ],
    },
    // Contact
    contact: {
      label: 'Контакты',
      title1: 'Давайте работать',
      title2: 'вместе',
      getInTouch: 'Написать',
      footer: 'Все права защищены.',
    },
    // Modal
    modal: {
      title: 'Связаться со мной',
      subtitle: 'Заполните данные и я свяжусь с вами',
      name: 'Ваше имя',
      email: 'Email',
      phone: 'Номер телефона',
      message: 'Ваше сообщение',
      send: 'Отправить',
      sending: 'Отправка...',
      success: 'Сообщение отправлено!',
      close: 'Закрыть',
    },
  },
  kz: {
    // Navbar
    nav: {
      home: 'Басты',
      work: 'Жұмыстар',
      tools: 'Дағдылар',
      about: 'Мен туралы',
      faq: 'FAQ',
      contact: 'Байланыс',
      freelance: 'Фриланс',
    },
    // Hero
    hero: {
      available: 'Жұмысқа дайын',
      line1: "Сәлем! Мен Software Developer-мін, жылдам, сенімді және таза цифрлық шешімдер жасаймын.",
      line2: "Мен frontend, backend және UI-инженерия қиылысында жұмыс істеймін — идеяларды нақты, жұмыс істейтін өнімдерге айналдырамын.",
      line3: "Интерактивті дашбордтардан бастап full-stack қосымшаларға дейін — мен анықтыққа, өнімділікке және заманауи әзірлеу тәжірибелеріне назар аударамын.",
      cta: 'Байланысу!',
      viewProjects: 'Жобаларды көру',
    },
    // Work
    work: {
      label: '01 — Таңдаулы жұмыстар',
      title: 'Жобалар',
      viewAll: 'Барлық жобалар',
      comingSoon: 'Жақында',
    },
    // Tools
    tools: {
      label: '02 — Құралдар мен дағдылар',
      title1: 'Менің дағдыларым',
      title2: 'және білімім',
      years: 'жыл',
      year: 'жыл',
    },
    // About
    about: {
      availableBadge: 'Жұмысқа дайын',
      paragraph1: "Сәлем! Мен Ануар — Қазақстандағы 🇰🇿 технологиялық және ыңғайлы өнімдер жасауды ұнататын әзірлеуші.",
      paragraph2: "Мен таза код, заманауи архитектура және әдемі, түсінікті интерфейстердің жанкүйерімін.",
      paragraph3: "Мен бірнеше бағытта жұмыс істеймін:",
      skills: [
        "Frontend (React, Next.js, TypeScript, UI-компоненттер, анимациялар, дизайн-жүйелер)",
        "Backend (Laravel, Docker, API, авторизация, real-world сервистер)",
        "Mobile & Game Dev (Flutter, Unreal Engine, UI-логика, прототиптер)",
        "UX/UI, өнімді түсінікті және стильді интерфейске орау қажет болғанда"
      ],
      paragraph4: "Маған күрделі нәрселерді қарапайым, жылдам және жұмыс істейтін етіп айналдыру ұнайды.",
      paragraph5: "Егер веб-қосымша жасау, өнім интерфейсін құру, пайдаланушы тәжірибесін жақсарту немесе нөлден бірдеңе құру қажет болса — бұл менің стилім 😄",
      paragraph6: "Мен код жазбаған кезде жаңа технологияларды үйренемін, GitHub-қа жобалар жүктеймін, sci-fi көремін, Billie Eilish тыңдаймын және Arcane стиліндегі референстар жинаймын 🎧✨",
      paragraph7: "Идеяларды талқылауды, өнімдер туралы ойлауды және батыл, заманауи шешімдер табуды ұнатамын.",
      paragraph8: "Егер сіз шынымен жұмыс істейтін әзірлеуші іздесеңіз — бірге жұмыс істейік! 💬",
      resume: 'Резюмені көру',
      photoCaption: 'Мені таңда!',
    },
    // FAQ
    faq: {
      label: 'FAQ',
      title: 'Жиі қойылатын сұрақтар',
      questions: [
        {
          question: 'Қандай қызметтер ұсынасыз?',
          answer: `Мен жылдам жұмыс істейтін және пайдалануға ыңғайлы заманауи веб-қосымшалар мен интерфейстер жасаймын.

Менің негізгі бағыттарым:
— Frontend-әзірлеу (React, Next.js, TypeScript)
— Backend-әзірлеу (Laravel, Docker, API)
— UI/UX дизайн және прототиптеу
— Лендингтер, SaaS-прототиптер және ішкі жүйелер құру
— Қолданыстағы жобаларды қолдау және дамыту

Егер сізге «кілт бойынша» өнім қажет болса — идеядан жарияланымға дейін, мен мұнымен де айналысамын.`,
        },
        {
          question: 'Жұмыс процесіңіз қандай?',
          answer: `Мен ашық және кезең-кезеңмен жұмыс істеймін — сіз жобада не болып жатқанын әрқашан білесіз:

1. Тапсырманы талқылау — мақсатты, аудиторияны және функционалды талдаймын.
2. Прототип немесе концепт — өнімнің қалай көрінетінін және жұмыс істейтінін көрсетемін.
3. Әзірлеу — frontend + backend, құрылғыларға бейімдеу.
4. Тестілеу — тұрақтылықты, жылдамдықты және UX тексеру.
5. Іске қосу — хостингке орналастыру және доменді баптау.
6. Қолдау — өзгертулер немесе жақсартулар қажет болса.

Әр кезең хабарламаларда тіркеледі, барлығы ашық болуы үшін.`,
        },
        {
          question: 'Типтік жоба қанша уақыт алады?',
          answer: `Бұл масштабқа байланысты:

— Лендинг — 3-тен 7 күнге дейін
— Шағын веб-қосымша — 1–3 апта
— Толық өнім (frontend + backend) — 3–6 апта

Тапсырманы талқылағаннан кейін нақты мерзім мен жұмыс жоспарын беремін.`,
        },
        {
          question: 'Қашықтағы клиенттермен жұмыс істейсіз бе?',
          answer: `Иә, әрине!

Көптеген жобаларды қашықтан жасаймын — қоңыраулар, есептер, демо және әзірлеу клиент үшін ыңғайлы түрде өтеді.

Қазақстан және шетелдік тапсырыс берушілермен жұмыс істеймін.`,
        },
      ],
    },
    // Contact
    contact: {
      label: 'Байланыс',
      title1: 'Бірге жұмыс',
      title2: 'істейік',
      getInTouch: 'Хабарласу',
      footer: 'Барлық құқықтар қорғалған.',
    },
    // Modal
    modal: {
      title: 'Байланысу',
      subtitle: 'Мәліметтеріңізді толтырыңыз, мен сізбен хабарласамын',
      name: 'Сіздің атыңыз',
      email: 'Email',
      phone: 'Телефон нөмірі',
      message: 'Сіздің хабарламаңыз',
      send: 'Жіберу',
      sending: 'Жіберілуде...',
      success: 'Хабарлама жіберілді!',
      close: 'Жабу',
    },
  },
}

const LanguageContext = createContext()

export function LanguageProvider({ children }) {
  const [language, setLanguage] = useState('en')

  const t = (key) => {
    const keys = key.split('.')
    let value = translations[language]
    for (const k of keys) {
      value = value?.[k]
    }
    return value || key
  }

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t, translations }}>
      {children}
    </LanguageContext.Provider>
  )
}

export function useLanguage() {
  const context = useContext(LanguageContext)
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider')
  }
  return context
}

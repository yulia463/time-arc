# Timeline Block (React + TypeScript + SCSS + Webpack)

Интерактивный блок временных отрезков (2–6 сегментов) с круговым переключателем и слайдером событий.
Демо содержит **максимальное количество** сегментов (6). Все линии на макете реализованы как часть вёрстки.
Компонент изолирован: можно добавлять несколько экземпляров на страницу, логика и стили не конфликтуют.

## Технологии и требования

- TypeScript
- React 18 
- SCSS (без Bootstrap/Tailwind)
- Сборка — Webpack
- Слайдер — [Swiper](https://swiperjs.com/)
- Анимации — [GSAP](https://greensock.com/gsap/)
- Не используются jQuery и UI-библиотеки

## Запуск

```bash
# 1) Установка зависимостей
npm install

# 2) Режим разработки (localhost:8080)
npm run dev

# 3) Продакшн сборка
npm run build
```

## Структура

```
timeline-block/
│── public/
│   └── index.html
│── src/
│   ├── components/
│   │   ├── TimelineBlock.tsx
│   │   ├── TimelineBlock.scss
│   │   └── EventSlider.tsx
│   ├── data/
│   │   └── timelineData.ts
│   ├── styles/
│   │   └── global.scss
│   └── index.tsx
│── package.json
│── tsconfig.json
│── webpack.config.js
│── README.md
```

## Использование компонента

```tsx
import TimelineBlock from '@/components/TimelineBlock';
import type { TimelineData } from '@/data/timelineData';

const myData: TimelineData = {/* ... */};

<TimelineBlock data={myData} title="Мой таймлайн" initialIndex={0} instanceId="unique-1" />
```

- `data` — данные с 2–6 сегментами.
- `title` — заголовок.
- `initialIndex` — какой сегмент активен при загрузке.
- `instanceId` — уникальный id для навигации Swiper (если на странице несколько инстансов).

## Кастомизация дизайна

- Все стили изолированы в `.timeline-block`.
- Точки по окружности равномерно распределяются в зависимости от количества сегментов.
- Декоративные линии реализованы в DOM и являются частью вёрстки (`.timeline-block__decor`).

## Автор 
Юлия Слатвицкая https://github.com/yulia463 

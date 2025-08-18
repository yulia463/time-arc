export type TimelineEvent = {
  id: string;
  date: string; // e.g., '2015-09-13'
  title: string;
  description: string;
};

export type TimelineSegment = {
  id: string;
  label: string; // категория / подпись, например "Наука"
  fromYear: number;
  toYear: number;
  events: TimelineEvent[];
};

export type TimelineData = {
  segments: TimelineSegment[];
};

// Демо-данные (6 временных отрезков). Можно заменить на реальные данные из вашего макета.
export const demoTimeline: TimelineData = {
  segments: [
    {
      id: '1',
      label: 'Наука',
      fromYear: 2015,
      toYear: 2022,
      events: [
        {
          id: 'e1-1',
          date: '2015-09-13',
          title: 'Частное солнечное затмение',
          description: 'Затмение, видимое в Южной Африке и части Антарктиды.'
        },
        {
          id: 'e1-2',
          date: '2016-03-03',
          title: 'Галактика GN-z11',
          description: '«Хаббл» обнаружил одну из самых удалённых известных галактик.'
        },
        {
          id: 'e1-3',
          date: '2018-10-12',
          title: 'Гравитационные волны',
          description: 'Дальнейшие подтверждения существования и уточнение источников.'
        }
      ]
    },
    {
      id: '2',
      label: 'Исторические даты',
      fromYear: 2016,
      toYear: 2019,
      events: [
        {
          id: 'e2-1',
          date: '2017-11-16',
          title: 'Tesla Semi',
          description: 'Компания Tesla представила электрический грузовик Tesla Semi.'
        },
        {
          id: 'e2-2',
          date: '2018-06-06',
          title: 'Символическая дата',
          description: '06/06 — условная дата для иллюстрации числовых индикаторов.'
        }
      ]
    },
    {
      id: '3',
      label: 'Технологии',
      fromYear: 2019,
      toYear: 2020,
      events: [
        {
          id: 'e3-1',
          date: '2019-04-10',
          title: 'Первая фотография чёрной дыры',
          description: 'EHT представил изображение сверхмассивной чёрной дыры M87*.'
        },
        {
          id: 'e3-2',
          date: '2020-06-30',
          title: 'Falcon 9 — рекорды',
          description: 'Повторные пуски и посадки усилили тренд на реиспользование ракет.'
        }
      ]
    },
    {
      id: '4',
      label: 'Космос',
      fromYear: 2020,
      toYear: 2021,
      events: [
        {
          id: 'e4-1',
          date: '2020-07-30',
          title: 'Марсоход Perseverance',
          description: 'Запуск марсианской миссии NASA к кратеру Езеро.'
        },
        {
          id: 'e4-2',
          date: '2021-02-18',
          title: 'Посадка Perseverance',
          description: 'Успешная посадка марсохода на Марсе.'
        }
      ]
    },
    {
      id: '5',
      label: 'Открытия',
      fromYear: 2021,
      toYear: 2022,
      events: [
        {
          id: 'e5-1',
          date: '2021-12-25',
          title: 'Запуск JWST',
          description: 'Космический телескоп Джеймса Уэбба стартовал на ракете Ariane 5.'
        },
        {
          id: 'e5-2',
          date: '2022-07-12',
          title: 'Первые изображения JWST',
          description: 'NASA опубликовало первые цветные изображения и спектры.'
        }
      ]
    },
    {
      id: '6',
      label: 'События',
      fromYear: 2015,
      toYear: 2022,
      events: [
        {
          id: 'e6-1',
          date: '2015-01-01',
          title: 'Пример события 1',
          description: 'Демонстрационный текст для последнего сегмента.'
        },
        {
          id: 'e6-2',
          date: '2016-06-06',
          title: 'Пример события 2',
          description: 'Иллюстрация формата даты 06/06 из макета.'
        },
        {
          id: 'e6-3',
          date: '2022-06-06',
          title: 'Пример события 3',
          description: 'Ещё один пример для демонстрации слайдера.'
        }
      ]
    }
  ]
};

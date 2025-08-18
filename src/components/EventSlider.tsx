import React from 'react';
import {Swiper, SwiperSlide} from 'swiper/react';
import {Navigation, Pagination, A11y, Keyboard} from 'swiper/modules';
import type {TimelineEvent} from '@/data/timelineData';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

import './TimelineBlock.scss';

type Props = {
    events: TimelineEvent[];
    instanceId: string;
};

const EventSlider: React.FC<Props> = ({events, instanceId}) => {
    return (
        <div className="timeline-block__slider" aria-label="Слайдер событий">
            <Swiper
                modules={[Navigation, Pagination, A11y, Keyboard]}
                navigation={{
                    enabled: true,
                    nextEl: `#${instanceId}-next`,
                    prevEl: `#${instanceId}-prev`,
                }}
                pagination={{clickable: true}}
                keyboard={{enabled: true}}
                spaceBetween={24}
                slidesPerView={1}
                className="timeline-block__pagination"
                breakpoints={{
                    720: {slidesPerView: 2},
                    1080: {slidesPerView: 3},
                }}
            >
                {events.map(ev => (
                    <SwiperSlide key={ev.id}>
                        <article className="timeline-card" role="group" aria-label={ev.title}>
                            <div className="timeline-card__date">
                                {new Date(ev.date).getFullYear()}
                                {/*{new Date(ev.date).toLocaleDateString('ru-RU', { year: 'numeric', month: '2-digit', day: '2-digit' })}*/}
                            </div>
                            <h3 className="timeline-card__title">{ev.title}</h3>
                            {/*<p className="timeline-card__desc">{ev.description}</p>*/}
                        </article>
                    </SwiperSlide>
                ))}
            </Swiper>
            {/*//TODO сделать на одной линии пагинацию и кнопки переключения */}
            <div className="timeline-block__nav">
                <button id={`${instanceId}-prev`} className="timeline-block__nav-btn" aria-label="Назад">
                    <svg className="chev chev--left" viewBox="0 0 24 24" width="16" height="16" aria-hidden="true">
                        <polyline points="15 6 9 12 15 18" fill="none" stroke="currentColor" strokeWidth="2"
                                  strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                </button>
                <button id={`${instanceId}-next`} className="timeline-block__nav-btn" aria-label="Вперёд">
                    <svg className="chev chev--right" viewBox="0 0 24 24" width="16" height="16" aria-hidden="true">
                        <polyline points="9 6 15 12 9 18" fill="none" stroke="currentColor" strokeWidth="2"
                                  strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                </button>
            </div>
        </div>
    );
};

export default EventSlider;

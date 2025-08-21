import React from 'react';
import {Swiper, SwiperSlide} from 'swiper/react';
import {Navigation, Pagination, A11y, Keyboard} from 'swiper/modules';
import type {TimelineEvent} from '@/data/timelineData';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import './TimelineBlock.scss';
import './EventSlider.scss';
import Button from "@/components/Button";

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
                            </div>
                            <h3 className="timeline-card__title">{ev.title}</h3>
                        </article>
                    </SwiperSlide>
                ))}
            </Swiper>

            <Button
                id={`${instanceId}-prev`}
                direction="prev"
                ariaLabel="Назад"
            />
            <Button
                id={`${instanceId}-next`}
                direction="next"
                ariaLabel="Вперёд"
            />
        </div>

    );
};

export default EventSlider;

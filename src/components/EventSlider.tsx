import React, {useState} from 'react';
import {Swiper, SwiperSlide} from 'swiper/react';
import {Navigation, Pagination, A11y, Keyboard} from 'swiper/modules';
import type {TimelineEvent} from '@/data/timelineData';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import './TimelineBlock.scss';
import './EventSlider.scss';
import Button from "@/components/Button";
import TimelineNavButtons from "@/components/TimelineNavButtons";

type Props = {
    events: TimelineEvent[];
    instanceId: string;
    onPrev: () => void;
    onNext: () => void;
};

const EventSlider: React.FC<Props> = ({events, instanceId, onPrev, onNext}) => {
    const [activeIndex, setActiveIndex] = useState(0);

    const formatFraction = (index: number, total: number) => {
        const pad = (n: number) => String(n).padStart(2, "0");
        return `${pad(index + 1)}/${pad(total)}`;
    };

    return (
        <div className="timeline-block__slider" aria-label="Слайдер событий">
            <Swiper
                modules={[Navigation, Pagination, A11y, Keyboard]}
                navigation={{
                    enabled: true,
                    nextEl: `#${instanceId}-next`,
                    prevEl: `#${instanceId}-prev`,
                }}
                pagination={{
                    clickable: true,
                    el: `#${instanceId}-pagination`
                }}
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

                <div className="timeline-block__for-mobile">
                    <div className="timeline-block__dates">
                        {formatFraction(activeIndex, events.length)}
                    </div>

                    <div className="timeline-block__nav-wrapper">
                        <TimelineNavButtons onPrev={onPrev} onNext={onNext}/>
                        <div id={`${instanceId}-pagination`} />
                    </div>
                </div>
            </Swiper>
            <div className="timeline-block__btn-for-slider">
                <Button id={`${instanceId}-prev`} direction="prev" ariaLabel="Назад"/>
                <Button id={`${instanceId}-next`} direction="next" ariaLabel="Вперёд"/>
            </div>
        </div>
    );
};

export default EventSlider;

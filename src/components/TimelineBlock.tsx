import React, {useEffect, useMemo, useRef, useState} from 'react';
import {gsap} from 'gsap';
import type {TimelineData, TimelineSegment} from '@/data/timelineData';
import EventSlider from './EventSlider';
import './TimelineBlock.scss';

export type TimelineBlockProps = {
    data: TimelineData;
    /** Необязательный заголовок секции */
    title?: string;
    /** В демонстрации используем 6 сегментов; компонент поддерживает 2–6 */
    initialIndex?: number;
    /** Уникальный ID инстанса для независимых навигационных элементов */
    instanceId?: string;
};

const clampSegments = (segments: TimelineSegment[]) => {
    if (segments.length < 2) return segments;
    if (segments.length > 6) return segments.slice(0, 6);
    return segments;
};

const formatFraction = (index: number, total: number) => {
    const pad = (n: number) => String(n).padStart(2, '0');
    return `${pad(index + 1)}/${pad(total)}`;
};

const TimelineBlock: React.FC<TimelineBlockProps> = ({
                                                         data,
                                                         title = 'Исторические даты',
                                                         initialIndex = 0,
                                                         instanceId = 'timeline-' + Math.random().toString(36).slice(2, 8),
                                                     }) => {
    const segments = useMemo(() => clampSegments(data.segments), [data.segments]);
    const [activeIndex, setActiveIndex] = useState(Math.min(Math.max(0, initialIndex), segments.length - 1));
    const active = segments[activeIndex];

    const rootRef = useRef<HTMLDivElement | null>(null);
    const infoRef = useRef<HTMLDivElement | null>(null);

    // Анимация смены секции
    useEffect(() => {
        if (!infoRef.current) return;
        const ctx = gsap.context(() => {
            const tl = gsap.timeline();
            tl.fromTo(
                infoRef.current!.querySelectorAll('[data-anim="fade-up"]'),
                {autoAlpha: 0, y: 10},
                {autoAlpha: 1, y: 0, duration: 0.4, stagger: 0.06, ease: 'power2.out'}
            );
        }, rootRef);
        return () => ctx.revert();
    }, [activeIndex]);

    // Позиции интерактивных точек по окружности
    const points = useMemo(() => {
        const N = segments.length;
        const radius = 265; // px
        const center = {x: 265, y: 265}; // px — совпадает с размерами .timeline-block__dial svg viewBox
        // стартуем сверху (угол -90°)
        return segments.map((seg, i) => {
            console.log("seg>>", seg)
            const angle = ((360 / N) * i) * (Math.PI / 180);
            const x = center.x + radius * Math.cos(angle);
            const y = center.y + radius * Math.sin(angle);
            return {x, y, seg, i, id: seg.id};
        });
    }, [segments]);

    return (
        <section className="timeline-block" ref={rootRef} aria-label={title}>
            <header className="timeline-block__header" data-anim="fade-up">
                <div className="timeline-block__title">{title}</div>
                {/*<div className="timeline-block__fraction" aria-live="polite">{formatFraction(activeIndex, segments.length)}</div>*/}
            </header>

            <div className="timeline-block__dial" role="tablist" aria-label="Временные отрезки">
                <div className="timeline-block__ring">
                    {points.map(p => (
                        <div
                            key={p.seg.id}
                            role="tab"
                            aria-selected={activeIndex === p.i}
                            className={
                                'timeline-block__dot' + (activeIndex === p.i ? ' is-active' : '')
                            }
                            style={{left: p.x, top: p.y}}
                            onClick={() => setActiveIndex(p.i)}
                        >
                            {activeIndex === p.i && (
                                <>
                                    <span>{p.id}</span>
                                    <span className="timeline-block__label">{p.seg.label}</span>
                                </>

                            )}
                            {/*<span className="visually-hidden">{p.seg.label} {p.seg.fromYear}–{p.seg.toYear}</span>*/}
                        </div>
                    ))}
                </div>

                <div className="timeline-block__info" ref={infoRef}>
                    <div className="timeline-block__years" data-anim="fade-up">
                        <span className="timeline-block__firstDate">{active.fromYear}</span>
                        <span className="timeline-block__secondDate">{active.toYear}</span>
                    </div>
                    {/*<div className="timeline-block__label" data-anim="fade-up">{active.label}</div>*/}
                    {/*<div className="timeline-block__count" data-anim="fade-up">*/}
                    {/*  {String(active.events.length).padStart(2, '0')}*/}
                    {/*</div>*/}
                </div>

                <div className="timeline-block__decor timeline-block__decor--h" aria-hidden="true"/>
                <div className="timeline-block__decor timeline-block__decor--v" aria-hidden="true"/>
            </div>

            <EventSlider events={active.events} instanceId={instanceId}/>
        </section>
    );
};

export default TimelineBlock;

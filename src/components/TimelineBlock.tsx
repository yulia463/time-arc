import React, {useCallback, useEffect, useMemo, useRef, useState} from 'react';
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

const TARGET_ANGLE = 315; // целевой угол (право-верх). Можно подкорректировать.

function norm360(angle: number) {
    return ((angle % 360) + 360) % 360;
}

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

    const center = { x: 265, y: 265 };
    const radius = 265;

    // Анимация смены секции
    //TODO this is not working at all
    // useEffect(() => {
    //     if (!infoRef.current) return;
    //     const ctx = gsap.context(() => {
    //         const tl = gsap.timeline();
    //         tl.fromTo(
    //             infoRef.current!.querySelectorAll('[data-anim="fade-up"]'),
    //             {autoAlpha: 0, y: 10},
    //             {autoAlpha: 1, y: 0, duration: 0.4, stagger: 0.06, ease: 'power2.out'}
    //         );
    //     }, rootRef);
    //     return () => ctx.revert();
    // }, [activeIndex]);

    // Позиции интерактивных точек по окружности
    const points = useMemo(() => {
        const N = segments.length;
        return segments.map((seg, i) => {
            const angleDeg = (360 / N) * i;
            const angleRad = (angleDeg * Math.PI) / 180;
            const x = center.x + radius * Math.cos(angleRad);
            const y = center.y + radius * Math.sin(angleRad);
            // baseAngle в градусах, согласован с тем, как вычислялись x,y
            const baseAngle = norm360((Math.atan2(y - center.y, x - center.x) * 180) / Math.PI);
            return { x, y, seg, i, id: seg.id, baseAngle };
        });
    }, [segments]);

    const [rotation, setRotation] = useState(0);

    const rotationRef = useRef<number>(0);
    const ringRef = useRef<HTMLDivElement | null>(null);

    const animatingRef = useRef(false);

    const handleClick = useCallback(
        (p: any) => {
            if (animatingRef.current) return;
            animatingRef.current = true;

            // базовый угол точки (0..360)
            const base = p.baseAngle;

            // rotation, который ставит эту точку прямо в TARGET_ANGLE (mod 360)
            const rawNeeded = norm360(TARGET_ANGLE - base); // in [0,360)
            // возьмём несколько кандидатов (включая +/-360 чтобы выбрать ближайший путь)
            const candidates = [
                rawNeeded - 720,
                rawNeeded - 360,
                rawNeeded,
                rawNeeded + 360,
                rawNeeded + 720,
            ];

            // выбрать кандидат с минимальным абсолютным смещением от текущего rotation
            let best = candidates[0];
            let bestDelta = best - rotationRef.current;
            for (const c of candidates) {
                const d = c - rotationRef.current;
                if (Math.abs(d) < Math.abs(bestDelta)) {
                    best = c;
                    bestDelta = d;
                }
            }

            // направление: если точка справа — требуем вращение "против часовой стрелки",
            // если слева — "по часовой".
            // В этой кодовой базе считается: положительный delta = "в сторону увеличения rotation".
            // Чтобы получить визуально "против часовой" — мы хотим delta < 0 (т.к. baseAngles
            // и координатная система согласованы через atan2).
            const clickedOnRight = p.x >= center.x;
            const desiredSign = clickedOnRight ? -1 : 1;

            // попытаемся найти кандидат, дающий нужный знак и не худший по длине
            const filtered = candidates
                .map((c) => ({ c, d: c - rotationRef.current }))
                .filter((item) => item.d === 0 || Math.sign(item.d) === desiredSign);

            if (filtered.length) {
                // из подходящих выберем минимальный по абсолютной величине
                const bestFiltered = filtered.reduce((a, b) =>
                    Math.abs(b.d) < Math.abs(a.d) ? b : a
                );
                // если он не хуже текущего — возьмём его
                if (Math.abs(bestFiltered.d) <= Math.abs(bestDelta)) {
                    best = bestFiltered.c;
                    bestDelta = bestFiltered.d;
                }
            }

            const newRotation = best;

            gsap.to(ringRef.current, {
                duration: 0.7,
                ease: 'power2.inOut',
                rotation: newRotation,
                onComplete: () => {
                    rotationRef.current = newRotation;
                    setRotation(newRotation);
                    setActiveIndex(p.i); // подпись показываем только когда достигли целевой позиции
                    animatingRef.current = false;
                },
            });
        },
        [center.x, center.y]
    );



    return (
        <section className="timeline-block" ref={rootRef} aria-label={title}>
            <header className="timeline-block__header" data-anim="fade-up">
                <div className="timeline-block__title">{title.split(" ").map((word, index) =>
                    index === 1 ? <span key={index} className="second-word">{word}</span> :
                        <span key={index}>{word} </span>
                )}</div>
                {/*<div className="timeline-block__fraction" aria-live="polite">{formatFraction(activeIndex, segments.length)}</div>*/}
            </header>

            <div className="timeline-block__dial" role="tablist" aria-label="Временные отрезки">
                <div className="timeline-block__ring" ref={ringRef}>
                    {points.map(p => (
                        <div
                            key={p.seg.id}
                            role="tab"
                            aria-selected={activeIndex === p.i}
                            className={
                                'timeline-block__dot' + (activeIndex === p.i ? ' is-active' : '')
                            }
                            style={{left: p.x, top: p.y}}
                            onClick={() => handleClick(p)}
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
                <div className="timeline-block__mobile-divider" aria-hidden="true"/>
                <div className="timeline-block__decor timeline-block__decor--h" aria-hidden="true"/>
                <div className="timeline-block__decor timeline-block__decor--v" aria-hidden="true"/>
            </div>

            <EventSlider events={active.events} instanceId={instanceId}/>
        </section>
    );
};

export default TimelineBlock;

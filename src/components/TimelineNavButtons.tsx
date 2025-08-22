import React from "react";
import "./TimelineBlock.scss";

type TimelineNavButtonsProps = {
    onPrev: () => void;
    onNext: () => void;
};

const TimelineNavButtons: React.FC<TimelineNavButtonsProps> = ({ onPrev, onNext }) => {
    return (
        <div className="timeline-block__buttons">
            <button
                className="timeline-block__nav-btns"
                onClick={onPrev}
                aria-label="Назад"
            >
                <svg
                    className="chev chev--left"
                    viewBox="0 0 24 24"
                    width="16"
                    height="16"
                    aria-hidden="true"
                >
                    <polyline
                        points="15 6 9 12 15 18"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    />
                </svg>
            </button>

            <button
                className="timeline-block__nav-btns"
                onClick={onNext}
                aria-label="Вперёд"
            >
                <svg
                    className="chev chev--right"
                    viewBox="0 0 24 24"
                    width="16"
                    height="16"
                    aria-hidden="true"
                >
                    <polyline
                        points="9 6 15 12 9 18"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    />
                </svg>
            </button>
        </div>
    );
};

export default TimelineNavButtons;

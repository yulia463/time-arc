import React from "react";
import './Button.scss';

type TimelineNavButtonProps = {
    id: string;
    direction: "prev" | "next";
    ariaLabel?: string;
    className?: string;
    onClick?: () => void;
};

const Button: React.FC<TimelineNavButtonProps> = ({
                                                      id,
                                                      direction,
                                                      ariaLabel,
                                                      className,
                                                      onClick
                                                  }) => {
    const isPrev = direction === "prev";

    return (
        <button
            id={id}
            className={`timeline-block__nav-btn ${isPrev ? "timeline-block__nav-btn--prev" : "timeline-block__nav-btn--next"} ${className}`}
            aria-label={ariaLabel}
            onClick={onClick ? onClick : () => {
            }}
        >
            <svg
                className={`chev ${isPrev ? "chev--left" : "chev--right"}`}
                viewBox="0 0 24 24"
                width="16"
                height="16"
                aria-hidden="true"
            >
                {isPrev ? (
                    <polyline
                        points="15 6 9 12 15 18"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    />
                ) : (
                    <polyline
                        points="9 6 15 12 9 18"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    />
                )}
            </svg>
        </button>
    );
};

export default Button;

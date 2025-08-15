import React, {useEffect, useRef} from 'react';
import style from '../Content/ContentBlock.module.scss';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import gsap from 'gsap';
import 'swiper/css';
import 'swiper/css/navigation';


function ContentBlock() {
    const timelineRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        gsap.from(timelineRef.current, { opacity: 0, y: 50, duration: 1 });
    }, []);

    return (
        <div className={style.ContentContainer}>
            <div className={style.DatesWrapper}>
                <div className={style.FirstDate}>2022</div>
                <div className={style.SecondDate}>2022</div>
            </div>
            <div className={style.GrayLine}></div>


            {/*<div className={style.ContentContainer} ref={timelineRef}>*/}
            {/*<Swiper*/}
            {/*    modules={[Navigation]}*/}
            {/*    navigation*/}
            {/*    spaceBetween={50}*/}
            {/*    slidesPerView={2}*/}
            {/*    breakpoints={{*/}
            {/*        320: { slidesPerView: 1, spaceBetween: 20 },*/}
            {/*        768: { slidesPerView: 2, spaceBetween: 30 },*/}
            {/*        1024: { slidesPerView: 2, spaceBetween: 50 },*/}
            {/*    }}*/}
            {/*>*/}
            {/*    <SwiperSlide>*/}
            {/*        <div className={style.YearSlide}>*/}
            {/*            <span className={style.YearBlue}>2015</span>*/}
            {/*        </div>*/}
            {/*    </SwiperSlide>*/}
            {/*    <SwiperSlide>*/}
            {/*        <div className={style.YearSlide}>*/}
            {/*            <span className={style.YearPink}>2022</span>*/}
            {/*        </div>*/}
            {/*    </SwiperSlide>*/}
            {/*</Swiper>*/}
        </div>

    );
}

export default ContentBlock;

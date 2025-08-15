import React from 'react';
import 'swiper/css';
import 'swiper/css/navigation';
import style from './TimeBlock.module.scss';
import HeaderBlock from "./Header/HeaderBlock";
import ContentBlock from "./Content/ContentBlock";
import FooterBlock from "./Footer/FooterBlock";


function TimeBlock() {
    return (
        <div className={style.TimeContainer}>
            <HeaderBlock/>
            <ContentBlock/>
            <FooterBlock/>
        </div>
    );
}

export default TimeBlock;

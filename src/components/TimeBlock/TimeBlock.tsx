import React from 'react';
import style from './TimeBlock.module.scss'; // относительный путь
import HeaderBlock from "../Header/HeaderBlock";
import ContentBlock from "../Content/ContentBlock";
import FooterBlock from "../Footer/FooterBlock";


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

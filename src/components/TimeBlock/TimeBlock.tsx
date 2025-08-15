import React from 'react';
import style from 'src/components/TimeBlock/TimeBlock.module.scss';
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

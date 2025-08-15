import React from 'react';
import style from '../Footer/FooterBlock.module.scss';

function FooterBlock() {
    return (
        <div className={style.FooterContainer}>
            <div className={style.YearAndTextContainer}>
                <div className={style.Year}>2015</div>
                <div className={style.Text}> 13 сентября — частное солнечное затмение, видимое в Южной Африке и части Антарктиды
                </div>
            </div>

            <div>
                <div className={style.Date}>06/06</div>
                <div className={style.BtnsAndTabs}>
                    <div>стрелки</div>
                    <div>кнопки</div>
                </div>

            </div>
        </div>
    );
}

export default FooterBlock;

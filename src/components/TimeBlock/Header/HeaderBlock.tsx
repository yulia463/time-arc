import React from 'react';
import style from '../Header/HeaderBlock.module.scss';

function HeaderBlock() {
    return (
        <div className={style.HeaderContainer}>
            <div className={style.HeaderText}>
                Исторические
                <br/> даты
            </div>
        </div>
    );
}

export default HeaderBlock;

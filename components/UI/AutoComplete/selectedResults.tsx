import React, {memo} from 'react';
import Card from "../Cards/Card";
import {v4 as uuidv4} from "uuid";
import cardClasses from "../Cards/Cards.module.scss";
import closeIcon from "../../../assets/promo/closeIcon.svg";
import Image from "next/image";


interface ISelectedResults{
    dataSelected: string[]
    onClick: (i: string)=> void
}
const SelectedResults: React.FC<ISelectedResults> = memo(({dataSelected, onClick}) => {
    return (
        <>
            <div style={{marginTop: 12}} className={'flexRowWrap'} onClick={(e)=>e.stopPropagation()}>
                {dataSelected.map(element=>
                    <Card key={Date.now() + uuidv4()} className={cardClasses.Card + ' ' + cardClasses.Card_Selection + ' ' + cardClasses.Card_style_height}>
                        <div onClick={()=>onClick(element)} className={'flexRow bold'} style={{gap: 14, alignItems: "center"}}>
                            {element}
                            <Image style={{width: '12px', height: '12px', color: '#C7C7C7'}} src={closeIcon} alt={'x'}/>
                        </div>
                    </Card>
                )}
            </div>
        </>
    );
});

export default SelectedResults;
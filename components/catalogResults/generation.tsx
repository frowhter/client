import React from 'react';
import {IGeneration} from "../../types/fetchedData/generations";
import classes from './generation.module.scss'
import carIcon from '../../assets/tests/carIcon.jpg'
import Image from "next/image";

interface IGenerationProps{
    generation: IGeneration;
    className?: string;
}

const Generation: React.FC<IGenerationProps> = ({generation, className}) => {
    return (
        <>
            <div className={classes.slider_card + ' ' + className}>
                <div onMouseDown={(e)=> e.preventDefault()} className={classes.slider_card_item_img}>
                    <Image style={{width: '100%', height: '100%'}} src={carIcon} alt={'car'}/>
                </div>
                <div>
                    <div className={classes.slider_card_item_label}>
                        {generation.year_start}-{generation.year_end}
                    </div>
                    <div className={classes.slider_card_item_description}>
                        {generation.pokolenie}
                    </div>
                </div>
            </div>
        </>
    );
};

export default Generation;
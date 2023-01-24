import React, {useRef} from 'react';
import classes from "./reviews.module.scss";
import Image from "next/image";
import review from "../../assets/review.png";
import {IReview} from "../../types/fetchedData/reviews";
import {v4 as uuidv4} from "uuid";
import Card from "../UI/Cards/Card";
import cardClasses from '../UI/Cards/Cards.module.scss'
import Slider from "../UI/slider/slider";
import star from '../../assets/star.svg'


interface IReviewsProps{
    reviews: IReview[];
    fitContent?: string;
}

const Reviews: React.FC<IReviewsProps> = ({reviews, fitContent}) => {
    const link = useRef<HTMLDivElement>(null)
    const monthName:Array<string> = [
        'января',
        'февраля',
        'марта',
        'апреля',
        'мая',
        'июня',
        'июля',
        'августа',
        'сентября',
        'октября',
        'ноября',
        'декабря' ]
    const outputOfElements = (number: number)=>{
        return [...Array(number).keys()]
    }

    const dateReviews = (minusDay)=>{
        let date = new Date()
        let day = +String(date.getDate()).padStart(2, '0')+minusDay
        let month = +String(date.getMonth()).padStart(2, '0')
        if (day<1){
            day=day*(-1);
            if (day===0) day=31
            month=month-1
            if (month<0)month=11
        }
        return day + ' ' + monthName[month];

    }

    return (
        <>
            <div className={classes.reviews}>
                <div className={classes.reviewsImage}>
                    <Image style={{width: 'auto', height: '711px'}} src={review} alt={'review'}/>
                </div>

                <div className={classes.Slider}>
                    <Slider description={'Отзывы'}  setWidth={link} numberItems={reviews.length}>
                        {reviews.map((element, index)=>
                            <div style={{paddingTop: 20}} ref={link} className={cardClasses.Card_style_flex} key={Date.now() + uuidv4()}>
                                <Card className={index===0 ? cardClasses.Card_style_gray + ' ' + fitContent : cardClasses.Card_style_gray + ' ' + fitContent + ' ' + 'marginLeft'} >
                                    <div className={classes.reviewItemAvatar}>
                                        <img alt={'star'} width={40} height={40} src={element.img}/>
                                    </div>
                                    <div className={'title2'}>
                                        {element.name}
                                    </div>
                                    <div className={classes.swiperItemsItem}>
                                        <div className={classes.swiperItemsStars}>
                                            {outputOfElements(element.star).map(() =>
                                                <div key={Date.now() + uuidv4()}>
                                                    <Image style={{width: 10, height: 10}} src={star} alt={'star'}/>
                                                </div>
                                            )}
                                        </div>
                                        <span className={classes.ratingText}>Сделка состоялась</span>

                                    </div>
                                    <div className={classes.reviewText}>
                                        {element.text}
                                    </div>
                                    <div className={classes.reviewsDate}>
                                        {dateReviews(element["minus-days"])}
                                    </div>
                                </Card>
                            </div>
                        )}
                    </Slider>
                </div>
            </div>
        </>
    );
};

export default Reviews;
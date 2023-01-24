import React, {useState} from 'react';
import classes from '../styles/Home.module.scss';
import Navbar from "../components/UI/Navbar/Navbar";
import CallIcon from "@mui/icons-material/Call";
import FormSelection from "../components/Forms/FormSelection";
import Button from "../components/UI/Buttons/Button";
import classesBtn from '../components/UI/Buttons/Button.module.scss'
import {East} from "@mui/icons-material";
import MainLayout from "../layouts/MainLayout";
import {useRouter} from "next/router";
import Reviews from "../components/reviews/reviews";
import {CATALOG_ROUTE} from "../consts";
import CarBanner from "../components/banners/carBanner";
import Modal from "../components/UI/modals/modal";
import FormCall from "../components/Forms/FormCall";
import {wrapper} from "../store";
import {FetchBrands} from "../store/actions-creators/fetched/brands";
import {useAppDispatch, useTypedSelector} from "../hooks/redux";
import {FetchReviews} from "../store/actions-creators/fetched/reviews";
import {modalResponseSlice} from "../store/reducers/sended/modalResponseSlice";
import {FetchProductsRandom} from "../store/actions-creators/fetched/products";
import ProductsList from "../components/productsResults/productsList";
import whatsApp from '../assets/promo/whatsApp.svg'
import viber from '../assets/promo/viber.svg'
import telegram from '../assets/promo/telegram.svg'
import phone from '../assets/promo/phone.svg'
import Image from "next/image";




const Index: React.FC = () => {
    const router = useRouter();
    const {brands} = useTypedSelector(state => state.brandsReducer)
    const {reviews} = useTypedSelector(state => state.reviewsReducer)
    const {products} = useTypedSelector(state => state.productsReducer)
    const [visible, setVisible] = useState<boolean>(false)

    const dispatch = useAppDispatch()
    const modalResponseActions = modalResponseSlice.actions

    const modalResponse = useTypedSelector(state=> state.modalResponseReducer)



    return (
        <>
            <MainLayout>
                <div className={classes.header}>
                    <div className={'container'}>
                        <Navbar/>
                        <div className={classes.navBarCallIconsHorizontal}>
                            <a href="https://wa.me/79371609277">
                                <div style={{width: 40, height: 40}}>
                                    <Image style={{width: '100%', height: '100%'}} src={whatsApp} alt={'whatsApp'}/>
                                </div>
                            </a>
                            <a href="https://viber.click/79371609277">
                                <div style={{width: 40, height: 40}}>
                                    <Image style={{width: '100%', height: '100%'}} src={viber} alt={'viber'}/>
                                </div>
                            </a>
                            <a href="https://t.me/AzamatZ">
                                <div style={{width: 40, height: 40}}>
                                    <Image style={{width: '100%', height: '100%'}} src={telegram} alt={'telegram'}/>
                                </div>
                            </a>
                            <a href="tel:+79371609277">
                                <div style={{width: 40, height: 40}}>
                                    <Image style={{width: '100%', height: '100%'}} src={phone} alt={'telegram'}/>
                                </div>
                            </a>
                        </div>
                        <div style={{marginTop: 20}} className={classes.header_content}>
                            <div className={classes.header_content_body}>
                                <div className={classes.header_content_text}>
                                    <div className={classes.header_content_title + ' title'}>
                                        Новые и бу автозапчасти по лучшим ценам в Уфе
                                    </div>
                                    <ul className={classes.header_content_content}>
                                        <li>– Запросите интересующие вас запчасти в Уфе</li>
                                        <li>– Мы выставим минимальные цены</li>
                                        <li>– При встрече заключим договор</li>
                                        <li>– Привезем запчасти в срок</li>
                                    </ul>

                                    <div className={'flexColumn' + ' ' + classes.btnCallContainer} style={{gap: 15}}>
                                        <Button onClick={() => router.push(CATALOG_ROUTE)} className={classes.btnHeaderCatalog}>
                                            каталог запчастей
                                        </Button>
                                        <Button onClick={()=>setVisible(true)} className={classesBtn.filled + ' ' + classesBtn.filledHover + ' ' + classes.btnHeaderCall + ' ' + classes.width}>
                                            <CallIcon/>Нажмите и мы перезвоним
                                        </Button>
                                        <div className={classes.navBarCallIconsVertical}>
                                            <a href="https://wa.me/79371609277">
                                                <div style={{width: 40, height: 40}}>
                                                    <Image style={{width: '100%', height: '100%'}} src={whatsApp} alt={'whatsApp'}/>
                                                </div>
                                            </a>
                                            <a href="https://viber.click/79371609277">
                                                <div style={{width: 40, height: 40}}>
                                                    <Image style={{width: '100%', height: '100%'}} src={viber} alt={'viber'}/>
                                                </div>
                                            </a>
                                            <a href="https://t.me/AzamatZ">
                                                <div style={{width: 40, height: 40}}>
                                                    <Image style={{width: '100%', height: '100%'}} src={telegram} alt={'telegram'}/>
                                                </div>
                                            </a>
                                            <a href="tel:+79371609277">
                                                <div style={{width: 40, height: 40}}>
                                                    <Image style={{width: '100%', height: '100%'}} src={phone} alt={'telegram'}/>
                                                </div>
                                            </a>
                                        </div>
                                    </div>



                                </div>
                                <CarBanner/>
                            </div>
                        </div>
                    </div>
                </div>
                <Modal visible={visible} setVisible={()=> setVisible(false)}>
                    <FormCall setVisible={()=> setVisible(false)}/>
                </Modal>
                <FormSelection brands={brands}/>
                <Reviews reviews={reviews}/>
                <div className={classes.latest}>
                    <div style={{padding: 0}} className={'container'}>
                        <div className={classes.latest_top + ' ' + 'marginBottomGlobal'}>
                            <div className={'title5'}>
                                Последние поступления
                            </div>
                            <Button onClick={() => router.push('/catalog/')} className={classesBtn.blank_text_blue + ' ' + 'width gap10' }>
                                Смотреть весь каталог
                                <East/>
                            </Button>
                        </div>
                        <ProductsList numbers={8} products={products}/>
                    </div>
                </div>
                <Modal visible={modalResponse.visible} setVisible={() => {
                    dispatch(modalResponseActions.modalResponseSetVisible(false))
                }}>
                    <div className={'flexColumn' + ' ' + 'container'} style={{alignItems: 'flex-start', gap: 16}}>

                        <div className={'title3'}>
                            Спасибо
                        </div>

                        <div style={{marginBottom: 16}}>
                            {modalResponse.response}
                        </div>

                        <Button className={classesBtn.filled + ' ' + classesBtn.width} onClick={()=>{
                            dispatch(modalResponseActions.modalResponseSetVisible(false))
                        }
                        }>
                            хорошо
                        </Button>
                    </div>
                </Modal>

            </MainLayout>

        </>

    );
};





export default Index;

export const getServerSideProps = wrapper.getServerSideProps( (store) => async () => {
    try {

        await store.dispatch(FetchProductsRandom())
        await store.dispatch(FetchBrands())
        await store.dispatch(FetchReviews())
        return { props: {} }
    } catch (e) {
        return { props: {} }
    }

})
import React, {useState} from 'react';
import Reviews from "../../../../../components/reviews/reviews";
import classes from '../../../../../styles/CatalogProductsPage.module.scss';
import Footer from "../../../../../components/UI/Footer/footer";
import {useRouter} from "next/router";
import {NavigateNext} from "@mui/icons-material";
import Button from "../../../../../components/UI/Buttons/Button";
import btnClasses from '../../../../../components/UI/Buttons/Button.module.scss'
import ProductsResults from "../../../../../components/productsResults/productsResults";
import {CATALOG_ROUTE} from "../../../../../consts";
import FeaturesBanner from "../../../../../components/banners/featuresBanner";
import {useMinWithMax} from "../../../../../hooks/useProducts";
import Modal from "../../../../../components/UI/modals/modal";
import FormSectionCall from "../../../../../components/Forms/FormSectionCall";
import {sendMailSelections} from "../../../../../htttp/razboroAPI";
import {wrapper} from "../../../../../store";
import {FetchGenerations} from "../../../../../store/actions-creators/fetched/generations";
import {FetchProducts} from "../../../../../store/actions-creators/fetched/products";
import {FetchReviews} from "../../../../../store/actions-creators/fetched/reviews";
import {useAppDispatch, useTypedSelector} from "../../../../../hooks/redux";
import {modalResponseSlice} from "../../../../../store/reducers/sended/modalResponseSlice";
import classesBtn from "../../../../../components/UI/Buttons/Button.module.scss";
import ProductPageLayout from "../../../../../layouts/ProductPageLayout";
import CallIcon from "@mui/icons-material/Call";
import cardClasses from "../../../../../components/UI/Cards/Cards.module.scss";
import {FetchVariations} from "../../../../../store/actions-creators/fetched/variations";

const Index: React.FC = () => {

    const {reviews} = useTypedSelector(store => store.reviewsReducer)
    const {generations} = useTypedSelector(store => store.generationsReducer)
    const {products} = useTypedSelector(store => store.productsReducer)
    const {variations} = useTypedSelector(store => store.variationsReducer)


    const router = useRouter();
    const {brand, model} = router.query;
    const detail = (router.query.detail)

    const [minPrice, maxPrice] = useMinWithMax(products)
    const [visible, setVisible] = useState<boolean>(false)

    const dispatch = useAppDispatch()
    const modalResponseActions = modalResponseSlice.actions

    const modalResponse = useTypedSelector(state=> state.modalResponseReducer)


    const sendForm = (phone: string)=> {
        const formData = new FormData()
        formData.append('page', window.location.href)
        formData.append('phone', phone)
        formData.append('brand', String(brand))
        formData.append('model', String(model))
        formData.append('details', String(detail))
        sendMailSelections(formData).then(message => {
            dispatch(modalResponseActions.modalResponseSetVisible(true))
            dispatch(modalResponseActions.modalResponseFetchingSuccess(message))
            setVisible(false)
        })

    }
    return (
        <>
            <ProductPageLayout classContainer={classes.mainContainer}>
                <div className={classes.container + ' ' + 'gapGlobal'}>
                    <div>
                        <div className={'container'}>
                            <div className={classes.navigate}>
                                <div onClick={()=> router.push(CATALOG_ROUTE)} className={classes.navigate_item}>
                                    Каталог
                                    <NavigateNext/>
                                </div>
                                <div onClick={()=> router.push(CATALOG_ROUTE + `/${brand}`)} className={classes.navigate_item}>
                                    {brand}
                                    <NavigateNext/>
                                </div>
                                <div onClick={()=> router.push(CATALOG_ROUTE + `/${brand}/${model}`)} className={classes.navigate_item}>
                                    {model}
                                    <NavigateNext/>
                                </div>
                                <div className={classes.active}>
                                    {detail}
                                </div>
                            </div>
                            <div className={classes.priceBanner}>
                                <div style={{display: "grid", gap: 16}}>
                                    <div className={classes.priceBanner_item_left}>
                                        <div className={'title4'}>{brand}</div>
                                        <div className={'title4'}>{model}</div>
                                        <div className={'title4'}>{detail}</div>
                                    </div>
                                    <div style={{gap: 16}} className={'flexRow'}>
                                        <div style={{fontSize: 14, fontWeight: 700}}>
                                            Варианты:
                                        </div>
                                        <div className={'flexRowWrap'}>
                                            {variations.map((element, index)=>
                                                <label style={{fontSize: 14}}>{element.text}{index!==variations.length-1?',':''}</label>
                                            )}
                                        </div>
                                    </div>
                                </div>

                                <div className={classes.priceBanner_item_right}>
                                    <div className={classes.priceBanner_item_right_items}>
                                        <div className={classes.priceBanner_item_right_items_price}>
                                            от {minPrice} до {maxPrice} руб.*
                                        </div>
                                        <Button onClick={()=> setVisible(true)} className={btnClasses.filled}>уточнить цену</Button>
                                    </div>
                                    <span>* Зависит от производителя и состояния запчасти</span>
                                </div>

                            </div>
                        </div>
                        <Modal visible={visible} setVisible={()=> setVisible(false)}>
                            <FormSectionCall sendForm={sendForm}/>
                        </Modal>
                        <ProductsResults modalVisible={()=> setVisible(true)} products={products} generations={generations}/>
                        <div className={'container'} style={{marginTop: 20}}>
                            <div className={classes.banner}>
                                <div style={{display: "flex", gap:20, alignItems: "center"}}>
                                    <div className={classes.image}>
                                        <CallIcon/>
                                    </div>
                                    <div className={classes.text}>
                                        Представлены не все имеющееся в наличии запчасти. Узнавайте подробности у менеджера
                                    </div>
                                </div>
                                <div className={classes.button}>
                                    <Button className={classesBtn.filled + ' ' + classes.button} onClick={()=> setVisible(true)}>
                                        уточнить
                                    </Button>
                                </div>
                            </div>

                        </div>
                    </div>

                    <div className={classes.featuresBanner}>
                        <FeaturesBanner modalVisible={()=> setVisible(true)}/>
                    </div>
                    <Reviews fitContent={cardClasses.Card_style_height} reviews={reviews}/>
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
                    <Footer/>
                </div>
            </ProductPageLayout>
        </>
    );
};

export default Index;

export const getServerSideProps = wrapper.getServerSideProps( (store) => async (context) => {
    try {
        let param1: string | string[]  = '';
        let param2: string | string[]  = '';
        let param3: string | string[]  = '';
        if(context.params){
            const {brand,model, detail} = context.params
            param1=String(brand);
            param2=String(model);
            param3=String((detail));
        }

        await store.dispatch(FetchProducts(param1, param2, param3))
        await store.dispatch(FetchVariations(param1, param2, param3))
        await store.dispatch(FetchGenerations(param2))
        await store.dispatch(FetchReviews())
        return { props: {} }
    } catch (e) {
        return { props: {} }
    }

})
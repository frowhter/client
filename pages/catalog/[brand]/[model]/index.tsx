import React, {useEffect, useRef, useState} from 'react';
import CatalogLayout from "../../../../layouts/CatalogLayout";
import classes from '../../../../styles/Catalog.module.scss'
import Search from "../../../../components/UI/search/search";
import {useRouter} from "next/router";
import modelsClasses from '../../../../styles/Catalog_Models.module.scss'
import detailsClasses from '../../../../styles/Catalod_Models_Details.module.scss'
import {Close} from "@mui/icons-material";
import {useSearchProduct} from "../../../../hooks/useBrands";
import DetailsResult from "../../../../components/catalogResults/detailsResult";
import Generation from "../../../../components/catalogResults/generation";
import {v4 as uuidv4} from "uuid";
import {CATALOG_ROUTE} from "../../../../consts";
import Slider from "../../../../components/UI/slider/slider";
import cardClasses from "../../../../components/UI/Cards/Cards.module.scss";
import Button from "../../../../components/UI/Buttons/Button";
import btnClasses from "../../../../components/UI/Buttons/Button.module.scss";
import Modal from "../../../../components/UI/modals/modal";
import FormCatalogDetails from "../../../../components/Forms/FormCatalogDetails";
import {wrapper} from "../../../../store";
import {FetchDetails} from "../../../../store/actions-creators/fetched/details";
import {FetchGenerations} from "../../../../store/actions-creators/fetched/generations";
import {useAppDispatch, useTypedSelector} from "../../../../hooks/redux";
import classesBtn from "../../../../components/UI/Buttons/Button.module.scss";
import {modalResponseSlice} from "../../../../store/reducers/sended/modalResponseSlice";


interface IUseState{
    sort: string;
    query: string;
}


const Index: React.FC = () => {
    const {details} = useTypedSelector(store => store.detailsReducer)
    const {generations} = useTypedSelector(store => store.generationsReducer)
    const router = useRouter()
    const {brand, model} = router.query;
    const [filter, setFilter] = useState<IUseState>({sort: '', query: ''});
    const sortedAndSearchedModels = useSearchProduct(details, filter.sort, filter.query);
    const link = useRef(null)
    const [visible, setVisible] = useState(false)

    const [detail, setDetail] = useState<string>('')

    const dispatch = useAppDispatch()
    const modalResponseActions = modalResponseSlice.actions

    const modalResponse = useTypedSelector(state=> state.modalResponseReducer)

    useEffect(()=> {
        if(sortedAndSearchedModels.length===0){
            setDetail(filter.query)
        }
    }, [sortedAndSearchedModels])

    return (
        <>
            <CatalogLayout classContainer={'container' + ' ' + detailsClasses.body}>
                <div style={{marginBottom: 30}} className={classes.catalog_wrapper_details}>
                    <div className={classes.catalog_wrapper_header}>
                        <div className={classes.catalog_step_three}>
                            Выберите запчасть для
                        </div>
                        <div className={modelsClasses.selected}>
                            <div onClick={()=>router.push(CATALOG_ROUTE)} className={modelsClasses.brandBlock}>
                                {brand}
                                <Close/>
                            </div>
                            <div onClick={()=>router.push(CATALOG_ROUTE + `/${brand}`)} className={modelsClasses.brandBlock}>
                                {model}
                                <Close/>
                            </div>
                        </div>

                        <Search filter={filter} setFilter={setFilter}/>

                    </div>
                    <div className={'flexColumn marginTopBottom'}>
                        <Button
                            onClick={()=>setVisible(true)}
                            className={sortedAndSearchedModels.length===0 ? btnClasses.filled :btnClasses.blank_text_blue}>
                            запросить деталь
                        </Button>
                    </div>

                    {generations.length!==0
                        ?<div className={'marginBottom'}>
                            <Slider hide={true} padding0={'padding0'} classNameBtn={btnClasses.navigateGenerations} description={'В наличии запчасти на поколения:'} descriptionSize={14} setWidth={link} numberItems={generations.length}>
                                {generations.map((element)=>
                                    <div style={{padding: '20px 0'}} ref={link} className={cardClasses.Card_style_flex} key={Date.now() + uuidv4()}>
                                        <Generation className={'marginLR'}  generation={element}/>
                                    </div>
                                )}
                            </Slider>
                        </div>

                        :<></>
                    }


                    <DetailsResult brand={brand} model={model} sortedAndSearchedModels={sortedAndSearchedModels}/>
                    <Modal visible={visible} setVisible={()=>setVisible(false)}>
                        <FormCatalogDetails setVisible={()=>setVisible(false)} brand={String(brand)} model={String(model)} detailInput={detail}/>
                    </Modal>
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

            </CatalogLayout>
        </>
    );
};


export default Index;

export const getServerSideProps = wrapper.getServerSideProps( (store) => async (context) => {
    try {
        let param1: string | string[]  = '';
        let param2: string | string[]  = '';
        if(context.params){
            const {brand,model} = context.params
            param1=String(brand);
            param2=String(model);
        }

        await store.dispatch(FetchDetails(param1, param2))
        await store.dispatch(FetchGenerations(param2))
        return { props: {} }
    } catch (e) {
        return { props: {} }
    }

})
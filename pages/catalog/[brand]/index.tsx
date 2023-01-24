import React, {useState} from 'react';
import CatalogLayout from "../../../layouts/CatalogLayout";
import classes from '../../../styles/Catalog.module.scss'
import Search from "../../../components/UI/search/search";
import {useSearchProduct} from "../../../hooks/useBrands";
import ModelsResult from "../../../components/catalogResults/modelsResult";
import {useRouter} from "next/router";
import modelsClasses from '../../../styles/Catalog_Models.module.scss'
import {Close} from "@mui/icons-material";
import {CATALOG_ROUTE} from "../../../consts";
import {wrapper} from "../../../store";
import {FetchModels} from "../../../store/actions-creators/fetched/models";
import {useTypedSelector} from "../../../hooks/redux";


interface IUseState{
    sort: string;
    query: string;
}


const Index: React.FC = () => {
    const {models} = useTypedSelector(store=> store.modelsReducer)
    const router = useRouter()
    const {brand} = router.query;
    const [filter, setFilter] = useState<IUseState>({sort: '', query: ''});
    const sortedAndSearchedModels = useSearchProduct(models, filter.sort, filter.query);
    return (
        <>
            <CatalogLayout classContainer={'container' + ' ' + modelsClasses.body}>
                <div style={{marginBottom: 30}} className={classes.catalog_wrapper}>
                    <div className={classes.catalog_wrapper_header}>
                        <div className={classes.catalog_step_two}>
                            Выберите модель для
                        </div>
                        <div onClick={()=>router.push(CATALOG_ROUTE)} className={modelsClasses.brandBlock}>
                            {brand}
                            <Close/>
                        </div>
                        <Search filter={filter} setFilter={setFilter}/>
                    </div>
                    <ModelsResult brand={brand} sortedAndSearchedModels={sortedAndSearchedModels}/>
                </div>
            </CatalogLayout>
        </>
    );
};


export default Index;

export const getServerSideProps = wrapper.getServerSideProps( (store) => async (context) => {
    try {
        let param: string | string[] = '';
        if(context.params){
            const {brand} = context.params
            param=String(brand);
        }

        await store.dispatch(FetchModels(param))
        return { props: {} }
    } catch (e) {
        return { props: {} }
    }

})
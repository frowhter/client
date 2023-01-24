import React, {useState} from 'react';
import CatalogLayout from "../../layouts/CatalogLayout";
import classes from '../../styles/Catalog.module.scss'
import Search from "../../components/UI/search/search";
import {useBrands} from "../../hooks/useBrands";
import BrandResult from "../../components/catalogResults/brandResult";
import {wrapper} from "../../store";
import {FetchBrands} from "../../store/actions-creators/fetched/brands";
import {useTypedSelector} from "../../hooks/redux";


interface IUseState{
    sort: string;
    query: string;
}


const Index: React.FC = () => {
    const {brands} = useTypedSelector(store=> store.brandsReducer)
    const [filter, setFilter] = useState<IUseState>({sort: '', query: ''});
    const sortedAndSearchedBrand = useBrands(brands, filter.sort, filter.query);

    return (
        <>
            <CatalogLayout classContainer={'container'}>
               <div className={classes.catalog_wrapper}>
                   <div className={classes.catalog_wrapper_header}>
                       <div className={classes.catalog_step}>
                           Выберите марку
                       </div>
                       <Search filter={filter} setFilter={setFilter}/>
                   </div>

                   <BrandResult sortedAndSearchedBrand={sortedAndSearchedBrand}/>
               </div>
            </CatalogLayout>
        </>
    );
};
export default Index;

export const getServerSideProps = wrapper.getServerSideProps( (store) => async () => {
    try {
        await store.dispatch(FetchBrands())
        return { props: {} }
    } catch (e) {
        return { props: {} }
    }

})
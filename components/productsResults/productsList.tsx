import React, {useRef, useState} from 'react';
import {IProduct} from "../../types/fetchedData/product";
import ProductsItem from "./productsItem";
import classes from './productsResults.module.scss';
import {useProducts} from "../../hooks/useProducts";
import {v4 as uuidv4} from "uuid";
import Slider from "../UI/slider/slider";
import Modal from "../UI/modals/modal";
import FormSectionCall from "../Forms/FormSectionCall";
import {useRouter} from "next/router";
import {sendMailSelections} from "../../htttp/razboroAPI";
import {useAppDispatch} from "../../hooks/redux";
import {modalResponseSlice} from "../../store/reducers/sended/modalResponseSlice";
import FeaturesBanner from "../banners/featuresBanner";


interface IProductsListProps{
    products: IProduct[],
    features?: boolean,
    numbers?: number,
    modalVisible?: ()=> void;
}

const ProductsList: React.FC<IProductsListProps> = ({products, features, numbers, modalVisible}) => {
    const destructuredProducts = useProducts(products, numbers)
    const link = useRef<HTMLDivElement>(null)
    const link2 = useRef<HTMLDivElement>(null)

    const [visible, setVisible] = useState<boolean>(false)

    const [product, setProduct] = useState<string>('')

    const router = useRouter();
    const {brand, model} = router.query;
    const detail = (router.query.detail)

    const dispatch = useAppDispatch()
    const modalResponseActions = modalResponseSlice.actions

    const sendForm = (phone: string)=> {
        const formData = new FormData()
        formData.append('page', window.location.href)
        formData.append('phone', phone)
        formData.append('brand', String(brand))
        formData.append('model', String(model))
        formData.append('details', String(detail))
        formData.append('product', product)
        sendMailSelections(formData).then(message => {
            dispatch(modalResponseActions.modalResponseSetVisible(true))
            dispatch(modalResponseActions.modalResponseFetchingSuccess(message))
            setVisible(false)
        })
    }

    const onClick = (element)=> {
        setProduct(element)
        setVisible(true)
    }

    return (
        <>
            <div className={classes.product_container}>
                <Slider sliderPagination={true} link2={link2} setWidth={link} numberItems={destructuredProducts.length}>
                {destructuredProducts.map((element, index)=>
                    index===0
                        ?
                        <div key={Date.now() + uuidv4()} ref={destructuredProducts.length-1===index?link: link2} style={{display: "flex", flexDirection: "column", height: "fit-content", flex: '0 0 100%'}}>
                            <div className={classes.containerProductsSlid + ' ' + 'heightFitContent'}>
                                {element.map((subElement, index) =>{
                                        if(index<4){
                                            return <ProductsItem onClickBtn={()=> onClick(subElement.name)} key={Date.now() + uuidv4()} product={subElement} />
                                        }
                                })}
                            </div>
                            <div style={{display: features? "block":'none'}} className={classes.featuresBanner}>
                                <FeaturesBanner modalVisible={modalVisible}/>
                            </div>
                            <div className={classes.containerProductsSlid + ' ' + 'heightFitContent'}>
                                {element.map((subElement, index) =>{
                                    if(index>=4){
                                        return <ProductsItem onClickBtn={()=> onClick(subElement.name)} key={Date.now() + uuidv4()} product={subElement} />
                                    }
                                })}
                            </div>

                        </div>
                        :

                        <div ref={index===1? link2:destructuredProducts.length-1===index? link : null} className={classes.containerProductsSlid + ' ' + 'heightFitContent'} key={Date.now() + uuidv4()}>
                            {element.map(subElement =>
                                <ProductsItem onClickBtn={()=> onClick(subElement.name)} key={Date.now() + uuidv4()} product={subElement} />
                            )}
                        </div>
                )}
                </Slider>
                <Modal visible={visible} setVisible={()=>setVisible(false)}>
                    <FormSectionCall sendForm={sendForm}/>
                </Modal>
            </div>
        </>
    );
};

export default ProductsList;
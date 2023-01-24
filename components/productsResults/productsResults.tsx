import React from 'react';
import ProductsList from "./productsList";
import {IProduct} from "../../types/fetchedData/product";
import {IGeneration} from "../../types/fetchedData/generations";
import {v4 as uuidv4} from "uuid";
import classes from './productsResults.module.scss'

interface IProductsResultsProps{
    products: IProduct[];
    generations: IGeneration[];
    modalVisible?: ()=> void;
}

const ProductsResults: React.FC<IProductsResultsProps> = ({products, generations, modalVisible}) => {
    return (
        <>
            <div className={'container marginBottom'}>
                <div style={{margin: '16px 0 8px 0'}} className={'bold'}>
                    В наличии запчасти на поколения:
                </div>
                <div className={classes.containerGenerations}>
                    {generations.map(element=>
                        <div style={{fontSize: 14}} key={Date.now() + uuidv4()}>
                            {element.pokolenie} ({element.year_start}-{element.year_end})
                        </div>
                    )}
                </div>
            </div>
            <ProductsList modalVisible={modalVisible} numbers={12} features={true} products={products}/>
        </>
    );
};

export default ProductsResults;
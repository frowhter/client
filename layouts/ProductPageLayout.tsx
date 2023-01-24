import React from 'react';
import Navbar from "../components/UI/Navbar/Navbar";
import classes from '../styles/Catalog.module.scss';



interface LayoutProps {
    children?: React.ReactNode;
    classContainer: string;
}
const ProductPageLayout: React.FC<LayoutProps> = ({children, classContainer}) => {
    return (
        <>
            <div className={classes.catalog_container + ' ' + classContainer}>
                <div className={classContainer}>
                    <div className={'container'}>
                        <Navbar/>
                    </div>
                    {children}
                </div>
            </div>
        </>
    );
};

export default ProductPageLayout;
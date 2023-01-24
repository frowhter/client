import React, {memo} from 'react';
import PaginationItemPoint from "../PaginationItemPoint";
import Pagination from "../Pagination";
import classes from '../Pagination.module.scss'

interface IProductContainerProps{
    totalCount: number;
    limit: number;
    setItem: (i:number)=>void
    currentPage: number;
}

const PointsPagination: React.FC<IProductContainerProps> = memo(({totalCount, limit, setItem, currentPage}) => {

    const pageCount = Math.ceil(totalCount / limit)
    const pages = []

    for (let i = 0; i < pageCount; i++) {
        pages.push(i)
    }
    return (
        <>
            <Pagination className={classes.gap + ' ' + 'flexRow'}>
                {pages.map(page =>
                    <PaginationItemPoint
                        key={page}
                        active={page===currentPage}
                        onClick={()=> {
                            setItem(page)
                        }}
                    >
                    </PaginationItemPoint>
                )}
            </Pagination>
        </>
    );
});

export default PointsPagination;
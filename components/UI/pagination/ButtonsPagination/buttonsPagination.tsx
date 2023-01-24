import React, {memo} from 'react';
import Pagination from "../Pagination";
import PaginationItemButton from "../PaginationItemButton";
import classes from '../Pagination.module.scss'
import {MoreHoriz} from "@mui/icons-material";

interface IProductContainerProps{
    totalCount: number;
    limit: number;
    setItem: (i:number)=>void
    currentPage: number;
}

const ButtonsPagination: React.FC<IProductContainerProps> = memo(({totalCount, limit, setItem, currentPage}) => {

    const pageCount = Math.ceil(totalCount / limit)
    const pages = []

    for (let i = 0; i < pageCount; i++) {
        pages.push(i)
    }
    return (
        <>
            <Pagination className={classes.page__wrapper + ' ' + classes.gap}>
                {pages.map((page, index) =>{
                    if(index=== pages[0] || (index>=currentPage && index<currentPage+3) || (index<=currentPage && index>currentPage-3) || (index===pages.length-1)){
                        return <PaginationItemButton
                            key={page}
                            active={page===currentPage}
                            onClick={()=> {
                                setItem(page)
                            }}
                        >
                            {page+1}
                        </PaginationItemButton>
                    }

                        if(index<currentPage-1 && index> currentPage-4){
                            return <div style={{display: "flex", justifyContent: "center", alignItems: "center", width: 40, height:40}}>...</div>
                        }
                        if(index>currentPage+1 && index< currentPage+4){
                            return <div style={{display: "flex", justifyContent: "center", alignItems: "center", width: 40, height:40}}>...</div>
                        }



                }

                )}
            </Pagination>
        </>
    );
});

export default ButtonsPagination;
import React, {memo} from 'react';
import classes from "../../../styles/Catalog.module.scss";
import Input from "../inputs/Input";
import {SearchOutlined} from "@mui/icons-material";

interface SearchProps{
    filter: {
        sort: string,
        query:  string,
    };
    setFilter: (filter: {sort: string, query: string})=>void;
}

const Search: React.FC<SearchProps> = memo(({filter, setFilter}) => {
    return (
        <div className={classes.catalog_search}>
            <Input value={filter.query} onChange={e => setFilter({...filter, query: e.target.value})} type={'text'} placeholder={'Введите название марки'}/>
            <div color={'black'}>
                <SearchOutlined/>
            </div>
        </div>
    );
});

export default Search;
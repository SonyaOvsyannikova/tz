import SearchIcon from '@/assets/icons/search.svg?react'
import { useState} from "react";
import {useProductStore} from "@/store/useProductStore.ts";
import cl from './Search.module.scss'


const Search = () => {

    const [inputValue, setInputValue] = useState('');
    const setSearchTerm = useProductStore((s) => s.setSearchTerm);
    const clearSearch = useProductStore((s) => s.clearSearch);

    const debounce = <T extends (...args: any[]) => any>(
        func: T,
        ms: number
    ): (...args: Parameters<T>) => void => {
        let timer: ReturnType<typeof setTimeout>;
        return function(this: ThisParameterType<T>, ...args: Parameters<T>) {
            clearTimeout(timer);
            timer = setTimeout(() => {
                func.apply(this, args);
            }, ms)
        }
    }

    const debouncedSearchTerm = debounce(setSearchTerm, 300)

    const handlerSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newValue = e.target.value;
        setInputValue(newValue);
        if(newValue === '') {
            clearSearch()
        } else {
            debouncedSearchTerm(newValue);
        }
    }

    return (
        <div className={cl.searchHeader}>
            <h2 className={cl.searchTitle}>Товары</h2>
            <div className={cl.searchSection}>
                <SearchIcon
                    className={cl.searchIcon}
                />
                <input
                    className={cl.searchInput}
                    onChange={handlerSearch}
                    value={inputValue}
                    placeholder='Найти'/>
            </div>
        </div>
    );
};

export default Search;
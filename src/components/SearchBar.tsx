//React:
import React, { useState } from "react";
//Components:
//Styles:
import './styles/SearchBar.scss';
//Types:
// import { ITodo } from './types/ITodo';
//Redux:
import { useTypedDispatch } from '../hooks/useTypedDispatch';
import { searchFilterAction } from '../store/reducers/todosFilterReducer';
import { useTypedSelector } from "../hooks/useTypedSelector";


interface SearchBar {

}

const SearchBar: React.FC<SearchBar> = () => {

    const dispatch = useTypedDispatch();
    const todos = useTypedSelector(state => state.todosFilter)

    const inputSearchTextHandler = (e: React.ChangeEvent<HTMLInputElement>): void => {
        dispatch(searchFilterAction(todos, e.target.value));
    }


    return (
        <div className="searchForm">
            <input
                className="searchBar"
                placeholder="...search"
                onChange={inputSearchTextHandler}
            />

        </div>
    )
}

export default SearchBar;
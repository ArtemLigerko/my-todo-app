//React:
import React, { useState } from "react";
//Components:
//Styles:
import './styles/SearchBar.scss';
//Types:
// import { ITodo } from './types/ITodo';
//Redux:
import { useTypedDispatch } from '../hooks/useTypedDispatch';
import { useTypedSelector } from "../hooks/useTypedSelector";
//Redux-Actions:
import { searchFilteredTodos } from '../store/reducers/todosSearchFilterReducer';


interface SearchBar {

}

const SearchBar: React.FC<SearchBar> = () => {

    const filteredTodos = useTypedSelector(state => state.todosFilter);
    const dispatch = useTypedDispatch();

    const inputSearchTextHandler = (e: React.ChangeEvent<HTMLInputElement>): void => {
        dispatch(searchFilteredTodos(filteredTodos, e.target.value));
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
import styled, { css } from 'styled-components';

//Style:
export const TodoInputForm = styled.div`
    display: flex;
    flex-direction: column;
    margin-bottom: 20px;
    border: none;
`
export const InputTodoBar = styled.input`
    font-size: 1.2rem;
    margin-bottom: 10px;
    padding-left: 10px;
    width: 400px;
    height: 40px;
    border-style: none;
    border-radius: 5px 0 0 5px;
    /* border: none; */
    background-color: white;
    &:focus {
        outline: none;
    }
`
export const AddTodoButton = styled.button`
    font-size: 1.2rem;
    /* line-height: 0; */
    padding: 0;
    width: 40px;
    height: 40px;
    background-color: rgb(255, 175, 25);
    /* border: rgb(252, 218, 155) solid 1px; */
    border: none;
    border-radius: 0 5px 5px 0;
    color: rgb(130, 130, 130);
    cursor: pointer;
`
export const OptionButtonsWrapper = styled.div`
    display: flex;
`
export const OptionButtons = styled.button`
    font-size: 1rem;
    margin-right: 5px;
    width: 80px;
    height: 40px;
    background-color: rgb(253, 197, 93);
    border-radius: 5px;
    /* border: rgb(252, 218, 155) solid 1px; */
    border: none;
    color: rgb(130, 130, 130);
    cursor: pointer;
`
export const AddFromServerButton = styled(OptionButtons)``
export const ClearAllButton = styled(OptionButtons)``
export const FilterTodoSelector = styled.select`
    font-size: 1.2rem;
    padding: 0.4rem;
    margin-right: 5px;
    height: 40px;
    color: rgb(130, 130, 130);
    background-color: rgb(253, 197, 93);
    border: none;
    border-radius: 5px;
    cursor: pointer;
    &:focus {
        outline: none;
    }
`

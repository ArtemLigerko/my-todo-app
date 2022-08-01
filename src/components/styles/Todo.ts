import styled from 'styled-components';

//Style:
export const TodoLine = styled.div`
    display: flex;
    padding: 0.5rem 0;
    font-size: 1.2rem;
    border-style: none;
`
export const UpDownTodoButtonsWrapper = styled.div`
    display: flex;
    flex-direction: column;
`

interface ITodoTextArea {
    completed: boolean;
    randColor: number;
}

export const TodoTextArea = styled.li<ITodoTextArea>`
    padding: 0.3rem;
    margin: 0 5px;
    width: 400px;
    list-style-type: none;
    text-align: left;
    font-size: 1.2rem;
    border-radius: 5px;
    text-decoration-line: ${props => props.completed ? 'line-through' : 'none'};
    text-decoration-thickness: ${props => props.completed ? '2px' : 'none'};
    background-color: ${props => {
        switch (props.randColor) {
            case 0: return "#FFE4C4";
            case 1: return "#FFDEAD";
            case 2: return "#DEB887";
            case 3: return "#BC8F8F"; //font-white
            case 4: return "#DAA520";
            case 5: return "#B8860B";
            case 6: return "#D2691E";
            case 7: return "#8B4513";
            case 8: return "#A0522D";
            case 9: return "#A52A2A";
            default: return "white";
        }
    }};
    color: ${props => {
        switch (props.randColor) {
            case 0: return "black";
            case 1: return "black";
            case 2: return "black";
            case 3: return "white"; //font-white
            case 4: return "white";
            case 5: return "white";
            case 6: return "white";
            case 7: return "white";
            case 8: return "white";
            case 9: return "white";
            default: return "black";
        }
    }};
    cursor: grab;
`

export const TodoButtons = styled.button`
    font-size: 1rem;
    width: 2.2rem;
    height: 2rem;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    margin-right: 2px;
`

interface ITodoButton {
    disabledTheme: boolean;
}

export const DoneTodoButton = styled(TodoButtons)<ITodoButton>`
    color: ${props => props.disabledTheme ? 'rgb(180, 180, 180)' : 'rgb(120, 120, 120)'};
    background-color: ${props => props.disabledTheme ? 'rgb(230, 230, 230)' : 'rgb(100, 255, 212)'};
`

export const DelTodoButton = styled(TodoButtons)<ITodoButton>`
    color: ${props => props.disabledTheme ? 'rgb(180, 180, 180)' : 'rgb(120, 120, 120)'};
    background-color: ${props => props.disabledTheme ? 'rgb(230, 230, 230)' : 'rgb(255, 144, 100)'};
`

export const EditTodoButton = styled(TodoButtons)<ITodoButton>`
    width: 3rem;
    color: ${props => props.disabledTheme ? 'rgb(180, 180, 180)' : 'rgb(120, 120, 120)'};
    background-color: ${props => props.disabledTheme ? 'rgb(230, 230, 230)' : 'rgb(255, 175, 25)'};
`

export const TodoEditInput = styled.input`
    padding: 0.3rem;
    margin: 0 5px;
    width: 400px;
    height: 32px;
    font-size: 1.2rem;
    border-style: dotted;
    border-width: 1.8px;
    border-radius: 5px;
    &:focus {
        outline: none;
    }
`

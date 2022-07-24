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
export const DownTodoButton = styled.button`
    font-size: 1rem;
    width: 2.2rem;
    height: 1rem;
    background-color: rgb(155, 218, 255);
    border: rgb(252, 218, 155) solid;
    border-width: 1px 0 1px 0;
    border-radius: 5px;
    color: rgb(120, 120, 120);
    cursor: pointer;
    line-height: 2px;
`
export const UpTodoButton = styled(DownTodoButton)`
    transform: rotate(180deg);
`


// import 'styled-components';

// declare module 'styled-components' {
//     export interface ITodoTextArea {
//         padding: string;
//         margin: string;
//         width: string;
//     }
// }

export const TodoTextArea = styled.li`
    padding: 0.3rem;
    margin: 0 5px;
    width: 400px;
    list-style-type: none;
    text-align: left;
    font-size: 1.2rem;
    border-radius: 5px;
    text-decoration-line: ${(props: { completed: boolean; }) => props.completed ? 'line-through' : 'none'};
    text-decoration-thickness: ${(props: { completed: boolean; }) => props.completed ? '2px' : 'none'};
    ${'' /* color: ${props => props.completed ? 'rgb(180, 180, 180)' : 'black'}; */}
    ${'' /* background-color: ${props => props.completed ? 'rgb(180, 255, 212)' : 'white'}; */}
    background-color: ${(props: { randColor: number; }) => {
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
    color: ${(props: { randColor: number; }) => {
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


export const DoneTodoButton = styled(TodoButtons)`
    color: ${(props: { disabledTheme: boolean; }) => props.disabledTheme ? 'rgb(180, 180, 180)' : 'rgb(120, 120, 120)'};
    background-color: ${(props: { disabledTheme: boolean; }) => props.disabledTheme ? 'rgb(230, 230, 230)' : 'rgb(100, 255, 212)'};
    
`
export const DelTodoButton = styled(TodoButtons)`
    color: ${(props: { disabledTheme: boolean; }) => props.disabledTheme ? 'rgb(180, 180, 180)' : 'rgb(120, 120, 120)'};
    background-color: ${(props: { disabledTheme: boolean; }) => props.disabledTheme ? 'rgb(230, 230, 230)' : 'rgb(255, 144, 100)'};

`
export const EditTodoButton = styled(TodoButtons)`
    width: 3rem;
    color: ${(props: { disabledTheme: boolean; }) => props.disabledTheme ? 'rgb(180, 180, 180)' : 'rgb(120, 120, 120)'};
    background-color: ${(props: { disabledTheme: boolean; }) => props.disabledTheme ? 'rgb(230, 230, 230)' : 'rgb(255, 175, 25)'};
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

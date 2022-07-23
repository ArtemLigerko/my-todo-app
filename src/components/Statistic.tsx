import React from "react";
import styled from "styled-components";
import { useSelector } from "react-redux";
import { useTypedSelector } from "../hooks/useTypedSelector";
import { Icounter } from "./types/Icounter";
 
const StatisticBar = styled.div`
  color: rgb(130, 130, 130);
`


const Statistic: React.FC = ({ counter }: Icounter) => {

    //Redux. Start
    const counterCreated = useTypedSelector(state => state.statistic.counterCreated)
    const counterUpdated = useTypedSelector(state => state.statistic.counterUpdated)
    const counterDeleted = useTypedSelector(state => state.statistic.counterDeleted)
    //Redux. End

    return (
        <StatisticBar>
            <div>
                <b>Statistic: </b>
                created: {counter.counterCreated};
                updated: {counter.counterUpdated};
                deleted: {counter.counterDeleted};
            </div>
            <div>
                <b>Statistic (redux): </b>
                created: {counterCreated};
                updated: {counterUpdated};
                deleted: {counterDeleted};
            </div>
        </StatisticBar>
    )
}

export default Statistic;

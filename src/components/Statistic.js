import React from "react";
import styled from "styled-components";
import { useSelector } from "react-redux";

const StatisticBar = styled.div`
  color: rgb(130, 130, 130);
`



function Statistic({ counter }) {

    //Redux. Start
    const counterCreated = useSelector(state => state.statistic.counterCreated)
    const counterUpdated = useSelector(state => state.statistic.counterUpdated)
    const counterDeleted = useSelector(state => state.statistic.counterDeleted)
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

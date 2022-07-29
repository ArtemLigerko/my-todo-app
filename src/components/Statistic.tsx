//React:
import React from "react";
//Styles:
import { StatisticBar } from './styles/Statistic'
//Redux:
import { useTypedSelector } from "../hooks/useTypedSelector";
 

const Statistic: React.FC = () => {

    const counterCreated = useTypedSelector(state => state.statistic.counterCreated)
    const counterUpdated = useTypedSelector(state => state.statistic.counterUpdated)
    const counterDeleted = useTypedSelector(state => state.statistic.counterDeleted)

    return (
        <StatisticBar>
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

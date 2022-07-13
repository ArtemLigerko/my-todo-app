import React from "react";
import styled from "styled-components";

const StatisticBar = styled.div`
  color: rgb(130, 130, 130);
`

function Statistic({ counter }) {
    return (
        <StatisticBar>
            <b>Statistic: </b>
            {/* created: {counter[0]};
            updated: {counter[1]};
            deleted: {counter[2]}; */}
            created: {counter.counterCreated};
            updated: {counter.counterUpdated};
            deleted: {counter.counterDeleted};
        </StatisticBar>
    )
}

export default Statistic;
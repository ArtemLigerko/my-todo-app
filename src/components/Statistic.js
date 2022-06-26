import React from "react";

function Statistic({ counter }) {
    return (
        <div>
            <b>Statistic: </b>
            {/* created: {counter[0]};
            updated: {counter[1]};
            deleted: {counter[2]}; */}
            created: {counter.counterCreated};
            updated: {counter.counterUpdated};
            deleted: {counter.counterDeleted};
        </div>
    )
}

export default Statistic;
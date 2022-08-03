import { StatisticActionTypes, StatisticState, StatisticAction } from '../types/statistic'
import { createAction, createReducer } from '@reduxjs/toolkit';

const initialState: StatisticState = {
  counterCreated: 0,
  counterUpdated: 0,
  counterDeleted: 0,
}

// export const addCreateCountAction = (payload: number) => ({ type: StatisticActionTypes.CREATE_COUNT, payload });
// export const addUpdateCountAction = (payload: number) => ({ type: StatisticActionTypes.UPDATE_COUNT, payload });
// export const addDeleteCountAction = (payload: number) => ({ type: StatisticActionTypes.DELETE_COUNT, payload });

const addCreateCountAction = createAction(StatisticActionTypes.CREATE_COUNT);
const addUpdateCountAction = createAction(StatisticActionTypes.UPDATE_COUNT);
const addDeleteCountAction = createAction(StatisticActionTypes.DELETE_COUNT);

export default createReducer(initialState, {
  [addCreateCountAction]: function (state) {
    state.counterCreated = state.counterCreated + 1;
  },
  [addUpdateCountAction]: function (state) {
    state.counterUpdated = state.counterUpdated + 1;
  },
  [addDeleteCountAction]: function (state) {
    state.counterDeleted = state.counterDeleted + 1;
  }
});

// export default statisticToolkitReducer;

// export const statisticReducer = (state = initialState, action: StatisticAction): StatisticState => {  // action = {type: "", payload: "?"}
//   switch (action.type) {
//     case StatisticActionTypes.CREATE_COUNT:
//       return { ...state, counterCreated: state.counterCreated + action.payload }
//     case StatisticActionTypes.UPDATE_COUNT:
//       return { ...state, counterUpdated: state.counterUpdated + action.payload }
//     case StatisticActionTypes.DELETE_COUNT:
//       return { ...state, counterDeleted: state.counterDeleted + action.payload }

//     default:
//       return state;
//   }
// }




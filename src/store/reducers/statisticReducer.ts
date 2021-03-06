import {StatisticActionTypes, StatisticState, StatisticAction} from '../types/statistic'


const defaultState: StatisticState = {
  counterCreated: 0,
  counterUpdated: 0,
  counterDeleted: 0,
}


export const statisticReducer = (state = defaultState, action: StatisticAction): StatisticState => {  // action = {type: "", payload: "?"}
  switch (action.type) {
    case StatisticActionTypes.CREATE_COUNT:
      return { ...state, counterCreated: state.counterCreated + action.payload }
    case StatisticActionTypes.UPDATE_COUNT:
      return { ...state, counterUpdated: state.counterUpdated + action.payload }
    case StatisticActionTypes.DELETE_COUNT:
      return { ...state, counterDeleted: state.counterDeleted + action.payload }

    default:
      return state;
  }
}




import { StatisticActionTypes } from '../types/statistic'

export const addCreateCountAction = (payload: number) => ({ type: StatisticActionTypes.CREATE_COUNT, payload });
export const addUpdateCountAction = (payload: number) => ({ type: StatisticActionTypes.UPDATE_COUNT, payload });
export const addDeleteCountAction = (payload: number) => ({ type: StatisticActionTypes.DELETE_COUNT, payload });

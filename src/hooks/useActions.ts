import { useDispatch } from "react-redux"
import { bindActionCreators } from "redux";
import * as StatisticActionCreators from '../store/action-creators/statistic'


export const useActions = () => {
    const dispatch = useDispatch();
    return bindActionCreators(StatisticActionCreators, dispatch)
}
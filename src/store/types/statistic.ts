export enum StatisticActionTypes {
    CREATE_COUNT = "CREATE_COUNT",
    UPDATE_COUNT = "UPDATE_COUNT",
    DELETE_COUNT = "DELETE_COUNT",
}

export interface StatisticState {
    counterCreated: number;
    counterUpdated: number;
    counterDeleted: number;
}

export interface StatisticAction {  //если в action поступают данные разных типов, то необходимо создавать interface для каждого action
    type: string;
    payload?: number;
}


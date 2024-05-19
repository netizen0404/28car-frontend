import { combineReducers } from 'redux';

const WebInitState = {

    carList: [],
    targetList: null,
    selectedBrand: "豐田",
    searchResult: "",
    searchYear: "",
    // pages: null,
    // timeInterval: null,
    // profileUpdateInterval: null,
    // numOfCars: null,
    pages: 80,
    initPages: 500,
    timeInterval: 30,
    profileUpdateInterval: 96,
    numOfCars: 1,
    notice: null,
    fetchState: null,
    accountsList:[],
    updateTime: null
};

const project = function (state = WebInitState ,action){
    switch(action.type){
        case "CAR_LIST":
            return {
                ...state,
                carList: action.newCarList
            }        
        case "CHANGE_TARGETLIST":
            return {
                ...state,
                targetList: action.targetList
            }    
        case "SELECT_BRAND":
            return {
                ...state,
                selectedBrand: action.selectedBrand,
                targetList: action.targetList
            }     
        case "SEARCH_RESULT":
            return {
                ...state,
                searchResult: action.searchResult
            }
        case "SEARCH_YEAR":
            return {
                ...state,
                searchYear: action.searchYear
            }      
        case "SEARCH_CAR":
            return {
                ...state,
                targetList: {
                    ...state.targetList,
                    cars: action.searchList
                }
            }
        case "SET_PAGES":
            return {
                ...state,
                pages: action.pages
            }
        case "SET_INITPAGES":
            return {
                ...state,
                initPages: action.initPages
            }
        case "SET_TIME":
            return {
                ...state,
                timeInterval: action.timeInterval
            }
        case "SET_PROFILE":
            return {
                ...state,
                profileUpdateInterval: action.profileUpdateInterval
            }
        case "SET_NUMOFCARS":
            return {
                ...state,
                numOfCars: action.numOfCars
            }
        case "FETCH_CARS":
            return {
                ...state,
                fetchState: action.fetchState
            }
        case "NOTICE_LIST":
            return {
                ...state,
                notice: action.notice
            }
        case "SET_NOTICE":
            let duplicate = state.notice.find(ele=>ele._id.brand===action.carElement._id.brand && ele._id.model===action.carElement._id.model && ele._id.capacity===action.carElement._id.capacity && ele._id.transmission===action.carElement._id.transmission && ele._id.year===action.carElement._id.year);
            // duplicate? console.log("duplicate"): console.log("null");
            return duplicate? state : {
                ...state,
                notice: [...state.notice, action.carElement]
            }
        case "SET_ACCOUNT":
            return state

            // return {
            //     ...state,
            //     notice: [...state.notice, action.carElement]
            //     // notice: state.notice.push(action.carElement)   //大錯特錯 依個舊方法咁寫係mutable
            // }
        case "UNSET_ACCOUNT":
            return state

        case "GET_ACCOUNTS":
            return {
                ...state,
                accountsList: action.accountsList
            }
        case "UPDATE_TIME":
            return {
                ...state,
                updateTime: action.updateTime
            }
        default:
            return state;
    }
}


const projectReducer = combineReducers({
    project: project
})

export default projectReducer;
import { batch } from 'react-redux'

export const searchCar = function(words){
    return function(dispatch, getState) {
        let stateFromStore = getState();

        dispatch({type: "SEARCH_CAR",
        searchList: stateFromStore.project.targetList.cars.filter((ele)=>{
            return ele._id.model.indexOf(words)>=0;
        })})
    }
}

export const changeTargetList = function(list){
    return {
        type: "CHANGE_TARGETLIST",
        targetList: list
    }
}

export const searchResult = function(word){
    return {
        type: "SEARCH_RESULT",
        searchResult: word
    }
}

export const searchYear = function(year){
    return {
        type: "SEARCH_YEAR",
        searchYear: year
    }
}


export const selectBrand = function(brand){
    return function(dispatch, getState) {
        let stateFromStore = getState();
        let list = stateFromStore.project.carList.find((ele)=>{
            return ele._id===brand
        })

        dispatch({
            type: "SELECT_BRAND",
            selectedBrand: brand,
            targetList: list
        });
        
    }
}

export const fetchCarList = function(){   //依個係一個middleware 佢係用黎應付async既東西  此刻個action creator唔再return object 而係return function出黎，掟啲dispatch getState畀你 幫你執行個function 你再自己搞野
    return function(dispatch,getState){ //準備兩個params 畀react 果邊dispatch()掟野入黎  佢會掟個dispatch 同getSotre入黎  如果你唔準備params畀佢掟function入黎你係用唔到dispatch同getStore
        let stateFromStore = getState();

        fetch("/brands").then(res=>res.json()).then(data=>{

            batch(() => {
                dispatch({
                    type: "CAR_LIST",
                    newCarList: data
                })
                dispatch(selectBrand(stateFromStore.project.selectedBrand))
              })

        }).catch(error=>console.log(error));
    }
}

export const fetchNotice = function(){   //依個係一個middleware 佢係用黎應付async既東西  此刻個action creator唔再return object 而係return function出黎，掟啲dispatch getState畀你 幫你執行個function 你再自己搞野
    return function(dispatch,getState){ //準備兩個params 畀react 果邊dispatch()掟野入黎  佢會掟個dispatch 同getSotre入黎  如果你唔準備params畀佢掟function入黎你係用唔到dispatch同getStore
        let stateFromStore = getState();
        fetch("/notice").then(res=>res.json()).then(data=>{
            batch(()=>{
                dispatch({
                    type: "NOTICE_LIST",
                    notice: data.data
                })
                dispatch({
                    type: "UPDATE_TIME",
                    updateTime: new Date(data.updateTime).toLocaleTimeString()
                })
            })
        }).catch(error=>console.log(error));
    }
}

export const setSearchTime= function(timeInterval){   //依個係一個middleware 佢係用黎應付async既東西  此刻個action creator唔再return object 而係return function出黎，掟啲dispatch getState畀你 幫你執行個function 你再自己搞野
    return function(dispatch,getState){ //準備兩個params 畀react 果邊dispatch()掟野入黎  佢會掟個dispatch 同getSotre入黎  如果你唔準備params畀佢掟function入黎你係用唔到dispatch同getStore
        let stateFromStore = getState();

        fetch("/settings/time-interval",{
            method: "POST",
            headers: {
                "content-type":"application/json"
            },
            body: JSON.stringify({
                timeInterval: timeInterval,
            })
        }).then(res=>res.json()).then(data=>{
            if(data.success){
                dispatch({
                    type: "SET_TIME",
                    timeInterval: timeInterval
                })
            }
        }).catch(error=>console.log(error));
    }
}

export const setInitPages= function(initPages){   //依個係一個middleware 佢係用黎應付async既東西  此刻個action creator唔再return object 而係return function出黎，掟啲dispatch getState畀你 幫你執行個function 你再自己搞野
    return function(dispatch,getState){ //準備兩個params 畀react 果邊dispatch()掟野入黎  佢會掟個dispatch 同getSotre入黎  如果你唔準備params畀佢掟function入黎你係用唔到dispatch同getStore
        let stateFromStore = getState();

        fetch("/settings/init",{
            method: "POST",
            headers: {
                "content-type":"application/json"
            },
            body: JSON.stringify({
                initPages: initPages,
            })
        }).then(res=>res.json()).then(data=>{
            if(data.success){
                dispatch({
                    type: "SET_INITPAGES",
                    initPages: initPages
                })
            }
        }).catch(error=>console.log(error));
    }
}

export const setSearchPages= function(pages){   //依個係一個middleware 佢係用黎應付async既東西  此刻個action creator唔再return object 而係return function出黎，掟啲dispatch getState畀你 幫你執行個function 你再自己搞野
    return function(dispatch,getState){ //準備兩個params 畀react 果邊dispatch()掟野入黎  佢會掟個dispatch 同getSotre入黎  如果你唔準備params畀佢掟function入黎你係用唔到dispatch同getStore
        let stateFromStore = getState();

        fetch("/settings/pages",{
            method: "POST",
            headers: {
                "content-type":"application/json"
            },
            body: JSON.stringify({
                pages: pages,
            })
        }).then(res=>res.json()).then(data=>{
            if(data.success){
                dispatch({
                    type: "SET_PAGES",
                    pages: pages
                })
            }
        }).catch(error=>console.log(error));
    }
}

export const setProfileUpdate= function(profileUpdateInterval){   //依個係一個middleware 佢係用黎應付async既東西  此刻個action creator唔再return object 而係return function出黎，掟啲dispatch getState畀你 幫你執行個function 你再自己搞野
    return function(dispatch,getState){ //準備兩個params 畀react 果邊dispatch()掟野入黎  佢會掟個dispatch 同getSotre入黎  如果你唔準備params畀佢掟function入黎你係用唔到dispatch同getStore
        let stateFromStore = getState();

        fetch("/settings/profile-update/interval",{
            method: "POST",
            headers: {
                "content-type":"application/json"
            },
            body: JSON.stringify({
                profileUpdateInterval: profileUpdateInterval,
            })
        }).then(res=>res.json()).then(data=>{
            if(data.success){
                dispatch({
                    type: "SET_PROFILE",
                    profileUpdateInterval: profileUpdateInterval
                })
            }
        }).catch(error=>console.log(error));
    }
}

export const setProfileCarUpdate= function(numOfCars){   //依個係一個middleware 佢係用黎應付async既東西  此刻個action creator唔再return object 而係return function出黎，掟啲dispatch getState畀你 幫你執行個function 你再自己搞野
    return function(dispatch,getState){ //準備兩個params 畀react 果邊dispatch()掟野入黎  佢會掟個dispatch 同getSotre入黎  如果你唔準備params畀佢掟function入黎你係用唔到dispatch同getStore
        let stateFromStore = getState();

        fetch("/settings/profile-update/cars",{
            method: "POST",
            headers: {
                "content-type":"application/json"
            },
            body: JSON.stringify({
                numOfCars: numOfCars,
            })
        }).then(res=>res.json()).then(data=>{
            if(data.success){
                dispatch({
                    type: "SET_NUMOFCARS",
                    numOfCars: numOfCars
                })
            }
        }).catch(error=>console.log(error));
    }
}

export const getSetting= function(){   //依個係一個middleware 佢係用黎應付async既東西  此刻個action creator唔再return object 而係return function出黎，掟啲dispatch getState畀你 幫你執行個function 你再自己搞野
    return function(dispatch,getState){ //準備兩個params 畀react 果邊dispatch()掟野入黎  佢會掟個dispatch 同getSotre入黎  如果你唔準備params畀佢掟function入黎你係用唔到dispatch同getStore
        let stateFromStore = getState();

        fetch("/settings").then(res=>res.json()).then(data=>{
            if(data.success){
                batch(()=>{
                    if(data.pages){
                        dispatch({
                            type: "SET_PAGES",
                            pages: data.pages,
                        })
                    }
                    if(data.timeInterval){
                        dispatch({
                            type: "SET_TIME",
                            timeInterval: data.timeInterval
                        })
                    }
                    if(data.profileUpdateInterval){
                        dispatch({
                            type: "SET_PROFILE",
                            profileUpdateInterval: data.profileUpdateInterval
                        })
                    }
                    if(data.numOfCars){
                        dispatch({
                            type: "SET_NUMOFCARS",
                            numOfCars: data.numOfCars
                        })
                    }
                    if(data.initPages){
                        dispatch({
                            type: "SET_INITPAGES",
                            initPages: data.initPages
                        })
                    }
                })
            }
        }).catch(error=>console.log(error));
    }
}

export const fetchCars = function(pages){
    
    return function(dispatch, getState){
        dispatch({
            type: "FETCH_CARS",
            fetchState: "loading"
        })
        fetch("/get-page", {
            method: "POST",
            headers: {
                "content-type": "application/json"
            },
            body: JSON.stringify({
                pages
            })
        }).then(res=>res.json()).then(data=>{
            
            console.log(data);
            if(data.success){
                batch(()=>{
                    dispatch({
                        type: "FETCH_CARS",
                        fetchState: "done"
                    })
                    dispatch(fetchCarList());
                })
            }
        }).catch(error=>console.log(error));
    }
}

export const autoFetch = function(pages){
    return function(dispatch, getState){
        fetch("/auto-fetch").then(res=>res.json()).then(data=>{
            if(data.success){
                console.log("auto fetch success");
            }
        }).catch(error=>console.log(error));
    }
}

export const setAccount = function(name, email, password){
    return function(dispatch, getState){
        fetch("/set-account", {
            method: "POST",
            headers: {
                "content-type": "application/json"
            },
            body: JSON.stringify({
                name,
                email,
                password
            })
        }).then(res=>res.json()).then(data=>{
            console.log(data);
            if(data.success){
                dispatch({
                    type: "SET_ACCOUNT"
                })
                dispatch(getAccounts());
            }
        })
    }
}

export const unsetAccount = function(id){
    return function(dispatch, getState){
        fetch("/unset-account", {
            method: "POST",
            headers: {
                "content-type": "application/json"
            },
            body: JSON.stringify({
                id: id
            })
        }).then(res=>res.json()).then(data=>{
            console.log(data);
            if(data.success){
                dispatch({
                    type: "UNSET_ACCOUNT"
                })
                dispatch(getAccounts());
            }
        })
    }
}

export const getAccounts = function(){
    return function(dispatch, getState){
        fetch("/accounts").then(res=>res.json()).then(data=>{
            dispatch({
                type: "GET_ACCOUNTS",
                accountsList: data
            })
        })
    }
}
// .catch(error=>console.log(error));
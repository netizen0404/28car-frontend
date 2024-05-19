import React, {useEffect} from "react";
import { useSelector, useDispatch } from 'react-redux';
import { CarInfo } from "../Car/Car.js";
// import { getSetting ,fetchCarList,fetchMonitoring} from "../../actions";
import { getSetting ,fetchCarList, fetchNotice} from "../../actions";
import { batch } from 'react-redux'


function TargetList(props){
    const notice = useSelector(function(state){
        return state.project.notice
    })
    
    const dispatch = useDispatch();

    useEffect(()=>{
        batch(()=>{
            dispatch(fetchCarList());
            dispatch(fetchNotice());
        })
    },[])

    return(
        <div>
            {
                notice? notice.map((ele, index)=>{
                    // return <CarInfo key={ele._id.model + ele._id.year + ele._id.capacity + ele._id.transmission + index} car={ele}/>
                    return <div key={ele._id.model + ele._id.year + ele._id.capacity + ele._id.transmission + index}> {ele._id.brand}<CarInfo car={ele}/></div>
                }):null
            }
        </div>
    )
}

export {TargetList};
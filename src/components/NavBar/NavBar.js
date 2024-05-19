import React from "react";
import {
    BrowserRouter as Router, Switch, Route, useParams, useLocation, Link, useRouteMatch, Redirect, useHistory
} from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux';
import { batch } from 'react-redux'
import {searchResult, searchYear} from "../../actions"

import appStyle from "./style.module.css"
import SetIcon from '@mui/icons-material/Settings';
// import Button from '@material-ui/core/Button';
import Button from '@mui/material/Button';

import DeleteIcon from '@mui/icons-material/Delete';
import HomeIcon from '@mui/icons-material/Home';
import NotificationsActiveIcon from '@mui/icons-material/NotificationsActive';

function Nav(){

    const dispatch = useDispatch();

    const updateTime = useSelector(function(state){
        return state.project.updateTime
    })

    let { path, url } = useRouteMatch();

    const history = useHistory();

    function clearSearch(){

        batch(()=>{
            dispatch(searchResult());
            dispatch(searchYear());
        })
    }

    function toSetting(){
        history.push("/settings");
        clearSearch();
    }

    function toMonitor(){
        history.push("/targets");
        clearSearch();
    }

    function toMain(){
        history.push("/");
    }
    
    return (
        <div className={appStyle.container}>
            {url.indexOf("targets")>=0?
            <div className={appStyle.navFont}>價格調低的車輛  更新時間：{updateTime}</div>
            :<div className={appStyle.navFont} style={{fontWeight:"bold"}}>BOBBY USED CAR TRADING LIMITED</div>}
            <div className={appStyle.navContainer}>
                {/* <SetIcon className={appStyle.navSetFont}/> */}
                <Button className={appStyle.navSetFont} onClick={toSetting} sx={{ color: "#001f5a" }}><SetIcon className={appStyle.navSetFont}/>設定</Button>
                {
                    url.indexOf("targets")>=0?
                    <div className={appStyle.navContainer}>
                        {/* <HomeIcon className={appStyle.navSetFont}/> */}
                        <Button className={appStyle.navSetFont} onClick={toMain} sx={{ color: "#001f5a" }}><HomeIcon className={appStyle.navSetFont}/> 返回主頁</Button>
                    </div>
                    :<div className={appStyle.navContainer}>
                        {/* <NotificationsActiveIcon className={appStyle.navSetFont}/> */}
                        <Button className={appStyle.navSetFont} onClick={toMonitor} sx={{ color: "#001f5a" }}><NotificationsActiveIcon className={appStyle.navSetFont}/>瀏覽降價車輛</Button>
                    </div>
                }
            </div>
        </div>
    )
}

export default Nav;
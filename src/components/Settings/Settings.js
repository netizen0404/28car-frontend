// import './App.css';
import React, { useState, useEffect } from "react";
import { batch } from 'react-redux'
import {
    BrowserRouter as Router, Switch, Route, useParams, useLocation, Link, useRouteMatch, Redirect, useHistory
} from "react-router-dom";
import { connect, useSelector, useDispatch } from "react-redux";

import appStyle from "./style.module.css"
// import HomeIcon from '@mui/icons-material/Home';
import ArrowIcon from '@mui/icons-material/ArrowBackOutlined';
import Box from '@mui/material/Box';
import { TextField } from '@mui/material';

import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

import Button from '@mui/material/Button';
// import Button from "@material-ui/core/Button"
import Stack from '@mui/material/Stack';
import SaveIcon from '@mui/icons-material/Save';

import useInput from "../InputBox/InputBox.js";
import {setSearchPages,setSearchTime, setInitPages, setProfileUpdate, setProfileCarUpdate,getSetting, setAccount, getAccounts, unsetAccount} from "../../actions"

function Setting(){

    const dispatch = useDispatch();

    let { path, url } = useRouteMatch();

    const history = useHistory();

    function toMainPage(){
        history.push("/");
    }

    function toSetPage(){
        history.push(`${url}/page`);
    }

    function toSetUpdate(){
        history.push(`${url}/update`);
    }
    const toAccountPage = ()=>{
        history.push(`${url}/account`);
    }

    useEffect(()=>{
        dispatch(getSetting()); 
    },[])

    return(
        <div className={appStyle.settingContainer}>
            
            <Redirect to={`${url}/page`}/>
            <div className={appStyle.container}>
                <div className={appStyle.align}>
                    <ArrowIcon className={appStyle.arrowIcon} fontSize="large" onClick={toMainPage}/>
                    {/* <ArrowIcon className={appStyle.arrowIcon} fontSize="large" onClick={()=>history.goBack()}/> */}
                    <span>設定</span>
                </div>
                <div className={appStyle.settingButton}>
                    <Button sx={{color:"#001f5a", fontWeight:"bold"}} onClick={toSetPage}>
                        搜索設定
                    </Button>
                    <Button sx={{color:"#001f5a", fontWeight:"bold"}} onClick={toSetUpdate}>
                        更新profile設定
                    </Button> 
                    <Button sx={{color:"#001f5a", fontWeight:"bold"}} onClick={toAccountPage}>
                        帳號
                    </Button>
                </div>
            </div>
            <div className={appStyle.accountContent}>
                <Route path={`${path}/page`}>
                    <Page/>
                </Route>
                <Route path={`${path}/update`}>
                    <Update/>
                </Route>
                <Route path={`${path}/account`}>
                    <Account />
                </Route>
            </div>
            {/* <HomeIcon onClick={toMainPage}/> */}
        </div>
    )
}

function Page(){

    const dispatch = useDispatch();

    const {initPages, pages,timeInterval} = useSelector(state=>{
        return {
            initPages: state.project.initPages,
            pages: state.project.pages,
            timeInterval: state.project.timeInterval
        }
    });

    // useEffect(()=>{
    //     dispatch(getSearchSetting());
    // });

    // const pages = useSelector(state=>state.project.pages);

    const [pageInput, setPageInput] = useInput();
    const [timeInput, setTimeInput] = useInput();
    const [initInput,setInitInput] = useState();

    // console.log(pageInput);
    // console.log(timeInput);

    return(
        <div className={appStyle.searchContent}>
            <div className={appStyle.searchContainer}>
                <div>設定初始搜尋頁數</div>
                <TextField onChange={(e)=>setInitInput(e.target.value)} value={initInput} variant="standard" label="輸入頁數" id="outlined-number" type="number" placeholder={`目前搜尋頁數: ${initPages}`} InputLabelProps={{ shrink: true,}}/>
            </div>
            <div className={appStyle.searchContainer}>
                <div>設定每次搜尋頁數</div>
                <TextField onChange={(e)=>setPageInput(e.target.value)} value={pageInput} variant="standard" label="輸入頁數" id="outlined-number" type="number" placeholder={`目前搜尋頁數: ${pages}`} InputLabelProps={{ shrink: true,}}/>
            </div>
            <div className={appStyle.searchContainer}>
                <div>每次搜尋間隔時間</div>
                <FormControl variant="standard" sx={{ m: 1, minWidth: 180 }}>
                    <InputLabel id="demo-simple-select-label">{`目前搜尋間隔: ${timeInterval}分鐘`}</InputLabel>
                    {/* <InputLabel id="demo-simple-select-label">間隔</InputLabel> */}
                    <Select onChange={(e)=>setTimeInput(e.target.value)} value={timeInput} variant="standard" labelId="demo-simple-select-label" id="demo-simple-select">
                        <MenuItem value={15}>15分鐘</MenuItem>
                        <MenuItem value={30}>30分鐘</MenuItem>
                        <MenuItem value={60}>60分鐘</MenuItem>
                        <MenuItem value={90}>90分鐘</MenuItem>
                    </Select>
                </FormControl>
            </div>
            <Stack direction="row" spacing={2}>
                <Button onClick={()=>{
                    batch(()=>{ 
                        // pageInput? dispatch(setSearchPages(pageInput)): null;
                        // timeInput? dispatch(setSearchTime(timeInput)): null;
                        if(initInput && initInput>0){
                            dispatch(setInitPages(initInput));
                        }
                        if(pageInput && pageInput>0){
                            dispatch(setSearchPages(pageInput));
                        }
                        if(timeInput){
                            dispatch(setSearchTime(timeInput));
                        }
                    })}} variant="contained" endIcon={<SaveIcon />}>
                    Save
                </Button>
            </Stack>
        </div>
    )
}

function Update(){

    const dispatch = useDispatch();

    const profileUpdateInterval = useSelector(state=>state.project.profileUpdateInterval);
    const numOfCars = useSelector(state=>state.project.numOfCars);

    const [carUpdate, setCarUpdate] = useInput();

    const [updateInput, setUpdateInput] = useInput();
    // console.log(updateInput);


    return(
        <div className={appStyle.searchContent}>
            <Box>
                {/* <div className={appStyle.searchContainer}>
                    <div>設定每次更新車輛數</div>
                    <TextField onChange={(e)=>setCarUpdate(e.target.value)} value={carUpdate} variant="standard" label="" id="outlined-number" type="number" placeholder={`目前更新車輛數: ${numOfCars}`} InputLabelProps={{ shrink: true,}}/>
                </div> */}
                <div>
                    <div>更新Profile間隔時間</div>
                    <FormControl variant="filled" sx={{ m: 1, minWidth: 180 }}>
                        <InputLabel  id="demo-simple-select-label-2">{`目前更新間隔：${profileUpdateInterval}分鐘`}</InputLabel>
                        <Select
                            onChange={(e)=>setUpdateInput(e.target.value)} value={updateInput}
                            // labelId="demo-simple-select-label"
                            // id="demo-simple-select"
                            label="Age"
                        >
                            <MenuItem value={96}>96分鐘</MenuItem>
                            <MenuItem value={120}>120分鐘</MenuItem>
                            <MenuItem value={144}>144分鐘</MenuItem>
                        </Select>
                    </FormControl>
                </div>
            </Box>
            <Stack direction="row" spacing={2}>
                <Button onClick={()=>{
                    batch(()=>{ 
                        if(carUpdate && carUpdate>0){
                            dispatch(setProfileCarUpdate(carUpdate));
                        }
                        if(updateInput){
                            dispatch(setProfileUpdate(updateInput));
                        }
                    })}} variant="contained" endIcon={<SaveIcon />}>
                    Save
                </Button>
            </Stack>
            {/* <img src="http://localhost:3200/28car.png"/> */}
        </div>
    )
}

function Account(props){
    const [nameValue, setNameValue] = useState("");
    const [emailValue, setEmailValue] = useState("");
    const [passwordValue, setPasswordValue] = useState("");
    const [inputType, setInputType] = useState("password");

    const accounts = useSelector(state=>state.project.accountsList);

    const dispatch = useDispatch();

    useEffect(()=>{
        dispatch(getAccounts());
    },[])
    const changeInputType = ()=>{
        setInputType(()=>{
            if(inputType === "password"){
                return "text";
            }else{
                return "password";
            }
        })
    }

    const handleNameValue = (e)=>{
        setNameValue(()=>{
            return e.target.value;
        })
    }

    const handleEmailValue = (e)=>{
        setEmailValue(()=>{
            return e.target.value;
        })
    }

    const handlePasswordValue = (e)=>{
        setPasswordValue(()=>{
            return e.target.value;
        })
    }
    console.log(accounts);
    return(
        <div className={appStyle.accountContainer}>
            <div className={appStyle.setAccountContainer}>
                <div className={appStyle.accountTitle}>新增帳號</div>
                <div>
                    <input type="text" placeholder="帳號名稱" value={nameValue} onChange={handleNameValue} className={appStyle.input}></input>
                </div>
                <div>
                    <input type="text" placeholder="電郵或傳真" value={emailValue} onChange={handleEmailValue} className={appStyle.input}></input>
                </div>
                <div>
                    <input type={inputType} placeholder="密碼" value={passwordValue} onChange={handlePasswordValue} className={appStyle.input}></input>
                    <input type="checkbox" onClick={changeInputType} />顯示密碼
                </div>
                <div>
                    <Button onClick={()=>{
                        dispatch(setAccount(nameValue, emailValue, passwordValue))
                        setNameValue(()=>{
                            return "";
                        })
                        setPasswordValue(()=>{
                            return "";
                        })
                        setEmailValue(()=>{
                            return "";
                        })
                    }}>確認</Button>
                </div>
            </div>
            <div className={appStyle.accountsList}>
                <div className={appStyle.accountTitle}>帳號列表</div>
                <div>
                    {
                        accounts.map((ele)=>{
                            return <AccountList key={ele._id + ele.name + ele.email} data={ele}/>
                        })
                    }
                </div>
            </div>
        </div>
    )
}

function AccountList(props){
    const [showImg, setShowImg] = useState(false);
    const dispatch = useDispatch();

    const handleShowImg = ()=>{
        setShowImg(()=>{
            return !showImg;
        })
    }
    return(
        <div className={appStyle.accountListInner}>
            <div>{props.data.name}</div>
            
            {
                showImg?<div>
                    <Button onClick={handleShowImg}>Hide Img</Button>
                    <div>
                        <img src={`http://localhost:3200/${props.data.name}28car.png`}/>
                    </div>
                </div>:<Button onClick={handleShowImg}>Show Img</Button>
            }
            
            <div>
                <Button onClick={()=>dispatch(unsetAccount(props.data._id))}>移除帳號</Button>
            </div>
        </div>
    )
}

export default Setting;
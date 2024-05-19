import React from "react";
import { render } from "react-dom";
import "./styles.css";
import {
    BrowserRouter as Router, Switch, Route, useParams, useLocation, Link, useRouteMatch, Redirect, useHistory
} from "react-router-dom";
import { connect, useSelector, useDispatch } from "react-redux";
import appStyle from "./style.module.css"

import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';


import Input from '@mui/material/Input';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';

// import Button from '@material-ui/core/Button';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import SaveIcon from '@mui/icons-material/Save';

import IconButton from '@mui/material/IconButton';
import FilledInput from '@mui/material/FilledInput';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputAdornment from '@mui/material/InputAdornment';
import FormHelperText from '@mui/material/FormHelperText';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';

import useInput from "../InputBox/InputBox.js"
import { useEffect, useState ,Component} from "react";
import { batch } from 'react-redux'

import {searchResult, searchYear, fetchCarList,selectBrand,autoFetch, searchCar,fetchCars,setNotice,unsetNotice} from "../../actions"
import {setSearchPages,setSearchTime, setProfileUpdate,getSetting} from "../../actions"

import { FixedSizeList as List } from "react-window";
import AutoSizer from "react-virtualized-auto-sizer";

const PureCarInfo=React.memo(CarInfo);
const PureCarList=React.memo(CarList);
const PurePriceList=React.memo(PriceList);
const PureCarInput=React.memo(CarInput);

function Main(){

    const dispatch = useDispatch();

    const { list, targetList,selectedBrand, searchResult,searchYear }=useSelector(state=>{
        return{
            list: state.project.carList,
            targetList: state.project.targetList,
            selectedBrand: state.project.selectedBrand,
            searchResult: state.project.searchResult,
            searchYear: state.project.searchYear
        }
    })

    const Cars = ({ index, style }) => (
        <div className={index % 2 ? "ListItemOdd" : "ListItemEven"} style={style}>
          {searchList? <CarInfo car={searchList[index]} /> : <CarInfo car={targetList[index]}/>}
        </div>
    );


    console.log(targetList);
    console.log(list);

    let searchList = targetList? targetList.cars:[];


    if(searchResult){
        searchList = targetList.cars.filter((ele)=>ele._id.model.toLowerCase().indexOf(searchResult.toLowerCase())>=0);
    }

    if(searchYear){
        searchList? searchList = searchList.filter((ele)=>ele._id.year.toString().indexOf(searchYear.toString())>=0)
        : searchList = targetList.cars.filter((ele)=>ele._id.year.toString().indexOf(searchYear.toString())>=0);
    }

    useEffect(()=>{
        batch(()=>{
            dispatch(fetchCarList());
            dispatch(getSetting());
        })
    },[])
    return (
        <div className={appStyle.flex}>
            <div className={appStyle.brandContainer}>
                {list.map((ele,index)=>{
                    return ele._id? <BrandList brand={ele._id} key={ele._id+index}/>: null;
                })} 
            </div>
            <div className={appStyle.searchBar}>
                <SearchBar/>
            </div>
            <div className={appStyle.searchBar}>
                <FetchCars/>
            </div>
            <div  className={appStyle.carList} style={{backgroundColor:"#001f5a"}}>
                {
                    <AutoSizer>
                    {({ height, width }) => (
                      <List
                        className="List"
                        height={height}
                        itemCount={searchList.length}
                        itemSize={200}
                        width={width}
                      >
                        {Cars}
                      </List>
                    )}
                  </AutoSizer>
                }
             </div>
        </div>
    )
}


function BrandList(props){

    const dispatch = useDispatch();

    return(
        <div className={appStyle.brandTitleBtn}>
            <Button sx={{color:"#001f5a", fontWeight:"bold"}} onClick={()=>{dispatch(selectBrand(props.brand))}}>{props.brand}</Button>
        </div>
    )
}

function CarList(props){
    return(
        <div className={appStyle.space}>
            <div className={appStyle.model}>{props.car._id.model}</div>
            <div>Capacity: {props.car._id.capacity}</div>
            <div>Transmission: {props.car._id.transmission}</div>
            <div>Year: {props.car._id.year}</div>
        </div>
    )
}

function PriceList(props){

    return(
        <div className={appStyle.pricesContainer+" "+appStyle.prices}>
            <div className={appStyle.top}>
                <div className={appStyle.left}>最低售價：</div>
                <div className={appStyle.right}>
                    {/* <a href={`https://www.28car.com/sell_dsp.php?h_vid=${props.car.vid}&h_vw=y`} target="_blank" > */}
                    <a href={`https://www.28car.com/sell_dsp.php?h_vid=${props.car.details[0].vid}&h_vw=y`} target="_blank" >
                        ${props.car.lowestPrice}
                    </a>
                </div>
            </div>
            <div className={appStyle.bottom}>
                <div className={appStyle.left}>價格清單：</div>
                <div className={appStyle.right}>
                    {/* {props.car? props.car.prices.map((ele,index)=><div className={appStyle.carLinkContainer} key={index+ele}><a href={`https://www.28car.com/sell_dsp.php?h_vid=${props.car.vid[index]}&h_vw=y`} target="_blank" >${ele}</a></div>):null} */}
                    {props.car? props.car.details.map((ele,index)=><div className={appStyle.carLinkContainer} key={index+ele.vid}><a href={`https://www.28car.com/sell_dsp.php?h_vid=${ele.vid}&h_vw=y`} target="_blank" >${ele.price}</a></div>):null}
                </div>
            </div>
        </div>
    )
}

function CarInfo(props){

    return(
        <div className={appStyle.container}>
            <PureCarList car={props.car}/>
            <PurePriceList car={props.car} />
        </div>
    )
}

function FetchCars(props){

    const dispatch = useDispatch();

    const [fetchPageInput, setFetchPageInput] = useInput();

    const fetchState = useSelector(function(state){
        return state.project.fetchState;
    })

    return(
        <div>
            <div>每次重啟server必需先按初始搜尋，可自行設定搜尋頁數</div>
            <Button sx={{color:"#001f5a", fontWeight:"bold"}} type="submit" value="搜尋" onClick={()=> {
                dispatch(fetchCars());
                console.log("dispatch")
            }}>初始搜尋</Button>
             <Button sx={{color:"#001f5a", fontWeight:"bold"}} type="submit" value="搜尋" onClick={()=> {
                dispatch(autoFetch());
                console.log("dispatch")
            }}>啟動自動按時擷取資料</Button>
            {
                fetchState === "loading"?
                <div>請等候</div>:
                fetchState === "done"?
                <div>done</div>:
                null
            }
        </div>
    )
}

function SearchBar(){


    const dispatch = useDispatch();
    const [modelInput, setModelInput] = useInput();
    const [yearInput, setYearInput] = useInput();

    // console.log(modelInput);

    return(
        <div>
            <Box
            component="form"
            sx={{
                '& .MuiTextField-root': { m: 1, width: '25ch' },
            }}
            noValidate
            autoComplete="off"
            >
                <TextField
                    id="standard-search"
                    label="搜尋型號"
                    type="search"
                    variant="standard"
                    onChange={(e)=>{setModelInput(e.target.value); dispatch(searchResult(e.target.value))}}
                    value={modelInput}
                />
                <TextField onChange={(e)=>{setYearInput(e.target.value); dispatch(searchYear(e.target.value))}} value={yearInput} variant="standard" label="輸入年份" id="outlined-number" type="number" InputLabelProps={{ shrink: true,}}/>
            </Box>
        </div>
    )
}

function CarInput(props){

    const dispatch = useDispatch();
    const [priceInput, setPriceInput] = useInput();

    return(
        <div>
            <div>
                最低出售價：
            </div>
            <a href={`https://www.28car.com/sell_dsp.php?h_vid=${props.car.vid}&h_vw=y`} target="_blank" >
                ${props.car.lowestPrice}
            </a>
        </div>
    )
}


export {BrandList, CarInfo, SearchBar, Main};
import React, {useEffect, useState, useCallback } from 'react';
import { useDispatch, useSelector, shallowEqual } from 'react-redux';
import { REFRESH_STADIUMLIST_REQUEST } from '../reducers/location';
import { Row, Col } from 'antd';
import Maps from './Maps';
import StadiumList from './StadiumList';
import StadiumInfo from './StadiumInfo';

const BattleMap = () => {
    const dispatch = useDispatch();
    const stadiumList  = useSelector(state => state.location['stadiumList'], (left, right) => {let array1 =  left.map((v)=>v['req']); let array2 = right.map((v)=>v['req']); if(array1.length === array2.length && array1.sort().every(function(value, index) { return value === array2.sort()[index]})){return true}else{return false} });
    const [nowSelected, setNowSeleted] = useState('-1');
    
    const onChangeSelected = useCallback((req) =>{
        setNowSeleted(req);
    },[])
    useEffect(()=>{
        //If users didn`t access BattleMap page from Index, to cover another access
        if(stadiumList.length === 0){
            dispatch({
                type:REFRESH_STADIUMLIST_REQUEST,
                data:{latitude: 37.5795876, longitude: 126.9636324,} 
            })
        }
    },[])
    return (
        <div>
            <Row gutter={[20, 16]}>

                <Col xs={{ span: 22, offset: 1 }} sm={{span:22, offset: 1}} md={{ span: 13, offset: 2 }} xxl={{offset:4, span:12}}>
                    {/* 지도 */}
                    <Maps list={stadiumList} onChangeSelected={onChangeSelected} nowSelected={nowSelected}/>
                </Col>

                <Col xs={{ span: 22, offset: 1 }} sm={{span:22, offset: 1}} md={{ span: 7, offset: 0 }} xxl={{span:4}}>
                    {/* 리스트 */}
                    <StadiumList list={stadiumList} onChangeSelected={onChangeSelected} nowSelected={nowSelected}/>
                </Col>

                {nowSelected != -1 && 
                    <Col xs={{span: 22, offset: 1}} sm={{span:22, offset:1}} md={{ span:20, offset: 2}} xxl={{span:16, offset:4}}>
                        <StadiumInfo list={stadiumList} nowSelected={nowSelected}/>
                    </Col>
                }
                
            </Row>
        </div>
    );
};

export default BattleMap;
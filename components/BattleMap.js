import React, {useEffect, useState, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { REFRESH_STADIUMLIST_REQUEST } from '../reducers/location';
import { Row, Col, Spin } from 'antd';
import Maps from './Maps';
import StadiumList from './StadiumList';
import StadiumInfo from './StadiumInfo';

const BattleMap = () => {
    const { stadiumList, isChangedLocation, isChangingLocation, latitude, longitude} = useSelector(state => state.location);
    const dispatch = useDispatch();
    const [nowSelected, setNowSeleted] = useState('-1');

    const onChangeSelected = useCallback((req) =>{
        setNowSeleted(req);
    },[nowSelected])
    useEffect(()=>{
        //If users didn`t access BattleMap page from Index, to cover another access
        if(stadiumList.length === 0){
            dispatch({
                type:REFRESH_STADIUMLIST_REQUEST,
                data:{latitude: latitude, longitude: longitude,} 
            })
        }
    },[stadiumList])

    return (
        <div>
            <Row gutter={[20, 16]}>

                <Col xs={{ span: 22, offset: 1 }} sm={{span:22, offset: 1}} md={{ span: 15, offset: 2 }}>
                    {/* 지도 */}
                    <Maps list={stadiumList} onChangeSelected={onChangeSelected} nowSelected={nowSelected}/>
                </Col>

                <Col xs={{ span: 22, offset: 1 }} sm={{span:22, offset: 1}} md={{ span: 5, offset: 0 }}>
                    {/* 리스트 */}
                    <StadiumList list={stadiumList} onChangeSelected={onChangeSelected} nowSelected={nowSelected}/>
                </Col>

                {nowSelected != -1 && 
                    <Col xs={{span: 22, offset: 1}} sm={{span:22, offset:1}} md={{ span:20, offset: 2}}>
                        <StadiumInfo list={stadiumList} nowSelected={nowSelected}/>
                    </Col>
                }
                
            </Row>
        </div>
    );
};

export default BattleMap;
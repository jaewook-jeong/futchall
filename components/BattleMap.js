import React, {useEffect } from 'react';
import { useDispatch, useSelector, shallowEqual } from 'react-redux';
import { REFRESH_STADIUMLIST_REQUEST } from '../reducers/location';
import { Row, Col, Spin } from 'antd';
import Maps from './Maps';
import StadiumList from './StadiumList';

const BattleMap = () => {
    const { stadiumList, isChangedLocation, isChangingLocation, latitude, longitude} = useSelector(state => state.location);
    const dispatch = useDispatch();

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

                <Col xs={{ span: 22, offset: 1 }} md={{ span: 15, offset: 2 }}>
                    {/* 지도 */}
                    {/* {isChangingLocation && <Spin size="large" tip="Loading.." />} */}
                    {/* {isChangedLocation && <Maps list={stadiumList} />} */}
                    <Maps list={stadiumList} />
                </Col>

                <Col xs={{ span: 22, offset: 1 }} md={{ span: 5, offset: 0 }}>
                    {/* 리스트 */}
                    {/* {isChangedLocation && <StadiumList list={stadiumList} />} */}
                    <StadiumList list={stadiumList} />
                </Col>

            </Row>
        </div>
    );
};

export default BattleMap;
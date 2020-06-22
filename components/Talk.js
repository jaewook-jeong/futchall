import React, {useEffect, useCallback} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Row, Col, Input, Divider, Button, message } from 'antd';
import styles from '../SCSS/messenger.module.scss';

const Talk = (props) =>{
    const dispatch = useDispatch();
    const { opponent } = props;
    const { me, isLoggedIn } = useSelector(state => state.user);
    // const {talkData} = useSelector(state => state.messenger);
    const talkData = [{id:'everest88', content:'안녕하세요'}, {id:'suyeon9456', content:'ㅎㅇㅎㅇ'}, {id:'suyeon9456', content:'경기하실래요?'}, {id:'everest88', content:'ㄱㄱ'},]
    useEffect(()=>{
        // dispatch({type:})
        if(!isLoggedIn){message.warn("경고에요!")}
        console.log('------------------------------------');
        console.log(opponent);
        console.log('------------------------------------');
    },[])
    const showData = (
        talkData.map((v)=>{
            if(v.id === me.id){
                return(
                    <Row justify="end">
                        <Col>{v.content}</Col>
                    </Row>
                )
            }else{
                return(
                    <Row justify="start">
                        <Col>{v.content}</Col>
                    </Row>
                )
            }
        })
    )

    const sortingForShow = (data) =>{
        
    }
    let cont = 'asd'
    
    return(
        <Row>
            <Col span={24}>
                <Row>
                    <Col span={24}>
                        {showData}
                    </Col>
                </Row>
                <Divider/>
                <Row>
                    <Input 
                        allowClear={true} 
                        addonAfter={<Button type="primary" size="small" style={{width:'100%', height:'100%'}}>보내기</Button>}
                    />
                </Row>
            </Col>
        </Row>
    )
}

export default Talk;
import React, {useState, useEffect} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {Comment, List, Avatar, Form, Button, Input, Rate} from 'antd';
import {ADD_COMMENT_REQUEST} from '../reducers/stadium'

const CommentList = ({ comments }) => (
    <List
        dataSource={comments}
        itemLayout="horizontal"
        renderItem={props => <Comment {...props} avatar={<Avatar shape="circle">{props.profile}</Avatar>} actions={[<Rate disabled value={props.rating}></Rate>]} />}
    />
);

const StadiumComment = () =>{
    const { comments, isAddingComment, isAddedComment } = useSelector(state=> state.stadium);
    const { isLoggedIn, me } = useSelector(state => state.user);
    const [comment, onChangeComment] = useState('');
    const [rate, onSetRate] = useState(3);
    const dispatch = useDispatch();

    const handleSubmit = ()=>{
        dispatch({
            type:ADD_COMMENT_REQUEST,
            data:{
                datetime: new Date().toLocaleString(),
                content: comment,
                profile:me.nickname,
                author:me.nickname,
                rating:rate
            }
        });
    }
    const handleChange= (e)=>{
        onChangeComment(e.target.value);
    }
    const onChangeRate = (e) =>{
        onSetRate(e);
    }
    useEffect(()=>{
        if(isAddedComment){
            onChangeComment('');
            onSetRate(3);
        }
    },[isAddedComment])
    return(
        <div>
            <Comment
            avatar = {isLoggedIn && <Avatar shape="circle">{me.nickname}</Avatar> }
            content = {
                isLoggedIn &&
                <div>
                    <Form.Item>
                        <Input.TextArea rows={4} onChange={handleChange} value={comment} />
                    </Form.Item>
                    <Form.Item label="별점" >
                        <Rate onChange={onChangeRate} value={rate}></Rate>
                    </Form.Item>
                    <Form.Item>
                        <Button htmlType="submit" loading={isAddingComment} onClick={handleSubmit} type="primary">
                            등록
                        </Button>
                    </Form.Item>
                    
                </div>
            }
            />
            {comments.length > 0 && <CommentList comments={comments} />}
        </div>
    );
}
export default StadiumComment;
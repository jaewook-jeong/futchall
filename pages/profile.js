import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Row, Col } from 'antd';

const Profile = () => {
    const { me } = useSelector(state => state.user);
    return (
        <div>
            <Row>
                <Col xs={{ span: 22, offset: 1 }} sm={{ span: 22, offset: 1 }} md={{ span: 18, offset: 3 }}>
                    
                </Col>
            </Row>
        </div>
    );
}
export default Profile;
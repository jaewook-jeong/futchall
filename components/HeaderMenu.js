import React from 'react';
import { useSelector, shallowEqual } from 'react-redux';
import Router from 'next/router';
import ProfileAvatar  from './ProfileAvatar';
import { HomeOutlined, KeyOutlined } from '@ant-design/icons'
import styles from '../SCSS/headerMenu.module.scss'
import HeaderSearchBox from './HeaderSearchBox';

const HeaderMenu = (props) =>{
    const showLoginModal = props.showModal;
    const {isLoggedIn} = useSelector(state=> state.user, shallowEqual);
    
    return(
        <div className={styles.headerMenu}>
            <ul>
                <li onClick={()=>Router.push("/")}>
                    <span className={styles.icon}>
                        <HomeOutlined/>
                    </span>
                    <span className={styles.title} >
                        FUTCHALL
                    </span>
                </li>
                <li>
                    <HeaderSearchBox/>
                </li>
                {!isLoggedIn && 
                    <li onClick={showLoginModal} style={{float:'right'}}>
                        <span className={styles.icon}>
                            <KeyOutlined/>
                        </span>
                        <span className={styles.title}>
                            로그인하기
                        </span>
                    </li>
                }
                {isLoggedIn &&
                    <li style={{float:'right'}}>
                        <span className={styles.icon}>
                            <ProfileAvatar/>
                        </span>
                    </li>
                }
            </ul>
        </div>
    )

}
export default HeaderMenu;
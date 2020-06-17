import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Router from 'next/router';
import { SEARCH_TEAMS_REQUEST } from '../reducers/team';
import ProfileAvatar  from './ProfileAvatar';
import {HomeOutlined, SearchOutlined, KeyOutlined, ArrowLeftOutlined} from '@ant-design/icons'
import styles from '../SCSS/headerMenu.module.scss'

const HeaderMenu = (props) =>{
    const showModal = props.showModal;
    const dispatch = useDispatch();
    const {isLoggedIn} = useSelector(state=> state.user);
    const searchTeam = (value) => {
        // event.preventDefault();
        // let value = event.target.value;
        dispatch({
            type:SEARCH_TEAMS_REQUEST, 
            data:{"query": value},
        });
        Router.push(`/team/search?q=${value}`);
    }
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
                    <span className={styles.findicon} onClick={()=>{document.getElementById('hiddenSearchDiv').style.display = 'block'}}>
                        <SearchOutlined/>
                    </span>
                    <div className={styles.searchtitle}>
                        <span className={styles.searchicon} onClick={()=>{console.log(document.getElementById("searchQ"))}}>
                            <SearchOutlined/>
                        </span>
                        <input 
                            id="searchQ" 
                            className={styles.searchinput} 
                            
                            onKeyDown={(e)=>console.log(e.target)}
                            placeholder="팀 검색하기" 
                        />
                        <span 
                            id="delbtn" 
                            className={styles.searchDelete} 
                            onClick={(e)=>{document.getElementById("searchQ").value = ''; e.target.style.display = 'none'}}
                            >
                                X
                        </span>
                    </div>
                </li>
                {!isLoggedIn && 
                    <li onClick={showModal} style={{float:'right'}}>
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
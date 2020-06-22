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
                            onKeyUp={(e)=>{if(e.keyCode === 13)searchTeam(e.target.value)}}
                            onInput={(e)=>{const delbtn = document.getElementById('delbtn'); if(e.target.value.length != 0){delbtn.style.display = 'inline-block'}else{delbtn.style.display = 'none'}}}
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

                    <div 
                        id="hiddenSearchDiv" 
                        className={styles.hiddensearch} 
                        onBlur={()=>{document.getElementById('hiddenSearchDiv').style.display = 'none'}}
                    >
                        <span className={styles.hiddenout} onClick={()=>{document.getElementById('hiddenSearchDiv').style.display = 'none'}}>
                            <ArrowLeftOutlined/>
                        </span>
                        <input 
                            id="hiddenSearchQ" 
                            className={styles.hiddeninput} 
                            onInput={(e)=>{const delbtn = document.getElementById('hiddenDelBtn'); if(e.target.value.length != 0){delbtn.style.display = 'inline-block'}else{delbtn.style.display = 'none' } }} 
                            onKeyUp={(e)=>{if(e.keyCode === 13)searchTeam(e.target.value)}}
                            placeholder="팀 명을 입력하고 Enter를 눌러주세요" 
                        />
                        <span 
                            id="hiddenDelBtn" 
                            className={styles.hiddendelete} 
                            onClick={(e)=>{document.getElementById('hiddenSearchQ').value = ''; e.target.style.display = 'none'}}
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
import React, {useState, useMemo} from 'react';
import { useSelector, shallowEqual } from 'react-redux';
import Router from 'next/router';
import ProfileAvatar  from './ProfileAvatar';
import {HomeOutlined, SearchOutlined, KeyOutlined, ArrowLeftOutlined} from '@ant-design/icons'
import styles from '../SCSS/headerMenu.module.scss'

const HeaderMenu = (props) =>{
    const showLoginModal = props.showModal;
    const {isLoggedIn} = useSelector(state=> state.user, shallowEqual);
    const [searchQuery, handleSearchQuery, clearSearchQuery, deleteButton] = useTeamSearching();

    const searchTeam = () => {
        Router.push(`/team/search?q=${searchQuery}`);
    }

    function useTeamSearching(){
        const [searchQuery, setSearchQuery]= useState('');
        const deleteButton = useMemo(()=>{ if(searchQuery.length === 0){return false }else{return true}}, [searchQuery]);
        
        function handleSearchQuery(event){
            setSearchQuery(event.target.value);
        }

        function clearSearchQuery(){
            setSearchQuery('');
        }
        return [searchQuery, handleSearchQuery, clearSearchQuery, deleteButton];
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
                        <span className={styles.searchicon}>
                            <SearchOutlined/>
                        </span>
                        <input 
                            id="searchQ" 
                            value={searchQuery}
                            onChange={handleSearchQuery}
                            className={styles.searchinput} 
                            onKeyUp={(e)=>{if(e.keyCode === 13)searchTeam()}}
                            placeholder="팀 검색하기" 
                        />
                        {
                            deleteButton && 
                            <span 
                                id="delbtn" 
                                className={styles.searchDelete} 
                                onClick={clearSearchQuery}
                                >
                                    X
                            </span>
                        }
                        
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
                            onChange={handleSearchQuery}
                            value={searchQuery}
                            onKeyUp={(e)=>{if(e.keyCode === 13)searchTeam()}}
                            placeholder="팀 명을 입력하고 Enter를 눌러주세요" 
                        />
                        {
                            deleteButton && 
                            <span 
                                id="hiddenDelBtn" 
                                className={styles.hiddendelete} 
                                onClick={clearSearchQuery}
                            >
                                X
                            </span>
                        }
                        
                    </div>
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
export default React.memo(HeaderMenu);
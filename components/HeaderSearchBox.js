import React, {useState, useMemo}from  'react';
import styles from '../SCSS/headerMenu.module.scss'
import Router from 'next/router';
import {SearchOutlined, ArrowLeftOutlined} from '@ant-design/icons'

const HeaderSearchBox = () =>{

    const searchTeam = () => {
        Router.push(`/team/search?q=${searchQuery}`);
    }
    const useTeamSearching = () => {
        const [searchQuery, setSearchQuery]= useState('');
        const deleteButton = useMemo(()=>{ if(searchQuery.length === 0){return false }else{return true}}, [searchQuery]);
        
        const handleSearchQuery = (event)=>{
            setSearchQuery(event.target.value);
        }
        
        function clearSearchQuery(){
            setSearchQuery('');
        }
        return [searchQuery, handleSearchQuery, clearSearchQuery, deleteButton];
    }
    
    const [searchQuery, handleSearchQuery, clearSearchQuery, deleteButton] = useTeamSearching();
    return(
        <>
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
        </>
    );
}
export default HeaderSearchBox;
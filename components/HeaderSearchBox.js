import React, { useState, useCallback, useRef, useEffect } from 'react';
import Router, { useRouter } from 'next/router';
import { SearchOutlined, ArrowLeftOutlined } from '@ant-design/icons';
import axios from 'axios';
import { AutoComplete, Button } from 'antd';
import Link from 'next/link';

import styles from '../SCSS/headerMenu.module.scss';
import { SearchBoxGlobal } from '../SCSS/StyledComponents';

const HeaderSearchBox = () => {
  // const useTeamSearching = useCallback(() => {
  //   const [searchQuery, setSearchQuery] = useState('');
  //   const deleteButton = useMemo(
  //     () => { if (searchQuery.length === 0) { return false; } return true; }, [searchQuery],
  //   );
  //   const handleSearchQuery = (event) => {
  //     setSearchQuery(event.target.value);
  //   };
  //   const clearSearchQuery = () => {
  //     setSearchQuery('');
  //   };
  //   const searchTeam = () => {
  //     Router.push(`/team/search?q=${searchQuery}`);
  //   };
  //   return [searchQuery, handleSearchQuery, clearSearchQuery, deleteButton, searchTeam];
  // }, []);

  // const [
  //   searchQuery, handleSearchQuery, clearSearchQuery, deleteButton, searchTeam,
  // ] = useTeamSearching();
  const newRequest = useRef();
  const router = useRouter();
  const [searchQ, onSearchQ] = useState(router.query?.q);
  const [options, setOptions] = useState([]);

  const setSearchQ = useCallback((value) => {
    onSearchQ(value);
  }, []);
  const goPage = useCallback((where, id) => () => {
    Router.push(`/${where}/${id}`);
  }, []);
  const onSelect = useCallback((data, allData) => {
    Router.push(`/search?q=${allData.value}`);
  }, []);
  const onSearch = useCallback((searchText) => {
    clearTimeout(newRequest.current);
    newRequest.current = setTimeout(() => {
      axios.get(`http://localhost:3065/team/autocomplete?q=${searchText}`)
        .then((result) => ([result?.data[0]?.map((v) => ({ value: v.title,
          id: v.id,
          where: 'stadium',
          label: (
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
              }}
            >
              {v.title}
              <Button type="link" size="small" onClick={(e) => { e.stopPropagation(); Router.push(`/stadium/${v.id}`); }}>바로가기</Button>
            </div>
          ) })),
          result?.data[1]?.map((v) => ({ value: v.title,
            id: v.id,
            where: 'team',
            label: (
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                }}
              >
                {v.title}
                <Button type="link" size="small" htmlType="submit" onClick={(e) => { e.stopPropagation(); Router.push(`/team/${v.id}`); }}>바로가기</Button>
              </div>
            ) }))]))
        .then((data) => {
          setOptions([{
            label: '구장',
            options: data[0],
          }, {
            label: '팀',
            options: data[1],
          }]);
        })
        .catch((err) => console.error(err));
    }, 300);
  }, []);
  return (
    <>
      <span className={styles.findicon} onClick={()=>{document.getElementById('hiddenSearchDiv').style.display = 'block'}}>
        <SearchOutlined />
      </span>
      <div className={styles.searchtitle}>
        <span className={styles.searchicon}>
          <SearchOutlined />
        </span>
        {/* <input
          id="searchQ"
          value={searchQuery}
          onChange={handleSearchQuery}
          className={styles.searchinput}
          onKeyUp={(e) => { if (e.keyCode === 13)searchTeam(); }}
          placeholder="팀 검색하기"
        />
        {
          deleteButton
                      && (
                      <span
                        id="delbtn" 
                        className={styles.searchDelete} 
                        onClick={clearSearchQuery}
                      >
                        X
                      </span>
                      )
        } */}
        <SearchBoxGlobal />
        <AutoComplete
          allowClear
          value={searchQ}
          onChange={setSearchQ}
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              Router.push(`/search?q=${searchQ}`);
            }
          }}
          placeholder="검색어를 입력하세요!"
          onSearch={onSearch}
          onSelect={onSelect}
          options={options}
          // className={styles.searchinput}
        />
      </div>
      <div
        id="hiddenSearchDiv"
        className={styles.hiddensearch}
        onBlur={() => { document.getElementById('hiddenSearchDiv').style.display = 'none'; }}
      >
        <span className={styles.hiddenout} onClick={()=>{document.getElementById('hiddenSearchDiv').style.display = 'none'}}>
          <ArrowLeftOutlined />
        </span>
        {/* <input
          id="hiddenSearchQ"
          className={styles.hiddeninput}
          onChange={handleSearchQuery}
          value={searchQuery}
          onKeyUp={(e) => { if (e.keyCode === 13)searchTeam(); }}
          placeholder="팀 명을 입력하고 Enter를 눌러주세요"
        />
        {
          deleteButton
              && (
              <span
                id="hiddenDelBtn" 
                className={styles.hiddendelete} 
                onClick={clearSearchQuery}
              >
                X
              </span>
              )
        } */}
        <AutoComplete
          className={styles.hiddeninput}
          allowClear
          value={searchQ}
          onChange={setSearchQ}
          placeholder="검색어를 입력하세요!"
          onSearch={onSearch}
          onSelect={onSelect}
          options={options}
        />
      </div>
    </>
  );
};
export default HeaderSearchBox;

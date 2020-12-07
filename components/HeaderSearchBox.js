import React, { useState, useCallback, useRef } from 'react';
import Router, { useRouter } from 'next/router';
import { SearchOutlined, ArrowLeftOutlined } from '@ant-design/icons';
import axios from 'axios';
import { AutoComplete, Button } from 'antd';

import styles from '../SCSS/headerMenu.module.scss';
import { SearchBoxGlobal } from '../SCSS/StyledComponents';
import { backUrl } from '../config/config';

const HeaderSearchBox = () => {
  const newRequest = useRef();
  const router = useRouter();
  const [searchQ, onSearchQ] = useState(router.query?.q);
  const [options, setOptions] = useState([]);
  const [autocompleteOpen, setAutocompleteOpen] = useState(false);

  const setSearchQ = useCallback((value) => {
    onSearchQ(value);
  }, []);
  const onSelect = useCallback((data, allData) => {
    setAutocompleteOpen(false);
    Router.push(`/search?q=${allData.value}`);
  }, []);
  const onSearch = useCallback((searchText) => {
    clearTimeout(newRequest.current);
    newRequest.current = setTimeout(() => {
      axios.get(`${backUrl}/team/autocomplete?q=${searchText}`)
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
              <Button type="link" size="small" onClick={(e) => { e.stopPropagation(); Router.push(`/stadium/${v.id}`); setAutocompleteOpen(false); }}>바로가기</Button>
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
                <Button type="link" size="small" htmlType="submit" onClick={(e) => { e.stopPropagation(); Router.push(`/team/${v.id}`); setAutocompleteOpen(false); }}>바로가기</Button>
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
        setAutocompleteOpen(true);
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
        <SearchBoxGlobal />
        <AutoComplete
          allowClear
          onBlur={() => setAutocompleteOpen(false)}
          open={autocompleteOpen}
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
        <AutoComplete
          className={styles.hiddeninput}
          allowClear
          open={autocompleteOpen}
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

import React, { useMemo, useCallback } from 'react';
import { useSelector, shallowEqual } from 'react-redux';
import Router from 'next/router';
import PropTypes from 'prop-types';
import { KeyOutlined, HomeOutlined, TeamOutlined } from '@ant-design/icons';
import { Popover } from 'antd';

import ProfileAvatar from './ProfileAvatar';
import styles from '../SCSS/headerMenu.module.scss';
import HeaderSearchBox from './HeaderSearchBox';

const HeaderMenu = (props) => {
  const { showModal, shrink } = props;
  const { isLoggedIn, me } = useSelector((state) => state.user, shallowEqual);
  const floatRight = useMemo(() => ({ float: 'right' }), []);
  const HomeButton = useCallback(() => {
    Router.push('/');
  }, []);
  const StadiaButton = useCallback(() => {
    Router.push('/stadia');
  }, []);
  const TeamButton = useCallback(() => {
    if (me?.Team.club) {
      Router.push('/team/[id]', `/team/${me.Team.club}`);
    } else {
      Router.push('/team/register');
    }
  }, [me]);
  return (
    <div className={styles.headerMenu}>
      <ul>
        <li onClick={HomeButton}>
          <span className={styles.icon}>
            <img src="/futchall.png" alt="futchall title" />
          </span>
        </li>
        <li>
          <HeaderSearchBox />
        </li>
        {shrink
          && (
            <>
              <li>
                <span className={styles.icon} onClick={StadiaButton}>
                  <Popover
                    placement="bottom"
                    content="구장찾기"
                  >
                    <HomeOutlined />
                  </Popover>
                </span>
              </li>
              <li>
                <span className={styles.icon} onClick={TeamButton}>
                  <Popover
                    placement="bottom"
                    content={me.Team.club ? '팀관리' : '팀등록'}
                  >
                    <TeamOutlined />
                  </Popover>
                </span>
              </li>
            </>
          )}
        {!isLoggedIn
          && (
          <li onClick={showModal} style={floatRight}>
            <span className={styles.icon}>
              <KeyOutlined />
            </span>
            <span className={styles.title}>
              로그인하기
            </span>
          </li>
          )}
        {isLoggedIn
          && (
          <li style={floatRight}>
            <span className={styles.icon}>
              <ProfileAvatar />
            </span>
          </li>
          )}
      </ul>
    </div>
  );
};
HeaderMenu.propTypes = {
  showModal: PropTypes.func.isRequired,
  shrink: PropTypes.bool.isRequired,
};

export default HeaderMenu;

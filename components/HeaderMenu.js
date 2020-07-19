import React, { useMemo } from 'react';
import { useSelector, shallowEqual } from 'react-redux';
import Router from 'next/router';
import PropTypes from 'prop-types';
import { HomeOutlined, KeyOutlined } from '@ant-design/icons';

import ProfileAvatar from './ProfileAvatar';
import styles from '../SCSS/headerMenu.module.scss';
import HeaderSearchBox from './HeaderSearchBox';

const HeaderMenu = (props) => {
  const { showModal } = props;
  const { isLoggedIn } = useSelector((state) => state.user, shallowEqual);
  const floatRight = useMemo(() => ({ float: 'right' }), []);
  return (
    <div className={styles.headerMenu}>
      <ul>
        <li onClick={() => Router.push("/")}>
          <span className={styles.icon}>
            <img src="/futchall.png" alt="futchall title" />
          </span>
        </li>
        <li>
          <HeaderSearchBox />
        </li>
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
};

export default HeaderMenu;

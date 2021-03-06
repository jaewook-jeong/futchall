import React from 'react';
import PropTypes from 'prop-types';
import { Tag, Tooltip, Menu, Row, Col } from 'antd';
import { FlagOutlined, FlagTwoTone } from '@ant-design/icons';

import styles from '../SCSS/stadiumList.module.scss';
import { multipleSpecaility } from '../util/columns';

const StadiumList = (props) => {
  const { list, onChangeSelected, nowSelected } = props;
  return (
    <Menu
      mode="inline"
      onClick={(e) => onChangeSelected(e.key)}
      style={{ maxHeight: '70vh' }}
      inlineIndent={15}
      defaultOpenKeys={['main']}
      selectedKeys={[`${nowSelected}`]}
    >
      <Menu.SubMenu
        key="main"
        title="구장 리스트"
      >
        {list.map((v, i) => (
          <Menu.Item key={i} className={styles.stadiumInfo}>
            <Row style={{ overflow: 'auto' }}>
              <Col className={styles.flag}>
                {v.TeamId
                  ? <Tooltip title="점령중입니다"><FlagTwoTone twoToneColor="red" style={{ fontSize: '20px' }} /></Tooltip>
                  : <FlagOutlined style={{ fontSize: '20px' }} />}
              </Col>
              <Col className={styles.details}>
                <Row className={styles.title}>
                  {v.title}
                </Row>
                <Row className={styles.tags}>
                  {v.special.split(',').map((c) => <Tag key={c}>#{multipleSpecaility[c]}</Tag>)}
                </Row>
              </Col>
            </Row>
          </Menu.Item>
        ))}
      </Menu.SubMenu>
    </Menu>
  );
};

StadiumList.propTypes = {
  list: PropTypes.array,
  onChangeSelected: PropTypes.func.isRequired,
  nowSelected: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
  ]).isRequired,
};

export default StadiumList;

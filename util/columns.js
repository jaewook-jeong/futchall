import { Tag, Tooltip } from 'antd';
import Link from 'next/link';
import moment from 'moment';

export const RankingColumns = [
  {
    title: '순위',
    width: 60,
    dataIndex: 'rank',
    fixed: 'left',
    align: 'center',
    ellipsis: true,
    sorter: (a, b) => a.rank - b.rank,
  },
  {
    title: '팀 명',
    width: 100,
    dataIndex: 'name',
    fixed: 'left',
    align: 'center',
    ellipsis: true,
  },
  {
    title: '활동지역',
    width: 120,
    align: 'center',
    dataIndex: 'location',
    filters: [
      {
        text: '서울',
        value: '서울',
      },
      {
        text: '경기',
        value: '경기',
      },
      {
        text: '부산',
        value: '부산',
      },
      {
        text: '인천',
        value: '인천',
      },
      {
        text: '대구',
        value: '대구',
      },
      {
        text: '광주',
        value: '광주',
      },
      {
        text: '대전',
        value: '대전',
      },
      {
        text: '울산',
        value: '울산',
      },
      {
        text: '세종',
        value: '세종',
      },
      {
        text: '강원',
        value: '강원',
      },
      {
        text: '충북',
        value: '충북',
      },
      {
        text: '충남',
        value: '충남',
      },
      {
        text: '전북',
        value: '전북',
      },
      {
        text: '전남',
        value: '전남',
      },
      {
        text: '경북',
        value: '경북',
      },
      {
        text: '경남',
        value: '경남',
      },
      {
        text: '제주',
        value: '제주',
      },
    ],
    onFilter: ((value, record) => { record.location.indexOf(value) === 0; }),
  },
  {
    title: '점령 구장 수',
    dataIndex: 'occupation',
    width: 80,
    align: 'center',
  },
  {
    title: '회원모집',
    dataIndex: 'recruit',
    width: 80,
    align: 'center',
  },
  {
    title: '비고',
    dataIndex: 'leader',
    // fixed: 'right',
    align: 'center',
    width: 80,
    render: (value) => <div><a onClick={() => { console.log(value); }}>연락하기</a></div>,
  },
];

export const teamMemberColumns = [
  {
    title: '닉네임',
    dataIndex: 'nickname',
    align: 'center',
    width: 100,
    render: (val, row) => (row.LeaderId ? `*${val}` : val),
    sorter: (a, b) => a.nickname - b.nickname,
  },
  {
    title: '포지션',
    dataIndex: 'positions',
    align: 'center',
    width: 100,
    render: (val) => <div>{val.split(',').map((v) => <Tag key={v} color={v == 'FIXO' ? 'blue' : v === 'ALA' ? 'green' : v === 'PIVO' ? 'red' : 'orange'}>{v}</Tag>)}</div>,
    filters: [
      { text: 'PIVO', value: 'PIVO' },
      { text: 'ALA', value: 'ALA' },
      { text: 'FIXO', value: 'FIXO' },
      { text: 'GOLEIRO', value: 'GOLEIRO' },
    ],
    onFilter: (value, rec) => rec.positions.indexOf(value) !== -1,
  },
];

export const teamRecordColumns = [
  {
    title: '홈 팀',
    align: 'center',
    dataIndex: ['Home', 'title'],
    render: (value, row) => <Link href={`/team/${row.HomeId}`} prefetch={false}><a><Tooltip title={row.WinnerId == row.HomeId ? '승리팀' : '패배팀'}>{row.capture === 'Y' ? '*' : null}{value}</Tooltip></a></Link>
  },
  {
    title: '신청팀',
    align: 'center',
    dataIndex: ['Away', 'title'],
    render: (value, row) => <Link href={`/team/${row.AwayId}`} prefetch={false}><a><Tooltip title={row.WinnerId == row.AwayId ? '승리팀' : '패배팀'}>{value}</Tooltip></a></Link>
  },
  {
    title: '경기일자',
    align: 'center',
    dataIndex: 'date',
  render: (value) => <Tooltip title={moment(value.toString()).locale('ko').format('YYYY-MM-DD HH:mm')}>{value.slice(0, 10)}</Tooltip> ,
  },
  {
    title: '경기장소',
    align: 'center',
    dataIndex: ['Stadium', 'title'],
    render: (value, row) => <Link href={`/stadium/${row.StadiumId}`} prefetch={false}><a>{value}</a></Link>
  },
];

export const multipleSpecaility = [
  '잔디구장',
  '우레탄구장',
  '플라스틱 인도어구장',
  '샤워실',
  '근처 편의점',
  '탈의실',
  '대기용 좌석',
];

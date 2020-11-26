import { Tag, Tooltip } from 'antd';
import Link from 'next/link';
import moment from 'moment';

export const RankingColumns = [
  {
    title: '순위',
    width: 50,
    dataIndex: 'rank',
    fixed: 'left',
    align: 'center',
    ellipsis: true,
    sorter: (a, b) => a.rank - b.rank,
  },
  {
    title: '팀 명',
    width: 100,
    dataIndex: 'title',
    fixed: 'left',
    align: 'center',
    render: (value, row) => <Link href={`/team/${row.id}`} prefetch={false}><a>{value}</a></Link>
  },
  {
    title: '활동지역',
    width: 120,
    align: 'center',
    dataIndex: 'location',
  },
  {
    title: '점령 구장 수',
    dataIndex: 'occupation',
    width: 100,
    align: 'center',
    sorter: (a, b) => a.occupation - b.occupation,
  },
  {
    title: '회원모집',
    dataIndex: 'recruit',
    width: 80,
    align: 'center',
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

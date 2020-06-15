import React from 'react';
import { Select, Tooltip } from 'antd';

export const positions = [
    <Select.Option key={"PIVO"}><Tooltip title={"중앙 공격수"}>PIVO</Tooltip></Select.Option>,
    <Select.Option key={"ALA"} ><Tooltip title={"윙어"}>ALA</Tooltip></Select.Option>,
    <Select.Option key={"FIXO"} ><Tooltip title={"수비수"}>FIXO</Tooltip></Select.Option>,
    <Select.Option key={"GOLEIRO"} ><Tooltip title={"골키퍼"}>GOLEIRO</Tooltip></Select.Option>
];
export const ageGroup = [
    <Select.Option key={"10"} value={"10"}>10대</Select.Option>,
    <Select.Option key={"20"} value={"20"}>20대</Select.Option>,
    <Select.Option key={"30"} value={"30"}>30대</Select.Option>,
    <Select.Option key={"40"} value={"40"}>40대</Select.Option>,
    <Select.Option key={"50"} value={"50"}>50대</Select.Option>
]
export const locations = [
    <Select.Option key={"서울"} value={"서울"}>서울</Select.Option>,
    <Select.Option key={"부산"} value={"부산"}>부산</Select.Option>,
    <Select.Option key={"인천"} value={"인천"}>인천</Select.Option>,
    <Select.Option key={"대구"} value={"대구"}>대구</Select.Option>,
    <Select.Option key={"광주"} value={"광주"}>광주</Select.Option>,
    <Select.Option key={"대전"} value={"대전"}>대전</Select.Option>,
    <Select.Option key={"울산"} value={"울산"}>울산</Select.Option>,
    <Select.Option key={"세종"} value={"세종"}>세종</Select.Option>,
    <Select.Option key={"경기"} value={"경기"}>경기</Select.Option>,
    <Select.Option key={"강원"} value={"강원"}>강원</Select.Option>,
    <Select.Option key={"충북"} value={"충북"}>충북</Select.Option>,
    <Select.Option key={"충남"} value={"충남"}>충남</Select.Option>,
    <Select.Option key={"전북"} value={"전북"}>전북</Select.Option>,
    <Select.Option key={"전남"} value={"전남"}>전남</Select.Option>,
    <Select.Option key={"경북"} value={"경북"}>경북</Select.Option>,
    <Select.Option key={"경남"} value={"경남"}>경남</Select.Option>,
    <Select.Option key={"제주"} value={"제주"}>제주</Select.Option>
]
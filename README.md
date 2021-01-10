<h1 align="center"><img src="https://github.com/jaewook-jeong/futchall/blob/master/public/index.png?raw=true" style="width: 80%;"></h1>

### 🏠 [HomePage](https://futchall.com)

### 📝 [Blog](https://velog.io/@_woogie)

## 소개

#### [Futchall](https://www.futchall.com)은 풋살을 위한 커뮤니티 및 순위랭킹 어플리케이션입니다.
Pokémon GO에서 영감을 얻어 점령 시스템을 구현하였습니다.

#### Description
- Pokémon GO의 체육관 점령을 모티브로 하여 풋살구장 점령을 구현하였습니다.
- 자신의 팀을 등록하여 유저가입을 승인하고 타 팀과 매칭을 잡을 수 있습니다.
- 본인이 참석할 수 있는 날짜를 선택하여 팀 리더의 경기일정 조율을 도울 수 있습니다.
- 팀과 구장에 게시글을 등록하여 타 유저와 소통할 수 있습니다.
- 알고있는 구장을 등록하고 해당구장을 점령할 수 있습니다.
- 구장을 점령하여 전체 팀 랭킹을 올릴 수 있습니다.
- 사용자의 ID를 제외한 모든 정보를 수정&변경할 수 있습니다.

## Architecture
![Architecture](https://github.com/jaewook-jeong/futchall/blob/master/public/architecture.png)


## DevOps
![Deployment](https://github.com/jaewook-jeong/futchall/blob/master/public/deployment.jpg)
배포자동화와 무중단배포를 구현하였습니다. 과정은 [블로그](https://velog.io/@_woogie/%EB%B0%B0%ED%8F%AC%EB%A5%BC-%EC%9E%90%EB%8F%99%ED%99%94%ED%95%B4%EB%B3%B4%EC%9E%90-feat.-Next-js-pm2-Nginx)에 자세히 기록해두었습니다.

[Travis CI](https://travis-ci.com/github/jaewook-jeong/futchall)

## Test
**Custom Hooks Testing**

비동기 API 처리 및 상태 관리에 대한 테스트
- Front-End : Jest + Enzyme

Cypress를 이용한 End-to-End Testing
- 페이지와 컴포넌트 UI 테스트

## Built with
![Build With](https://github.com/jaewook-jeong/futchall/blob/master/public/buildWith.jpg)
## Team
1인 개발물입니다.

## License
MIT license


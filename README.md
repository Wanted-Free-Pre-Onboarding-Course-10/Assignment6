# Assignment6
원티드 X 위코드 프리 온보딩 2주차 기업형 과제(디어)

## 설명

본 프로젝트는 원티드x위코드 백엔드 프리온보딩  [디어](https://www.notion.so/wecode/6c0ed2bbf2c14f359a9734b8bb093d1a)에서 출제한 과제를 기반으로 제작 되었습니다.

 <details>

 
<summary> 주요 평가 사항  </summary>

- 주어진 정보를 기술적으로 설계하고 구현할 수 있는 역량
- 확장성을 고려한 시스템 설계 및 구현

</details>



 <details>

<summary> 필수 포함 사항 </summary>

- READ.ME 작성
- 프로젝트 빌드, 자세한 실행 방법 명시
- 구현 방법과 이유에 대한 간략한 설명
- 완료된 시스템이 배포된 서버의 주소
- 해당 과제를 진행하면서 회고 내용 블로그 포스팅
- Swagger나 Postman을 이용하여 API 테스트 가능하도록 구현
 
</details>


 <details>

<summary> 과제 안내 </summary>
 
디어는 사용자의 요금을 계산하기 위해 다양한 상황을 고려합니다. 

- 우선 지역별로 다양한 요금제를 적용하고 있습니다. 예를 들어 건대에서 이용하는 유저는 기본요금 790원에 분당요금 150원, 여수에서 이용하는 유저는 기본요금 300원에 분당요금 70원으로 적용됩니다.
- 할인 조건도 있습니다. 사용자가 파킹존에서 반납하는 경우 요금의 30%를 할인해주며, 사용자가 마지막 이용으로부터 30분 이내에 다시 이용하면 기본요금을 면제해줍니다.
- 벌금 조건도 있습니다. 사용자가 지역 바깥에 반납한 경우 얼마나 멀리 떨어져있는지 거리에 비례하는 벌금을 부과하며, 반납 금지로 지정된 구역에 반납하면 6,000원의 벌금을 요금에 추과로 부과합니다.
- 예외도 있는데, 킥보드가 고장나서 정상적인 이용을 못하는 경우의 유저들을 배려하여 1분 이내의 이용에는 요금을 청구하지 않고 있습니다.

최근에 다양한 할인과 벌금을 사용하여 지자체와 협력하는 경우가 점점 많아지고 있어 요금제에 새로운 할인/벌금 조건을 추가하는 일을 쉽게 만드려고 합니다. 어떻게 하면 앞으로 발생할 수 있는 다양한 할인과 벌금 조건을 기존의 요금제에 쉽게 추가할 수 있는 소프트웨어를 만들 수 있을까요? 

우선은 사용자의 이용에 관한 정보를 알려주면 현재의 요금 정책에 따라 요금을 계산해주는 API를 만들어주세요. 그 다음은, 기능을 유지한 채로 새로운 할인이나 벌금 조건이 쉽게 추가될 수 있게 코드를 개선하여 최종 코드를 만들어주세요.
 
</details>


## 개발 일정
<img src="https://user-images.githubusercontent.com/48669085/142731547-301ba063-142b-4d4a-a7d1-ad82d3be6519.png" height="500px" width="600px" />


## 코드 컨벤션
[코드 컨벤션](https://github.com/Wanted-Free-Pre-Onboarding-Course-10/Assignment4/wiki/%EC%BD%94%EB%93%9C%EC%BB%A8%EB%B2%A4%EC%85%98)




## 과제 구현사항

| 구현사항  | 구현 여부                                          |
|------- | ----------------------------------------------- |
| ~~  |  OK| 




## 사용 스택

<img src="https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=TypeScript&logoColor=white" />&nbsp;
<img src="https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=Node.js&logoColor=white" />&nbsp;
<img src="https://img.shields.io/badge/NestJS-E0234E?style=for-the-badge&logo=NestJS&logoColor=white" />&nbsp;
<img src="https://img.shields.io/badge/SQLite-003B57?style=for-the-badge&logo=SQLite&logoColor=white" />&nbsp;
<img src="https://img.shields.io/badge/TYPEORM-red?style=for-the-badge&logo=TYPEORM&logoColor=white" />

## DB 스키마
<img src="https://user-images.githubusercontent.com/48669085/142012766-940e2615-8625-4f73-b19a-61f7d7ce9b1c.png" height="300px" width="600px" />

## API
[API문서](https://documenter.getpostman.com/view/13568025/UVCB9Pbm)

## API 테스트
1. 우측 링크를 클릭해서 postman으로 들어갑니다.[링크](https://www.postman.com/martian-satellite-348039/workspace/humanscape/overview) 
2. 정의된 server가 올바른지 확인 합니다.(3.35.220.172:3000)
<img width="1048" alt="스크린샷 2021-11-17 오전 3 02 20" src="https://user-images.githubusercontent.com/81801012/142041687-0ecf274f-99e8-48df-aec7-77f0929de1c7.png">

3. 이후, API 테스트를 시도해 주세요.

## 설치 및 실행 방법

### 프로젝트 설치

```
git clone https://github.com/Wanted-Free-Pre-Onboarding-Course-10/Assignment5.git

.env파일 존재해야 실행가능합니다.

```

 ### 환경 구축 및 
```
npm install

npm run start:dev
```

## 팀원

| 이름   | github                                          | 담당 역할                  | 회고록             |
| ------ | ----------------------------------------------- | -------------------------- |------------------|
| 박지율 | [earthkingman](https://github.com/earthkingman) |    |            |
| 염재선 | [Yeom Jae Seon](https://github.com/YeomJaeSeon) |    |            |
| 김태희 | [김태희](https://github.com/godtaehee)           |    |             |
| 박상엽 | [큰형](  https://github.com/lotus0204)           |    |            |


## 협업 방식

[잡초 협업하기](https://github.com/Wanted-Free-Pre-Onboarding-Course-10/Assignment2/wiki/%ED%98%91%EC%97%85-%EB%B0%A9%EC%8B%9D)

## 개발 과정



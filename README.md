# Assignment6
원티드 X 위코드 프리 온보딩 2주차 기업형 과제(디어코퍼레이션)

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
<img src="https://user-images.githubusercontent.com/48669085/142732325-6e32ed88-86dd-41ff-baca-324252d22387.png" height="500px" width="600px" />


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
<img width="1244" alt="스크린샷 2021-11-21 오후 5 17 34" src="https://user-images.githubusercontent.com/67785334/142754854-96afcf21-b6f0-41bf-bb5b-c3ef78e521cf.png">


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


## 개발 과정

### 도메인 설계
- 변경에 유연한 설계를 위해선 '구현'(내부)와 '인터페이스'(외부)가 **분리**되어야 한다 생각했습니다.
- 그렇기 위해선 객체가 외부에 **꼭** 드러날 정보만 드러나야 한다 생각했습니다.
- 객체가 다른 객체에게 **요청할 메시지**만 외부에 드러나야 한다 생각했습니다.
- 그렇게 하기 위해선 시스템의 **구조**를 먼저 생각하고 기능은 구조에 종속되게 설계해야 한다 생각했습니다.


우리의 시스템을 바라보는 사용자의 멘탈모델인 **도메인 모델**부터 설계를 하였습니다.
<img width="1065" alt="스크린샷 2021-11-21 오후 5 16 54" src="https://user-images.githubusercontent.com/67785334/142754845-742c2c02-4202-4faa-9dd8-f439b783605c.png">

위 도메인 설계를 만드는 과정

1. 필요한 객체들이 무엇이 있는지 생각한다.
2. 객체가 책임을 실행할 때, 다른 객체에 요청할 메시지가 무엇인지 생각한다.
3. 해당 메시지를 요청받을 수 있는 객체를 생각한다.

- 메시지가 객체를 선택하게 하는 방법은 객체가 외부에 드러낼 인터페이스 수를 최소화 하는데 도와준다 생각합니다.
- 객체의 상태부터 생각하고 메시지를 고르면, 불필요한 정보가 외부에 드러날 수 있습니다.


### 인터페이스를 통한 역할과 구현의 분리
할인규칙과 벌금규칙은 미래에 수정될 수도, 추가될 수도 있습니다.
변경에 대비한 설계를 위해선, 벌금규칙, 할인규칙의 역할만 의존해야 한다 생각했습니다.

#### DIP
- 할인규칙과, 벌금규칙을 사용하는 클라이언트 코드는 추상화에만 의존하고, 구체화에는 의존하지 않아 DIP를 지키는 설계를 했습니다.

- 벌금 규칙 인터페이스
```typescript
export interface FineRuleService {
  applyFine(
    basicPayment: number,
    createChargeDto: CreateChargeDto,
  ): Promise<number>;
}
```
- 할인 규칙 인터페이스
```typescript
export interface DiscountRuleService {
  discount(
    user: User,
    createChargeDto: CreateChargeDto,
    finedMoneyResult,
    basic_fee,
  ): Promise<number>;
}
```

- 두 추상화에만 의존하는 클랑이언트 코드
```typescript
@Injectable()
export class ChargeService {
  constructor(
    private areaService: AreaService,
    @Inject('FineRuleService')
    private fineRuleService: FineRuleService,
    @Inject('DiscountRuleService')
    private discountRuleService: DiscountRuleService,
  ) {}
  async createCharge(
    @GetUser() user,
    createChargeDto: CreateChargeDto,
  ): Promise<number> {
    const basicPayment = await this.areaService.createBasicFee(createChargeDto); // 지역에따른 기본요금 생성

    const finedMoneyResult = await this.fineRuleService.applyFine(
      basicPayment.payment,
      createChargeDto,
    ); // 벌금규칙 적용

    const finalPayment = await this.discountRuleService.discount(
      user,
      createChargeDto,
      finedMoneyResult,
      basicPayment.basic_fee,
    ); //할인규칙 적용

    return finalPayment;
  }
}

```

- ChargeService객체는 할인규칙과, 벌금규칙의 추상화(인터페이스)에만 의존하고 있으므로 벌금규칙과 할인규칙의 현체(인터페이스를 구현한 클래스)가 추가 되었을 때, 클라이언트 코드인 ChargeService에는 변경의 여파가 없습니다.

#### OCP
- 확장에는 열려있지만 변경에는 닫혀있어야 합니다.
   - nestJS는 모듈 파일에서, 임포트할 구현체를 적어주면 클라이언트 코드의 생성자에선 자동으로 해당 구현체를 넣어주기에, 클라이언트 코드는 변경하지 않아도 됩니다. 즉, 확장에는 열려있고 수정에는 닫혀있는 설계가 되었습니다.

```typescript
@Injectable()
export class ChargeService {
  constructor(
    private areaService: AreaService,
    @Inject('FineRuleService')
    private fineRuleService: FineRuleService,
    @Inject('DiscountRuleService')
    private discountRuleService: DiscountRuleService,
  ) {}
```
- 생성자에 변경된 구현체를 주입해주지 않아도 변경할 구현체를 모듈파일에 임포트하기에, 확장은 되어도 변경은 없습니다.

### 기본 데이터 생성

#### 지도 생성
- 기본 데이터가 제공되어있지 않았기에, 저희는 직접 지도를 만들고, 지도의 위도와 경도를 스스로 설정해 지역을 만들고, 금지구역, 파킹존 모두 설정하였습니다.
- 지도
<img width="273" alt="스크린샷 2021-11-21 오후 4 08 38" src="https://user-images.githubusercontent.com/67785334/142753067-225794e0-0bf7-4e3c-82d2-2944511cc557.png">
(빨간 구역은 금지구역, 동그라미는 파킹존)

#### 퀵보드 생성
- 퀵보드의 개수도 지역마다 정하여 설정하였습니다.

## 기능 시나리오

1. 로그인을 합니다.
   - 회원이면 로그인을 합니다.
   - 회원이 아니면 회원가입을 합니다.
2. 퀵보드를 모두 탄다음 퀵보드 이용정보(퀵보드의 이름, 퀵보드 반납 위도 경도, 퀵보드 시작시간과 종료시간)를 요청합니다.
   - 예외 규칙에 적용되는지 판단합니다.
      - 예외 규칙에 적용되면 예외 금액을 반납합니다.
      - 그렇지 않으면 기본 요금을 계산합니다.
   - 반납한 퀵보드의 지역에 따른 기본요금을 계산합니다.
   - 벌금 규칙에 적용되는지 확인합니다.
      - 벌금 규칙에 적용되면 기본금액에서 벌금 금액을 추가한다.
      - 그렇지 않으면 할인 규칙에 적용되는지 확인합니다.
   - 할인규칙이 적용되는지 확인합니다.
      - 할인 규칙에 적용되면 기본요금에서 할인 금액을 감소시킵니다.
      - 그렇지 않으면 기본 금액을 반환합니다. 

## 협업 방식

[잡초 협업하기](https://github.com/Wanted-Free-Pre-Onboarding-Course-10/Assignment2/wiki/%ED%98%91%EC%97%85-%EB%B0%A9%EC%8B%9D)

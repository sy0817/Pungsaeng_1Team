# 서비스 소개

# 깃허브 규칙
## 협업 흐름

1. GitHub Issue 생성
2. `dev` 브랜치에서 최신 코드 반영
3. `<type>/<이슈번호>` 형식으로 작업 브랜치 생성
4. 작업 후 커밋 및 push
5. `dev` 브랜치로 PR 생성
6. 최소 1명 이상 리뷰 후 merge
7. 배포 시점에만 `dev`에서 `main`으로 PR 생성

```bash
git checkout dev
git pull origin dev
git checkout -b feature/12     ->    브렌치 생성 및 브렌치로 바로 이동
```

## visual studio 작업 순서

1. issue로 만든 브렌치로 이동
2. git status로 상태 확인
3. 작업 완료 후 git add .로 저장 ( 코드 내에서 ctrl+s로도 저장할 것! )
4. 저장에 성공하면 git commit -m " type : 작업 내용 간단 설명 "
5. git push origin '생성한 브렌치'  예) git push origin feat/3
6. 오류 ( 빨간색 ) 안뜨고 성공 ( 파란색 ) 이 뜨면 모든 과정 완료한거임

## PR 규칙

- 작업 브랜치에서 `dev`로 PR 생성
- 제목은 `type: 내용` 형식'
- 본문에 `## 작업 내용`, `## 관련 이슈`
- 본문에 `Refs #12` 또는 `Closes #12`로 이슈 연결
- 최소 1명 이상 리뷰 후 merge

이슈를 자동으로 닫으려면 `Closes #12`를 사용합니다. `dev`로 머지될 때 닫힙니다.

## type
| 타입 (Type)    | 의미 | 사용 예시                         |
|--------------| --- |-------------------------------|
| **feature**  | 새로운 기능 추가 | `feature: 로그인 기능 구현`          |
| **fix**      | 버그 수정 | `fix: 비밀번호 재설정 링크 오류 수정`      |
| **refactor** | 코드 구조 개선 (기능 변화 없음) | `refactor: 중복된 인증 로직을 함수로 분리` |
| **chore**    | 빌드 과정, 패키지 설정, 잡무 등 로직과 무관한 수정 | `chore: npm 의존성 라이브러리 업데이트`   |
| **docs** | 문서 추가, 수정, 삭제 | `docs: README.md 프로젝트 실행 방법 추가` |


# 프론트 개발 규칙

## Figma 기반 UI 구현 후 API 연동 (화면-로직 분리)

1. HTML/CSS 관련 issue 생성
2. HTML/CSS로 화면(피그마 디자인)을 똑같이 먼저 완성
3. issue push해서 merge 후 api 연동 issue 생성
4. 백엔드 데이터(API), 즉 api 연동을 작업
5. issue push해서 merge

## 하드코딩 지양 및 상수/변수화

코드 안에 [http://127.0.0.1:8000](http://127.0.0.1:8000) 같은 서버 주소나
과목 = ["국어", "영어", "수학"] 같은 목록을 직접 여러 번 적지 않습니다.

**규칙**: 상단에 변수로 묶어두거나 한 파일(config.js)에 모아서 관리하게 합니다.

## 직관적인 변수 및 클래스 이름 짓기

a1, box2, test_div 처럼 의미 없는 이름 금지.

login-btn, card-container처럼 역할을 바로 알 수 있는 직관적인 변수로 지정합니다.

## 폴더 구조 정돈

index.html, style.css, main.js 파일이 한곳에 널브러지지 않게 assets/images, css/, js/ 폴더로 나눕니다.

## 주석 작성 필수화

자신이 맡은 페이지 코드 위에 "어떤 역할을 하는 코드인지" 1~2줄 주석(//)을 쓰게 합니다. 
생기부 내용을 정리할 때도 큰 도움이 됩니다.


# 백엔드 개발 규칙
### 작업 시 순서

1. **Entity**: 설계한 ERD(데이터베이스 구조)를 토대로 작성.
2. **Repository**: 일단 껍데기만 생성해두고, Service 작성할 때 필요한 데이터베이스 작업(저장, 조회 등)이 생기면 그때그때 메서드 추가.
3. **DTO**: API 명세서 형식에 맞춰서 프론트엔드와 주고받을 Request(요청 폼), Response(응답 결과) 상자 생성.
4. **Service**: 핵심 비즈니스 로직(데이터 유효성 검사, 계산, 에러 처리 등) 담당.
5. **Controller**: API 주소(URL)를 연결하고, 사용자의 요청(Request DTO)을 Service에 넘긴 뒤, 완료된 결과를 응답(Response DTO)으로 반환.

### 계층형 아키텍처 및 패키지 구조

* **Controller (`presentation`):** HTTP 요청/응답 처리 및 DTO 변환만 수행. 비즈니스 로직 포함 금지.
* **Service (`application`):** 핵심 비즈니스 로직 수행 및 트랜잭션(`@Transactional`) 관리.
* **Repository (`infrastructure`):** 데이터베이스와의 데이터 입출력 담당.
* **Entity (`domain`):** 데이터베이스 테이블과 매핑되는 핵심 도메인 객체. 도메인 관련 로직은 엔티티 내부에 캡슐화.

### 네이밍 컨벤션

* **클래스 (Class):** `PascalCase` (예: `UserController`, `OrderService`)
* **메서드/변수 (Method/Variable):** `camelCase` (예: `getUserList`, `memberId`)
* **상수 (Constant):** `UPPER_SNAKE_CASE` (예: `MAX_LOGIN_COUNT`)
* **URL/URI 설계:** `kebab-case` 사용 및 자원(Resource)은 복수형 명사 사용 (예: `/api/v1/users`, `/api/v1/orders/{order-id}`)

### Spring Boot 구현 및 설계 규칙

* **의존성 주입 (DI):** 생성자 주입을 원칙으로 함. 필드 주입(`@Autowired`)은 테스트와 순환 참조 방지를 위해 지양하며, 롬복(Lombok)의 `@RequiredArgsConstructor`를 적극 활용.
* **Entity 안전성:** 무분별한 `@Setter` 사용을 금지. 데이터 변경이 필요할 경우 의도가 명확한 메서드(예: `changePassword()`)나 `@Builder` 패턴을 활용.
* **DTO 계층 분리:** Entity를 직접 클라이언트(API 응답)로 반환하지 말고, 반드시 DTO로 변환하여 전달.
* **전역 예외 처리:** 컨트롤러마다 개별 예외 처리를 하지 않고, `@RestControllerAdvice`와 `@ExceptionHandler`를 사용하여 일관된 전역 예외 응답 형식을 유지.

### 절대 금지!!! 로컬에만 있는 `application_local.yaml` 파일 절대 깃허브에 올리지 않기!!! 
* 패키지 구조, 네이밍 컨벤션, 설계 규칙 등은 리뷰 받고 고치면 되지만 로컬 파일은 깃허브에 올리면 되돌릴 수 없음!!!

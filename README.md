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
git checkout -b feature/12
```

## PR 규칙

- 작업 브랜치에서 `dev`로 PR 생성
- 제목은 `type: 내용` 형식'
- 본문에 `## 작업 내용`, `## 관련 이슈`
- 본문에 `Refs #12` 또는 `Closes #12`로 이슈 연결
- 최소 1명 이상 리뷰 후 merge

이슈를 자동으로 닫으려면 `Closes #12`를 사용합니다. `dev`로 머지될 때 닫힙니다.

# 프론트 개발 규칙

# 백엔드 개발 규칙

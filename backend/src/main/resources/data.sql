-- =====================================================================
-- 정적 데이터 초기 삽입 (Symptom / Tarot_Card)
-- - 애플리케이션 시작 시마다 실행된다. PK를 직접 지정하고 upsert(ON DUPLICATE KEY UPDATE)로 처리:
--   * 없으면 INSERT, 있으면 이 파일의 값으로 UPDATE -> 문구를 고치고 재시작하면 바로 반영
--   * INSERT IGNORE 와 달리 길이 초과 등 오류를 숨기지 않고 그대로 실패시킨다
-- - 행 별칭(AS new) 문법이라 MySQL 8.0.19 이상 필요
-- - 칭호(Title)는 Enum(진단 횟수로 계산)이라 여기서 넣지 않는다
-- - TODO 표시된 값은 기획 확정 후 채운다 (배포 전 필수)
-- =====================================================================

-- 고민(증상) - 프론트 checkData.js의 SYMPTOMS 기준
INSERT INTO symptom (symptom_id, title, description, keyword_suffix) VALUES
(1, '개념이 부족해요',       '기본 원리가 막막해요',       '개념 부족'),
(2, '문제가 안 풀려요',      '응용·킬러 문항에서 막혀요',  '문제 풀이 막힘'),
(3, '집중이 오래 안 돼요',   '30분만 앉아도 피로해요',     '집중력 저하'),
(4, '계획을 못 지켜요',      '매일 미루다가 자책해요',     '계획 실천 부족'),
(5, '스마트폰을 자주 봐요',  '숏폼 때문에 손이 계속 가요', '스마트폰 과다 사용'),
(6, '시험이 너무 불안해요',  '시험날 머리가 백지가 돼요',  '시험 불안')
AS new
ON DUPLICATE KEY UPDATE
    title          = new.title,
    description    = new.description,
    keyword_suffix = new.keyword_suffix;

-- 타로 카드 - 프론트 taroData.js의 CARDS 기준 (시안 순서)
-- recommended_time 은 RecommendedTime Enum 이름. TODO: 카드별 시간대 기획 확정
INSERT INTO tarot_card (card_id, name, image_url, quote, advice, keyword_prefix, recommended_time, recommended_env) VALUES
('NEW_START',       '새로운 시작',   '/images/tarot/NEW_START.png',       'TODO', 'TODO', 'TODO', 'MORNING_STUDY', 'TODO'),
('DREAM_GOAL',      '꿈과 목표',     '/images/tarot/DREAM_GOAL.png',      'TODO', 'TODO', 'TODO', 'AFTER_SCHOOL', 'TODO'),
('EFFORT',          '노력과 꾸준함', '/images/tarot/EFFORT.png',          '일정한 시간에 책상에 앉는 성실성이 최고의 무기입니다.', 'TODO', 'TODO', 'NIGHT_STUDY_1', 'TODO'),
('RIGHT_DIRECTION', '올바른 방향',   '/images/tarot/RIGHT_DIRECTION.png', 'TODO', 'TODO', 'TODO', 'AFTER_SCHOOL', 'TODO'),
('REWARD',          '성과와 보상',   '/images/tarot/REWARD.png',          'TODO', 'TODO', 'TODO', 'NIGHT_STUDY_1', 'TODO'),
('HELP_BOND',       '도움과 인연',   '/images/tarot/HELP_BOND.png',       'TODO', 'TODO', 'TODO', 'AFTER_SCHOOL', 'TODO'),
('CHALLENGE',       '도전과 극복',   '/images/tarot/CHALLENGE.png',
    '가파른 오르막길은 정상이 가까워졌다는 징조입니다.',
    '모든 단원을 한꺼번에 복습하려 하지 말고, 취약 유형 1개를 정해 3일 동안 풀이 과정을 말로 설명하는 ''메타인지 루틴''을 권장합니다.',
    '돌파와', 'NIGHT_STUDY_2', '조용한 1인 독서대'),
('GROWTH',          '성장과 발전',   '/images/tarot/GROWTH.png',          'TODO', 'TODO', 'TODO', 'NIGHT_STUDY_2', 'TODO'),
('REST',            '휴식과 재충전', '/images/tarot/REST.png',            'TODO', 'TODO', 'TODO', 'MORNING_STUDY', 'TODO'),
('BRIGHT_FUTURE',   '밝은 미래',     '/images/tarot/BRIGHT_FUTURE.png',   'TODO', 'TODO', 'TODO', 'MORNING_STUDY', 'TODO')
AS new
ON DUPLICATE KEY UPDATE
    name             = new.name,
    image_url        = new.image_url,
    quote            = new.quote,
    advice           = new.advice,
    keyword_prefix   = new.keyword_prefix,
    recommended_time = new.recommended_time,
    recommended_env  = new.recommended_env;

-- =====================================================================
-- 카드 + 고민 조합 규칙 / 타로 지침
-- TODO: 지금은 프론트 시안(prescriptionData.js)을 옮긴 테스트용 데이터. 기획 확정 후 전체 조합 채우기
-- 규칙이 없는 조합은 키워드 = 카드.keyword_prefix + 고민.keyword_suffix, 종합 조언 = null 로 응답된다
-- =====================================================================

-- 도전과 극복 x 개념이 부족해요
INSERT INTO combination_rule (rule_id, card_id, symptom_id, custom_keyword, comprehensive_advice) VALUES
(1, 'CHALLENGE', 1, '돌파와 뼈대 재건',
    '성급하게 심화 문제를 풀지 말고, 교과서 기본 정의와 예제 증명에 대한 3회독 복습이 시급합니다.')
AS new
ON DUPLICATE KEY UPDATE
    card_id              = new.card_id,
    symptom_id           = new.symptom_id,
    custom_keyword       = new.custom_keyword,
    comprehensive_advice = new.comprehensive_advice;

-- 지침은 (카드, 과목, 고민) 으로 찾고, 없으면 (카드, ETC, 고민) 공통 지침으로 대체한다
INSERT INTO tarot_action_master (action_id, card_id, symptom_id, subject_type, title, description, tag) VALUES
(1, 'CHALLENGE', 1, 'MATH', '25분 뽀모도로 타이머 켜고 개념서 2쪽 정독하기',
    '휴대폰 알림을 완전히 끄고 문제 풀이 없이 공식 유도와 논리적 흐름만을 2쪽 온전히 정독합니다.', '25분 집중'),
(2, 'CHALLENGE', 1, 'MATH', '심화 중단, 대표 예제 3문항 백지 풀이 3회 반복',
    '가장 대표적인 필수 예제 3문항을 선정해 풀이 과정을 백지에 손으로 막힘없이 써내려갈 때까지 반복합니다.', '3회독 복습'),
(3, 'CHALLENGE', 1, 'MATH', '학습 시작 전 책상 위 불필요한 물건 모두 치우기',
    '교재 1권, 풀이용 스프링 노트 1권, 펜 1자루를 제외한 간식과 스마트폰을 책상 아래로 격리합니다.', '시각적 정돈'),
(4, 'CHALLENGE', 1, 'ETC', '오늘 막힌 개념 1개를 골라 백지에 설명해 보기',
    '교재를 덮고 개념의 정의와 예시를 내 말로 적은 뒤, 교재와 비교해 빠진 부분을 채웁니다.', '메타인지'),
-- 도전과 극복 x 집중이 오래 안 돼요 (보조 고민으로 골랐을 때도 지침 1개가 반영된다)
(5, 'CHALLENGE', 3, 'ETC', '휴대폰은 다른 방에 두고 50분 타이머 맞추기',
    '알림이 보이지 않는 곳에 휴대폰을 두고, 타이머가 울릴 때까지 자리에서 일어나지 않습니다.', '환경 차단'),
(6, 'CHALLENGE', 3, 'ETC', '집중이 끊기면 할 일을 한 줄로 적고 다시 시작하기',
    '떠오른 잡생각을 메모지에 한 줄로 적어 두고 바로 하던 문제로 돌아옵니다.', '잡념 정리')
AS new
ON DUPLICATE KEY UPDATE
    card_id      = new.card_id,
    symptom_id   = new.symptom_id,
    subject_type = new.subject_type,
    title        = new.title,
    description  = new.description,
    tag          = new.tag;

-- 역방향 카드 문구 (비어 있으면 정방향 문구로 응답). TODO: 10장 모두 기획 확정 후 채우기 - 아래는 테스트용 예시
UPDATE tarot_card SET
    reversed_quote  = '넘어진 자리에서 다시 일어서는 법을 배우는 시간입니다.',
    reversed_advice = '무리하게 한계를 밀어붙이기보다, 오늘은 이미 아는 문제를 다시 풀며 자신감을 먼저 회복하세요.'
WHERE card_id = 'CHALLENGE';

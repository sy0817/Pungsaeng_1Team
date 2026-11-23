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

-- Combination_Rule / Tarot_Action_Master 는 카드·고민 데이터 확정 후 이 파일 아래에 추가

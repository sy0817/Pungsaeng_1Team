-- =====================================================================
-- 정적 데이터 초기 삽입 (Symptom / Tarot_Card)
-- - 애플리케이션 시작 시마다 실행된다. PK를 직접 지정하고 upsert(ON DUPLICATE KEY UPDATE)로 처리:
--   * 없으면 INSERT, 있으면 이 파일의 값으로 UPDATE -> 문구를 고치고 재시작하면 바로 반영
--   * INSERT IGNORE 와 달리 길이 초과 등 오류를 숨기지 않고 그대로 실패시킨다
-- - 행 별칭(AS new) 문법이라 MySQL 8.0.19 이상 필요
-- - 칭호(Title)는 Enum(진단 횟수로 계산)이라 여기서 넣지 않는다
-- - upsert 는 넣거나 덮어쓰기만 한다: 파일에서 행을 지워도 DB 에서는 지워지지 않고,
--   값을 비우려면 NULL 로 명시해야 한다. DB 에서 직접 고친 값은 재시작 시 이 파일 값으로 되돌아간다
-- - 운영(ddl-auto: validate)은 컬럼이 먼저 있어야 한다 -> 컬럼 추가 후 배포
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

-- 타로 카드 - 프론트 taroData.js의 CARDS 기준 (시안 순서). 카드 데이터는 이 upsert 한 곳에서만 관리한다
-- - keyword_prefix  : 처방 키워드 조합용. "앞부분 + ' ' + 고민 키워드" 로 붙으므로 어떤 고민이 와도 읽히게 쓴다
--                     (고민 키워드: 개념 부족 / 문제 풀이 막힘 / 집중력 저하 / 계획 실천 부족 / 스마트폰 과다 사용 / 시험 불안)
-- - display_keyword : 마이페이지 카드 통계용 표시 키워드
-- - reversed_*      : 역방향 카드 문구 (NULL 이면 정방향 문구로 응답)
-- - recommended_time: RecommendedTime Enum 이름. 바꾸면 recommended_env 도 시간대에 맞춰 같이 바꾼다
-- 길이 제한: quote / reversed_quote 255자, keyword_prefix 50자, display_keyword / recommended_env 100자
INSERT INTO tarot_card (card_id, name, image_url,
                        quote, advice, reversed_quote, reversed_advice,
                        keyword_prefix, display_keyword, recommended_time, recommended_env) VALUES
('NEW_START', '새로운 시작', '/images/tarot/NEW_START.png',
    '모든 처음은 서툴지만, 오늘 펼친 첫 페이지가 내일의 기준이 됩니다.',
    '완벽한 계획을 세우려 하지 말고, 오늘 아침 15분 동안 가장 쉬운 단원 하나를 끝까지 읽는 것으로 시작하세요.',
    '출발선에서 오래 망설일수록 시작은 점점 무거워집니다.',
    '새 계획을 또 세우기보다 어제 하다 만 것부터 10분만 이어서 해 보세요.',
    '새 출발로 이겨내는', '첫걸음 · 리셋', 'MORNING_STUDY', '아침 자습 시간의 조용한 교실 앞자리'),
('DREAM_GOAL', '꿈과 목표', '/images/tarot/DREAM_GOAL.png',
    '가고 싶은 곳이 선명할수록 오늘 해야 할 일도 선명해집니다.',
    '목표 대학이나 점수를 한 줄로 적어 책상에 붙이고, 그 목표까지 이번 주에 할 일 3가지만 정하세요.',
    '너무 먼 곳만 바라보면 발밑의 계단이 보이지 않습니다.',
    '큰 목표는 잠시 내려두고, 이번 주 안에 끝낼 수 있는 작은 목표 하나에만 집중하세요.',
    '목표로 극복하는', '목표 설정 · 동기 부여', 'AFTER_SCHOOL', '방과 후 도서관 창가 자리'),
('EFFORT', '노력과 꾸준함', '/images/tarot/EFFORT.png',
    '일정한 시간에 책상에 앉는 성실성이 최고의 무기입니다.',
    '하루 공부량을 늘리기보다 매일 같은 시간에 같은 양을 하는 루틴을 2주 동안 지켜 보세요.',
    '쉬지 않고 달리는 것만이 노력은 아닙니다.',
    '지친 채로 시간을 채우기보다, 오늘은 공부 시간을 줄이고 집중한 시간만 기록해 보세요.',
    '꾸준함으로 이겨내는', '루틴 성립 · 번아웃 방지', 'NIGHT_STUDY_1', '야간 자율학습실의 고정 자리'),
('RIGHT_DIRECTION', '올바른 방향', '/images/tarot/RIGHT_DIRECTION.png',
    '빨리 가는 것보다 맞는 길로 가는 것이 결국 더 빠릅니다.',
    '최근 시험지를 펼쳐 틀린 문제를 유형별로 나누고, 가장 많이 틀린 유형 하나부터 다시 공부하세요.',
    '열심히 가고 있어도 지도가 거꾸로 펼쳐져 있을지 모릅니다.',
    '진도를 더 나가기 전에 지금 공부법이 성적으로 이어지고 있는지 선생님께 한 번 점검받으세요.',
    '방향 점검으로 바로잡는', '방향 점검 · 전략 수정', 'AFTER_SCHOOL', '오답 노트를 넓게 펼칠 수 있는 방과 후 자습실'),
('REWARD', '성과와 보상', '/images/tarot/REWARD.png',
    '쌓아 온 시간은 사라지지 않고, 결과로 돌아올 때를 기다리고 있습니다.',
    '공부한 만큼 작은 보상을 정해 두세요. 오늘 목표를 끝내면 좋아하는 일 하나를 허락하는 식입니다.',
    '결과가 늦게 온다고 해서 오지 않는 것은 아닙니다.',
    '점수에만 매달리기보다 이번 주에 해낸 것을 세 줄로 적으며 스스로를 인정해 주세요.',
    '작은 보상으로 다스리는', '성취 · 보상 설계', 'NIGHT_STUDY_1', '할 일 체크리스트를 둔 야간 자율학습실'),
('HELP_BOND', '도움과 인연', '/images/tarot/HELP_BOND.png',
    '혼자 풀리지 않는 문제도 함께 보면 길이 보입니다.',
    '막힌 문제를 3개만 골라 친구나 선생님께 질문하고, 들은 풀이를 내 말로 다시 설명해 보세요.',
    '도움을 청하지 않는 것도 혼자 짊어지는 짐이 됩니다.',
    '모르는 것을 숨기지 말고, 오늘 안에 질문 하나를 꼭 해 보세요.',
    '함께 풀어내는', '협력 · 질문하기', 'AFTER_SCHOOL', '질문하기 좋은 방과 후 스터디룸'),
('CHALLENGE', '도전과 극복', '/images/tarot/CHALLENGE.png',
    '가파른 오르막길은 정상이 가까워졌다는 징조입니다.',
    '모든 단원을 한꺼번에 복습하려 하지 말고, 취약 유형 1개를 정해 3일 동안 풀이 과정을 말로 설명하는 ''메타인지 루틴''을 권장합니다.',
    '넘어진 자리에서 다시 일어서는 법을 배우는 시간입니다.',
    '무리하게 한계를 밀어붙이기보다, 오늘은 이미 아는 문제를 다시 풀며 자신감을 먼저 회복하세요.',
    '돌파로 이겨내는', '한계 돌파 · 압박 극복', 'NIGHT_STUDY_2', '조용한 1인 독서대'),
('GROWTH', '성장과 발전', '/images/tarot/GROWTH.png',
    '어제보다 한 문제 더 풀 수 있다면, 당신은 이미 자라고 있습니다.',
    '한 달 전 풀었던 문제를 다시 풀어 보고 달라진 점을 확인하세요. 성장을 눈으로 보면 계속할 힘이 생깁니다.',
    '성장이 멈춘 듯한 시간도 뿌리가 자라는 시간입니다.',
    '정체기라고 느껴지면 새 문제집 대신 이미 푼 문제를 한 번 더 완벽하게 풀어 보세요.',
    '성장으로 넘어서는', '실력 향상 · 자기 성찰', 'NIGHT_STUDY_2', '지난 오답 노트를 곁에 둔 야간 자율학습실'),
('REST', '휴식과 재충전', '/images/tarot/REST.png',
    '잘 쉬는 것도 실력입니다. 멈춤은 다음 질주를 위한 준비입니다.',
    '오늘은 공부 시간을 30분 줄이고, 그 시간에 충분히 자거나 가볍게 걸으며 머리를 비워 보세요.',
    '쉬는 것과 미루는 것은 다릅니다.',
    '쉬는 시간을 미리 정해 두고, 타이머가 울리면 바로 책상으로 돌아오는 연습부터 해 보세요.',
    '재충전으로 다스리는', '휴식 · 컨디션 회복', 'MORNING_STUDY', '환기가 잘 되는 밝은 교실 자리'),
('BRIGHT_FUTURE', '밝은 미래', '/images/tarot/BRIGHT_FUTURE.png',
    '지금의 노력은 아직 보이지 않는 내일을 밝히는 불빛입니다.',
    '시험이 끝난 뒤의 내 모습을 구체적으로 적어 보고, 그 모습에 가까워지는 오늘의 할 일 하나를 정하세요.',
    '막연한 기대만으로는 내일이 저절로 밝아지지 않습니다.',
    '결과를 걱정하기보다 오늘 할 수 있는 일 한 가지를 끝내는 데 집중하세요.',
    '희망으로 이겨내는', '희망 · 자신감', 'MORNING_STUDY', '햇빛이 드는 아침 교실 창가 자리')
AS new
ON DUPLICATE KEY UPDATE
    name             = new.name,
    image_url        = new.image_url,
    quote            = new.quote,
    advice           = new.advice,
    reversed_quote   = new.reversed_quote,
    reversed_advice  = new.reversed_advice,
    keyword_prefix   = new.keyword_prefix,
    display_keyword  = new.display_keyword,
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

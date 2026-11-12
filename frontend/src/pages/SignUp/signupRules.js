export const RED = "#FB5541";

export const ID_RULE = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,12}$/; // 영문+숫자 조합 6~12자
export const PW_RULE = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[^A-Za-z\d]).{8,}$/; // 8자 이상 + 영문, 숫자, 특수문자

// 아이디 중복 확인 결과 메시지
export const ID_MESSAGES = {
  available: { ok: true, text: "사용 가능한 아이디입니다." },
  invalid: { ok: false, text: "아이디는 영문, 숫자 조합 6~12자로 입력해주세요." },
  unchecked: { ok: false, text: "아이디 중복 확인을 해주세요." },
};

package com.likelion.pungsaeng.domain.user.entity;

import com.likelion.pungsaeng.global.common.BaseTimeEntity;
import com.likelion.pungsaeng.global.common.enums.Title;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

/**
 * 회원 탈퇴 시 진단 / 복수 고민 매핑 / RefreshToken 은 DB FK(ON DELETE CASCADE)로 함께 삭제된다.
 * 응답에는 엔티티를 직접 내보내지 말고 DTO 로 변환할 것 (password 노출 방지)
 */
@Getter
@Entity
@Table(name = "users")
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class User extends BaseTimeEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long id;

    // 누적 진단 횟수 (칭호 기준). 진단 기록을 삭제해도 줄이지 않는다.
    // 증가는 동시성 문제로 UserRepository.increaseDiagnosisCount()(DB 원자적 UPDATE)로만 한다.
    // 현재 남아 있는 기록 수가 필요하면 consultation 테이블을 count 한다.
    @Column(name = "total_diagnosis_count", nullable = false)
    private Integer totalDiagnosisCount = 0;

    @Column(name = "login_id", nullable = false, unique = true, length = 50)
    private String loginId;

    // BCrypt 해시
    @Column(name = "password", nullable = false)
    private String password;

    @Builder
    public User(String loginId, String password) {
        this.loginId = loginId;
        this.password = password;
        this.totalDiagnosisCount = 0;
    }

    public Title getTitle() {
        return Title.of(totalDiagnosisCount);
    }
}

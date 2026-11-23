package com.likelion.pungsaeng.domain.auth.entity;

import com.likelion.pungsaeng.domain.user.entity.User;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.OneToOne;
import jakarta.persistence.Table;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;

import java.time.LocalDateTime;

/**
 * Refresh Token 저장소 (유저당 1개)
 *
 * - 원문 토큰이 아니라 SHA-256 해시만 저장 -> DB가 유출돼도 토큰을 재사용할 수 없음
 * - 재발급(reissue) 때마다 새 토큰으로 교체(rotation) -> 이전 토큰은 즉시 무효
 *   이미 교체된 토큰으로 재발급 요청이 오면 탈취로 보고 행을 삭제(강제 로그아웃)하는 식으로 활용
 * - 로그아웃 시 행 삭제, 회원 탈퇴 시 DB FK(ON DELETE CASCADE)로 함께 삭제
 * - 유저당 1개라 다른 기기에서 로그인하면 기존 기기의 세션은 만료됨
 */
@Getter
@Entity
@Table(name = "refresh_token")
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class RefreshToken {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long id;

    @OneToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "user_id", nullable = false, unique = true)
    @OnDelete(action = OnDeleteAction.CASCADE)
    private User user;

    // SHA-256 hex = 64자
    @Column(name = "token_hash", nullable = false, unique = true, length = 64)
    private String tokenHash;

    @Column(name = "expires_at", nullable = false)
    private LocalDateTime expiresAt;

    @Builder
    public RefreshToken(User user, String tokenHash, LocalDateTime expiresAt) {
        this.user = user;
        this.tokenHash = tokenHash;
        this.expiresAt = expiresAt;
    }

    public void rotate(String newTokenHash, LocalDateTime newExpiresAt) {
        this.tokenHash = newTokenHash;
        this.expiresAt = newExpiresAt;
    }

    public boolean isExpired(LocalDateTime now) {
        return expiresAt.isBefore(now);
    }
}

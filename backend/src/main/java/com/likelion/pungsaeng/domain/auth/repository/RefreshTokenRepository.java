package com.likelion.pungsaeng.domain.auth.repository;

import com.likelion.pungsaeng.domain.auth.entity.RefreshToken;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.time.LocalDateTime;
import java.util.Optional;

public interface RefreshTokenRepository extends JpaRepository<RefreshToken, Long> {

    Optional<RefreshToken> findByUserId(Long userId);

    Optional<RefreshToken> findByTokenHash(String tokenHash);

    /**
     * 유저의 Refresh Token 을 저장하거나 교체한다 (유저당 1개).
     * 조회 후 저장하면 같은 유저가 동시에 로그인할 때 둘 다 INSERT 를 시도해 유니크 제약 위반이 나므로
     * MySQL upsert 한 문장으로 원자적으로 처리한다. (행 별칭 문법: MySQL 8.0.19+)
     */
    @Modifying(clearAutomatically = true, flushAutomatically = true)
    @Query(value = """
            INSERT INTO refresh_token (user_id, token_hash, expires_at)
            VALUES (:userId, :tokenHash, :expiresAt) AS new
            ON DUPLICATE KEY UPDATE
                token_hash = new.token_hash,
                expires_at = new.expires_at
            """, nativeQuery = true)
    void upsert(@Param("userId") Long userId,
                @Param("tokenHash") String tokenHash,
                @Param("expiresAt") LocalDateTime expiresAt);
}

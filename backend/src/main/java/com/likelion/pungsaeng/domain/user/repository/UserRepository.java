package com.likelion.pungsaeng.domain.user.repository;

import com.likelion.pungsaeng.domain.user.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.Optional;

public interface UserRepository extends JpaRepository<User, Long> {

    Optional<User> findByLoginId(String loginId);

    boolean existsByLoginId(String loginId);

    /**
     * 진단 횟수를 DB에서 원자적으로 +1 (동시 요청 시 갱신 누락 방지).
     * 영속성 컨텍스트를 거치지 않으므로, 같은 트랜잭션에서 이미 조회한 User 의 값은 갱신되지 않는다.
     */
    @Modifying(clearAutomatically = true, flushAutomatically = true)
    @Query("update User u set u.totalDiagnosisCount = u.totalDiagnosisCount + 1 where u.id = :userId")
    int increaseDiagnosisCount(@Param("userId") Long userId);
}

package com.likelion.pungsaeng.global.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import java.time.Clock;

/**
 * 현재 시각을 주입받아 쓰기 위한 Clock (테스트에서 시각을 고정할 수 있게)
 */
@Configuration
public class ClockConfig {

    @Bean
    public Clock clock() {
        return Clock.systemDefaultZone();
    }
}

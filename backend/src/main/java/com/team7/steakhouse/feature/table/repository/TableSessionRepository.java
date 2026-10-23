package com.team7.steakhouse.feature.table.repository;

import com.team7.steakhouse.feature.table.entity.SessionStatus;
import com.team7.steakhouse.feature.table.entity.TableSession;
import jakarta.persistence.LockModeType;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Lock;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.time.Instant;
import java.util.List;
import java.util.Optional;
import java.util.UUID;
import com.team7.steakhouse.feature.table.dto.ClosedSessionInfo;

public interface TableSessionRepository extends JpaRepository<TableSession, UUID> {

    Optional<TableSession> findByTableIdAndStatus(UUID tableId, SessionStatus status);

    boolean existsByTableId(UUID tableId);

    @Query("SELECT new com.team7.steakhouse.feature.table.dto.ClosedSessionInfo(s.table.id, s.id, CASE WHEN r.id IS NOT NULL THEN true ELSE false END) " +
           "FROM TableSession s " +
           "LEFT JOIN Payment p ON p.session = s " +
           "LEFT JOIN Receipt r ON r.payment = p " +
           "WHERE s.status = 'CLOSED' " +
           "AND s.closedAt = (SELECT MAX(s2.closedAt) FROM TableSession s2 WHERE s2.table = s.table AND s2.status = 'CLOSED')")
    List<ClosedSessionInfo> findLatestClosedSessionsInfo();

    List<TableSession> findByStatusAndLastActivityAtBefore(SessionStatus status, Instant cutoff);

    List<TableSession> findByStatus(SessionStatus status);

    // Serializes round-send and close-out against concurrent cart mutations (spec §B2)
    @Lock(LockModeType.PESSIMISTIC_WRITE)
    @Query("select s from TableSession s where s.id = :id")
    Optional<TableSession> findByIdForUpdate(@Param("id") UUID id);
}

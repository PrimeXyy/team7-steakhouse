package com.team7.steakhouse.feature.table.service;

import com.team7.steakhouse.common.dto.PageResponse;
import com.team7.steakhouse.feature.table.dto.TableCreateRequest;
import com.team7.steakhouse.feature.table.dto.TableResponse;
import com.team7.steakhouse.feature.table.dto.TableUpdateRequest;
import org.springframework.data.domain.Pageable;

import java.util.UUID;

public interface DiningTableService {

    PageResponse<TableResponse> getAll(Pageable pageable);

    TableResponse getById(UUID id);

    TableResponse create(TableCreateRequest request);

    TableResponse update(UUID id, TableUpdateRequest request);

    TableResponse regenerateQrToken(UUID id);

    void delete(UUID id);
}

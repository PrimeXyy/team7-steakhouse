package com.team7.steakhouse.feature.menu.service;

import com.team7.steakhouse.common.dto.PageResponse;
import com.team7.steakhouse.feature.menu.dto.CategoryCreateRequest;
import com.team7.steakhouse.feature.menu.dto.CategoryResponse;
import com.team7.steakhouse.feature.menu.dto.CategoryUpdateRequest;
import org.springframework.data.domain.Pageable;

import java.util.List;
import java.util.UUID;

public interface CategoryService {

    PageResponse<CategoryResponse> getAll(Pageable pageable);

    /** Active categories in display order — the guest-facing menu tabs. */
    List<CategoryResponse> getActive();

    CategoryResponse getById(UUID id);

    CategoryResponse create(CategoryCreateRequest request);

    CategoryResponse update(UUID id, CategoryUpdateRequest request);

    void delete(UUID id);
}

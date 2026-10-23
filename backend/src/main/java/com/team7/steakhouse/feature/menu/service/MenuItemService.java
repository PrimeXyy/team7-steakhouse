package com.team7.steakhouse.feature.menu.service;

import com.team7.steakhouse.common.dto.PageResponse;
import com.team7.steakhouse.feature.menu.dto.MenuItemCreateRequest;
import com.team7.steakhouse.feature.menu.dto.MenuItemResponse;
import com.team7.steakhouse.feature.menu.dto.MenuItemUpdateRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.web.multipart.MultipartFile;

import java.util.UUID;

public interface MenuItemService {

    PageResponse<MenuItemResponse> getAll(Pageable pageable, UUID categoryId, Boolean available);

    MenuItemResponse getById(UUID id);

    MenuItemResponse create(MenuItemCreateRequest request);

    MenuItemResponse update(UUID id, MenuItemUpdateRequest request);

    MenuItemResponse updateAvailability(UUID id, boolean available);

    void delete(UUID id);

    MenuItemResponse uploadImage(UUID id, MultipartFile file);
}

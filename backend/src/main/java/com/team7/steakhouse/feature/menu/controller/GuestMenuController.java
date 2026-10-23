package com.team7.steakhouse.feature.menu.controller;

import com.team7.steakhouse.common.dto.ApiResponse;
import com.team7.steakhouse.common.dto.PageResponse;
import com.team7.steakhouse.feature.menu.dto.CategoryResponse;
import com.team7.steakhouse.feature.menu.dto.GuestMenuItemDetailResponse;
import com.team7.steakhouse.feature.menu.dto.MenuItemResponse;
import com.team7.steakhouse.feature.menu.service.CategoryService;
import com.team7.steakhouse.feature.menu.service.MenuItemService;
import com.team7.steakhouse.feature.modifier.dto.AttachedModifierGroupResponse;
import com.team7.steakhouse.feature.modifier.service.MenuItemModifierService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.UUID;

/**
 * Read-only menu browsing for QR-table guests. Only available items are listed;
 * unavailable modifier options are still returned so the client can badge them "N/A".
 */
@RestController
@RequestMapping("/api/v1/guest/menu")
@PreAuthorize("hasRole('GUEST')")
@RequiredArgsConstructor
public class GuestMenuController {

    private final CategoryService categoryService;
    private final MenuItemService menuItemService;
    private final MenuItemModifierService menuItemModifierService;

    @GetMapping("/categories")
    public ResponseEntity<ApiResponse<List<CategoryResponse>>> getCategories() {
        return ResponseEntity.ok(ApiResponse.success(categoryService.getActive()));
    }

    @GetMapping("/items")
    public ResponseEntity<ApiResponse<PageResponse<MenuItemResponse>>> getItems(
            @RequestParam(required = false) UUID categoryId,
            @PageableDefault(size = 50, sort = "nameEn") Pageable pageable) {
        return ResponseEntity.ok(
                ApiResponse.success(menuItemService.getAll(pageable, categoryId, null)));
    }

    @GetMapping("/items/{id}")
    public ResponseEntity<ApiResponse<GuestMenuItemDetailResponse>> getItemDetail(@PathVariable UUID id) {
        MenuItemResponse item = menuItemService.getById(id);
        List<AttachedModifierGroupResponse> groups = menuItemModifierService.getForMenuItem(id).stream()
                .filter(attached -> attached.group().active())
                .toList();
        return ResponseEntity.ok(ApiResponse.success(new GuestMenuItemDetailResponse(item, groups)));
    }
}

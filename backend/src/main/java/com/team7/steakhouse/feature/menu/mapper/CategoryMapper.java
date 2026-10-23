package com.team7.steakhouse.feature.menu.mapper;

import com.team7.steakhouse.feature.menu.dto.CategoryResponse;
import com.team7.steakhouse.feature.menu.entity.Category;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface CategoryMapper {

    default CategoryResponse toResponse(Category category) {
        if (category == null) {
            return null;
        }
        return new CategoryResponse(
                category.getId(),
                category.getNameEn(),
                category.getNameKm(),
                category.getDescription(),
                category.getSortOrder(),
                category.isActive(),
                category.isAllowNotes(),
                category.getCreatedAt(),
                category.getUpdatedAt()
        );
    }
}

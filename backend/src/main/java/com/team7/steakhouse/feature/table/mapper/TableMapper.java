package com.team7.steakhouse.feature.table.mapper;

import com.team7.steakhouse.feature.table.dto.TableResponse;
import com.team7.steakhouse.feature.table.entity.DiningTable;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface TableMapper {

    TableResponse toResponse(DiningTable table);
}

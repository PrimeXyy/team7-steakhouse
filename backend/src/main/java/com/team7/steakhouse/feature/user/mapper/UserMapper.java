package com.team7.steakhouse.feature.user.mapper;

import com.team7.steakhouse.feature.user.dto.UserResponse;
import com.team7.steakhouse.feature.user.entity.Role;
import com.team7.steakhouse.feature.user.entity.RoleName;
import com.team7.steakhouse.feature.user.entity.User;
import org.mapstruct.Mapper;

import java.util.Set;
import java.util.stream.Collectors;

@Mapper(componentModel = "spring")
public interface UserMapper {

    default UserResponse toResponse(User user) {
        if (user == null) {
            return null;
        }
        return new UserResponse(
                user.getId(),
                user.getUsername(),
                user.getEmail(),
                user.isEnabled(),
                toRoleNames(user.getRoles()),
                user.getCreatedAt(),
                user.getUpdatedAt()
        );
    }

    default Set<RoleName> toRoleNames(Set<Role> roles) {
        return roles.stream().map(Role::getName).collect(Collectors.toSet());
    }
}

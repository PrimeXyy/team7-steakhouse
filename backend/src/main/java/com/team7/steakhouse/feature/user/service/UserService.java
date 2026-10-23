package com.team7.steakhouse.feature.user.service;

import com.team7.steakhouse.feature.user.dto.PasswordResetRequest;
import com.team7.steakhouse.feature.user.dto.UserCreateRequest;
import com.team7.steakhouse.feature.user.dto.UserResponse;
import com.team7.steakhouse.feature.user.dto.UserUpdateRequest;

import java.util.List;
import java.util.UUID;

public interface UserService {

    UserResponse create(UserCreateRequest request);

    UserResponse getById(UUID id);

    List<UserResponse> getAll();

    UserResponse update(UUID id, UserUpdateRequest request);

    void delete(UUID id);

    void resetPassword(UUID id, PasswordResetRequest request);
}

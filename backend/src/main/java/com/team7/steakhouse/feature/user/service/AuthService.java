package com.team7.steakhouse.feature.user.service;

import com.team7.steakhouse.feature.user.dto.LoginRequest;
import com.team7.steakhouse.feature.user.dto.LoginResponse;
import com.team7.steakhouse.feature.user.dto.UserCreateRequest;
import com.team7.steakhouse.feature.user.dto.UserResponse;

public interface AuthService {

    LoginResponse login(LoginRequest request);

    UserResponse register(UserCreateRequest request);
}

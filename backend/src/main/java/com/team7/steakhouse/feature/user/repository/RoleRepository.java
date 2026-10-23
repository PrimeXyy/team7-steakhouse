package com.team7.steakhouse.feature.user.repository;

import com.team7.steakhouse.feature.user.entity.Role;
import com.team7.steakhouse.feature.user.entity.RoleName;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;
import java.util.UUID;

public interface RoleRepository extends JpaRepository<Role, UUID> {

    Optional<Role> findByName(RoleName name);
}

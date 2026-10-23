package com.team7.steakhouse.feature.modifier.repository;

import com.team7.steakhouse.feature.modifier.entity.ModifierGroup;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.UUID;

public interface ModifierGroupRepository extends JpaRepository<ModifierGroup, UUID> {
}

package com.team7.steakhouse.feature.modifier.repository;

import com.team7.steakhouse.feature.modifier.entity.ModifierOption;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.UUID;

public interface ModifierOptionRepository extends JpaRepository<ModifierOption, UUID> {
}

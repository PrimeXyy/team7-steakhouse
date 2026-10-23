package com.team7.steakhouse.feature.modifier.dto;

/**
 * A modifier group as attached to a specific menu item — sortOrder is per-item
 * (lives on the join), the group content is shared.
 */
public record AttachedModifierGroupResponse(
        int sortOrder,
        ModifierGroupResponse group
) {
}

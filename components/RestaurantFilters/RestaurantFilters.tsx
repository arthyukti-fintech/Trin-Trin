import React from 'react';
import { View, Text, StyleSheet, Pressable, ScrollView, Switch } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Colors, Spacing } from '@/app/theme';

export type FilterType = 'all' | 'freeDelivery' | 'cloudKitchen' | 'fastDelivery' | 'topRated' | 'newlyOpened';

interface Filter {
    id: FilterType;
    label: string;
    icon: keyof typeof Ionicons.glyphMap;
    color: string;
}

interface RestaurantFiltersProps {
    selectedFilter: FilterType;
    isVegOnly: boolean;
    onFilterChange: (filter: FilterType) => void;
    onVegToggle: (value: boolean) => void;
}

const filters: Filter[] = [
    {
        id: 'all',
        label: 'All',
        icon: 'grid-outline',
        color: Colors.primary,
    },
    {
        id: 'freeDelivery',
        label: 'Free Delivery',
        icon: 'bicycle-outline',
        color: '#8B5CF6',
    },
    {
        id: 'fastDelivery',
        label: 'Fast Delivery',
        icon: 'flash-outline',
        color: '#F59E0B',
    },
    {
        id: 'topRated',
        label: 'Top Rated',
        icon: 'star-outline',
        color: '#FBBF24',
    },
    {
        id: 'cloudKitchen',
        label: 'Cloud Kitchen',
        icon: 'cloud-outline',
        color: '#06B6D4',
    },
    {
        id: 'newlyOpened',
        label: 'New',
        icon: 'sparkles-outline',
        color: '#EC4899',
    },
];

export default function RestaurantFilters({
    selectedFilter,
    isVegOnly,
    onFilterChange,
    onVegToggle
}: RestaurantFiltersProps) {

    return (
        <View style={styles.container}>
            <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={styles.scrollContent}
            >
                {/* Veg Only Toggle - First in the list */}
                <View style={styles.vegToggleChip}>
                    <View style={styles.vegIndicator}>
                        <View style={[styles.vegDot, { borderColor: '#10B981' }]}>
                            <View style={[styles.vegDotInner, { backgroundColor: '#10B981' }]} />
                        </View>
                    </View>
                    <Text style={styles.vegToggleText}>Veg Only</Text>
                    <Switch
                        value={isVegOnly}
                        onValueChange={onVegToggle}
                        trackColor={{
                            false: '#D1D5DB',
                            true: '#10B981'
                        }}
                        thumbColor="#fff"
                        ios_backgroundColor="#D1D5DB"
                        style={styles.switch}
                    />
                </View>

                {/* Regular Filters */}
                {filters.map((filter) => {
                    const isSelected = selectedFilter === filter.id;

                    return (
                        <Pressable
                            key={filter.id}
                            onPress={() => onFilterChange(filter.id)}
                            style={({ pressed }) => [
                                styles.filterChip,
                                isSelected && styles.filterChipSelected,
                                isSelected && {
                                    backgroundColor: filter.color + '20',
                                    borderColor: filter.color,
                                },
                                { opacity: pressed ? 0.7 : 1 },
                            ]}
                        >
                            <Ionicons
                                name={filter.icon}
                                size={16}
                                color={isSelected ? filter.color : Colors.muted}
                            />
                            <Text
                                style={[
                                    styles.filterText,
                                    isSelected && styles.filterTextSelected,
                                    isSelected && { color: filter.color },
                                ]}
                            >
                                {filter.label}
                            </Text>
                        </Pressable>
                    );
                })}
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        marginBottom: Spacing.md,
    },
    scrollContent: {
        paddingHorizontal: Spacing.md,
        gap: 8,
    },
    vegToggleChip: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8,
        paddingLeft: 14,
        paddingRight: 10,
        paddingVertical: 6,
        borderRadius: 20,
        backgroundColor: Colors.background,
        borderWidth: 1.5,
        borderColor: Colors.border,
        shadowColor: Colors.shadow,
        shadowOpacity: 0.05,
        shadowRadius: 4,
        shadowOffset: { width: 0, height: 2 },
        elevation: 2,
    },
    vegIndicator: {
        width: 18,
        height: 18,
        alignItems: 'center',
        justifyContent: 'center',
    },
    vegDot: {
        width: 16,
        height: 16,
        borderRadius: 3,
        borderWidth: 2,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    vegDotInner: {
        width: 8,
        height: 8,
        borderRadius: 2,
    },
    vegToggleText: {
        fontSize: 13,
        fontWeight: '600',
        color: Colors.secondary,
    },
    switch: {
        transform: [{ scaleX: 0.85 }, { scaleY: 0.85 }],
    },
    filterChip: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 6,
        paddingHorizontal: 14,
        paddingVertical: 9,
        borderRadius: 20,
        backgroundColor: Colors.background,
        borderWidth: 1.5,
        borderColor: Colors.border,
        shadowColor: Colors.shadow,
        shadowOpacity: 0.05,
        shadowRadius: 4,
        shadowOffset: { width: 0, height: 2 },
        elevation: 2,
    },
    filterChipSelected: {
        borderWidth: 2,
        shadowOpacity: 0.1,
        shadowRadius: 6,
        elevation: 3,
    },
    filterText: {
        fontSize: 13,
        fontWeight: '600',
        color: Colors.muted,
    },
    filterTextSelected: {
        fontWeight: '700',
    },
});
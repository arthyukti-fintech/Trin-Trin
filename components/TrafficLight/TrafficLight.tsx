// TrafficLight.tsx
import React, { useState, useEffect } from 'react';
import { View, StyleSheet } from 'react-native';

export const TRAFFIC_STATUS = {
    OPEN: 'open',
    BUSY: 'busy',
    CLOSED: 'closed',
} as const;

interface TrafficLightProps {
    status: 'open' | 'busy' | 'closed';
}

export const TrafficLight: React.FC<TrafficLightProps> = ({ status }) => {
    const [blink, setBlink] = useState(true);

    useEffect(() => {
        const interval = setInterval(() => {
            setBlink(prev => !prev);
        }, 600); // slower blink — less distracting
        return () => clearInterval(interval);
    }, []);

    const COLORS = {
        red: '#EF4444',
        yellow: '#F59E0B',
        green: '#10B981',
        inactive: '#E5E7EB',
    };

    const getLightColor = (lightType: 'red' | 'yellow' | 'green') => {
        const isActive =
            (status === TRAFFIC_STATUS.CLOSED && lightType === 'red') ||
            (status === TRAFFIC_STATUS.BUSY && lightType === 'yellow') ||
            (status === TRAFFIC_STATUS.OPEN && lightType === 'green');

        if (!isActive) return COLORS.inactive;
        return blink ? COLORS[lightType] : COLORS.inactive;
    };

    const getGlowColor = () => {
        switch (status) {
            case TRAFFIC_STATUS.OPEN: return 'rgba(16, 185, 129, 0.35)';
            case TRAFFIC_STATUS.BUSY: return 'rgba(245, 158, 11, 0.35)';
            case TRAFFIC_STATUS.CLOSED: return 'rgba(239, 68, 68, 0.35)';
            default: return 'transparent';
        }
    };

    return (
        <View style={styles.housing}>
            {/* Red */}
            <View style={[
                styles.light,
                { backgroundColor: getLightColor('red') },
                status === TRAFFIC_STATUS.CLOSED && blink && {
                    shadowColor: COLORS.red,
                    shadowOpacity: 0.8,
                    shadowRadius: 6,
                    elevation: 6,
                },
            ]} />

            {/* Yellow */}
            <View style={[
                styles.light,
                { backgroundColor: getLightColor('yellow') },
                status === TRAFFIC_STATUS.BUSY && blink && {
                    shadowColor: COLORS.yellow,
                    shadowOpacity: 0.8,
                    shadowRadius: 6,
                    elevation: 6,
                },
            ]} />

            {/* Green */}
            <View style={[
                styles.light,
                { backgroundColor: getLightColor('green') },
                status === TRAFFIC_STATUS.OPEN && blink && {
                    shadowColor: COLORS.green,
                    shadowOpacity: 0.8,
                    shadowRadius: 6,
                    elevation: 6,
                },
            ]} />
        </View>
    );
};

// Helper functions (unchanged)
export const calculateTrafficStatus = (
    currentOrders: number,
    maxCapacity: number = 10,
    isAcceptingOrders: boolean = true
): 'open' | 'busy' | 'closed' => {
    if (!isAcceptingOrders) return TRAFFIC_STATUS.CLOSED;
    const utilization = currentOrders / maxCapacity;
    if (utilization >= 0.8) return TRAFFIC_STATUS.CLOSED;
    if (utilization >= 0.5) return TRAFFIC_STATUS.BUSY;
    return TRAFFIC_STATUS.OPEN;
};

export const estimateDeliveryTime = (
    status: 'open' | 'busy' | 'closed',
    baseTime: number = 30
): number => {
    switch (status) {
        case TRAFFIC_STATUS.OPEN: return baseTime;
        case TRAFFIC_STATUS.BUSY: return baseTime + 15;
        case TRAFFIC_STATUS.CLOSED: return 0;
        default: return baseTime;
    }
};

const styles = StyleSheet.create({
    housing: {
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 5,
        backgroundColor: '#1F2937',
        paddingVertical: 8,
        paddingHorizontal: 7,
        borderRadius: 14,
        borderWidth: 1,
        borderColor: '#374151',
        // subtle shadow for the housing
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 4,
        elevation: 4,
    },
    light: {
        width: 14,
        height: 14,
        borderRadius: 7,
        shadowOffset: { width: 0, height: 0 },
        shadowOpacity: 0,
        shadowRadius: 0,
        elevation: 0,
    },
});
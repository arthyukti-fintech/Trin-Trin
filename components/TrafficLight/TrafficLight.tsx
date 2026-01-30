// TrafficLight.tsx
import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';

export const TRAFFIC_STATUS = {
    OPEN: 'open',      // Green - Available
    BUSY: 'busy',      // Yellow - Partially Busy
    CLOSED: 'closed',  // Red - Busy or Closed
} as const;

interface TrafficLightProps {
    status: 'open' | 'busy' | 'closed';
    deliveryTime?: number; // Estimated delivery time in minutes
}

export const TrafficLight: React.FC<TrafficLightProps> = ({
    status,
    deliveryTime = 30,
}) => {
    const [blink, setBlink] = useState(true);

    // Blinking effect for all active lights
    useEffect(() => {
        const interval = setInterval(() => {
            setBlink(prev => !prev);
        }, 200);
        return () => clearInterval(interval);
    }, []);

    // Get colors and info based on status
    const getStatusInfo = () => {
        switch (status) {
            case TRAFFIC_STATUS.OPEN:
                return {
                    color: '#10B981',
                    bgColor: '#D1FAE5',
                    text: 'Fast Delivery',
                    time: `${deliveryTime} min`,
                    icon: '⚡',
                };
            case TRAFFIC_STATUS.BUSY:
                return {
                    color: '#F59E0B',
                    bgColor: '#FEF3C7',
                    text: 'Busy',
                    time: `${deliveryTime + 10}-${deliveryTime + 15} min`,
                    icon: '⏱️',
                };
            case TRAFFIC_STATUS.CLOSED:
                return {
                    color: '#EF4444',
                    bgColor: '#FEE2E2',
                    text: 'Closed',
                    time: 'Not available',
                    icon: '🔴',
                };
            default:
                return {
                    color: '#6B7280',
                    bgColor: '#F3F4F6',
                    text: 'Unknown',
                    time: '--',
                    icon: '❓',
                };
        }
    };

    const info = getStatusInfo();
    const inactiveColor = '#E5E7EB';

    // Get light color for each position
    const getLightColor = (lightType: 'red' | 'yellow' | 'green') => {
        const isActive =
            (status === TRAFFIC_STATUS.CLOSED && lightType === 'red') ||
            (status === TRAFFIC_STATUS.BUSY && lightType === 'yellow') ||
            (status === TRAFFIC_STATUS.OPEN && lightType === 'green');

        if (isActive) {
            // Blink all active lights
            return blink ? info.color : inactiveColor;
        }

        return inactiveColor;
    };

    return (
        <View style={[styles.container, { backgroundColor: info.bgColor }]}>
            {/* Left: Traffic Lights */}
            <View style={styles.lightsSection}>
                <View style={styles.lightRow}>
                    <View style={[styles.light, { backgroundColor: getLightColor('red') }]} />
                    <View style={[styles.light, { backgroundColor: getLightColor('yellow') }]} />
                    <View style={[styles.light, { backgroundColor: getLightColor('green') }]} />
                </View>
            </View>

            {/* Middle: Status Info */}
            <View style={styles.infoSection}>
                <View style={styles.statusRow}>
                    <Text style={styles.icon}>{info.icon}</Text>
                    <Text style={[styles.statusText, { color: info.color }]}>
                        {info.text}
                    </Text>
                </View>
                <Text style={styles.timeText}>{info.time}</Text>
            </View>
        </View>
    );
};

// Helper function to calculate traffic status
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

// Helper function to estimate delivery time based on traffic
export const estimateDeliveryTime = (
    status: 'open' | 'busy' | 'closed',
    baseTime: number = 30
): number => {
    switch (status) {
        case TRAFFIC_STATUS.OPEN:
            return baseTime;
        case TRAFFIC_STATUS.BUSY:
            return baseTime + 15;
        case TRAFFIC_STATUS.CLOSED:
            return 0;
        default:
            return baseTime;
    }
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 12,
        paddingVertical: 10,
        borderRadius: 12,
        marginBottom: 12,
        gap: 12,
        borderWidth: 1,
        borderColor: 'rgba(0, 0, 0, 0.05)',
    },
    lightsSection: {
        justifyContent: 'center',
    },
    lightRow: {
        flexDirection: 'row',
        gap: 6,
        backgroundColor: '#F9FAFB',
        padding: 6,
        borderRadius: 20,
        borderWidth: 1,
        borderColor: '#E5E7EB',
    },
    light: {
        width: 12,
        height: 12,
        borderRadius: 6,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.2,
        shadowRadius: 2,
        elevation: 2,
    },
    infoSection: {
        flex: 1,
        gap: 2,
    },
    statusRow: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 6,
    },
    icon: {
        fontSize: 16,
    },
    statusText: {
        fontSize: 14,
        fontWeight: '700',
        letterSpacing: -0.2,
    },
    timeText: {
        fontSize: 12,
        color: '#6B7280',
        fontWeight: '600',
        marginLeft: 22,
    },
});
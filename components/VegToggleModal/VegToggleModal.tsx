import React from 'react';
import { View, Text, StyleSheet, Modal, Pressable, Animated } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Colors, Spacing } from '@/app/theme';

interface VegToggleModalProps {
    visible: boolean;
    isVegOnly: boolean;
    onConfirm: () => void;
    onCancel: () => void;
}

export default function VegToggleModal({ visible, isVegOnly, onConfirm, onCancel }: VegToggleModalProps) {
    return (
        <Modal
            visible={visible}
            transparent
            animationType="fade"
            onRequestClose={onCancel}
        >
            <View style={styles.overlay}>
                <Pressable style={styles.backdrop} onPress={onCancel} />

                <View style={styles.modalContainer}>
                    <View style={styles.iconContainer}>
                        <View style={[
                            styles.iconCircle,
                            { backgroundColor: isVegOnly ? '#10B98120' : Colors.primarySoft }
                        ]}>
                            {isVegOnly ? (
                                <View style={styles.vegIndicator}>
                                    <View style={[styles.vegDot, { borderColor: '#10B981' }]}>
                                        <View style={[styles.vegDotInner, { backgroundColor: '#10B981' }]} />
                                    </View>
                                </View>
                            ) : (
                                <Ionicons name="restaurant-outline" size={32} color={Colors.primary} />
                            )}
                        </View>
                    </View>

                    <Text style={styles.title}>
                        {isVegOnly ? 'Switch to Veg Only?' : 'Show All Restaurants?'}
                    </Text>

                    <Text style={styles.message}>
                        {isVegOnly
                            ? 'You will only see pure vegetarian restaurants'
                            : 'You will see all restaurants including non-veg options'
                        }
                    </Text>

                    <View style={styles.buttonContainer}>
                        <Pressable
                            onPress={onCancel}
                            style={({ pressed }) => [
                                styles.button,
                                styles.cancelButton,
                                { opacity: pressed ? 0.7 : 1 }
                            ]}
                        >
                            <Text style={styles.cancelButtonText}>Cancel</Text>
                        </Pressable>

                        <Pressable
                            onPress={onConfirm}
                            style={({ pressed }) => [
                                styles.button,
                                styles.confirmButton,
                                {
                                    backgroundColor: isVegOnly ? '#10B981' : Colors.primary,
                                    opacity: pressed ? 0.85 : 1
                                }
                            ]}
                        >
                            <Text style={styles.confirmButtonText}>
                                {isVegOnly ? 'Show Veg Only' : 'Show All'}
                            </Text>
                        </Pressable>
                    </View>
                </View>
            </View>
        </Modal>
    );
}

const styles = StyleSheet.create({
    overlay: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    backdrop: {
        ...StyleSheet.absoluteFillObject,
    },
    modalContainer: {
        width: '85%',
        maxWidth: 400,
        backgroundColor: Colors.background,
        borderRadius: 20,
        padding: 24,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 10 },
        shadowOpacity: 0.3,
        shadowRadius: 20,
        elevation: 10,
    },
    iconContainer: {
        marginBottom: 16,
    },
    iconCircle: {
        width: 80,
        height: 80,
        borderRadius: 40,
        alignItems: 'center',
        justifyContent: 'center',
    },
    vegIndicator: {
        width: 40,
        height: 40,
        alignItems: 'center',
        justifyContent: 'center',
    },
    vegDot: {
        width: 36,
        height: 36,
        borderRadius: 6,
        borderWidth: 3,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    vegDotInner: {
        width: 18,
        height: 18,
        borderRadius: 4,
    },
    title: {
        fontSize: 20,
        fontWeight: '700',
        color: Colors.secondary,
        marginBottom: 8,
        textAlign: 'center',
    },
    message: {
        fontSize: 14,
        color: Colors.muted,
        textAlign: 'center',
        lineHeight: 20,
        marginBottom: 24,
        paddingHorizontal: 8,
    },
    buttonContainer: {
        flexDirection: 'row',
        gap: 12,
        width: '100%',
    },
    button: {
        flex: 1,
        paddingVertical: 14,
        borderRadius: 12,
        alignItems: 'center',
        justifyContent: 'center',
    },
    cancelButton: {
        backgroundColor: Colors.accentSoft,
        borderWidth: 1.5,
        borderColor: Colors.border,
    },
    cancelButtonText: {
        fontSize: 15,
        fontWeight: '600',
        color: Colors.secondary,
    },
    confirmButton: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
    },
    confirmButtonText: {
        fontSize: 15,
        fontWeight: '700',
        color: '#fff',
    },
});
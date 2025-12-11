import React, { useState } from 'react'
import { StyleSheet, Text, View, TouchableOpacity, ScrollView } from 'react-native'
import { Colors } from '../theme'
import BackHeader from '@/components/BackHeader'

function MyOrderStatusScreen() {
  const [currentStatus, setCurrentStatus] = useState(2)

  const orderDetails = {
    orderId: "#KA2847",
    date: "Dec 11, 2025",
    time: "2:45 PM",
    items: 3,
    total: "₹489"
  }

  const statusSteps = [
    {
      id: 0,
      title: "Order Placed",
      subtitle: "We have received your order",
      time: "2:45 PM",
      icon: "📋"
    },
    {
      id: 1,
      title: "Confirmed",
      subtitle: "Restaurant is preparing your food",
      time: "2:48 PM",
      icon: "✅"
    },
    {
      id: 2,
      title: "Preparing",
      subtitle: "Your delicious meal is being cooked",
      time: "Expected 3:15 PM",
      icon: "👨‍🍳"
    },
    {
      id: 3,
      title: "Out for Delivery",
      subtitle: "Rider is on the way to you",
      time: "3:20 PM",
      icon: "🛵"
    },
    {
      id: 4,
      title: "Delivered",
      subtitle: "Enjoy your meal!",
      time: "3:35 PM",
      icon: "🎉"
    }
  ]

  return (
    <View style={styles.container}>
    <BackHeader/>
    <ScrollView style={styles.scrollcontainer}  contentContainerStyle={{ paddingBottom: 55 }}  >
       
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Track Your Order</Text>
        <Text style={styles.headerSubtitle}>Real-time updates on your food delivery</Text>
      </View>

      {/* Order Summary Card */}
      <View style={styles.summaryCard}>
        <View style={styles.summaryHeader}>
          <View>
            <Text style={styles.orderId}>Order {orderDetails.orderId}</Text>
            <Text style={styles.orderDate}>{orderDetails.date} • {orderDetails.time}</Text>
          </View>
          <View style={styles.itemsBadge}>
            <Text style={styles.itemsBadgeText}>{orderDetails.items} Items</Text>
          </View>
        </View>

        <View style={styles.summaryDivider} />

        <View style={styles.summaryFooter}>
          <Text style={styles.totalLabel}>Total Amount</Text>
          <Text style={styles.totalAmount}>{orderDetails.total}</Text>
        </View>
      </View>

      {/* Status Timeline */}
      <View style={styles.timelineCard}>
        <Text style={styles.timelineTitle}>Order Status</Text>

        {statusSteps.map((step, index) => {
          const isCompleted = step.id < currentStatus
          const isCurrent = step.id === currentStatus
          const isUpcoming = step.id > currentStatus

          return (
            <View key={step.id} style={styles.timelineItem}>
              {/* Timeline Line */}
              {index !== statusSteps.length - 1 && (
                <View 
                  style={[
                    styles.timelineLine,
                    isCompleted && styles.timelineLineCompleted
                  ]} 
                />
              )}

              {/* Icon Circle */}
              <View 
                style={[
                  styles.timelineCircle,
                  isCompleted && styles.timelineCircleCompleted,
                  isCurrent && styles.timelineCircleCurrent,
                  isUpcoming && styles.timelineCircleUpcoming
                ]}
              >
                <Text style={styles.timelineIcon}>
                  {isCompleted ? '✓' : step.icon}
                </Text>
              </View>

              {/* Content */}
              <View style={styles.timelineContent}>
                <View style={styles.timelineHeader}>
                  <Text 
                    style={[
                      styles.timelineStepTitle,
                      isUpcoming && styles.timelineStepTitleUpcoming
                    ]}
                  >
                    {step.title}
                  </Text>
                  <Text style={styles.timelineTime}>{step.time}</Text>
                </View>
                <Text style={styles.timelineSubtitle}>{step.subtitle}</Text>

                {/* Current Status Indicator */}
                {isCurrent && (
                  <View style={styles.currentStatusBox}>
                    <View style={styles.pulseIndicator} />
                    <Text style={styles.currentStatusText}>Currently in progress...</Text>
                  </View>
                )}
              </View>
            </View>
          )
        })}
      </View>

      {/* Action Buttons */}
      <View style={styles.actionButtons}>
        <TouchableOpacity style={styles.primaryButton}>
          <Text style={styles.primaryButtonText}>📞 Contact Rider</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.secondaryButton}>
          <Text style={styles.secondaryButtonText}>ℹ️ Help</Text>
        </TouchableOpacity>
      </View>

      {/* Demo Controls */}
      <View style={styles.demoControls}>
        <Text style={styles.demoLabel}>Demo Controls (for testing):</Text>
        <View style={styles.demoButtonsRow}>
          {statusSteps.map((step) => (
            <TouchableOpacity
              key={step.id}
              onPress={() => setCurrentStatus(step.id)}
              style={[
                styles.demoButton,
                currentStatus === step.id && styles.demoButtonActive
              ]}
            >
              <Text 
                style={[
                  styles.demoButtonText,
                  currentStatus === step.id && styles.demoButtonTextActive
                ]}
              >
                {step.icon}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>
    </ScrollView>
    </View>
  )
}

export default MyOrderStatusScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.accentSoft,
  
  },
  
scrollcontainer:{
padding:20
},
  header: {
    marginBottom: 24
   
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: '700',
    color: Colors.secondary,
    marginBottom: 8
  },
  headerSubtitle: {
    fontSize: 14,
    color: Colors.muted
  },

  // Summary Card
  summaryCard: {
    backgroundColor: Colors.card,
    borderRadius: 16,
    padding: 20,
    marginBottom: 24,
    shadowColor: Colors.shadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 8,
    elevation: 3,
    borderWidth: 1,
    borderColor: Colors.border
  },
  summaryHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16
  },
  orderId: {
    fontSize: 20,
    fontWeight: '600',
    color: Colors.secondary,
    marginBottom: 4
  },
  orderDate: {
    fontSize: 13,
    color: Colors.muted
  },
  itemsBadge: {
    backgroundColor: Colors.primarySoft,
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 20
  },
  itemsBadgeText: {
    fontSize: 14,
    fontWeight: '600',
    color: Colors.primary
  },
  summaryDivider: {
    height: 1,
    backgroundColor: Colors.border,
    marginBottom: 16
  },
  summaryFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  totalLabel: {
    fontSize: 14,
    color: Colors.muted
  },
  totalAmount: {
    fontSize: 20,
    fontWeight: '700',
    color: Colors.primary
  },

  // Timeline
  timelineCard: {
    backgroundColor: Colors.card,
    borderRadius: 16,
    padding: 24,
    shadowColor: Colors.shadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 8,
    elevation: 3,
    borderWidth: 1,
    borderColor: Colors.border
  },
  timelineTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: Colors.secondary,
    marginBottom: 24
  },
  timelineItem: {
    flexDirection: 'row',
    marginBottom: 32,
    position: 'relative'
  },
  timelineLine: {
    position: 'absolute',
    left: 23,
    top: 48,
    bottom: -32,
    width: 2,
    backgroundColor: Colors.border
  },
  timelineLineCompleted: {
    backgroundColor: Colors.success
  },
  timelineCircle: {
    width: 48,
    height: 48,
    borderRadius: 24,
    borderWidth: 3,
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 1
  },
  timelineCircleCompleted: {
    backgroundColor: Colors.success,
    borderColor: Colors.success
  },
  timelineCircleCurrent: {
    backgroundColor: Colors.accent,
    borderColor: Colors.accent
  },
  timelineCircleUpcoming: {
    backgroundColor: Colors.background,
    borderColor: Colors.border
  },
  timelineIcon: {
    fontSize: 20
  },
  timelineContent: {
    flex: 1,
    marginLeft: 16
  },
  timelineHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 4
  },
  timelineStepTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: Colors.secondary,
    flex: 1
  },
  timelineStepTitleUpcoming: {
    color: Colors.muted
  },
  timelineTime: {
    fontSize: 12,
    color: Colors.muted,
    marginLeft: 8
  },
  timelineSubtitle: {
    fontSize: 14,
    color: Colors.muted
  },
  currentStatusBox: {
    marginTop: 12,
    padding: 12,
    backgroundColor: Colors.accentSoft,
    borderRadius: 8,
    borderLeftWidth: 3,
    borderLeftColor: Colors.accent,
    flexDirection: 'row',
    alignItems: 'center'
  },
  pulseIndicator: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: Colors.accent,
    marginRight: 8
  },
  currentStatusText: {
    fontSize: 13,
    fontWeight: '500',
    color: Colors.secondary
  },

  // Action Buttons
  actionButtons: {
    flexDirection: 'row',
    gap: 12,
    marginTop: 24
  },
  primaryButton: {
    flex: 1,
    backgroundColor: Colors.primary,
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
    alignSelf:'center'
  },
  primaryButtonText: {
    fontSize: 14,
    fontWeight: '600',
    color: Colors.card
  },
  secondaryButton: {
    flex: 1,
    backgroundColor: Colors.card,
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
    borderWidth: 2,
    alignSelf:'center',
    borderColor: Colors.border
  },
  secondaryButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: Colors.secondary
  },

  // Demo Controls
  demoControls: {
    marginTop: 32,
    marginBottom: 20,
    padding: 20,
    backgroundColor: Colors.card,
    borderRadius: 12,
    borderWidth: 2,
    borderStyle: 'dashed',
    borderColor: Colors.border
  },
  demoLabel: {
    fontSize: 13,
    color: Colors.muted,
    marginBottom: 12,
    fontWeight: '500'
  },
  demoButtonsRow: {
    flexDirection: 'row',
    gap: 8,
    flexWrap: 'wrap'
  },
  demoButton: {
    padding: 12,
    backgroundColor: Colors.background,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: Colors.border,
    minWidth: 50,
    alignItems: 'center'
  },
  demoButtonActive: {
    backgroundColor: Colors.primary
  },
  demoButtonText: {
    fontSize: 18
  },
  demoButtonTextActive: {
    fontSize: 18
  }
})
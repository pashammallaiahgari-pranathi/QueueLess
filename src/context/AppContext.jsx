import React, { createContext, useContext, useState, useEffect } from 'react';
import confetti from 'canvas-confetti';
import {
  CAMPUSES,
  CAFETERIAS,
  MENU_ITEMS,
  INITIAL_ORDERS,
  INITIAL_USER_PROFILE,
  RECENT_FEEDBACK,
  HOURLY_CROWD_FORECAST
} from '../data/mockData';

const AppContext = createContext();

export const AppProvider = ({ children }) => {
  // Current Role: 'student' | 'staff' | 'admin'
  const [role, setRole] = useState(() => {
    return localStorage.getItem('queueless_role') || 'student';
  });

  // Campus & Cafeteria Selection
  const [campuses] = useState(CAMPUSES);
  const [selectedCampusId, setSelectedCampusId] = useState('spec-main');
  const [cafeterias, setCafeterias] = useState(() => {
    const saved = localStorage.getItem('queueless_cafeterias');
    return saved ? JSON.parse(saved) : CAFETERIAS;
  });
  const [selectedCafeteriaId, setSelectedCafeteriaId] = useState('caf-main');

  // Menu items with live stock & freshness
  const [menuItems, setMenuItems] = useState(() => {
    const saved = localStorage.getItem('queueless_menu');
    return saved ? JSON.parse(saved) : MENU_ITEMS;
  });

  // Cart
  const [cart, setCart] = useState(() => {
    const saved = localStorage.getItem('queueless_cart');
    return saved ? JSON.parse(saved) : [];
  });

  // Orders & Tokens
  const [orders, setOrders] = useState(() => {
    const saved = localStorage.getItem('queueless_orders');
    return saved ? JSON.parse(saved) : INITIAL_ORDERS;
  });

  // Student Profile & Gamification
  const [userProfile, setUserProfile] = useState(() => {
    const saved = localStorage.getItem('queueless_profile');
    return saved ? JSON.parse(saved) : INITIAL_USER_PROFILE;
  });

  // Feedbacks
  const [feedbacks, setFeedbacks] = useState(() => {
    const saved = localStorage.getItem('queueless_feedbacks');
    return saved ? JSON.parse(saved) : RECENT_FEEDBACK;
  });

  // Real-time Notifications & Toasts
  const [notifications, setNotifications] = useState([
    {
      id: 'notif-welcome',
      title: "Welcome to St. Peter's QueueLess 🚀",
      message: 'Skip the 25-minute break line. Pre-order now to collect via Digital Token #Counter 1!',
      type: 'info',
      time: 'Just now'
    }
  ]);

  // Active Token Modal viewer
  const [activeTokenModalOrder, setActiveTokenModalOrder] = useState(null);

  // Cart Drawer open/closed
  const [isCartOpen, setIsCartOpen] = useState(false);

  // Sound effects simulation
  const playSoundEffect = (type = 'ding') => {
    try {
      const ctx = new (window.AudioContext || window.webkitAudioContext)();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.connect(gain);
      gain.connect(ctx.destination);
      
      if (type === 'ready') {
        // High joyful double ding for ready token
        osc.frequency.setValueAtTime(587.33, ctx.currentTime); // D5
        osc.frequency.setValueAtTime(880, ctx.currentTime + 0.15); // A5
        gain.gain.setValueAtTime(0.2, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.5);
        osc.start();
        osc.stop(ctx.currentTime + 0.5);
      } else if (type === 'coin') {
        // XP coin chime
        osc.frequency.setValueAtTime(987.77, ctx.currentTime); // B5
        osc.frequency.setValueAtTime(1318.51, ctx.currentTime + 0.1); // E6
        gain.gain.setValueAtTime(0.15, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.4);
        osc.start();
        osc.stop(ctx.currentTime + 0.4);
      } else {
        // Soft button tap
        osc.frequency.setValueAtTime(440, ctx.currentTime);
        gain.gain.setValueAtTime(0.08, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.15);
        osc.start();
        osc.stop(ctx.currentTime + 0.15);
      }
    } catch (e) {
      // AudioContext unavailable or restricted by browser gesture
    }
  };

  // Sync to local storage
  useEffect(() => {
    localStorage.setItem('queueless_role', role);
  }, [role]);

  useEffect(() => {
    localStorage.setItem('queueless_cafeterias', JSON.stringify(cafeterias));
  }, [cafeterias]);

  useEffect(() => {
    localStorage.setItem('queueless_menu', JSON.stringify(menuItems));
  }, [menuItems]);

  useEffect(() => {
    localStorage.setItem('queueless_cart', JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    localStorage.setItem('queueless_orders', JSON.stringify(orders));
  }, [orders]);

  useEffect(() => {
    localStorage.setItem('queueless_profile', JSON.stringify(userProfile));
  }, [userProfile]);

  useEffect(() => {
    localStorage.setItem('queueless_feedbacks', JSON.stringify(feedbacks));
  }, [feedbacks]);

  // Trigger celebration confetti
  const triggerConfetti = () => {
    try {
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 }
      });
    } catch (e) {}
  };

  // Add Notification
  const addNotification = (title, message, type = 'info') => {
    const newNotif = {
      id: `notif-${Date.now()}`,
      title,
      message,
      type,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };
    setNotifications(prev => [newNotif, ...prev.slice(0, 7)]);
  };

  const dismissNotification = (id) => {
    setNotifications(prev => prev.filter(n => n.id !== id));
  };

  // Cart operations
  const addToCart = (item, quantity = 1) => {
    playSoundEffect('tap');
    setCart(prev => {
      const existing = prev.find(i => i.item.id === item.id);
      if (existing) {
        return prev.map(i =>
          i.item.id === item.id ? { ...i, quantity: i.quantity + quantity } : i
        );
      }
      return [...prev, { item, quantity }];
    });
  };

  const updateCartQty = (itemId, quantity) => {
    if (quantity <= 0) {
      removeFromCart(itemId);
      return;
    }
    setCart(prev =>
      prev.map(i => (i.item.id === itemId ? { ...i, quantity } : i))
    );
  };

  const removeFromCart = (itemId) => {
    setCart(prev => prev.filter(i => i.item.id !== itemId));
  };

  const clearCart = () => {
    setCart([]);
  };

  // Gamification: Add XP
  const addXP = (amount, reason = 'Action') => {
    playSoundEffect('coin');
    setUserProfile(prev => {
      const newXP = prev.xp + amount;
      const leveledUp = newXP >= prev.xpToNextLevel;
      const nextLevel = leveledUp ? prev.level + 1 : prev.level;
      const nextTarget = leveledUp ? prev.xpToNextLevel + 350 : prev.xpToNextLevel;

      if (leveledUp) {
        triggerConfetti();
        addNotification(
          '🎉 LEVEL UP!',
          `Awesome work! You reached Level ${nextLevel} (${nextLevel >= 5 ? 'Master Foodie' : 'Queue Buster Elite'}). Enjoy faster pick-up rewards!`,
          'success'
        );
      } else {
        addNotification(
          `+${amount} XP Earned!`,
          `Reward for: ${reason}`,
          'success'
        );
      }

      return {
        ...prev,
        xp: newXP,
        level: nextLevel,
        xpToNextLevel: nextTarget
      };
    });
  };

  // Place Order & Generate Token
  const placeOrder = ({ pickupSlot, dietaryNotes = '', paymentMode = 'UPI / Campus Card' }) => {
    if (cart.length === 0) return null;

    const currentCafeteria = cafeterias.find(c => c.id === selectedCafeteriaId) || cafeterias[0];
    const tokenNumber = Math.floor(700 + Math.random() * 250);
    const tokenId = `SPEC-${tokenNumber}`;
    const orderId = `ORD-${Date.now().toString().slice(-4)}`;

    const totalAmount = cart.reduce((acc, curr) => acc + curr.item.price * curr.quantity, 0);

    const newOrder = {
      id: orderId,
      tokenId,
      studentName: userProfile.name,
      studentRoll: userProfile.rollNumber,
      cafeteriaId: currentCafeteria.id,
      cafeteriaName: currentCafeteria.name,
      counter: cart[0]?.item.counter || 'Counter 1',
      items: cart.map(c => ({
        id: c.item.id,
        name: c.item.name,
        quantity: c.quantity,
        price: c.item.price
      })),
      totalAmount,
      pickupSlot: pickupSlot || 'Instant (10-12 mins)',
      dietaryNotes,
      paymentMode,
      orderTime: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      estimatedReadyTime: new Date(Date.now() + 10 * 60000).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      status: 'PLACED', // PLACED -> PREPARING -> READY_FOR_PICKUP -> COLLECTED
      tokenQrCode: `SPEC-TOKEN-${tokenNumber}-${Math.random().toString(36).substring(7).toUpperCase()}`,
      isNotified: false
    };

    // Update orders
    setOrders(prev => [newOrder, ...prev]);

    // Deduct stock in menu
    setMenuItems(prev =>
      prev.map(item => {
        const ordered = cart.find(c => c.item.id === item.id);
        if (ordered) {
          const newStock = Math.max(0, item.stockCount - ordered.quantity);
          return {
            ...item,
            stockCount: newStock,
            inStock: newStock > 0
          };
        }
        return item;
      })
    );

    // Update user profile saved stats
    setUserProfile(prev => ({
      ...prev,
      totalSavedMinutes: prev.totalSavedMinutes + 18,
      mealsPrebooked: prev.mealsPrebooked + 1
    }));

    // Award +45 XP for pre-booking
    addXP(45, 'Pre-booking meals ahead of queue');

    // Trigger celebration & open token modal
    triggerConfetti();
    clearCart();
    setIsCartOpen(false);
    setActiveTokenModalOrder(newOrder);

    addNotification(
      `Token #${tokenId} Generated!`,
      `Your order is placed at ${currentCafeteria.name}. You'll receive a ping when the kitchen begins preparation!`,
      'success'
    );

    return newOrder;
  };

  // Staff action: update order status
  const updateOrderStatus = (orderId, newStatus) => {
    setOrders(prev =>
      prev.map(order => {
        if (order.id === orderId) {
          const updated = { ...order, status: newStatus };
          if (newStatus === 'READY_FOR_PICKUP') {
            playSoundEffect('ready');
            triggerConfetti();
            addNotification(
              `🔔 TOKEN #${order.tokenId} IS READY!`,
              `Head over to ${order.cafeteriaName} (${order.counter}) for instant contactless pickup!`,
              'warning'
            );
          } else if (newStatus === 'COLLECTED') {
            playSoundEffect('tap');
            addNotification(
              `Token #${order.tokenId} Handed Over`,
              `Meal collected by ${order.studentName}. Enjoy your fresh meal!`,
              'info'
            );
          }
          return updated;
        }
        return order;
      })
    );
  };

  // Staff scanner: verify and mark collected
  const verifyAndCollectToken = (tokenInput) => {
    const cleaned = tokenInput.trim().toUpperCase();
    const found = orders.find(
      o => o.tokenId.toUpperCase() === cleaned || o.tokenQrCode.toUpperCase().includes(cleaned)
    );

    if (!found) {
      return { success: false, message: `Token "${tokenInput}" not found in current shift queue.` };
    }

    if (found.status === 'COLLECTED') {
      return { success: false, message: `Token #${found.tokenId} has already been collected!` };
    }

    updateOrderStatus(found.id, 'COLLECTED');
    return { success: true, order: found, message: `Verified! Token #${found.tokenId} for ${found.studentName} marked as Collected.` };
  };

  // Staff action: update stock & freshness
  const updateItemStock = (itemId, stockCount, inStock, freshnessBadge) => {
    setMenuItems(prev =>
      prev.map(item => {
        if (item.id === itemId) {
          return {
            ...item,
            stockCount,
            inStock,
            ...(freshnessBadge ? { freshnessBadge } : {})
          };
        }
        return item;
      })
    );
  };

  // Staff / Admin: update cafeteria crowd metrics
  const updateCafeteriaCrowd = (cafId, currentCrowdPercentage, avgWaitTimeMinutes, announcement) => {
    setCafeterias(prev =>
      prev.map(c => {
        if (c.id === cafId) {
          let crowdLevel = 'Low (Express)';
          let crowdStatusColor = 'emerald';
          if (currentCrowdPercentage >= 75) {
            crowdLevel = 'Heavy Rush';
            crowdStatusColor = 'red';
          } else if (currentCrowdPercentage >= 45) {
            crowdLevel = 'Moderate Wait';
            crowdStatusColor = 'amber';
          }

          return {
            ...c,
            currentCrowdPercentage,
            avgWaitTimeMinutes,
            crowdLevel,
            crowdStatusColor,
            ...(announcement !== undefined ? { announcement } : {})
          };
        }
        return c;
      })
    );
  };

  // Student feedback submission
  const submitFeedback = ({ cafeteriaId, itemId, rating, comment, tag }) => {
    const newFb = {
      id: `fb-${Date.now()}`,
      studentName: userProfile.name,
      dept: userProfile.department.split(' ')[0] || 'SPEC',
      cafeteria: cafeterias.find(c => c.id === cafeteriaId)?.name || 'Food Court',
      item: menuItems.find(m => m.id === itemId)?.name || 'Meal Item',
      rating,
      tag: tag || '🌟 Verified Dining',
      comment,
      time: 'Just now'
    };

    setFeedbacks(prev => [newFb, ...prev]);
    addXP(25, 'Dining experience feedback submitted');
    triggerConfetti();
    addNotification(
      'Thank you for your feedback! ⭐',
      'Your input helps improve meal quality and kitchen forecasting across SPEC!',
      'success'
    );
  };

  // Instant Rush Simulator (Demo trigger)
  const simulateRushHour = () => {
    updateCafeteriaCrowd('caf-main', 94, 24, '⚠️ PEAK LUNCH HOUR: High congestion in Block A! Pre-orders prioritized at Counter 1.');
    addNotification(
      '⚡ 1:00 PM LUNCH RUSH DETECTED',
      'Cafeteria crowd surged to 94%! QueueLess smart routing recommends South Indian Tiffin (4m wait) or Pre-ordering.',
      'warning'
    );
  };

  // Reset to original mock data
  const resetDemoData = () => {
    setCafeterias(CAFETERIAS);
    setMenuItems(MENU_ITEMS);
    setOrders(INITIAL_ORDERS);
    setUserProfile(INITIAL_USER_PROFILE);
    setFeedbacks(RECENT_FEEDBACK);
    setCart([]);
    addNotification('Demo Data Reset', 'Platform restored to initial sample state.', 'info');
  };

  const selectedCafeteria = cafeterias.find(c => c.id === selectedCafeteriaId) || cafeterias[0];

  return (
    <AppContext.Provider
      value={{
        role,
        setRole,
        campuses,
        selectedCampusId,
        setSelectedCampusId,
        cafeterias,
        selectedCafeteriaId,
        setSelectedCafeteriaId,
        selectedCafeteria,
        menuItems,
        cart,
        addToCart,
        updateCartQty,
        removeFromCart,
        clearCart,
        isCartOpen,
        setIsCartOpen,
        orders,
        placeOrder,
        updateOrderStatus,
        verifyAndCollectToken,
        updateItemStock,
        updateCafeteriaCrowd,
        userProfile,
        addXP,
        feedbacks,
        submitFeedback,
        notifications,
        addNotification,
        dismissNotification,
        activeTokenModalOrder,
        setActiveTokenModalOrder,
        simulateRushHour,
        resetDemoData,
        playSoundEffect,
        triggerConfetti
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};

import React, { createContext, useContext, useState, useEffect } from 'react';
import confetti from 'canvas-confetti';
import {
  CAMPUSES,
  CAFETERIAS,
  MENU_ITEMS,
  INITIAL_ORDERS,
  INITIAL_USER_PROFILE,
  RECENT_FEEDBACK,
  FOOD_TIMINGS,
  DEMO_ACCOUNTS
} from '../data/mockData';

const AppContext = createContext();

export const AppProvider = ({ children }) => {
  // Authentication State
  const [currentUser, setCurrentUser] = useState(() => {
    const saved = localStorage.getItem('queueless_auth_user');
    return saved ? JSON.parse(saved) : null;
  });

  const isAuthenticated = Boolean(currentUser);

  // Role: 'student' | 'staff' | 'admin'
  const [role, setRole] = useState(() => {
    if (currentUser?.role) return currentUser.role;
    return localStorage.getItem('queueless_role') || 'student';
  });

  // Login Modal Control
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);

  // Active Food Timing filter: 'all' | 'breakfast' | 'lunch' | 'snacks'
  const [activeFoodTiming, setActiveFoodTiming] = useState('all');

  // Campus & Cafeteria Selection
  const [campuses] = useState(CAMPUSES);
  const [selectedCampusId, setSelectedCampusId] = useState('spec-main');
  const [cafeterias, setCafeterias] = useState(() => {
    const saved = localStorage.getItem('queueless_cafeterias');
    return saved ? JSON.parse(saved) : CAFETERIAS;
  });
  const [selectedCafeteriaId, setSelectedCafeteriaId] = useState('caf-main');

  // Menu items with live stock & Telugu details
  const [menuItems, setMenuItems] = useState(() => {
    const saved = localStorage.getItem('queueless_menu_v2');
    return saved ? JSON.parse(saved) : MENU_ITEMS;
  });

  // Cart
  const [cart, setCart] = useState(() => {
    const saved = localStorage.getItem('queueless_cart');
    return saved ? JSON.parse(saved) : [];
  });

  // Orders & Tokens
  const [orders, setOrders] = useState(() => {
    const saved = localStorage.getItem('queueless_orders_v2');
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

  // Notifications
  const [notifications, setNotifications] = useState([
    {
      id: 'notif-welcome',
      title: "Namaste! Welcome to SPEC QueueLess 🚀",
      message: 'Skip cafeteria queues! Pre-order hot Telugu tiffins, Biryani, and Irani chai.',
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
        osc.frequency.setValueAtTime(587.33, ctx.currentTime); // D5
        osc.frequency.setValueAtTime(880, ctx.currentTime + 0.15); // A5
        gain.gain.setValueAtTime(0.2, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.5);
        osc.start();
        osc.stop(ctx.currentTime + 0.5);
      } else if (type === 'coin') {
        osc.frequency.setValueAtTime(987.77, ctx.currentTime); // B5
        osc.frequency.setValueAtTime(1318.51, ctx.currentTime + 0.1); // E6
        gain.gain.setValueAtTime(0.15, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.4);
        osc.start();
        osc.stop(ctx.currentTime + 0.4);
      } else {
        osc.frequency.setValueAtTime(440, ctx.currentTime);
        gain.gain.setValueAtTime(0.08, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.15);
        osc.start();
        osc.stop(ctx.currentTime + 0.15);
      }
    } catch (e) {}
  };

  // Sync states
  useEffect(() => {
    if (currentUser) {
      localStorage.setItem('queueless_auth_user', JSON.stringify(currentUser));
    } else {
      localStorage.removeItem('queueless_auth_user');
    }
  }, [currentUser]);

  useEffect(() => {
    localStorage.setItem('queueless_role', role);
  }, [role]);

  useEffect(() => {
    localStorage.setItem('queueless_cafeterias', JSON.stringify(cafeterias));
  }, [cafeterias]);

  useEffect(() => {
    localStorage.setItem('queueless_menu_v2', JSON.stringify(menuItems));
  }, [menuItems]);

  useEffect(() => {
    localStorage.setItem('queueless_cart', JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    localStorage.setItem('queueless_orders_v2', JSON.stringify(orders));
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
        particleCount: 90,
        spread: 75,
        origin: { y: 0.6 }
      });
    } catch (e) {}
  };

  // Login with College Email Only
  const loginWithCollegeEmail = (email, password = '', chosenRole = 'student') => {
    const trimmedEmail = email.trim().toLowerCase();

    // STRICT COLLEGE EMAIL VALIDATION
    const isCollegeDomain = 
      trimmedEmail.endsWith('@stpetershyd.com') || 
      trimmedEmail.endsWith('@spec.edu.in');

    if (!isCollegeDomain) {
      playSoundEffect('tap');
      return {
        success: false,
        message: 'Access Restricted! Only St. Peter\'s Engineering College official IDs (@stpetershyd.com or @spec.edu.in) are permitted to sign in.'
      };
    }

    // Match existing demo account or construct college profile
    const matched = DEMO_ACCOUNTS.find(a => a.email.toLowerCase() === trimmedEmail);

    let newUser;
    if (matched) {
      newUser = { ...matched };
    } else {
      // Extract roll or username
      const username = trimmedEmail.split('@')[0].toUpperCase();
      newUser = {
        email: trimmedEmail,
        name: username.startsWith('2') ? `Student (${username})` : username,
        rollNumber: username,
        role: chosenRole,
        department: 'Engineering (SPEC)',
        avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&auto=format&fit=crop&q=80'
      };
    }

    setCurrentUser(newUser);
    setRole(newUser.role);
    setIsLoginModalOpen(false);
    triggerConfetti();
    playSoundEffect('ready');

    addNotification(
      'College ID Verified! 🎓',
      `Welcome, ${newUser.name}. Signed in with verified St. Peter's Engineering College domain (${newUser.email}).`,
      'success'
    );

    return { success: true, user: newUser };
  };

  const logout = () => {
    playSoundEffect('tap');
    setCurrentUser(null);
    localStorage.removeItem('queueless_auth_user');
    setIsCartOpen(false);
    setActiveTokenModalOrder(null);
    addNotification('Logged Out', 'Successfully signed out from QueueLess campus session.', 'info');
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
          `Awesome work! You reached Level ${nextLevel}. Enjoy VIP counter pickup rewards!`,
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
  const placeOrder = ({ pickupSlot, dietaryNotes = '', paymentMode = 'SPEC Campus Smartcard' }) => {
    if (cart.length === 0) return null;

    const currentCafeteria = cafeterias.find(c => c.id === selectedCafeteriaId) || cafeterias[0];
    const tokenNumber = Math.floor(700 + Math.random() * 250);
    const tokenId = `SPEC-${tokenNumber}`;
    const orderId = `ORD-${Date.now().toString().slice(-4)}`;

    const totalAmount = cart.reduce((acc, curr) => acc + curr.item.price * curr.quantity, 0);

    const newOrder = {
      id: orderId,
      tokenId,
      studentName: currentUser?.name || userProfile.name,
      studentRoll: currentUser?.rollNumber || userProfile.rollNumber,
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
      status: 'PLACED',
      tokenQrCode: `SPEC-TOKEN-${tokenNumber}-${Math.random().toString(36).substring(7).toUpperCase()}`,
      isNotified: false
    };

    setOrders(prev => [newOrder, ...prev]);

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

    setUserProfile(prev => ({
      ...prev,
      totalSavedMinutes: prev.totalSavedMinutes + 18,
      mealsPrebooked: prev.mealsPrebooked + 1
    }));

    addXP(45, 'Pre-booking meals ahead of queue');
    triggerConfetti();
    clearCart();
    setIsCartOpen(false);
    setActiveTokenModalOrder(newOrder);

    addNotification(
      `Digital Token #${tokenId} Generated!`,
      `Order sent to kitchen at ${currentCafeteria.name}. You'll be notified when ready for pickup!`,
      'success'
    );

    return newOrder;
  };

  // Staff order updates
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
              `Head to ${order.cafeteriaName} (${order.counter}) for contactless pickup!`,
              'warning'
            );
          } else if (newStatus === 'COLLECTED') {
            playSoundEffect('tap');
            addNotification(
              `Token #${order.tokenId} Handed Over`,
              `Meal collected by ${order.studentName}. Baguntundi! Enjoy your meal.`,
              'info'
            );
          }
          return updated;
        }
        return order;
      })
    );
  };

  // Staff verify & collect
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

  // Staff stock updater
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

  // Staff crowd updater
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

  // Student feedback
  const submitFeedback = ({ cafeteriaId, itemId, rating, comment, tag }) => {
    const newFb = {
      id: `fb-${Date.now()}`,
      studentName: currentUser?.name || userProfile.name,
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
  };

  // Rush hour simulation
  const simulateRushHour = () => {
    updateCafeteriaCrowd('caf-main', 94, 24, '⚠️ 1:00 PM LUNCH RUSH: Block A Biryani counter is packed! Pre-orders skip line at Counter 1.');
    addNotification(
      '⚡ 1:00 PM LUNCH RUSH DETECTED',
      'Biryani crowd surged to 94%! QueueLess recommends South Indian Tiffin (4m wait) or Digital Pre-order.',
      'warning'
    );
  };

  // Reset
  const resetDemoData = () => {
    setCafeterias(CAFETERIAS);
    setMenuItems(MENU_ITEMS);
    setOrders(INITIAL_ORDERS);
    setUserProfile(INITIAL_USER_PROFILE);
    setFeedbacks(RECENT_FEEDBACK);
    setCart([]);
    addNotification('Demo Reset', 'Data restored to authentic Telugu campus state.', 'info');
  };

  const selectedCafeteria = cafeterias.find(c => c.id === selectedCafeteriaId) || cafeterias[0];

  return (
    <AppContext.Provider
      value={{
        currentUser,
        isAuthenticated,
        role,
        setRole,
        isLoginModalOpen,
        setIsLoginModalOpen,
        loginWithCollegeEmail,
        logout,
        activeFoodTiming,
        setActiveFoodTiming,
        foodTimings: FOOD_TIMINGS,
        demoAccounts: DEMO_ACCOUNTS,
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

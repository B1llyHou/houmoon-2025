# Houmoon App Implementation Guide

## Overview
This document provides detailed implementation guidance for the Houmoon app, an Eastern Wisdom-based Healing Operating System that combines ancient Chinese philosophies with modern technology. This guide builds upon the architecture, data schema, and component design documents to provide a clear roadmap for implementation.

## Implementation Approach

### Phase 1: Heart Law System MVP
The implementation will follow an incremental approach, starting with the Heart Law System as the Phase 1 MVP. This approach allows for early validation of core concepts while establishing the foundation for the complete application.

#### Phase 1 Scope
- User authentication
- Emotional check-in system
- Philosophy Feed with wisdom content
- Basic user profile and progress tracking

### Development Workflow

1. **Environment Setup**
   - Initialize React Native project
   - Configure Firebase integration
   - Set up development tools and linting

2. **Core Infrastructure**
   - Implement authentication system
   - Create base navigation structure
   - Set up state management with context providers

3. **Feature Implementation**
   - Develop emotional check-in functionality
   - Create wisdom content display
   - Implement user progress tracking

4. **Testing & Refinement**
   - Unit testing for core components
   - Integration testing for key user flows
   - Performance optimization

## Project Setup Instructions

### React Native Setup

```bash
# Install React Native CLI if not already installed
npm install -g react-native-cli

# Initialize new React Native project
npx react-native init Houmoon --template react-native-template-typescript

# Navigate to project directory
cd Houmoon

# Install core dependencies
npm install @react-navigation/native @react-navigation/stack @react-navigation/bottom-tabs
npm install react-native-safe-area-context react-native-screens
npm install react-native-gesture-handler react-native-reanimated
npm install @react-native-firebase/app @react-native-firebase/auth @react-native-firebase/firestore
npm install @react-native-async-storage/async-storage
npm install react-native-vector-icons
npm install react-native-svg
```

### Firebase Configuration

1. Create a new Firebase project in the Firebase Console
2. Register your app (iOS and Android)
3. Download configuration files:
   - `GoogleService-Info.plist` for iOS
   - `google-services.json` for Android
4. Place configuration files in the appropriate directories:
   - iOS: `/ios/Houmoon/GoogleService-Info.plist`
   - Android: `/android/app/google-services.json`
5. Update build files:

**Android: android/build.gradle**
```gradle
buildscript {
  dependencies {
    // ... other dependencies
    classpath 'com.google.gms:google-services:4.3.15'
  }
}
```

**Android: android/app/build.gradle**
```gradle
apply plugin: 'com.android.application'
apply plugin: 'com.google.gms.google-services'
```

**iOS: Podfile**
```ruby
target 'Houmoon' do
  # ... existing config
  pod 'Firebase', :modular_headers => true
  pod 'FirebaseCore', :modular_headers => true
  pod 'GoogleUtilities', :modular_headers => true
  $RNFirebaseAsStaticFramework = true
end
```

## Implementation Details by Module

### 1. Authentication System

#### File Structure
```
/src
  /services
    /auth
      authService.js
  /contexts
    AuthContext.js
  /screens
    /Auth
      Login.js
      Register.js
      ForgotPassword.js
```

#### Implementation Steps

1. **Create Firebase Auth Service**

```javascript
// src/services/auth/authService.js
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';

export const signIn = async (email, password) => {
  try {
    return await auth().signInWithEmailAndPassword(email, password);
  } catch (error) {
    throw error;
  }
};

export const signUp = async (email, password, displayName) => {
  try {
    const userCredential = await auth().createUserWithEmailAndPassword(email, password);
    await userCredential.user.updateProfile({ displayName });
    
    // Create user profile in Firestore
    await firestore().collection('users').doc(userCredential.user.uid).set({
      uid: userCredential.user.uid,
      email,
      displayName,
      createdAt: firestore.FieldValue.serverTimestamp(),
      stats: {
        meditationMinutes: 0,
        journalEntries: 0,
        wisdomExplored: 0,
        dialoguesSessions: 0,
        streak: 0,
      },
      innerAlignmentScore: 0,
      wisdomProgress: {
        daoDeJing: {
          chaptersExplored: [],
          comprehensionLevel: 0,
        },
        iChing: {
          hexagramsExplored: [],
          comprehensionLevel: 0,
        },
        yangming: {
          conceptsExplored: [],
          comprehensionLevel: 0,
        },
      },
    });
    
    return userCredential;
  } catch (error) {
    throw error;
  }
};

export const signOut = async () => {
  try {
    return await auth().signOut();
  } catch (error) {
    throw error;
  }
};

export const resetPassword = async (email) => {
  try {
    return await auth().sendPasswordResetEmail(email);
  } catch (error) {
    throw error;
  }
};

export const getCurrentUser = () => {
  return auth().currentUser;
};
```

2. **Implement Auth Context**

```javascript
// src/contexts/AuthContext.js
import React, { createContext, useState, useEffect } from 'react';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { signIn, signUp, signOut, resetPassword } from '../services/auth/authService';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isFirstLaunch, setIsFirstLaunch] = useState(null);

  useEffect(() => {
    checkFirstLaunch();
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber;
  }, []);

  const checkFirstLaunch = async () => {
    try {
      const value = await AsyncStorage.getItem('alreadyLaunched');
      if (value === null) {
        await AsyncStorage.setItem('alreadyLaunched', 'true');
        setIsFirstLaunch(true);
      } else {
        setIsFirstLaunch(false);
      }
    } catch (error) {
      console.error('Error checking first launch:', error);
      setIsFirstLaunch(false);
    }
  };

  const onAuthStateChanged = async (user) => {
    if (user) {
      // Get user profile from Firestore
      const userDoc = await firestore().collection('users').doc(user.uid).get();
      
      if (userDoc.exists) {
        setUser({ ...user, ...userDoc.data() });
      } else {
        // Create user profile if it doesn't exist
        const userData = {
          uid: user.uid,
          email: user.email,
          displayName: user.displayName || '',
          photoURL: user.photoURL || '',
          createdAt: firestore.FieldValue.serverTimestamp(),
          stats: {
            meditationMinutes: 0,
            journalEntries: 0,
            wisdomExplored: 0,
            dialoguesSessions: 0,
            streak: 0,
          },
          innerAlignmentScore: 0,
          wisdomProgress: {
            daoDeJing: {
              chaptersExplored: [],
              comprehensionLevel: 0,
            },
            iChing: {
              hexagramsExplored: [],
              comprehensionLevel: 0,
            },
            yangming: {
              conceptsExplored: [],
              comprehensionLevel: 0,
            },
          },
        };
        
        await firestore().collection('users').doc(user.uid).set(userData);
        setUser({ ...user, ...userData });
      }
    } else {
      setUser(null);
    }
    
    setLoading(false);
  };

  const login = async (email, password) => {
    try {
      return await signIn(email, password);
    } catch (error) {
      throw error;
    }
  };

  const register = async (email, password, displayName) => {
    try {
      return await signUp(email, password, displayName);
    } catch (error) {
      throw error;
    }
  };

  const logout = async () => {
    try {
      return await signOut();
    } catch (error) {
      throw error;
    }
  };

  const forgotPassword = async (email) => {
    try {
      return await resetPassword(email);
    } catch (error) {
      throw error;
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        isFirstLaunch,
        login,
        register,
        logout,
        forgotPassword,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
```

### 2. Emotional Check-In System

#### File Structure
```
/src
  /services
    /emotional
      emotionalService.js
  /contexts
    EmotionalStateContext.js
  /components
    /Emotional
      EmotionalCheckIn.js
      EmotionSelector.js
```

#### Implementation Steps

1. **Create Emotional Service**

```javascript
// src/services/emotional/emotionalService.js
import firestore from '@react-native-firebase/firestore';

export const saveEmotionalState = async (userId, emotionalState) => {
  try {
    const stateData = {
      ...emotionalState,
      timestamp: firestore.FieldValue.serverTimestamp(),
    };
    
    return await firestore()
      .collection('users')
      .doc(userId)
      .collection('emotionalStates')
      .add(stateData);
  } catch (error) {
    throw error;
  }
};

export const getEmotionalStates = async (userId, limit = 10) => {
  try {
    const snapshot = await firestore()
      .collection('users')
      .doc(userId)
      .collection('emotionalStates')
      .orderBy('timestamp', 'desc')
      .limit(limit)
      .get();
    
    return snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
      timestamp: doc.data().timestamp?.toDate(),
    }));
  } catch (error) {
    throw error;
  }
};

export const calculateFiveElements = (primaryEmotion, intensity) => {
  // This is a simplified implementation
  // In a real app, this would be more sophisticated
  const elements = {
    wood: 0,
    fire: 0,
    earth: 0,
    metal: 0,
    water: 0,
  };
  
  // Map emotions to elements (simplified)
  switch (primaryEmotion) {
    case 'anger':
      elements.wood = intensity;
      break;
    case 'joy':
      elements.fire = intensity;
      break;
    case 'worry':
    case 'pensiveness':
      elements.earth = intensity;
      break;
    case 'grief':
    case 'sadness':
      elements.metal = intensity;
      break;
    case 'fear':
    case 'anxiety':
      elements.water = intensity;
      break;
    default:
      // Balanced distribution
      const value = intensity / 5;
      elements.wood = value;
      elements.fire = value;
      elements.earth = value;
      elements.metal = value;
      elements.water = value;
  }
  
  return elements;
};
```

2. **Implement Emotional State Context**

```javascript
// src/contexts/EmotionalStateContext.js
import React, { createContext, useState, useEffect, useContext } from 'react';
import { AuthContext } from './AuthContext';
import { saveEmotionalState, getEmotionalStates, calculateFiveElements } from '../services/emotional/emotionalService';

export const EmotionalStateContext = createContext();

export const EmotionalStateProvider = ({ children }) => {
  const { user } = useContext(AuthContext);
  const [currentState, setCurrentState] = useState(null);
  const [stateHistory, setStateHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [lastCheckIn, setLastCheckIn] = useState(null);
  const [needsCheckIn, setNeedsCheckIn] = useState(false);

  useEffect(() => {
    if (user) {
      fetchEmotionalStates();
      checkIfNeedsCheckIn();
    } else {
      setCurrentState(null);
      setStateHistory([]);
      setLoading(false);
    }
  }, [user]);

  const fetchEmotionalStates = async () => {
    if (!user) return;
    
    try {
      setLoading(true);
      
      const states = await getEmotionalStates(user.uid);
      
      if (states.length > 0) {
        setCurrentState(states[0]);
        setLastCheckIn(states[0].timestamp);
      }
      
      setStateHistory(states);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching emotional states:', error);
      setLoading(false);
    }
  };

  const checkIfNeedsCheckIn = () => {
    if (!lastCheckIn) {
      setNeedsCheckIn(true);
      return;
    }
    
    const now = new Date();
    const hoursSinceLastCheckIn = (now - lastCheckIn) / (1000 * 60 * 60);
    
    // Check if more than 8 hours have passed since last check-in
    setNeedsCheckIn(hoursSinceLastCheckIn > 8);
  };

  const recordEmotionalState = async (state) => {
    if (!user) return null;
    
    try {
      // Calculate five elements balance
      const fiveElements = calculateFiveElements(state.primaryEmotion, state.intensity);
      
      // Calculate yin-yang balance (simplified)
      const yinYangBalance = state.primaryEmotion === 'calm' || 
                             state.primaryEmotion === 'sadness' || 
                             state.primaryEmotion === 'fear' 
                             ? -state.intensity / 10 : state.intensity / 10;
      
      const enhancedState = {
        ...state,
        fiveElements,
        yinYangBalance,
      };
      
      const docRef = await saveEmotionalState(user.uid, enhancedState);
      
      const newState = {
        id: docRef.id,
        ...enhancedState,
        timestamp: new Date(),
      };
      
      setCurrentState(newState);
      setStateHistory([newState, ...stateHistory]);
      setLastCheckIn(new Date());
      setNeedsCheckIn(false);
      
      return newState;
    } catch (error) {
      console.error('Error recording emotional state:', error);
      throw error;
    }
  };

  return (
    <EmotionalStateContext.Provider
      value={{
        currentState,
        stateHistory,
        loading,
        needsCheckIn,
        recordEmotionalState,
        refreshStates: fetchEmotionalStates,
      }}
    >
      {children}
    </EmotionalStateContext.Provider>
  );
};
```

### 3. Heart Law System (Philosophy Feed)

#### File Structure
```
/src
  /services
    /wisdom
      wisdomService.js
  /screens
    /HeartLaw
      PhilosophyFeed.js
      WisdomDetail.js
      ProgressMap.js
  /components
    /Wisdom
      WisdomCard.js
      ProgressMapView.js
```

#### Implementation Steps

1. **Create Wisdom Service**

```javascript
// src/services/wisdom/wisdomService.js
import firestore from '@react-native-firebase/firestore';

export const getWisdomContent = async (emotionalState = null, limit = 10) => {
  try {
    let query = firestore().collection('wisdomContent');
    
    // If we have emotional state, filter content that matches
    if (emotionalState) {
      // Get content that matches the primary emotion
      query = query.where('emotionalTags', 'array-contains', emotionalState.primaryEmotion);
    }
    
    const snapshot = await query.limit(limit).get();
    
    return snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
    }));
  } catch (error) {
    throw error;
  }
};

export const getWisdomContentById = async (contentId) => {
  try {
    const doc = await firestore().collection('wisdomContent').doc(contentId).get();
    
    if (!doc.exists) {
      throw new Error('Wisdom content not found');
    }
    
    return {
      id: doc.id,
      ...doc.data(),
    };
  } catch (error) {
    throw error;
  }
};

export const saveWisdomProgress = async (userId, contentId, source) => {
  try {
    const userRef = firestore().collection('users').doc(userId);
    
    // Get current user data
    const userDoc = await userRef.get();
    const userData = userDoc.data();
    
    // Update the appropriate progress field based on source
    let field = '';
    let chaptersExplored = [];
    
    if (source === 'Dao De Jing') {
      field = 'wisdomProgress.daoDeJing.chaptersExplored';
      chaptersExplored = userData.wisdomProgress.daoDeJing.chaptersExplored || [];
    } else if (source === 'I Ching') {
      field = 'wisdomProgress.iChing.hexagramsExplored';
      chaptersExplored = userData.wisdomProgress.iChing.hexagramsExplored || [];
    } else if (source === 'Wang Yangming') {
      field = 'wisdomProgress.yangming.conceptsExplored';
      chaptersExplored = userData.wisdomProgress.yangming.conceptsExplored || [];
    }
    
    // Only add if not already in the array
    if (field && !chaptersExplored.includes(contentId)) {
      chaptersExplored.push(contentId);
      
      // Update the field
      await userRef.update({
        [field]: chaptersExplored,
        'stats.wisdomExplored': firestore.FieldValue.increment(1),
      });
    }
    
    return true;
  } catch (error) {
    throw error;
  }
};

export const getWisdomProgress = async (userId) => {
  try {
    const userDoc = await firestore().collection('users').doc(userId).get();
    
    if (!userDoc.exists) {
      throw new Error('User not found');
    }
    
    const userData = userDoc.data();
    
    return userData.wisdomProgress || {
      daoDeJing: {
        chaptersExplored: [],
        comprehensionLevel: 0,
      },
      iChing: {
        hexagramsExplored: [],
        comprehensionLevel: 0,
      },
      yangming: {
        conceptsExplored: [],
        comprehensionLevel: 0,
      },
    };
  } catch (error) {
    throw error;
  }
};
```

2. **Implement Philosophy Feed Screen**

```javascript
// src/screens/HeartLaw/PhilosophyFeed.js
import React, { useState, useEffect, useContext } from 'react';
import { View, FlatList, StyleSheet, ActivityIndicator } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { AuthContext } from '../../contexts/AuthContext';
import { EmotionalStateContext } from '../../contexts/EmotionalStateContext';
import { getWisdomContent } from '../../services/wisdom/wisdomService';
import WisdomCard from '../../components/Wisdom/WisdomCard';
import EmotionalCheckIn from '../../components/Emotional/EmotionalCheckIn';
import Button from '../../components/Common/Button';
import Typography from '../../components/Common/Typography';
import Icon from '../../components/Common/Icon';
import { colors, spacing } from '../../styles';

const PhilosophyFeed = ({ navigation }) => {
  const { user } = useContext(AuthContext);
  const { currentState, needsCheckIn, recordEmotionalState } = useContext(EmotionalStateContext);
  
  const [wisdomContent, setWisdomContent] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  
  useEffect(() => {
    if (user && currentState && !needsCheckIn) {
      fetchWisdomContent();
    } else if (user && !currentState) {
      setLoading(false);
    }
  }, [user, currentState, needsCheckIn]);
  
  const fetchWisdomContent = async () => {
    try {
      setLoading(true);
      const content = await getWisdomContent(currentState);
      setWisdomContent(content);
    } catch (error) {
      console.error('Error fetching wisdom content:', error);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };
  
  const handleRefresh = () => {
    setRefreshing(true);
    fetchWisdomContent();
  };
  
  const handleEmotionalCheckInComplete = async (state) => {
    try {
      await recordEmotionalState(state);
    } catch (error) {
      console.error('Error recording emotional state:', error);
    }
  };
  
  const handleWisdomCardPress = (item) => {
    navigation.navigate('WisdomDetail', { item });
  };
  
  const handleProgressMapPress = () => {
    navigation.navigate('ProgressMap');
  };
  
  const renderHeader = () => (
    <View style={styles.header}>
      <View style={styles.titleContainer}>
        <Typography variant="h4">Heart Law System</Typography>
        <Button
          variant="text"
          leftIcon={<Icon name="map" size={20} color={colors.primary} />}
          title="Progress Map"
          onPress={handleProgressMapPress}
        />
      </View>
      
      <Typography variant="body1" color="textSecondary" style={styles.subtitle}>
        Daily wisdom based on your emotional state
      </Typography>
      
      {currentState && (
        <View style={styles.emotionContainer}>
          <Typography variant="subtitle2">
            Current Emotion: {currentState.primaryEmotion}
          </Typography>
          <Button
            variant="outline"
            size="small"
            title="Check In"
            leftIcon={<Icon name="emoticon-outline" size={16} />}
            onPress={() => navigation.navigate('EmotionalCheckIn')}
            style={styles.checkInButton}
          />
        </View>
      )}
    </View>
  );
  
  if (needsCheckIn) {
    return (
      <SafeAreaView style={styles.container}>
        <Typography variant="h4" align="center" style={styles.checkInTitle}>
          How are you feeling today?
        </Typography>
        <EmotionalCheckIn onComplete={handleEmotionalCheckInComplete} />
      </SafeAreaView>
    );
  }
  
  return (
    <SafeAreaView style={styles.container}>
      {loading && !refreshing ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color={colors.primary} />
          <Typography variant="body1" style={styles.loadingText}>
            Loading wisdom content...
          </Typography>
        </View>
      ) : (
        <FlatList
          data={wisdomContent}
          renderItem={({ item }) => (
            <WisdomCard
              quote={item.originalText}
              source={item.source}
              chapter={item.chapter}
              translation={item.translation}
              onPress={() => handleWisdomCardPress(item)}
              onSave={() => {}}
              onShare={() => {}}
              saved={false}
            />
          )}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.contentContainer}
          ListHeaderComponent={renderHeader}
          refreshing={refreshing}
          onRefresh={handleRefresh}
          ListEmptyComponent={
            <View style={styles.emptyContainer}>
              <Typography variant="h5" align="center">
                No wisdom content available
              </Typography>
              <Typography variant="body1" color="textSecondary" align="center">
                Try updating your emotional state or check back later
              </Typography>
            </View>
          }
        />
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  contentContainer: {
    padding: spacing.md,
  },
  header: {
    marginBottom: spacing.lg,
  },
  titleContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  subtitle: {
    marginTop: spacing.xs,
  },
  emotionContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: spacing.md,
    padding: spacing.sm,
    backgroundColor: colors.surface,
    borderRadius: 8,
  },
  checkInButton: {
    marginLeft: spacing.sm,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    marginTop: spacing.md,
  },
  checkInTitle: {
    margin: spacing.lg,
  },
  emptyContainer: {
    padding: spacing.xl,
    alignItems: 'center',
  },
});

export default PhilosophyFeed;
```

### 4. Navigation Setup

#### File Structure
```
/src
  /navigation
    AppNavigation.js
    AuthNavigator.js
    MainNavigator.js
    OnboardingNavigator.js
```

#### Implementation Steps

1. **Create App Navigation**

```javascript
// src/navigation/AppNavigation.js
import React, { useContext } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { AuthContext } from '../contexts/AuthContext';

import AuthNavigator from './AuthNavigator';
import MainNavigator from './MainNavigator';
import OnboardingNavigator from './OnboardingNavigator';

const RootStack = createStackNavigator();

const AppNavigation = () => {
  const { user, isFirstLaunch } = useContext(AuthContext);

  return (
    <NavigationContainer>
      <RootStack.Navigator screenOptions={{ headerShown: false }}>
        {user ? (
          <RootStack.Screen name="Main" component={MainNavigator} />
        ) : isFirstLaunch ? (
          <RootStack.Screen name="Onboarding" component={OnboardingNavigator} />
        ) : (
          <RootStack.Screen name="Auth" component={AuthNavigator} />
        )}
      </RootStack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigation;
```

2. **Create Main Navigator**

```javascript
// src/navigation/MainNavigator.js
import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import Icon from '../components/Common/Icon';
import { colors } from '../styles';

// Screens
import PhilosophyFeed from '../screens/HeartLaw/PhilosophyFeed';
import WisdomDetail from '../screens/HeartLaw/WisdomDetail';
import ProgressMap from '../screens/HeartLaw/ProgressMap';

// For Phase 1 MVP, we'll only implement the Heart Law system
// Other tabs will be placeholders

const Tab = createBottomTabNavigator();
const HeartLawStack = createStackNavigator();
const RootStack = createStackNavigator();

const HeartLawNavigator = () => (
  <HeartLawStack.Navigator>
    <HeartLawStack.Screen 
      name="PhilosophyFeed" 
      component={PhilosophyFeed} 
      options={{ title: 'Heart Law' }} 
    />
    <HeartLawStack.Screen 
      name="WisdomDetail" 
      component={WisdomDetail} 
      options={{ title: 'Wisdom' }} 
    />
    <HeartLawStack.Screen 
      name="ProgressMap" 
      component={ProgressMap} 
      options={{ title: 'Progress Map' }} 
    />
  </HeartLawStack.Navigator>
);

// Placeholder components for other tabs
const PracticePlaceholder = () => (
  <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
    <Typography variant="h4">Practice System</Typography>
    <Typography variant="body1">Coming soon in the next phase</Typography>
  </View>
);

const EnergyPlaceholder = () => (
  <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
    <Typography variant="h4">Energy System</Typography>
    <Typography variant="body1">Coming soon in the next phase</Typography>
  </View>
);

const FutureSelfPlaceholder = () => (
  <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
    <Typography variant="h4">Future Self Dialogue</Typography>
    <Typography variant="body1">Coming soon in the next phase</Typography>
  </View>
);

const TabNavigator = () => (
  <Tab.Navigator
    screenOptions={({ route }) => ({
      tabBarIcon: ({ focused, color, size }) => {
        let iconName;

        if (route.name === 'HeartLaw') {
          iconName = 'heart-pulse';
        } else if (route.name === 'Practice') {
          iconName = 'meditation';
        } else if (route.name === 'Energy') {
          iconName = 'yin-yang';
        } else if (route.name === 'FutureSelf') {
          iconName = 'account-clock';
        }

        return <Icon name={iconName} size={size} color={color} />;
      },
      tabBarActiveTintColor: colors.primary,
      tabBarInactiveTintColor: colors.textSecondary,
    })}
  >
    <Tab.Screen 
      name="HeartLaw" 
      component={HeartLawNavigator} 
      options={{ headerShown: false, title: 'Heart Law' }} 
    />
    <Tab.Screen 
      name="Practice" 
      component={PracticePlaceholder} 
      options={{ title: 'Practice' }} 
    />
    <Tab.Screen 
      name="Energy" 
      component={EnergyPlaceholder} 
      options={{ title: 'Energy' }} 
    />
    <Tab.Screen 
      name="FutureSelf" 
      component={FutureSelfPlaceholder} 
      options={{ title: 'Future Self' }} 
    />
  </Tab.Navigator>
);

const MainNavigator = () => (
  <RootStack.Navigator>
    <RootStack.Screen 
      name="TabNavigator" 
      component={TabNavigator} 
      options={{ headerShown: false }} 
    />
    <RootStack.Group screenOptions={{ presentation: 'modal' }}>
      <RootStack.Screen 
        name="EmotionalCheckIn" 
        component={EmotionalCheckInModal} 
        options={{ title: 'How are you feeling?' }} 
      />
      <RootStack.Screen 
        name="Settings" 
        component={SettingsModal} 
        options={{ title: 'Settings' }} 
      />
    </RootStack.Group>
  </RootStack.Navigator>
);

export default MainNavigator;
```

## Firebase Data Seeding

To properly test the application, we need to seed the Firebase database with initial wisdom content. Here's a script to help with that process:

```javascript
// scripts/seedDatabase.js
const admin = require('firebase-admin');
const serviceAccount = require('./serviceAccountKey.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

const db = admin.firestore();

// Seed Dao De Jing content
const seedDaoDeJing = async () => {
  const daoDeJingContent = [
    {
      source: 'Dao De Jing',
      chapter: 'Chapter 1',
      originalText: '道可道，非常道。名可名，非常名。',
      translation: 'The Dao that can be told is not the eternal Dao. The name that can be named is not the eternal name.',
      explanation: 'This opening verse points to the ineffable nature of the Dao. It suggests that true wisdom transcends language and conceptual thinking.',
      emotionalTags: ['confusion', 'curiosity', 'wonder'],
      elementAssociations: {
        wood: 2,
        fire: 1,
        earth: 5,
        metal: 3,
        water: 8
      },
      difficulty: 3
    },
    {
      source: 'Dao De Jing',
      chapter: 'Chapter 2',
      originalText: '天下皆知美之为美，斯恶已。皆知善之为善，斯不善已。',
      translation: 'When people see some things as beautiful, other things become ugly. When people see some things as good, other things become bad.',
      explanation: 'This verse explores the nature of duality and how our judgments create opposites. True wisdom lies in seeing beyond these artificial distinctions.',
      emotionalTags: ['judgment', 'confusion', 'acceptance'],
      elementAssociations: {
        wood: 3,
        fire: 2,
        earth: 7,
        metal: 5,
        water: 3
      },
      difficulty: 2
    },
    {
      source: 'Dao De Jing',
      chapter: 'Chapter 15',
      originalText: '致虚极，守静笃。万物并作，吾以观复。',
      translation: 'Empty your mind of all thoughts. Let your heart be at peace. Watch the turmoil of beings, but contemplate their return.',
      explanation: 'This verse teaches the practice of emptying the mind and finding inner stillness. From this state of calm awareness, we can observe the cycles of nature.',
      emotionalTags: ['anxiety', 'stress', 'worry', 'overwhelm'],
      elementAssociations: {
        wood: 1,
        fire: 1,
        earth: 3,
        metal: 2,
        water: 8
      },
      difficulty: 4
    },
    // Add more chapters as needed
  ];

  const batch = db.batch();
  
  daoDeJingContent.forEach((content) => {
    const docRef = db.collection('wisdomContent').doc();
    batch.set(docRef, content);
  });
  
  await batch.commit();
  console.log('Dao De Jing content seeded successfully');
};

// Seed I Ching content
const seedIChing = async () => {
  const iChingContent = [
    {
      source: 'I Ching',
      chapter: 'Hexagram 1: Qian (The Creative)',
      originalText: '乾：元，亨，利，贞。',
      translation: 'The Creative works sublime success, furthering through perseverance.',
      explanation: 'This hexagram represents the creative principle which is realized in the leader. The dragon is the symbol of the electrically charged, dynamic, arousing force.',
      emotionalTags: ['inspiration', 'ambition', 'creativity'],
      elementAssociations: {
        wood: 2,
        fire: 8,
        earth: 1,
        metal: 6,
        water: 3
      },
      difficulty: 3
    },
    {
      source: 'I Ching',
      chapter: 'Hexagram 2: Kun (The Receptive)',
      originalText: '坤：元，亨，利，牝马之贞。',
      translation: 'The Receptive brings about sublime success, furthering through the perseverance of a mare.',
      explanation: 'This hexagram represents nature in contrast to spirit, earth in contrast to heaven, space as against time, the female-maternal as against the male-paternal.',
      emotionalTags: ['patience', 'acceptance', 'nurturing'],
      elementAssociations: {
        wood: 3,
        fire: 1,
        earth: 9,
        metal: 4,
        water: 3
      },
      difficulty: 2
    },
    // Add more hexagrams as needed
  ];

  const batch = db.batch();
  
  iChingContent.forEach((content) => {
    const docRef = db.collection('wisdomContent').doc();
    batch.set(docRef, content);
  });
  
  await batch.commit();
  console.log('I Ching content seeded successfully');
};

// Seed Wang Yangming content
const seedWangYangming = async () => {
  const yangmingContent = [
    {
      source: 'Wang Yangming',
      chapter: 'Unity of Knowledge and Action',
      originalText: '知行合一',
      translation: 'Knowledge and action are one.',
      explanation: 'Wang Yangming's central teaching that true knowledge and action are inseparable. Genuine understanding manifests in behavior, and proper action reflects authentic knowledge.',
      emotionalTags: ['doubt', 'confusion', 'indecision'],
      elementAssociations: {
        wood: 6,
        fire: 4,
        earth: 5,
        metal: 3,
        water: 2
      },
      difficulty: 4
    },
    {
      source: 'Wang Yangming',
      chapter: 'Innate Knowledge',
      originalText: '致良知',
      translation: 'Extending innate knowledge.',
      explanation: 'Wang believed that all people possess innate knowledge of good and evil. The task is not to acquire new knowledge but to recognize and extend what we already know intuitively.',
      emotionalTags: ['self-doubt', 'uncertainty', 'curiosity'],
      elementAssociations: {
        wood: 5,
        fire: 6,
        earth: 4,
        metal: 2,
        water: 3
      },
      difficulty: 3
    },
    // Add more concepts as needed
  ];

  const batch = db.batch();
  
  yangmingContent.forEach((content) => {
    const docRef = db.collection('wisdomContent').doc();
    batch.set(docRef, content);
  });
  
  await batch.commit();
  console.log('Wang Yangming content seeded successfully');
};

// Run the seeding functions
const seedDatabase = async () => {
  try {
    await seedDaoDeJing();
    await seedIChing();
    await seedWangYangming();
    console.log('Database seeding completed successfully');
  } catch (error) {
    console.error('Error seeding database:', error);
  }
};

seedDatabase();
```

## Testing Strategy

### Unit Testing

For unit testing, we'll use Jest and React Native Testing Library. Here's an example test for the WisdomCard component:

```javascript
// __tests__/components/WisdomCard.test.js
import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import WisdomCard from '../../src/components/Wisdom/WisdomCard';

describe('WisdomCard', () => {
  const mockProps = {
    quote: 'Test quote',
    source: 'Test source',
    chapter: 'Test chapter',
    translation: 'Test translation',
    onPress: jest.fn(),
    onSave: jest.fn(),
    onShare: jest.fn(),
    saved: false,
  };

  it('renders correctly', () => {
    const { getByText } = render(<WisdomCard {...mockProps} />);
    
    expect(getByText('Test quote')).toBeTruthy();
    expect(getByText('Test source • Test chapter')).toBeTruthy();
    expect(getByText('Test translation')).toBeTruthy();
  });

  it('calls onPress when card is pressed', () => {
    const { getByText } = render(<WisdomCard {...mockProps} />);
    
    fireEvent.press(getByText('Read More'));
    expect(mockProps.onPress).toHaveBeenCalled();
  });

  it('calls onSave when save button is pressed', () => {
    const { getByTestId } = render(<WisdomCard {...mockProps} />);
    
    fireEvent.press(getByTestId('save-button'));
    expect(mockProps.onSave).toHaveBeenCalled();
  });

  it('displays correct bookmark icon based on saved prop', () => {
    const { getByTestId, rerender } = render(<WisdomCard {...mockProps} />);
    
    // Initially not saved
    expect(getByTestId('bookmark-icon').props.name).toBe('bookmark-outline');
    
    // Rerender with saved=true
    rerender(<WisdomCard {...mockProps} saved={true} />);
    expect(getByTestId('bookmark-icon').props.name).toBe('bookmark');
  });
});
```

### Integration Testing

For integration testing, we'll focus on key user flows:

1. **Authentication Flow**
   - User registration
   - User login
   - Password reset

2. **Emotional Check-In Flow**
   - Completing emotional check-in
   - Viewing emotional state history

3. **Wisdom Content Flow**
   - Viewing wisdom content based on emotional state
   - Saving and sharing wisdom content
   - Tracking wisdom progress

Example integration test for the emotional check-in flow:

```javascript
// __tests__/flows/EmotionalCheckInFlow.test.js
import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { AuthProvider } from '../../src/contexts/AuthContext';
import { EmotionalStateProvider } from '../../src/contexts/EmotionalStateContext';
import EmotionalCheckIn from '../../src/components/Emotional/EmotionalCheckIn';
import PhilosophyFeed from '../../src/screens/HeartLaw/PhilosophyFeed';

// Mock Firebase
jest.mock('@react-native-firebase/auth', () => {
  return () => ({
    onAuthStateChanged: jest.fn(() => jest.fn()),
    signInWithEmailAndPassword: jest.fn(() => Promise.resolve()),
    createUserWithEmailAndPassword: jest.fn(() => Promise.resolve()),
    signOut: jest.fn(() => Promise.resolve()),
    currentUser: { uid: 'test-uid' },
  });
});

jest.mock('@react-native-firebase/firestore', () => {
  return () => ({
    collection: jest.fn(() => ({
      doc: jest.fn(() => ({
        get: jest.fn(() => Promise.resolve({
          exists: true,
          data: () => ({
            uid: 'test-uid',
            displayName: 'Test User',
          }),
        })),
        collection: jest.fn(() => ({
          add: jest.fn(() => Promise.resolve({ id: 'test-state-id' })),
          orderBy: jest.fn(() => ({
            limit: jest.fn(() => ({
              get: jest.fn(() => Promise.resolve({
                docs: [],
              })),
            })),
          })),
        })),
      })),
    })),
  });
});

const Stack = createStackNavigator();

const TestNavigator = () => (
  <Stack.Navigator>
    <Stack.Screen name="EmotionalCheckIn" component={EmotionalCheckIn} />
    <Stack.Screen name="PhilosophyFeed" component={PhilosophyFeed} />
  </Stack.Navigator>
);

describe('Emotional Check-In Flow', () => {
  it('completes emotional check-in and navigates to feed', async () => {
    const mockOnComplete = jest.fn();
    
    const { getByText, getByTestId } = render(
      <NavigationContainer>
        <AuthProvider>
          <EmotionalStateProvider>
            <TestNavigator />
          </EmotionalStateProvider>
        </AuthProvider>
      </NavigationContainer>
    );
    
    // Select an emotion
    fireEvent.press(getByTestId('emotion-joy'));
    
    // Adjust intensity
    fireEvent.changeText(getByTestId('intensity-slider'), '8');
    
    // Submit check-in
    fireEvent.press(getByText('Continue'));
    
    // Wait for navigation to Philosophy Feed
    await waitFor(() => {
      expect(getByText('Heart Law System')).toBeTruthy();
    });
    
    // Verify current emotion is displayed
    expect(getByText('Current Emotion: joy')).toBeTruthy();
  });
});
```

## Performance Optimization

### React Native Optimizations

1. **Memoization**
   - Use React.memo for functional components
   - Use useMemo for expensive calculations
   - Use useCallback for event handlers

2. **List Rendering**
   - Use FlatList with proper key extraction
   - Implement item recycling with getItemLayout
   - Use PureComponent or memo for list items

3. **Image Optimization**
   - Use FastImage library for caching
   - Resize images server-side
   - Implement progressive loading

### Firebase Optimizations

1. **Offline Support**
   - Enable Firestore offline persistence
   - Implement optimistic UI updates

2. **Query Optimization**
   - Create proper indexes for complex queries
   - Limit query results
   - Use collection group queries where appropriate

3. **Caching Strategy**
   - Cache frequently accessed data
   - Implement TTL for cached data
   - Use local storage for app state

## Deployment Strategy

### App Store Deployment

1. **iOS App Store**
   - Generate App Store Connect record
   - Configure app signing and provisioning
   - Create app screenshots and metadata
   - Submit for review

2. **Google Play Store**
   - Create Google Play Console listing
   - Configure app signing
   - Create store listing assets
   - Submit for review

### CI/CD Pipeline

1. **Continuous Integration**
   - Run tests on each commit
   - Lint code for quality
   - Build app for both platforms

2. **Continuous Deployment**
   - Automate beta deployments
   - Implement feature flags
   - Set up monitoring and crash reporting

## Future Phases Roadmap

### Phase 2: Practice System
- Meditation timer with guided sessions
- Journaling with reflection prompts
- Daily rituals tracking
- Consistency metrics

### Phase 3: Energy System
- Emotional radar visualization
- Five Elements balance chart
- I Ching hexagram generation
- Lifestyle recommendations

### Phase 4: Future Self Dialogue
- AI avatar selection
- Dialogue interface
- Life trajectory mapping
- Conversation history

## Conclusion

This implementation guide provides a comprehensive roadmap for developing the Houmoon app, starting with the Heart Law System as the Phase 1 MVP. By following this guide, developers can create a solid foundation that aligns with the architectural vision while allowing for incremental expansion to include all four core systems in future phases.

The modular approach ensures that each system can be developed and tested independently, while the shared components and services provide consistency across the application. The focus on performance optimization and testing strategy will help ensure a high-quality user experience from the initial release.

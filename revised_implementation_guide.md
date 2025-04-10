# Houmoon App Implementation Guide

## Overview

This implementation guide outlines the approach for developing the Houmoon app with optimized user interaction and OS design based on best practices from mainstream healing apps like Calm and Headspace. The guide focuses on implementing the enhanced design while maintaining Houmoon's unique Eastern wisdom-based healing approach.

## Development Environment Setup

### Prerequisites

- Node.js (v16+)
- npm or yarn
- React Native CLI
- Xcode (for iOS development)
- Android Studio (for Android development)
- Firebase account

### Initial Project Setup

```bash
# Create a new React Native project
npx react-native init Houmoon

# Navigate to project directory
cd Houmoon

# Install core dependencies
npm install @react-navigation/native @react-navigation/stack @react-navigation/bottom-tabs
npm install react-native-reanimated react-native-gesture-handler react-native-screens
npm install react-native-safe-area-context @react-native-community/masked-view
npm install firebase @react-native-firebase/app @react-native-firebase/auth @react-native-firebase/firestore
npm install react-native-linear-gradient react-native-svg
npm install @react-native-community/slider
npm install react-native-vector-icons

# Install dev dependencies
npm install --save-dev @babel/core @babel/runtime @types/react @types/react-native

# Link assets
npx react-native link
```

## Project Structure Implementation

Create the following folder structure based on the enhanced component design:

```
src/
├── assets/
│   ├── fonts/
│   ├── images/
│   └── animations/
├── components/
│   ├── Common/
│   │   ├── Button.js
│   │   ├── Card.js
│   │   ├── Typography.js
│   │   ├── Input.js
│   │   ├── Icon.js
│   │   ├── Avatar.js
│   │   ├── ProgressBar.js
│   │   └── EmptyState.js
│   ├── Navigation/
│   │   ├── TabBar.js
│   │   ├── Header.js
│   │   └── BottomSheet.js
│   ├── Charts/
│   │   ├── RadarChart.js
│   │   ├── ElementsChart.js
│   │   ├── ProgressChart.js
│   │   └── TimelineChart.js
│   ├── Modals/
│   │   ├── EmotionalCheckIn.js
│   │   ├── WisdomModal.js
│   │   └── HexagramModal.js
│   └── Enhanced/
│       ├── AmbientBackground.js
│       ├── EmotionalStateVisualizer.js
│       ├── ImmersiveContentPlayer.js
│       ├── OnboardingCarousel.js
│       └── ProgressJourney.js
├── contexts/
│   ├── AuthContext.js
│   ├── ThemeContext.js
│   ├── EmotionalStateContext.js
│   └── UserProgressContext.js
├── navigation/
│   ├── AuthNavigator.js
│   ├── MainNavigator.js
│   ├── OnboardingNavigator.js
│   └── index.js
├── screens/
│   ├── Auth/
│   │   ├── Login.js
│   │   ├── Register.js
│   │   └── ForgotPassword.js
│   ├── Onboarding/
│   │   ├── OnboardingScreen.js
│   │   ├── GoalSelection.js
│   │   ├── PhilosophyIntro.js
│   │   └── PersonalizationSetup.js
│   ├── HeartLaw/
│   │   ├── PhilosophyFeed.js
│   │   ├── WisdomDetail.js
│   │   └── ProgressMap.js
│   ├── Practice/
│   │   ├── DailyRituals.js
│   │   ├── Meditation.js
│   │   ├── Journaling.js
│   │   └── ConsistencyTracker.js
│   ├── Energy/
│   │   ├── EmotionalRadar.js
│   │   ├── ElementsBalance.js
│   │   ├── IChing.js
│   │   └── LifestyleRecommendations.js
│   └── FutureSelf/
│       ├── AvatarSelection.js
│       ├── DialogueInterface.js
│       └── LifeTrajectoryMap.js
├── services/
│   ├── api.js
│   ├── auth.js
│   ├── database.js
│   ├── storage.js
│   └── analytics.js
├── styles/
│   ├── colors.js
│   ├── typography.js
│   ├── spacing.js
│   ├── shadows.js
│   └── index.js
├── utils/
│   ├── helpers.js
│   ├── validation.js
│   ├── animations.js
│   └── constants.js
└── App.js
```

## Implementation Approach

### Phase 1: Foundation and Design System

1. **Implement Style System**

First, implement the enhanced design system with the updated color palette, typography, and spacing:

```jsx
// src/styles/colors.js
export const colors = {
  // Primary Colors
  primary: '#5A7D7C', // Sage Green
  secondary: '#2D3047', // Deep Indigo
  accent1: '#FFAD05', // Warm Amber
  accent2: '#FF8C61', // Soft Coral
  
  // Emotional State Colors
  joy: '#FFD166',
  calm: '#83C5BE',
  focus: '#4059AD',
  reflection: '#6B4E71',
  growth: '#6A994E',
  balance: '#A7A284',
  
  // Neutrals
  text: '#2A2D34', // Deep Charcoal
  textSecondary: '#6C757D', // Medium Gray
  border: '#E9ECEF', // Light Gray
  background: '#F8F9FA', // Off-White
  cardBackground: '#FFFFFF', // White
  
  // Utility Colors
  white: '#FFFFFF',
  black: '#000000',
  error: '#DC3545',
  success: '#28A745',
  warning: '#FFC107',
  info: '#17A2B8',
};

// src/styles/typography.js
import { Platform } from 'react-native';

export const typography = {
  h1: {
    fontFamily: Platform.OS === 'ios' ? 'Spectral' : 'Spectral-Regular',
    fontSize: 32,
    fontWeight: '600',
    lineHeight: 40,
  },
  h2: {
    fontFamily: Platform.OS === 'ios' ? 'Spectral' : 'Spectral-Regular',
    fontSize: 28,
    fontWeight: '600',
    lineHeight: 36,
  },
  h3: {
    fontFamily: Platform.OS === 'ios' ? 'Spectral' : 'Spectral-Regular',
    fontSize: 24,
    fontWeight: '600',
    lineHeight: 32,
  },
  h4: {
    fontFamily: Platform.OS === 'ios' ? 'Noto Sans' : 'NotoSans-Regular',
    fontSize: 20,
    fontWeight: '600',
    lineHeight: 28,
  },
  h5: {
    fontFamily: Platform.OS === 'ios' ? 'Noto Sans' : 'NotoSans-Regular',
    fontSize: 18,
    fontWeight: '600',
    lineHeight: 26,
  },
  subtitle1: {
    fontFamily: Platform.OS === 'ios' ? 'Noto Sans' : 'NotoSans-Regular',
    fontSize: 16,
    fontWeight: '600',
    lineHeight: 24,
  },
  subtitle2: {
    fontFamily: Platform.OS === 'ios' ? 'Noto Sans' : 'NotoSans-Regular',
    fontSize: 14,
    fontWeight: '600',
    lineHeight: 22,
  },
  body1: {
    fontFamily: Platform.OS === 'ios' ? 'Noto Sans' : 'NotoSans-Regular',
    fontSize: 16,
    fontWeight: '400',
    lineHeight: 24,
  },
  body2: {
    fontFamily: Platform.OS === 'ios' ? 'Noto Sans' : 'NotoSans-Regular',
    fontSize: 14,
    fontWeight: '400',
    lineHeight: 22,
  },
  button: {
    fontFamily: Platform.OS === 'ios' ? 'Work Sans' : 'WorkSans-Medium',
    fontSize: 14,
    fontWeight: '500',
    lineHeight: 20,
    textTransform: 'uppercase',
  },
  caption: {
    fontFamily: Platform.OS === 'ios' ? 'Noto Sans' : 'NotoSans-Regular',
    fontSize: 12,
    fontWeight: '400',
    lineHeight: 18,
  },
  overline: {
    fontFamily: Platform.OS === 'ios' ? 'Work Sans' : 'WorkSans-Medium',
    fontSize: 10,
    fontWeight: '500',
    lineHeight: 16,
    textTransform: 'uppercase',
    letterSpacing: 1.5,
  },
};

// src/styles/spacing.js
export const spacing = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
  xxl: 48,
};

// src/styles/shadows.js
import { Platform } from 'react-native';

export const shadows = {
  1: Platform.select({
    ios: {
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 1 },
      shadowOpacity: 0.18,
      shadowRadius: 1.0,
    },
    android: {
      elevation: 1,
    },
  }),
  2: Platform.select({
    ios: {
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.20,
      shadowRadius: 1.41,
    },
    android: {
      elevation: 2,
    },
  }),
  3: Platform.select({
    ios: {
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 3 },
      shadowOpacity: 0.22,
      shadowRadius: 2.22,
    },
    android: {
      elevation: 3,
    },
  }),
  4: Platform.select({
    ios: {
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.25,
      shadowRadius: 3.84,
    },
    android: {
      elevation: 4,
    },
  }),
  5: Platform.select({
    ios: {
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 5 },
      shadowOpacity: 0.30,
      shadowRadius: 4.65,
    },
    android: {
      elevation: 5,
    },
  }),
};

// src/styles/index.js
export * from './colors';
export * from './typography';
export * from './spacing';
export * from './shadows';
```

2. **Implement Core Components**

Implement the enhanced common components following the code examples provided in the enhanced component design document:

- Button.js
- Card.js
- Typography.js
- Icon.js
- ProgressBar.js

3. **Implement Context Providers**

Set up the context providers for state management:

```jsx
// src/contexts/ThemeContext.js
import React, { createContext, useState, useContext } from 'react';
import { colors } from '../styles';

const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState('default');
  
  const getThemeColors = () => {
    switch (theme) {
      case 'dark':
        return {
          // Dark theme colors
          background: '#121212',
          cardBackground: '#1E1E1E',
          text: '#FFFFFF',
          textSecondary: '#B0B0B0',
          // ...other colors
        };
      default:
        return colors;
    }
  };
  
  const value = {
    theme,
    setTheme,
    colors: getThemeColors(),
  };
  
  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);
```

```jsx
// src/contexts/EmotionalStateContext.js
import React, { createContext, useState, useContext, useEffect } from 'react';
import { getEmotionalHistory, saveEmotionalState } from '../services/database';
import { useAuth } from './AuthContext';

const EmotionalStateContext = createContext();

export const EmotionalStateProvider = ({ children }) => {
  const { user } = useAuth();
  const [currentState, setCurrentState] = useState(null);
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    if (user) {
      loadEmotionalHistory();
    } else {
      setCurrentState(null);
      setHistory([]);
      setLoading(false);
    }
  }, [user]);
  
  const loadEmotionalHistory = async () => {
    setLoading(true);
    try {
      const data = await getEmotionalHistory(user.uid);
      setHistory(data);
      setCurrentState(data.length > 0 ? data[0] : null);
    } catch (error) {
      console.error('Error loading emotional history:', error);
    } finally {
      setLoading(false);
    }
  };
  
  const updateEmotionalState = async (state) => {
    try {
      const newState = {
        ...state,
        timestamp: new Date(),
      };
      
      await saveEmotionalState(user.uid, newState);
      setCurrentState(newState);
      setHistory([newState, ...history]);
      
      return true;
    } catch (error) {
      console.error('Error updating emotional state:', error);
      return false;
    }
  };
  
  const value = {
    currentState,
    history,
    loading,
    updateEmotionalState,
  };
  
  return (
    <EmotionalStateContext.Provider value={value}>
      {children}
    </EmotionalStateContext.Provider>
  );
};

export const useEmotionalState = () => useContext(EmotionalStateContext);
```

### Phase 2: Enhanced Components Implementation

1. **Implement New Components**

Implement the new components that enhance the user experience:

- AmbientBackground.js
- EmotionalStateVisualizer.js
- ImmersiveContentPlayer.js
- OnboardingCarousel.js

2. **Implement Enhanced Module-Specific Components**

Implement the enhanced module-specific components:

- WisdomCard.js
- TabBar.js
- EmotionalCheckIn.js

### Phase 3: Screen Implementation

1. **Implement Onboarding Screens**

Implement the redesigned onboarding experience with the OnboardingCarousel component:

```jsx
// src/screens/Onboarding/OnboardingScreen.js
import React from 'react';
import { View, StyleSheet } from 'react-native';
import OnboardingCarousel from '../../components/Enhanced/OnboardingCarousel';
import { colors } from '../../styles';
import EmotionalStateVisualizer from '../../components/Enhanced/EmotionalStateVisualizer';

const OnboardingScreen = ({ navigation }) => {
  const slides = [
    {
      id: '1',
      title: 'Transform Your Inner World',
      description: 'Houmoon combines ancient Eastern wisdom with modern technology to help you achieve emotional balance and personal growth.',
      image: (
        <EmotionalStateVisualizer 
          emotionalState="balance" 
          size="large" 
          animated={true} 
        />
      ),
    },
    {
      id: '2',
      title: 'Understand Your Emotions',
      description: 'Track your emotional states and gain insights into patterns that affect your well-being.',
      image: (
        <EmotionalStateVisualizer 
          emotionalState="reflection" 
          size="large" 
          animated={true} 
        />
      ),
    },
    {
      id: '3',
      title: 'Ancient Wisdom, Modern Life',
      description: 'Apply timeless philosophical principles from Dao De Jing, I Ching, and Yangming Mind Philosophy to your daily challenges.',
      image: (
        <EmotionalStateVisualizer 
          emotionalState="growth" 
          size="large" 
          animated={true} 
        />
      ),
    },
    {
      id: '4',
      title: 'Your Journey Begins',
      description: 'Start your transformation with personalized practices and insights tailored to your emotional state.',
      image: (
        <EmotionalStateVisualizer 
          emotionalState="joy" 
          size="large" 
          animated={true} 
        />
      ),
    },
  ];
  
  const handleComplete = () => {
    navigation.navigate('GoalSelection');
  };
  
  const handleSkip = () => {
    navigation.navigate('GoalSelection');
  };
  
  return (
    <View style={styles.container}>
      <OnboardingCarousel
        slides={slides}
        onComplete={handleComplete}
        onSkip={handleSkip}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
});

export default OnboardingScreen;
```

2. **Implement Heart Law System Screens (Phase 1 MVP)**

Implement the core screens for the Heart Law System with the enhanced components:

```jsx
// src/screens/HeartLaw/PhilosophyFeed.js
import React, { useState, useEffect } from 'react';
import { View, StyleSheet, FlatList, ActivityIndicator } from 'react-native';
import { getWisdomContent } from '../../services/database';
import { useEmotionalState } from '../../contexts/EmotionalStateContext';
import WisdomCard from '../../components/Enhanced/WisdomCard';
import Typography from '../../components/Common/Typography';
import AmbientBackground from '../../components/Enhanced/AmbientBackground';
import { colors, spacing } from '../../styles';

const PhilosophyFeed = ({ navigation }) => {
  const [wisdomContent, setWisdomContent] = useState([]);
  const [loading, setLoading] = useState(true);
  const { currentState } = useEmotionalState();
  
  useEffect(() => {
    loadWisdomContent();
  }, [currentState]);
  
  const loadWisdomContent = async () => {
    setLoading(true);
    try {
      // Get personalized content based on emotional state
      const content = await getWisdomContent(currentState?.primaryEmotion);
      setWisdomContent(content);
    } catch (error) {
      console.error('Error loading wisdom content:', error);
    } finally {
      setLoading(false);
    }
  };
  
  const handleCardPress = (item) => {
    navigation.navigate('WisdomDetail', { item });
  };
  
  const handleSave = (id) => {
    // Implement save functionality
  };
  
  const handleShare = (id) => {
    // Implement share functionality
  };
  
  const renderItem = ({ item }) => (
    <WisdomCard
      quote={item.quote}
      source={item.source}
      chapter={item.chapter}
      translation={item.translation}
      onPress={() => handleCardPress(item)}
      onSave={() => handleSave(item.id)}
      onShare={() => handleShare(item.id)}
      saved={item.saved}
      theme={item.element} // water, fire, earth, metal, wood
    />
  );
  
  return (
    <AmbientBackground theme="wisdom" intensity={0.3} animated={true}>
      <View style={styles.container}>
        <Typography variant="h4" style={styles.header}>
          Heart Law
        </Typography>
        
        {currentState && (
          <View style={styles.stateContainer}>
            <Typography variant="subtitle2" color="textSecondary">
              Current emotional state:
            </Typography>
            <Typography variant="subtitle1" color={currentState.primaryEmotion}>
              {currentState.primaryEmotion.charAt(0).toUpperCase() + currentState.primaryEmotion.slice(1)}
            </Typography>
          </View>
        )}
        
        {loading ? (
          <ActivityIndicator size="large" color={colors.primary} />
        ) : (
          <FlatList
            data={wisdomContent}
            renderItem={renderItem}
            keyExtractor={(item) => item.id}
            contentContainerStyle={styles.listContent}
            showsVerticalScrollIndicator={false}
          />
        )}
      </View>
    </AmbientBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: spacing.md,
  },
  header: {
    marginBottom: spacing.md,
  },
  stateContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: spacing.lg,
  },
  listContent: {
    paddingBottom: spacing.xl,
  },
});

export default PhilosophyFeed;
```

```jsx
// src/screens/HeartLaw/WisdomDetail.js
import React, { useState } from 'react';
import { View, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import Typography from '../../components/Common/Typography';
import Button from '../../components/Common/Button';
import Icon from '../../components/Common/Icon';
import ImmersiveContentPlayer from '../../components/Enhanced/ImmersiveContentPlayer';
import AmbientBackground from '../../components/Enhanced/AmbientBackground';
import { colors, spacing } from '../../styles';

const WisdomDetail = ({ route, navigation }) => {
  const { item } = route.params;
  const [immersiveMode, setImmersiveMode] = useState(false);
  
  const handleClose = () => {
    navigation.goBack();
  };
  
  const toggleImmersiveMode = () => {
    setImmersiveMode(!immersiveMode);
  };
  
  if (immersiveMode) {
    return (
      <ImmersiveContentPlayer
        title={`${item.source} • ${item.chapter}`}
        contentType="reading"
        onClose={() => setImmersiveMode(false)}
        theme={item.element || 'wisdom'}
      >
        <ScrollView contentContainerStyle={styles.immersiveContent}>
          <Typography variant="h4" style={styles.immersiveQuote}>
            "{item.quote}"
          </Typography>
          
          <Typography variant="body1" style={styles.immersiveTranslation}>
            {item.translation}
          </Typography>
          
          <Typography variant="body1" style={styles.immersiveExplanation}>
            {item.explanation}
          </Typography>
        </ScrollView>
      </ImmersiveContentPlayer>
    );
  }
  
  return (
    <AmbientBackground theme={item.element || 'wisdom'} intensity={0.3} animated={true}>
      <View style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity onPress={handleClose} style={styles.backButton}>
            <Icon name="arrow-left" size={24} color={colors.text} />
          </TouchableOpacity>
          
          <Typography variant="h5" style={styles.title}>
            {item.source}
          </Typography>
          
          <TouchableOpacity onPress={toggleImmersiveMode} style={styles.immersiveButton}>
            <Icon name="fullscreen" size={24} color={colors.text} />
          </TouchableOpacity>
        </View>
        
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={styles.content}>
            <Typography variant="overline" color="textSecondary" style={styles.chapter}>
              {item.chapter}
            </Typography>
            
            <Typography variant="h4" style={styles.quote}>
              "{item.quote}"
            </Typography>
            
            <Typography variant="subtitle1" style={styles.translationTitle}>
              Translation
            </Typography>
            
            <Typography variant="body1" style={styles.translation}>
              {item.translation}
            </Typography>
            
            <Typography variant="subtitle1" style={styles.explanationTitle}>
              Explanation
            </Typography>
            
            <Typography variant="body1" style={styles.explanation}>
              {item.explanation}
            </Typography>
            
            <Typography variant="subtitle1" style={styles.applicationTitle}>
              Application
            </Typography>
            
            <Typography variant="body1" style={styles.application}>
              {item.application}
            </Typography>
          </View>
        </ScrollView>
        
        <View style={styles.footer}>
          <Button
            title="Practice This Wisdom"
            onPress={() => navigation.navigate('Practice', { screen: 'Meditation', params: { wisdomId: item.id } })}
            fullWidth
          />
        </View>
      </View>
    </AmbientBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: spacing.md,
  },
  backButton: {
    padding: spacing.sm,
  },
  title: {
    flex: 1,
    textAlign: 'center',
  },
  immersiveButton: {
    padding: spacing.sm,
  },
  content: {
    padding: spacing.md,
    paddingBottom: spacing.xxl,
  },
  chapter: {
    marginBottom: spacing.sm,
  },
  quote: {
    marginBottom: spacing.lg,
    fontStyle: 'italic',
  },
  translationTitle: {
    marginBottom: spacing.sm,
  },
  translation: {
    marginBottom: spacing.lg,
  },
  explanationTitle: {
    marginBottom: spacing.sm,
  },
  explanation: {
    marginBottom: spacing.lg,
  },
  applicationTitle: {
    marginBottom: spacing.sm,
  },
  application: {
    marginBottom: spacing.lg,
  },
  footer: {
    padding: spacing.md,
    backgroundColor: colors.background,
    borderTopWidth: 1,
    borderTopColor: colors.border,
  },
  immersiveContent: {
    padding: spacing.lg,
    paddingTop: spacing.xxl,
    paddingBottom: spacing.xxl,
  },
  immersiveQuote: {
    marginBottom: spacing.lg,
    fontStyle: 'italic',
    textAlign: 'center',
  },
  immersiveTranslation: {
    marginBottom: spacing.xl,
    textAlign: 'center',
  },
  immersiveExplanation: {
    marginBottom: spacing.xl,
  },
});

export default WisdomDetail;
```

3. **Implement Navigation**

Set up the navigation structure with the enhanced TabBar:

```jsx
// src/navigation/index.js
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { useAuth } from '../contexts/AuthContext';

import AuthNavigator from './AuthNavigator';
import MainNavigator from './MainNavigator';
import OnboardingNavigator from './OnboardingNavigator';

const RootStack = createStackNavigator();

const Navigation = () => {
  const { user, initializing, hasCompletedOnboarding } = useAuth();
  
  if (initializing) {
    return null; // Or a loading screen
  }
  
  return (
    <NavigationContainer>
      <RootStack.Navigator screenOptions={{ headerShown: false }}>
        {!user ? (
          <RootStack.Screen name="Auth" component={AuthNavigator} />
        ) : !hasCompletedOnboarding ? (
          <RootStack.Screen name="Onboarding" component={OnboardingNavigator} />
        ) : (
          <RootStack.Screen name="Main" component={MainNavigator} />
        )}
      </RootStack.Navigator>
    </NavigationContainer>
  );
};

export default Navigation;
```

```jsx
// src/navigation/MainNavigator.js
import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';

import TabBar from '../components/Navigation/TabBar';

import PhilosophyFeed from '../screens/HeartLaw/PhilosophyFeed';
import WisdomDetail from '../screens/HeartLaw/WisdomDetail';
import ProgressMap from '../screens/HeartLaw/ProgressMap';

import DailyRituals from '../screens/Practice/DailyRituals';
import Meditation from '../screens/Practice/Meditation';
import Journaling from '../screens/Practice/Journaling';
import ConsistencyTracker from '../screens/Practice/ConsistencyTracker';

import EmotionalRadar from '../screens/Energy/EmotionalRadar';
import ElementsBalance from '../screens/Energy/ElementsBalance';
import IChing from '../screens/Energy/IChing';
import LifestyleRecommendations from '../screens/Energy/LifestyleRecommendations';

import AvatarSelection from '../screens/FutureSelf/AvatarSelection';
import DialogueInterface from '../screens/FutureSelf/DialogueInterface';
import LifeTrajectoryMap from '../screens/FutureSelf/LifeTrajectoryMap';

const Tab = createBottomTabNavigator();
const HeartLawStack = createStackNavigator();
const PracticeStack = createStackNavigator();
const EnergyStack = createStackNavigator();
const FutureSelfStack = createStackNavigator();

const HeartLawNavigator = () => (
  <HeartLawStack.Navigator screenOptions={{ headerShown: false }}>
    <HeartLawStack.Screen name="PhilosophyFeed" component={PhilosophyFeed} />
    <HeartLawStack.Screen name="WisdomDetail" component={WisdomDetail} />
    <HeartLawStack.Screen name="ProgressMap" component={ProgressMap} />
  </HeartLawStack.Navigator>
);

const PracticeNavigator = () => (
  <PracticeStack.Navigator screenOptions={{ headerShown: false }}>
    <PracticeStack.Screen name="DailyRituals" component={DailyRituals} />
    <PracticeStack.Screen name="Meditation" component={Meditation} />
    <PracticeStack.Screen name="Journaling" component={Journaling} />
    <PracticeStack.Screen name="ConsistencyTracker" component={ConsistencyTracker} />
  </PracticeStack.Navigator>
);

const EnergyNavigator = () => (
  <EnergyStack.Navigator screenOptions={{ headerShown: false }}>
    <EnergyStack.Screen name="EmotionalRadar" component={EmotionalRadar} />
    <EnergyStack.Screen name="ElementsBalance" component={ElementsBalance} />
    <EnergyStack.Screen name="IChing" component={IChing} />
    <EnergyStack.Screen name="LifestyleRecommendations" component={LifestyleRecommendations} />
  </EnergyStack.Navigator>
);

const FutureSelfNavigator = () => (
  <FutureSelfStack.Navigator screenOptions={{ headerShown: false }}>
    <FutureSelfStack.Screen name="AvatarSelection" component={AvatarSelection} />
    <FutureSelfStack.Screen name="DialogueInterface" component={DialogueInterface} />
    <FutureSelfStack.Screen name="LifeTrajectoryMap" component={LifeTrajectoryMap} />
  </FutureSelfStack.Navigator>
);

const MainNavigator = () => {
  return (
    <Tab.Navigator
      tabBar={(props) => <TabBar {...props} />}
      screenOptions={{ headerShown: false }}
    >
      <Tab.Screen name="HeartLawTab" component={HeartLawNavigator} />
      <Tab.Screen name="PracticeTab" component={PracticeNavigator} />
      <Tab.Screen name="EnergyTab" component={EnergyNavigator} />
      <Tab.Screen name="FutureSelfTab" component={FutureSelfNavigator} />
    </Tab.Navigator>
  );
};

export default MainNavigator;
```

### Phase 4: Firebase Integration

1. **Set Up Firebase Configuration**

```jsx
// src/services/firebase.js
import firebase from '@react-native-firebase/app';
import '@react-native-firebase/auth';
import '@react-native-firebase/firestore';
import '@react-native-firebase/storage';

const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_AUTH_DOMAIN",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_STORAGE_BUCKET",
  messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
  appId: "YOUR_APP_ID",
  measurementId: "YOUR_MEASUREMENT_ID"
};

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

export default firebase;
```

2. **Implement Database Services**

```jsx
// src/services/database.js
import firebase from './firebase';
import { formatWisdomContent, formatEmotionalState } from '../utils/formatters';

const firestore = firebase.firestore();

// Wisdom Content
export const getWisdomContent = async (emotionalState = null) => {
  try {
    let query = firestore.collection('wisdom');
    
    if (emotionalState) {
      query = query.where('relatedEmotions', 'array-contains', emotionalState);
    }
    
    const snapshot = await query.limit(20).get();
    
    return snapshot.docs.map(doc => formatWisdomContent({ id: doc.id, ...doc.data() }));
  } catch (error) {
    console.error('Error getting wisdom content:', error);
    throw error;
  }
};

export const getWisdomById = async (id) => {
  try {
    const doc = await firestore.collection('wisdom').doc(id).get();
    
    if (!doc.exists) {
      throw new Error('Wisdom content not found');
    }
    
    return formatWisdomContent({ id: doc.id, ...doc.data() });
  } catch (error) {
    console.error('Error getting wisdom by ID:', error);
    throw error;
  }
};

// Emotional States
export const getEmotionalHistory = async (userId) => {
  try {
    const snapshot = await firestore
      .collection('users')
      .doc(userId)
      .collection('emotionalStates')
      .orderBy('timestamp', 'desc')
      .limit(30)
      .get();
    
    return snapshot.docs.map(doc => formatEmotionalState({ id: doc.id, ...doc.data() }));
  } catch (error) {
    console.error('Error getting emotional history:', error);
    throw error;
  }
};

export const saveEmotionalState = async (userId, state) => {
  try {
    await firestore
      .collection('users')
      .doc(userId)
      .collection('emotionalStates')
      .add({
        ...state,
        timestamp: firebase.firestore.FieldValue.serverTimestamp(),
      });
    
    return true;
  } catch (error) {
    console.error('Error saving emotional state:', error);
    throw error;
  }
};

// User Progress
export const getUserProgress = async (userId) => {
  try {
    const doc = await firestore.collection('users').doc(userId).get();
    
    if (!doc.exists) {
      return null;
    }
    
    return doc.data().progress || {};
  } catch (error) {
    console.error('Error getting user progress:', error);
    throw error;
  }
};

export const updateUserProgress = async (userId, progress) => {
  try {
    await firestore.collection('users').doc(userId).update({
      progress,
      updatedAt: firebase.firestore.FieldValue.serverTimestamp(),
    });
    
    return true;
  } catch (error) {
    console.error('Error updating user progress:', error);
    throw error;
  }
};
```

### Phase 5: Testing and Optimization

1. **Component Testing**

Create tests for the core components to ensure they function as expected:

```jsx
// __tests__/components/Button.test.js
import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import Button from '../../src/components/Common/Button';

describe('Button Component', () => {
  it('renders correctly with default props', () => {
    const { getByText } = render(<Button title="Test Button" />);
    expect(getByText('Test Button')).toBeTruthy();
  });
  
  it('calls onPress when pressed', () => {
    const onPressMock = jest.fn();
    const { getByText } = render(<Button title="Test Button" onPress={onPressMock} />);
    
    fireEvent.press(getByText('Test Button'));
    expect(onPressMock).toHaveBeenCalledTimes(1);
  });
  
  it('applies disabled style when disabled', () => {
    const { getByText } = render(<Button title="Test Button" disabled />);
    // Check for disabled styling (implementation-specific)
  });
});
```

2. **Performance Optimization**

Implement performance optimizations:

```jsx
// src/utils/performance.js
import { InteractionManager } from 'react-native';

// Run heavy tasks after animations complete
export const runAfterInteractions = (task) => {
  InteractionManager.runAfterInteractions(() => {
    task();
  });
};

// Memoize expensive components
export const shouldComponentUpdate = (prevProps, nextProps, propsToCheck) => {
  return propsToCheck.some(prop => prevProps[prop] !== nextProps[prop]);
};
```

3. **Accessibility Enhancements**

Implement accessibility enhancements:

```jsx
// src/utils/accessibility.js
import { AccessibilityInfo } from 'react-native';

// Check if screen reader is enabled
export const isScreenReaderEnabled = async () => {
  return await AccessibilityInfo.isScreenReaderEnabled();
};

// Announce screen reader message
export const announceForAccessibility = (message) => {
  AccessibilityInfo.announceForAccessibility(message);
};

// Get accessibility props for elements
export const getAccessibilityProps = (label, hint, role = 'button', state = {}) => {
  return {
    accessible: true,
    accessibilityLabel: label,
    accessibilityHint: hint,
    accessibilityRole: role,
    ...state,
  };
};
```

## Deployment Strategy

### 1. Development Environment

- Set up CI/CD pipeline with GitHub Actions
- Configure development, staging, and production environments
- Implement feature flags for gradual rollout

### 2. Testing Strategy

- Unit tests for components and services
- Integration tests for screen flows
- End-to-end tests for critical user journeys
- User testing for onboarding and core features

### 3. App Store Deployment

- Prepare app store assets (screenshots, descriptions)
- Configure app signing and certificates
- Set up beta testing with TestFlight/Firebase App Distribution
- Submit to app stores with phased rollout

## Implementation Timeline

### Phase 1: Foundation (Weeks 1-2)
- Set up project structure
- Implement design system
- Create core components
- Set up Firebase integration

### Phase 2: Heart Law System MVP (Weeks 3-4)
- Implement onboarding experience
- Create Philosophy Feed screen
- Implement Wisdom Detail screen
- Set up emotional state tracking

### Phase 3: Enhanced Features (Weeks 5-6)
- Implement immersive content player
- Add ambient backgrounds
- Create emotional state visualizer
- Enhance navigation experience

### Phase 4: Testing and Refinement (Weeks 7-8)
- Conduct usability testing
- Optimize performance
- Enhance accessibility
- Prepare for deployment

## Conclusion

This implementation guide provides a comprehensive approach to developing the Houmoon app with optimized user interaction and OS design based on best practices from mainstream healing apps like Calm and Headspace. By following this guide, developers can create an engaging, intuitive, and effective app that combines Eastern wisdom with modern design principles.

The phased implementation approach allows for iterative development and testing, ensuring that each component and feature is properly implemented and optimized. The focus on the Heart Law System as the Phase 1 MVP provides a clear starting point while setting the foundation for future expansion to the Practice, Energy, and Future Self systems.

# Houmoon App Core Code Examples

This document provides the main code examples for the Houmoon app, covering frontend components, backend services, full-stack architecture, and AI reliability mechanisms.

## 1. Frontend Core Components

### 1.1 Enhanced UI Components

#### Button Component
```jsx
// src/components/Common/Button.js
import React from 'react';
import { TouchableOpacity, Text, StyleSheet, View, Animated } from 'react-native';
import { colors, typography, spacing, shadows } from '../../styles';

const Button = ({
  title,
  onPress,
  variant = 'primary', // primary, secondary, outline, text
  size = 'medium', // small, medium, large
  disabled = false,
  fullWidth = false,
  leftIcon,
  rightIcon,
  style,
}) => {
  // Add ripple animation effect
  const animatedValue = React.useRef(new Animated.Value(0)).current;
  
  const handlePressIn = () => {
    Animated.timing(animatedValue, {
      toValue: 1,
      duration: 150,
      useNativeDriver: true,
    }).start();
  };
  
  const handlePressOut = () => {
    Animated.timing(animatedValue, {
      toValue: 0,
      duration: 200,
      useNativeDriver: true,
    }).start();
  };
  
  const scale = animatedValue.interpolate({
    inputRange: [0, 1],
    outputRange: [1, 0.97],
  });
  
  const buttonStyles = [
    styles.button,
    styles[variant],
    styles[size],
    fullWidth && styles.fullWidth,
    disabled && styles.disabled,
    style,
  ];

  return (
    <Animated.View style={{ transform: [{ scale }] }}>
      <TouchableOpacity
        style={buttonStyles}
        onPress={onPress}
        disabled={disabled}
        activeOpacity={0.8}
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
      >
        {leftIcon && <View style={styles.leftIcon}>{leftIcon}</View>}
        <Text style={[styles.text, styles[`${variant}Text`]]}>
          {title}
        </Text>
        {rightIcon && <View style={styles.rightIcon}>{rightIcon}</View>}
      </TouchableOpacity>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 24, // Updated to pill shape for primary/secondary
  },
  primary: {
    backgroundColor: colors.primary,
    ...shadows[2],
  },
  secondary: {
    backgroundColor: colors.secondary,
    ...shadows[1],
  },
  outline: {
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: colors.primary,
    borderRadius: 8, // Less rounded for outline variant
  },
  text: {
    backgroundColor: 'transparent',
    borderRadius: 4, // Even less rounded for text variant
  },
  small: {
    paddingVertical: spacing.xs,
    paddingHorizontal: spacing.md,
  },
  medium: {
    paddingVertical: spacing.sm,
    paddingHorizontal: spacing.lg,
  },
  large: {
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.xl,
  },
  fullWidth: {
    width: '100%',
  },
  disabled: {
    opacity: 0.5,
  },
  text: {
    ...typography.button,
    textAlign: 'center',
  },
  primaryText: {
    color: colors.white,
  },
  secondaryText: {
    color: colors.white,
  },
  outlineText: {
    color: colors.primary,
  },
  textText: {
    color: colors.primary,
  },
  leftIcon: {
    marginRight: spacing.xs,
  },
  rightIcon: {
    marginLeft: spacing.xs,
  },
});

export default Button;
```

#### EmotionalStateVisualizer Component
```jsx
// src/components/Enhanced/EmotionalStateVisualizer.js
import React, { useEffect, useRef } from 'react';
import { View, StyleSheet, Animated, Easing } from 'react-native';
import { colors } from '../../styles';

const EmotionalStateVisualizer = ({
  emotionalState,
  size = 'medium', // small, medium, large
  animated = true,
  style,
}) => {
  // Map emotional states to colors and shapes
  const emotionMap = {
    joy: {
      color: colors.joy,
      shape: 'circle',
      animation: 'pulse',
    },
    calm: {
      color: colors.calm,
      shape: 'wave',
      animation: 'float',
    },
    focus: {
      color: colors.focus,
      shape: 'triangle',
      animation: 'rotate',
    },
    reflection: {
      color: colors.reflection,
      shape: 'spiral',
      animation: 'spin',
    },
    growth: {
      color: colors.growth,
      shape: 'leaf',
      animation: 'grow',
    },
    balance: {
      color: colors.balance,
      shape: 'yin-yang',
      animation: 'balance',
    },
    // Add more emotional states as needed
  };
  
  const emotion = emotionMap[emotionalState] || emotionMap.balance;
  
  // Animation values
  const animatedValue = useRef(new Animated.Value(0)).current;
  const secondaryAnimValue = useRef(new Animated.Value(0)).current;
  
  useEffect(() => {
    if (animated) {
      // Reset animation when emotion changes
      animatedValue.setValue(0);
      secondaryAnimValue.setValue(0);
      
      // Start appropriate animation based on emotion
      switch (emotion.animation) {
        case 'pulse':
          Animated.loop(
            Animated.sequence([
              Animated.timing(animatedValue, {
                toValue: 1,
                duration: 1500,
                easing: Easing.inOut(Easing.ease),
                useNativeDriver: true,
              }),
              Animated.timing(animatedValue, {
                toValue: 0,
                duration: 1500,
                easing: Easing.inOut(Easing.ease),
                useNativeDriver: true,
              }),
            ])
          ).start();
          break;
          
        case 'float':
          Animated.parallel([
            Animated.loop(
              Animated.sequence([
                Animated.timing(animatedValue, {
                  toValue: 1,
                  duration: 3000,
                  easing: Easing.inOut(Easing.sine),
                  useNativeDriver: true,
                }),
                Animated.timing(animatedValue, {
                  toValue: 0,
                  duration: 3000,
                  easing: Easing.inOut(Easing.sine),
                  useNativeDriver: true,
                }),
              ])
            ),
            Animated.loop(
              Animated.sequence([
                Animated.timing(secondaryAnimValue, {
                  toValue: 1,
                  duration: 4000,
                  easing: Easing.inOut(Easing.sine),
                  useNativeDriver: true,
                }),
                Animated.timing(secondaryAnimValue, {
                  toValue: 0,
                  duration: 4000,
                  easing: Easing.inOut(Easing.sine),
                  useNativeDriver: true,
                }),
              ])
            ),
          ]).start();
          break;
          
        // Add more animation cases
        
        default:
          // Default gentle pulsing animation
          Animated.loop(
            Animated.sequence([
              Animated.timing(animatedValue, {
                toValue: 1,
                duration: 2000,
                easing: Easing.inOut(Easing.ease),
                useNativeDriver: true,
              }),
              Animated.timing(animatedValue, {
                toValue: 0,
                duration: 2000,
                easing: Easing.inOut(Easing.ease),
                useNativeDriver: true,
              }),
            ])
          ).start();
      }
    }
    
    return () => {
      // Clean up animations
      animatedValue.stopAnimation();
      secondaryAnimValue.stopAnimation();
    };
  }, [emotionalState, animated]);
  
  // Size mapping
  const sizeMap = {
    small: 60,
    medium: 100,
    large: 160,
  };
  
  const containerSize = sizeMap[size] || sizeMap.medium;
  
  // Animation styles based on emotion
  let animatedStyles = {};
  
  switch (emotion.animation) {
    case 'pulse':
      const scale = animatedValue.interpolate({
        inputRange: [0, 1],
        outputRange: [1, 1.2],
      });
      
      const opacity = animatedValue.interpolate({
        inputRange: [0, 0.5, 1],
        outputRange: [0.7, 1, 0.7],
      });
      
      animatedStyles = {
        transform: [{ scale }],
        opacity,
      };
      break;
      
    case 'float':
      const translateY = animatedValue.interpolate({
        inputRange: [0, 1],
        outputRange: [0, -10],
      });
      
      const translateX = secondaryAnimValue.interpolate({
        inputRange: [0, 1],
        outputRange: [-5, 5],
      });
      
      animatedStyles = {
        transform: [
          { translateY },
          { translateX },
        ],
      };
      break;
      
    // Add more cases for different animations
  }
  
  // Render appropriate shape based on emotion
  const renderShape = () => {
    switch (emotion.shape) {
      case 'circle':
        return (
          <Animated.View 
            style={[
              styles.circle, 
              { backgroundColor: emotion.color },
              animatedStyles,
            ]} 
          />
        );
        
      case 'wave':
        // A simplified wave representation
        return (
          <Animated.View style={animatedStyles}>
            <View style={styles.waveContainer}>
              {[...Array(3)].map((_, i) => (
                <View 
                  key={i} 
                  style={[
                    styles.wave, 
                    { 
                      backgroundColor: emotion.color,
                      opacity: 0.7 - (i * 0.2),
                      transform: [{ scale: 1 + (i * 0.2) }],
                    },
                  ]} 
                />
              ))}
            </View>
          </Animated.View>
        );
        
      // Add more shape cases
      
      default:
        // Default to circle
        return (
          <Animated.View 
            style={[
              styles.circle, 
              { backgroundColor: emotion.color },
              animatedStyles,
            ]} 
          />
        );
    }
  };
  
  return (
    <View 
      style={[
        styles.container, 
        { width: containerSize, height: containerSize },
        style,
      ]}
    >
      {renderShape()}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
  },
  circle: {
    width: '80%',
    height: '80%',
    borderRadius: 999,
  },
  waveContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    height: '100%',
  },
  wave: {
    position: 'absolute',
    width: '80%',
    height: '30%',
    borderRadius: 999,
  },
  // Add more shape styles
});

export default EmotionalStateVisualizer;
```

#### ImmersiveContentPlayer Component
```jsx
// src/components/Enhanced/ImmersiveContentPlayer.js
import React, { useState, useEffect } from 'react';
import { 
  View, 
  StyleSheet, 
  TouchableWithoutFeedback, 
  Animated, 
  StatusBar,
  Dimensions,
} from 'react-native';
import { colors, spacing } from '../../styles';
import Typography from '../Common/Typography';
import Icon from '../Common/Icon';
import AmbientBackground from './AmbientBackground';

const { width, height } = Dimensions.get('window');

const ImmersiveContentPlayer = ({
  title,
  content,
  contentType = 'audio', // audio, meditation, reading
  duration,
  onClose,
  onComplete,
  theme = 'wisdom',
  children,
}) => {
  const [controlsVisible, setControlsVisible] = useState(true);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  
  // Animation values
  const controlsOpacity = React.useRef(new Animated.Value(1)).current;
  const contentScale = React.useRef(new Animated.Value(1)).current;
  
  // Toggle controls visibility with animation
  const toggleControls = () => {
    Animated.timing(controlsOpacity, {
      toValue: controlsVisible ? 0 : 1,
      duration: 300,
      useNativeDriver: true,
    }).start();
    
    setControlsVisible(!controlsVisible);
  };
  
  // Play/pause content
  const togglePlayback = () => {
    setIsPlaying(!isPlaying);
    
    // Animate content scale for feedback
    Animated.sequence([
      Animated.timing(contentScale, {
        toValue: 0.98,
        duration: 100,
        useNativeDriver: true,
      }),
      Animated.timing(contentScale, {
        toValue: 1,
        duration: 200,
        useNativeDriver: true,
      }),
    ]).start();
  };
  
  // Simulate progress updates
  useEffect(() => {
    let interval;
    
    if (isPlaying) {
      interval = setInterval(() => {
        setProgress((prev) => {
          const newProgress = prev + (1 / (duration || 300));
          
          if (newProgress >= 1) {
            clearInterval(interval);
            setIsPlaying(false);
            onComplete && onComplete();
            return 1;
          }
          
          return newProgress;
        });
      }, 1000);
    }
    
    return () => clearInterval(interval);
  }, [isPlaying, duration, onComplete]);
  
  return (
    <View style={styles.container}>
      <StatusBar hidden />
      
      <AmbientBackground theme={theme} intensity={0.7} animated={true}>
        <TouchableWithoutFeedback onPress={toggleControls}>
          <View style={styles.content}>
            {/* Main content area */}
            <Animated.View 
              style={[
                styles.contentContainer,
                { transform: [{ scale: contentScale }] },
              ]}
            >
              {children}
            </Animated.View>
            
            {/* Header controls */}
            <Animated.View 
              style={[
                styles.header,
                { opacity: controlsOpacity },
                !controlsVisible && styles.hidden,
              ]}
            >
              <TouchableWithoutFeedback onPress={onClose}>
                <View style={styles.closeButton}>
                  <Icon name="close" size={24} color={colors.text} />
                </View>
              </TouchableWithoutFeedback>
              
              <Typography variant="h5" style={styles.title}>
                {title}
              </Typography>
              
              <View style={styles.placeholder} />
            </Animated.View>
            
            {/* Footer controls */}
            <Animated.View 
              style={[
                styles.footer,
                { opacity: controlsOpacity },
                !controlsVisible && styles.hidden,
              ]}
            >
              {/* Progress bar */}
              <View style={styles.progressContainer}>
                <View style={styles.progressBackground}>
                  <View 
                    style={[
                      styles.progressFill,
                      { width: `${progress * 100}%` },
                    ]} 
                  />
                </View>
                
                <View style={styles.timeContainer}>
                  <Typography variant="caption" color="textSecondary">
                    {formatTime(progress * (duration || 300))}
                  </Typography>
                  
                  <Typography variant="caption" color="textSecondary">
                    {formatTime(duration || 300)}
                  </Typography>
                </View>
              </View>
              
              {/* Playback controls */}
              <View style={styles.controls}>
                <TouchableWithoutFeedback>
                  <View style={styles.controlButton}>
                    <Icon name="rewind-15" size={28} color={colors.text} />
                  </View>
                </TouchableWithoutFeedback>
                
                <TouchableWithoutFeedback onPress={togglePlayback}>
                  <View style={styles.playButton}>
                    <Icon 
                      name={isPlaying ? "pause" : "play"} 
                      size={32} 
                      color={colors.white} 
                    />
                  </View>
                </TouchableWithoutFeedback>
                
                <TouchableWithoutFeedback>
                  <View style={styles.controlButton}>
                    <Icon name="fast-forward-15" size={28} color={colors.text} />
                  </View>
                </TouchableWithoutFeedback>
              </View>
            </Animated.View>
          </View>
        </TouchableWithoutFeedback>
      </AmbientBackground>
    </View>
  );
};

// Helper function to format time
const formatTime = (seconds) => {
  const mins = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  contentContainer: {
    flex: 1,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: spacing.lg,
  },
  header: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: spacing.md,
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },
  closeButton: {
    padding: spacing.sm,
  },
  title: {
    flex: 1,
    textAlign: 'center',
  },
  placeholder: {
    width: 40, // Match close button width for centering
  },
  footer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    padding: spacing.md,
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  progressContainer: {
    marginBottom: spacing.md,
  },
  progressBackground: {
    height: 4,
    backgroundColor: colors.border,
    borderRadius: 2,
  },
  progressFill: {
    height: '100%',
    backgroundColor: colors.primary,
    borderRadius: 2,
  },
  timeContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: spacing.xs,
  },
  controls: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  controlButton: {
    padding: spacing.md,
  },
  playButton: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: spacing.lg,
  },
  hidden: {
    pointerEvents: 'none',
  },
});

export default ImmersiveContentPlayer;
```

### 1.2 Screen Components

#### PhilosophyFeed Screen
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

#### OnboardingScreen
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

## 2. Backend Services

### 2.1 Firebase Integration

#### Firebase Configuration
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

#### Database Services
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

### 2.2 Authentication Services

```jsx
// src/services/auth.js
import firebase from './firebase';
import { createUserProfile } from './database';

const auth = firebase.auth();

// Sign in with email and password
export const signInWithEmail = async (email, password) => {
  try {
    const result = await auth.signInWithEmailAndPassword(email, password);
    return result.user;
  } catch (error) {
    console.error('Error signing in with email:', error);
    throw error;
  }
};

// Sign up with email and password
export const signUpWithEmail = async (email, password, displayName) => {
  try {
    const result = await auth.createUserWithEmailAndPassword(email, password);
    
    // Update user profile
    await result.user.updateProfile({
      displayName,
    });
    
    // Create user profile in Firestore
    await createUserProfile(result.user.uid, {
      email,
      displayName,
      createdAt: firebase.firestore.FieldValue.serverTimestamp(),
    });
    
    return result.user;
  } catch (error) {
    console.error('Error signing up with email:', error);
    throw error;
  }
};

// Sign out
export const signOut = async () => {
  try {
    await auth.signOut();
    return true;
  } catch (error) {
    console.error('Error signing out:', error);
    throw error;
  }
};

// Reset password
export const resetPassword = async (email) => {
  try {
    await auth.sendPasswordResetEmail(email);
    return true;
  } catch (error) {
    console.error('Error resetting password:', error);
    throw error;
  }
};

// Get current user
export const getCurrentUser = () => {
  return auth.currentUser;
};

// Listen for auth state changes
export const onAuthStateChanged = (callback) => {
  return auth.onAuthStateChanged(callback);
};
```

## 3. Full-Stack Architecture

### 3.1 Context Providers

#### EmotionalStateContext
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

#### AuthContext
```jsx
// src/contexts/AuthContext.js
import React, { createContext, useState, useContext, useEffect } from 'react';
import { onAuthStateChanged, getCurrentUser } from '../services/auth';
import { getUserProfile } from '../services/database';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [profile, setProfile] = useState(null);
  const [initializing, setInitializing] = useState(true);
  const [hasCompletedOnboarding, setHasCompletedOnboarding] = useState(false);
  
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(async (authUser) => {
      if (authUser) {
        setUser(authUser);
        
        // Load user profile
        try {
          const userProfile = await getUserProfile(authUser.uid);
          setProfile(userProfile);
          setHasCompletedOnboarding(userProfile?.hasCompletedOnboarding || false);
        } catch (error) {
          console.error('Error loading user profile:', error);
        }
      } else {
        setUser(null);
        setProfile(null);
        setHasCompletedOnboarding(false);
      }
      
      setInitializing(false);
    });
    
    return unsubscribe;
  }, []);
  
  const completeOnboarding = async () => {
    if (user) {
      try {
        await updateUserProfile(user.uid, {
          hasCompletedOnboarding: true,
        });
        
        setHasCompletedOnboarding(true);
        return true;
      } catch (error) {
        console.error('Error completing onboarding:', error);
        return false;
      }
    }
    
    return false;
  };
  
  const value = {
    user,
    profile,
    initializing,
    hasCompletedOnboarding,
    completeOnboarding,
  };
  
  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
```

### 3.2 Navigation Structure

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

## 4. AI Integration and Reliability

### 4.1 AI Service Integration

```jsx
// src/services/ai.js
import axios from 'axios';
import { getApiKey } from './config';
import { storeConversationHistory, getConversationHistory } from './database';

// Base AI service with fallback mechanisms
export class AIService {
  constructor() {
    this.primaryProvider = 'openai';
    this.fallbackProvider = 'claude';
    this.maxRetries = 3;
  }
  
  async generateResponse(prompt, options = {}) {
    const { userId, conversationId, maxTokens = 500, temperature = 0.7 } = options;
    
    // Load conversation history if available
    let conversationHistory = [];
    if (userId && conversationId) {
      conversationHistory = await getConversationHistory(userId, conversationId);
    }
    
    // Try primary provider first
    try {
      const response = await this._callAIProvider(
        this.primaryProvider,
        prompt,
        conversationHistory,
        maxTokens,
        temperature
      );
      
      // Store conversation history if successful
      if (userId && conversationId) {
        await this._storeConversation(userId, conversationId, prompt, response);
      }
      
      return {
        text: response,
        provider: this.primaryProvider,
        success: true,
      };
    } catch (error) {
      console.error(`Error with primary AI provider (${this.primaryProvider}):`, error);
      
      // Try fallback provider
      try {
        console.log(`Attempting fallback to ${this.fallbackProvider}...`);
        
        const response = await this._callAIProvider(
          this.fallbackProvider,
          prompt,
          conversationHistory,
          maxTokens,
          temperature
        );
        
        // Store conversation history if successful
        if (userId && conversationId) {
          await this._storeConversation(userId, conversationId, prompt, response);
        }
        
        return {
          text: response,
          provider: this.fallbackProvider,
          success: true,
          usedFallback: true,
        };
      } catch (fallbackError) {
        console.error(`Error with fallback AI provider (${this.fallbackProvider}):`, fallbackError);
        
        // Return error and use cached response if available
        const cachedResponse = await this._getCachedResponse(userId, conversationId, prompt);
        
        return {
          text: cachedResponse || "I'm unable to generate a response at the moment. Please try again later.",
          success: false,
          error: error.message,
          usedCache: !!cachedResponse,
        };
      }
    }
  }
  
  async _callAIProvider(provider, prompt, conversationHistory, maxTokens, temperature) {
    let retries = 0;
    
    while (retries < this.maxRetries) {
      try {
        switch (provider) {
          case 'openai':
            return await this._callOpenAI(prompt, conversationHistory, maxTokens, temperature);
          case 'claude':
            return await this._callClaude(prompt, conversationHistory, maxTokens, temperature);
          default:
            throw new Error(`Unknown AI provider: ${provider}`);
        }
      } catch (error) {
        retries++;
        
        if (retries >= this.maxRetries) {
          throw error;
        }
        
        // Exponential backoff
        const delay = Math.pow(2, retries) * 1000;
        await new Promise(resolve => setTimeout(resolve, delay));
      }
    }
  }
  
  async _callOpenAI(prompt, conversationHistory, maxTokens, temperature) {
    const apiKey = getApiKey('openai');
    
    const messages = [
      ...conversationHistory.map(item => ({
        role: item.isUser ? 'user' : 'assistant',
        content: item.text,
      })),
      { role: 'user', content: prompt },
    ];
    
    const response = await axios.post(
      'https://api.openai.com/v1/chat/completions',
      {
        model: 'gpt-4',
        messages,
        max_tokens: maxTokens,
        temperature,
      },
      {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${apiKey}`,
        },
      }
    );
    
    return response.data.choices[0].message.content;
  }
  
  async _callClaude(prompt, conversationHistory, maxTokens, temperature) {
    const apiKey = getApiKey('claude');
    
    const formattedHistory = conversationHistory.map(item => 
      `${item.isUser ? 'Human' : 'Assistant'}: ${item.text}`
    ).join('\n\n');
    
    const fullPrompt = formattedHistory 
      ? `${formattedHistory}\n\nHuman: ${prompt}\n\nAssistant:`
      : `Human: ${prompt}\n\nAssistant:`;
    
    const response = await axios.post(
      'https://api.anthropic.com/v1/complete',
      {
        prompt: fullPrompt,
        model: 'claude-2',
        max_tokens_to_sample: maxTokens,
        temperature,
      },
      {
        headers: {
          'Content-Type': 'application/json',
          'x-api-key': apiKey,
        },
      }
    );
    
    return response.data.completion;
  }
  
  async _storeConversation(userId, conversationId, prompt, response) {
    await storeConversationHistory(userId, conversationId, [
      { isUser: true, text: prompt, timestamp: new Date() },
      { isUser: false, text: response, timestamp: new Date() },
    ]);
  }
  
  async _getCachedResponse(userId, conversationId, prompt) {
    if (!userId || !conversationId) return null;
    
    try {
      // Get similar prompts from history
      const history = await getConversationHistory(userId, conversationId);
      
      // Find most similar prompt using simple word matching
      // In a production app, use a more sophisticated similarity algorithm
      const promptWords = prompt.toLowerCase().split(' ');
      
      let bestMatch = null;
      let highestScore = 0;
      
      for (let i = 0; i < history.length; i += 2) { // Skip responses
        if (!history[i] || !history[i].isUser) continue;
        
        const historyPrompt = history[i].text.toLowerCase();
        const historyWords = historyPrompt.split(' ');
        
        let matchCount = 0;
        for (const word of promptWords) {
          if (historyWords.includes(word)) {
            matchCount++;
          }
        }
        
        const score = matchCount / promptWords.length;
        
        if (score > highestScore && score > 0.7) { // 70% similarity threshold
          highestScore = score;
          bestMatch = i;
        }
      }
      
      if (bestMatch !== null && history[bestMatch + 1]) {
        return `[Cached response] ${history[bestMatch + 1].text}`;
      }
      
      return null;
    } catch (error) {
      console.error('Error getting cached response:', error);
      return null;
    }
  }
}

// Specialized AI service for wisdom content generation
export class WisdomAIService extends AIService {
  async generateWisdomInsight(emotionalState, source, options = {}) {
    const prompt = `
      Generate a wisdom insight from ${source} that would be helpful for someone experiencing ${emotionalState}.
      The insight should include:
      1. A quote or passage from the original text
      2. A brief translation or interpretation
      3. An explanation of how it relates to the emotional state
      4. A practical application for daily life
      
      Format the response as JSON with the following structure:
      {
        "quote": "Original quote or passage",
        "translation": "Brief translation or interpretation",
        "explanation": "Explanation relating to emotional state",
        "application": "Practical application"
      }
    `;
    
    const response = await this.generateResponse(prompt, options);
    
    if (response.success) {
      try {
        // Parse JSON response
        const jsonMatch = response.text.match(/\{[\s\S]*\}/);
        if (jsonMatch) {
          return {
            ...JSON.parse(jsonMatch[0]),
            source,
            emotionalState,
            success: true,
          };
        }
      } catch (error) {
        console.error('Error parsing wisdom insight JSON:', error);
      }
    }
    
    // Fallback to structured extraction if JSON parsing fails
    return this._extractStructuredWisdom(response.text, source, emotionalState);
  }
  
  _extractStructuredWisdom(text, source, emotionalState) {
    // Simple extraction based on headings or patterns
    const quoteMatch = text.match(/quote:?\s*"([^"]*)"/i) || 
                      text.match(/quote:?\s*(.+?)(?=translation:|$)/i);
    const translationMatch = text.match(/translation:?\s*"([^"]*)"/i) || 
                            text.match(/translation:?\s*(.+?)(?=explanation:|$)/i);
    const explanationMatch = text.match(/explanation:?\s*"([^"]*)"/i) || 
                            text.match(/explanation:?\s*(.+?)(?=application:|$)/i);
    const applicationMatch = text.match(/application:?\s*"([^"]*)"/i) || 
                            text.match(/application:?\s*(.+?)(?=$)/i);
    
    return {
      quote: (quoteMatch && quoteMatch[1].trim()) || "Quote extraction failed",
      translation: (translationMatch && translationMatch[1].trim()) || "Translation extraction failed",
      explanation: (explanationMatch && explanationMatch[1].trim()) || "Explanation extraction failed",
      application: (applicationMatch && applicationMatch[1].trim()) || "Application extraction failed",
      source,
      emotionalState,
      success: true,
      extractionFallback: true,
    };
  }
}

// Specialized AI service for future self dialogue
export class FutureSelfAIService extends AIService {
  async generateDialogueResponse(userMessage, userProfile, pastConversation = [], options = {}) {
    // Create a detailed prompt with user profile information
    const prompt = `
      You are acting as ${userProfile.name}'s future self from 5 years in the future, who has successfully applied Eastern wisdom principles to transform their life.
      
      User's current profile:
      - Age: ${userProfile.age}
      - Current challenges: ${userProfile.challenges.join(', ')}
      - Goals: ${userProfile.goals.join(', ')}
      - Values: ${userProfile.values.join(', ')}
      
      Past conversation:
      ${pastConversation.map(msg => `${msg.isUser ? 'Current self' : 'Future self'}: ${msg.text}`).join('\n')}
      
      Current self: ${userMessage}
      
      Respond as the future self who has overcome similar challenges through applying Eastern wisdom. Your response should:
      1. Be compassionate and understanding
      2. Reference relevant Eastern philosophical concepts (Dao De Jing, I Ching, or Yangming Mind Philosophy)
      3. Provide practical guidance based on your "experience"
      4. Be conversational and personal, not academic
      
      Future self:
    `;
    
    const response = await this.generateResponse(prompt, {
      ...options,
      temperature: 0.8, // Slightly higher temperature for more creative responses
    });
    
    return {
      text: response.text,
      success: response.success,
      usedFallback: response.usedFallback,
      usedCache: response.usedCache,
    };
  }
}

// Export singleton instances
export const aiService = new AIService();
export const wisdomAIService = new WisdomAIService();
export const futureSelfAIService = new FutureSelfAIService();
```

### 4.2 AI Reliability and Fallback Mechanisms

```jsx
// src/services/aiReliability.js
import { aiService } from './ai';
import { getOfflineWisdomContent } from './offlineContent';
import NetInfo from '@react-native-community/netinfo';

// AI request queue for handling offline scenarios
class AIRequestQueue {
  constructor() {
    this.queue = [];
    this.isProcessing = false;
    this.networkListener = null;
    
    // Initialize network listener
    this._setupNetworkListener();
  }
  
  _setupNetworkListener() {
    this.networkListener = NetInfo.addEventListener(state => {
      if (state.isConnected && this.queue.length > 0 && !this.isProcessing) {
        this._processQueue();
      }
    });
  }
  
  async enqueueRequest(requestFn, onSuccess, onError) {
    const requestId = Date.now().toString();
    
    // Check network status
    const networkState = await NetInfo.fetch();
    
    if (networkState.isConnected) {
      // If online, try to process immediately
      try {
        const result = await requestFn();
        onSuccess(result);
        return requestId;
      } catch (error) {
        onError(error);
        return requestId;
      }
    }
    
    // If offline or request failed, add to queue
    this.queue.push({
      id: requestId,
      requestFn,
      onSuccess,
      onError,
      timestamp: Date.now(),
    });
    
    // Return request ID for potential cancellation
    return requestId;
  }
  
  async _processQueue() {
    if (this.isProcessing || this.queue.length === 0) return;
    
    this.isProcessing = true;
    
    const networkState = await NetInfo.fetch();
    if (!networkState.isConnected) {
      this.isProcessing = false;
      return;
    }
    
    // Process queue in FIFO order
    while (this.queue.length > 0) {
      const request = this.queue.shift();
      
      try {
        const result = await request.requestFn();
        request.onSuccess(result);
      } catch (error) {
        request.onError(error);
      }
      
      // Check network status after each request
      const currentNetworkState = await NetInfo.fetch();
      if (!currentNetworkState.isConnected) {
        break;
      }
    }
    
    this.isProcessing = false;
  }
  
  cancelRequest(requestId) {
    const index = this.queue.findIndex(request => request.id === requestId);
    
    if (index !== -1) {
      this.queue.splice(index, 1);
      return true;
    }
    
    return false;
  }
  
  destroy() {
    if (this.networkListener) {
      this.networkListener();
    }
  }
}

// Reliable AI service with offline support
export class ReliableAIService {
  constructor() {
    this.requestQueue = new AIRequestQueue();
    this.offlineContentLoaded = false;
    this.offlineContent = null;
  }
  
  async loadOfflineContent() {
    if (!this.offlineContentLoaded) {
      this.offlineContent = await getOfflineWisdomContent();
      this.offlineContentLoaded = true;
    }
  }
  
  async getWisdomContent(emotionalState, options = {}) {
    // Ensure offline content is loaded
    await this.loadOfflineContent();
    
    return new Promise((resolve, reject) => {
      const requestFn = async () => {
        try {
          // Try online AI service first
          const aiResult = await aiService.generateWisdomInsight(
            emotionalState,
            options.source || 'Dao De Jing',
            options
          );
          
          return aiResult;
        } catch (error) {
          // If AI service fails, use offline content
          console.log('AI service failed, using offline content');
          
          if (this.offlineContent) {
            // Find relevant offline content based on emotional state
            const relevantContent = this.offlineContent.filter(
              content => content.relatedEmotions.includes(emotionalState)
            );
            
            if (relevantContent.length > 0) {
              // Return random item from relevant content
              const randomIndex = Math.floor(Math.random() * relevantContent.length);
              return {
                ...relevantContent[randomIndex],
                success: true,
                offlineFallback: true,
              };
            }
          }
          
          // If no relevant offline content, throw error
          throw new Error('No relevant wisdom content available offline');
        }
      };
      
      this.requestQueue.enqueueRequest(
        requestFn,
        resolve,
        reject
      );
    });
  }
  
  async getFutureSelfResponse(userMessage, userProfile, pastConversation, options = {}) {
    // Ensure offline content is loaded
    await this.loadOfflineContent();
    
    return new Promise((resolve, reject) => {
      const requestFn = async () => {
        try {
          // Try online AI service first
          const aiResult = await futureSelfAIService.generateDialogueResponse(
            userMessage,
            userProfile,
            pastConversation,
            options
          );
          
          return aiResult;
        } catch (error) {
          // If AI service fails, use offline content
          console.log('AI service failed, using offline content for future self dialogue');
          
          if (this.offlineContent) {
            // Find generic responses based on message keywords
            const keywords = userMessage.toLowerCase().split(' ');
            
            // Filter offline content for generic future self responses
            const genericResponses = this.offlineContent.filter(
              content => content.type === 'futureself_response'
            );
            
            if (genericResponses.length > 0) {
              // Find best matching response based on keywords
              let bestMatch = genericResponses[0];
              let bestScore = 0;
              
              for (const response of genericResponses) {
                const responseKeywords = response.keywords || [];
                let score = 0;
                
                for (const keyword of keywords) {
                  if (responseKeywords.includes(keyword)) {
                    score++;
                  }
                }
                
                if (score > bestScore) {
                  bestScore = score;
                  bestMatch = response;
                }
              }
              
              return {
                text: bestMatch.text,
                success: true,
                offlineFallback: true,
              };
            }
          }
          
          // If no relevant offline content, return generic response
          return {
            text: "I understand you're going through a challenging time. Remember that all difficulties are temporary, and with patience and wisdom, you'll find your way through this. When we're back online, I can provide more specific guidance based on Eastern wisdom principles.",
            success: true,
            offlineFallback: true,
            generic: true,
          };
        }
      };
      
      this.requestQueue.enqueueRequest(
        requestFn,
        resolve,
        reject
      );
    });
  }
  
  destroy() {
    this.requestQueue.destroy();
  }
}

// Export singleton instance
export const reliableAIService = new ReliableAIService();
```

### 4.3 Offline Content Service

```jsx
// src/services/offlineContent.js
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Asset } from 'expo-asset';
import * as FileSystem from 'expo-file-system';

// Keys for AsyncStorage
const OFFLINE_CONTENT_KEY = 'houmoon_offline_content';
const OFFLINE_CONTENT_VERSION_KEY = 'houmoon_offline_content_version';

// Current content version
const CURRENT_VERSION = '1.0.0';

// Load offline content from bundled assets or AsyncStorage
export const getOfflineWisdomContent = async () => {
  try {
    // Check if we have cached content
    const cachedContent = await AsyncStorage.getItem(OFFLINE_CONTENT_KEY);
    const cachedVersion = await AsyncStorage.getItem(OFFLINE_CONTENT_VERSION_KEY);
    
    // If cached content exists and version matches, use it
    if (cachedContent && cachedVersion === CURRENT_VERSION) {
      return JSON.parse(cachedContent);
    }
    
    // Otherwise, load from bundled assets
    const asset = Asset.fromModule(require('../assets/data/offline_wisdom.json'));
    await asset.downloadAsync();
    
    // Read file content
    const fileContent = await FileSystem.readAsStringAsync(asset.localUri);
    const parsedContent = JSON.parse(fileContent);
    
    // Cache content for future use
    await AsyncStorage.setItem(OFFLINE_CONTENT_KEY, fileContent);
    await AsyncStorage.setItem(OFFLINE_CONTENT_VERSION_KEY, CURRENT_VERSION);
    
    return parsedContent;
  } catch (error) {
    console.error('Error loading offline wisdom content:', error);
    
    // Fallback to hardcoded minimal content if everything fails
    return getFallbackOfflineContent();
  }
};

// Update offline content from server
export const updateOfflineContent = async () => {
  try {
    // Fetch latest content from server
    const response = await fetch('https://api.houmoon.app/offline-content');
    
    if (!response.ok) {
      throw new Error('Failed to fetch offline content');
    }
    
    const content = await response.json();
    
    // Cache content
    await AsyncStorage.setItem(OFFLINE_CONTENT_KEY, JSON.stringify(content));
    await AsyncStorage.setItem(OFFLINE_CONTENT_VERSION_KEY, content.version || CURRENT_VERSION);
    
    return true;
  } catch (error) {
    console.error('Error updating offline content:', error);
    return false;
  }
};

// Hardcoded minimal content as last resort
const getFallbackOfflineContent = () => {
  return [
    {
      id: 'offline_1',
      source: 'Dao De Jing',
      chapter: 'Chapter 8',
      quote: "The highest good is like water. Water gives life to the ten thousand things and does not strive. It flows in places men reject and so is like the Tao.",
      translation: "The best way to live is to be like water. Water benefits all things and goes against none of them. It provides for all people and even cleanses those places a man is loath to go. In this way it is just like Dao.",
      explanation: "Water represents adaptability and resilience. When facing emotional challenges, being flexible like water allows you to navigate difficulties without becoming rigid or resistant.",
      application: "Practice accepting situations as they are before trying to change them. Like water, find the path of least resistance.",
      relatedEmotions: ['anxiety', 'stress', 'frustration'],
      element: 'water'
    },
    {
      id: 'offline_2',
      source: 'I Ching',
      chapter: 'Hexagram 24: Return',
      quote: "Return. Success. Going out and coming in without error. Friends come without blame. To and fro goes the way. On the seventh day comes return. It furthers one to have somewhere to go.",
      translation: "After a time of decay comes the turning point. The powerful light that has been banished returns. There is movement, but it is not brought about by force.",
      explanation: "This wisdom reminds us that all emotional states are cyclical. After difficulty comes renewal. Your current emotional state is not permanent but part of a natural cycle.",
      application: "Notice the small signs of positive change even during difficult times. Trust in the natural cycle of renewal.",
      relatedEmotions: ['sadness', 'depression', 'hopelessness'],
      element: 'earth'
    },
    {
      id: 'offline_3',
      source: 'Yangming Mind Philosophy',
      chapter: 'Inquiry on the Great Learning',
      quote: "The extension of knowledge lies in the investigation of things. When things are investigated, knowledge is extended; when knowledge is extended, the will becomes sincere.",
      translation: "True understanding comes from careful observation of reality. When we deeply understand something, our intentions naturally align with what is right.",
      explanation: "This teaching suggests that emotional clarity comes from honest self-reflection. By investigating your emotions without judgment, you gain wisdom about yourself.",
      application: "Take time to observe your emotions without trying to change them. Notice what triggers them and how they manifest in your body.",
      relatedEmotions: ['confusion', 'uncertainty', 'doubt'],
      element: 'metal'
    },
    {
      type: 'futureself_response',
      text: "Looking back from where I am now, I can see how this challenge was actually a turning point for you. The Eastern wisdom that helped me most was understanding that resistance creates suffering. When I learned to flow with circumstances while maintaining my inner purpose—like water carving a canyon—everything began to shift. Try this: for the next week, practice accepting each situation fully before deciding how to respond. This simple shift in approach will reveal new possibilities you can't see when you're in resistance mode.",
      keywords: ['challenge', 'difficult', 'stuck', 'problem']
    },
    {
      type: 'futureself_response',
      text: "I remember feeling exactly as you do now. What helped me transform this feeling was a practice from Yangming philosophy: unity of knowledge and action. Instead of trying to think my way out of emotional turmoil, I began taking small actions aligned with my values, regardless of how I felt. Each aligned action, however small, created a feedback loop that gradually shifted my emotional state. Start with just one small action today that represents who you want to become.",
      keywords: ['feel', 'emotion', 'sad', 'anxious', 'depressed']
    }
  ];
};
```

## 5. App Entry Point

```jsx
// App.js
import React from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { StatusBar } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

// Navigation
import Navigation from './src/navigation';

// Context Providers
import { AuthProvider } from './src/contexts/AuthContext';
import { ThemeProvider } from './src/contexts/ThemeContext';
import { EmotionalStateProvider } from './src/contexts/EmotionalStateContext';
import { UserProgressProvider } from './src/contexts/UserProgressContext';

// Error Boundary
import ErrorBoundary from './src/components/ErrorBoundary';

export default function App() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <ErrorBoundary>
        <SafeAreaProvider>
          <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />
          <AuthProvider>
            <ThemeProvider>
              <EmotionalStateProvider>
                <UserProgressProvider>
                  <Navigation />
                </UserProgressProvider>
              </EmotionalStateProvider>
            </ThemeProvider>
          </AuthProvider>
        </SafeAreaProvider>
      </ErrorBoundary>
    </GestureHandlerRootView>
  );
}
```

## 6. Database Schema (Firestore)

```javascript
// Firestore Database Schema

// users collection
users: {
  userId: {
    email: string,
    displayName: string,
    createdAt: timestamp,
    lastLoginAt: timestamp,
    hasCompletedOnboarding: boolean,
    selectedGoals: array<string>,
    profile: {
      age: number,
      challenges: array<string>,
      values: array<string>,
      goals: array<string>
    },
    preferences: {
      notificationsEnabled: boolean,
      reminderTime: string, // HH:MM format
      themePreference: string,
      fontSizePreference: string
    },
    progress: {
      wisdomContentViewed: number,
      practiceSessionsCompleted: number,
      journalEntriesCreated: number,
      streakDays: number,
      lastActiveDate: timestamp,
      achievements: array<string>
    }
  }
}

// users/{userId}/emotionalStates subcollection
emotionalStates: {
  stateId: {
    primaryEmotion: string,
    secondaryEmotion: string,
    intensity: number,
    notes: string,
    timestamp: timestamp,
    relatedElements: array<string> // water, fire, earth, metal, wood
  }
}

// users/{userId}/savedContent subcollection
savedContent: {
  contentId: {
    contentType: string, // wisdom, practice, hexagram
    originalId: string,
    savedAt: timestamp,
    notes: string
  }
}

// users/{userId}/conversations subcollection
conversations: {
  conversationId: {
    title: string,
    createdAt: timestamp,
    updatedAt: timestamp,
    type: string, // futureself, wisdom
    messages: array<{
      isUser: boolean,
      text: string,
      timestamp: timestamp
    }>
  }
}

// wisdom collection
wisdom: {
  wisdomId: {
    source: string, // Dao De Jing, I Ching, Yangming Mind Philosophy
    chapter: string,
    quote: string,
    translation: string,
    explanation: string,
    application: string,
    relatedEmotions: array<string>,
    element: string, // water, fire, earth, metal, wood
    difficulty: number, // 1-5 scale of conceptual complexity
    tags: array<string>
  }
}

// practices collection
practices: {
  practiceId: {
    title: string,
    description: string,
    type: string, // meditation, breathing, journaling, ritual
    duration: number, // in minutes
    difficulty: number, // 1-5 scale
    relatedWisdom: array<string>, // references to wisdom documents
    relatedEmotions: array<string>,
    instructions: array<string>,
    audioUrl: string,
    imageUrl: string
  }
}

// hexagrams collection
hexagrams: {
  hexagramId: {
    number: number, // 1-64
    name: {
      chinese: string,
      english: string
    },
    structure: {
      lines: array<number>, // 0 for yin, 1 for yang
      trigrams: {
        upper: string,
        lower: string
      }
    },
    meaning: {
      general: string,
      changing: string
    },
    interpretation: string,
    relatedEmotions: array<string>
  }
}
```

This document provides the core code examples for the Houmoon app, covering the most important aspects of the frontend components, backend services, full-stack architecture, and AI reliability mechanisms. These examples demonstrate the technical implementation of the optimized design based on best practices from mainstream healing apps like Calm and Headspace.

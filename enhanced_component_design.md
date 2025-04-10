# Houmoon App Enhanced Component Design

## Overview
This document outlines the enhanced component design for the Houmoon app, incorporating best practices from mainstream healing apps like Calm and Headspace while maintaining Houmoon's unique focus on Eastern wisdom-based healing.

## Component Hierarchy Diagram

```
App
├── Navigation
│   ├── AuthNavigator
│   │   ├── Login
│   │   ├── Register
│   │   └── ForgotPassword
│   ├── MainNavigator
│   │   ├── TabNavigator (Enhanced)
│   │   │   ├── HeartLawTab (Prioritized)
│   │   │   ├── PracticeTab
│   │   │   ├── EnergyTab
│   │   │   └── FutureSelfTab
│   │   └── ModalNavigator
│   │       ├── EmotionalCheckInModal (Enhanced)
│   │       ├── WisdomDetailModal (Enhanced)
│   │       ├── HexagramDetailModal
│   │       └── SettingsModal
│   └── OnboardingNavigator (Completely Redesigned)
│       ├── OnboardingCarousel
│       ├── GoalSelection
│       ├── PhilosophyIntro
│       └── PersonalizationSetup
├── Screens
│   ├── HeartLaw
│   │   ├── PhilosophyFeed (Enhanced)
│   │   ├── WisdomDetail (Enhanced with Immersive Mode)
│   │   └── ProgressMap (Enhanced Visualization)
│   ├── Practice
│   │   ├── DailyRituals
│   │   ├── Meditation (Enhanced with Immersive Mode)
│   │   ├── Journaling
│   │   └── ConsistencyTracker
│   ├── Energy
│   │   ├── EmotionalRadar (Enhanced Visualization)
│   │   ├── ElementsBalance
│   │   ├── IChing
│   │   └── LifestyleRecommendations
│   └── FutureSelf
│       ├── AvatarSelection
│       ├── DialogueInterface
│       └── LifeTrajectoryMap
├── Components
│   ├── Common (Enhanced)
│   │   ├── Button (Enhanced)
│   │   ├── Card (Enhanced)
│   │   ├── Input
│   │   ├── Typography (Enhanced)
│   │   ├── Icon (Enhanced with Eastern Elements)
│   │   ├── Avatar
│   │   ├── ProgressBar (Enhanced)
│   │   ├── Loader (Enhanced)
│   │   └── EmptyState
│   ├── Navigation (Enhanced)
│   │   ├── TabBar (Enhanced with Priority Focus)
│   │   ├── Header
│   │   └── BottomSheet
│   ├── Charts (Enhanced)
│   │   ├── RadarChart
│   │   ├── ElementsChart
│   │   ├── ProgressChart (Enhanced)
│   │   └── TimelineChart
│   ├── Modals (Enhanced)
│   │   ├── EmotionalCheckIn (Enhanced)
│   │   ├── WisdomModal (Enhanced)
│   │   └── HexagramModal
│   └── New Components
│       ├── AmbientBackground
│       ├── EmotionalStateVisualizer
│       ├── ImmersiveContentPlayer
│       ├── OnboardingCarousel
│       └── ProgressJourney
└── Contexts
    ├── AuthContext
    ├── ThemeContext (Enhanced)
    ├── EmotionalStateContext
    └── UserProgressContext
```

## Visual Design System

### Color Palette

#### Primary Colors
- **Sage Green** (#5A7D7C): Primary brand color representing balance and growth
- **Deep Indigo** (#2D3047): Secondary color for depth and wisdom
- **Warm Amber** (#FFAD05): Accent color for energy and transformation
- **Soft Coral** (#FF8C61): Accent color for emotion and heart connection

#### Emotional State Colors
- **Joy** (#FFD166): Bright, warm yellow representing happiness and fulfillment
- **Calm** (#83C5BE): Soft teal representing peace and tranquility
- **Focus** (#4059AD): Deep blue representing concentration and clarity
- **Reflection** (#6B4E71): Purple representing introspection and insight
- **Growth** (#6A994E): Green representing personal development
- **Balance** (#A7A284): Neutral tone representing harmony and equilibrium

#### Neutrals
- **Deep Charcoal** (#2A2D34): For primary text
- **Medium Gray** (#6C757D): For secondary text
- **Light Gray** (#E9ECEF): For backgrounds and dividers
- **Off-White** (#F8F9FA): For card backgrounds and clean spaces

#### Gradients
- **Wisdom Gradient**: Transition from Deep Indigo to Soft Coral, representing the journey from knowledge to heart understanding
- **Energy Gradient**: Transition from Warm Amber to Sage Green, representing the flow of vital energy
- **Calm Gradient**: Transition from Soft Coral to Light Gray, creating a soothing visual effect

### Typography

#### Font Families
- **Primary Font**: "Noto Sans" - Clean, modern sans-serif with excellent multilingual support
- **Display Font**: "Spectral" - Elegant serif for headings with Eastern-inspired details
- **Accent Font**: "Work Sans" - For buttons and interactive elements

#### Type Scale
- **H1**: Spectral, 32px, weight 600
- **H2**: Spectral, 28px, weight 600
- **H3**: Spectral, 24px, weight 600
- **H4**: Noto Sans, 20px, weight 600
- **H5**: Noto Sans, 18px, weight 600
- **Subtitle1**: Noto Sans, 16px, weight 600
- **Subtitle2**: Noto Sans, 14px, weight 600
- **Body1**: Noto Sans, 16px, weight 400
- **Body2**: Noto Sans, 14px, weight 400
- **Button**: Work Sans, 14px, weight 500, uppercase
- **Caption**: Noto Sans, 12px, weight 400
- **Overline**: Work Sans, 10px, weight 500, uppercase, letter-spacing 1.5px

### Shape Language

#### Primary Shapes
- **Cards**: Rounded rectangles with 12px radius
- **Buttons**: Pill-shaped (fully rounded ends) for primary actions, rounded rectangles (8px radius) for secondary actions
- **Input Fields**: Subtle rounded rectangles (6px radius) with minimal borders

#### Visual Metaphors
- **Yin-Yang**: Represented through balanced, flowing curves
- **Five Elements**: Geometric shapes with organic qualities
- **Wisdom Path**: Flowing line that represents the journey through wisdom
- **Energy Flow**: Subtle wave patterns that suggest movement and transformation

## Enhanced Common Components

### Button Component (Enhanced)

The Button component has been enhanced with:
- Pill-shaped design for primary actions (inspired by Calm's rounded buttons)
- Subtle animation feedback on press
- Improved visual hierarchy with shadows
- Consistent typography using the accent font

```jsx
// Button.js - Enhanced
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

### Card Component (Enhanced)

The Card component has been enhanced with:
- Subtle animation on press
- Special variant for wisdom content with accent bar
- Improved shadow and elevation
- Overflow handling for content

```jsx
// Card.js - Enhanced
import React from 'react';
import { View, StyleSheet, TouchableOpacity, Animated } from 'react-native';
import { colors, spacing, shadows } from '../../styles';

const Card = ({
  children,
  onPress,
  style,
  elevation = 2,
  padding = 'medium', // none, small, medium, large
  variant = 'default', // default, outlined, flat, wisdom
  animateOnPress = true,
}) => {
  // Add subtle hover/press animation
  const animatedValue = React.useRef(new Animated.Value(0)).current;
  
  const handlePressIn = () => {
    if (onPress && animateOnPress) {
      Animated.timing(animatedValue, {
        toValue: 1,
        duration: 150,
        useNativeDriver: true,
      }).start();
    }
  };
  
  const handlePressOut = () => {
    if (onPress && animateOnPress) {
      Animated.timing(animatedValue, {
        toValue: 0,
        duration: 200,
        useNativeDriver: true,
      }).start();
    }
  };
  
  const scale = animatedValue.interpolate({
    inputRange: [0, 1],
    outputRange: [1, 0.98],
  });
  
  const cardStyles = [
    styles.card,
    styles[variant],
    styles[`padding${padding.charAt(0).toUpperCase() + padding.slice(1)}`],
    elevation > 0 && variant !== 'flat' && { ...shadows[elevation] },
    style,
  ];

  const content = (
    <View style={cardStyles}>
      {children}
      {variant === 'wisdom' && <View style={styles.wisdomAccent} />}
    </View>
  );

  if (onPress) {
    return (
      <Animated.View style={{ transform: [{ scale }] }}>
        <TouchableOpacity 
          activeOpacity={0.9} 
          onPress={onPress}
          onPressIn={handlePressIn}
          onPressOut={handlePressOut}
        >
          {content}
        </TouchableOpacity>
      </Animated.View>
    );
  }

  return content;
};

const styles = StyleSheet.create({
  card: {
    borderRadius: 12,
    backgroundColor: colors.cardBackground,
    overflow: 'hidden',
  },
  default: {
    backgroundColor: colors.cardBackground,
  },
  outlined: {
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: colors.border,
  },
  flat: {
    backgroundColor: 'transparent',
  },
  wisdom: {
    backgroundColor: colors.cardBackground,
    borderLeftWidth: 0, // The accent will be added as a separate element
  },
  wisdomAccent: {
    position: 'absolute',
    left: 0,
    top: 0,
    bottom: 0,
    width: 4,
    backgroundColor: colors.primary,
    borderTopLeftRadius: 12,
    borderBottomLeftRadius: 12,
  },
  paddingNone: {
    padding: 0,
  },
  paddingSmall: {
    padding: spacing.sm,
  },
  paddingMedium: {
    padding: spacing.md,
  },
  paddingLarge: {
    padding: spacing.lg,
  },
});

export default Card;
```

## New Components for Enhanced Experience

### EmotionalStateVisualizer Component

This new component visualizes emotional states using animated shapes and colors, inspired by Headspace's approach to representing abstract concepts through visual metaphors.

```jsx
// EmotionalStateVisualizer.js
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

### AmbientBackground Component

This new component creates subtle, animated backgrounds inspired by Calm's soothing visuals but with Eastern-influenced patterns.

```jsx
// AmbientBackground.js
import React, { useEffect, useRef } from 'react';
import { View, StyleSheet, Animated, Easing } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { colors } from '../../styles';

const AmbientBackground = ({
  theme = 'default', // default, wisdom, energy, practice, future
  animated = true,
  intensity = 0.5, // 0 to 1
  children,
}) => {
  // Theme-based gradient colors and patterns
  const themeSettings = {
    default: {
      colors: [colors.background, colors.background],
      pattern: 'none',
    },
    wisdom: {
      colors: ['#F8F9FA', '#E9ECEF'],
      pattern: 'dots',
    },
    energy: {
      colors: ['#F8F9FA', '#FFE8D6'],
      pattern: 'waves',
    },
    practice: {
      colors: ['#F8F9FA', '#E3F2FD'],
      pattern: 'circles',
    },
    future: {
      colors: ['#F8F9FA', '#F3E5F5'],
      pattern: 'lines',
    },
  };
  
  const settings = themeSettings[theme] || themeSettings.default;
  
  // Animation values
  const animatedValues = useRef({
    movement: new Animated.Value(0),
    opacity: new Animated.Value(intensity),
  }).current;
  
  useEffect(() => {
    if (animated) {
      // Create subtle continuous animation
      Animated.loop(
        Animated.sequence([
          Animated.timing(animatedValues.movement, {
            toValue: 1,
            duration: 20000, // Very slow movement
            easing: Easing.inOut(Easing.sine),
            useNativeDriver: false, // Required for some properties
          }),
          Animated.timing(animatedValues.movement, {
            toValue: 0,
            duration: 20000,
            easing: Easing.inOut(Easing.sine),
            useNativeDriver: false,
          }),
        ])
      ).start();
      
      // Update opacity based on intensity
      Animated.timing(animatedValues.opacity, {
        toValue: intensity,
        duration: 500,
        useNativeDriver: false,
      }).start();
    }
    
    return () => {
      // Clean up animations
      animatedValues.movement.stopAnimation();
      animatedValues.opacity.stopAnimation();
    };
  }, [animated, intensity]);
  
  // Render pattern based on theme
  const renderPattern = () => {
    switch (settings.pattern) {
      case 'dots':
        return (
          <Animated.View 
            style={[
              styles.patternContainer,
              {
                opacity: animatedValues.opacity.interpolate({
                  inputRange: [0, 1],
                  outputRange: [0, 0.1],
                }),
                transform: [
                  { 
                    translateX: animatedValues.movement.interpolate({
                      inputRange: [0, 1],
                      outputRange: [0, 10],
                    }),
                  },
                  { 
                    translateY: animatedValues.movement.interpolate({
                      inputRange: [0, 1],
                      outputRange: [0, 5],
                    }),
                  },
                ],
              },
            ]}
          >
            <View style={styles.dotsPattern} />
          </Animated.View>
        );
        
      case 'waves':
        return (
          <Animated.View 
            style={[
              styles.patternContainer,
              {
                opacity: animatedValues.opacity.interpolate({
                  inputRange: [0, 1],
                  outputRange: [0, 0.1],
                }),
                transform: [
                  { 
                    translateY: animatedValues.movement.interpolate({
                      inputRange: [0, 1],
                      outputRange: [0, 15],
                    }),
                  },
                ],
              },
            ]}
          >
            <View style={styles.wavesPattern} />
          </Animated.View>
        );
        
      // Add more pattern cases
        
      default:
        return null;
    }
  };
  
  return (
    <View style={styles.container}>
      <LinearGradient
        colors={settings.colors}
        style={styles.gradient}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
      >
        {renderPattern()}
        {children}
      </LinearGradient>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  gradient: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
  patternContainer: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    overflow: 'hidden',
  },
  dotsPattern: {
    width: '200%',
    height: '200%',
    backgroundColor: 'transparent',
    // Use background image or SVG pattern here
  },
  wavesPattern: {
    width: '100%',
    height: '200%',
    // Use background image or SVG pattern here
  },
  // Add more pattern styles
});

export default AmbientBackground;
```

### ImmersiveContentPlayer Component

This new component creates a distraction-free content consumption experience inspired by Calm's minimalist player interface.

```jsx
// ImmersiveContentPlayer.js
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

### OnboardingCarousel Component

This new component creates an engaging, benefit-oriented onboarding experience inspired by both Calm and Headspace.

```jsx
// OnboardingCarousel.js
import React, { useState, useRef } from 'react';
import { 
  View, 
  StyleSheet, 
  FlatList, 
  Dimensions, 
  Animated,
  TouchableOpacity,
} from 'react-native';
import { colors, spacing } from '../../styles';
import Typography from '../Common/Typography';
import Button from '../Common/Button';
import Icon from '../Common/Icon';

const { width } = Dimensions.get('window');

const OnboardingCarousel = ({
  slides,
  onComplete,
  onSkip,
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const flatListRef = useRef(null);
  const scrollX = useRef(new Animated.Value(0)).current;
  
  // Handle slide change
  const handleViewableItemsChanged = useRef(({ viewableItems }) => {
    if (viewableItems.length > 0) {
      setCurrentIndex(viewableItems[0].index);
    }
  }).current;
  
  // Config for viewability
  const viewabilityConfig = useRef({
    itemVisiblePercentThreshold: 50,
  }).current;
  
  // Go to next slide
  const goToNextSlide = () => {
    if (currentIndex < slides.length - 1) {
      flatListRef.current.scrollToIndex({
        index: currentIndex + 1,
        animated: true,
      });
    } else {
      onComplete();
    }
  };
  
  // Render individual slide
  const renderSlide = ({ item, index }) => {
    return (
      <View style={styles.slide}>
        <View style={styles.imageContainer}>
          {item.image}
        </View>
        
        <View style={styles.textContainer}>
          <Typography variant="h4" align="center" style={styles.title}>
            {item.title}
          </Typography>
          
          <Typography variant="body1" align="center" style={styles.description}>
            {item.description}
          </Typography>
        </View>
      </View>
    );
  };
  
  // Render pagination dots
  const renderPagination = () => {
    return (
      <View style={styles.paginationContainer}>
        {slides.map((_, index) => {
          const inputRange = [
            (index - 1) * width,
            index * width,
            (index + 1) * width,
          ];
          
          // Animate dot opacity
          const opacity = scrollX.interpolate({
            inputRange,
            outputRange: [0.3, 1, 0.3],
            extrapolate: 'clamp',
          });
          
          // Animate dot width
          const width = scrollX.interpolate({
            inputRange,
            outputRange: [8, 16, 8],
            extrapolate: 'clamp',
          });
          
          return (
            <Animated.View
              key={index}
              style={[
                styles.dot,
                { opacity, width },
                index === currentIndex && styles.activeDot,
              ]}
            />
          );
        })}
      </View>
    );
  };
  
  return (
    <View style={styles.container}>
      {/* Skip button */}
      <TouchableOpacity style={styles.skipButton} onPress={onSkip}>
        <Typography variant="button" color="primary">
          Skip
        </Typography>
      </TouchableOpacity>
      
      {/* Slides */}
      <FlatList
        ref={flatListRef}
        data={slides}
        renderItem={renderSlide}
        keyExtractor={(item) => item.id}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onViewableItemsChanged={handleViewableItemsChanged}
        viewabilityConfig={viewabilityConfig}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { x: scrollX } } }],
          { useNativeDriver: false }
        )}
        scrollEventThrottle={16}
      />
      
      {/* Pagination */}
      {renderPagination()}
      
      {/* Navigation buttons */}
      <View style={styles.buttonsContainer}>
        <Button
          title={currentIndex === slides.length - 1 ? "Get Started" : "Next"}
          onPress={goToNextSlide}
          size="large"
          fullWidth
          rightIcon={
            currentIndex === slides.length - 1 ? null : (
              <Icon name="arrow-right" size={16} color={colors.white} />
            )
          }
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  skipButton: {
    position: 'absolute',
    top: 40,
    right: 20,
    zIndex: 10,
    padding: spacing.sm,
  },
  slide: {
    width,
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: spacing.lg,
  },
  imageContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
  },
  textContainer: {
    flex: 0.5,
    justifyContent: 'flex-start',
    alignItems: 'center',
    width: '100%',
  },
  title: {
    marginBottom: spacing.md,
  },
  description: {
    textAlign: 'center',
    marginBottom: spacing.xl,
  },
  paginationContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: spacing.lg,
  },
  dot: {
    height: 8,
    width: 8,
    borderRadius: 4,
    backgroundColor: colors.primary,
    marginHorizontal: 4,
  },
  activeDot: {
    backgroundColor: colors.primary,
  },
  buttonsContainer: {
    paddingHorizontal: spacing.lg,
    paddingBottom: spacing.xl,
  },
});

export default OnboardingCarousel;
```

## Enhanced Module-Specific Components

### Enhanced WisdomCard Component

The WisdomCard component has been enhanced with:
- Gradient backgrounds based on wisdom theme
- Expandable translation section
- Animated interactions
- Improved typography and spacing

```jsx
// WisdomCard.js - Enhanced
import React, { useState } from 'react';
import { View, StyleSheet, Animated, TouchableWithoutFeedback } from 'react-native';
import { colors, spacing, typography, shadows } from '../../styles';
import Card from '../Common/Card';
import Typography from '../Common/Typography';
import Button from '../Common/Button';
import Icon from '../Common/Icon';
import { LinearGradient } from 'expo-linear-gradient';

const WisdomCard = ({
  quote,
  source,
  chapter,
  translation,
  onPress,
  onSave,
  onShare,
  saved = false,
  theme = 'default', // default, water, fire, earth, metal, wood (Five Elements)
}) => {
  const [expanded, setExpanded] = useState(false);
  const animatedHeight = React.useRef(new Animated.Value(0)).current;
  
  // Theme-based gradient colors
  const themeGradients = {
    default: [colors.cardBackground, colors.cardBackground],
    water: ['#E3F2FD', '#BBDEFB'],
    fire: ['#FBE9E7', '#FFCCBC'],
    earth: ['#F9FBE7', '#F0F4C3'],
    metal: ['#F5F5F5', '#E0E0E0'],
    wood: ['#E8F5E9', '#C8E6C9'],
  };
  
  const gradientColors = themeGradients[theme] || themeGradients.default;
  
  // Toggle expanded state with animation
  const toggleExpanded = () => {
    const toValue = expanded ? 0 : 1;
    
    Animated.timing(animatedHeight, {
      toValue,
      duration: 300,
      useNativeDriver: false, // Height animation requires false
    }).start();
    
    setExpanded(!expanded);
  };
  
  // Calculate animated height for translation
  const maxHeight = animatedHeight.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 120], // Adjust based on expected content height
  });
  
  return (
    <Card 
      style={styles.container} 
      onPress={onPress}
      elevation={3}
      variant="flat"
      animateOnPress={false}
    >
      <LinearGradient
        colors={gradientColors}
        style={styles.gradient}
      >
        <View style={styles.header}>
          <Typography variant="overline" color="textSecondary">
            {source} • {chapter}
          </Typography>
          <View style={styles.actions}>
            <Button
              variant="text"
              leftIcon={<Icon name={saved ? 'bookmark' : 'bookmark-outline'} size={20} color={colors.primary} />}
              onPress={onSave}
            />
            <Button
              variant="text"
              leftIcon={<Icon name="share-variant-outline" size={20} color={colors.primary} />}
              onPress={onShare}
            />
          </View>
        </View>
        
        <Typography variant="h5" style={styles.quote}>
          "{quote}"
        </Typography>
        
        <TouchableWithoutFeedback onPress={toggleExpanded}>
          <View style={styles.translationContainer}>
            <Animated.View style={[styles.translationContent, { maxHeight }]}>
              <Typography variant="body2" color="textSecondary" style={styles.translation}>
                {translation}
              </Typography>
            </Animated.View>
            
            <View style={styles.expandButton}>
              <Icon 
                name={expanded ? "chevron-up" : "chevron-down"} 
                size={20} 
                color={colors.textSecondary} 
              />
            </View>
          </View>
        </TouchableWithoutFeedback>
        
        <View style={styles.footer}>
          <Button
            title="Read More"
            variant="text"
            rightIcon={<Icon name="arrow-right" size={16} color={colors.primary} />}
            onPress={onPress}
          />
        </View>
      </LinearGradient>
    </Card>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: spacing.sm,
    borderRadius: 16, // Slightly more rounded
    overflow: 'hidden',
  },
  gradient: {
    padding: spacing.md,
    borderRadius: 16,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.sm,
  },
  actions: {
    flexDirection: 'row',
  },
  quote: {
    marginBottom: spacing.md,
    fontStyle: 'italic',
    lineHeight: 28, // Improved readability
  },
  translationContainer: {
    marginBottom: spacing.md,
  },
  translationContent: {
    overflow: 'hidden',
  },
  translation: {
    lineHeight: 22, // Improved readability
  },
  expandButton: {
    alignItems: 'center',
    marginTop: spacing.xs,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
});

export default WisdomCard;
```

### Enhanced TabBar Component

The TabBar component has been enhanced with:
- Prioritized Heart Law tab (Phase 1 MVP)
- Animated indicators and transitions
- Improved visual hierarchy
- Better touch targets

```jsx
// TabBar.js - Enhanced
import React from 'react';
import { View, TouchableOpacity, StyleSheet, Animated } from 'react-native';
import { colors, spacing, shadows } from '../../styles';
import Typography from '../Common/Typography';
import Icon from '../Common/Icon';

const TabBar = ({ state, descriptors, navigation }) => {
  // Map route names to icons and labels
  const routeIcons = {
    HeartLawTab: 'heart-pulse',
    PracticeTab: 'meditation',
    EnergyTab: 'lightning-bolt',
    FutureSelfTab: 'account-outline',
  };
  
  const routeLabels = {
    HeartLawTab: 'Heart Law',
    PracticeTab: 'Practice',
    EnergyTab: 'Energy',
    FutureSelfTab: 'Future Self',
  };
  
  return (
    <View style={styles.container}>
      {state.routes.map((route, index) => {
        const { options } = descriptors[route.key];
        const label = routeLabels[route.name] || options.title || route.name;
        const icon = routeIcons[route.name] || 'circle';
        
        const isFocused = state.index === index;
        
        // Animation values for tab indicator
        const animatedValues = React.useRef({
          translateY: new Animated.Value(isFocused ? 0 : 10),
          scale: new Animated.Value(isFocused ? 1 : 0),
          opacity: new Animated.Value(isFocused ? 1 : 0),
        }).current;
        
        React.useEffect(() => {
          // Animate when focus changes
          if (isFocused) {
            Animated.parallel([
              Animated.timing(animatedValues.translateY, {
                toValue: 0,
                duration: 250,
                useNativeDriver: true,
              }),
              Animated.timing(animatedValues.scale, {
                toValue: 1,
                duration: 200,
                useNativeDriver: true,
              }),
              Animated.timing(animatedValues.opacity, {
                toValue: 1,
                duration: 200,
                useNativeDriver: true,
              }),
            ]).start();
          } else {
            Animated.parallel([
              Animated.timing(animatedValues.translateY, {
                toValue: 10,
                duration: 250,
                useNativeDriver: true,
              }),
              Animated.timing(animatedValues.scale, {
                toValue: 0,
                duration: 200,
                useNativeDriver: true,
              }),
              Animated.timing(animatedValues.opacity, {
                toValue: 0,
                duration: 200,
                useNativeDriver: true,
              }),
            ]).start();
          }
        }, [isFocused]);
        
        const onPress = () => {
          const event = navigation.emit({
            type: 'tabPress',
            target: route.key,
            canPreventDefault: true,
          });
          
          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name);
          }
        };
        
        // Make Heart Law tab (index 0) larger if it's the Phase 1 MVP focus
        const isHeartLawTab = index === 0;
        const tabStyles = [
          styles.tab,
          isHeartLawTab && styles.heartLawTab,
        ];
        
        return (
          <TouchableOpacity
            key={route.key}
            accessibilityRole="button"
            accessibilityState={isFocused ? { selected: true } : {}}
            accessibilityLabel={options.tabBarAccessibilityLabel}
            testID={options.tabBarTestID}
            onPress={onPress}
            style={tabStyles}
            activeOpacity={0.7}
          >
            <View style={styles.tabContent}>
              <Icon 
                name={icon} 
                size={isHeartLawTab ? 28 : 24} 
                color={isFocused ? colors.primary : colors.textSecondary} 
              />
              
              <Typography 
                variant="caption" 
                color={isFocused ? "primary" : "textSecondary"}
                style={styles.label}
              >
                {label}
              </Typography>
              
              {/* Animated indicator dot */}
              <Animated.View 
                style={[
                  styles.indicator,
                  {
                    opacity: animatedValues.opacity,
                    transform: [
                      { translateY: animatedValues.translateY },
                      { scale: animatedValues.scale },
                    ],
                  },
                ]} 
              />
            </View>
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: colors.white,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    ...shadows[3],
    paddingBottom: spacing.xs, // Add safe area padding if needed
    paddingTop: spacing.sm,
  },
  tab: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: spacing.sm,
  },
  heartLawTab: {
    flex: 1.2, // Make Heart Law tab slightly larger
  },
  tabContent: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  label: {
    marginTop: spacing.xs,
    fontSize: 10,
  },
  indicator: {
    position: 'absolute',
    bottom: -12,
    width: 4,
    height: 4,
    borderRadius: 2,
    backgroundColor: colors.primary,
  },
});

export default TabBar;
```

## Implementation Priorities

### Phase 1 MVP (Heart Law System) Focus:

1. **High Priority**
   - Implement AmbientBackground component
   - Update WisdomCard component
   - Enhance EmotionalCheckIn with EmotionalStateVisualizer
   - Implement OnboardingCarousel for improved onboarding
   - Update Button and Card components

2. **Medium Priority**
   - Implement ImmersiveContentPlayer
   - Update TabBar with focus on Heart Law System
   - Refine typography and color system

3. **Future Phases**
   - Implement remaining specialized components
   - Add advanced animations and transitions
   - Enhance accessibility features

## Accessibility Considerations

- All components support screen readers with appropriate labels
- Color contrast ratios meet WCAG AA standards
- Interactive elements have appropriate touch targets (minimum 44x44 points)
- Typography scale supports dynamic text sizes
- Animations can be reduced or disabled for users with motion sensitivity

## Responsive Design

- All components adapt to different screen sizes
- Layouts use flexible dimensions rather than fixed sizes
- Typography scales appropriately for different devices
- Touch targets are appropriately sized for both phone and tablet

This enhanced component design incorporates the best practices from Calm and Headspace while maintaining Houmoon's unique focus on Eastern wisdom-based healing. The design emphasizes visual metaphors, immersive experiences, and intuitive interactions to create a transformative user experience.

# Houmoon App Component Design

## Overview
This document outlines the component design for the Houmoon app, focusing on the component hierarchy, reusable UI components, and the design system. The component architecture follows a modular approach aligned with the four core systems of the application.

## Component Hierarchy Diagram

```
App
├── Navigation
│   ├── AuthNavigator
│   │   ├── Login
│   │   ├── Register
│   │   └── ForgotPassword
│   ├── MainNavigator
│   │   ├── TabNavigator
│   │   │   ├── HeartLawTab
│   │   │   ├── PracticeTab
│   │   │   ├── EnergyTab
│   │   │   └── FutureSelfTab
│   │   └── ModalNavigator
│   │       ├── EmotionalCheckInModal
│   │       ├── WisdomDetailModal
│   │       ├── HexagramDetailModal
│   │       └── SettingsModal
│   └── OnboardingNavigator
│       ├── Welcome
│       ├── PhilosophyIntro
│       └── PersonalizationSetup
├── Screens
│   ├── HeartLaw
│   │   ├── PhilosophyFeed
│   │   ├── WisdomDetail
│   │   └── ProgressMap
│   ├── Practice
│   │   ├── DailyRituals
│   │   ├── Meditation
│   │   ├── Journaling
│   │   └── ConsistencyTracker
│   ├── Energy
│   │   ├── EmotionalRadar
│   │   ├── ElementsBalance
│   │   ├── IChing
│   │   └── LifestyleRecommendations
│   └── FutureSelf
│       ├── AvatarSelection
│       ├── DialogueInterface
│       └── LifeTrajectoryMap
├── Components
│   ├── Common
│   │   ├── Button
│   │   ├── Card
│   │   ├── Input
│   │   ├── Typography
│   │   ├── Icon
│   │   ├── Avatar
│   │   ├── ProgressBar
│   │   ├── Loader
│   │   └── EmptyState
│   ├── Navigation
│   │   ├── TabBar
│   │   ├── Header
│   │   └── BottomSheet
│   ├── Charts
│   │   ├── RadarChart
│   │   ├── ElementsChart
│   │   ├── ProgressChart
│   │   └── TimelineChart
│   └── Modals
│       ├── EmotionalCheckIn
│       ├── WisdomModal
│       └── HexagramModal
└── Contexts
    ├── AuthContext
    ├── ThemeContext
    ├── EmotionalStateContext
    └── UserProgressContext
```

## Reusable UI Components

### Common Components

#### Button
```jsx
// Button.js
import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import { colors, typography, spacing } from '../../styles';

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
  const buttonStyles = [
    styles.button,
    styles[variant],
    styles[size],
    fullWidth && styles.fullWidth,
    disabled && styles.disabled,
    style,
  ];

  return (
    <TouchableOpacity
      style={buttonStyles}
      onPress={onPress}
      disabled={disabled}
      activeOpacity={0.8}
    >
      {leftIcon && <View style={styles.leftIcon}>{leftIcon}</View>}
      <Text style={[styles.text, styles[`${variant}Text`]]}>
        {title}
      </Text>
      {rightIcon && <View style={styles.rightIcon}>{rightIcon}</View>}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 8,
  },
  primary: {
    backgroundColor: colors.primary,
  },
  secondary: {
    backgroundColor: colors.secondary,
  },
  outline: {
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: colors.primary,
  },
  text: {
    backgroundColor: 'transparent',
  },
  small: {
    paddingVertical: spacing.xs,
    paddingHorizontal: spacing.sm,
  },
  medium: {
    paddingVertical: spacing.sm,
    paddingHorizontal: spacing.md,
  },
  large: {
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.lg,
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

#### Card
```jsx
// Card.js
import React from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { colors, spacing, shadows } from '../../styles';

const Card = ({
  children,
  onPress,
  style,
  elevation = 2,
  padding = 'medium', // none, small, medium, large
  variant = 'default', // default, outlined, flat
}) => {
  const cardStyles = [
    styles.card,
    styles[variant],
    styles[`padding${padding.charAt(0).toUpperCase() + padding.slice(1)}`],
    elevation > 0 && variant !== 'flat' && { ...shadows[elevation] },
    style,
  ];

  if (onPress) {
    return (
      <TouchableOpacity style={cardStyles} onPress={onPress} activeOpacity={0.8}>
        {children}
      </TouchableOpacity>
    );
  }

  return <View style={cardStyles}>{children}</View>;
};

const styles = StyleSheet.create({
  card: {
    borderRadius: 12,
    backgroundColor: colors.cardBackground,
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

#### Typography
```jsx
// Typography.js
import React from 'react';
import { Text, StyleSheet } from 'react-native';
import { colors, typography } from '../../styles';

const Typography = ({
  variant = 'body1',
  color = 'text',
  align = 'left',
  style,
  children,
  numberOfLines,
  ...props
}) => {
  return (
    <Text
      style={[
        styles[variant],
        { color: colors[color], textAlign: align },
        style,
      ]}
      numberOfLines={numberOfLines}
      {...props}
    >
      {children}
    </Text>
  );
};

const styles = StyleSheet.create({
  h1: typography.h1,
  h2: typography.h2,
  h3: typography.h3,
  h4: typography.h4,
  h5: typography.h5,
  subtitle1: typography.subtitle1,
  subtitle2: typography.subtitle2,
  body1: typography.body1,
  body2: typography.body2,
  button: typography.button,
  caption: typography.caption,
  overline: typography.overline,
});

export default Typography;
```

### Module-Specific Components

#### EmotionalCheckIn
```jsx
// EmotionalCheckIn.js
import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import Slider from '@react-native-community/slider';
import { colors, spacing } from '../../styles';
import Typography from '../Common/Typography';
import Button from '../Common/Button';
import Card from '../Common/Card';
import EmotionSelector from './EmotionSelector';

const emotions = [
  { id: 'joy', label: 'Joy', color: colors.joy },
  { id: 'sadness', label: 'Sadness', color: colors.sadness },
  { id: 'anger', label: 'Anger', color: colors.anger },
  { id: 'fear', label: 'Fear', color: colors.fear },
  { id: 'surprise', label: 'Surprise', color: colors.surprise },
  { id: 'disgust', label: 'Disgust', color: colors.disgust },
  { id: 'trust', label: 'Trust', color: colors.trust },
  { id: 'anticipation', label: 'Anticipation', color: colors.anticipation },
];

const EmotionalCheckIn = ({ onComplete }) => {
  const [selectedEmotion, setSelectedEmotion] = useState(null);
  const [intensity, setIntensity] = useState(5);
  const [notes, setNotes] = useState('');

  const handleSubmit = () => {
    if (!selectedEmotion) return;
    
    onComplete({
      primaryEmotion: selectedEmotion.id,
      intensity,
      notes,
      timestamp: new Date(),
    });
  };

  return (
    <Card style={styles.container}>
      <Typography variant="h4" align="center" style={styles.title}>
        How are you feeling right now?
      </Typography>
      
      <EmotionSelector
        emotions={emotions}
        selectedEmotion={selectedEmotion}
        onSelect={setSelectedEmotion}
      />
      
      {selectedEmotion && (
        <>
          <Typography variant="subtitle1" style={styles.intensityLabel}>
            How intense is this feeling? ({intensity}/10)
          </Typography>
          
          <Slider
            style={styles.slider}
            minimumValue={1}
            maximumValue={10}
            step={1}
            value={intensity}
            onValueChange={setIntensity}
            minimumTrackTintColor={selectedEmotion.color}
            maximumTrackTintColor={colors.border}
            thumbTintColor={selectedEmotion.color}
          />
          
          <Button
            title="Continue"
            onPress={handleSubmit}
            style={styles.button}
          />
        </>
      )}
    </Card>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: spacing.lg,
  },
  title: {
    marginBottom: spacing.lg,
  },
  intensityLabel: {
    marginTop: spacing.lg,
    marginBottom: spacing.sm,
  },
  slider: {
    width: '100%',
    height: 40,
  },
  button: {
    marginTop: spacing.lg,
  },
});

export default EmotionalCheckIn;
```

#### WisdomCard
```jsx
// WisdomCard.js
import React from 'react';
import { View, StyleSheet, Image } from 'react-native';
import { colors, spacing, typography } from '../../styles';
import Card from '../Common/Card';
import Typography from '../Common/Typography';
import Button from '../Common/Button';
import Icon from '../Common/Icon';

const WisdomCard = ({
  quote,
  source,
  chapter,
  translation,
  onPress,
  onSave,
  onShare,
  saved = false,
}) => {
  return (
    <Card style={styles.container} onPress={onPress}>
      <View style={styles.header}>
        <Typography variant="overline" color="textSecondary">
          {source} • {chapter}
        </Typography>
        <View style={styles.actions}>
          <Button
            variant="text"
            leftIcon={<Icon name={saved ? 'bookmark' : 'bookmark-outline'} />}
            onPress={onSave}
          />
          <Button
            variant="text"
            leftIcon={<Icon name="share-variant-outline" />}
            onPress={onShare}
          />
        </View>
      </View>
      
      <Typography variant="h5" style={styles.quote}>
        "{quote}"
      </Typography>
      
      <Typography variant="body2" color="textSecondary" style={styles.translation}>
        {translation}
      </Typography>
      
      <View style={styles.footer}>
        <Button
          title="Read More"
          variant="text"
          rightIcon={<Icon name="arrow-right" />}
          onPress={onPress}
        />
      </View>
    </Card>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: spacing.sm,
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
  },
  translation: {
    marginBottom: spacing.md,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
});

export default WisdomCard;
```

#### HexagramDisplay
```jsx
// HexagramDisplay.js
import React from 'react';
import { View, StyleSheet } from 'react-native';
import { colors, spacing } from '../../styles';
import Typography from '../Common/Typography';

const Line = ({ value }) => {
  const isYang = value === 1;
  
  return (
    <View style={styles.lineContainer}>
      {isYang ? (
        <View style={styles.yangLine} />
      ) : (
        <View style={styles.yinLineContainer}>
          <View style={styles.yinLine} />
          <View style={styles.yinGap} />
          <View style={styles.yinLine} />
        </View>
      )}
    </View>
  );
};

const HexagramDisplay = ({
  hexagram,
  size = 'medium', // small, medium, large
  showName = true,
  showNumber = true,
}) => {
  const { number, name, structure } = hexagram;
  const { lines } = structure;
  
  const containerStyles = [
    styles.container,
    styles[size],
  ];
  
  return (
    <View style={containerStyles}>
      {showNumber && (
        <Typography variant="overline" align="center" style={styles.number}>
          {number}
        </Typography>
      )}
      
      <View style={styles.hexagram}>
        {lines.map((line, index) => (
          <Line key={index} value={line} />
        ))}
      </View>
      
      {showName && (
        <Typography variant="subtitle2" align="center" style={styles.name}>
          {name.english}
        </Typography>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
  },
  small: {
    width: 60,
  },
  medium: {
    width: 80,
  },
  large: {
    width: 120,
  },
  number: {
    marginBottom: spacing.xs,
  },
  hexagram: {
    width: '100%',
  },
  lineContainer: {
    height: 12,
    marginVertical: 4,
    width: '100%',
  },
  yangLine: {
    height: '100%',
    backgroundColor: colors.black,
    width: '100%',
  },
  yinLineContainer: {
    height: '100%',
    flexDirection: 'row',
    width: '100%',
  },
  yinLine: {
    height: '100%',
    backgroundColor: colors.black,
    flex: 1,
  },
  yinGap: {
    width: '15%',
  },
  name: {
    marginTop: spacing.sm,
  },
});

export default HexagramDisplay;
```

#### MeditationTimer
```jsx
// MeditationTimer.js
import React, { useState, useEffect, useRef } from 'react';
import { View, StyleSheet, Animated, Easing } from 'react-native';
import { colors, spacing } from '../../styles';
import Typography from '../Common/Typography';
import Button from '../Common/Button';
import CircularProgress from './CircularProgress';

const formatTime = (seconds) => {
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
};

const MeditationTimer = ({
  duration = 600, // 10 minutes in seconds
  onComplete,
  guidanceType = 'breathing', // breathing, silent, guided
}) => {
  const [timeRemaining, setTimeRemaining] = useState(duration);
  const [isActive, setIsActive] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  
  const breathAnimation = useRef(new Animated.Value(0)).current;
  
  useEffect(() => {
    let interval = null;
    
    if (isActive && !isPaused) {
      interval = setInterval(() => {
        setTimeRemaining((time) => {
          if (time <= 1) {
            clearInterval(interval);
            setIsActive(false);
            onComplete && onComplete();
            return 0;
          }
          return time - 1;
        });
      }, 1000);
    } else {
      clearInterval(interval);
    }
    
    return () => clearInterval(interval);
  }, [isActive, isPaused, onComplete]);
  
  useEffect(() => {
    if (isActive && !isPaused && guidanceType === 'breathing') {
      Animated.loop(
        Animated.sequence([
          Animated.timing(breathAnimation, {
            toValue: 1,
            duration: 4000, // 4 seconds inhale
            easing: Easing.inOut(Easing.ease),
            useNativeDriver: true,
          }),
          Animated.timing(breathAnimation, {
            toValue: 0,
            duration: 4000, // 4 seconds exhale
            easing: Easing.inOut(Easing.ease),
            useNativeDriver: true,
          }),
        ])
      ).start();
    } else {
      breathAnimation.stopAnimation();
    }
  }, [isActive, isPaused, guidanceType, breathAnimation]);
  
  const handleStart = () => {
    setIsActive(true);
    setIsPaused(false);
  };
  
  const handlePause = () => {
    setIsPaused(true);
  };
  
  const handleResume = () => {
    setIsPaused(false);
  };
  
  const handleStop = () => {
    setIsActive(false);
    setTimeRemaining(duration);
  };
  
  const progress = 1 - timeRemaining / duration;
  
  const scale = breathAnimation.interpolate({
    inputRange: [0, 1],
    outputRange: [1, 1.3],
  });
  
  const breathText = breathAnimation.interpolate({
    inputRange: [0, 0.5, 1],
    outputRange: ['Exhale...', '', 'Inhale...'],
  });
  
  return (
    <View style={styles.container}>
      <CircularProgress
        progress={progress}
        size={200}
        strokeWidth={10}
        color={colors.primary}
      >
        <Animated.View
          style={[
            styles.breathCircle,
            {
              transform: [{ scale }],
            },
          ]}
        />
        
        <Typography variant="h3" align="center">
          {formatTime(timeRemaining)}
        </Typography>
        
        {guidanceType === 'breathing' && isActive && !isPaused && (
          <Animated.Text style={styles.breathText}>
            {breathText}
          </Animated.Text>
        )}
      </CircularProgress>
      
      <View style={styles.controls}>
        {!isActive ? (
          <Button
            title="Start Meditation"
            onPress={handleStart}
            size="large"
            fullWidth
          />
        ) : (
          <View style={styles.activeControls}>
            {isPaused ? (
              <Button
                title="Resume"
                onPress={handleResume}
                variant="primary"
              />
            ) : (
              <Button
                title="Pause"
                onPress={handlePause}
                variant="secondary"
              />
            )}
            <Button
              title="End Session"
              onPress={handleStop}
              variant="outline"
            />
          </View>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: spacing.lg,
  },
  breathCircle: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: colors.primaryLight,
    opacity: 0.7,
    position: 'absolute',
  },
  breathText: {
    marginTop: spacing.lg,
    color: colors.textSecondary,
    ...typography.subtitle2,
  },
  controls: {
    marginTop: spacing.xl,
    width: '100%',
  },
  activeControls: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
});

export default MeditationTimer;
```

### Screen Components

#### PhilosophyFeed
```jsx
// PhilosophyFeed.js
import React, { useState, useEffect } from 'react';
import { View, FlatList, StyleSheet } from 'react-native';
import { colors, spacing } from '../../styles';
import Typography from '../../components/Common/Typography';
import WisdomCard from '../../components/WisdomCard';
import EmotionalCheckIn from '../../components/EmotionalCheckIn';
import { getWisdomContent } from '../../services/api/wisdomService';

const PhilosophyFeed = ({ navigation, route }) => {
  const [wisdomContent, setWisdomContent] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showEmotionalCheckIn, setShowEmotionalCheckIn] = useState(true);
  const [emotionalState, setEmotionalState] = useState(null);
  
  useEffect(() => {
    fetchWisdomContent();
  }, [emotionalState]);
  
  const fetchWisdomContent = async () => {
    setLoading(true);
    try {
      const content = await getWisdomContent(emotionalState);
      setWisdomContent(content);
    } catch (error) {
      console.error('Error fetching wisdom content:', error);
    } finally {
      setLoading(false);
    }
  };
  
  const handleEmotionalCheckInComplete = (state) => {
    setEmotionalState(state);
    setShowEmotionalCheckIn(false);
  };
  
  const handleWisdomCardPress = (item) => {
    navigation.navigate('WisdomDetail', { item });
  };
  
  const handleSaveWisdom = (id) => {
    // Save wisdom to user's saved items
  };
  
  const handleShareWisdom = (item) => {
    // Share wisdom content
  };
  
  const renderHeader = () => (
    <View style={styles.header}>
      <Typography variant="h4">Heart Law System</Typography>
      <Typography variant="body1" color="textSecondary" style={styles.subtitle}>
        Daily wisdom based on your emotional state
      </Typography>
    </View>
  );
  
  return (
    <View style={styles.container}>
      {showEmotionalCheckIn ? (
        <EmotionalCheckIn onComplete={handleEmotionalCheckInComplete} />
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
              onSave={() => handleSaveWisdom(item.id)}
              onShare={() => handleShareWisdom(item)}
              saved={item.saved}
            />
          )}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.contentContainer}
          ListHeaderComponent={renderHeader}
        />
      )}
    </View>
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
  subtitle: {
    marginTop: spacing.xs,
  },
});

export default PhilosophyFeed;
```

## Design System

### Colors
```js
// colors.js
export default {
  // Primary palette
  primary: '#5E6B9E', // Deep indigo - represents wisdom
  primaryLight: '#8F9BC1',
  primaryDark: '#3A4573',
  
  // Secondary palette
  secondary: '#D88C9A', // Soft rose - represents heart/emotion
  secondaryLight: '#F0B5C1',
  secondaryDark: '#B06475',
  
  // Accent colors
  accent1: '#88A09E', // Sage green - represents growth
  accent2: '#F2D0A7', // Warm sand - represents balance
  accent3: '#545C52', // Forest green - represents nature
  
  // Emotional colors
  joy: '#FFD166',
  sadness: '#73A6AD',
  anger: '#EF476F',
  fear: '#7D53DE',
  surprise: '#06D6A0',
  disgust: '#6A7152',
  trust: '#118AB2',
  anticipation: '#FFB347',
  
  // Five elements colors
  wood: '#7CB342',
  fire: '#FF5722',
  earth: '#FFA000',
  metal: '#B0BEC5',
  water: '#42A5F5',
  
  // Neutrals
  white: '#FFFFFF',
  background: '#F8F9FA',
  cardBackground: '#FFFFFF',
  surface: '#FFFFFF',
  border: '#E1E2E6',
  divider: '#EAECEF',
  
  // Text
  text: '#2C3E50',
  textSecondary: '#7A8C9E',
  textDisabled: '#BDC3C7',
  
  // Status
  success: '#4CAF50',
  warning: '#FFC107',
  error: '#F44336',
  info: '#2196F3',
  
  // Dark mode (to be expanded)
  darkBackground: '#121212',
  darkSurface: '#1E1E1E',
};
```

### Typography
```js
// typography.js
import { Platform } from 'react-native';

const fontFamily = Platform.select({
  ios: {
    regular: 'Avenir-Book',
    medium: 'Avenir-Medium',
    semibold: 'Avenir-Heavy',
    bold: 'Avenir-Black',
  },
  android: {
    regular: 'Roboto',
    medium: 'Roboto-Medium',
    semibold: 'Roboto-Bold',
    bold: 'Roboto-Black',
  },
});

export default {
  h1: {
    fontFamily: fontFamily.bold,
    fontSize: 32,
    lineHeight: 40,
    letterSpacing: 0.25,
  },
  h2: {
    fontFamily: fontFamily.bold,
    fontSize: 28,
    lineHeight: 36,
    letterSpacing: 0,
  },
  h3: {
    fontFamily: fontFamily.semibold,
    fontSize: 24,
    lineHeight: 32,
    letterSpacing: 0.15,
  },
  h4: {
    fontFamily: fontFamily.semibold,
    fontSize: 20,
    lineHeight: 28,
    letterSpacing: 0.15,
  },
  h5: {
    fontFamily: fontFamily.medium,
    fontSize: 18,
    lineHeight: 26,
    letterSpacing: 0.15,
  },
  subtitle1: {
    fontFamily: fontFamily.medium,
    fontSize: 16,
    lineHeight: 24,
    letterSpacing: 0.15,
  },
  subtitle2: {
    fontFamily: fontFamily.medium,
    fontSize: 14,
    lineHeight: 22,
    letterSpacing: 0.1,
  },
  body1: {
    fontFamily: fontFamily.regular,
    fontSize: 16,
    lineHeight: 24,
    letterSpacing: 0.5,
  },
  body2: {
    fontFamily: fontFamily.regular,
    fontSize: 14,
    lineHeight: 22,
    letterSpacing: 0.25,
  },
  button: {
    fontFamily: fontFamily.medium,
    fontSize: 14,
    lineHeight: 20,
    letterSpacing: 1.25,
    textTransform: 'uppercase',
  },
  caption: {
    fontFamily: fontFamily.regular,
    fontSize: 12,
    lineHeight: 16,
    letterSpacing: 0.4,
  },
  overline: {
    fontFamily: fontFamily.medium,
    fontSize: 10,
    lineHeight: 16,
    letterSpacing: 1.5,
    textTransform: 'uppercase',
  },
};
```

### Spacing
```js
// spacing.js
export default {
  xxs: 2,
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
  xxl: 48,
  xxxl: 64,
};
```

### Shadows
```js
// shadows.js
import { Platform } from 'react-native';

const createShadow = (elevation) => {
  return Platform.select({
    ios: {
      shadowColor: '#000',
      shadowOffset: {
        width: 0,
        height: elevation,
      },
      shadowOpacity: 0.1 + elevation * 0.03,
      shadowRadius: elevation * 0.8,
    },
    android: {
      elevation: elevation,
    },
  });
};

export default {
  1: createShadow(1),
  2: createShadow(2),
  3: createShadow(3),
  4: createShadow(4),
  5: createShadow(5),
  8: createShadow(8),
  12: createShadow(12),
  16: createShadow(16),
  24: createShadow(24),
};
```

## Navigation Structure

### App Navigation
```jsx
// AppNavigation.js
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

### Main Navigator
```jsx
// MainNavigator.js
import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import Icon from '../components/Common/Icon';
import { colors } from '../styles';

// Screens
import HeartLawScreen from '../screens/HeartLaw/PhilosophyFeed';
import WisdomDetailScreen from '../screens/HeartLaw/WisdomDetail';
import ProgressMapScreen from '../screens/HeartLaw/ProgressMap';

import PracticeScreen from '../screens/Practice/DailyRituals';
import MeditationScreen from '../screens/Practice/Meditation';
import JournalingScreen from '../screens/Practice/Journaling';

import EnergyScreen from '../screens/Energy/EmotionalRadar';
import ElementsBalanceScreen from '../screens/Energy/ElementsBalance';
import IChingScreen from '../screens/Energy/IChing';

import FutureSelfScreen from '../screens/FutureSelf/AvatarSelection';
import DialogueScreen from '../screens/FutureSelf/DialogueInterface';
import LifeTrajectoryScreen from '../screens/FutureSelf/LifeTrajectoryMap';

import EmotionalCheckInModal from '../components/Modals/EmotionalCheckIn';
import SettingsModal from '../screens/Settings';

const Tab = createBottomTabNavigator();
const HeartLawStack = createStackNavigator();
const PracticeStack = createStackNavigator();
const EnergyStack = createStackNavigator();
const FutureSelfStack = createStackNavigator();
const RootStack = createStackNavigator();

const HeartLawNavigator = () => (
  <HeartLawStack.Navigator>
    <HeartLawStack.Screen name="PhilosophyFeed" component={HeartLawScreen} options={{ title: 'Heart Law' }} />
    <HeartLawStack.Screen name="WisdomDetail" component={WisdomDetailScreen} options={{ title: 'Wisdom' }} />
    <HeartLawStack.Screen name="ProgressMap" component={ProgressMapScreen} options={{ title: 'Progress Map' }} />
  </HeartLawStack.Navigator>
);

const PracticeNavigator = () => (
  <PracticeStack.Navigator>
    <PracticeStack.Screen name="DailyRituals" component={PracticeScreen} options={{ title: 'Practice' }} />
    <PracticeStack.Screen name="Meditation" component={MeditationScreen} options={{ title: 'Meditation' }} />
    <PracticeStack.Screen name="Journaling" component={JournalingScreen} options={{ title: 'Journaling' }} />
  </PracticeStack.Navigator>
);

const EnergyNavigator = () => (
  <EnergyStack.Navigator>
    <EnergyStack.Screen name="EmotionalRadar" component={EnergyScreen} options={{ title: 'Energy' }} />
    <EnergyStack.Screen name="ElementsBalance" component={ElementsBalanceScreen} options={{ title: 'Elements' }} />
    <EnergyStack.Screen name="IChing" component={IChingScreen} options={{ title: 'I Ching' }} />
  </EnergyStack.Navigator>
);

const FutureSelfNavigator = () => (
  <FutureSelfStack.Navigator>
    <FutureSelfStack.Screen name="AvatarSelection" component={FutureSelfScreen} options={{ title: 'Future Self' }} />
    <FutureSelfStack.Screen name="Dialogue" component={DialogueScreen} options={{ title: 'Dialogue' }} />
    <FutureSelfStack.Screen name="LifeTrajectory" component={LifeTrajectoryScreen} options={{ title: 'Life Path' }} />
  </FutureSelfStack.Navigator>
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
    <Tab.Screen name="HeartLaw" component={HeartLawNavigator} options={{ headerShown: false }} />
    <Tab.Screen name="Practice" component={PracticeNavigator} options={{ headerShown: false }} />
    <Tab.Screen name="Energy" component={EnergyNavigator} options={{ headerShown: false }} />
    <Tab.Screen name="FutureSelf" component={FutureSelfNavigator} options={{ headerShown: false }} />
  </Tab.Navigator>
);

const MainNavigator = () => (
  <RootStack.Navigator>
    <RootStack.Screen name="TabNavigator" component={TabNavigator} options={{ headerShown: false }} />
    <RootStack.Group screenOptions={{ presentation: 'modal' }}>
      <RootStack.Screen name="EmotionalCheckIn" component={EmotionalCheckInModal} />
      <RootStack.Screen name="Settings" component={SettingsModal} />
    </RootStack.Group>
  </RootStack.Navigator>
);

export default MainNavigator;
```

## Context Providers

### Auth Context
```jsx
// AuthContext.js
import React, { createContext, useState, useEffect } from 'react';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import AsyncStorage from '@react-native-async-storage/async-storage';

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
      await auth().signInWithEmailAndPassword(email, password);
    } catch (error) {
      throw error;
    }
  };

  const register = async (email, password, displayName) => {
    try {
      const result = await auth().createUserWithEmailAndPassword(email, password);
      await result.user.updateProfile({ displayName });
    } catch (error) {
      throw error;
    }
  };

  const logout = async () => {
    try {
      await auth().signOut();
    } catch (error) {
      throw error;
    }
  };

  const resetPassword = async (email) => {
    try {
      await auth().sendPasswordResetEmail(email);
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
        resetPassword,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
```

### Emotional State Context
```jsx
// EmotionalStateContext.js
import React, { createContext, useState, useEffect, useContext } from 'react';
import firestore from '@react-native-firebase/firestore';
import { AuthContext } from './AuthContext';

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
    try {
      setLoading(true);
      
      const statesSnapshot = await firestore()
        .collection('users')
        .doc(user.uid)
        .collection('emotionalStates')
        .orderBy('timestamp', 'desc')
        .limit(10)
        .get();
      
      const states = statesSnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
        timestamp: doc.data().timestamp.toDate(),
      }));
      
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
    try {
      if (!user) return;
      
      const stateData = {
        ...state,
        timestamp: firestore.FieldValue.serverTimestamp(),
      };
      
      const docRef = await firestore()
        .collection('users')
        .doc(user.uid)
        .collection('emotionalStates')
        .add(stateData);
      
      const newState = {
        id: docRef.id,
        ...stateData,
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

## Initial Screen Implementation

### App.js
```jsx
// App.js
import React from 'react';
import { StatusBar, LogBox } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

import { AuthProvider } from './src/contexts/AuthContext';
import { EmotionalStateContext } from './src/contexts/EmotionalStateContext';
import { ThemeProvider } from './src/contexts/ThemeContext';
import { UserProgressProvider } from './src/contexts/UserProgressContext';

import AppNavigation from './src/navigation/AppNavigation';

// Ignore specific warnings
LogBox.ignoreLogs([
  'Setting a timer',
  'AsyncStorage has been extracted',
]);

const App = () => {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <SafeAreaProvider>
        <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />
        <AuthProvider>
          <ThemeProvider>
            <EmotionalStateContext>
              <UserProgressProvider>
                <AppNavigation />
              </UserProgressProvider>
            </EmotionalStateContext>
          </ThemeProvider>
        </AuthProvider>
      </SafeAreaProvider>
    </GestureHandlerRootView>
  );
};

export default App;
```

### Login Screen
```jsx
// Login.js
import React, { useState, useContext } from 'react';
import { View, StyleSheet, Image, TouchableOpacity, KeyboardAvoidingView, Platform, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { colors, spacing } from '../../styles';
import Typography from '../../components/Common/Typography';
import Button from '../../components/Common/Button';
import Input from '../../components/Common/Input';
import { AuthContext } from '../../contexts/AuthContext';

const Login = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  
  const { login } = useContext(AuthContext);
  
  const handleLogin = async () => {
    if (!email || !password) {
      setError('Please enter both email and password');
      return;
    }
    
    try {
      setLoading(true);
      setError('');
      await login(email, password);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };
  
  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.keyboardAvoid}
      >
        <ScrollView contentContainerStyle={styles.scrollContent}>
          <View style={styles.logoContainer}>
            <Image
              source={require('../../assets/images/logo.png')}
              style={styles.logo}
              resizeMode="contain"
            />
            <Typography variant="h3" align="center">
              Houmoon
            </Typography>
            <Typography variant="subtitle1" color="textSecondary" align="center">
              Eastern Wisdom-based Healing OS
            </Typography>
          </View>
          
          <View style={styles.formContainer}>
            {error ? (
              <Typography variant="body2" color="error" style={styles.error}>
                {error}
              </Typography>
            ) : null}
            
            <Input
              label="Email"
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
              autoCapitalize="none"
              placeholder="Enter your email"
            />
            
            <Input
              label="Password"
              value={password}
              onChangeText={setPassword}
              secureTextEntry
              placeholder="Enter your password"
              style={styles.passwordInput}
            />
            
            <TouchableOpacity
              onPress={() => navigation.navigate('ForgotPassword')}
              style={styles.forgotPassword}
            >
              <Typography variant="body2" color="primary">
                Forgot Password?
              </Typography>
            </TouchableOpacity>
            
            <Button
              title="Login"
              onPress={handleLogin}
              loading={loading}
              fullWidth
              style={styles.loginButton}
            />
            
            <View style={styles.registerContainer}>
              <Typography variant="body2" color="textSecondary">
                Don't have an account?
              </Typography>
              <TouchableOpacity onPress={() => navigation.navigate('Register')}>
                <Typography variant="body2" color="primary" style={styles.registerText}>
                  Register
                </Typography>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  keyboardAvoid: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    padding: spacing.lg,
    justifyContent: 'center',
  },
  logoContainer: {
    alignItems: 'center',
    marginBottom: spacing.xl,
  },
  logo: {
    width: 120,
    height: 120,
    marginBottom: spacing.md,
  },
  formContainer: {
    width: '100%',
  },
  error: {
    marginBottom: spacing.md,
    padding: spacing.sm,
    backgroundColor: colors.errorLight,
    borderRadius: 4,
  },
  passwordInput: {
    marginTop: spacing.md,
  },
  forgotPassword: {
    alignSelf: 'flex-end',
    marginTop: spacing.sm,
    marginBottom: spacing.lg,
  },
  loginButton: {
    marginBottom: spacing.lg,
  },
  registerContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  registerText: {
    marginLeft: spacing.xs,
    fontWeight: 'bold',
  },
});

export default Login;
```

### Heart Law Screen (Philosophy Feed)
```jsx
// PhilosophyFeed.js
import React, { useState, useEffect, useContext } from 'react';
import { View, FlatList, StyleSheet, ActivityIndicator } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { colors, spacing } from '../../styles';
import Typography from '../../components/Common/Typography';
import WisdomCard from '../../components/WisdomCard';
import EmotionalCheckIn from '../../components/EmotionalCheckIn';
import Button from '../../components/Common/Button';
import Icon from '../../components/Common/Icon';
import { EmotionalStateContext } from '../../contexts/EmotionalStateContext';
import { getWisdomContent } from '../../services/api/wisdomService';

const PhilosophyFeed = ({ navigation }) => {
  const [wisdomContent, setWisdomContent] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  
  const { 
    currentState, 
    needsCheckIn, 
    recordEmotionalState 
  } = useContext(EmotionalStateContext);
  
  useEffect(() => {
    if (currentState && !needsCheckIn) {
      fetchWisdomContent();
    }
  }, [currentState, needsCheckIn]);
  
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
              saved={item.saved}
            />
          )}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.contentContainer}
          ListHeaderComponent={renderHeader}
          refreshing={refreshing}
          onRefresh={handleRefresh}
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
    ...shadows[1],
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
});

export default PhilosophyFeed;
```

## Responsive Design Considerations

The component design follows responsive design principles to ensure compatibility across different device sizes:

1. **Flexible Layouts**:
   - Use of flex layouts for adaptable content positioning
   - Percentage-based widths for scalable components
   - Responsive grid systems for content organization

2. **Responsive Typography**:
   - Scalable font sizes based on device size
   - Line height adjustments for readability
   - Text truncation for limited space

3. **Touch-Friendly Interactions**:
   - Minimum touch target size of 44x44 points
   - Appropriate spacing between interactive elements
   - Clear visual feedback for touch interactions

4. **Device Adaptation**:
   - Platform-specific styling (iOS vs Android)
   - Orientation changes handling
   - Safe area insets respect

5. **Performance Optimization**:
   - Lazy loading of off-screen content
   - Optimized image loading and caching
   - Efficient list rendering with FlatList

## Accessibility Considerations

The component design incorporates accessibility features to ensure the app is usable by people with various abilities:

1. **Screen Reader Support**:
   - Semantic component structure
   - Appropriate accessibility labels
   - Logical navigation order

2. **Color Contrast**:
   - WCAG 2.1 AA compliant color contrast
   - Alternative visual indicators beyond color
   - Dark mode support

3. **Text Scaling**:
   - Support for dynamic text sizes
   - Layout adaptation for larger text

4. **Reduced Motion**:
   - Optional animation reduction
   - Essential motion only

5. **Voice Control**:
   - Clear element identification
   - Consistent interaction patterns

import React, { useEffect, useRef } from 'react';
import { View, StyleSheet, Animated, Easing } from 'react-native';
import { theme } from '../../styles/theme';

interface EmotionalStateVisualizerProps {
  emotionalState: 'joy' | 'calm' | 'focus' | 'reflection' | 'growth' | 'balance';
  size?: 'small' | 'medium' | 'large';
  animated?: boolean;
  style?: any;
}

const EmotionalStateVisualizer: React.FC<EmotionalStateVisualizerProps> = ({
  emotionalState,
  size = 'medium',
  animated = true,
  style,
}) => {
  // Map emotional states to colors and shapes
  const emotionMap = {
    joy: {
      color: theme.colors.joy,
      shape: 'circle',
      animation: 'pulse',
    },
    calm: {
      color: theme.colors.calm,
      shape: 'wave',
      animation: 'float',
    },
    focus: {
      color: theme.colors.focus,
      shape: 'triangle',
      animation: 'rotate',
    },
    reflection: {
      color: theme.colors.reflection,
      shape: 'spiral',
      animation: 'spin',
    },
    growth: {
      color: theme.colors.growth,
      shape: 'leaf',
      animation: 'grow',
    },
    balance: {
      color: theme.colors.balance,
      shape: 'yin-yang',
      animation: 'balance',
    },
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
          
        case 'rotate':
          Animated.loop(
            Animated.timing(animatedValue, {
              toValue: 1,
              duration: 6000,
              easing: Easing.linear,
              useNativeDriver: true,
            })
          ).start();
          break;
          
        case 'spin':
          Animated.loop(
            Animated.timing(animatedValue, {
              toValue: 1,
              duration: 8000,
              easing: Easing.linear,
              useNativeDriver: true,
            })
          ).start();
          break;
          
        case 'grow':
          Animated.loop(
            Animated.sequence([
              Animated.timing(animatedValue, {
                toValue: 1,
                duration: 2500,
                easing: Easing.out(Easing.ease),
                useNativeDriver: true,
              }),
              Animated.timing(animatedValue, {
                toValue: 0,
                duration: 2500,
                easing: Easing.in(Easing.ease),
                useNativeDriver: true,
              }),
            ])
          ).start();
          break;
          
        case 'balance':
          Animated.loop(
            Animated.sequence([
              Animated.timing(animatedValue, {
                toValue: 1,
                duration: 4000,
                easing: Easing.inOut(Easing.sine),
                useNativeDriver: true,
              }),
              Animated.timing(animatedValue, {
                toValue: 0,
                duration: 4000,
                easing: Easing.inOut(Easing.sine),
                useNativeDriver: true,
              }),
            ])
          ).start();
          break;
          
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
      
    case 'rotate':
      const rotation = animatedValue.interpolate({
        inputRange: [0, 1],
        outputRange: ['0deg', '360deg'],
      });
      
      animatedStyles = {
        transform: [{ rotate: rotation }],
      };
      break;
      
    case 'spin':
      const spin = animatedValue.interpolate({
        inputRange: [0, 1],
        outputRange: ['0deg', '360deg'],
      });
      
      const spinScale = animatedValue.interpolate({
        inputRange: [0, 0.5, 1],
        outputRange: [1, 1.1, 1],
      });
      
      animatedStyles = {
        transform: [
          { rotate: spin },
          { scale: spinScale },
        ],
      };
      break;
      
    case 'grow':
      const growScale = animatedValue.interpolate({
        inputRange: [0, 1],
        outputRange: [0.8, 1.2],
      });
      
      animatedStyles = {
        transform: [{ scale: growScale }],
      };
      break;
      
    case 'balance':
      const balanceRotate = animatedValue.interpolate({
        inputRange: [0, 1],
        outputRange: ['-15deg', '15deg'],
      });
      
      animatedStyles = {
        transform: [{ rotate: balanceRotate }],
      };
      break;
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
        
      case 'triangle':
        return (
          <Animated.View 
            style={[
              styles.triangle, 
              { borderBottomColor: emotion.color },
              animatedStyles,
            ]} 
          />
        );
        
      case 'spiral':
        // A simplified spiral representation
        return (
          <Animated.View style={animatedStyles}>
            <View style={styles.spiralContainer}>
              {[...Array(4)].map((_, i) => (
                <View 
                  key={i} 
                  style={[
                    styles.spiralSegment, 
                    { 
                      backgroundColor: emotion.color,
                      opacity: 1 - (i * 0.2),
                      transform: [
                        { scale: 1 - (i * 0.2) },
                        { rotate: `${i * 45}deg` },
                      ],
                    },
                  ]} 
                />
              ))}
            </View>
          </Animated.View>
        );
        
      case 'leaf':
        return (
          <Animated.View 
            style={[
              styles.leaf, 
              { backgroundColor: emotion.color },
              animatedStyles,
            ]} 
          />
        );
        
      case 'yin-yang':
        // A simplified yin-yang representation
        return (
          <Animated.View style={animatedStyles}>
            <View style={[styles.yinYang, { backgroundColor: emotion.color }]}>
              <View style={[styles.yinYangHalf, { backgroundColor: theme.colors.white }]} />
              <View style={[styles.yinYangDot, { backgroundColor: theme.colors.white }]} />
              <View style={[styles.yinYangDot2, { backgroundColor: emotion.color }]} />
            </View>
          </Animated.View>
        );
        
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
    borderRadius: theme.borderRadius.circle,
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
    borderRadius: theme.borderRadius.circle,
  },
  triangle: {
    width: 0,
    height: 0,
    backgroundColor: 'transparent',
    borderStyle: 'solid',
    borderLeftWidth: 40,
    borderRightWidth: 40,
    borderBottomWidth: 80,
    borderLeftColor: 'transparent',
    borderRightColor: 'transparent',
  },
  spiralContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    height: '100%',
  },
  spiralSegment: {
    position: 'absolute',
    width: '70%',
    height: '20%',
    borderRadius: theme.borderRadius.medium,
  },
  leaf: {
    width: '60%',
    height: '80%',
    borderTopLeftRadius: '100%',
    borderTopRightRadius: '100%',
    borderBottomRightRadius: '100%',
    transform: [{ rotate: '45deg' }],
  },
  yinYang: {
    width: '80%',
    height: '80%',
    borderRadius: theme.borderRadius.circle,
    position: 'relative',
    overflow: 'hidden',
  },
  yinYangHalf: {
    position: 'absolute',
    width: '50%',
    height: '100%',
    right: 0,
    borderTopRightRadius: '100%',
    borderBottomRightRadius: '100%',
  },
  yinYangDot: {
    position: 'absolute',
    width: '20%',
    height: '20%',
    borderRadius: theme.borderRadius.circle,
    top: '15%',
    right: '15%',
  },
  yinYangDot2: {
    position: 'absolute',
    width: '20%',
    height: '20%',
    borderRadius: theme.borderRadius.circle,
    bottom: '15%',
    left: '15%',
  },
});

export default EmotionalStateVisualizer;

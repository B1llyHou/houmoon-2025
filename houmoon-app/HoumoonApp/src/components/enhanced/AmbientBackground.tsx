import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Animated, Dimensions } from 'react-native';
import { theme } from '../../styles/theme';

interface AmbientBackgroundProps {
  theme?: 'wisdom' | 'practice' | 'energy' | 'future' | string;
  intensity?: number;
  animated?: boolean;
  children: React.ReactNode;
}

const AmbientBackground: React.FC<AmbientBackgroundProps> = ({
  theme: backgroundTheme = 'wisdom',
  intensity = 0.5,
  animated = true,
  children,
}) => {
  const { width, height } = Dimensions.get('window');
  const [animatedValues] = useState({
    position1: new Animated.ValueXY({ x: 0, y: 0 }),
    position2: new Animated.ValueXY({ x: width, y: height / 3 }),
    position3: new Animated.ValueXY({ x: width / 2, y: height }),
    scale1: new Animated.Value(1),
    scale2: new Animated.Value(0.8),
    scale3: new Animated.Value(1.2),
    opacity: new Animated.Value(intensity),
  });

  // Get colors based on theme
  const getThemeColors = () => {
    switch (backgroundTheme) {
      case 'wisdom':
        return {
          primary: theme.colors.primary,
          secondary: theme.colors.secondary,
          accent: theme.colors.accent1,
        };
      case 'practice':
        return {
          primary: theme.colors.calm,
          secondary: theme.colors.growth,
          accent: theme.colors.accent2,
        };
      case 'energy':
        return {
          primary: theme.colors.focus,
          secondary: theme.colors.joy,
          accent: theme.colors.reflection,
        };
      case 'future':
        return {
          primary: theme.colors.reflection,
          secondary: theme.colors.balance,
          accent: theme.colors.accent1,
        };
      default:
        // If theme is a color name from our theme
        if (theme.colors[backgroundTheme as keyof typeof theme.colors]) {
          const baseColor = theme.colors[backgroundTheme as keyof typeof theme.colors];
          return {
            primary: baseColor,
            secondary: theme.colors.background,
            accent: theme.colors.primary,
          };
        }
        // Default colors
        return {
          primary: theme.colors.primary,
          secondary: theme.colors.background,
          accent: theme.colors.accent1,
        };
    }
  };

  const colors = getThemeColors();

  useEffect(() => {
    if (animated) {
      // Create subtle animations for the background elements
      const createAnimation = () => {
        Animated.parallel([
          // Animate first blob
          Animated.sequence([
            Animated.timing(animatedValues.position1, {
              toValue: { x: width * 0.1, y: height * 0.1 },
              duration: 15000,
              useNativeDriver: true,
            }),
            Animated.timing(animatedValues.position1, {
              toValue: { x: 0, y: 0 },
              duration: 15000,
              useNativeDriver: true,
            }),
          ]),
          
          // Animate second blob
          Animated.sequence([
            Animated.timing(animatedValues.position2, {
              toValue: { x: width * 0.8, y: height * 0.4 },
              duration: 20000,
              useNativeDriver: true,
            }),
            Animated.timing(animatedValues.position2, {
              toValue: { x: width, y: height / 3 },
              duration: 20000,
              useNativeDriver: true,
            }),
          ]),
          
          // Animate third blob
          Animated.sequence([
            Animated.timing(animatedValues.position3, {
              toValue: { x: width * 0.4, y: height * 0.9 },
              duration: 25000,
              useNativeDriver: true,
            }),
            Animated.timing(animatedValues.position3, {
              toValue: { x: width / 2, y: height },
              duration: 25000,
              useNativeDriver: true,
            }),
          ]),
          
          // Animate scales
          Animated.loop(
            Animated.sequence([
              Animated.timing(animatedValues.scale1, {
                toValue: 1.1,
                duration: 10000,
                useNativeDriver: true,
              }),
              Animated.timing(animatedValues.scale1, {
                toValue: 1,
                duration: 10000,
                useNativeDriver: true,
              }),
            ])
          ),
          
          Animated.loop(
            Animated.sequence([
              Animated.timing(animatedValues.scale2, {
                toValue: 0.9,
                duration: 12000,
                useNativeDriver: true,
              }),
              Animated.timing(animatedValues.scale2, {
                toValue: 0.8,
                duration: 12000,
                useNativeDriver: true,
              }),
            ])
          ),
          
          Animated.loop(
            Animated.sequence([
              Animated.timing(animatedValues.scale3, {
                toValue: 1.3,
                duration: 15000,
                useNativeDriver: true,
              }),
              Animated.timing(animatedValues.scale3, {
                toValue: 1.2,
                duration: 15000,
                useNativeDriver: true,
              }),
            ])
          ),
        ]).start(() => {
          // Restart animation when complete
          createAnimation();
        });
      };
      
      createAnimation();
    }
    
    // Update opacity based on intensity
    Animated.timing(animatedValues.opacity, {
      toValue: intensity,
      duration: 500,
      useNativeDriver: true,
    }).start();
    
    return () => {
      // Clean up animations
      animatedValues.position1.stopAnimation();
      animatedValues.position2.stopAnimation();
      animatedValues.position3.stopAnimation();
      animatedValues.scale1.stopAnimation();
      animatedValues.scale2.stopAnimation();
      animatedValues.scale3.stopAnimation();
      animatedValues.opacity.stopAnimation();
    };
  }, [animated, intensity, backgroundTheme]);

  return (
    <View style={styles.container}>
      {/* Background color */}
      <View style={[styles.background, { backgroundColor: theme.colors.background }]} />
      
      {/* Animated background elements */}
      <Animated.View 
        style={[
          styles.blob,
          {
            backgroundColor: colors.primary,
            transform: [
              { translateX: animatedValues.position1.x },
              { translateY: animatedValues.position1.y },
              { scale: animatedValues.scale1 },
            ],
            opacity: Animated.multiply(animatedValues.opacity, 0.3),
          },
        ]} 
      />
      
      <Animated.View 
        style={[
          styles.blob,
          {
            backgroundColor: colors.secondary,
            transform: [
              { translateX: animatedValues.position2.x },
              { translateY: animatedValues.position2.y },
              { scale: animatedValues.scale2 },
            ],
            opacity: Animated.multiply(animatedValues.opacity, 0.2),
          },
        ]} 
      />
      
      <Animated.View 
        style={[
          styles.blob,
          {
            backgroundColor: colors.accent,
            transform: [
              { translateX: animatedValues.position3.x },
              { translateY: animatedValues.position3.y },
              { scale: animatedValues.scale3 },
            ],
            opacity: Animated.multiply(animatedValues.opacity, 0.15),
          },
        ]} 
      />
      
      {/* Content */}
      <View style={styles.content}>
        {children}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: 'relative',
  },
  background: {
    ...StyleSheet.absoluteFillObject,
  },
  blob: {
    position: 'absolute',
    width: 300,
    height: 300,
    borderRadius: 150,
    // Use a blur effect if available in your React Native setup
  },
  content: {
    flex: 1,
    zIndex: 1,
  },
});

export default AmbientBackground;

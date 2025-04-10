import React from 'react';
import { View, StyleSheet, ViewProps } from 'react-native';
import { theme } from '../../styles/theme';

interface CardProps extends ViewProps {
  variant?: 'elevated' | 'outlined' | 'filled';
  padding?: keyof typeof theme.spacing | number;
  emotionalTheme?: keyof typeof theme.colors;
  children: React.ReactNode;
}

const Card: React.FC<CardProps> = ({
  variant = 'elevated',
  padding = 'md',
  emotionalTheme,
  style,
  children,
  ...props
}) => {
  const paddingValue = typeof padding === 'string' 
    ? theme.spacing[padding] 
    : padding;

  return (
    <View
      style={[
        styles.card,
        styles[variant],
        { padding: paddingValue },
        emotionalTheme && { 
          borderLeftColor: theme.colors[emotionalTheme],
          borderLeftWidth: 4,
        },
        style,
      ]}
      {...props}
    >
      {children}
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    borderRadius: theme.borderRadius.medium,
    backgroundColor: theme.colors.cardBackground,
    overflow: 'hidden',
  },
  elevated: {
    ...theme.shadows[2],
  },
  outlined: {
    borderWidth: 1,
    borderColor: theme.colors.border,
  },
  filled: {
    backgroundColor: theme.colors.background,
  },
});

export default Card;

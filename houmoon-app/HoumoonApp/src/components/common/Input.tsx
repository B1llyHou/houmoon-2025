import React from 'react';
import { View, TextInput, StyleSheet, TextInputProps } from 'react-native';
import { theme } from '../../styles/theme';
import Typography from './Typography';

interface InputProps extends TextInputProps {
  label?: string;
  error?: string;
  helper?: string;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  variant?: 'outlined' | 'filled';
  fullWidth?: boolean;
}

const Input: React.FC<InputProps> = ({
  label,
  error,
  helper,
  leftIcon,
  rightIcon,
  variant = 'outlined',
  fullWidth = false,
  style,
  ...props
}) => {
  const inputContainerStyles = [
    styles.inputContainer,
    styles[variant],
    error ? styles.error : null,
    fullWidth && styles.fullWidth,
  ];

  return (
    <View style={[styles.container, fullWidth && styles.fullWidth]}>
      {label && (
        <Typography 
          variant="subtitle2" 
          style={styles.label}
          color={error ? 'error' : 'textSecondary'}
        >
          {label}
        </Typography>
      )}
      
      <View style={inputContainerStyles}>
        {leftIcon && <View style={styles.leftIcon}>{leftIcon}</View>}
        
        <TextInput
          style={[styles.input, style]}
          placeholderTextColor={theme.colors.textSecondary}
          {...props}
        />
        
        {rightIcon && <View style={styles.rightIcon}>{rightIcon}</View>}
      </View>
      
      {(error || helper) && (
        <Typography 
          variant="caption" 
          style={styles.helperText}
          color={error ? 'error' : 'textSecondary'}
        >
          {error || helper}
        </Typography>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: theme.spacing.md,
  },
  label: {
    marginBottom: theme.spacing.xs,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: theme.borderRadius.medium,
    borderWidth: 1,
    borderColor: theme.colors.border,
    backgroundColor: theme.colors.white,
  },
  outlined: {
    borderWidth: 1,
    borderColor: theme.colors.border,
    backgroundColor: 'transparent',
  },
  filled: {
    borderWidth: 0,
    backgroundColor: theme.colors.background,
  },
  input: {
    flex: 1,
    paddingVertical: theme.spacing.sm,
    paddingHorizontal: theme.spacing.md,
    color: theme.colors.text,
    ...theme.typography.body1,
  },
  error: {
    borderColor: theme.colors.error,
  },
  fullWidth: {
    width: '100%',
  },
  leftIcon: {
    paddingLeft: theme.spacing.md,
  },
  rightIcon: {
    paddingRight: theme.spacing.md,
  },
  helperText: {
    marginTop: theme.spacing.xs,
  },
});

export default Input;

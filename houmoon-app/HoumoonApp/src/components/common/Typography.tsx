import React from 'react';
import { Text, StyleSheet, TextProps } from 'react-native';
import { theme } from '../../styles/theme';

interface TypographyProps extends TextProps {
  variant?: keyof typeof theme.typography;
  color?: keyof typeof theme.colors | string;
  align?: 'auto' | 'left' | 'right' | 'center' | 'justify';
  children: React.ReactNode;
}

const Typography: React.FC<TypographyProps> = ({
  variant = 'body1',
  color = 'text',
  align = 'left',
  style,
  children,
  ...props
}) => {
  const textColor = color in theme.colors 
    ? theme.colors[color as keyof typeof theme.colors] 
    : color;

  return (
    <Text
      style={[
        theme.typography[variant],
        { color: textColor, textAlign: align },
        style,
      ]}
      {...props}
    >
      {children}
    </Text>
  );
};

export default Typography;

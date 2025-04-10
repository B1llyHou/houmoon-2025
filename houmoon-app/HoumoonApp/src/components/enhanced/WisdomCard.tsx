import React from 'react';
import { View, StyleSheet, TouchableOpacity, Animated } from 'react-native';
import { theme } from '../../styles/theme';
import Typography from '../common/Typography';
import Icon, { IconName } from '../common/Icon';

interface WisdomCardProps {
  quote: string;
  source: string;
  chapter?: string;
  translation?: string;
  onPress?: () => void;
  onSave?: () => void;
  onShare?: () => void;
  saved?: boolean;
  theme?: 'water' | 'fire' | 'earth' | 'metal' | 'wood' | 'wisdom';
}

const WisdomCard: React.FC<WisdomCardProps> = ({
  quote,
  source,
  chapter,
  translation,
  onPress,
  onSave,
  onShare,
  saved = false,
  theme: cardTheme = 'wisdom',
}) => {
  // Get theme color based on element
  const getThemeColor = () => {
    switch (cardTheme) {
      case 'water':
        return theme.colors.calm;
      case 'fire':
        return theme.colors.joy;
      case 'earth':
        return theme.colors.balance;
      case 'metal':
        return theme.colors.focus;
      case 'wood':
        return theme.colors.growth;
      default:
        return theme.colors.primary;
    }
  };

  const themeColor = getThemeColor();
  
  // Animation for press feedback
  const animatedScale = new Animated.Value(1);
  
  const handlePressIn = () => {
    Animated.spring(animatedScale, {
      toValue: 0.98,
      useNativeDriver: true,
    }).start();
  };
  
  const handlePressOut = () => {
    Animated.spring(animatedScale, {
      toValue: 1,
      friction: 5,
      tension: 40,
      useNativeDriver: true,
    }).start();
  };

  return (
    <Animated.View 
      style={[
        styles.container,
        { transform: [{ scale: animatedScale }] }
      ]}
    >
      <TouchableOpacity
        style={[
          styles.card,
          { borderLeftColor: themeColor }
        ]}
        onPress={onPress}
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
        activeOpacity={0.9}
      >
        <View style={styles.content}>
          <Typography variant="h5" style={styles.quote}>
            "{quote}"
          </Typography>
          
          <View style={styles.sourceContainer}>
            <Typography variant="subtitle2" color="textSecondary">
              {source}
            </Typography>
            {chapter && (
              <Typography variant="caption" color="textSecondary">
                {chapter}
              </Typography>
            )}
          </View>
          
          {translation && (
            <Typography variant="body2" style={styles.translation}>
              {translation}
            </Typography>
          )}
        </View>
        
        <View style={styles.actions}>
          <TouchableOpacity 
            style={styles.actionButton} 
            onPress={onSave}
          >
            <Icon 
              name={saved ? 'favorite' : 'favorite_border'} 
              size={20} 
              color={saved ? theme.colors.accent2 : theme.colors.textSecondary} 
            />
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={styles.actionButton} 
            onPress={onShare}
          >
            <Icon 
              name="share" 
              size={20} 
              color={theme.colors.textSecondary} 
            />
          </TouchableOpacity>
        </View>
      </TouchableOpacity>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: theme.spacing.md,
    borderRadius: theme.borderRadius.medium,
    ...theme.shadows[2],
  },
  card: {
    backgroundColor: theme.colors.cardBackground,
    borderRadius: theme.borderRadius.medium,
    borderLeftWidth: 4,
    overflow: 'hidden',
  },
  content: {
    padding: theme.spacing.lg,
  },
  quote: {
    marginBottom: theme.spacing.md,
    fontStyle: 'italic',
  },
  sourceContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: theme.spacing.sm,
  },
  translation: {
    marginTop: theme.spacing.sm,
  },
  actions: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    padding: theme.spacing.sm,
    borderTopWidth: 1,
    borderTopColor: theme.colors.border,
  },
  actionButton: {
    padding: theme.spacing.sm,
    marginLeft: theme.spacing.sm,
  },
});

export default WisdomCard;

import React, { useState } from 'react';
import { View, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';

import Typography from '../../components/common/Typography';
import Button from '../../components/common/Button';
import AmbientBackground from '../../components/enhanced/AmbientBackground';
import Icon from '../../components/common/Icon';
import { theme } from '../../styles/theme';

type RootStackParamList = {
  PhilosophyFeed: undefined;
  WisdomDetail: { wisdom: any };
  ProgressMap: undefined;
};

type WisdomDetailScreenRouteProp = RouteProp<RootStackParamList, 'WisdomDetail'>;
type WisdomDetailScreenNavigationProp = StackNavigationProp<RootStackParamList, 'WisdomDetail'>;

const WisdomDetailScreen = () => {
  const navigation = useNavigation<WisdomDetailScreenNavigationProp>();
  const route = useRoute<WisdomDetailScreenRouteProp>();
  const { wisdom } = route.params;
  
  const [immersiveMode, setImmersiveMode] = useState(false);
  const [saved, setSaved] = useState(wisdom.saved || false);
  
  const handleGoBack = () => {
    navigation.goBack();
  };
  
  const handleToggleImmersiveMode = () => {
    setImmersiveMode(!immersiveMode);
  };
  
  const handleSave = () => {
    setSaved(!saved);
  };
  
  const handleShare = () => {
    // Share functionality would be implemented here
    console.log('Share wisdom:', wisdom.id);
  };
  
  const handlePracticeWisdom = () => {
    // Navigate to practice screen with this wisdom
    console.log('Practice wisdom:', wisdom.id);
  };
  
  if (immersiveMode) {
    return (
      <AmbientBackground theme={wisdom.element || 'wisdom'} intensity={0.7} animated={true}>
        <View style={styles.immersiveContainer}>
          <TouchableOpacity 
            style={styles.closeButton}
            onPress={handleToggleImmersiveMode}
          >
            <Icon name="close" size={24} color={theme.colors.text} />
          </TouchableOpacity>
          
          <ScrollView 
            contentContainerStyle={styles.immersiveContent}
            showsVerticalScrollIndicator={false}
          >
            <Typography variant="h4" style={styles.immersiveQuote}>
              "{wisdom.quote}"
            </Typography>
            
            <Typography variant="subtitle1" style={styles.immersiveSource}>
              {wisdom.source} • {wisdom.chapter}
            </Typography>
            
            <Typography variant="body1" style={styles.immersiveTranslation}>
              {wisdom.translation}
            </Typography>
            
            {wisdom.explanation && (
              <Typography variant="body1" style={styles.immersiveExplanation}>
                {wisdom.explanation}
              </Typography>
            )}
          </ScrollView>
        </View>
      </AmbientBackground>
    );
  }
  
  return (
    <AmbientBackground theme={wisdom.element || 'wisdom'} intensity={0.3} animated={true}>
      <View style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity 
            style={styles.backButton}
            onPress={handleGoBack}
          >
            <Icon name="arrow_back" size={24} color={theme.colors.text} />
          </TouchableOpacity>
          
          <Typography variant="h5" style={styles.title}>
            {wisdom.source}
          </Typography>
          
          <TouchableOpacity 
            style={styles.immersiveButton}
            onPress={handleToggleImmersiveMode}
          >
            <Icon name="fullscreen" size={24} color={theme.colors.text} />
          </TouchableOpacity>
        </View>
        
        <ScrollView 
          style={styles.scrollView}
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.content}>
            <Typography variant="overline" color="textSecondary" style={styles.chapter}>
              {wisdom.chapter}
            </Typography>
            
            <Typography variant="h4" style={styles.quote}>
              "{wisdom.quote}"
            </Typography>
            
            <Typography variant="subtitle1" style={styles.sectionTitle}>
              Translation
            </Typography>
            
            <Typography variant="body1" style={styles.translation}>
              {wisdom.translation}
            </Typography>
            
            {wisdom.explanation && (
              <>
                <Typography variant="subtitle1" style={styles.sectionTitle}>
                  Explanation
                </Typography>
                
                <Typography variant="body1" style={styles.explanation}>
                  {wisdom.explanation}
                </Typography>
              </>
            )}
            
            {wisdom.application && (
              <>
                <Typography variant="subtitle1" style={styles.sectionTitle}>
                  Application
                </Typography>
                
                <Typography variant="body1" style={styles.application}>
                  {wisdom.application}
                </Typography>
              </>
            )}
            
            <View style={styles.actionsContainer}>
              <TouchableOpacity 
                style={styles.actionButton}
                onPress={handleSave}
              >
                <Icon 
                  name={saved ? 'favorite' : 'favorite_border'} 
                  size={24} 
                  color={saved ? theme.colors.accent2 : theme.colors.textSecondary} 
                />
                <Typography 
                  variant="caption" 
                  color={saved ? 'accent2' : 'textSecondary'}
                  style={styles.actionText}
                >
                  {saved ? 'Saved' : 'Save'}
                </Typography>
              </TouchableOpacity>
              
              <TouchableOpacity 
                style={styles.actionButton}
                onPress={handleShare}
              >
                <Icon name="share" size={24} color={theme.colors.textSecondary} />
                <Typography 
                  variant="caption" 
                  color="textSecondary"
                  style={styles.actionText}
                >
                  Share
                </Typography>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
        
        <View style={styles.footer}>
          <Button
            title="Practice This Wisdom"
            onPress={handlePracticeWisdom}
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
    padding: theme.spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.border,
    backgroundColor: theme.colors.cardBackground,
  },
  backButton: {
    padding: theme.spacing.sm,
  },
  title: {
    flex: 1,
    textAlign: 'center',
  },
  immersiveButton: {
    padding: theme.spacing.sm,
  },
  scrollView: {
    flex: 1,
  },
  content: {
    padding: theme.spacing.lg,
    paddingBottom: theme.spacing.xxl,
  },
  chapter: {
    marginBottom: theme.spacing.sm,
  },
  quote: {
    marginBottom: theme.spacing.lg,
    fontStyle: 'italic',
  },
  sectionTitle: {
    marginTop: theme.spacing.lg,
    marginBottom: theme.spacing.sm,
  },
  translation: {
    marginBottom: theme.spacing.md,
  },
  explanation: {
    marginBottom: theme.spacing.md,
  },
  application: {
    marginBottom: theme.spacing.lg,
  },
  actionsContainer: {
    flexDirection: 'row',
    marginTop: theme.spacing.lg,
    paddingTop: theme.spacing.md,
    borderTopWidth: 1,
    borderTopColor: theme.colors.border,
  },
  actionButton: {
    alignItems: 'center',
    marginRight: theme.spacing.lg,
  },
  actionText: {
    marginTop: theme.spacing.xs,
  },
  footer: {
    padding: theme.spacing.md,
    backgroundColor: theme.colors.cardBackground,
    borderTopWidth: 1,
    borderTopColor: theme.colors.border,
    ...theme.shadows[3],
  },
  
  // Immersive mode styles
  immersiveContainer: {
    flex: 1,
    padding: theme.spacing.md,
  },
  closeButton: {
    alignSelf: 'flex-end',
    padding: theme.spacing.md,
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    borderRadius: theme.borderRadius.circle,
    margin: theme.spacing.md,
  },
  immersiveContent: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: theme.spacing.xl,
  },
  immersiveQuote: {
    marginBottom: theme.spacing.lg,
    fontStyle: 'italic',
    textAlign: 'center',
  },
  immersiveSource: {
    marginBottom: theme.spacing.lg,
    textAlign: 'center',
  },
  immersiveTranslation: {
    marginBottom: theme.spacing.xl,
    textAlign: 'center',
  },
  immersiveExplanation: {
    textAlign: 'center',
  },
});

export default WisdomDetailScreen;

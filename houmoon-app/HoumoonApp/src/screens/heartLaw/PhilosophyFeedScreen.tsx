import React, { useState } from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';

import Typography from '../../components/common/Typography';
import Button from '../../components/common/Button';
import AmbientBackground from '../../components/enhanced/AmbientBackground';
import WisdomCard from '../../components/enhanced/WisdomCard';
import Icon from '../../components/common/Icon';
import { theme } from '../../styles/theme';

// Mock data for wisdom content
const mockWisdomContent = [
  {
    id: '1',
    quote: 'The highest good is like water. Water gives life to the ten thousand things and does not strive.',
    source: 'Dao De Jing',
    chapter: 'Chapter 8',
    translation: 'The best way to live is to be like water. Water benefits all things and goes against none of them.',
    element: 'water',
    saved: false,
  },
  {
    id: '2',
    quote: 'When I let go of what I am, I become what I might be.',
    source: 'Dao De Jing',
    chapter: 'Chapter 14',
    translation: 'By releasing attachment to our current identity, we open ourselves to greater possibilities.',
    element: 'air',
    saved: true,
  },
  {
    id: '3',
    quote: 'The extension of knowledge lies in the investigation of things.',
    source: 'Yangming Mind Philosophy',
    chapter: 'Inquiry on the Great Learning',
    translation: 'True understanding comes from careful observation of reality.',
    element: 'metal',
    saved: false,
  },
  {
    id: '4',
    quote: 'After a time of decay comes the turning point. The powerful light that has been banished returns.',
    source: 'I Ching',
    chapter: 'Hexagram 24: Return',
    translation: 'After difficulty comes renewal. This is the natural cycle of all things.',
    element: 'earth',
    saved: false,
  },
];

type RootStackParamList = {
  PhilosophyFeed: undefined;
  WisdomDetail: { wisdom: any };
  ProgressMap: undefined;
};

type PhilosophyFeedScreenNavigationProp = StackNavigationProp<RootStackParamList, 'PhilosophyFeed'>;

const PhilosophyFeedScreen = () => {
  const navigation = useNavigation<PhilosophyFeedScreenNavigationProp>();
  const [wisdomContent, setWisdomContent] = useState(mockWisdomContent);
  const [currentEmotionalState] = useState('calm');

  const handleWisdomCardPress = (wisdom: any) => {
    navigation.navigate('WisdomDetail', { wisdom });
  };

  const handleSaveWisdom = (id: string) => {
    setWisdomContent(prevContent => 
      prevContent.map(item => 
        item.id === id ? { ...item, saved: !item.saved } : item
      )
    );
  };

  const handleShareWisdom = (id: string) => {
    // Share functionality would be implemented here
    console.log('Share wisdom:', id);
  };

  const handleNavigateToProgressMap = () => {
    navigation.navigate('ProgressMap');
  };

  return (
    <AmbientBackground theme="wisdom" intensity={0.3} animated={true}>
      <View style={styles.container}>
        <View style={styles.header}>
          <Typography variant="h4">Heart Law</Typography>
          <Button 
            variant="text" 
            title="Progress" 
            onPress={handleNavigateToProgressMap}
            rightIcon={<Icon name="arrow_forward" size={16} color={theme.colors.primary} />}
          />
        </View>
        
        <View style={styles.emotionalStateContainer}>
          <Typography variant="subtitle2" color="textSecondary">
            Current emotional state:
          </Typography>
          <Typography 
            variant="subtitle1" 
            color={currentEmotionalState as keyof typeof theme.colors}
            style={styles.emotionalState}
          >
            {currentEmotionalState.charAt(0).toUpperCase() + currentEmotionalState.slice(1)}
          </Typography>
        </View>
        
        <ScrollView 
          style={styles.scrollView}
          showsVerticalScrollIndicator={false}
        >
          {wisdomContent.map(wisdom => (
            <WisdomCard
              key={wisdom.id}
              quote={wisdom.quote}
              source={wisdom.source}
              chapter={wisdom.chapter}
              translation={wisdom.translation}
              onPress={() => handleWisdomCardPress(wisdom)}
              onSave={() => handleSaveWisdom(wisdom.id)}
              onShare={() => handleShareWisdom(wisdom.id)}
              saved={wisdom.saved}
              theme={wisdom.element as any}
            />
          ))}
          
          <View style={styles.endOfFeed}>
            <Typography variant="body2" color="textSecondary" align="center">
              You've reached the end of today's wisdom feed.
            </Typography>
            <Typography variant="body2" color="textSecondary" align="center">
              Check back tomorrow for new insights.
            </Typography>
          </View>
        </ScrollView>
      </View>
    </AmbientBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: theme.spacing.md,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: theme.spacing.md,
  },
  emotionalStateContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: theme.spacing.lg,
  },
  emotionalState: {
    marginLeft: theme.spacing.sm,
  },
  scrollView: {
    flex: 1,
  },
  endOfFeed: {
    marginVertical: theme.spacing.xl,
    paddingBottom: theme.spacing.xl,
  },
});

export default PhilosophyFeedScreen;

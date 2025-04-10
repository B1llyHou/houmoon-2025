import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from '../components/common/Icon';
import { theme } from '../styles/theme';

// Import screens (to be created)
// Auth screens
import LoginScreen from '../screens/auth/LoginScreen';
import RegisterScreen from '../screens/auth/RegisterScreen';
import ForgotPasswordScreen from '../screens/auth/ForgotPasswordScreen';

// Onboarding screens
import OnboardingScreen from '../screens/onboarding/OnboardingScreen';
import GoalSelectionScreen from '../screens/onboarding/GoalSelectionScreen';
import PhilosophyIntroScreen from '../screens/onboarding/PhilosophyIntroScreen';
import EmotionalCheckInScreen from '../screens/onboarding/EmotionalCheckInScreen';

// Heart Law screens
import PhilosophyFeedScreen from '../screens/heartLaw/PhilosophyFeedScreen';
import WisdomDetailScreen from '../screens/heartLaw/WisdomDetailScreen';
import ProgressMapScreen from '../screens/heartLaw/ProgressMapScreen';

// Practice screens (placeholders for future implementation)
import DailyRitualsScreen from '../screens/practice/DailyRitualsScreen';

// Energy screens (placeholders for future implementation)
import EmotionalRadarScreen from '../screens/energy/EmotionalRadarScreen';

// Future Self screens (placeholders for future implementation)
import FutureSelfScreen from '../screens/futureSelf/FutureSelfScreen';

// Create navigators
const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

// Auth Navigator
const AuthNavigator = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        cardStyle: { backgroundColor: theme.colors.background }
      }}
    >
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="Register" component={RegisterScreen} />
      <Stack.Screen name="ForgotPassword" component={ForgotPasswordScreen} />
    </Stack.Navigator>
  );
};

// Onboarding Navigator
const OnboardingNavigator = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        cardStyle: { backgroundColor: theme.colors.background }
      }}
    >
      <Stack.Screen name="Onboarding" component={OnboardingScreen} />
      <Stack.Screen name="GoalSelection" component={GoalSelectionScreen} />
      <Stack.Screen name="PhilosophyIntro" component={PhilosophyIntroScreen} />
      <Stack.Screen name="EmotionalCheckIn" component={EmotionalCheckInScreen} />
    </Stack.Navigator>
  );
};

// Heart Law Navigator
const HeartLawNavigator = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        cardStyle: { backgroundColor: theme.colors.background }
      }}
    >
      <Stack.Screen name="PhilosophyFeed" component={PhilosophyFeedScreen} />
      <Stack.Screen name="WisdomDetail" component={WisdomDetailScreen} />
      <Stack.Screen name="ProgressMap" component={ProgressMapScreen} />
    </Stack.Navigator>
  );
};

// Practice Navigator
const PracticeNavigator = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        cardStyle: { backgroundColor: theme.colors.background }
      }}
    >
      <Stack.Screen name="DailyRituals" component={DailyRitualsScreen} />
    </Stack.Navigator>
  );
};

// Energy Navigator
const EnergyNavigator = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        cardStyle: { backgroundColor: theme.colors.background }
      }}
    >
      <Stack.Screen name="EmotionalRadar" component={EmotionalRadarScreen} />
    </Stack.Navigator>
  );
};

// Future Self Navigator
const FutureSelfNavigator = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        cardStyle: { backgroundColor: theme.colors.background }
      }}
    >
      <Stack.Screen name="FutureSelf" component={FutureSelfScreen} />
    </Stack.Navigator>
  );
};

// Main Tab Navigator
const MainNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarActiveTintColor: theme.colors.primary,
        tabBarInactiveTintColor: theme.colors.textSecondary,
        tabBarStyle: {
          backgroundColor: theme.colors.cardBackground,
          borderTopColor: theme.colors.border,
          paddingTop: theme.spacing.xs,
          height: 60,
          ...theme.shadows[2],
        },
        tabBarLabelStyle: {
          ...theme.typography.caption,
          marginBottom: theme.spacing.xs,
        },
        tabBarIcon: ({ color, size }) => {
          let iconName: 'heart' | 'star' | 'settings' | 'person' = 'heart';
          
          if (route.name === 'HeartLaw') {
            iconName = 'heart';
          } else if (route.name === 'Practice') {
            iconName = 'star';
          } else if (route.name === 'Energy') {
            iconName = 'settings';
          } else if (route.name === 'FutureSelf') {
            iconName = 'person';
          }
          
          return <Icon name={iconName} size={size} color={color} />;
        },
      })}
    >
      <Tab.Screen 
        name="HeartLaw" 
        component={HeartLawNavigator} 
        options={{ tabBarLabel: 'Heart Law' }}
      />
      <Tab.Screen 
        name="Practice" 
        component={PracticeNavigator} 
        options={{ tabBarLabel: 'Practice' }}
      />
      <Tab.Screen 
        name="Energy" 
        component={EnergyNavigator} 
        options={{ tabBarLabel: 'Energy' }}
      />
      <Tab.Screen 
        name="FutureSelf" 
        component={FutureSelfNavigator} 
        options={{ tabBarLabel: 'Future Self' }}
      />
    </Tab.Navigator>
  );
};

// Root Navigator
const AppNavigator = () => {
  // This would normally use the auth state from context
  // For now, we'll just show the main app
  const isAuthenticated = true;
  const hasCompletedOnboarding = true;

  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        cardStyle: { backgroundColor: theme.colors.background }
      }}
    >
      {!isAuthenticated ? (
        <Stack.Screen name="Auth" component={AuthNavigator} />
      ) : !hasCompletedOnboarding ? (
        <Stack.Screen name="OnboardingFlow" component={OnboardingNavigator} />
      ) : (
        <Stack.Screen name="Main" component={MainNavigator} />
      )}
    </Stack.Navigator>
  );
};

export default AppNavigator;

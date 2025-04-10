# Houmoon App - Eastern Wisdom-based Healing Operating System

## Project Overview

Houmoon is a next-generation mobile application that combines ancient Chinese philosophies with modern technology to create a comprehensive personal transformation platform. Unlike conventional meditation apps that focus primarily on anxiety reduction, Houmoon aims to help users deeply transform their inner world through Eastern wisdom traditions.

The app integrates three major philosophical traditions:
- **Dao De Jing** (The Way and Its Power)
- **I Ching** (The Book of Changes) and its 64 hexagrams
- **Yangming Mind Philosophy** (The unity of knowledge and action)

## Core Modules

Houmoon consists of four interconnected core modules:

### 1. Heart Law System (Philosophy Feed + Wisdom Insights)
- Daily quotes and voice explanations from Eastern philosophies
- Content adaptive to user's emotional state
- Wisdom Progress Map showing areas of understanding explored

### 2. Practice System (Daily Rituals & Inner Training)
- Guided breathing sessions based on Taoist breathing cycles
- Daily journaling with knowledge-action reflection prompts
- Meditation and contemplation sessions
- Inner Alignment Score tracking

### 3. Energy System (Emotional Diagnostics + Yin-Yang Balancer)
- Visual radar chart of emotional trends
- Five Elements balance chart
- AI-generated lifestyle advice based on Chinese meridian rhythms
- I Ching-based emotional diagnostics

### 4. Future Self Dialogue System
- Simulated dialogue with "Future Me"
- Philosophical AI avatars (Confucius, Laozi, Wang Yangming)
- Life Trajectory Map with turning points and spiritual lessons

## Technical Architecture

Houmoon is built using:
- **Frontend**: React Native for cross-platform mobile development
- **Backend**: Node.js with Firebase for real-time data
- **AI Integration**: GPT-4/Claude for wisdom explanations and dialogue simulation

## Project Deliverables

This repository contains the following deliverables:

1. **[Architecture Document](architecture.md)**: Comprehensive system architecture including technology stack, module design, data flow, and deployment strategy.

2. **[Data Schema](data_schema.md)**: Detailed database schema design for Firebase Firestore, including collections, documents, relationships, and security rules.

3. **[Component Design](component_design.md)**: UI component hierarchy, reusable components with code examples, design system, and screen implementations.

4. **[Implementation Guide](implementation_guide.md)**: Step-by-step instructions for implementing the app, including project setup, module implementation, testing strategy, and deployment.

5. **[Project Structure](houmoon/)**: Folder structure for the application, organized according to the modular architecture.

## Implementation Approach

The implementation follows a phased approach:

### Phase 1: Heart Law System MVP
- User authentication
- Emotional check-in system
- Philosophy Feed with wisdom content
- Basic user profile and progress tracking

Future phases will incrementally add the Practice System, Energy System, and Future Self Dialogue System.

## Getting Started

To set up the development environment:

1. Clone this repository
2. Install dependencies:
   ```
   cd houmoon/frontend
   npm install
   ```
3. Set up Firebase:
   - Create a Firebase project
   - Add web app to Firebase project
   - Enable Authentication and Firestore
   - Add Firebase configuration to the project

4. Run the app:
   ```
   npx react-native run-ios
   # or
   npx react-native run-android
   ```

## Next Steps

1. Implement the Heart Law System MVP following the implementation guide
2. Seed the Firebase database with initial wisdom content
3. Test the app with real users to gather feedback
4. Develop Phase 2 (Practice System) based on user feedback

## Contact

For any questions or support regarding this project, please contact the project owner.

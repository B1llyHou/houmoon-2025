# Houmoon App Data Schema

## Overview
This document outlines the data schema for the Houmoon app, defining the structure of data stored in Firebase Firestore. The schema is designed to support the four core modules of the application: Heart Law System, Practice System, Energy System, and Future Self Dialogue System.

## Collections and Documents

### Users Collection
```
users/{userId}
```

**Fields:**
```json
{
  "uid": "string",
  "email": "string",
  "displayName": "string",
  "photoURL": "string",
  "createdAt": "timestamp",
  "lastLoginAt": "timestamp",
  "preferences": {
    "notifications": "boolean",
    "theme": "string",
    "language": "string"
  },
  "profile": {
    "birthdate": "timestamp",
    "gender": "string",
    "location": "string",
    "timezone": "string"
  },
  "stats": {
    "meditationMinutes": "number",
    "journalEntries": "number",
    "wisdomExplored": "number",
    "dialoguesSessions": "number",
    "streak": "number",
    "lastActiveDate": "timestamp"
  },
  "innerAlignmentScore": "number",
  "wisdomProgress": {
    "daoDeJing": {
      "chaptersExplored": ["string"],
      "comprehensionLevel": "number"
    },
    "iChing": {
      "hexagramsExplored": ["string"],
      "comprehensionLevel": "number"
    },
    "yangming": {
      "conceptsExplored": ["string"],
      "comprehensionLevel": "number"
    }
  }
}
```

### Emotional States Collection
```
users/{userId}/emotionalStates/{stateId}
```

**Fields:**
```json
{
  "timestamp": "timestamp",
  "primaryEmotion": "string",
  "intensity": "number",
  "secondaryEmotions": ["string"],
  "notes": "string",
  "fiveElements": {
    "wood": "number",
    "fire": "number",
    "earth": "number",
    "metal": "number",
    "water": "number"
  },
  "yinYangBalance": "number",
  "associatedHexagram": "string",
  "triggers": ["string"],
  "relatedJournalEntry": "string"
}
```

### Meditation Sessions Collection
```
users/{userId}/meditationSessions/{sessionId}
```

**Fields:**
```json
{
  "startTime": "timestamp",
  "endTime": "timestamp",
  "duration": "number",
  "type": "string",
  "guidanceType": "string",
  "emotionalStateBefore": "reference",
  "emotionalStateAfter": "reference",
  "notes": "string",
  "completed": "boolean"
}
```

### Journal Entries Collection
```
users/{userId}/journalEntries/{entryId}
```

**Fields:**
```json
{
  "timestamp": "timestamp",
  "title": "string",
  "content": "string",
  "emotionalState": "reference",
  "tags": ["string"],
  "reflectionPrompts": ["string"],
  "reflectionResponses": ["string"],
  "associatedWisdom": "reference",
  "iChingHexagram": "string"
}
```

### Wisdom Content Collection
```
wisdomContent/{contentId}
```

**Fields:**
```json
{
  "type": "string",
  "source": "string",
  "chapter": "string",
  "originalText": "string",
  "translation": "string",
  "explanation": "string",
  "audioUrl": "string",
  "relatedConcepts": ["string"],
  "emotionalTags": ["string"],
  "elementAssociations": {
    "wood": "number",
    "fire": "number",
    "earth": "number",
    "metal": "number",
    "water": "number"
  },
  "difficulty": "number"
}
```

### I Ching Hexagrams Collection
```
iChingHexagrams/{hexagramId}
```

**Fields:**
```json
{
  "number": "number",
  "name": {
    "chinese": "string",
    "pinyin": "string",
    "english": "string"
  },
  "structure": {
    "upperTrigram": "string",
    "lowerTrigram": "string",
    "lines": ["number"]
  },
  "image": "string",
  "judgment": {
    "original": "string",
    "translation": "string"
  },
  "image": {
    "original": "string",
    "translation": "string"
  },
  "lines": [
    {
      "position": "number",
      "original": "string",
      "translation": "string"
    }
  ],
  "emotionalAssociations": ["string"],
  "elementAssociations": {
    "wood": "number",
    "fire": "number",
    "earth": "number",
    "metal": "number",
    "water": "number"
  }
}
```

### Philosophical Avatars Collection
```
philosophicalAvatars/{avatarId}
```

**Fields:**
```json
{
  "name": "string",
  "type": "string",
  "description": "string",
  "imageUrl": "string",
  "personality": {
    "traits": ["string"],
    "communicationStyle": "string",
    "philosophicalApproach": "string"
  },
  "keyTeachings": ["string"],
  "promptTemplate": "string",
  "sampleResponses": ["string"]
}
```

### Future Self Dialogues Collection
```
users/{userId}/futureSelfDialogues/{dialogueId}
```

**Fields:**
```json
{
  "timestamp": "timestamp",
  "avatar": "reference",
  "yearsInFuture": "number",
  "topic": "string",
  "messages": [
    {
      "sender": "string",
      "content": "string",
      "timestamp": "timestamp"
    }
  ],
  "insights": ["string"],
  "emotionalState": "reference",
  "lifeTrajectoryPoints": [
    {
      "year": "number",
      "event": "string",
      "significance": "string"
    }
  ]
}
```

### Practice Rituals Collection
```
practiceRituals/{ritualId}
```

**Fields:**
```json
{
  "name": "string",
  "type": "string",
  "description": "string",
  "instructions": ["string"],
  "duration": "number",
  "difficulty": "number",
  "benefits": ["string"],
  "elementAssociations": {
    "wood": "number",
    "fire": "number",
    "earth": "number",
    "metal": "number",
    "water": "number"
  },
  "emotionalTargets": ["string"],
  "audioGuideUrl": "string",
  "imageUrl": "string"
}
```

### User Ritual Progress Collection
```
users/{userId}/ritualProgress/{ritualId}
```

**Fields:**
```json
{
  "ritual": "reference",
  "completedSessions": "number",
  "lastCompletedAt": "timestamp",
  "streak": "number",
  "notes": "string",
  "effectiveness": "number",
  "customizations": {
    "duration": "number",
    "focusAreas": ["string"]
  }
}
```

### Lifestyle Recommendations Collection
```
users/{userId}/lifestyleRecommendations/{recommendationId}
```

**Fields:**
```json
{
  "timestamp": "timestamp",
  "basedOn": {
    "emotionalState": "reference",
    "elementImbalance": "string"
  },
  "category": "string",
  "title": "string",
  "description": "string",
  "actions": ["string"],
  "duration": "string",
  "priority": "number",
  "completed": "boolean",
  "effectiveness": "number"
}
```

## Relationships and References

1. **User to Emotional States**: One-to-many relationship
   - A user has multiple emotional state records over time

2. **User to Meditation Sessions**: One-to-many relationship
   - A user has multiple meditation session records

3. **User to Journal Entries**: One-to-many relationship
   - A user has multiple journal entries

4. **Emotional States to Journal Entries**: One-to-many relationship
   - An emotional state can be associated with multiple journal entries

5. **Wisdom Content to User Progress**: Many-to-many relationship
   - Users track progress across multiple wisdom content items
   - Wisdom content items are explored by multiple users

6. **I Ching Hexagrams to Emotional States**: Many-to-many relationship
   - Emotional states can be associated with specific hexagrams
   - Hexagrams can be relevant to multiple emotional states

7. **Philosophical Avatars to Future Self Dialogues**: One-to-many relationship
   - A philosophical avatar can be used in multiple dialogue sessions

8. **Practice Rituals to User Progress**: One-to-many relationship
   - A practice ritual has progress records for multiple users

## Indexes

### Single-Field Indexes
- users.lastLoginAt
- emotionalStates.timestamp
- journalEntries.timestamp
- meditationSessions.startTime
- wisdomContent.type
- wisdomContent.source
- iChingHexagrams.number
- futureSelfDialogues.timestamp
- practiceRituals.type

### Composite Indexes
- users.wisdomProgress.daoDeJing.comprehensionLevel, users.wisdomProgress.iChing.comprehensionLevel
- emotionalStates.primaryEmotion, emotionalStates.timestamp
- journalEntries.tags, journalEntries.timestamp
- meditationSessions.type, meditationSessions.duration
- wisdomContent.emotionalTags, wisdomContent.difficulty
- practiceRituals.elementAssociations.wood, practiceRituals.elementAssociations.fire (and other element combinations)

## Security Rules

```
service cloud.firestore {
  match /databases/{database}/documents {
    // User profiles are readable by the owner only
    match /users/{userId} {
      allow read: if request.auth.uid == userId;
      allow write: if request.auth.uid == userId;
      
      // Subcollections under user profiles
      match /emotionalStates/{stateId} {
        allow read, write: if request.auth.uid == userId;
      }
      
      match /meditationSessions/{sessionId} {
        allow read, write: if request.auth.uid == userId;
      }
      
      match /journalEntries/{entryId} {
        allow read, write: if request.auth.uid == userId;
      }
      
      match /futureSelfDialogues/{dialogueId} {
        allow read, write: if request.auth.uid == userId;
      }
      
      match /ritualProgress/{ritualId} {
        allow read, write: if request.auth.uid == userId;
      }
      
      match /lifestyleRecommendations/{recommendationId} {
        allow read, write: if request.auth.uid == userId;
      }
    }
    
    // Public collections are readable by all authenticated users
    match /wisdomContent/{contentId} {
      allow read: if request.auth != null;
      allow write: if false; // Only admins can write via admin SDK
    }
    
    match /iChingHexagrams/{hexagramId} {
      allow read: if request.auth != null;
      allow write: if false; // Only admins can write via admin SDK
    }
    
    match /philosophicalAvatars/{avatarId} {
      allow read: if request.auth != null;
      allow write: if false; // Only admins can write via admin SDK
    }
    
    match /practiceRituals/{ritualId} {
      allow read: if request.auth != null;
      allow write: if false; // Only admins can write via admin SDK
    }
  }
}
```

## Data Migration and Seeding Strategy

1. **Initial Data Seeding**:
   - Pre-populate wisdom content from Dao De Jing, I Ching, and Yangming philosophy
   - Create all 64 I Ching hexagrams with interpretations
   - Add philosophical avatars (Confucius, Laozi, Wang Yangming)
   - Create basic practice rituals

2. **User Data Migration**:
   - Implement versioning for user data schema
   - Use Cloud Functions to migrate user data when schema changes
   - Maintain backward compatibility during transitions

3. **Backup Strategy**:
   - Daily backups of all collections
   - Point-in-time recovery for user data
   - Export critical wisdom content periodically

## Performance Considerations

1. **Denormalization Strategy**:
   - Store frequently accessed data together to minimize reads
   - Duplicate some data (like basic user info) where needed for performance

2. **Pagination**:
   - Implement cursor-based pagination for large collections
   - Limit query results to reasonable batch sizes

3. **Caching**:
   - Cache frequently accessed wisdom content locally
   - Implement TTL (Time To Live) for cached data

4. **Offline Support**:
   - Enable offline persistence for critical user data
   - Implement conflict resolution for offline changes

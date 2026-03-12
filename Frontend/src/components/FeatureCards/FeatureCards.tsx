import React from 'react';
import FeatureMentor from './FeatureMentor';
import FeatureFindBuddies from './FeatureFindBuddies';
import FeatureFlashcards from './FeatureFlashcard';
import FeaturePlanStudy from './FeaturePlanStudy';

export const FeatureCards: React.FC = () => {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <FeatureFlashcards />
        <FeatureFindBuddies />
        <FeaturePlanStudy />
        <FeatureMentor />
      </div>
    );
};
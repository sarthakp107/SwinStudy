import React from 'react';
import FeatureMentor from './FeatureMentor';
import FeatureFindBuddies from './FeatureFindBuddies';
import FeatureFlashcards from './FeatureFlashcard';

export const FeatureCards: React.FC = () => {
    return (
      <section className="mb-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <FeatureMentor />
          <FeatureFindBuddies />
          <FeatureFlashcards />
        </div>
      </section>
    );
};
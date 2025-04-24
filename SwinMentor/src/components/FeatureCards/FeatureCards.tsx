import React from 'react';
import FeatureMentor from './FeatureMentor';
import FeatureFindBuddies from './FeatureFindBuddies';
import FeatureFlashcards from './FeatureFlashcard';
import FeaturePlanStudy from './FeaturePlanStudy';

export const FeatureCards: React.FC = () => {
    return (
      <section className="mb-10">
        <h2 className="text-2xl font-semibold text-gray-800 mb-6">Quick Actions</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <FeatureFlashcards />
          <FeatureFindBuddies />
          <FeaturePlanStudy />
          <FeatureMentor />
        </div>
      </section>
    );
};
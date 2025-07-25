// src/components/__tests__/UserUnitsCard.test.tsx
import { render ,screen } from '@testing-library/react';

import * as useUserUnitsHook from '@/Hooks/GetUserInfo/useUserUnits';
import { UserUnitsCard } from '@/components/UnitGroups/UserUnitsCard';

jest.mock('@/Hooks/GetUserInfo/useUserUnits');

describe('UserUnitsCard', () => {
  it('renders loading skeleton when loading', () => {
    jest.spyOn(useUserUnitsHook, 'useUserUnits').mockReturnValue({
      units: [],
      loading: true,
      error: null
    });

    render(<UserUnitsCard />);
    expect(screen.getByTestId('loading-skeleton')).toBeInTheDocument();
  });
});

import { useAuthContext } from "../Context/useAuthContext";

/**
 * Returns display name for the current user from auth context (populated by /api/auth/me).
 */
const useUserProfile = () => {
  const { user } = useAuthContext();

  const displayName = user?.fullName
    ? user.fullName.charAt(0).toUpperCase() + user.fullName.slice(1)
    : null;

  return {
    displayName,
    loading: false,
    error: null,
  };
};

export default useUserProfile;

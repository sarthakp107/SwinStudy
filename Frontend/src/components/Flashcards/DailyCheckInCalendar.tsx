import { useAuthContext } from '@/Hooks/Context/useAuthContext';
import { useState, useEffect } from 'react';

export const DailyCheckinCalendar = () => {
  // IMPORTANT: This is a mock implementation of useAuthContext for demonstration.
  // In your actual swinstudy.com application, you should replace this with
  // your real useAuthContext hook that provides the authenticated user object.
  // Example: import { useAuthContext } from 'your-auth-context-path';

  const { user } = useAuthContext();
  const [loggedInDates, setLoggedInDates] = useState<string[]>([]); // Explicitly type loggedInDates as string array
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null); // Explicitly type error state

  /**
   * Fetches login dates from the swinstudy.com API.
   * This effect runs when the component mounts or when the user ID changes.
   */
  useEffect(() => {
    const fetchLoginDates = async () => {
      // If no user ID is available, stop loading and display an empty calendar.
      // This handles cases where the user is not logged in or the auth context is not ready.
      if (!user?.id) {
        setLoading(false);
        return;
      }

      setLoading(true); // Indicate that data is being fetched
      setError(null); // Clear any previous errors

      try {
        // Construct the API URL with the user ID
        const response = await fetch(`${import.meta.env.VITE_BASE_API_Flashcards}/getUserLoggedInDates?userId=${user.id}`);
        // Check if the network request was successful
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        // Parse the JSON response
        const data: string[] = await response.json(); // Explicitly type data as string array
        // Assuming 'data' is an array of date strings (e.g., ["YYYY-MM-DD", "YYYY-MM-DD"])
        setLoggedInDates(data); // Update state with fetched dates
      } catch (e: any) { // Catch error as any or specific Error type
        console.error("Failed to fetch login dates:", e);
        // setError("Failed to load login data. Please try again later.");
      } finally {
        setLoading(false); // End loading state
      }
    };

    fetchLoginDates();
  }, [user?.id]); // Dependency array: re-run effect if user.id changes

  /**
   * Helper function to format a Date object into a "YYYY-MM-DD" string.
   * This format is assumed to match the date strings returned by the API.
   * @param {Date} date - The Date object to format.
   * @returns {string} The formatted date string.
   */
  const formatDate = (date: Date): string => { // Fixed: Explicitly typed 'date' parameter and return type
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Month is 0-indexed
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  // --- Calendar Date Generation Logic (LAST 9 MONTHS) ---
  // This section generates all days for the calendar display for the last 9 months.
  const dates: Date[] = []; // Explicitly type dates array
  const today = new Date();
  today.setHours(0, 0, 0, 0); // Normalize 'today' to the start of the day for consistent comparison

  // Calculate the date exactly nine months ago from today
  const nineMonthsAgo = new Date(today);
  nineMonthsAgo.setMonth(today.getMonth() - 8); // Go back 8 months to include the current month (making it 9 months total)
  nineMonthsAgo.setDate(1); // Start from the first day of that month for cleaner display
  nineMonthsAgo.setHours(0,0,0,0); // Ensure it's the very start of the day

  // Populate the 'dates' array with all days from nine months ago up to today
  let currentDate = new Date(nineMonthsAgo);
  while (currentDate <= today) {
    dates.push(new Date(currentDate)); // Push a copy of the date to avoid mutation issues
    currentDate.setDate(currentDate.getDate() + 1); // Move to the next day
  }

  // Create a Set for efficient lookup of logged-in dates.
  // This allows for O(1) average time complexity when checking if a date is logged in.
  const loggedInDatesSet = new Set<string>(loggedInDates); // Fixed: Explicitly typed the Set to accept strings

  // --- Calendar Grid Preparation ---
  // This prepares the 'cells' array which will represent each square in the calendar grid.
  // It includes nulls at the beginning to align the first date of the year to the correct day of the week.
  const cells: (Date | null)[] = []; // Explicitly type cells array
  const firstDayDate = dates[0]; // The very first date in our 9-month period

  // Calculate the day of the week for the first date.
  // JavaScript's getDay() returns 0 for Sunday, 1 for Monday, ..., 6 for Saturday.
  // We want our calendar to start with Monday as the first column (index 0).
  // So, we adjust: (JS_day_index + 6) % 7 will map Sun(0) to 6, Mon(1) to 0, Tue(2) to 1, etc.
  const firstDayOfWeekAdjusted = (firstDayDate.getDay() + 6) % 7;

  // Add leading 'null' cells to the 'cells' array. These represent empty squares
  // before the first actual date of the year, ensuring the first date aligns
  // with its correct day-of-the-week column (e.g., if Jan 1st is a Wednesday,
  // there will be two nulls for Monday and Tuesday before it).
  for (let i = 0; i < firstDayOfWeekAdjusted; i++) {
    cells.push(null);
  }
  cells.push(...dates); // Add all actual dates for the last 9 months

  // Pad the end of the 'cells' array with 'null's so that the total number of cells
  // is a perfect multiple of 7 (representing full weeks). This ensures the grid
  // renders correctly without jagged edges.
  while (cells.length % 7 !== 0) {
    cells.push(null);
  }

  // Determine the total number of columns (weeks) in the calendar grid.
  const numWeeks = cells.length / 7;

  // --- Month Header Logic ---
  // This prepares an array to hold month names, positioned above their respective weeks.
  const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  // Initialize an array with 'null' for each week column, where month names will be placed.
  const monthHeaderCells: (string | null)[] = Array(numWeeks).fill(null); // Explicitly type monthHeaderCells

  let currentMonth = -1; // Tracks the current month being processed

  // Iterate through all cells to determine where each month starts.
  cells.forEach((date, index) => {
    if (date) { // Only process actual dates, not null placeholders
      const month = date.getMonth(); // Get the month (0-indexed)
      const column = Math.floor(index / 7); // Determine which week column this date belongs to

      // If a new month is encountered, place its name in the 'monthHeaderCells' array
      // at the beginning of the week column where it starts.
      if (month !== currentMonth) {
        monthHeaderCells[column] = monthNames[month];
        currentMonth = month;
      }
    }
  });

  // --- Loading and Error States ---
  // Display a loading message while data is being fetched.
  if (loading) {
    return (
      <div className="flex justify-center items-center h-48 bg-white text-black rounded-lg p-4"> {/* Theme change: bg-white, text-black */}
        <p>Loading calendar data...</p>
      </div>
    );
  }

  // Display an error message if the data fetching failed.
  if (error) {
    return (
      <div className="flex justify-center items-center h-48 bg-white text-red-500 rounded-lg p-4"> {/* Theme change: bg-white */}
        <p>{error}</p>
      </div>
    );
  }

  // --- Main Calendar Render ---
  return (
    <div className="p-4 bg-white text-black rounded-lg shadow-lg font-inter max-w-full overflow-x-auto"> {/* Theme change: bg-white, text-black */}
      <h2 className="text-2xl font-bold mb-4 text-center text-black">Daily Check-in Record</h2> {/* Theme change: text-black */}

      <div className="flex">
        {/* Day of week labels (e.g., Mon, Wed, Fri) */}
        {/* This column is fixed on the left and provides labels for the rows. */}
        {/* mt-6 is added to vertically align with the calendar grid, accounting for the month header row. */}
        <div className="flex flex-col pr-2 text-sm font-semibold text-gray-800 mt-6"> {/* Theme change: text-gray-800 */}
          {/* Labels for Mon, Wed, Fri only, as per the GitHub screenshot. */}
          {/* However, the vertical spacing is maintained for all 7 days to align with the grid rows. */}
          {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map((day) => (
            <div key={day} className="h-4 flex items-center justify-end mb-1">
              {['Mon', 'Wed', 'Fri'].includes(day) ? day : ''}
            </div>
          ))}
        </div>

        {/* Main Calendar Grid Container */}
        {/* This div uses CSS Grid to lay out the month headers and daily squares. */}
        <div className="flex-grow">
          <div className="grid gap-1" style={{
            // Define the number of columns based on the number of weeks.
            // Each column is 16px wide (12px for the square + 4px for the gap).
            gridTemplateColumns: `repeat(${numWeeks}, 16px)`,
            // Define the height of each row. The first row is for month headers (auto height),
            // and the next 7 rows are for the days of the week (16px each).
            gridAutoRows: 'auto repeat(7, 16px)',
          }}>
            {/* Month Headers - rendered in the first "row" of the grid */}
            {/* Each month name is placed at the start of the week column where that month begins. */}
            {monthHeaderCells.map((monthName, colIndex) => (
              <div
                key={`month-${colIndex}`}
                className="text-sm font-semibold text-gray-800 text-left" // Theme change: text-gray-800
                style={{
                  gridColumnStart: colIndex + 1, // Start at the current column (1-based)
                  gridRowStart: 1, // Always in the first row of the grid
                  whiteSpace: 'nowrap', // Prevent month names from wrapping
                }}
              >
                {monthName}
              </div>
            ))}

            {/* Daily Squares - Rendered from the second row onwards (after month headers) */}
            {cells.map((date, index) => {
              // Calculate the grid column and row for each square.
              // Columns are based on the week index.
              // Rows are based on the day of the week, +2 because row 1 is for month headers.
              const col = Math.floor(index / 7) + 1; // +1 because grid columns are 1-based
              const row = (index % 7) + 2; // +2 because grid rows are 1-based, and row 1 is for months

              // Render an empty gray square for null (placeholder) cells.
              if (date === null) {
                return (
                  <div
                    key={`empty-${index}`}
                    className="w-3 h-3 bg-black rounded-sm" // Theme change: bg-black for unticked boxes
                    style={{ gridColumnStart: col, gridRowStart: row }}
                  ></div>
                );
              }

              // Format the date to compare with fetched logged-in dates.
              const formattedDate = formatDate(date);
              // Check if the current date is in the set of logged-in dates.
              const isLoggedIn = loggedInDatesSet.has(formattedDate);

              // Render the daily square. It will be red if logged in, dark gray otherwise.
              // Includes a title for tooltip on hover, and a smooth transition for color changes.
              return (
                <div
                  key={formattedDate}
                  className={`w-3 h-3 rounded-sm ${isLoggedIn ? 'bg-red-600' : 'bg-black'} transition-colors duration-200`} // Theme change: bg-black for unticked boxes
                  title={formattedDate}
                  style={{ gridColumnStart: col, gridRowStart: row }}
                ></div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DailyCheckinCalendar;

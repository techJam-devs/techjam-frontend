/**
 * @description Returns the initials of a full name
 * @param fullName string - e.g. "John Doe"
 * @returns string - e.g. "JD"
 */
export const getInitials = (fullName: string): string => {
  if (!fullName) return "";

  // Split by spaces, filter out empty strings
  const words = fullName.trim().split(" ").filter(Boolean);

  if (words.length === 0) return "";

  // Take first letter of first and last word (or just first if only one word)
  const firstInitial = words[0][0].toUpperCase();
  const lastInitial =
    words.length > 1 ? words[words.length - 1][0].toUpperCase() : "";

  return firstInitial + lastInitial;
};

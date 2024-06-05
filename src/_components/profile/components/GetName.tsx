export const GetName = ({ name }: { name: string }) => {
  // Function to get the initials
  const getInitials = (name: string) => {
    const words = name.split(" ");
    const initials = words.map((word: string) => word.charAt(0).toUpperCase());
    return initials.join("");
  };

  return <> {getInitials(name)}</>;
};

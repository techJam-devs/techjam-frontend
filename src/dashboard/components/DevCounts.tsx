export default function ProjectMembers() {
  const members = [
    { id: 1, name: "Alice", image: "https://i.pravatar.cc/150?u=alice" },
    { id: 2, name: "Bob", image: "https://i.pravatar.cc/150?u=bob" },
    { id: 3, name: "Carol", image: "https://i.pravatar.cc/150?u=carol" },
    { id: 4, name: "David", image: "https://i.pravatar.cc/150?u=david" },
  ];

  const extraCount = 27;

  return (
    <div className="flex items-center gap-2">
      {/* Avatars  */}
      <div className="flex -space-x-3">
        {members.map((member) => (
          <img
            src={member.image}
            alt={member.name}
            className="w-8 h-8 border-2 border-white rounded-full"
          />
        ))}
      </div>

      {/* Extra count avatar */}
      <div className="w-9 h-9 flex items-center justify-center rounded-full text-xs font-medium text-[#0908C3] border-2 border-white -ml-3">
        +{extraCount}
      </div>
    </div>
  );
}

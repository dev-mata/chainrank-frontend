import GroupCard from "./GroupCard";

export default function GroupList({ groups, type }) {
  if (!groups || groups.length === 0) {
    return <p className="text-gray-500">No groups found.</p>;
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {groups.map(group => (
        <GroupCard key={group.id} group={group} type={type} />
      ))}
    </div>
  );
}

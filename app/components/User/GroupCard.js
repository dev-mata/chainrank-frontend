import PendingAction from "./PendingAction";

export default function GroupCard({ group, type }) {
  return (
    <div className="bg-white p-4 rounded-lg shadow-md flex flex-col justify-between">
      <div>
        <h3 className="text-lg font-semibold">{group.name}</h3>
        <p className="text-sm text-gray-500">{group.members} members</p>
      </div>

      {type === "pending" && <PendingAction groupId={group.id} />}
      {type === "joined" && (
        <button className="mt-3 px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600">
          Leave Group
        </button>
      )}
    </div>
  );
}

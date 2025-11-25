export default function PendingAction({ groupId }) {
    const acceptInvite = () => console.log("Accepted invite", groupId);
    const declineInvite = () => console.log("Declined invite", groupId);

    return (
        <div className="flex gap-2 mt-3">
            <button
                onClick={acceptInvite}
                className="px-3 py-1 bg-green-500 text-white rounded hover:bg-green-600"
            >
                Accept
            </button>
            <button
                onClick={declineInvite}
                className="px-3 py-1 bg-gray-300 text-black rounded hover:bg-gray-400"
            >
                Decline
            </button>
        </div>
    );
}

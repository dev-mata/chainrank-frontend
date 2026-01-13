import { AlertCircle, CheckCircle, XCircle, Pause, Ban } from "lucide-react";

export const allowedGroupFields = [
    "groupName",
    "description",
    "price",
    "telegramLink",
    "discordLink",
    "category",
    "subCategory",
];

export function getStatusDisplay(status) {
    const statusMap = {
        pending: {
            text: "Pending Review",
            color: "text-yellow-700",
            bg: "bg-yellow-50",
            border: "border-yellow-200",
            icon: <AlertCircle className="w-4 h-4" />,
        },
        approved: {
            text: "Live & Active",
            color: "text-green-700",
            bg: "bg-green-50",
            border: "border-green-200",
            icon: <CheckCircle className="w-4 h-4" />,
        },
        rejected: {
            text: "Rejected",
            color: "text-red-700",
            bg: "bg-red-50",
            border: "border-red-200",
            icon: <XCircle className="w-4 h-4" />,
        },
        suspended: {
            text: "Suspended",
            color: "text-orange-700",
            bg: "bg-orange-50",
            border: "border-orange-200",
            icon: <Pause className="w-4 h-4" />,
        },
        blocked: {
            text: "Blocked",
            color: "text-red-800",
            bg: "bg-red-100",
            border: "border-red-300",
            icon: <Ban className="w-4 h-4" />,
        },
    };

    return statusMap[status] || statusMap.pending;
}

export function normalizeInitial(group) {
    return {
        groupName: group?.groupName ?? "",
        description: group?.description ?? "",
        price: group?.price != null ? String(group.price) : "",
        telegramLink: group?.telegramLink ?? "",
        discordLink: group?.discordLink ?? "",
        category: group?.category ?? "",
        subCategory: group?.subCategory ?? "",
    };
}

export function buildChangedPayload(form, initial) {
    const trimmed = Object.fromEntries(
        Object.entries(form).map(([k, v]) => [k, typeof v === "string" ? v.trim() : v])
    );

    const original = Object.fromEntries(
        Object.entries(initial).map(([k, v]) => [k, typeof v === "string" ? v.trim() : v])
    );

    const payload = {};
    for (const k of Object.keys(trimmed)) {
        if (trimmed[k] !== original[k]) payload[k] = trimmed[k];
    }

    if (payload.price !== undefined) {
        const num = Number(payload.price);
        if (Number.isNaN(num) || num < 0) throw new Error("Price must be a valid non-negative number");
        payload.price = num;
    }

    return payload;
}

export function isValidUrlOrEmpty(s) {
    const v = (s ?? "").trim();
    if (!v) return true;
    try {
        new URL(v);
        return true;
    } catch {
        return false;
    }
}

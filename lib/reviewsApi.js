const baseApi = process.env.NEXT_PUBLIC_API_BASE_URL;

async function request(path, { method = "GET", token, body }) {
    const res = await fetch(`${baseApi}${path}`, {

        method,
        headers: {
            "Content-Type": "application/json",
            ...(token ? { Authorization: `Bearer ${token}` } : {}),
        },
        body: body ? JSON.stringify(body) : undefined,
        cache: "no-store",

    })

    const data = await res.json().catch(() => ({}))
    if (!res.ok) {
        const msg = data?.message || `Request failed (${res.status})`;
        throw new Error(msg);
    }
    return data;

}

export async function getReviewsByGroup(groupKey, { page = 1, limit = 10, sort = "latest" } = {}) {
    const qs = new URLSearchParams({ page: String(page), limit: String(limit), sort });
    return request(`/api/reviews/group/${groupKey}?${qs.toString()}`);
}

export async function createReviewForGroup(groupKey, { rating, message }, token) {
    return request(`/api/reviews/group/${groupKey}`, {
        method: "POST",
        token,
        body: { rating, message },
    });
}
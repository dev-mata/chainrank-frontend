export default function GroupInfoStep({ form, errors, onChange }) {
    return (
        <div className="space-y-5">
            <h2 className="text-xl font-bold text-black mb-4">Group Information</h2>

            <div>
                <label className="block text-sm font-medium text-gray-700 font-rhm">
                    Group Name *
                </label>
                <input
                    name="groupName"
                    value={form.groupName}
                    onChange={onChange}
                    className={`mt-1 block w-full border p-2 text-black placeholder-gray-400 ${errors.groupName ? 'border-red-500' : 'border-gray-300'
                        }`}
                    type="text"
                    placeholder="e.g. Astro Trading"
                />
                {errors.groupName && (
                    <p className="mt-1 text-sm text-red-600">{errors.groupName}</p>
                )}
            </div>

            <div>
                <label className="block text-sm font-medium text-gray-700 font-rhm">
                    Official Email *
                </label>
                <input
                    name="email"
                    value={form.email}
                    onChange={onChange}
                    className={`mt-1 block w-full border p-2 text-black placeholder-gray-400 ${errors.email ? 'border-red-500' : 'border-gray-300'
                        }`}
                    type="email"
                    placeholder="group@domain.com"
                />
                {errors.email && (
                    <p className="mt-1 text-sm text-red-600">{errors.email}</p>
                )}
            </div>

            <div>
                <label className="block text-sm font-medium text-gray-700 font-rhm">
                    Mobile Number *
                </label>
                <input
                    name="mobileNumber"
                    value={form.mobileNumber}
                    onChange={onChange}
                    className={`mt-1 block w-full border p-2 text-black placeholder-gray-400 ${errors.mobileNumber ? 'border-red-500' : 'border-gray-300'
                        }`}
                    type="tel"
                    placeholder="+1 234 567 8900"
                />
                {errors.mobileNumber && (
                    <p className="mt-1 text-sm text-red-600">{errors.mobileNumber}</p>
                )}
            </div>

            <div>
                <label className="block text-sm font-medium text-gray-700 font-rhm">
                    Country *
                </label>
                <input
                    name="country"
                    value={form.country}
                    onChange={onChange}
                    className={`mt-1 block w-full border p-2 text-black placeholder-gray-400 ${errors.country ? 'border-red-500' : 'border-gray-300'
                        }`}
                    type="text"
                    placeholder="e.g. United States"
                />
                {errors.country && (
                    <p className="mt-1 text-sm text-red-600">{errors.country}</p>
                )}
            </div>

            <div>
                <label className="block text-sm font-medium text-gray-700 font-rhm">
                    Description *
                </label>
                <textarea
                    name="description"
                    value={form.description}
                    onChange={onChange}
                    className={`mt-1 block w-full border p-2 text-black placeholder-gray-400 ${errors.description ? 'border-red-500' : 'border-gray-300'
                        }`}
                    rows={3}
                    placeholder="Describe your group..."
                />
                {errors.description && (
                    <p className="mt-1 text-sm text-red-600">{errors.description}</p>
                )}
            </div>

            <div>
                <label className="block text-sm font-medium text-gray-700 font-rhm">
                    Price (monthly) in USD$ *
                </label>
                <input
                    name="price"
                    value={form.price}
                    onChange={onChange}
                    className={`mt-1 block w-full border p-2 text-black placeholder-gray-400 ${errors.price ? 'border-red-500' : 'border-gray-300'
                        }`}
                    type="number"
                    step="0.01"
                    min="0"
                    placeholder="10.00"
                />
                {errors.price && (
                    <p className="mt-1 text-sm text-red-600">{errors.price}</p>
                )}
            </div>

            <div>
                <label className="block text-sm font-medium text-gray-700 font-rhm">
                    Category *
                </label>
                <select
                    name="category"
                    value={form.category}
                    onChange={onChange}
                    className={`mt-1 block w-full border px-2 py-3 text-black font-rhm text-sm ${errors.category ? 'border-red-500' : 'border-gray-300'
                        }`}
                >
                    <option value="">Select category</option>
                    <option value="Crypto">Crypto</option>
                    <option value="Stocks">Stocks</option>
                    <option value="Real Estate">Real Estate</option>
                    <option value="Sports Betting">Sports Betting</option>
                    <option value="Amazon FBA">Amazon FBA</option>
                </select>
                {errors.category && (
                    <p className="mt-1 text-sm text-red-600">{errors.category}</p>
                )}
            </div>

            <div>
                <label className="block text-sm font-medium text-gray-700 font-rhm">
                    Sub Category *
                </label>
                <select
                    name="subCategory"
                    value={form.subCategory}
                    onChange={onChange}
                    className={`mt-1 block w-full border px-2 py-3 text-black font-rhm text-sm ${errors.subCategory ? 'border-red-500' : 'border-gray-300'
                        }`}
                >
                    <option value="">Select Sub Category</option>
                    <option value="Crypto">Crypto</option>
                    <option value="Stocks">Stocks</option>
                    <option value="Real Estate">Real Estate</option>
                    <option value="Sports Betting">Sports Betting</option>
                    <option value="Amazon FBA">Amazon FBA</option>
                </select>
                {errors.subCategory && (
                    <p className="mt-1 text-sm text-red-600">{errors.subCategory}</p>
                )}
            </div>

            <div>
                <label className="block text-sm font-medium text-gray-700 font-rhm">
                    Telegram Link
                </label>
                <input
                    name="telegramLink"
                    value={form.telegramLink}
                    onChange={onChange}
                    className="mt-1 block w-full border border-gray-300 p-2 text-black placeholder-gray-400"
                    type="url"
                    placeholder="https://t.me/yourgroup"
                />
            </div>

            <div>
                <label className="block text-sm font-medium text-gray-700 font-rhm">
                    Discord Link
                </label>
                <input
                    name="discordLink"
                    value={form.discordLink}
                    onChange={onChange}
                    className="mt-1 block w-full border border-gray-300 p-2 text-black placeholder-gray-400"
                    type="url"
                    placeholder="https://discord.gg/yourgroup"
                />
            </div>
        </div>
    );
}

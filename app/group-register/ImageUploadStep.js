import Image from 'next/image';

export default function ImageUploadStep({
    errors,
    logoPreview,
    bannerPreview,
    onLogoUpload,
    onBannerUpload,
}) {
    return (
        <div className="space-y-5">
            <h2 className="text-xl font-bold text-black mb-4">Upload Images</h2>

            {/* Logo Upload */}
            <div>
                <label className="block text-sm font-medium text-gray-700 font-rhm mb-2">
                    Upload Logo
                </label>
                <div
                    className="border-2 border-dashed border-gray-300 rounded-md p-6 text-center cursor-pointer hover:border-rose-400 transition"
                    onClick={() => document.getElementById('logo-upload').click()}
                >
                    <div className="flex flex-col items-center justify-center gap-2">
                        <svg
                            className="w-8 h-8 text-gray-400"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            viewBox="0 0 24 24"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M4 16v1a2 2 0 002 2h12a2 2 0 002-2v-1M12 12v6m0 0l3-3m-3 3l-3-3m6-7h.01M6 8h.01"
                            ></path>
                        </svg>
                        <p className="text-rose-600 font-medium">Tap to upload logo</p>
                        <p className="text-xs text-gray-400">PNG or JPEG (max. 2MB)</p>
                    </div>
                </div>

                <input
                    id="logo-upload"
                    type="file"
                    accept="image/png,image/jpeg,image/jpg"
                    onChange={onLogoUpload}
                    className="hidden"
                />

                {errors.logo && (
                    <p className="mt-2 text-sm text-red-600">{errors.logo}</p>
                )}

                {logoPreview && (
                    <div className="mt-4 text-center">
                        <Image
                            src={logoPreview}
                            alt="Logo Preview"
                            width={80}
                            height={80}
                            className="mx-auto rounded-full object-cover"
                        />
                    </div>
                )}
            </div>

            {/* Banner Upload */}
            <div>
                <label className="block text-sm font-medium text-gray-700 font-rhm mb-2">
                    Upload Banner Image
                </label>
                <div
                    className="border-2 border-dashed border-gray-300 rounded-md p-6 text-center cursor-pointer hover:border-rose-400 transition"
                    onClick={() => document.getElementById('banner-upload').click()}
                >
                    <div className="flex flex-col items-center justify-center gap-2">
                        <svg
                            className="w-8 h-8 text-gray-400"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            viewBox="0 0 24 24"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M4 16v1a2 2 0 002 2h12a2 2 0 002-2v-1M12 12v6m0 0l3-3m-3 3l-3-3m6-7h.01M6 8h.01"
                            ></path>
                        </svg>
                        <p className="text-rose-600 font-medium">Tap to upload banner</p>
                        <p className="text-xs text-gray-400">
                            PNG or JPEG (max. 2MB, recommended 1200x400px)
                        </p>
                    </div>
                </div>

                <input
                    id="banner-upload"
                    type="file"
                    accept="image/png,image/jpeg,image/jpg"
                    onChange={onBannerUpload}
                    className="hidden"
                />

                {errors.bannerImage && (
                    <p className="mt-2 text-sm text-red-600">{errors.bannerImage}</p>
                )}

                {bannerPreview && (
                    <div className="mt-4">
                        <Image
                            src={bannerPreview}
                            alt="Banner Preview"
                            width={600}
                            height={200}
                            className="mx-auto rounded-md object-cover w-full h-48"
                        />
                    </div>
                )}
            </div>

            <div className="bg-gray-50 border border-gray-200 p-4 rounded">
                <p className="text-sm text-gray-600">
                    <strong>Note:</strong> Images are optional but highly recommended to
                    make your group stand out!
                </p>
            </div>
        </div>
    );
}

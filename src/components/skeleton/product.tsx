export const ProductSkeleton = () => {
    return (
        <div className="md:grid grid-cols-3 gap-10 animate-pulse">
            {/* Image Skeleton */}
            <div className="product-image overflow-hidden rounded-xl border border-gray-200 bg-white">
                <div className="w-full aspect-square bg-gray-200" />
            </div>

            {/* Product Info Skeleton */}
            <div className="product-info col-span-2 mt-5 md:mt-0">
                {/* Category Skeleton */}
                <div className="h-4 bg-gray-200 rounded-full w-24" />

                {/* Title Skeleton */}
                <div className="h-9 bg-gray-200 rounded-full w-3/4 mt-3" />

                {/* Rating & Stock Skeleton */}
                <div className="flex items-center gap-3 mt-4">
                    <div className="h-5 bg-gray-200 rounded-full w-16" />
                    <span className="text-gray-300">|</span>
                    <div className="h-5 bg-gray-200 rounded-full w-28" />
                </div>

                {/* Price & Discount Skeleton */}
                <div className="flex items-center gap-3 mt-5">
                    <div className="h-9 bg-gray-200 rounded-full w-32" />
                    <div className="h-6 bg-gray-200 rounded-md w-20" />
                </div>

                {/* Description Skeleton */}
                <div className="mt-5 space-y-2.5">
                    <div className="h-4 bg-gray-200 rounded-full w-full" />
                    <div className="h-4 bg-gray-200 rounded-full w-11/12" />
                    <div className="h-4 bg-gray-200 rounded-full w-3/4" />
                </div>

                {/* Quantity & Add to Cart Skeleton */}
                <div className="flex gap-3 mt-6">
                    <div className="h-12 w-28 bg-gray-200 rounded-xl" />
                    <div className="h-12 w-36 bg-gray-200 rounded-xl" />
                </div>
            </div>
        </div>
    );
};

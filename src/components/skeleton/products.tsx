export const ProductsSkeleton = ({ count = 8 }: { count?: number }) => {
    return (
        <>
            {Array.from({ length: count }).map((_, index) => (
                <div
                    key={index}
                    className="single-product-card rounded-2xl overflow-hidden border border-line bg-white/60 animate-pulse"
                >
                    {/* Image Skeleton */}
                    <div className="w-full aspect-square bg-gray-200" />

                    <div className="p-4 flex flex-col gap-4">
                        <div className="product-info flex flex-col gap-2.5">
                            {/* Category Skeleton */}
                            <div className="h-3.5 bg-gray-200 rounded-full w-20" />

                            {/* Title Skeleton */}
                            <div className="h-5 bg-gray-200 rounded-full w-4/5" />

                            {/* Price Skeleton */}
                            <div className="h-6 bg-gray-200 rounded-full w-24 mt-1" />
                        </div>

                        {/* Add to cart Button Skeleton */}
                        <div className="product-actions mt-2">
                            <div className="h-12 bg-gray-200 rounded-3xl w-full" />
                        </div>
                    </div>
                </div>
            ))}
        </>
    );
};

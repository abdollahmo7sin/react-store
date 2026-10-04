export const CartSkeleton = ({ count = 3 }: { count?: number }) => {
    return (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-start animate-pulse">
            {/* Cart Items Skeleton */}
            <div className="md:col-span-2 flex flex-col gap-4">
                {Array.from({ length: count }).map((_, index) => (
                    <div
                        key={index}
                        className="flex gap-4 bg-white border border-line rounded-2xl p-4"
                    >
                        {/* Cart Item Image Skeleton */}
                        <div className="shrink-0 w-20 md:w-24 aspect-square rounded-xl bg-gray-200" />

                        <div className="flex flex-1 flex-wrap items-center justify-between gap-3 min-w-0">
                            {/* Cart Item Details Skeleton */}
                            <div className="w-full md:w-auto md:flex-1 min-w-0 space-y-2">
                                <div className="h-5 bg-gray-200 rounded-full w-3/4" />
                                <div className="h-4 bg-gray-200 rounded-full w-20" />
                            </div>

                            {/* Cart Item Quantity Skeleton */}
                            <div className="h-10 w-28 bg-gray-200 rounded-xl" />

                            {/* Cart Item Line Total Skeleton */}
                            <div className="h-6 w-20 md:min-w-28 bg-gray-200 rounded-full" />

                            {/* Remove Button Skeleton */}
                            <div className="shrink-0 size-11 bg-gray-200 rounded-lg" />
                        </div>
                    </div>
                ))}

                {/* Continue Shopping Link Skeleton */}
                <div className="h-5 bg-gray-200 rounded-full w-32 mt-2" />
            </div>

            {/* Order Summary Skeleton */}
            <aside className="sticky bottom-0 -mx-4 md:mx-0 md:top-28 md:bottom-auto">
                <div className="bg-white border-t md:border border-line md:rounded-2xl p-5 flex flex-col gap-3 shadow-[0_-4px_12px_rgba(0,0,0,0.04)] md:shadow-none">
                    {/* Title Skeleton */}
                    <div className="hidden md:block h-6 bg-gray-200 rounded-full w-28 mb-1" />

                    {/* Subtotal Skeleton */}
                    <div className="flex justify-between items-center py-1">
                        <div className="h-4 bg-gray-200 rounded-full w-24" />
                        <div className="h-4 bg-gray-200 rounded-full w-16" />
                    </div>

                    {/* Shipping Skeleton */}
                    <div className="flex justify-between items-center py-1">
                        <div className="h-4 bg-gray-200 rounded-full w-16" />
                        <div className="h-4 bg-gray-200 rounded-full w-12" />
                    </div>

                    <div className="h-px bg-line my-1" />

                    {/* Total Skeleton */}
                    <div className="flex justify-between items-baseline py-1">
                        <div className="h-5 bg-gray-200 rounded-full w-16" />
                        <div className="h-7 bg-gray-200 rounded-full w-24" />
                    </div>

                    {/* Checkout Button Skeleton */}
                    <div className="h-12 bg-gray-200 rounded-xl w-full mt-1" />
                </div>
            </aside>
        </div>
    );
};

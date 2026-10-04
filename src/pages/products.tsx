import ProductCard from "../components/ProductCard";
import { useProducts } from "../hooks/useProducts";
import { ProductsSkeleton } from "../components/skeleton/products";
import { useCategories } from "../hooks/useCategories";
import { Pagination } from "../components/Pagination";
import { useSearchParams } from "react-router";

export const Products = () => {
    const LIMIT = 8
    const [searchParams, setSearchParams] = useSearchParams()

    const rawPage = parseInt(searchParams.get('page') || '1', 10);
    const page = Number.isNaN(rawPage) || rawPage < 1 ? 1 : rawPage
    const category = searchParams.get('category') || null;

    const { data, isLoading, isError } = useProducts({ limit: LIMIT, skip: (page - 1) * LIMIT, category });

    const products = data?.products
    const totalPages = Math.ceil((data?.total ?? 0) / LIMIT)
    const { data: categories } = useCategories();

    const handleCategoryClick = (category: string | null) => {
        setSearchParams(category ? { category } : {})
    };

    const handlePageChange = (pageNum: number) => {

        setSearchParams(prev => {
            prev.set('page', String(pageNum))
            return prev
        })
    }



    return (
        <>
            <div className="max-w-7xl mx-auto px-4">

                <h2 className="text-3xl font-bold mb-6">{category ? `عرض جميع منتجات: ${category}` : `عرض جميع المنتجات`}</h2>

                {/*  filters */}
                <div className="filter flex flex-wrap  gap-2 items-center my-4">
                    <button onClick={() => handleCategoryClick(null)} className={` p-2 rounded-xl cursor-pointer px-4 py-2.5 ${category === null ? "bg-ink text-white" : "bg-white text-ink"}`}>الكل</button>
                    {
                        categories?.map((cat, i) => (
                            <button onClick={() => handleCategoryClick(cat)} className={` p-2 rounded-xl cursor-pointer px-4 py-2.5 ${category === cat ? "bg-ink text-white" : "bg-white text-ink"}`} key={`${i}-${cat}`}>{cat}</button>
                        ))
                    }
                </div>

                {/*  products grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                    {isLoading ? (
                        <ProductsSkeleton count={LIMIT} />
                    ) : isError ? (
                        <p> حدث خطأ يرجى المحاولة مرة اخرى</p>
                    ) : (
                        products?.map((product) => (
                            <ProductCard key={product.id} product={product} />
                        ))
                    )}
                </div>

                {/* pagination */}
                <Pagination page={page} totalPages={totalPages} onChange={handlePageChange} />
            </div>


        </>
    )
}
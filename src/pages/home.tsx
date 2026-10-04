import { NavLink } from "react-router";
import ProductCard from "../components/ProductCard"
import { ProductsSkeleton } from "../components/skeleton/products"
import { useProducts } from "../hooks/useProducts"

export const Home = () => {
    const { data, isLoading, isError } = useProducts({ limit: 8 });
    return (

        <>
            {/* hero */}
            < section className="hero" >
                <div className="max-w-7xl mx-auto px-4">
                    <div className="bg-forest rounded-[14px] p-14">
                        <h1 className="text-white text-4xl font-bold mb-3.5">تسوّق أحدث المنتجات</h1>
                        <p className="text-[#B9D6CC] text-lg max-w-md mb-6">تشكيلة متنوعة من الإلكترونيات والعطور ومستلزمات المنزل.</p>
                        <NavLink to="/products" className="bg-white text-forest px-6 py-3 rounded-full hover:text-brand transition-colors inline-block mt-4">تصفح المنتجات</NavLink>
                    </div>
                </div>
            </section >

            {/* products-section */}
            < section className="products-section mt-10" >
                <div className="max-w-7xl mx-auto px-4">
                    <h2 className='text-[24px] font-bold mb-6 '>منتجات مختارة</h2>

                    <div className="products-grid grid grid-cols-1 lg:grid-cols-4 gap-6">
                        {isLoading ? (
                            <ProductsSkeleton count={8} />
                        ) : isError ? (
                            <p>حدث خطأ يرجى المحاولة مرة اخرى</p>
                        ) : (
                            data?.products?.map((product) => (
                                <ProductCard key={product.id} product={product} />
                            ))
                        )}

                    </div>
                </div>
            </section >
        </>
    )
}
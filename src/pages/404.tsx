import { Link } from "react-router"

export const ErrorPage = () => {
    return (
        <div className="max-w-7xl mx-auto px-4 flex flex-col items-center justify-center h-screen">
            <h1 className="text-3xl font-bold mb-6">404</h1>
            <p className="text-gray-500 dark:text-gray-400 mb-6">عذراً، الصفحة غير موجودة</p>
            <Link to="/" className="bg-brand text-white hover:bg-ink transition-all duration-200 ease-in-out mb-6 px-8 py-3 rounded-lg">الرجوع إلى الصفحة الرئيسية</Link>
        </div>
    )
}
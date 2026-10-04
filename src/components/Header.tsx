import { useState } from 'react'
import { NavLink, useNavigate } from 'react-router'
import { useCartStore } from '../stores/cartStore'
import { useAuthStore } from '../stores/authStore'

const Header = () => {
    const [menuOpen, setMenuOpen] = useState(false)
    const quantity = useCartStore((state) => state.items.length)
    const navigate = useNavigate()

    const user = useAuthStore((state) => state.user)
    const logout = useAuthStore((state) => state.logout)


    return (
        <header className="bg-white  border-b border-line sticky top-0 z-40">
            <div className="max-w-7xl mx-auto px-4">

                <div className="flex justify-between py-5 items-center bg-white">
                    <div className="flex gap-6 items-center">
                        <div className="text-2xl">
                            متجري
                        </div>

                        {/* Hamburger button */}
                        <button
                            className="md:hidden flex flex-col justify-center items-center w-8 h-8 gap-1.5 cursor-pointer"
                            onClick={() => setMenuOpen(!menuOpen)}
                            aria-label="Toggle menu"
                        >
                            <span className={`block h-0.5 w-6 bg-black rounded transition-all duration-300 ease-in-out ${menuOpen ? 'rotate-45 translate-y-2' : ''}`} />
                            <span className={`block h-0.5 w-6 bg-black rounded transition-all duration-300 ease-in-out ${menuOpen ? 'opacity-0' : 'opacity-100'}`} />
                            <span className={`block h-0.5 w-6 bg-black rounded transition-all duration-300 ease-in-out ${menuOpen ? '-rotate-45 -translate-y-2' : ''}`} />
                        </button>

                        {/* navbar */}
                        <nav
                            className={`
                overflow-hidden transition-all duration-300 ease-in-out
                absolute top-full left-0 w-full bg-white shadow-md z-50
                md:static md:w-auto md:bg-transparent md:shadow-none md:overflow-visible md:z-auto
                ${menuOpen
                                    ? 'max-h-60 opacity-100 border-b border-line'
                                    : 'max-h-0 opacity-0 pointer-events-none'
                                }
                md:max-h-none md:opacity-100 md:border-none md:pointer-events-auto
              `}
                        >
                            <ul className="flex flex-col md:flex-row gap-4 md:gap-8 text-xl px-4 py-4 md:p-0">
                                <li>
                                    <NavLink to="/" className="hover:text-brand transition-colors block">الرئيسية</NavLink>
                                </li>
                                <li>
                                    <NavLink to="/products" className="hover:text-brand transition-colors block">المنتجات</NavLink>
                                </li>
                            </ul>
                        </nav>
                    </div>

                    <div className="flex items-center gap-6">
                        {user ? (
                            <div className="flex items-center gap-2">
                                <span className="md:text-sm text-xs text-gray-600 hidden md:block">{user.username}</span>
                                <button onClick={logout} className="text-sm   text-brand px-3 py-1.5 rounded-lg transition-colors cursor-pointer">
                                    تسجيل الخروج
                                </button>
                            </div>
                        ) : (
                            <NavLink to="/login" className="md:text-xl hover:text-brand transition-colors ">
                                تسجيل الدخول
                            </NavLink>
                        )}

                        <div className="relative p-3 border border-line rounded-lg cursor-pointer" onClick={() => navigate("/cart")}>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 10.5V6a3.75 3.75 0 1 0-7.5 0v4.5m11.356-1.993 1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 0 1-1.12-1.243l1.264-12A1.125 1.125 0 0 1 5.513 7.5h12.974c.576 0 1.059.435 1.119 1.007ZM8.625 10.5a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm7.5 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z" />
                            </svg>
                            <span className="absolute -top-3.25 -left-3.25 bg-brand text-white text-xs w-6 h-6 rounded-full flex items-center justify-center">
                                {quantity ?? '0'}
                            </span>
                        </div>
                    </div>
                </div>
            </div>

        </header>
    )
}

export default Header
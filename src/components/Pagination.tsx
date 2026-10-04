import { getPageNumbers } from "../utils/pagination"


type PaginationProps = {
    page: number;
    totalPages: number;
    onChange: (page: number) => void;
}

const baseBtn = "px-4 py-2 rounded-lg mx-1 enabled:cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed"

export const Pagination = ({ page, totalPages, onChange }: PaginationProps) => {


    if (totalPages <= 1) return null

    return (
        <div className="flex justify-center items-center mt-10">
            <button
                onClick={() => onChange(page - 1)}
                disabled={page === 1}
                className={`${baseBtn} bg-white text-ink`}
            >
                السابق
            </button>

            {getPageNumbers(page, totalPages).map((item, i) =>
                item === "..." ? (
                    <span key={`dots-${i}`} className="mx-1 text-gray-500">...</span>
                ) : (
                    <button
                        key={item}
                        onClick={() => onChange(item)}
                        className={`${baseBtn} ${page === item ? "bg-ink text-white" : "bg-white text-ink"}`}
                    >
                        {item}
                    </button>
                )
            )}

            <button
                onClick={() => onChange(page + 1)}
                disabled={page === totalPages}
                className={`${baseBtn} bg-white text-ink`}
            >
                التالي
            </button>
        </div>
    )
}

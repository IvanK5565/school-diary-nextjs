import ContainerContext from "@/client/ContainerContext";
import { useContext } from "react";

interface ILeftRightPaginatorProps {
    count: number;
    currPage: number;
    perPage: number;
    onLoadMore: (page: number, dir?:'next'|'prev') => void;
}

export default function LeftRight({
    count,
    currPage,
    perPage,
    onLoadMore,

}:ILeftRightPaginatorProps) {
    const di = useContext(ContainerContext);
    const t = di.resolve("t");
    const start = (currPage - 1) * perPage;
   

    const pageCount = count % (perPage ?? 1) == 0
        ? Math.trunc(count / (perPage ?? 1))
        : Math.trunc(count / (perPage ?? 1)) + 1

    const previousActive = currPage > 1;
    const nextActive = currPage < pageCount;

    const onPrevious = () => onLoadMore(currPage - 1, 'prev');
    const onNext = () => onLoadMore(currPage + 1, 'next');

    const disableStyle = 'bg-white text-gray-900';
    const activeStyle = 'bg-indigo-50 text-indigo-600 hover:bg-indigo-100';
    const nextClassName = nextActive ? activeStyle : disableStyle;
    const prevClassName = previousActive ? activeStyle : disableStyle;
    return (
        <nav
            className="flex items-center justify-between m-2"
            aria-label="Pagination"
        >
            <div className="hidden sm:block">
                <p className="text-sm text-gray-700">
                    {t("page-showing")}{" "}
                    <span className="font-medium">{start + 1}</span>{" "}
                    {t("page-to")}{" "}
                    <span className="font-medium">{start + perPage > count
                        ? count
                        : start + perPage}</span>{" "}
                    {t("page-of")} <span className="font-medium">{count}</span>{" "}
                    {t("page-results")}
                    
                    {/* <span className="font-semibold">
                        <span>{start + 1}</span>-
                        <span>
                            {start + perPage > count
                                ? count
                                : start + perPage}
                        </span>
                    </span>{' '} */}
                </p>
            </div>
            <div className="flex flex-1 justify-between sm:justify-end">
                <button
                    disabled={!previousActive}
                    onClick={onPrevious}
                    className={"rounded px-2 py-1 text-xs font-semibold shadow-sm" + prevClassName}
                >
                    {t("page-previous")}
                </button>
                <button
                    disabled={!nextActive}
                    onClick={onNext}
                    className={"rounded px-2 py-1 text-xs font-semibold shadow-sm" + nextClassName}
                >
                    {t("page-next")}
                </button>
            </div>
        </nav>
    );
}
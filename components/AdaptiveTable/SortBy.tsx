/* eslint-disable @typescript-eslint/no-unused-expressions */
import React, {JSX, useCallback, useEffect, useMemo, useState} from 'react';
import {IOptions, Sort} from '@/client/pagination/IPagerParams';
import {useTranslation} from 'react-i18next';

import {clickOutSideTheBlock} from '@/client/utils/random';
import {FaBars, FaSort, FaSortDown, FaSortUp} from '../FaIcons/icons';

export interface ISortOptions extends IOptions {
    dir: Sort;
}

interface ISortByProps {
    idSortBy: string;
    options: Array<ISortOptions>;
    changeSort: (field: string, dir: Sort) => void;
}

function SortBy(props: ISortByProps) {
    const {options, idSortBy, changeSort} = props;
    const {t} = useTranslation(['common']);

    const [isOpen, setIsOpen] = useState(false);

    const ACTION_MENU_ID = useMemo(() => `SortBy_${idSortBy}`, [idSortBy]);
    const windowClickSortBy = useCallback(
        (event: MouseEvent) => {
            isOpen &&
                !clickOutSideTheBlock(event, ACTION_MENU_ID) &&
                setIsOpen(false);
        },
        [ACTION_MENU_ID, isOpen],
    );

    useEffect(() => {
        window.addEventListener('click', windowClickSortBy);
        return () => {
            window.removeEventListener('click', windowClickSortBy);
        };
    }, [windowClickSortBy]);

    const switchIsOpen = useCallback(() => setIsOpen(!isOpen), [isOpen]);

    const onSortItemClick = useCallback(
        (option: ISortOptions) => {
            changeSort(option.value.toString(), option.dir);
        },
        [changeSort],
    );

    const SortByOptions = options?.map((option, i) => {
        const {label, dir: sort} = option;

        const activeSort =
            sort !== Sort.none ? 'text-yellow-600' : 'text-gray-200';

        return (
            <li
                key={`SortBy_${i}`}
                onClick={() => onSortItemClick(option)}
                className={`${activeSort} whitespace-nowrap
                flex flex-row justify-between items-center
                hover:text-gray-800 cursor-pointer`}>
                {label}
                {GetSortIcon(sort, 'mb-0.5 ml-3')}
            </li>
        );
    });

    const showSortByOptions = useMemo(
        () => SortByOptions?.length > 0,
        [SortByOptions?.length],
    );

    return (
        <>
            {' '}
            {showSortByOptions && (
                <div className="flex flex-col relative">
                    <div className="pl-2 cursor-pointer" onClick={switchIsOpen}>
                        <FaBars
                            className={`transform scale-105 hover:scale-120 ${
                                isOpen ? 'text-yellow-500' : 'text-gray-400'
                            } `}
                        />
                    </div>

                    {isOpen && (
                        <div
                            id={ACTION_MENU_ID}
                            className="mt-4 absolute top-0 right-0 z-25">
                            <div className="p-3 bg-white text-gray-200 rounded-md shadow-xl">
                                <p className="mb-1 text-gray-600 whitespace-nowrap">
                                    {t('common:sort-by')}
                                </p>

                                <ul className="flex flex-col space-y-1 list-none">
                                    {SortByOptions}
                                </ul>
                            </div>
                        </div>
                    )}
                </div>
            )}
        </>
    );
}

export const GetNextSort = (direction: Sort): Sort => {
    switch (direction) {
        case Sort.none:
            return Sort.ASC;
        case Sort.ASC:
            return Sort.DESC;
        default:
            return Sort.none;
    }
};

export const GetSortIcon = (direction: Sort, className = ''): JSX.Element => {
    switch (direction) {
        case Sort.none:
            return <FaSort className={className} />;
        case Sort.ASC:
            return <FaSortUp className={className} />;
        default:
            return <FaSortDown className={className} />;
    }
};

export default SortBy;

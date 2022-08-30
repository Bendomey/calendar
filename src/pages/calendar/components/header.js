import { useState } from 'react';

import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/20/solid';
import { format } from 'date-fns';

import { useEvent } from '../index';
import { AddEvent } from './add';

export function Header() {
  const { goToPrevMonth, goToNextMonth, activeDate } = useEvent();
  let [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <header className="relative z-20 flex items-center justify-between border-b border-gray-200 py-4 lg:flex-none">
        <h1 className="text-lg font-semibold text-gray-900">
          <time dateTime="2022-01">
            {format(new Date(activeDate), 'LLLL y')}
          </time>
        </h1>
        <div className="flex items-center">
          <div className="flex items-center rounded-md shadow-sm md:items-stretch mr-5">
            <button
              onClick={goToPrevMonth}
              type="button"
              className="flex items-center justify-center rounded-l-md border border-r-0 border-gray-300 bg-white py-2 pl-3 pr-4 text-gray-400 hover:text-gray-500 focus:relative md:w-9 md:px-2 md:hover:bg-gray-50"
            >
              <span className="sr-only">Previous month</span>
              <ChevronLeftIcon className="h-5 w-5" aria-hidden="true" />
            </button>
            <button
              type="button"
              className="hidden border-t border-b border-gray-300 bg-white px-3.5 text-sm font-medium text-gray-700 hover:bg-gray-50 hover:text-gray-900 focus:relative md:block"
            >
              {format(new Date(activeDate), 'LLLL')}
            </button>
            <span className="relative -mx-px h-5 w-px bg-gray-300 md:hidden" />
            <button
              onClick={goToNextMonth}
              type="button"
              className="flex items-center justify-center rounded-r-md border border-l-0 border-gray-300 bg-white py-2 pl-4 pr-3 text-gray-400 hover:text-gray-500 focus:relative md:w-9 md:px-2 md:hover:bg-gray-50"
            >
              <span className="sr-only">Next month</span>
              <ChevronRightIcon className="h-5 w-5" aria-hidden="true" />
            </button>
          </div>
          <div className="hidden md:flex md:items-center">
            <button
              onClick={() => setIsOpen(true)}
              type="button"
              className="flex items-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700"
            >
              Add Event
            </button>
          </div>
        </div>
      </header>
      <AddEvent isOpen={isOpen} setIsOpen={setIsOpen} />
    </>
  );
}

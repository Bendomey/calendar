import { createContext, Fragment, useContext, useState } from 'react';

import {
  format,
  startOfWeek,
  addDays,
  startOfMonth,
  endOfMonth,
  endOfWeek,
  subMonths,
  addMonths,
} from 'date-fns';

import { Day } from './components/day/index';
import { EditEvent } from './components/edit';
import { Header } from './components/header';

export const EventContext = createContext({});

export const useEvent = () => useContext(EventContext);

export default function Calendar() {
  const [events, setEvents] = useState({});

  const [selectedDate, setSelectedDate] = useState(new Date());
  const [activeDate, setActiveDate] = useState(new Date());
  const [openEdit, setOpenEdit] = useState(false);
  const [selected, setSelected] = useState(null);

  const getWeekDaysNames = () => {
    const weekStartDate = startOfWeek(activeDate);
    const weekDays = [];
    for (let day = 0; day < 7; day++) {
      weekDays.push(format(addDays(weekStartDate, day), 'E'));
    }
    return weekDays;
  };

  const generateDatesForCurrentWeek = (date, selectedDate, activeDate) => {
    let currentDate = date;
    const week = [];
    for (let day = 0; day < 7; day++) {
      const cloneDate = currentDate;
      week.push(
        <Day
          currentDate={cloneDate}
          setSelectedDate={setSelectedDate}
          day={day}
          activeDate={activeDate}
          selectedDate={selectedDate}
          events={events}
          setSelected={setSelected}
          setOpenEdit={setOpenEdit}
        />
        
      );
      currentDate = addDays(currentDate, 1);
    }
    return <>{week}</>;
  };

  const getDates = () => {
    const startOfTheSelectedMonth = startOfMonth(activeDate);
    const endOfTheSelectedMonth = endOfMonth(activeDate);
    const startDate = startOfWeek(startOfTheSelectedMonth);
    const endDate = endOfWeek(endOfTheSelectedMonth);

    let currentDate = startDate;

    const allWeeks = [];

    while (currentDate <= endDate) {
      allWeeks.push(
        <Fragment key={currentDate}>
          {generateDatesForCurrentWeek(currentDate, selectedDate, activeDate)}
        </Fragment>
      );
      currentDate = addDays(currentDate, 7);
    }

    return <>{allWeeks}</>;
  };

  const goToPrevMonth = () => setActiveDate(subMonths(activeDate, 1));

  const goToNextMonth = () => setActiveDate(addMonths(activeDate, 1));

  return (
    <>
      <EventContext.Provider
        value={{ events, setEvents, goToPrevMonth, goToNextMonth, activeDate }}
      >
        <div className="h-screen w-screen flex justify-center items-center">
          <div className="h-10/12 w-10/12">
            <div className="h-full">
              <Header setEvents={setEvents} />
              <div className="shadow ring-1 ring-black ring-opacity-5 lg:flex lg:flex-auto lg:flex-col">
                <div className="grid grid-cols-7 gap-px border-b border-gray-300 bg-gray-200 text-center text-xs font-semibold leading-6 text-gray-700 lg:flex-none">
                  {getWeekDaysNames().map((dayName) => (
                    <div key={dayName} className="bg-white py-2">
                      {dayName}
                    </div>
                  ))}
                </div>
                <div className="flex bg-gray-200 text-xs leading-6 text-gray-700 lg:flex-auto">
                  <div className="hidden w-full lg:grid lg:grid-cols-7 lg:grid-rows-5 lg:gap-px">
                    {getDates()}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <EditEvent isOpen={openEdit} setIsOpen={setOpenEdit} data={selected} />
      </EventContext.Provider>
    </>
  );
}

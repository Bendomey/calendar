import { useState, useEffect } from 'react';

import { Dialog } from '@headlessui/react';
import { format, isEqual } from 'date-fns';

import { useEvent } from '../../index';

export function EditEvent({ isOpen, setIsOpen, data }) {
  const { setEvents, events } = useEvent();
  const [title, setTitle] = useState('');
  const [date, setDate] = useState('');
  const [city, setCity] = useState('');

  useEffect(() => {
    if (data) {
      setTitle(data?.title);
      setDate(format(new Date(data?.datetime), "u-MM-dd'T'H':'mm"));
      setCity(data?.city);
    }
  }, [data]);

  const handleUpdateEvent = (e) => {
    e.preventDefault();

    let eventsClone = { ...events };
    const formattedDate = format(new Date(date), 'P');
    const formattedPrevDate = format(new Date(data?.datetime), 'P');

    // If date was touched, we need to update the location on the calendar
    if (formattedDate !== formattedPrevDate) {
      // Remove event from current date
      let newData = eventsClone[formattedPrevDate]?.filter(
        (currentEvent) =>
          !(
            currentEvent.title === data?.title &&
            currentEvent.city === data?.city &&
            isEqual(new Date(currentEvent.datetime), new Date(data?.datetime))
          )
      );
      eventsClone[formattedPrevDate] = newData;

      // Save event in new space.
      const dateToBeSavedIn = eventsClone[formattedDate];
      if (!dateToBeSavedIn) {
        eventsClone = { ...eventsClone, [formattedDate]: [] };
      }

      eventsClone[formattedDate].push({
        title,
        city,
        datetime: new Date(date),
      });
      setEvents(eventsClone);
    } else {
      // If date was not touched, we just update the details
      const newData = eventsClone[formattedDate].map((prev) =>
        prev.title === data?.title &&
        prev.city === data?.city &&
        isEqual(new Date(prev.datetime), new Date(data?.datetime))
          ? {
              title,
              city,
              datetime: new Date(date),
            }
          : prev
      );
      eventsClone[formattedDate] = newData;
      setEvents(eventsClone);
    }

    setIsOpen(false);
  };

  return (
    <>
      <Dialog
        className="relative z-1"
        open={isOpen}
        onClose={() => setIsOpen(false)}
      >
        <div className="fixed inset-0 flex items-center justify-center p-4 bg-white h-screen w-screen">
          <Dialog.Panel>
            <form
              onSubmit={handleUpdateEvent}
              className="space-y-8 divide-y divide-gray-200"
            >
              <div className="space-y-8 divide-y divide-gray-200 sm:space-y-5">
                <div>
                  <div>
                    <h3 className="text-lg leading-6 font-medium text-gray-900">
                      Event
                    </h3>
                    <p className="mt-1 max-w-2xl text-sm text-gray-500">
                      Take note that all fields are required to create an event
                    </p>
                  </div>

                  <div className="mt-6 sm:mt-5 space-y-6 sm:space-y-5">
                    <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5">
                      <label
                        htmlFor="username"
                        className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2"
                      >
                        Title
                      </label>
                      <div className="mt-1 sm:mt-0 sm:col-span-2">
                        <div className="max-w-lg flex rounded-md shadow-sm">
                          <input
                            type="text"
                            name="title"
                            required
                            maxLength={30}
                            id="title"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            className="max-w-lg block w-full shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:max-w-xs sm:text-sm border-gray-300 rounded-md"
                          />
                        </div>
                      </div>
                    </div>

                    <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5">
                      <label
                        htmlFor="username"
                        className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2"
                      >
                        Date
                      </label>
                      <div className="mt-1 sm:mt-0 sm:col-span-2">
                        <div className="max-w-lg flex rounded-md shadow-sm">
                          <input
                            type="datetime-local"
                            name="date"
                            required
                            id="date"
                            value={date}
                            onChange={(e) => setDate(e.target.value)}
                            className="max-w-lg block w-full shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:max-w-xs sm:text-sm border-gray-300 rounded-md"
                          />
                        </div>
                      </div>
                    </div>

                    <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5">
                      <label
                        htmlFor="username"
                        className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2"
                      >
                        City
                      </label>
                      <div className="mt-1 sm:mt-0 sm:col-span-2">
                        <div className="max-w-lg flex rounded-md shadow-sm">
                          <input
                            type="text"
                            name="city"
                            required
                            id="city"
                            autoComplete="given-name"
                            value={city}
                            onChange={(e) => setCity(e.target.value)}
                            className="max-w-lg block w-full shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:max-w-xs sm:text-sm border-gray-300 rounded-md"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="pt-5 flex justify-end">
                <div className="flex flex-row items-center ">
                  <div className="flex justify-end">
                    <button
                      type="button"
                      onClick={() => setIsOpen(false)}
                      className="ml-3 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    >
                      Cancel
                    </button>
                  </div>
                  <div className="flex justify-end">
                    <button
                      type="submit"
                      className="ml-3 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    >
                      Save
                    </button>
                  </div>
                </div>
              </div>
            </form>
          </Dialog.Panel>
        </div>
      </Dialog>
    </>
  );
}

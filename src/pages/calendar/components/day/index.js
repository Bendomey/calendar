import { format, isSameMonth, isSameDay } from 'date-fns';

import { classNames } from '../../../../components/classnames';

const truncate = (str, opts) => {
  if (str.length <= opts.length) {
    return str;
  }
  return str.slice(0, opts.length) + '...';
};

export function Day({
  currentDate,
  setSelectedDate,
  day,
  activeDate,
  selectedDate,
  events,
  setSelected,
  setOpenEdit,
}) {
  const dayEvents = events[format(new Date(currentDate), 'P')];

  return (
    <div
      onClick={() => {
        setSelectedDate(currentDate);
      }}
      key={day.date}
      className={classNames(
        isSameMonth(currentDate, activeDate)
          ? 'bg-white'
          : 'bg-gray-50 text-gray-500',
        'relative py-2 px-3'
      )}
    >
      <time
        dateTime={day.date}
        className={
          isSameDay(currentDate, selectedDate) ||
          isSameDay(currentDate, new Date())
            ? 'flex h-6 w-6 items-center justify-center rounded-full bg-indigo-600 font-semibold text-white'
            : undefined
        }
      >
        {format(currentDate, 'd')}
      </time>
      <ol className="mt-2 h-16">
        {dayEvents?.slice(0, 2).map((event) => (
          <li key={event.title}>
            <button
              onClick={() => {
                setSelected(event);
                setOpenEdit(true);
              }}
              className="group flex"
            >
              <p className="flex-auto truncate font-medium text-gray-900 group-hover:text-indigo-600">
                {truncate(event.title, { length: 15 })}
              </p>
              <time
                dateTime={new Date(event.datetime)}
                className="ml-3 hidden flex-none text-gray-500 group-hover:text-indigo-600 xl:block"
              >
                {format(new Date(event.datetime), 'p')}
              </time>
            </button>
          </li>
        ))}
        {dayEvents?.length > 2 && (
          <li className="text-gray-500">+ {dayEvents.length - 2} more</li>
        )}
      </ol>
    </div>
  );
}

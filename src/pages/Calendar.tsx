import React, { useState, useEffect } from 'react';
import { Calendar as CalendarIcon, Clock, Users, Plus } from 'lucide-react';
import DashboardLayout from '../components/Layout/DashboardLayout';
import AddEventModal from '../components/Calendar/AddEventModal';
import { useUser } from '../contexts/UserContext';
import { events } from '../lib/supabase';

interface Event {
  id: string;
  title: string;
  description?: string;
  event_date: string;
  event_time: string;
  type: string;
}

const Calendar: React.FC = () => {
  const { user } = useUser();
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [userEvents, setUserEvents] = useState<Event[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (user) {
      fetchEvents();
    }
  }, [user]);

  const fetchEvents = async () => {
    if (!user) return;
    
    setIsLoading(true);
    try {
      const { data, error } = await events.get(user.id);
      if (error) throw error;
      setUserEvents(data || []);
    } catch (error) {
      console.error('Error fetching events:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const daysInMonth = new Date(
    selectedDate.getFullYear(),
    selectedDate.getMonth() + 1,
    0
  ).getDate();

  const firstDayOfMonth = new Date(
    selectedDate.getFullYear(),
    selectedDate.getMonth(),
    1
  ).getDay();

  const days = Array.from({ length: daysInMonth }, (_, i) => i + 1);
  const previousMonthDays = Array.from({ length: firstDayOfMonth }, (_, i) => i);

  const getEventsForDate = (date: Date) => {
    return userEvents.filter(
      event =>
        new Date(event.event_date).getDate() === date.getDate() &&
        new Date(event.event_date).getMonth() === date.getMonth() &&
        new Date(event.event_date).getFullYear() === date.getFullYear()
    );
  };

  const changeMonth = (increment: number) => {
    setSelectedDate(
      new Date(selectedDate.getFullYear(), selectedDate.getMonth() + increment, 1)
    );
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Calendar</h1>
            <p className="mt-1 text-gray-600">Schedule and manage your recovery activities</p>
          </div>
          <button 
            onClick={() => setIsModalOpen(true)}
            className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            <Plus size={20} />
            <span>Add Event</span>
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Calendar */}
          <div className="lg:col-span-2 bg-white rounded-lg shadow-sm p-6">
            <div className="mb-4 flex items-center justify-between">
              <h2 className="text-lg font-semibold text-gray-900">
                {selectedDate.toLocaleString('default', { month: 'long', year: 'numeric' })}
              </h2>
              <div className="space-x-2">
                <button
                  onClick={() => changeMonth(-1)}
                  className="px-3 py-1 text-gray-600 hover:bg-gray-100 rounded"
                >
                  ←
                </button>
                <button
                  onClick={() => changeMonth(1)}
                  className="px-3 py-1 text-gray-600 hover:bg-gray-100 rounded"
                >
                  →
                </button>
              </div>
            </div>

            <div className="grid grid-cols-7 gap-1">
              {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
                <div key={day} className="text-center text-sm font-medium text-gray-600 py-2">
                  {day}
                </div>
              ))}

              {previousMonthDays.map(day => (
                <div
                  key={`prev-${day}`}
                  className="aspect-square p-2 text-center text-gray-400"
                >
                  {' '}
                </div>
              ))}

              {days.map(day => {
                const date = new Date(
                  selectedDate.getFullYear(),
                  selectedDate.getMonth(),
                  day
                );
                const dayEvents = getEventsForDate(date);
                const isToday =
                  date.toDateString() === new Date().toDateString();

                return (
                  <div
                    key={day}
                    className={`aspect-square p-2 border border-gray-100 ${
                      isToday ? 'bg-blue-50' : ''
                    }`}
                  >
                    <div className="text-sm font-medium text-gray-900">{day}</div>
                    {dayEvents.length > 0 && (
                      <div className="mt-1">
                        <div className="h-1.5 w-1.5 bg-blue-600 rounded-full" />
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Events List */}
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Upcoming Events</h2>
            <div className="space-y-4">
              {isLoading ? (
                <div className="text-center text-gray-500">Loading events...</div>
              ) : userEvents.length === 0 ? (
                <div className="text-center text-gray-500">No upcoming events</div>
              ) : (
                userEvents.map(event => (
                  <div
                    key={event.id}
                    className="p-4 border border-gray-100 rounded-lg space-y-3"
                  >
                    <div className="flex items-start justify-between">
                      <div>
                        <h3 className="font-medium text-gray-900">{event.title}</h3>
                        <div className="mt-1 space-y-1">
                          <div className="flex items-center text-sm text-gray-600">
                            <CalendarIcon size={16} className="mr-2" />
                            {new Date(event.event_date).toLocaleDateString()}
                          </div>
                          <div className="flex items-center text-sm text-gray-600">
                            <Clock size={16} className="mr-2" />
                            {event.event_time}
                          </div>
                          <div className="flex items-center text-sm text-gray-600">
                            <Users size={16} className="mr-2" />
                            {event.type}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </div>

      <AddEventModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onEventAdded={fetchEvents}
        selectedDate={selectedDate}
      />
    </DashboardLayout>
  );
};

export default Calendar; 
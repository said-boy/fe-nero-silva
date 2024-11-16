import { useState } from 'react';
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid' // a plugin!
import interactionPlugin from '@fullcalendar/interaction';

export default function Calendar({ plan }) {

  if (plan == [] || typeof plan == 'undefined') {
    return <div>Loading...</div>
  }

  const events = [];

  plan.forEach((planItem) => {
    planItem.planting.forEach((plantingItem) => {
      events.push({
        time: plantingItem.timeofday,
        plant: planItem.plant.name,
        title: plantingItem.actifity,
        date: new Date(new Date(planItem.started_at).setDate(new Date(planItem.started_at).getDate() + plantingItem.day)).toISOString().split("T")[0],
      });
    });
  });

  const [clickedDateEvents, setClickedDateEvents] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleDateClick = (info) => {
    const eventsForDate = events.filter(event => event.date === info.dateStr);
    setClickedDateEvents(eventsForDate);
    setIsModalOpen(true);
  };

  const closeModal = () => setIsModalOpen(false);

  return (
    <div className='relative'>
      <div style={{ display: isModalOpen ? 'block' : 'none' }} className='absolute z-20 bg-slate-300/50 rounded-xl backdrop-blur-sm w-full h-full'>
      </div>
      <FullCalendar
        plugins={[dayGridPlugin, interactionPlugin]}
        initialView="dayGridMonth"
        events={events}
        dateClick={handleDateClick}
        dayMaxEvents={1}
      />

      {/* Modal */}

      <div className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white shadow-sm rounded-xl z-50' style={{ display: isModalOpen ? 'block' : 'none' }}>
        <h2 className='bg-[#5C8D89] text-white font-bold font-HelveticaNeueBold rounded-t-xl p-2'>
          <div className='flex justify-between gap-20'>
            <span>Kegiatan pada {clickedDateEvents[0]?.date}</span>
            <span><button onClick={closeModal}>Tutup</button></span>
          </div>
        </h2>

        <div className='border'>
          {clickedDateEvents.length > 0 ? (
            <ul>
              {clickedDateEvents.map((event, index) => (
                <li className='p-2 text-wrap' key={index}>{event.time} - {event.plant} <br /> {event.title} <hr></hr></li>
              ))}
            </ul>
          ) : (
            <p className='p-2'>Tidak ada jadwal hari ini, saatnya meluangkan waktu mu untuk menyelamatkan dunia</p>
          )}
        </div>
      </div>
    </div>
  )
}
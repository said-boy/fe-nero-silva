import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid' // a plugin!
import './../calender.css'

export default function Calendar() {
  return (
    <FullCalendar
      initialView="dayGridMonth"
      plugins={[ dayGridPlugin ]}
      headerToolbar={{
        start: "prev,next",
        center: "",
        end: "title"
      }}
    />
  )
}
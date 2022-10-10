import React from 'react'
import { Calendar, DateLocalizer, momentLocalizer } from 'react-big-calendar'
import moment from 'moment'
import { events } from '../data/data'
import 'react-big-calendar/lib/css/react-big-calendar.css'

const EventCalendarPage: React.FC = () => {
    const localizer: DateLocalizer = momentLocalizer(moment)
    return (
        <div style={{ height: '600px', width: '100%' }}>
            <Calendar
                events={events}
                startAccessor="start"
                endAccessor="end"
                defaultDate={moment().toDate()}
                localizer={localizer}
            />
        </div>
    )
}

export default EventCalendarPage

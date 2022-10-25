import React, { useCallback, useState } from 'react'
import {
    Calendar,
    DateLocalizer,
    momentLocalizer,
    SlotInfo,
} from 'react-big-calendar'
import moment from 'moment'
import { eventsData, Events } from '../data/data'
import 'react-big-calendar/lib/css/react-big-calendar.css'
import { FcInfo } from 'react-icons/fc'
import { ImCross } from 'react-icons/im'
import {
    BsHourglassBottom,
    BsHourglassTop,
    BsHourglassSplit,
} from 'react-icons/bs'
import { AiFillDelete } from 'react-icons/ai'

const EventCalendarPage: React.FC = () => {
    const localizer: DateLocalizer = momentLocalizer(moment)

    const [events, setEvents] = useState<Events[]>(eventsData)
    const [title, setTitle] = useState<string>('')
    const [isHovering, setIsHovering] = useState<boolean>(false)
    const [showDetails, setShowDetails] = useState<boolean>(false)
    const [eventDetails, setEventDetails] = useState<any>(null)

    const handleSelectSlot = useCallback(
        ({ start, end }: SlotInfo) => {
            const id: number = events.length + 1
            if (title) {
                setEvents((prev: Events[]) => [
                    ...prev,
                    { id, start, end, title },
                ])
            }
            setTitle('')
        },
        [events, title],
    )

    const handleSelectEvent = useCallback((event: Events) => {
        setEventDetails(event)
        setShowDetails(true)
    }, [])

    const handleDeleteEvent = (id: number) => {
        setEvents(events.filter((event) => event.id !== id))
    }

    return (
        <div style={{ height: '600px', width: '100%' }}>
            <div className="wrapper-event">
                <input
                    type="input"
                    placeholder="Enter an event"
                    className="input-event"
                    value={title}
                    id="event"
                    onChange={(e) => setTitle(e.target.value)}
                />
                <label htmlFor="event" className="label-event">
                    Enter an event
                </label>
                <div
                    className="info-event-container"
                    onMouseOver={() => setIsHovering(true)}
                    onMouseOut={() => setIsHovering(false)}
                >
                    <FcInfo className="icon-info" />
                    {isHovering && (
                        <div className="info-event">
                            Enter the name of the event here and select a place
                            on the calendar to add the event.
                        </div>
                    )}
                </div>
            </div>
            {showDetails ? (
                <div className="event-details">
                    <div className="event-details-content">
                        <div className="event-details-header">
                            <h3>Event Details</h3>
                        </div>
                        <div>{eventDetails.title}</div>
                        {eventDetails.start.toLocaleString() ===
                        eventDetails.end.toLocaleString() ? (
                            <div>
                                <BsHourglassSplit className="event-details-icon" />
                                {eventDetails.start.toDateString()}
                            </div>
                        ) : (
                            <>
                                <div>
                                    <BsHourglassTop className="event-details-icon" />
                                    {eventDetails.start.toLocaleString()}
                                </div>
                                <div>
                                    <BsHourglassBottom className="event-details-icon" />
                                    {eventDetails.end.toLocaleString()}
                                </div>
                            </>
                        )}
                        <div className="event-details-buttons">
                            <div
                                className="event-details-close"
                                onClick={() => setShowDetails(false)}
                            >
                                <ImCross className="event-details-icon" /> Close
                            </div>
                            <div
                                className="event-details-delete"
                                onClick={() => {
                                    handleDeleteEvent(eventDetails.id)
                                    setShowDetails(false)
                                }}
                            >
                                <AiFillDelete className="event-details-icon" />
                                Delete
                            </div>
                        </div>
                    </div>
                </div>
            ) : null}
            <Calendar
                events={events}
                startAccessor="start"
                endAccessor="end"
                defaultDate={moment().toDate()}
                localizer={localizer}
                onSelectSlot={handleSelectSlot}
                onSelectEvent={handleSelectEvent}
                selectable
                formats={{
                    agendaHeaderFormat: ({ start, end }) =>
                        moment(start).format('DD.MM.YYYY') +
                        ' - ' +
                        moment(end).format('DD.MM.YYYY'),

                    agendaTimeRangeFormat: ({ start, end }) =>
                        moment(start).format('HH:mm') +
                        ' - ' +
                        moment(end).format('HH:mm'),

                    agendaTimeFormat: (date) => moment(date).format('HH:mm'),
                    timeGutterFormat: (date) => moment(date).format('HH:mm'),
                }}
                messages={{
                    previous: 'Previous period',
                    next: 'Next period',
                }}
            />
        </div>
    )
}

export default EventCalendarPage

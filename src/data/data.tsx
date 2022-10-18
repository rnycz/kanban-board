import { BsKanban } from 'react-icons/bs'
import { VscCalendar } from 'react-icons/vsc'

type Links = {
    name: string
    icon: JSX.Element
}
export type Events = {
    id: number
    title: string
    allDay?: boolean
    start: Date
    end: Date
}

// array of links to map them in sidebar
export const links: Links[] = [
    {
        name: 'kanban-board',
        icon: <BsKanban />,
    },
    {
        name: 'event-calendar',
        icon: <VscCalendar />,
    },
]

// array of events to display them in event calendar
export const eventsData: Events[] = [
    {
        id: 1,
        title: 'All day task',
        allDay: true,
        start: new Date(),
        end: new Date(),
    },
    {
        id: 2,
        title: 'Test task 1',
        start: new Date(new Date().setHours(new Date().getHours() - 3)),
        end: new Date(new Date().setHours(new Date().getHours() + 3)),
    },

    {
        id: 3,
        title: 'Test task 2 long text to test it',
        start: new Date(new Date().setHours(new Date().getHours() - 1)),
        end: new Date(new Date().setHours(new Date().getHours() + 1)),
    },
    {
        id: 4,
        title: 'Test task 3',
        start: new Date(
            new Date(new Date(new Date().setHours(10)).setMinutes(30)).setDate(
                new Date().getDate() + 2,
            ),
        ),
        end: new Date(
            new Date(new Date(new Date().setHours(11)).setMinutes(30)).setDate(
                new Date().getDate() + 2,
            ),
        ),
    },
    {
        id: 5,
        title: 'Test task 4',
        start: new Date(new Date().setDate(new Date().getDate() + 1)),
        end: new Date(new Date().setDate(new Date().getDate() + 3)),
    },
    {
        id: 6,
        title: 'Test task 5',
        start: new Date(
            new Date(new Date(new Date().setHours(15)).setMinutes(0)).setDate(
                new Date().getDate() + 2,
            ),
        ),
        end: new Date(
            new Date(new Date(new Date().setHours(16)).setMinutes(0)).setDate(
                new Date().getDate() + 2,
            ),
        ),
    },
]

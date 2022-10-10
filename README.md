# Kanban Board

An application used to manage your tasks.<br />
Built with React, TypeScript, SCSS<br />
In order to work well with this application, you need to clone the API from this [repo](https://github.com/rnycz/kanban-board-api) created specifically for this project and follow the steps to set it up. If not, you can continue in offline mode, but if you close the application, the progress will not be saved. <br />
Event calendar thanks to [React Big Calendar](http://jquense.github.io/react-big-calendar/examples/?path=/story/about-big-calendar--page) <br />
Notifications thanks to [React Toastify](https://www.npmjs.com/package/react-toastify) <br />
Calendar (date picker) thanks to [React Calendar](https://www.npmjs.com/package/react-calendar) <br />
The following features have been implemented:

-   Enter the task, set the color and proposed end date for the task
-   Drag'n'drop elements between columns
-   Edit a task (color, text, finish task date), delete or mark as done
-   Notifications e.g. successfully edited a task
-   Sidebar with toggle button (dark/light mode for task cards) and random joke
-   Random joke fetched from [Dev Joke API](https://documenter.getpostman.com/view/16443297/TzkyLee7)
-   Tasks fetched from [custom API](https://github.com/rnycz/kanban-board-api). Performing operations in the application causes changes in the database, e.g. adding a new task or deleting a task
-   Offline mode
-   Event calendar (working on it)

TODO: user can add events to calendar, calendar styles

## Installation and Setup Instructions

Clone down this repository:

```bash
git clone https://github.com/rnycz/kanban-board.git
```

Make sure that you are in your root folder of application.<br />
Installation:

```bash
npm install
```

Start Server:

```bash
npm start
```

Visit App:

```bash
http://localhost:3000/
```

## Project Screenshots

Kanban Board <br />
![](./public/app-screen1.PNG) <br />
Add New Task modal window below <br />
![](./public/app-screen2.PNG) <br />
Sidebar with toggle button, random joke and nav links <br />
![](./public/app-screen3.PNG) <br />
Event calendar <br />
![](./public/app-screen4.PNG)

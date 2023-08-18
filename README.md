# MeetingMinutes

MeetingMeetings is an application designed for my team and I to better manage, organize, and view our meetings. As meetings are the key focus, users can create, update, and delete meetings. The meetings can then be viewed in ways such as a table, a calendar, and more. There are also graphs and charts available for data analytic purposes, such as the frequency of meetings or the frequency of meeting categories.

Disclaimer: The public version is seeded with fake data for purposes of a demo to respect privacy of AppAcademy and its affiliates. 

### [Live link](https://meeting-minutes-95bb945cb360.herokuapp.com/)

## Features

----------------------------------------------------------------------------------

### Meetings

--------------------------------------------------------------------------------

The project uses PostgreSQL for the database, and uses Ruby's ActiveRecord to make associations between tables. In ActiveRecord terms, meetings belong to a user and a student. When rendering meetings in a table, I wanted to get the relevant student's information as well. The easiest way would have been to make a joins table and query for the student when I queried for the meeting. While this would work, I would be making a N+1 query (query to find meeting and another to find the associated student), which is inefficient. Instead, I opted to make separate queries, one for the meetings, another for the student, and then find the associated student and pull the relevant information effectively increasing efficiency. 


### Calendar

---------------------------------------------------------------------------

The project heavily uses MUI (a React component library). Creating a calendar for a meetings application made a lot of sense. MUI does come with a calendar, but in a separate module from other components. Rendering a calendar component was easy, but marking relevant dates was a bit more challenging. To do so, I had to prepick dates in another component and pass it into the calendar component, creating an overlay of sorts. In addition making sure marked dates were correct was another challenge, but using the correct vanilla Javascript date conversions did the trick.


### Charts

-------------------------------------------------------------------------------

Visualization of meeting data was another part of the project. One way to do so was with charts. I used Chart.js for this. The challenge here was making charts responsive. As Chart.js uses canvas to render charts, I could not directly style the chart component. A chart's responsiveness was dependent on its parent component, so creating a container for the chart and styling that instead did the trick.

## Technologies

----------------------------------------------------------------------

The following technologies were used for this project:

* **TypeScript, Ruby, JavaScript**: Languages
* **Ruby on Rails**: Backend
* **React, Redux**: Frontend
* **PostgreSQL**: Database
* **Material UI**: Styling
* **Chart.js**: Charts
* **Webpack, Babel, React on Rails**: Bundling and transpiling javascript code
* **Node.js**: Managing project dependencies

## Future

-------------------------------------------------------------

* More customization (charts, categories, etc)
* More practical applications
* Draggable components (pins)
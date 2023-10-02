## Assumptions

To create an application that searchs patents from the USPTO API and displays them in a table format. This UI should have a single search box and two filters:

- `Publication from date`
- `Publication to date`

## Notes

My approach was to create an header with the search bar and the filters. When the user types the value in the search bar and adds filters, the app will make an API call with the query parameters.

Few considerations, case covered:

- I have used useLocation from the react-router-dom to put the query parameters state in the URL. In this way we can benefit from the fact that we have one single source of truth and we can share the link with the search results, we don't loose the query params every time we reload the page etc.
- I don't make the extra API calls unless the query params change or are valid (e.g. no search if the search field is empty or if the value is the same as before - same for the filters).
- On page load if there are query params in the URL, the app will fetch the results and display them.
- Added some responsiveness but definitely the table with the results can be improved (e.g. using cards on mobile and having a load more or pagination) in order to give a better experience on smaller devices.
- Added some error handling:
  - If the user doesn't type anything.
  - The search value is an empty space.
  - The search doesn't return any results.
- For the style I have used CSS and module classes.
- Ideally each table row can be clicckable and open the patent's page/modal with its details.
- I had to create an express server to resolve some annoying CORS issues when calling the API.
- The SearchBar component is the one that has more logic. I added comments in there to describe at my best what is happing

A complete list of 3rd party libraries can of course be found in the package.json file.

## Instructions

To run application:

> If it's the first time, then run - `npm install`

> Run the command - `npm run start` [it will run both the localhost for FE and BE]

Then open http://localhost:5173/ to see the app.

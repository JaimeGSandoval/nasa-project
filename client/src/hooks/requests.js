// const API_URL = 'http://localhost:8000/v1'; use for local development
const API_URL = 'v1'; // use for production
// we 'll eventually be running our nasa project in the cloud, so we need to update all of our urls that point to localhost to make sure that they work regardless of where we're running our server. Now that our api might be hosted in the cloud or some other domain or ip address that's not localhost, we change the api url to be relative to where the client is hosted, so we just leave the v1 path for version 1 of our api. Now our client will know that it should make requests to the api that's liviing on the same address at the same origin as the frontend. We're serving both the frontend client as well as the server using the same node application. The api and our frontend ae both hosted on the same server, regardless of whether it's localhost or some other domain.

// Load planets and return as JSON
async function httpGetPlanets() {
  const response = await fetch(`${API_URL}/planets`);
  return response.json();
}

// Load launches, sort by flight number, and return as JSON.
async function httpGetLaunches() {
  const response = await fetch(`${API_URL}/launches`);
  const fetchedLaunches = await response.json();
  return fetchedLaunches.sort((a, b) => a.flightNumber - b.flightNumber);
}

// Submit given launch data to launch system.
async function httpSubmitLaunch(launch) {
  try {
    return await fetch(`${API_URL}/launches`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(launch),
    });
  } catch (err) {
    console.log(err);
    return {
      ok: false,
    };
  }
}

// Delete launch with given ID.
async function httpAbortLaunch(id) {
  try {
    return await fetch(`${API_URL}/launches/${id}`, {
      method: 'DELETE',
    });
  } catch (err) {
    console.log(err);
    return {
      ok: false,
    };
  }
}

export { httpGetPlanets, httpGetLaunches, httpSubmitLaunch, httpAbortLaunch };

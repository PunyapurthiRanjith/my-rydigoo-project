# Rydigoo MVP



A simple ride-booking demo app built with React + Vite. Runs fully on localhost — **no Google Maps, no billing, no credit card**.



## Features



- Home page with services overview

- User registration and login (json-server backend)

- Book a ride with address autocomplete (OpenStreetMap / Photon) — **India only**

- Route map with distance and duration (Leaflet + OSRM — free)

- Simple payment screen with mock checkout



## Quick Start



```bash

npm install

npm start

```



This runs both:

- **Frontend** → http://localhost:5173

- **API (json-server)** → http://localhost:3000



No API keys are required for maps or routing. Everything works out of the box.



## Demo Login



| Field    | Value                 |

|----------|-----------------------|

| Username | `Ranjith03`           |

| Password | `@Ranjithkumar123`    |



Or register a new account from the home page.



## App Flow



1. **Home** → Register or Login

2. **Login** → Enter credentials

3. **Book Ride** → Search From and To in India (pick from suggestions)

4. **Route** → View map, distance, duration → Book Ride

5. **Payment** → Choose payment method → Pay → Success



## Maps Stack (100% free)



| Need | Service | Key required? |

|------|---------|---------------|

| Address search | [Photon](https://photon.komoot.io/) (OpenStreetMap) | No |

| Map display | [Leaflet](https://leafletjs.com/) + OpenStreetMap tiles | No |

| Routing | [OSRM](https://project-osrm.org/) public API | No |



### Optional: OpenRouteService key



For slightly better routing limits, you can add a free key (no credit card):



1. Sign up at https://openrouteservice.org/dev/#/signup

2. Copy `.env.example` to `.env`

3. Paste your key: `VITE_OPENROUTESERVICE_API_KEY=your_key_here`



If not set, OSRM is used automatically.



## Scripts



| Command       | Description                          |

|---------------|--------------------------------------|

| `npm start`   | Run frontend + API together          |

| `npm run dev` | Frontend only (port 5173)            |

| `npm run server` | API only (port 3000)              |

| `npm run build` | Production build                   |



## Notes



- **India-only service:** pickup, drop, GPS, search, and routing are restricted to locations within India to avoid cross-country transport conflicts.

- Pick addresses from the dropdown suggestions for best route results.

- Registration requires username with a capital letter + number, `@gmail.com` email, valid Indian mobile, and password with special char + number.

- User data is stored in `src/db.json` via json-server.

- OSRM public server is for demo/localhost use only (not for high-traffic production).



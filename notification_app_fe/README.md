# AffordMed Campus Notifications Frontend

React + Vite frontend for the AffordMed Campus Notifications evaluation API.

## Features

- Shows all notifications from the evaluation API.
- Separate priority notifications page.
- Filters by `Placement`, `Result`, and `Event`.
- Highlights unread notifications.
- Marks notifications as viewed using `localStorage`.
- Uses Axios with Authorization Bearer token.
- Uses Material UI for all layout and styling.
- Responsive desktop and mobile interface.

## Install

```bash
cd notification_app_fe
npm install
```

## Run

```bash
npm run dev
```

The app runs at:

```txt
http://localhost:3000
```

## Build

```bash
npm run build
```

## API Configuration

Create a `.env` file in `notification_app_fe` using `.env.example`:

```txt
VITE_AFFORDMED_EMAIL=your_email@example.com
VITE_AFFORDMED_NAME=your_name
VITE_AFFORDMED_ROLL_NO=your_roll_no
VITE_AFFORDMED_ACCESS_CODE=your_access_code
VITE_AFFORDMED_CLIENT_ID=your_client_id
VITE_AFFORDMED_CLIENT_SECRET=your_client_secret
VITE_AFFORDMED_ACCESS_TOKEN=
```

`VITE_AFFORDMED_ACCESS_TOKEN` is optional. If it is empty, the app requests
a fresh token from the auth API before loading notifications.

# Dhun Jam Resto-Bar Song Request System

Below is an overview of the key features and functionalities that have been implemented, along with the technologies employed in the development process.

## Technologies Used

The following technologies were employed in the development of this project:

- React
- SCSS
- Axios
- react-hook-form
- Yup
- Recharts
- Radix UI for radio input
- React Hot Toast

## Screens and API Endpoints

### Screen 1: Admin Login

- **Endpoint:** (POST) `/admin/login`
- **Description:** Used when the "Sign in" button is clicked.
- **Credentials:** Username: DJ@4, Password: Dhunjam@2023.

### Screen 2: Admin Dashboard

- **Endpoint:** (GET) `/admin/details`
- **Description:** Used for getting data on Screen 2.
- **On Landing:** Save the ID from the successful login response. Use this ID in the "GET Admin – Details" endpoint call to fetch Screen 2 data.

- **Endpoint:** (PUT) `/admin/price-update`
- **Description:** Used to save newly entered price amounts.
- **After Update:** Call "GET Admin- Details" again to fetch the updated prices to be displayed on Screen 2.
- **Note:** If the Save button is greyed out, no API call is made.

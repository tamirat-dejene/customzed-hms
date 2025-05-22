# 🏨 Hotel Management System

A customized Hotel Management System built for **Advanced Software Project Management** group project.

Enhancements include:
- Support for 2 local languages (Amharic, Afaan Oromo)
- AI-powered assistant agent for admin tasks

<br />
## 🙏 Acknowledgements

This project is based on an open-source hotel management system by [Sudeep Mahato].

Original Repository: [https://github.com/sudeepmahato16/the-wild-oasis.git](https://github.com/sudeepmahato16/the-wild-oasis.git)

Thanks to the original creator for providing the foundation.
<br />

## Features

1. **User Authentication and Signup:**

   1. Hotel employees can log in to the application to perform tasks.
   2. New users can only be signed up within the application to ensure that only actual hotel employees can create accounts.

2. **User Profile Management:**

   1. Users can upload an avatar to personalize their profile.
   2. Users can change their name and password.

3. **Cabin Management:**

   1. The app provides a table view with all cabins.
   2. The table view displays cabin information, including cabin photo, name, capacity, price, and current discount.
   3. Users can update or delete existing cabins.
   4. Users can create new cabins, including the ability to upload a photo.

4. **Booking Management:**

   1. The app provides a table view with all bookings.
   2. The table view displays booking information, including arrival and departure dates, booking status, paid amount, cabin details, and guest data.
   3. Booking status can be "unconfirmed," "checked in," or "checked out."
   4. The table view is filterable by booking status.
   5. Additional booking data includes the number of guests, number of nights, guest observations, and whether breakfast was booked and its price.

5. **Booking Operations:**

   1. Users can delete, check in, or check out a booking as the guest arrives.
   2. On check-in, users can accept payment outside the app and then confirm the payment within the app.
   3. Guests can add breakfast for the entire stay during check-in if they haven't already.

6. **Guest Data Management:**

   1. Guest data contains full name, email, national ID, nationality, and a country flag for easy identification.

7. **Dashboard:**

   1. The initial app screen serves as a dashboard displaying important information for the last 7, 30, or 90 days.
   2. It shows a list of guests checking in and out on the current day, and users can perform tasks related to these activities from the dashboard.
   3. The dashboard provides statistics on recent bookings, sales, check-ins, and occupancy rates.
   4. It includes a chart showing all daily hotel sales, distinguishing between "total" sales and "extras" sales (only breakfast at present).
   5. There's also a chart displaying statistics on stay durations, an important metric for the hotel.

8. **Application-wide Settings:**

   1. Users can define application-wide settings such as breakfast price, minimum and maximum nights per booking, and maximum guests per booking.

9. **Dark Mode:**
   1. The app includes a dark mode option for a different visual appearance and enhanced user experience in low-light conditions.

<br/>

## Installation

- Clone the repository:

  ```
  git clone https://github.com/tamirat-dejene/customized-hms.git
  ```

- Navigate to the project directory:

  ```
  cd customized-hms
  ```

- Install the dependencies:

  ```
  npm install
  ```

- Set up the environment variables:

  1.  Create a `.env` file in the root directory.

  2.  Add the following variables to the .env file, replacing the placeholder values with your own:

  ```
  DATABASE_URL=<your-mongodb-uri>
  NEXTAUTH_SECRET=<your-nextauth-secret>
  NEXT_PUBLIC_CLOUDINARY_KEY=<your-cloudinary-cloud-name>
  GEMINI_API_KEY=<your-gemini-api-key>
  ```

- Seed the database
  
   ```
   npm run db:seed
   ```

<br/>

## Usage

- Start the development server:

   ```
   npm run dev
   ```

- Open your browser and visit `http://localhost:3000` to access the application.

<br/>

## Contributing

Contributions are welcome! If you want to contribute to this project, please follow these steps:

- Fork the repository.
- Create a new branch for your feature or bug fix.
- Commit your changes to the new branch.
- Open a pull request back to the main repository, including a description of your changes.

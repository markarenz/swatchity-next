# Swatchity (NextJS)

## Background

Swatchity is a social media web app where you can only post colors. You can search colors. Message other users with colors. You can reply to colors with other colors. It's not mean to be taken seriously.

## Under the Hood

The project is built in NextJS and leverages server-side and client-side rendering. We use NextAuth for authentication. The app uses Prisma as the ORM and connects to Atlas Mongo DBaaS.

Fun fact: this is a remake of a project I made back in 2014. Back then I used PHP and vanilla Javascript. It runs fine in a containerized environment, but it would not be a good idea to deploy it

## Environment Variables

- The following env vars are necessary to run the application:
  - MONGODB_URI
  - NEXTAUTH_SECRET=YOUR_NEXT_AUTH_SECRET
  - GITHUB_ID=GITHUB_ID
  - GITHUB_SECRET
  - GOOGLE_CLIENT_ID
  - GOOGLE_CLIENT_SECRET
  - TWITCH_CLIENT_ID
  - TWITCH_CLIENT_SECRET
  - WEBSITE_URL
  - NEXT_PUBLIC_GOOGLE_ANALYTICS_PROPERTY_ID
  - NEXT_PUBLIC_GOOGLE_ANALYTICS_DATA_STREAM_ID

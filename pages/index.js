import React from "react";
import MeetupList from "../components/meetups/MeetupList";
import { MongoClient } from "mongodb";
import Head from "next/head";

const HomePage = (props) => {
  return (
    <>
      <Head>
        <title>My NextJs Project</title>
        <meta name="description" content="Browse a huge list here!" />
      </Head>
      <MeetupList meetups={props.meetups} />
    </>
  );
};

export async function getStaticProps() {
  // fetch data from an API
  const client = await MongoClient.connect(
    "mongodb+srv://arumugaselvam23052003:upNHtSHxrCnpZtqf@cluster0.c3kmlvl.mongodb.net/?retryWrites=true&w=majority"
  );
  const db = client.db();
  const meetupsCollection = db.collection("meetups");

  const meetups = await meetupsCollection.find().toArray();

  client.close();
  return {
    props: {
      meetups: meetups.map((meetup) => ({
        title: meetup.title,
        address: meetup.address,
        image: meetup.image,
        id: meetup._id.toString(),
      })),
    },
    // with this we can unlock feature called incremental Static Generation.
    // with below code every 10 seconds if there are requests coming in for this page.
    // This regenerated pages would replace old pre-generated pages.
    revalidate: 10,
  };
}

export default HomePage;

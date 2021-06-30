import Head from 'next/head';
import { MongoClient } from 'mongodb';
import MeetupList from '../components/meetups/MeetupList';

function HomePage(props) {
    return (
        <>
            <Head>
                <title>Meetups</title>
                <meta name="description" content="Browse a huge list of meetups" />
            </Head>
            <MeetupList meetups={props.meetups} />
        </>
    );
}

export async function getStaticProps() {
    const client = await MongoClient.connect('mongodb+srv://igor:spellbound@cluster0.vtkas.mongodb.net/meetups?retryWrites=true&w=majority');
    const db = client.db();

    const meetupsCollection = db.collection('meetups');

    const meetups = await meetupsCollection.find().toArray();

    client.close();
    return {
        props: {
            meetups: meetups.map(meetup => ({
                id: meetup._id.toString(),
                title: meetup.title,
                image: meetup.image,
                address: meetup.address,
            })) 
        },
        revalidate: 1
    }
}

// export async function getServerSideProps(context) {
//     const req = context.req;
//     const res = context.res;
//
//     return {
//         props: {
//             meetups: MEETUPS
//         }
//     }
// }

export default HomePage;
import Head from 'next/head';
import { MongoClient, ObjectId } from 'mongodb';
import MeetupDetail from '../../components/meetups/MeetupDetail';

function MeetupDetails(props) {
    return (
        <>
            <Head>
                <title>{props.title}</title>
                <meta name="description" content={props.description} />
            </Head>
            <MeetupDetail
                image={props.image}
                title={props.title}
                address={props.address}
                description={props.description}
            />
        </>
    );
}

export async function getStaticPaths() {
    const client = await MongoClient.connect('mongodb+srv://igor:spellbound@cluster0.vtkas.mongodb.net/meetups?retryWrites=true&w=majority');
    const db = client.db();

    const meetupsCollection = db.collection('meetups');
    
    const meetups = await meetupsCollection.find({}, { _id: 1 }).toArray();

    client.close();

    return {
        paths: meetups.map(meetup => ({ params: { meetupId: meetup._id.toString() } })),
        fallback: false
    }
}

export async function getStaticProps(context) {
    const meetupId = context.params.meetupId;

    const client = await MongoClient.connect('mongodb+srv://igor:spellbound@cluster0.vtkas.mongodb.net/meetups?retryWrites=true&w=majority');
    const db = client.db();

    const meetupsCollection = db.collection('meetups');
    
    const meetup = await meetupsCollection.findOne({ _id: ObjectId(meetupId) });

    client.close();

    return {
        props: { ...meetup, _id: meetup._id.toString() },
        revalidate: 1
    }
}

export default MeetupDetails;
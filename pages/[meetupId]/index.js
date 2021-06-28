import MeetupDetail from '../../components/meetups/MeetupDetail';

function MeetupDetails() {
    return (
        <MeetupDetail
            image="https://i.imgur.com/mCbaca8.jpeg"
            title="First meetup"
            address="Mulholland dr."
            description="Meetup description"
        />
    );
}

export async function getStaticProps(context) {
    const meetupId = context.params.meetupId;

    return {
        props: {
            meetup: {
                id: meetupId,
                image: "https://i.imgur.com/mCbaca8.jpeg",
                title: "First meetup",
                address: "Mulholland dr.",
                description: "Meetup description"
            }
        },
        revalidate: 1
    }
}

export default MeetupDetails;
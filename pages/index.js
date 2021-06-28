import MeetupList from '../components/meetups/MeetupList';

const MEETUPS = [
    {
        id: '1',
        title: 'one',
        image: 'https://image.shutterstock.com/image-photo/mountains-under-mist-morning-amazing-260nw-1725825019.jpg',
        address: 'addr 2',
        description: 'lorem'
    },
    {
        id: '2',
        title: 'two',
        image: 'https://i.imgur.com/mCbaca8.jpeg',
        address: 'addr 2',
        description: 'ipsum'
    },
    {
        id: '3',
        title: 'three',
        image: 'https://image.shutterstock.com/image-photo/mountains-under-mist-morning-amazing-260nw-1725825019.jpg',
        address: 'addr 3',
        description: 'dolor'

    },
];

function HomePage(props) {
    return <MeetupList meetups={props.meetups} />;
}

export async function getStaticProps() {
    return {
        props: {
            meetups: MEETUPS
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
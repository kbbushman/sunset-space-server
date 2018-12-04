const db = require('./models/index');
const bcrypt = require('bcrypt');
const Plan = db.Plan;
const Tour = db.Tour;
const User = db.User;


const planData = [
    {
        type: 'Basic',
        cost: 99,
        username: 'Mandrew',
    },
    {
        type: 'Intermediate',
        cost: 199,
        username: 'Steph4x',
    },
    {
        type: 'Premium',
        cost: 299,
        username: 'BeauBandy',
    },
];

const tourData = [
    {
        username: 'BeauBandy',
        email: 'andy@beau-bandy.com',
    },
    {
        username: 'Mandrew1',
        email: 'andy@beau-bandrew.com',
    },
];

const userData = [
    {
        firstName: 'Andrew',
        lastName: 'Foster',
        email: 'andy@beau-bandy.com',
        phone: '415-920-3360',
        website: 'atfcreative.com',
        username: 'Andrew',
        password: 'testing321',
        description: 'My name is Andrews, I have 10 years of experience working with websites. I have a bachelor’s degree in graphic design. I raise money, train leaders, and organize units.',
        imgUrl: 'images/andrew.jpg',
        tour: [],
        plan: [],
    },
    {
        firstName: 'Paul',
        lastName: ' Mouraille',
        email: 'paul@generealassemb.ly',
        phone: '415-444-4444',
        website: 'paulmouraille.com',
        username: 'PaulyPaul',
        password: 'testing321',
        description: 'Hey, I am Paul, and I enjoy meeting new people and finding ways to help them have an uplifting experience. I have had a wide variety of photogrpahy experience.',
        imgUrl: 'images/andrew.jpg',
        tour: [],
        plan: [],
    },
    {
        firstName: 'Emily',
        lastName: 'LastName',
        email: 'emily@generealassemb.ly',
        phone: '415-555-5555',
        website: 'emilydev.com',
        username: 'Emily2018',
        password: 'testing321',
        description: 'Hello, I am a professional web developer, on the suuny coast of California.',
        imgUrl: 'images/emily.jpg',
        tour: [],
        plan: [],
    },
    {
        firstName: 'Tirapat',
        lastName: 'Nirapareet',
        email: 'tirapat@generealassemb.ly',
        phone: '415-777-7777',
        website: 'tirapat.com',
        username: 'Tirapat22',
        password: 'testing321',
        description: 'From SF, California. I started a company that make web apps for male models.',
        imgUrl: 'images/tirpat.jpg',
        tour: [],
        plan: [],
    },
    {
        firstName: 'Mark',
        lastName: 'Mandell',
        email: 'mark@generealassemb.ly',
        phone: '415-888-8888',
        website: 'markmanmandell.com',
        username: 'MarkMan',
        password: 'testing321',
        description: 'Wassup. I went to college in Florida, got a job at Stanfod and I like to drink beer.',
        imgUrl: 'images/mark.jpg',
        tour: [],
        plan: [],
    },
    {
        firstName: 'Natasha',
        lastName: 'Quijano',
        email: 'natasha@generealassemb.ly',
        phone: '415-999-9999',
        website: 'natashaquijano.com',
        username: 'Natasha18',
        password: 'testing321',
        description: 'I am from Panama orginally, went to design school and now look forward to being a web developer.',
        imgUrl: 'images/natasha.jpg',
        tour: [],
        plan: [],
    },
    {
        firstName: 'Garrett',
        lastName: 'LastName',
        email: 'garrrett@generealassemb.ly',
        phone: '415-000-0000',
        website: 'garrettdev.com',
        username: 'GarrettGuy',
        password: 'testing321',
        description: 'Greetings, I am gradutaing from General Assembly now and also I sing REALLY well!',
        imgUrl: 'images/garrett.jpg',
        tour: [],
        plan: [],
    },
    {
        firstName: 'Praveen',
        lastName: 'LastName',
        email: 'praveen@generealassemb.ly',
        phone: '415-111-1234',
        website: 'ppraveendeve.com',
        username: 'GarrettGuy',
        password: 'testing321',
        description: 'Salutations, I am gradutaing from General Assembly now and also I travel to LA all the time.',
        imgUrl: 'images/praveen.jpg',
        tour: [],
        plan: [],
    },
    
];

// const avatarData = [
//     {
//         imgUrl: '../public/uploads/pro1.jpg',
//         user: id
//     },
//     {
//         imgUrl: '../public/uploads/pro1.jpg',
//         user: id
//     },
//     {
//         imgUrl: '../public/uploads/pro1.jpg',
//         user: id
//     },
// ]

//Remove all Plans
Plan.deleteMany({}, (err) => {
    if (err) throw err;
    console.log(`All plans deleted; Success- relax buddy...`);
    //Create new Plans
    Plan.create(planData, (err, newPlan) => {
        if (err) throw err;
        console.log(`Created ${newPlan.length} new Plans buddy...`);

        //Remove all Tours
        Tour.deleteMany({}, (err) => {
            if (err) throw err;
            console.log(`All Tours deleted- done...`);
            Tour.create(tourData, (err, newTour) => {
                if (err) throw err;
                console.log(`Created ${newTour.length} new Tours my man...`);
            });
        });
    });

    User.deleteMany({}, (err) => {
        if (err) throw err;
        console.log(`All Users deleted, cha' dude...`);
        //Create new Users
        userData.forEach( userInfo => {
            let hash = bcrypt.hashSync(userInfo.password, 10);
            let user = new db.User({
                firstName: userInfo.firstName,
                lastName: userInfo.lastName,
                username: userInfo.username,
                password: hash,
                description: userInfo.description,
                email: userInfo.email,
                phone: userInfo.phone,
                website: userInfo.website,
                imgUrl: userInfo.imgUrl,
                tour: [],
                plan: [],
            });
            user.save((err, savedUser) => {
                if (err) throw err;
                console.log(`Created ${User.username} new User with a default profiles`);
            })
        });
    });
});




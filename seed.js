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
        firstName: 'Andy',
        lastName: 'Beau-Bandy',
        email: 'andy@beau-bandy.com',
        phone: '1-900-976-6969',
        website: 'Beau-Bandy.com',
        username: 'BeauBandy',
        password: 'testing321',
        description: 'My name is Andy Beau-Bandy, I have 10 years of experience working with youth agencies. I have a bachelor’s degree in outdoor education. I raise money, train leaders, and organize units.',
        imgUrl: 'http://localhost:4000/uploads/default-avatar.jpg',
        tour: [],
        plan: [],
    },
    {
        firstName: 'Lucas Martin',
        lastName: 'Beau-Bandrew',
        email: 'andy@beau-bandrew.com',
        phone: '1-420-420-0420',
        website: 'Beau-Bandrew.com',
        username: 'Mandrew1',
        password: 'testing321',
        description: 'Hey, I am Lucas Martin, and I enjoy meeting new people and finding ways to help them have an uplifting experience. I have had a variety of customer service opportunities.',
        imgUrl: 'http://localhost:4000/uploads/default-avatar.jpg',
        tour: [],
        plan: [],
    },
    {
        firstName: 'Stephanie',
        lastName: 'Gilmore',
        email: 'steph@chic-shreds.com',
        phone: '1-800-555-5555',
        website: 'worldchamp.com',
        username: 'Steph4x',
        password: 'testing321',
        description: 'Athlete, I am a professional surfer from Coolangatta, on the Gold Coast of Austrlia. I have won 7 world titles!',
        imgUrl: 'http://localhost:4000/uploads/default-avatar.jpg',
        tour: [],
        plan: [],
    },
    {
        firstName: 'Carissa',
        lastName: 'Moore',
        email: 'carissa@chic-shreds.com',
        phone: '1-800-777-7777',
        website: 'worldchamp.com',
        username: 'Carissa3x',
        password: 'testing321',
        description: 'Carissa, from Honolulu, Oahu, Hawaii. I started a company called Banan.',
        imgUrl: 'http://localhost:4000/uploads/carissa.jpg',
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




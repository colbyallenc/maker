const mongoose    = require('mongoose');
require('dotenv').config();

mongoose.connect(process.env.MONGODB_URI);


const User      = require('../models/user-model.js');

const group    = [
    {
    groupTitle: "Uber",
    groupPhoto: "https://www.google.com/url?sa=i&rct=j&q=&esrc=s&source=images&cd=&cad=rja&uact=8&ved=0ahUKEwjVtciZhKrUAhUI92MKHVEgDkUQjRwIBw&url=https%3A%2F%2Fwww.uber.com%2F&psig=AFQjCNEvlTN-vOIaX78BnLaPWOkiNO2wSA&ust=1496866450237162",
    content: "Uber is a technology platform. Our smartphone apps connect driver-partners and riders. In cities where Uber operates, use your rider app to request a ride. When a nearby driver-partner accepts your request, your app displays an estimated time of arrival for the driver-partner heading to your pickup location.",
    jobs: ["Frontend Developer", "Backend Developer", "Software Developer", "Mobile Developer"]
    },
    {
      groupTitle: "Wunderlist",
      groupPhoto: "../img/wunderlist.jpeg",
      content: "Whether you're sharing a grocery list with a loved one, working on a project, or planning a vacation, Wunderlist makes it easy to share your lists and collaborate with everyone in your life. Wunderlist instantly syncs between your phone, tablet and computer, so you can access your lists from anywhere.",
      jobs: ["Application Developer","Chief Technology Officer"]
    },
    {
      groupTitle: "Spotify",
      groupPhoto: "../img/spotify.png",
      content: "Spotify is the best way to listen to music on mobile or tablet. Search for any track, artist or album and listen for free. Make and share playlists.",
      jobs:["Desktop Support Manager", "Developer"]
    },
    {
      groupTitle: "Fitbit",
      groupPhoto: "../img/fitbit.png",
      content: "Fitbit trackers use a 3-axis accelerometer to understand your motions. ... By analyzing acceleration data, our trackers provide detailed information about frequency, duration, intensity, and patterns of movement to determine your steps taken, distance traveled, calories burned, and sleep quality.",
      jobs: ["Java Developer", "Programmer Analyst", "Senior Programmer"]
    },
    {
      groupTitle: "MyFitnessPal",
      groupPhoto: "../img/MyFitnessPal.jpeg",
      content: "MyFitnessPal is one of the most popular web-based exercise and fitness social media applications available. MyFitnessPal (MFP) helps you keep track of your daily food and beverage intake, calculating all your nutrients, calories, and vitamins for you.",
      jobs: ["Programmer Analyst", "Senior Programmer", "Desktop Support Manager"]
    },
    {
      groupTitle: "PicsArt",
      groupPhoto: "../img/PicsArt.png",
      content: "PicsArt makes it easy to step-up your photo editing game, make amazing images and share with friends. PicsArt is your new playground. Remix images with us, join the fam and discover a universe of mind blowing images.",
      jobs: ["Web Developer", "Senior Programmer", "Junior Software Engineer"]
    }
];

//db.groups.insertMany
Group.create(group, (err, groupDocs)=>{
  if(err){
    throw err;
  }
  groupDocs.forEach((oneGroup)=>{
    console.log(`NEW GROUP: ${oneGroup.groupTitle} -> ${oneGroup._id}`);

  });
});

const user    = [
    {
    name: "Jamie-Lee Jean",
    userPhoto: "../img/profile1.jpeg",
    jobType: "Frontend Developer",
    about: "Quiet and reserved, interested in how and why things work. Excellent skills with lgocial things. Risk-taker who they lives for the moment.",
    skills: ["html", "java", "bootstrap", "css"]
  },
  {
  name: "Sky Walker",
  userPhoto: "../img/profile2.jpeg",
  jobType: "Backend Developer",
  about: "Creative, resourceful, and intellectually quick. Good at a broad range of things.",
  skills: ["jquery", "javascript", "express", "jasmine"]
},
{
name: "Brandon Louis",
userPhoto: "../img/profile3.jpeg",
jobType: "Software Engineer",
about: "Generally outspoken and assertive. Excellent ability to understand concepts and apply logic to find solutions.",
skills: ["ajax", "express", "mongo"]
},
{
name: "Lemon Hasely",
userPhoto: "../img/profile4.jpeg",
jobType: "UX UI Developer",
about: "Excellent ability to understand difficult organizational problems and create solid solutions.",
skills: ["html", "java", "bootstrap", "css", "jquery", "javascript"]
},
{
name: "Blue Daniel",
userPhoto: "../img/profile5.jpeg",
jobType: "Java Developer",
about: "Very excited about new ideas and projects. Creative, resourceful, and intellectually quick.",
skills: ["html", "java", "bootstrap", "css", "jquery", "javascript"]
},
{
name: "Ogechi Sourdey",
userPhoto: "../img/profile6.jpeg",
jobType: "Senior Developer",
about: "Excited by new ideas, but bored with details. Open-minded and flexible, with a broad range of interests and abilities.",
skills: ["html", "java", "bootstrap", "css", "jquery", "javascript"]
}
];

//db.groups.insertMany
User.create(user, (err, userDocs)=>{
  if(err){  throw err;    }
  userDocs.forEach((oneUser)=>{
    console.log(`NEW USER: ${oneUser.name} -> ${oneUser._id}`);
  });
});

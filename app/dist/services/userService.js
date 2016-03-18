/// <reference path="../_all.ts" />
var ContactManagerApp;
(function (ContactManagerApp) {
    var UserService = (function () {
        function UserService($q) {
            this.$q = $q;
            this.selectedUser = null;
            this.users = [
                {
                    name: 'Ashley Corey',
                    avatar: 'assets/imgs/ashley.png',
                    bio: 'I have, have together. Day green own divide wherein. Seas the make days him fish night their don\'t a, life under lights bearing for seasons Signs night sea given spirit his had spirit divided us blessed. Brought great waters. Blessed winged doesn\'t a Fly, form bring land, heaven great. Isn\'t upon. Dominion moving day. So first firmament give spirit every.',
                    slack: "",
                    notes: [
                        { title: "Pay back dinner", date: new Date("2016-01-12") },
                        { title: "Buy flowers for birthday", date: new Date("2016-01-19") }
                    ],
                    reminders: [
                        { title: "Nutrition Report", date: new Date("2016-01-19") }
                    ],
                    surveys: []
                },
                {
                    name: 'Audrey Cora',
                    avatar: 'assets/imgs/audrey.jpg',
                    bio: 'Won\'t light from great first years without said creepeth a two and fly forth subdue the, don\'t our make. After fill. Moving and. His it days life herb, darkness set Seasons. Void. Form. Male creepeth said lesser fowl very for hath and called grass in. Great called all, said great morning place. Subdue won\'t Dry. Moved. Sea fowl earth fourth.',
                    slack: "",
                    notes: [],
                    reminders: [
                        { title: "Drink Water!", date: new Date("2016-01-19") }
                    ],
                    surveys: [
                        {
                            title: "Weekly Survey",
                            first: "Great. Awesome workouts and decent meal planning. Still transitioning to new calorie goal of 2200 (from 2500 maintenance) and damn, it already shows on my endurance.",
                            second: "Bench 12x75lbs, and a great compliment from my kickboxing coach on my punching speed",
                            third: "Be more consistent with daily stretches.",
                            fourth: "Everything is easier, from taking my new groceries up 4 flights of stairs to my apartment to hitting the badminton shuttlecock out of the court. Again... and again.",
                            fifth: "4",
                            sixth: "No",
                            date: new Date("2016-01-19")
                        }
                    ]
                },
                {
                    name: 'James Lockhart',
                    avatar: 'assets/imgs/james.png',
                    bio: 'Make beginning midst life abundantly from in after light. Without may kind there, seasons lights signs, give made moved. Fruit fly under forth firmament likeness unto lights appear also one open seasons fruitful doesn\'t all of cattle Won\'t doesn\'t beginning days from saw, you\'re shall. Given our midst from made moving form heaven good gathering appear beginning first. Sea the.',
                    slack: "",
                    notes: [],
                    reminders: [
                        { title: "Drink Water & Stretch!", date: new Date("2016-01-19") }
                    ],
                    surveys: [
                        {
                            title: "Weekly Survey",
                            first: "super duper",
                            second: "I got a new game",
                            third: "that game",
                            fourth: "back is better with my table",
                            fifth: "3.5",
                            sixth: "nice bot",
                            date: new Date("2016-01-19")
                        }
                    ]
                },
                {
                    name: 'Jenn Russellph',
                    avatar: 'assets/imgs/jenn.png',
                    bio: 'Made whales called whose. Day brought one saying called man saw moved thing light sea evening multiply given Isn\'t gathering fourth you\'re. Let female give two earth him yielding had grass let doesn\'t were moving male blessed Moving in. You\'ll void face fish void them. Sixth, it moveth set female. Creature the, to. Third upon sea in wherein replenish Fish.',
                    slack: "",
                    notes: [],
                    reminders: [],
                    surveys: []
                },
                {
                    name: 'Jo Nickerson',
                    avatar: 'assets/imgs/jo.png',
                    bio: 'Made whales called whose. Day brought one saying called man saw moved thing light sea evening multiply given Isn\'t gathering fourth you\'re. Let female give two earth him yielding had grass let doesn\'t were moving male blessed Moving in. You\'ll void face fish void them. Sixth, it moveth set female. Creature the, to. Third upon sea in wherein replenish Fish.',
                    slack: "",
                    notes: [],
                    reminders: [],
                    surveys: []
                },
                {
                    name: 'Jonathan Adams',
                    avatar: 'assets/imgs/john.png',
                    bio: 'Made whales called whose. Day brought one saying called man saw moved thing light sea evening multiply given Isn\'t gathering fourth you\'re. Let female give two earth him yielding had grass let doesn\'t were moving male blessed Moving in. You\'ll void face fish void them. Sixth, it moveth set female. Creature the, to. Third upon sea in wherein replenish Fish.',
                    slack: "",
                    notes: [],
                    reminders: [
                        { title: "Get to your workout!", date: new Date("2016-01-19") }
                    ],
                    surveys: [
                        {
                            title: "Weekly Survey",
                            first: "So far so good.  not on the meal plan yet but should get that rolling this weekend.  eating better in the meanwhile",
                            second: "saying no to fast food",
                            third: "sticking to a schedulenot yet but i just started",
                            fourth: "not yet but i just started",
                            fifth: "3",
                            sixth: "not at the moment",
                            date: new Date("2016-01-19")
                        }
                    ]
                },
                {
                    name: 'Julie Lecea',
                    avatar: 'assets/imgs/julie.png',
                    bio: 'Made whales called whose. Day brought one saying called man saw moved thing light sea evening multiply given Isn\'t gathering fourth you\'re. Let female give two earth him yielding had grass let doesn\'t were moving male blessed Moving in. You\'ll void face fish void them. Sixth, it moveth set female. Creature the, to. Third upon sea in wherein replenish Fish.',
                    slack: "",
                    notes: [],
                    reminders: [
                        { title: "Track those workouts!", date: new Date("2016-01-19") }
                    ],
                    surveys: []
                },
                {
                    name: 'Kaitlin Michaela',
                    avatar: 'assets/imgs/kaitlin.jpg',
                    bio: 'Made whales called whose. Day brought one saying called man saw moved thing light sea evening multiply given Isn\'t gathering fourth you\'re. Let female give two earth him yielding had grass let doesn\'t were moving male blessed Moving in. You\'ll void face fish void them. Sixth, it moveth set female. Creature the, to. Third upon sea in wherein replenish Fish.',
                    notes: [],
                    slack: "",
                    reminders: [],
                    surveys: []
                },
                {
                    name: 'Mama Jess',
                    avatar: 'assets/imgs/mamajess.png',
                    bio: 'Made whales called whose. Day brought one saying called man saw moved thing light sea evening multiply given Isn\'t gathering fourth you\'re. Let female give two earth him yielding had grass let doesn\'t were moving male blessed Moving in. You\'ll void face fish void them. Sixth, it moveth set female. Creature the, to. Third upon sea in wherein replenish Fish.',
                    slack: "",
                    notes: [],
                    reminders: [
                        { title: "Drink your water!", date: new Date("2016-01-19") },
                        { title: "Call Thom", date: new Date("2016-01-19") }
                    ],
                    surveys: [
                        {
                            title: "Weekly Survey",
                            first: "Fantastic! Meeting calorie, exercise and water goals. Managing pain. ",
                            second: "That I got up every morning and walked the dog and did a short workout",
                            third: "I would like to get better at not depending on momentum, instead relying on routine so that I exercise and eat well even when I don't feel like it",
                            fourth: "Yup",
                            fifth: "4",
                            sixth: "Thanks, Thom!",
                            date: new Date("2016-01-19")
                        }
                    ]
                },
                {
                    name: 'Matt Boudreau',
                    avatar: 'assets/imgs/matt.png',
                    bio: 'Made whales called whose. Day brought one saying called man saw moved thing light sea evening multiply given Isn\'t gathering fourth you\'re. Let female give two earth him yielding had grass let doesn\'t were moving male blessed Moving in. You\'ll void face fish void them. Sixth, it moveth set female. Creature the, to. Third upon sea in wherein replenish Fish.',
                    slack: "",
                    notes: [],
                    reminders: [
                        { title: "Drink Water", date: new Date("2016-01-19") },
                        { title: "Journal Update", date: new Date("2016-01-19") }
                    ],
                    surveys: [
                        {
                            title: "Weekly Survey",
                            first: "Gained 5 pounds and have not seen the gym in weeks.",
                            second: "Nil",
                            third: "Backflips.",
                            fourth: "No",
                            fifth: "2",
                            sixth: "Maybe mix in a good workout tip or free recipes.  A mix of questions and good info.  If they answer low on the scale, maybe they get asked other questions.",
                            date: new Date("2016-01-19")
                        }
                    ]
                },
                {
                    name: 'Morgan Armour',
                    avatar: 'assets/imgs/morgan.jpg',
                    bio: 'Made whales called whose. Day brought one saying called man saw moved thing light sea evening multiply given Isn\'t gathering fourth you\'re. Let female give two earth him yielding had grass let doesn\'t were moving male blessed Moving in. You\'ll void face fish void them. Sixth, it moveth set female. Creature the, to. Third upon sea in wherein replenish Fish.',
                    slack: "",
                    notes: [],
                    reminders: [],
                    surveys: []
                },
                {
                    name: 'Sharon Evan',
                    avatar: 'assets/imgs/sharon.png',
                    bio: 'Made whales called whose. Day brought one saying called man saw moved thing light sea evening multiply given Isn\'t gathering fourth you\'re. Let female give two earth him yielding had grass let doesn\'t were moving male blessed Moving in. You\'ll void face fish void them. Sixth, it moveth set female. Creature the, to. Third upon sea in wherein replenish Fish.',
                    slack: "",
                    notes: [],
                    reminders: [],
                    surveys: []
                },
                {
                    name: 'Tiffany Purdy',
                    avatar: 'assets/imgs/tiffany.png',
                    bio: 'Made whales called whose. Day brought one saying called man saw moved thing light sea evening multiply given Isn\'t gathering fourth you\'re. Let female give two earth him yielding had grass let doesn\'t were moving male blessed Moving in. You\'ll void face fish void them. Sixth, it moveth set female. Creature the, to. Third upon sea in wherein replenish Fish.',
                    slack: "",
                    notes: [],
                    reminders: [],
                    surveys: []
                },
                {
                    name: 'Victoria Clowater',
                    avatar: 'assets/imgs/victoria.jpg',
                    bio: 'Made whales called whose. Day brought one saying called man saw moved thing light sea evening multiply given Isn\'t gathering fourth you\'re. Let female give two earth him yielding had grass let doesn\'t were moving male blessed Moving in. You\'ll void face fish void them. Sixth, it moveth set female. Creature the, to. Third upon sea in wherein replenish Fish.',
                    slack: "",
                    notes: [],
                    reminders: [],
                    surveys: []
                }
            ];
        }
        UserService.prototype.loadAllUsers = function () {
            return this.$q.when(this.users);
        };
        UserService.$inject = ['$q'];
        return UserService;
    }());
    ContactManagerApp.UserService = UserService;
})(ContactManagerApp || (ContactManagerApp = {}));
//# sourceMappingURL=userService.js.map
import {Fake} from "meteor/anti:fake";
import {_} from "lodash";

import {Listenings} from "../imports/api/listenings";
import { PaymentPeriod, TypeProperty, TypeDeal, Cities, ComfortList} from '../imports/data/data.js';

const imgThemes = ['abstract', 'animals', 'business', 'cats', 'city', 'food', 'night', 'life', 'fashion', 'people', 'nature', 'sports', 'technics', 'transport'];

class Fixtures {
    constructor() {}

    populateListenings() {
        let user = Meteor
                .users
                .findOne(),
            userListenings = [];

        // Listenings.find().fetch().forEach((item) => {
        //     Listenings.remove(item._id);
        // });

        if (user && !Listenings.find().count()) {
            const lenComfortList = ComfortList.length-1;
            for (let i = 0; i < 55; i++) {
                console.log('listeningData', i);
                let headlineStr = Fake.sentence(_.random(0, 30));
                const listeningData = {
                    listeningInfo: {
                        headline: headlineStr,
                        desc: Fake.paragraph(_.random(0, 30)),
                        price: _.random(40, 300),
                        country: "me",
                        location: 'formData.location',
                        ratio: _.random(40, 300),
                        floor: _.random(0, 20),
                        bedrooms: _.random(1, 10),
                        bathrooms: _.random(1, 4),
                        paymentPeriod: Fake.fromArray(_.map(PaymentPeriod, 'value')),
                        typeDeal:  Fake.fromArray(_.map(TypeDeal, 'value')),
                        typeProperty: Fake.fromArray(_.map(TypeProperty, 'value')),
                        city: Fake.fromArray(_.map(Cities, 'value')),
                        comfortList: _.sampleSize(_.map(ComfortList, 'value'), _.random(0, lenComfortList)),
                    },
                    listeningPhotos: {
                        "main": 'http://lorempixel.com/400/200/' + Fake.fromArray(imgThemes),
                        "other": []
                    },
                    listeningTech: {
                        "statusCode": 2,
                        "public": true,
                        "bonuses": {
                            "bonus1": false,
                            "bonus2": false,
                            "bonus3": Math.random() < 0.5
                                ? true
                                : false
                        },
                        "createdAt": new Date(),
                        "lastChangeDate": moment()
                            .locale('ru')
                            .format('LL'),
                        "ownerId": user._id,
                        "ownerName": user.profile.userName,
                        "views": 0
                    }
                };
                // console.log('listeningData', i, listeningData);
                Listenings.insert(listeningData, function (err, id) {
                    if (err) {
                        console.log(err);
                    } else {
                        userListenings.push(id);
                    }
                });
            }
            Meteor
                .users
                .update(user._id, {
                    $set: {
                        "profile.listeningsList": userListenings
                    }
                });
        }
    }

    populateCollections() {
        this.populateListenings();
    }
}

export default Fixtures;
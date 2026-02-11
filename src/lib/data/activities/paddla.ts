import type { Activity } from '$lib/types';

const bookingRulesPrivate = [
    () => m.formal_happy_goose_talk()

];
const bookingRulesCorporate = [
    () => m.formal_happy_goose_talk()
];
const bookingRulesSchool = [
    () => m.formal_happy_goose_talk()

];
import * as m from '$lib/paraglide/messages';

export const activities: { paddla: Activity } = {
    paddla: {
        title: () => m.activity_paddle_title(),
        description: () => m.activity_paddle_description(),
        heroImage: '/images/paddling-hero.jpg',
        experiences: [
            {
                title: () => m.experience_calm_title(),
                subTitle: () => m.experience_calm_subtitle(),
                description: () => m.experience_calm_description(),
                image: '/images/behaglig-fard.jpg',
                duration: () => m.experience_calm_duration(),
                difficulty: 'easy',
                experienceType: 'regular',
                startLocation: "Stisses",
                endLocation: "Stisses",
                includedItems: [
                    () => m.common_equipment_canoe(),
                    () => m.common_equipment_vest(),
                    () => m.common_equipment_paddle(),
                    () => m.common_equipment_extra_seats()
                ],
                requiredExperience: () => m.experience_calm_required(),
                price: () => m.experience_calm_price(),
                maxParticipants: {
                    adults: 2,
                    children: 3
                },
                bookingRules: bookingRulesPrivate,
                bookingLink: "https://app.bookspot.io/widget/v2/dialog/new-order?key=e288265c8bfe259e7865c7fabcf1e99ff0c75de6f7a548cb667e7ed453381ac6&productTypes=products,vouchers&listView=products&products=6932",
                longDescription: () => m.experience_calm_long_description()
            },
            {
                title: () => m.experience_adventure_title(),
                subTitle: () => m.experience_adventure_subtitle(),
                description: () => m.stale_sound_porpoise_express(),
                image: '/images/spannande-paddling.jpg',
                duration: () => m.experience_adventure_duration(),
                difficulty: 'medium',
                experienceType: 'regular',
                startLocation: () => m.common_location_varies(),
                endLocation: "Stisses",
                includedItems: [
                    () => m.common_equipment_canoe(),
                    () => m.common_equipment_vest(),
                    () => m.common_equipment_paddle(),
                    () => m.common_equipment_transport(),
                    () => m.common_equipment_extra_seats()
                ],
                requiredExperience: () => m.experience_adventure_required(),
                cardPrice: () => m.arable_pretty_worm_honor(),
                price: {
                    headers: [
                        () => m.table_header_start(),
                        () => m.table_header_goal(),
                        () => m.table_header_paddle_time(),
                        () => m.table_header_price_regular(),
                        () => m.table_header_price_reduced()
                    ],
                    rows: [
                        {
                            start: () => m.common_location_gasahalsen(),
                            goal: "Stisses",
                            duration: '2 h',
                            price: 690,
                            reducedPrice: 590
                        },
                        {
                            start: () => m.common_location_hoja(),
                            goal: "Stisses",
                            duration: '3,5 h',
                            price: 690,
                            reducedPrice: 590
                        },
                        {
                            start: () => m.common_location_ugglarp(),
                            goal: "Stisses",
                            duration: '5 h',
                            price: 790,
                            reducedPrice: 690
                        }
                    ]
                },
                bookingRules: bookingRulesPrivate,
                bookingLink: "https://app.bookspot.io/widget/v2/dialog/new-order?key=e288265c8bfe259e7865c7fabcf1e99ff0c75de6f7a548cb667e7ed453381ac6&productTypes=products,vouchers&listView=products&products=7297&products=7294&products=7280",
                longDescription: () => m.experience_adventure_long_description()
            },
            {
                title: () => m.experience_challenging_title(),
                subTitle: () => m.experience_challenging_subtitle(),
                description: () => m.proud_raw_skate_yell(),
                image: '/images/utmanande-paddling.jpg',
                duration: () => m.experience_challenging_duration(),
                difficulty: 'medium',
                experienceType: 'regular',
                startLocation: () => m.common_location_varies(),
                endLocation: "Stisses",
                includedItems: [
                    () => m.common_equipment_canoe(),
                    () => m.common_equipment_vest(),
                    () => m.common_equipment_paddle(),
                    () => m.common_equipment_transport(),
                    () => m.common_equipment_extra_seats()
                ],
                requiredExperience: () => m.experience_challenging_required(),
                cardPrice: () => m.swift_giant_rabbit_launch(),
                price: {
                    headers: [
                        () => m.table_header_start(),
                        () => m.table_header_goal(),
                        () => m.table_header_nights(),
                        () => m.table_header_paddle_time(),
                        () => m.table_header_price()
                    ],
                    rows: [
                        {
                            start: 'Ugglarp (17 km)',
                            goal: "Stisses",
                            nights: 1,
                            paddleTime: '2,5 h',
                            price: 990
                        },
                        {
                            start: 'Tranarpsbron (22 km)',
                            goal: "Stisses",
                            nights: 1,
                            paddleTime: '3 h',
                            price: 990
                        },
                        {
                            start: 'Klippan (35 km)',
                            goal: "Stisses",
                            nights: 1,
                            paddleTime: '5 h',
                            price: 990
                        },
                        {
                            start: 'Klippan (35 km)',
                            goal: "Stisses",
                            nights: 2,
                            paddleTime: '3,5 h',
                            price: 1190
                        }
                    ]
                },
                bookingRules: bookingRulesPrivate,
                bookingLink: "https://app.bookspot.io/widget/v2/dialog/new-order?key=e288265c8bfe259e7865c7fabcf1e99ff0c75de6f7a548cb667e7ed453381ac6&productTypes=products,vouchers&listView=products&products=7287&products=9280&products=9279",
                longDescription: () => m.experience_challenging_long_description()
            },
            /*{
                title: () => m.experience_night_title(),
                subTitle: () => m.experience_night_subtitle(),
                description: () => m.experience_night_description(),
                image: '/images/natt-paddling.jpg',
                duration: () => m.experience_night_duration(),
                difficulty: 'medium',
                experienceType: 'guided',
                startLocation: "Stisses",
                endLocation: "Stisses",
                includedItems: [
                    () => m.common_equipment_canoe(),
                    () => m.common_equipment_vest(),
                    () => m.common_equipment_headlamp(),
                    () => m.common_equipment_glow_paddles(),
                    () => m.common_equipment_earpiece(),
                    () => m.common_equipment_food()
                ],
                requiredExperience: () => m.experience_night_required(),
                price: () => m.experience_night_price(),
                maxParticipants: {
                    total: 12
                },
                bookingRules: bookingRulesPrivate,
                longDescription: () => m.experience_night_long_description()
            }, */
            /*{
                title: () => m.experience_advanced_title(),
                subTitle: () => m.experience_advanced_subtitle(),
                description: () => m.experience_advanced_description(),
                image: '/images/kajak-2.jpg',
                duration: () => m.experience_advanced_duration(),
                difficulty: 'medium',
                experienceType: 'guided',
                startLocation: "Stisses",
                endLocation: "Stisses",
                includedItems: [
                    () => m.common_equipment_canoe(),
                    () => m.common_equipment_vest(),
                    () => m.common_equipment_paddle(),
                    () => m.common_equipment_safety()
                ],
                requiredExperience: () => m.experience_advanced_required(),
                price: () => m.experience_advanced_price(),
                maxParticipants: {
                    total: 8
                },
                recommendations: {
                    clothing: [
                        'Solhatt/keps/buff',
                        'Solglasögon',
                        'Solskyddskräm',
                        'Sandaler/badskor',
                        'Vindtät/vattentät jacka'
                    ],
                    bring: [
                        'Vattenflaska (33-50 cl)',
                        'Vattentät säck för telefon',
                        'Lättare matsäck (smörgås/frukt/nötter)'
                    ]
                },
                bookingRules: bookingRulesPrivate,
                longDescription: () => m.experience_advanced_long_description()
            }, */
            {
                title: () => m.experience_corporate_title(),
                subTitle: () => m.experience_corporate_subtitle(),
                description: () => m.experience_corporate_description(),
                image: '/images/foretag-paddling.jpg',
                duration: () => m.experience_corporate_duration(),
                difficulty: 'easy',
                experienceType: 'corporate',
                startLocation: () => m.common_location_varies(),
                endLocation: "Stisses",
                includedItems: [
                    () => m.common_equipment_canoe(),
                    () => m.common_equipment_vest(),
                    () => m.common_equipment_paddle(),
                    () => m.common_equipment_safety()
                ],
                requiredExperience: () => m.experience_corporate_required(),
                cardPrice: () => m.steep_born_lemur_ripple(),
                price: {
                    headers: [
                        () => m.table_header_start(),
                        () => m.table_header_goal(),
                        () => m.table_header_paddle_time(),
                        () => m.glad_good_mink_mend()
                    ],
                    rows: [
                        {
                            start: "Stisses",
                            goal: "Stisses",
                            duration: '1-4 h',
                            price: 290
                        },
                        {
                            start: () => m.common_location_gasahalsen(),
                            goal: "Stisses",
                            duration: '2 h',
                            price: 490
                        },
                        {
                            start: () => m.common_location_hoja(),
                            goal: "Stisses",
                            duration: '3,5 h',
                            price: 490
                        }
                    ]
                },
                extras: {
                    food: [
                        {
                            title: () => m.extra_food_coffee(),
                            description: () => m.extra_food_coffee_description(),
                            price: 69,
                            image: '/images/fika.jpg'
                        },
                        {
                            title: () => m.extra_food_soup(),
                            description: () => m.extra_food_soup_description(),
                            price: 99,
                            image: '/images/soppa.png'
                        },
                        {
                            title: () => m.extra_food_sausage(),
                            description: () => m.extra_food_sausage_description(),
                            price: 99,
                            image: '/images/mat.jpg'
                        }
                    ],
                    teambuilding: {
                        price: 200,
                        description: () => m.extra_teambuilding_description(),
                        videos: [
                            {
                                id: "video1",
                                title: () => m.proof_slimy_wolf_imagine(),
                                videoUrl: "https://www.youtube-nocookie.com/embed/hMiPRU3ht-s"
                            },
                            {
                                id: "video2",
                                title: () => m.zany_smart_starfish_enrich(),
                                videoUrl: "https://www.youtube-nocookie.com/embed/GB0VvCWpzi8"
                            }
                        ]
                    }
                },
                bookingRules: bookingRulesCorporate,
                bookingLink: "https://app.bookspot.io/widget/v2/dialog/new-order?key=e288265c8bfe259e7865c7fabcf1e99ff0c75de6f7a548cb667e7ed453381ac6&productTypes=products,vouchers&listView=products&products=7288",
                longDescription: () => m.experience_corporate_long_description()
            },
            {
                title: () => m.experience_school_title(),
                subTitle: () => m.experience_school_subtitle(),
                description: () => m.experience_school_description(),
                image: '/images/skola-paddling.jpg',
                duration: () => m.experience_school_duration(),
                difficulty: 'easy',
                experienceType: 'educational',
                startLocation: () => m.common_location_varies(),
                endLocation: "Stisses",
                includedItems: [
                    () => m.common_equipment_canoe(),
                    () => m.common_equipment_vest(),
                    () => m.common_equipment_paddle(),
                    () => m.common_equipment_safety()
                ],
                requiredExperience: () => m.experience_school_required(),
                cardPrice: () => m.short_pretty_dragonfly_tap(),

                price: {
                    headers: [
                        () => m.table_header_start(),
                        () => m.table_header_goal(),
                        () => m.table_header_duration(),
                        () => m.glad_good_mink_mend()
                    ],
                    rows: [
                        {
                            start: "Stisses",
                            goal: "Stisses",
                            duration: '1-4 h',
                            price: 160
                        },
                        {
                            start: () => m.common_location_hoja(),
                            goal: "Stisses",
                            duration: '3,5 h',
                            price: 240
                        },
                        {
                            start: () => m.common_location_ugglarp(),
                            goal: "Stisses",
                            duration: '5 h',
                            price: 290
                        }
                    ]
                },
                maxParticipants: {
                    total: 30,
                    perInstructor: 8
                },
                bookingRules: bookingRulesSchool,
                bookingLink: "https://app.bookspot.io/widget/v2/dialog/new-order?key=e288265c8bfe259e7865c7fabcf1e99ff0c75de6f7a548cb667e7ed453381ac6&productTypes=products,vouchers&listView=products&products=7298",
                longDescription: () => m.experience_school_long_description()
            }
        ]
    }
};
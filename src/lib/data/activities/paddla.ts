import { BOOKING_RULES } from '$lib/constants';
import type { Activity } from '$lib/types';



const bookingRulesPrivate = BOOKING_RULES.private;
const bookingRulesCorporate = BOOKING_RULES.corporate;
const bookingRulesSchool = BOOKING_RULES.school;

export const activities: { paddla: Activity } = {
    paddla: {
        title: 'Paddla',
        description: 'Upptäck Ängelholms vackra vattendrag genom att paddla kanot eller kajak. Vi erbjuder flera olika startpunkter och rutter för alla nivåer.',
        heroImage: '/images/paddling-hero.jpg',
        experiences: [
            {
                title: 'Behaglig färd i lugnt vatten',
                subTitle: 'Perfekt för familjer och nybörjare',
                description: 'En paddeltur på Rönne å är en hållbar och prisvärd familjeaktivitet. Våra kanoter är mycket stabila och nästan omöjliga att välta så länge man sitter ner när man paddlar.',
                image: '/images/behaglig-fard.jpg',
                duration: '1-4 timmar',
                difficulty: 'easy',
                experienceType: 'regular',
                startLocation: 'Stisses',
                endLocation: 'Stisses',
                includedItems: [
                    'Kanot/kajak/SUP',
                    'Flytväst',
                    'Paddlar',
                    'Extrasäten vid behov'
                ],
                requiredExperience: 'Inga förkunskaper krävs',
                price: '250kr/person (Gratis för alla under 10 år)',
                maxParticipants: {
                    adults: 2,
                    children: 3
                },
                bookingRules: bookingRulesPrivate,
                longDescription: 'En paddeltur på Rönne å är en hållbar och prisvärd familjeaktivitet. Våra kanoter är mycket stabila och nästan omöjliga att välta så länge man sitter ner när man paddlar. Vi kan sätta in extra säten i kanoten så det, förutom två vuxna, finns plats för 1-3 barn (beroende på storlek).'
            },
            {
                title: 'Spännande paddling längs Rönne å',
                subTitle: 'Äventyrlig paddling med transport',
                description: 'En paddeltur med transport till olika startpunkter längs Rönne å, perfekt för den som vill upptäcka mer av åns sträckning.',
                image: '/images/spannande-paddling.jpg',
                duration: '2-6 timmar',
                difficulty: 'medium',
                experienceType: 'regular',
                startLocation: 'Gåsahalsen/Höja/Ugglarp',
                endLocation: 'Stisses',
                includedItems: [
                    'Kanot/kajak/SUP',
                    'Flytväst',
                    'Paddlar',
                    'Transport till startplats',
                    'Extrasäten vid behov'
                ],
                requiredExperience: 'Inga förkunskaper krävs',
                price: {
                    headers: ['Start', 'Mål', 'Paddeltid', 'Pris/person'],
                    rows: [
                        {
                            start: 'Gåsahalsen',
                            goal: 'Stisses',
                            duration: '2 h',
                            price: 590
                        },
                        {
                            start: 'Höja',
                            goal: 'Stisses',
                            duration: '3,5 h',
                            price: 613
                        },
                        {
                            start: 'Ugglarp',
                            goal: 'Stisses',
                            duration: '5 h',
                            price: 738
                        }
                    ]
                },
                bookingRules: bookingRulesPrivate,
                longDescription: 'En paddeltur på Rönne å är en hållbar och prisvärd familjeaktivitet. Våra kanoter är mycket stabila och nästan omöjliga att välta så länge man sitter ner när man paddlar. Vi kan sätta in extra säten i kanoten så det, förutom två vuxna, finns plats för 1-3 barn (beroende på storlek). Ert äventyr börjar med att vi samlas hos oss där våra duktiga instruktörer hjälper er med att välja rätt flytväst och paddel. Därefter tar vi plats i någon av våra bussar för avfärd till valfri startplats. Ni bestämmer om vi ska åka till Gåsahalsen (cirka 2 timmars paddling), Höja (cirka 3,5 timmars paddling) eller Ugglarp (cirka 5 timmars paddling).'
            },
            {
                title: 'Utmanande paddling i vacker natur',
                subTitle: 'Flerdagarsäventyr med övernattning',
                description: 'En längre paddlingstur med övernattning, perfekt för dem som vill uppleva naturen på djupet.',
                image: '/images/utmanande-paddling.jpg',
                duration: '2-3 dagar',
                difficulty: 'hard',
                experienceType: 'regular',
                startLocation: 'Ugglarp/Tranarpsbron/Klippan',
                endLocation: 'Stisses',
                includedItems: [
                    'Kanot/kajak/SUP',
                    'Flytväst',
                    'Paddlar',
                    'Transport till startplats',
                    'Extrasäten vid behov'
                ],
                requiredExperience: 'Viss vana av friluftsliv',
                price: {
                    headers: ['Start', 'Mål', 'Övernattningar', 'Paddeltid/dag', 'Pris/person'],
                    rows: [
                        {
                            start: 'Ugglarp (17 km)',
                            goal: 'Stisses',
                            nights: 1,
                            paddleTime: '2,5 h',
                            price: 990
                        },
                        {
                            start: 'Tranarpsbron (22 km)',
                            goal: 'Stisses',
                            nights: 1,
                            paddleTime: '3 h',
                            price: 990
                        },
                        {
                            start: 'Klippan (35 km)',
                            goal: 'Stisses',
                            nights: 1,
                            paddleTime: '5 h',
                            price: 990
                        },
                        {
                            start: 'Klippan (35 km)',
                            goal: 'Stisses',
                            nights: 2,
                            paddleTime: '3,5 h',
                            price: 1190
                        }
                    ]
                },
                bookingRules: bookingRulesPrivate,
                longDescription: 'Om man vill göra något riktigt kul tillsammans med sina bästa vänner så är att paddla med övernattning ett oslagbart alternativ. Det blir gärna mycket skratt när dråpliga minnen och historier ska återges när man äntligen får tid att umgås några dagar utan stress och måsten. Ert äventyr börjar med att vi samlas hos oss där våra duktiga instruktörer hjälper er att med att välja rätt flytväst, paddel mm. Vi packar in allt vi behöver i någon av våra bussar och åker sen till vald startplats. Vi ger er tips på lämpliga platser att övernatta.'
            },
            {
                title: 'Magisk nattpaddling',
                subTitle: 'Guidad kvällsupplevelse på vattnet',
                description: 'Ett unikt äventyr där vi paddlar i mörkret med självlysande paddlar och upplever Rönne å på ett helt nytt sätt.',
                image: '/images/natt-paddling.jpg',
                duration: '3 timmar (21:00-00:00)',
                difficulty: 'medium',
                experienceType: 'guided',
                startLocation: 'Stisses',
                endLocation: 'Stisses',
                includedItems: [
                    'Kanot/kajak/SUP',
                    'Flytväst',
                    'Pannlampa',
                    'Självlysande paddlar',
                    'Öronsnäcka',
                    'Mat vid eldstad'
                ],
                requiredExperience: 'Inga förkunskaper krävs',
                price: '950 kr per person',
                maxParticipants: {
                    total: 12
                },
                bookingRules: bookingRulesPrivate,
                longDescription: 'Nu talar vi riktigt coolt äventyr. Något magiskt och spännande. Vi samlas 21:00 och börjar med mat kring eldstaden. Vi utrustar dig med flytväst, pannlampa, självlysande paddlar och öronsnäcka. Du lyssnar på guidens osannolika historier medans vi inväntar mörkret. Är historien om "Skallepär" sann? Det sägs att han ibland sitter helt stilla på sin brygga i mörkret och bara stirrar ut över Rönne å.... När vi är mätta och redo glider vi ljudlöst genom nattmörkret och du kommer få uppleva ett magiskt vackert Ängelholm sett från lugna Rönne å.'
            },

            {
                title: 'Kajak 2.0',
                subTitle: 'Guidad träning för dig som vill utvecklas',
                description: 'Fördjupa dina kajakkunskaper med en erfaren instruktör. Lär dig mer om teknik, säkerhet och räddning.',
                image: '/images/kajak-2.jpg',
                duration: '3 timmar (10:00-13:00)',
                difficulty: 'medium',
                experienceType: 'guided',
                startLocation: 'Stisses',
                endLocation: 'Stisses',
                includedItems: [
                    'Kajak (med eller utan roder)',
                    'Flytväst',
                    'Paddlar',
                    'Professionell instruktion',
                    'Säkerhetsutrustning'
                ],
                requiredExperience: 'Grundläggande kajakpaddling',
                price: '950 kr per person',
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
                longDescription: 'Den här upplevelsen vänder sig till dig som har provat att paddla lite Kajak i Rönne å men som nu vill lära dig mer av en riktigt erfaren paddlare. Vi samlas 10:00 och vår guide börjar dagen med lite introduktion på land. Du får hjälp med att ställa in fotstöden, grundläggande paddelteknik, hur man lättast sjösätter och kommer i och ur kajaken, kamraträddning om du kapsejsat och lite om allmän säkerhet. Efter genomgång paddlar vi ut och tränar praktiskt på det vi gått igenom på land. Dagens vindstyrka, riktning och våghöjd avgör vilken tur som är möjlig den aktuella dagen.'
            },
            {
                title: 'Minnesvärd upplevelse',
                subTitle: 'Skräddarsydd företagsaktivitet',
                description: 'En perfekt kombination av paddling, mat och teambuilding för företag och grupper.',
                image: '/images/foretag-paddling.jpg',
                duration: 'Heldag eller halvdag',
                difficulty: 'easy',
                experienceType: 'corporate',
                startLocation: 'Varierar',
                endLocation: 'Stisses',
                includedItems: [
                    'Kanoter/kajaker/SUP',
                    'Flytväst',
                    'Paddlar',
                    'Instruktion',
                    'Säkerhetsutrustning'
                ],
                requiredExperience: 'Inga förkunskaper krävs',
                price: {
                    headers: ['Start', 'Mål', 'Paddeltid', 'Pris/person'],
                    rows: [
                        {
                            start: 'Stisses',
                            goal: 'Stisses',
                            duration: '1-4 h',
                            price: 290
                        },
                        {
                            start: 'Gåsahalsen',
                            goal: 'Stisses',
                            duration: '2 h',
                            price: 490
                        },
                        {
                            start: 'Höja',
                            goal: 'Stisses',
                            duration: '3,5 h',
                            price: 490
                        }
                    ]
                },
                extras: {
                    food: [
                        {
                            title: 'Fika',
                            description: 'Kaffe/The + Bulle (Även glutenfritt alternativ serveras)',
                            price: 69
                        },
                        {
                            title: 'Soppa',
                            description: 'Gulaschsoppa eller Morotssoppa med ingefära (vegetarisk och vegansk)',
                            price: 89
                        },
                        {
                            title: 'Korvbuffé',
                            description: 'Massor av olika korvar + tillbehör (Även vegetariska, laktosfria och glutenfria alternativ serveras)',
                            price: 99
                        }
                    ],
                    teambuilding: {
                        price: 200,
                        description: 'Noga uttänkta och välbeprövade teambuilding-övningar som passar utmärkt att göra innan eller efter paddlingen. Varje övning tar cirka 10 minuter och genomförs lagvis med 2-5 deltagare per lag.'
                    }
                },
                bookingRules: bookingRulesCorporate,
                longDescription: 'Efter många års erfarenhet vet vi att paddla + mat + teambuilding sammantaget blir en riktigt bra och minnesvärd personalaktivitet. Väljer ni att paddla kanoter så är de mycket stabila och nästan omöjliga att välta så länge man sitter ner när man paddlar. Vi kan sätta in extra säten om ni önskar vara tre personer i någon kanot. Vill någon paddla själv föreslår vi kajak eller SUP. Till all mat serveras vatten, läsk eller lättöl. Det går utmärkt att ha med egen alkoholhaltig dryck om så önskas.'
            },
            {
                title: 'Lärande friluftsliv',
                subTitle: 'För skolor och föreningar',
                description: 'Skräddarsydda paddlingsupplevelser för skolklasser och föreningar med fokus på lärande och naturupplevelser.',
                image: '/images/skola-paddling.jpg',
                duration: 'Varierande',
                difficulty: 'easy',
                experienceType: 'educational',
                startLocation: 'Varierar',
                endLocation: 'Stisses',
                includedItems: [
                    'Kanoter/kajaker',
                    'Flytväst',
                    'Paddlar',
                    'Instruktion',
                    'Säkerhetsutrustning'
                ],
                requiredExperience: 'Inga förkunskaper krävs',
                price: {
                    headers: ['Start', 'Mål', 'Cirka tid', 'Pris/person'],
                    rows: [
                        {
                            start: 'Stisses (1-12 km)',
                            goal: 'Stisses',
                            duration: '1-4 h',
                            price: 160
                        },
                        {
                            start: 'Höja (11 km)',
                            goal: 'Stisses',
                            duration: '3,5 h',
                            price: 240
                        },
                        {
                            start: 'Ugglarp (17 km)',
                            goal: 'Stisses',
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
                longDescription: 'Denna upplevelse vänder sig till dig som jobbar inom skola, fritidsgård, förening eller liknande och som planerar friluftsdag eller annan gemensam aktivitet för era elever/ungdomar. Våra kanoter är mycket stabila och nästan omöjliga att välta så länge man sitter ner när man paddlar. Vi kan sätta in extra säten i om ni i någon kanot önskar vara tre personer. Vill någon paddla själv föreslår vi kajak.'
            }
        ]
    }
    // Fortsättning med andra aktiviteter följer...
};
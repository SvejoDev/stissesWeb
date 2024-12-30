// src/lib/constants.ts
export const BOOKING_RULES = {
    private: `
        1. Bokning ska ske minst 24 timmar i förväg
        2. Avbokning ska ske senast 48 timmar innan bokad tid
        3. Betalning sker vid bokningstillfället
        4. Vid dåligt väder erbjuds ombokning eller återbetalning
    `,
    corporate: `
        1. Bokning ska ske minst 7 dagar i förväg
        2. Minimiantal 8 personer
        3. Avbokning ska ske senast 7 dagar innan bokad tid
        4. Fakturering efter genomförd aktivitet
    `,
    school: `
        1. Bokning ska ske minst 14 dagar i förväg
        2. Minimiantal 15 personer
        3. Avbokning ska ske senast 14 dagar innan bokad tid
        4. Fakturering efter genomförd aktivitet
        5. Minst en ansvarig vuxen per 8 deltagare
    `
};
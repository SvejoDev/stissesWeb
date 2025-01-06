// src/lib/types.ts
export type Difficulty = 'easy' | 'medium' | 'hard';
export type ExperienceType = 'regular' | 'guided' | 'corporate' | 'educational';

export interface Activity {
    title: string | (() => string);
    description: string | (() => string);
    heroImage: string;
    experiences: Experience[];
}



export interface JobRole {
    id: string;
    title: () => string;
    description: () => string;
}

export interface Experience {
    title: string | (() => string);
    subTitle: string | (() => string);
    description: string | (() => string);
    image: string;
    duration: string | (() => string);
    difficulty: Difficulty;
    experienceType: ExperienceType;
    startLocation: string | (() => string);
    endLocation: string;
    includedItems: (string | (() => string))[];
    requiredExperience: string | (() => string);
    price: string | (() => string) | PriceTable;
    maxParticipants?: {
        adults?: number;
        children?: number;
        total?: number;
        perInstructor?: number;
    };
    extras?: {
        food?: FoodOption[];
        teambuilding?: TeamBuilding;
    };
    recommendations?: {
        clothing?: string[];
        bring?: string[];
    };
    longDescription: string | (() => string);
    bookingRules: string[] | (() => string)[] | (() => string[]);
};

export interface PriceTable {
    headers: (string | (() => string))[];
    rows: PriceRow[];
}

export interface PriceRow {
    start?: string | (() => string);
    goal?: string | (() => string);
    duration?: string;
    paddleTime?: string | (() => string);
    nights?: number;
    price: number;
}

export interface FoodOption {
    title: string | (() => string);
    description: string | (() => string);
    price: number;
}

export interface TeamBuilding {
    price: number;
    description: string | (() => string);
}
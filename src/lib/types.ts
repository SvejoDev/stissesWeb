// src/lib/types.ts
export type Difficulty = 'easy' | 'medium' | 'hard';
export type ExperienceType = 'regular' | 'guided' | 'corporate' | 'educational';

export interface Activity {
    title: string;
    description: string;
    heroImage: string;
    experiences: Experience[];
}

export interface Experience {
    title: string | (() => string);
    subTitle: string;
    description: string;
    image: string;
    duration: string;
    difficulty: Difficulty;
    experienceType: ExperienceType;
    startLocation: string;
    endLocation: string;
    includedItems: string[];
    requiredExperience: string;
    price: string | PriceTable;
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
    bookingRules: string;
    longDescription: string;
}

export interface PriceTable {
    headers: string[];
    rows: Record<string, string | number>[];
}

export interface FoodOption {
    title: string;
    description: string;
    price: number;
}

export interface TeamBuilding {
    price: number;
    description: string;
}
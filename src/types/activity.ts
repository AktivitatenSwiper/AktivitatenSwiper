export interface Activity {
    id: number;
    name: string;
    description: string;
    category: "Kultur" | "Sport" | "Essen & Trinken" | "Outdoor" | "Indoor" | "Entspannung" | "Abenteuer" | "Soziales" | "Sonstige";
    min_required_time: number;
    max_required_time: number;
    min_participants: number;
    max_participants: number;
    cost: "Free" | "€" | "€€" | "€€€";
    location_type: "Indoor" | "Outdoor" | "Both";
    required_equipment?: string[];
    seasonal_suitability: ("Spring" | "Summer" | "Autumn" | "Winter" | "Year-round")[];
    tags?: string[];
    image: string;
}
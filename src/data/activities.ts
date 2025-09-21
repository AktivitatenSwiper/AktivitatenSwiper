import type {Activity} from "../types/activity.ts";

export const activities: Activity[] = [
    {
        id: 1,
        name: 'Schnitzeljagd in der Altstadt',
        tags: ['Vegan', 'Outdoor'],
        price: 'ab 25 € pro Person',
        description:
            'Erkunde die historische Altstadt mit spannenden Aufgaben und coolen Preisen. Ideal für Gruppen!',
        image:
            'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=800&q=60',
    },
    {
        id: 2,
        name: 'Kochkurs: Asiatische Spezialitäten',
        tags: ['Gourmet', 'Indoor'],
        price: 'ab 45 € pro Person',
        description:
            'Lerne, wie man authentische asiatische Gerichte zubereitet – inklusive Weinbegleitung.',
        image:
            'https://images.unsplash.com/photo-1525755662778-989d0524087e?auto=format&fit=crop&w=800&q=60',
    },
    {
        id: 3,
        name: 'Biergarten‑Tour in München',
        tags: ['Brauerei', 'Outdoor'],
        price: 'ab 30 € pro Person',
        description:
            'Entdecke die besten Biergärten Münchens, kühle dich an einem heißen Sommertag ab und genieße lokale Spezialitäten.',
        image:
            'https://images.unsplash.com/photo-1558609878-f6e2f5a7b9c4?auto=format&fit=crop&w=800&q=60',
    },
];

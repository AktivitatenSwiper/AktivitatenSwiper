import React, { useState } from "react";
import { Button, Card, Group, Stack, Text } from "@mantine/core";
import { activities } from "../data/activities";

interface Props {
    onBack: () => void;
    onApply?: (result: { include: string[]; exclude: string[] }) => void;
}

type ButtonState = 0 | 1 | 2; // 0 = neutral, 1 = include, 2 = exclude

const FilterTagView: React.FC<Props> = ({ onBack, onApply }) => {
    // Collect unique tags from all activities
    const tags: string[] = [];
    activities.forEach((activity) => {
        activity.tags.forEach((tag) => {
            if (!tags.some((e) => e.toLowerCase() === tag.toLowerCase())) {
                tags.push(tag);
            }
        });
    });
    tags.sort()

    // Manage each tag’s state (neutral, include, exclude)
    const [buttonStates, setButtonStates] = useState<Record<string, ButtonState>>(
        {}
    );

    // Cycle state when clicked
    const handleClick = (label: string) => {
        setButtonStates((prev) => {
            const current = prev[label] ?? 0;
            const next = ((current + 1) % 3) as ButtonState;
            return { ...prev, [label]: next };
        });
    };

    // Mantine styling based on tag state
    const getMantineProps = (state: ButtonState) => {
        switch (state) {
            case 1:
                return { color: "green", variant: "filled" as const };
            case 2:
                return { color: "red", variant: "filled" as const };
            default:
                return { color: "gray", variant: "light" as const };
        }
    };

    // Extract selections and trigger callback
    const handleApply = () => {
        const include = Object.entries(buttonStates)
            .filter(([, state]) => state === 1)
            .map(([label]) => label);
        const exclude = Object.entries(buttonStates)
            .filter(([, state]) => state === 2)
            .map(([label]) => label);

        if (onApply) {
            onApply({ include, exclude });
        }
    };

    return (
        <Card shadow="sm" radius="md" withBorder>
            <Stack gap="md">
                <Text fw="bold" size="lg">
                    Tags filtern
                </Text>

                {/* Tag Buttons */}
                <Group gap="xs" justify="flex-start" wrap="wrap">
                    {tags.map((label) => {
                        const state = buttonStates[label] ?? 0;
                        const props = getMantineProps(state);
                        return (
                            <Button
                                key={label}
                                {...props}
                                size="sm"
                                onClick={() => handleClick(label)}
                                radius="xl"
                            >
                                {label}
                            </Button>
                        );
                    })}
                </Group>

                <Group justify="space-between" mt="md">
                    <Button variant="outline" color="gray" onClick={onBack}>
                        ← Zurück
                    </Button>
                    <Button variant="filled" color="blue" onClick={handleApply}>
                        Anwenden
                    </Button>
                </Group>
            </Stack>
        </Card>
    );
};

export default FilterTagView;

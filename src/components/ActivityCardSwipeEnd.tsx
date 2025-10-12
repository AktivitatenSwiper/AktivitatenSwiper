import { Stack, Text, Title } from "@mantine/core";
import { IconSun } from "@tabler/icons-react";

export default function ActivityCardSwipeEnd() {
	return (
		<Stack align="center" justify="center" style={{ flexGrow: 1, height: "100%" }}>
			<IconSun size={40} stroke={1.5} />
			<Title>Keine weiteren Aktivitäten.</Title>
			<Text c="dimmed" size="lg" ta="center">
				Du hast alle Aktivitäten zugeordnet. Prüfe deine gespeicherten Aktivitäten, um die beste Aktivität zu finden.
			</Text>
		</Stack>
	);
}
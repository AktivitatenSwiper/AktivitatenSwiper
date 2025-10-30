import { Container, Stack, Text, Title, Card, Group, ThemeIcon, ScrollArea } from "@mantine/core";
import { 
  IconEyeQuestion, 
  IconHandMove, 
  IconCheck, 
  IconX, 
  IconInfoCircle, 
  IconStar, 
  IconFilter,
  IconArrowBackUp,
  IconSwipe,
  IconPointer,
  IconKeyboard
} from "@tabler/icons-react";

export default function HelpPage() {
  return (
	<ScrollArea style={{ height: "calc(100vh - 64px)" }}>
		<Container p="md" w="100%" maw={800}>
		<Title mb="lg">Hilfe</Title>

		<Title order={2} my="lg">
			<Group gap="xs">
			<IconEyeQuestion size={28} />
			<span>Symbol-Erklärung</span>
			</Group>
		</Title>
		<Stack gap="md" mb="xl">
			<Card shadow="sm" padding="md" withBorder>
			<Group gap="md">
				<ThemeIcon size="xl" radius="xl" variant="light" color="green">
				<IconCheck size={24} />
				</ThemeIcon>
				<div>
				<Text fw={600}>Interesse vorhanden</Text>
				<Text size="sm" c="dimmed">
					Markiert die Aktivität als interessant und speichert sie unter Vorgemerkte Aktivitäten.  
				</Text>
				</div>
			</Group>
			</Card>

			<Card shadow="sm" padding="md" withBorder>
			<Group gap="md">
				<ThemeIcon size="xl" radius="xl" variant="light" color="red">
				<IconX size={24} />
				</ThemeIcon>
				<div>
				<Text fw={600}>Kein Interesse</Text>
				<Text size="sm" c="dimmed">
					Überspringt die aktuelle Aktivität ohne sie zu speichern.
				</Text>
				</div>
			</Group>
			</Card>

			<Card shadow="sm" padding="md" withBorder>
			<Group gap="md">
				<ThemeIcon size="xl" radius="xl" variant="light" color="blue">
				<IconInfoCircle size={24} />
				</ThemeIcon>
				<div>
				<Text fw={600}>Alle Informationen anzeigen</Text>
				<Text size="sm" c="dimmed">
					Öffnet ein Fenster mit detaillierten Informationen zur Aktivität.
				</Text>
				</div>
			</Group>
			</Card>

			<Card shadow="sm" padding="md" withBorder>
			<Group gap="md">
				<ThemeIcon size="xl" radius="xl" variant="light" color="orange">
				<IconStar size={24} />
				</ThemeIcon>
				<div>
				<Text fw={600}>Als Favorit hinzufügen</Text>
				<Text size="sm" c="dimmed">
					Trifft genau die Interessen der Person und speichert sie unter Meine Favoriten.            
				</Text>
				</div>
			</Group>
			</Card>

			<Card shadow="sm" padding="md" withBorder>
			<Group gap="md">
				<ThemeIcon size="xl" radius="xl" variant="filled" color="gray">
				<IconFilter size={24} />
				</ThemeIcon>
				<div>
				<Text fw={600}>Filter</Text>
				<Text size="sm" c="dimmed">
					Öffnet die Filter-Optionen, um Aktivitäten nach Kategorien oder Kriterien zu filtern.
				</Text>
				</div>
			</Group>
			</Card>

			<Card shadow="sm" padding="md" withBorder>
			<Group gap="md">
				<ThemeIcon size="xl" radius="xl" variant="filled" color="gray">
				<IconArrowBackUp size={24} />
				</ThemeIcon>
				<div>
				<Text fw={600}>Letzte Entscheidung rückgängig machen</Text>
				<Text size="sm" c="dimmed">
					Macht die letzte Aktion rückgängig.
				</Text>
				</div>
			</Group>
			</Card>
		</Stack>

		<Title order={2} my="lg">
			<Group gap="xs">
			<IconHandMove size={28} />
			<span>Interaktions-Möglichkeiten</span>
			</Group>
		</Title>
		<Stack gap="md">
			<Card shadow="sm" padding="md" withBorder>
			<Group gap="md" align="flex-start">
				<ThemeIcon size="xl" radius="xl" variant="light" color="violet">
				<IconSwipe size={24} />
				</ThemeIcon>
				<div style={{ flex: 1 }}>
				<Text fw={600} mb="xs">Touchscreen & Trackpad Wischen</Text>
				<Text size="sm" c="dimmed" mb="xs">
					Wische die Karte nach rechts oder links, um Interesse zu zeigen oder zu überspringen:
				</Text>
				<Text size="sm" pl="md"  c="dimmed">- Nach rechts wischen = Interesse vorhanden</Text>
				<Text size="sm" pl="md"  c="dimmed">- Nach links wischen = Kein Interesse</Text>
				<Text size="sm" pl="md"  c="dimmed">- Nach oben wischen = Details anzeigen</Text>
				<Text size="sm" c="dimmed" mt="xs">
					Die Buttons zeigen während des Wischens die entsprechende Aktion an.
				</Text>
				</div>
			</Group>
			</Card>

			<Card shadow="sm" padding="md" withBorder>
			<Group gap="md" align="flex-start">
				<ThemeIcon size="xl" radius="xl" variant="light" color="cyan">
				<IconKeyboard size={24} />
				</ThemeIcon>
				<div style={{ flex: 1 }}>
				<Text fw={600} mb="xs">Tastatur-Navigation</Text>
				<Text size="sm" c="dimmed" mb="xs">
					Verwende die Pfeiltasten für schnelle Navigation:
				</Text>
				<Text size="sm" pl="md"  c="dimmed"> - Pfeil rechts (→) = Interesse vorhanden</Text>
				<Text size="sm" pl="md"  c="dimmed"> - Pfeil links (←) = Kein Interesse</Text>
				<Text size="sm" pl="md"  c="dimmed"> - Pfeil hoch (↑) = Details anzeigen</Text>
				</div>
			</Group>
			</Card>

			<Card shadow="sm" padding="md" withBorder>
			<Group gap="md" align="flex-start">
				<ThemeIcon size="xl" radius="xl" variant="light" color="teal">
				<IconPointer size={24} />
				</ThemeIcon>
				<div style={{ flex: 1 }}>
				<Text fw={600} mb="xs">Maus-Interaktionen</Text>
				<Text size="sm" c="dimmed" mb="xs">
					Weitere Interaktionsmöglichkeiten mit der Aktivitätenkarte:
				</Text>
				<Text size="sm" pl="md" c="dimmed">- Buttons unten = Alle Aktionen bequem per Klick ausführen</Text>
				</div>
			</Group>
			</Card>
		</Stack>
		</Container>
	</ScrollArea>
  );
}

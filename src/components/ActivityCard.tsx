import { Card, Text, Badge, Group, BackgroundImage, Stack } from '@mantine/core';
import { IconCoinEuro, IconUser, IconUsersGroup } from '@tabler/icons-react';
import type { Activity } from '../types/activity.ts'

export default function (props: { data: Activity, onClick: () => void, onDoubleClick: () => void }) {
  const data = props.data;
  const participantsIcon = data.max_participants === 1 ? <IconUser /> : <IconUsersGroup />;
  const numberOfParticipants =
    data.min_participants === data.max_participants
      ? data.min_participants
      : `${data.min_participants} - ${data.max_participants}`;

  const priceRange =
    data.min_cost === data.max_cost
      ? data.min_cost
      : `${data.min_cost} - ${data.max_cost}`;


  return (
    <Card data-id={data.id} shadow="sm" padding="lg" radius="md" withBorder style={{ flexGrow: 1, height: "100%" }}>
      <Card.Section style={{ flexGrow: 1, position: "relative" }}>
        <BackgroundImage src={data.image} h="100%">
          <Stack justify="flex-end" align="flex-end" h="100%" p="md" bg="linear-gradient(#0000 60%, #000c)">
            <Group>
              <Badge variant="light" leftSection={participantsIcon} color="white" size="xl">
                {numberOfParticipants} P.
              </Badge>
              <Badge variant="light" leftSection={<IconCoinEuro />} color="orange" size="xl">
                {priceRange} €
              </Badge>
            </Group>
          </Stack>
        </BackgroundImage>
      </Card.Section>

      <Stack justify="space-between" mt="md" gap={0}>
        <Text fw="bold" size="xl" lh="sm">
          {data.name}
        </Text>
        <Text size="sm" c="dimmed">
          {data.description}
        </Text>
      </Stack>
    </Card>
  );
}
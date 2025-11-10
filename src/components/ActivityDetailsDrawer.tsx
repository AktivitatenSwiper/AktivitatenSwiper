import { IconCalendarPlus, IconClock, IconCoinEuro, IconShare, IconTags, IconTemperatureSun, IconTool, IconUser, IconUsersGroup } from '@tabler/icons-react';
import type { Activity } from '../types/activity';
import { ActionIcon, Badge, Button, Divider, Drawer, Grid, Group, Text } from '@mantine/core';
import React from 'react';
export default function ActivityDetailsDrawer(props: { data: Activity|null, opened: boolean, onClose: () => void }) {
	if(!props.data) return <></>;

	const data = props.data;
  const numberOfParticipants =
    data.min_participants === data.max_participants
      ? data.min_participants
      : `${data.min_participants} - ${data.max_participants}`;

  const priceRange =
    data.min_cost === data.max_cost
      ? data.min_cost
      : `${data.min_cost} - ${data.max_cost}`;

			const dataRows = [
				{
					color: "gray",
					icon: data.max_participants === 1 ? <IconUser /> : <IconUsersGroup />,
					text: "Teilnehmer",
					value: <>{numberOfParticipants} Person(en)</>,
				},
				{
					color: "orange",
					icon: <IconCoinEuro />,
					text: "Kosten",
					value: <>{priceRange} €</>,
				},
				{
					color: "teal",
					icon: <IconClock />,
					text: "Dauer",
					value: <>
						{data.min_required_time % 60 === 0 && data.max_required_time % 60 === 0
							? (
								data.min_required_time === data.max_required_time
									? `${data.min_required_time / 60} h`
									: `${data.min_required_time / 60} - ${data.max_required_time / 60} h`
								)
							: (
								data.min_required_time === data.max_required_time
									? `${data.min_required_time} m`
									: `${data.min_required_time} - ${data.max_required_time} m`
								)
						}
					</>,
				},
				{
					color: "blue",
					icon: <IconTool />,
					text: "Ausrüstung",
					value: <>
						{data.required_equipment && data.required_equipment.length > 0
							? data.required_equipment.join(', ')
							: '-'}
					</>,
				},
				{
					color: "pink",
					icon: <IconTemperatureSun />,
					text: "Saison",
					value: <>{data.seasonal_suitability.join(', ')}</>,
				},
				{
					color: "indigo",
					icon: <IconTags />,
					text: "Tags",
					value: <>
						{data.tags.map(tag => (
							<Badge key={tag} color="indigo" variant="light" mr={4}>{tag}</Badge>
						))}
					</>,
				},
			];

	// Share and Add-to-Calendar handlers
	const shareTitle = "Aktivitäts-Idee: " + data.name;
	const shareDescription = data.description + "\n\nHier ansehen: ";
	const shareUrl =  window.location.href;

	const openMailWindow = () => {
		const emailSubject = encodeURIComponent(shareTitle);
		const emailBody = encodeURIComponent(shareDescription + shareUrl);
		window.open(`mailto:?subject=${emailSubject}&body=${emailBody}`, '_self');
	};

	const handleShare = async () => {
		if (navigator.share) {
			try {
				await navigator.share({
					title: shareTitle,
					text: shareDescription,
					url : shareUrl,
				});
			} catch (err) {
				// fallback to email if share fails or is cancelled
				openMailWindow();
			}
		} else {
			openMailWindow();
		}
	};

	const formatDate = (date: Date) => date.toISOString().replace(/-|:|\.\d+/g, '').slice(0, 15);

	const handleAddToCalendar = () => {
		const start = new Date();
		const end = new Date(start.getTime() + 60 * 60 * 1000); // +1 hour
		const calendarUrl = `https://www.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(shareTitle)}&details=${encodeURIComponent(shareDescription + shareUrl)}&dates=${formatDate(start)}/${formatDate(end)}`;

		window.open(calendarUrl, '_blank');
	};


	return (
		<Drawer
			offset={8}
			radius="md"
			opened={props.opened}
			onClose={props.onClose}
			size="36rem"
			title={
				<Group>
					<Text fw="bold" size="xl">{props.data.name}</Text>
					<Badge color="blue" variant="light">{data.category}</Badge>
				</Group>
			}
			position="bottom"
		>
			<Text c="dimmed">{data.description}</Text>
			<div style={{flexGrow: 1}}></div>
			<Divider my="lg" color="gray" />
			<Grid gutter="sm">
				{dataRows.map((row) => (
					<React.Fragment key={row.text}>
						<Grid.Col span={5}>
							<Group>
								{row.icon && <ActionIcon color={row.color}>{row.icon}</ActionIcon>}
								<Text c={row.color} fw={700}>{row.text}</Text>
							</Group>
						</Grid.Col>
						<Grid.Col span={7}>
							{row.value}
						</Grid.Col>
					</React.Fragment>
				))}
			</Grid>
			<Divider my="lg" color="gray" />

			<Button
				fullWidth
				color="blue"
				leftSection={<IconCalendarPlus />}
				onClick={() => {
					handleAddToCalendar();
				}}
			>
				Zum Kalender hinzufügen
			</Button>
			<Button
				fullWidth
				color="blue"
				leftSection={<IconShare />}
				mt="sm"
				variant="light"
				onClick={() => {
					handleShare();
				}}
			>
				Teilen
			</Button>
		</Drawer>
	)
}
import './App.css'
import '@mantine/core/styles.css';

import { AppShell, Burger, Container, Group, MantineProvider, Text, UnstyledButton } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import NavigationLinks from './components/NavigationLinks';
import { useState } from 'react';
import SwipeCardPage from './pages/SwipeCardPage';
import SavedItemsPage from './pages/SavedItemsPage';
import HelpPage from './pages/HelpPage';

const App: React.FC = () => {
  return <MantineProvider>
    <FullAppShell></FullAppShell>
  </MantineProvider>;
}

function FullAppShell() {
  const [opened, { toggle }] = useDisclosure();
  const [page, setPage] = useState("")

  let pageContent = <SwipeCardPage />
  if(page === "saved") pageContent = <SavedItemsPage />
  if(page === "help") pageContent = <HelpPage />

  return (
    <AppShell
      header={{ height: 60 }}
      navbar={{ width: 300, breakpoint: 'sm', collapsed: { desktop: true, mobile: !opened } }}
      padding="0"
      style={{ marginInline: "auto"}}
    >
      <AppShell.Header>
        <Container h="100%">
            <Group h="100%">
            <Burger opened={opened} onClick={toggle} size="sm" hiddenFrom="sm" />
            <Group justify="space-between" style={{ flex: 1 }}>
              <Text size="xl" fw="bold" ta="center">ActivitySwipe</Text>
              <Group mx="xl" gap={0} visibleFrom="sm">
                <NavigationLinks page={page} setPage={setPage} />
              </Group>

              {/* Wir machen rechts den gleichen Text (versteckt) hin, wie links, damit es in der Mitte zentriert aussieht */}
              <Text size="xl" fw="bold" ta="center" visibleFrom="sm" aria-hidden="true" opacity={0}>ActivitySwipe</Text>
            </Group>
          </Group>
        </Container>
      </AppShell.Header>

      <AppShell.Navbar py="md" px={4}>
        <NavigationLinks page={page} setPage={setPage} />
      </AppShell.Navbar>

      <AppShell.Main>
        {pageContent}
      </AppShell.Main>
    </AppShell>
  );
};

export default App;

import React, { useEffect, useState } from 'react';
import { getValue } from '../../utils';

import { Grid, Modal, Paper, Stack, Tabs, Text } from '@mantine/core';
import RelationPanel from './RelationPanel';

export function ViewDialog({ opened, onClose, id, relations, onViewEntry }) {
  const [entry, setEntry] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    onViewEntry(id)
      .then((data) => setEntry(data))
      .catch((error) => console.log(error));
  }, [onViewEntry, id]);

  const title = entry?.show_title.substr(entry?.show_title.indexOf(' ') + 1) + ` (#${entry?.id})`;

  return entry && !loading ? (
    <Modal styles={{ root: { minHeight: '640px' } }} opened={opened} title={title} onClose={onClose}>
      <Tabs>
        <Tabs.Tab value={0} label="Details">
          <Paper p="md" withBorder>
            <Stack spacing="md">
              {entry.show_columns.map((column, index) => {
                return (
                  <Grid key={index}>
                    <Grid.Col span={4}>
                      <Text size="md" sx={{}}>
                        {entry.label_columns[column]}
                      </Text>
                    </Grid.Col>
                    <Grid.Col size="md" span={1}>
                      <Text color="dimmed">:</Text>
                    </Grid.Col>
                    <Grid.Col span={4}>
                      <Text size="md" color="dimmed" sx={{}}>
                        {getValue(entry.result[column])}
                      </Text>
                    </Grid.Col>
                  </Grid>
                );
              })}
            </Stack>
          </Paper>
        </Tabs.Tab>
        {relations.map((relation, index) => {
          return (
            <Tabs.Tab key={index} label={relation.name}>
              <Paper withBorder>
                <RelationPanel relation={{ ...relation, id }} />
              </Paper>
            </Tabs.Tab>
          );
        })}
      </Tabs>
    </Modal>
  ) : null;
}

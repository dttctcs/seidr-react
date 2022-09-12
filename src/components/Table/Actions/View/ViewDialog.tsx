import React, { useEffect, useState } from 'react';
import { useTable } from '../../../TableProvider';
import { getValue } from '../../utils';

import { Grid, LoadingOverlay, Modal, Paper, Stack, Tabs, Text } from '@mantine/core';
import RelationPanel from './RelationPanel';

export function ViewDialog({ id, opened, onClose }) {
  const { info, getEntry } = useTable();

  const [item, setItem] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    getEntry(id)
      .then((data) => setItem(data))
      .finally(() => setLoading(false));
  }, [id]);

  if (!item) {
    return null;
  }

  return (
    <Modal
      styles={{ root: { minHeight: '640px' } }}
      opened={opened}
      title={`${item?.show_title} (#${item?.id})`}
      onClose={onClose}
      centered
    >
      <LoadingOverlay visible={loading} />

      {!loading && item ? (
        <Tabs defaultValue="details">
          <Tabs.List>
            <Tabs.Tab value="details">Details</Tabs.Tab>
            {info.relations.map((relation, index) => {
              return (
                <Tabs.Tab key={index} value={relation.name}>
                  {relation.name}
                </Tabs.Tab>
              );
            })}
          </Tabs.List>
          <Tabs.Panel pt="xs" value="details">
            <Paper p="xs" withBorder>
              <Stack spacing="md">
                {item.show_columns.map((column, index) => {
                  return (
                    <Grid key={index}>
                      <Grid.Col span={4}>
                        <Text size="md" sx={{}}>
                          {item.label_columns[column]}
                        </Text>
                      </Grid.Col>
                      <Grid.Col span={1}>
                        <Text size="xs" color="dimmed">
                          :
                        </Text>
                      </Grid.Col>
                      <Grid.Col span={4}>
                        <Text size="md" color="dimmed" sx={{}}>
                          {getValue(item.result[column])}
                        </Text>
                      </Grid.Col>
                    </Grid>
                  );
                })}
              </Stack>
            </Paper>
          </Tabs.Panel>
          {info.relations.map((relation, index) => {
            return (
              <Tabs.Panel pt="xs" key={index} value={relation.name}>
                <Paper withBorder>
                  <RelationPanel
                    relatedPath={relation.path}
                    id={item.id}
                    foreign_key={relation.foreign_key}
                    type={relation.type}
                  />
                </Paper>
              </Tabs.Panel>
            );
          })}
        </Tabs>
      ) : null}
    </Modal>
  );
}

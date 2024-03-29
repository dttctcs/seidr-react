import React from 'react';
import { getValue } from '../../utils';

import { Grid, LoadingOverlay, Modal, Paper, ScrollArea, Stack, Tabs, Text } from '@mantine/core';
import RelationPanel from './RelationPanel';


export function ViewDialog({ item, info, loading, opened, onClose }) {
  return (
    <Modal
      opened={opened}
      onClose={onClose}
      title={`${item?.show_title} (#${item?.id})`}
      size='lg'
      centered
      zIndex={1000}
    >
      <LoadingOverlay visible={loading} />

      {!loading && item ? (
        <Tabs defaultValue='details'>
          <Tabs.List>
            <Tabs.Tab value='details'>Details</Tabs.Tab>
            {info.relations.map((relation, index) => {
              return (
                <Tabs.Tab key={index} value={relation.name}>
                  {relation.name}
                </Tabs.Tab>
              );
            })}
          </Tabs.List>
          <Tabs.Panel pt='xs' value='details'>
            <Paper p='xs' withBorder>
              <Stack spacing='md'>
                <ScrollArea h={450}  type="auto" >
                {item.show_columns.map((column, index) => {
                  return (
                    <Grid key={index}>
                      <Grid.Col span={4}>
                        <Text size='md'>
                          {item.label_columns[column]}
                        </Text>
                      </Grid.Col>
                      <Grid.Col span={1}>
                        <Text size='xs' color='dimmed'>
                          :
                        </Text>
                      </Grid.Col>
                      <Grid.Col span={4}>
                        <Text size='md' c='dimmed'>
                          {getValue(item.result, column)}
                        </Text>
                      </Grid.Col>
                    </Grid>
                  );
                })}
                </ScrollArea>
              </Stack>
            </Paper>
          </Tabs.Panel>
          {info.relations.map((relation, index) => {
            return (
              <Tabs.Panel pt='xs' key={index} value={relation.name}>
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

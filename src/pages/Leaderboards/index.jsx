import {
  Avatar, Container, Table, Text, Title
} from '@mantine/core';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { asyncReceiveLeaderboards } from '../../states/leaderboards/action';

function Leaderboards() {
  const { leaderboards } = useSelector((states) => states);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(asyncReceiveLeaderboards());
  }, [dispatch]);

  if (!leaderboards) {
    return null;
  }

  const rows = leaderboards.map(({ score, user }) => (
    <tr key={user.email}>
      <td width={50}>
        <Avatar src={user.avatar} size="md" radius="xl" />
      </td>
      <td>{user.name}</td>
      <td>{user.email}</td>
      <td>
        <Text fz={18} c="blue" fw={700}>
          {score}
        </Text>
      </td>
    </tr>
  ));

  return (
    <Container px={32}>
      <Title order={2} my={32}>
        Klasemen Pengguna Aktif
      </Title>
      <Table fontSize="md">
        <thead>
          <tr>
            <th> </th>
            <th>Nama</th>
            <th>Email</th>
            <th>Skor</th>
          </tr>
        </thead>
        <tbody>{rows}</tbody>
      </Table>
    </Container>
  );
}

export default Leaderboards;

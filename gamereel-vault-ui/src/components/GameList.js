// src/components/GamesList.js
import React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';

function GamesList({ games }) {
  return (
    <Table>
      <TableHead>
        <TableRow>
          <TableCell>Title</TableCell>
          {/* Other headers */}
        </TableRow>
      </TableHead>
      <TableBody>
        {games.map((game) => (
          <TableRow key={game.id}>
            <TableCell>{game.title}</TableCell>
            {/* Other data cells */}
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}

export default GamesList;

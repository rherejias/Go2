import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import React from "react";
import { useNavigate } from 'react-router-dom'
import { TableVirtuoso, TableComponents } from 'react-virtuoso';
import { useTournamentContextValue, ITrainer } from "../TournamentContext";

interface ColumnData {
  dataKey: string;
  label: string;
}

export default function TrainerTable() {
  const navigate = useNavigate();
  const { state, actions } = useTournamentContextValue()
  const { dataList, search = '' } = state!;
  const searchQuery = search.toLowerCase();
  const filteredList = dataList?.filter(list =>
    list.name.toLowerCase().includes(searchQuery)
  );

  const columns: ColumnData[] = [
    {
      label: 'Name',
      dataKey: 'name',
    },
    {
      label: 'Rank',
      dataKey: 'rank',
    },
  ]

  const VirtuosoTableComponents: TableComponents<ITrainer> = {
    Scroller: React.forwardRef<HTMLDivElement>((props, ref) => (
      <TableContainer component={Paper} {...props} ref={ref} />
    )),
    Table: (props) => (
      <Table {...props} aria-label="simple table" />
    ),
    TableHead,
    TableRow: ({ item: _item, ...props }) =>
      <TableRow
        {...props}
        onClick={() => {
          actions?.setSelectedTrainer(_item);
          navigate(`/details/${_item.id}`);
        }}
        sx={{
          "&:last-child td, &:last-child th": { border: 0 },
          padding: 3,
          "&:hover": {
            backgroundColor: "#f5f5f5",
          },
        }}
      />,
    TableBody: React.forwardRef<HTMLTableSectionElement>((props, ref) => (
      <TableBody {...props} ref={ref} />
    )),
  };

  function fixedHeaderContent() {
    return (
      <TableRow>
        {columns.map((column) => (
          <TableCell
            key={column.dataKey}
            variant="head"
            sx={{
              backgroundColor: 'background.paper',
            }}
          >
            <strong>{column.label}</strong>
          </TableCell>
        ))}
      </TableRow>
    );
  }

  function rowContent(_index: number, row: any) {
    return (
      <React.Fragment>
        {columns.map((column) => (
          <TableCell key={column.dataKey}>
            {column.dataKey === 'rank' ? `${row[column.dataKey]} Rank` : row[column.dataKey]}
          </TableCell>
        ))}
      </React.Fragment>
    );
  }

  return (
    <Paper elevation={0} sx={{ height: 325, width: '100%' }}>
      <TableVirtuoso
        data={filteredList}
        components={VirtuosoTableComponents}
        fixedHeaderContent={fixedHeaderContent}
        itemContent={rowContent}
      />
    </Paper>
  );
}

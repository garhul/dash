import { ReactNode } from 'react';
import { Table } from 'react-bootstrap'

export type simpleTableProps = {
  cols: string[];
  rows: (string | ReactNode)[][];
}

export default function SimpleTable({ cols, rows }: simpleTableProps) {
  return (
    <Table striped bordered hover variant="dark" style={{ marginTop: "1em" }}>
      <thead style={{ color: "#DDD", textAlign: 'center' }}>
        <tr>{cols.map((c, ck) => <th key={ck}>{c}</th>)}</tr>
      </thead>
      <tbody>
        {rows.map((row, rk) =>
        (<tr key={`${rk}`}>
          {row.map((c, ck) => (<td key={`${rk}_${ck}`}>{c}</td>))}
        </tr>)
        )}
      </tbody>
    </Table>
  )
}
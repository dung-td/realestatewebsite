import * as React from "react"
import {
  DataGrid,
  GridActionsCellItem,
  GridRowId,
  GridColumns,
} from "@mui/x-data-grid"
import DeleteIcon from "@mui/icons-material/Delete"
import SecurityIcon from "@mui/icons-material/Security"
import FileCopyIcon from "@mui/icons-material/FileCopy"
import Chip from "@mui/material/Chip"

const initialRows = [
  {
    id: 1,
    name: "Damien",
    age: 25,
    dateCreated: "11/11/2022",
    lastLogin: "22/02/2022",
    isAdmin: true,
  },
  {
    id: 2,
    name: "Nicolas",
    age: 36,
    dateCreated: "11/11/2022",
    lastLogin: "22/02/2022",
    isAdmin: false,
  },
  {
    id: 3,
    name: "Kate",
    age: 19,
    dateCreated: "11/11/2022",
    lastLogin: "22/02/2022",
    isAdmin: false,
  },
]

type Row = typeof initialRows[number]

const AdminUser = () => {
  const [rows, setRows] = React.useState<Row[]>(initialRows)

  const deleteUser = React.useCallback(
    (id: GridRowId) => () => {
      setTimeout(() => {
        setRows((prevRows) => prevRows.filter((row) => row.id !== id))
      })
    },
    []
  )

  const toggleAdmin = React.useCallback(
    (id: GridRowId) => () => {
      setRows((prevRows) =>
        prevRows.map((row) =>
          row.id === id ? { ...row, isAdmin: !row.isAdmin } : row
        )
      )
    },
    []
  )

  const duplicateUser = React.useCallback(
    (id: GridRowId) => () => {
      setRows((prevRows) => {
        const rowToDuplicate = prevRows.find((row) => row.id === id)!
        return [...prevRows, { ...rowToDuplicate, id: Date.now() }]
      })
    },
    []
  )

  const Badge = () => {
    return <Chip label="Chip Outlined" variant="outlined" />
  }

  const columns = React.useMemo<GridColumns<Row>>(
    () => [
      {
        field: "name",
        headerName: "Tên người dùng",
        type: "string",
        width: 150,
      },
      { field: "age", headerName: "Tuổi", type: "number" },
      { field: "dateCreated", type: "date", width: 130 },
      { field: "lastLogin", type: "dateTime", width: 180 },
      { field: "isAdmin", type: "boolean", width: 120 },
      {
        field: "actions",
        type: "actions",
        width: 80,
        getActions: (params: any) => [
          <GridActionsCellItem
            key="delete"
            icon={<DeleteIcon />}
            label="Delete"
            onClick={deleteUser(params.id)}
          >
            <Badge />
          </GridActionsCellItem>,
        ],
      },
    ],
    [deleteUser, toggleAdmin, duplicateUser]
  )

  return (
    <div className="ml-72 p-8 min-h-screen">
      <div className="grid grid-full">
        <div className="mb-4">
          <p className="font-bold text-xl">Danh sách người dùng</p>
          <div className="mt-2 border border-2 border-t border-[#E21717]"></div>

          <div style={{ height: 800, width: "100%", marginTop: 16 }}>
            <DataGrid
              rows={rows}
              columns={columns}
              pageSize={10}
              rowsPerPageOptions={[5]}
              checkboxSelection
            />
          </div>
        </div>
      </div>
    </div>
  )
}

export default AdminUser

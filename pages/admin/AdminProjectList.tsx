import * as React from "react"
import Link from "next/link"
import { alpha } from "@mui/material/styles"
import Button from "@mui/material/Button"
import Box from "@mui/material/Box"
import Paper from "@mui/material/Paper"
import Table from "@mui/material/Table"
import TableBody from "@mui/material/TableBody"
import TableCell from "@mui/material/TableCell"
import TableContainer from "@mui/material/TableContainer"
import TableHead from "@mui/material/TableHead"
import TablePagination from "@mui/material/TablePagination"
import TableSortLabel from "@mui/material/TableSortLabel"
import TableRow from "@mui/material/TableRow"
import Checkbox from "@mui/material/Checkbox"
import Toolbar from "@mui/material/Toolbar"
import Tooltip from "@mui/material/Tooltip"
import Typography from "@mui/material/Typography"
import Backdrop from "@mui/material/Backdrop"
import Modal from "@mui/material/Modal"
import TextField from "@mui/material/TextField"
import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker"
import CircularProgress from "@mui/material/CircularProgress"
import Chip from "@mui/material/Chip"
import IconButton from "@mui/material/IconButton"
import { visuallyHidden } from "@mui/utils"

import CheckIcon from "@mui/icons-material/Check"
import DeleteIcon from "@mui/icons-material/Delete"
import FilterListIcon from "@mui/icons-material/FilterList"
import CloseIcon from "@mui/icons-material/Close"
import BlockIcon from "@mui/icons-material/Block"

import server from "../../interfaces/server"
import moment from "moment"
import Swal from "sweetalert2"
import MoneyFormat from "../../util/MoneyFormat"

interface Column {
  id: "id" | "name" | "type" | "location" | "investor" | "status" | "action"
  minWidth?: number
  maxWidth?: number
  align?: "right" | "left"
  format?: (value: string) => JSX.Element | string
}

const columns: readonly Column[] = [
  { id: "id", minWidth: 150 },
  { id: "name", minWidth: 150 },
  {
    id: "type",
    minWidth: 150,
  },
  { id: "location", minWidth: 150 },
  {
    id: "investor",
    minWidth: 150,
  },
  {
    id: "status",
    minWidth: 70,
    align: "left",
    format: (value: any) =>
      value == "pre-open" ? (
        <Chip
          variant="outlined"
          color="warning"
          icon={<CheckIcon />}
          label="Cho đặt trước"
        />
      ) : value == "open" ? (
        <Chip
          variant="outlined"
          color="warning"
          icon={<CheckIcon />}
          label="Đang bàn giao"
        />
      ) : (
        <Chip
          variant="outlined"
          color="success"
          icon={<CheckIcon />}
          label="Đã bàn giao"
        />
      ),
  },
  {
    id: "action",
    minWidth: 170,
    format: (value: any) => (
      <Tooltip title="Xem tin">
        <div>
          <Link href={value} passHref>
            <span className="material-icons cursor-pointer hover:bg-gray-200 p-2 rounded-md">
              visibility
            </span>
          </Link>
        </div>
      </Tooltip>
    ),
  },
]

function descendingComparator<T>(a: T, b: T, orderBy: keyof T) {
  if (b[orderBy] < a[orderBy]) {
    return -1
  }
  if (b[orderBy] > a[orderBy]) {
    return 1
  }
  return 0
}

type Order = "asc" | "desc"

function getComparator<Key extends keyof any>(
  order: Order,
  orderBy: Key
): (
  a: { [key in Key]: number | string | any },
  b: { [key in Key]: number | string | any }
) => number {
  return order === "desc"
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy)
}

interface HeadCell {
  disablePadding: boolean
  id: keyof Data
  label: string
  numeric: boolean
}

const headCells: readonly HeadCell[] = [
  {
    id: "id",
    numeric: false,
    disablePadding: false,
    label: "Mã dự án",
  },
  {
    id: "name",
    numeric: false,
    disablePadding: false,
    label: "Tên dự án",
  },
  {
    id: "type",
    numeric: false,
    disablePadding: false,
    label: "Loại dự án",
  },
  {
    id: "location",
    numeric: false,
    disablePadding: false,
    label: "Vị trí",
  },
  {
    id: "investor",
    numeric: false,
    disablePadding: false,
    label: "Chủ dự án",
  },
  {
    id: "status",
    numeric: false,
    disablePadding: false,
    label: "Tình trạng",
  },
  {
    id: "action",
    numeric: false,
    disablePadding: false,
    label: "Thao tác",
  },
]

interface EnhancedTableProps {
  numSelected: number
  onRequestSort: (
    event: React.MouseEvent<unknown>,
    property: keyof Data
  ) => void
  // onSelectAllClick: (event: React.ChangeEvent<HTMLInputElement>) => void
  order: Order
  orderBy: string
  rowCount: number
}

function EnhancedTableHead(props: EnhancedTableProps) {
  const {
    // onSelectAllClick,
    order,
    orderBy,
    numSelected,
    rowCount,
    onRequestSort,
  } = props
  const createSortHandler =
    (property: keyof Data) => (event: React.MouseEvent<unknown>) => {
      onRequestSort(event, property)
    }

  return (
    <TableHead>
      <TableRow>
        {/* <TableCell padding="checkbox">
          <Checkbox
            color="primary"
            indeterminate={numSelected > 0 && numSelected < rowCount}
            checked={rowCount > 0 && numSelected === rowCount}
            onChange={onSelectAllClick}
            inputProps={{
              "aria-label": "select all desserts",
            }}
          />
        </TableCell> */}
        {headCells.map((headCell) => (
          <TableCell
            key={headCell.id}
            align={headCell.numeric ? "right" : "left"}
            padding={headCell.disablePadding ? "none" : "normal"}
            sortDirection={orderBy === headCell.id ? order : false}
          >
            <TableSortLabel
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : "asc"}
              onClick={createSortHandler(headCell.id)}
            >
              {headCell.label}
              {orderBy === headCell.id ? (
                <Box component="span" sx={visuallyHidden}>
                  {order === "desc" ? "sorted descending" : "sorted ascending"}
                </Box>
              ) : null}
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  )
}

// interface EnhancedTableToolbarProps {
//   numSelected: number
//   callback: any
// }

// const EnhancedTableToolbar = (props: EnhancedTableToolbarProps) => {
//   const { numSelected } = props
//   const { callback } = props

//   return (
//     <Toolbar
//       sx={{
//         pl: { sm: 2 },
//         pr: { xs: 1, sm: 1 },
//         ...(numSelected > 0 && {
//           bgcolor: (theme) =>
//             alpha(
//               theme.palette.primary.main,
//               theme.palette.action.activatedOpacity
//             ),
//         }),
//       }}
//     >
//       {numSelected > 0 ? (
//         <Typography
//           sx={{ flex: "1 1 100%" }}
//           color="inherit"
//           variant="subtitle1"
//           component="div"
//         >
//           {numSelected} đã lựa chọn
//         </Typography>
//       ) : null}
//       {numSelected > 0 ? (
//         <>
//           <Tooltip title="Xác nhận hoàn thành" arrow>
//             <IconButton>
//               <CheckIcon
//                 onClick={() => {
//                   callback("confirm")
//                 }}
//               />
//             </IconButton>
//           </Tooltip>
//           <Tooltip title="Không thành công" arrow>
//             <IconButton>
//               <BlockIcon
//                 onClick={() => {
//                   callback("error")
//                 }}
//               />
//             </IconButton>
//           </Tooltip>
//         </>
//       ) : (
//         <Tooltip title="Filter list">
//           <IconButton>
//             <FilterListIcon />
//           </IconButton>
//         </Tooltip>
//       )}
//     </Toolbar>
//   )
// }

interface Data {
  id: string
  name: string
  type: string
  location: string
  investor: string
  status: string
  action: string
}

function createData(
  id: string,
  name: string,
  type: string,
  location: string,
  investor: string,
  status: string,
  action: string
): Data {
  return {
    id,
    name,
    type,
    location,
    investor,
    status,
    action,
  }
}

const AdminTransactionList = () => {
  const [page, setPage] = React.useState(0)
  const [rowsPerPage, setRowsPerPage] = React.useState(10)

  const [order, setOrder] = React.useState<Order>("asc")
  const [orderBy, setOrderBy] = React.useState<keyof Data>("id")
  const [selected, setSelected] = React.useState<readonly string[]>([])
  const [dense, setDense] = React.useState(false)
  const [rows, setRows] = React.useState<Array<Data>>([])
  const [isLoading, setIsLoading] = React.useState(true)
  const [isChange, setIsChange] = React.useState(false)
  const [period, setPeriod] = React.useState(new Date())
  const [isOpenModal, setIsOpenModal] = React.useState(false)

  // fetchData
  React.useEffect(() => {
    setIsLoading(true)
    let isCancelled = false
    fetch(`${server}/project/get`)
      .then((res) => res.json())
      .then((data: any) => {
        let projects = data.data
        let newRows = new Array<Data>()
        projects.forEach((project: any) => {
          let new_slug = "du-an/" + project.slug

          newRows.push(
            createData(
              project._id,
              project.name,
              project.projectType.name,
              project.location.CityName,
              project.investor.name,
              project.projectStatus,
              new_slug
            )
          )
        })
        setRows(newRows)
        setIsLoading(false)
      })
    return () => {
      isCancelled = true
    }
  }, [isChange])

  const handleChange = (event: any) => {
    setPeriod(event.target.value)
  }

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage)
  }

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(+event.target.value)
    setPage(0)
  }

  const handleRequestSort = (
    event: React.MouseEvent<unknown>,
    property: keyof Data
  ) => {
    const isAsc = orderBy === property && order === "asc"
    setOrder(isAsc ? "desc" : "asc")
    setOrderBy(property)
  }

  // const handleSelectAllClick = (event: React.ChangeEvent<HTMLInputElement>) => {
  //   if (event.target.checked) {
  //     const newSelecteds = rows.map((n) => n.id)
  //     setSelected(newSelecteds)
  //     return
  //   }
  //   setSelected([])
  // }

  // const handleClick = (event: React.MouseEvent<unknown>, id: string) => {
  //   const selectedIndex = selected.indexOf(id)
  //   let newSelected: readonly string[] = []

  //   if (selectedIndex === -1) {
  //     newSelected = newSelected.concat(selected, id)
  //   } else if (selectedIndex === 0) {
  //     newSelected = newSelected.concat(selected.slice(1))
  //   } else if (selectedIndex === selected.length - 1) {
  //     newSelected = newSelected.concat(selected.slice(0, -1))
  //   } else if (selectedIndex > 0) {
  //     newSelected = newSelected.concat(
  //       selected.slice(0, selectedIndex),
  //       selected.slice(selectedIndex + 1)
  //     )
  //   }

  //   setSelected(newSelected)
  // }

  const handleChangeDense = (event: React.ChangeEvent<HTMLInputElement>) => {
    setDense(event.target.checked)
  }

  const isSelected = (name: string) => selected.indexOf(name) !== -1

  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0

  return (
    <div className="relative mt-12 ml-72">
      <div className="mb-4">
        <p className="font-bold text-xl">Danh sách dự án</p>
        <div className="mt-2 border border-2 border-t border-[#E21717]"></div>
      </div>
      <Paper>
        {/* <EnhancedTableToolbar
          numSelected={selected.length}
          callback={callback}
        /> */}
        <TableContainer sx={{ maxHeight: 800 }}>
          <Table
            stickyHeader
            aria-label="sticky table"
            size={dense ? "small" : "medium"}
          >
            <EnhancedTableHead
              numSelected={selected.length}
              order={order}
              orderBy={orderBy}
              // onSelectAllClick={handleSelectAllClick}
              onRequestSort={handleRequestSort}
              rowCount={rows.length}
            />
            <TableBody>
              {rows
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .sort(getComparator(order, orderBy))
                .map((row, index) => {
                  const isItemSelected = isSelected(row.id)
                  const labelId = `enhanced-table-checkbox-${index}`

                  let status = row.status

                  return (
                    <TableRow
                      hover
                      // onClick={(event) => handleClick(event, row.id)}
                      aria-checked={isItemSelected}
                      role="checkbox"
                      tabIndex={-1}
                      key={row.id}
                      selected={isItemSelected}
                    >
                      {/* <TableCell padding="checkbox">
                        <Checkbox
                          color="primary"
                          checked={isItemSelected}
                          inputProps={{
                            "aria-labelledby": labelId,
                          }}
                        />
                      </TableCell> */}
                      {columns.map((column) => {
                        const value = row[column.id]
                        return (
                          <TableCell
                            key={column.id}
                            align={column.align}
                            width={column.minWidth}
                          >
                            {column.format ? column.format(value) : value}
                          </TableCell>
                        )
                      })}
                    </TableRow>
                  )
                })}
              {emptyRows > 0 && (
                <TableRow
                  style={{
                    height: (dense ? 33 : 53) * emptyRows,
                  }}
                >
                  <TableCell colSpan={6} />
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>

        <TablePagination
          rowsPerPageOptions={[10, 25, 100]}
          component="div"
          count={rows.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>

      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={isLoading}
        className="flex flex-col"
        // onClick={handleCloseLoading}
      >
        <p>Đang tải...</p>
        <CircularProgress className="mt-4" color="inherit" />
      </Backdrop>
    </div>
  )
}

export default AdminTransactionList

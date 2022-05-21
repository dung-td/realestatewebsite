import * as React from "react"
import { alpha } from "@mui/material/styles"
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
import { getCalendarPickerSkeletonUtilityClass } from "@mui/x-date-pickers"
import Chip from "@mui/material/Chip"
import IconButton from "@mui/material/IconButton"
import { visuallyHidden } from "@mui/utils"

import CheckIcon from "@mui/icons-material/Check"
import DeleteIcon from "@mui/icons-material/Delete"
import EditIcon from "@mui/icons-material/Edit"
import FilterListIcon from "@mui/icons-material/FilterList"
import CloseIcon from "@mui/icons-material/Close"
import BlockOutlinedIcon from "@mui/icons-material/BlockOutlined"

interface Column {
  id:
    | "name"
    | "username"
    | "phone"
    | "email"
    | "address"
    | "status"
    | "postCount"
    | "action"
  minWidth?: number
  maxWidth?: number
  align?: "right" | "left"
  format?: (value: string) => JSX.Element | string
}

const columns: readonly Column[] = [
  { id: "name", minWidth: 150 },
  { id: "username", minWidth: 150 },
  { id: "phone", minWidth: 150 },
  { id: "email", minWidth: 70 },
  { id: "address", minWidth: 150 },

  {
    id: "status",
    minWidth: 70,
    align: "left",
    format: (value: string) =>
      value == "active" ? (
        <Chip
          variant="outlined"
          color="success"
          icon={<CheckIcon />}
          label="Đang hoạt động"
        />
      ) : value == "disactive" ? (
        <Chip
          variant="outlined"
          color="error"
          icon={<CloseIcon />}
          label="Không còn hoạt động"
        />
      ) : (
        <Chip
          variant="outlined"
          color="warning"
          icon={<BlockOutlinedIcon />}
          label="Cấm đăng"
        />
      ),
  },
  {
    id: "postCount",
    minWidth: 150,
    align: "right",
  },
  {
    id: "action",
    minWidth: 80,
    maxWidth: 100,
    align: "right",
    format: () => (
      <>
        <Tooltip title="Xóa" arrow>
          <IconButton aria-label="delete">
            <DeleteIcon />
          </IconButton>
        </Tooltip>

        <Tooltip title="Chỉnh sửa" arrow placement="right">
          <IconButton aria-label="delete">
            <EditIcon />
          </IconButton>
        </Tooltip>
      </>
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
  a: { [key in Key]: number | string },
  b: { [key in Key]: number | string }
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
    id: "name",
    numeric: false,
    disablePadding: false,
    label: "Họ tên",
  },
  {
    id: "username",
    numeric: false,
    disablePadding: false,
    label: "Tên người dùng",
  },
  {
    id: "phone",
    numeric: false,
    disablePadding: false,
    label: "Số điện thoại",
  },
  {
    id: "email",
    numeric: false,
    disablePadding: false,
    label: "Email",
  },
  {
    id: "address",
    numeric: false,
    disablePadding: false,
    label: "Địa chỉ",
  },
  {
    id: "status",
    numeric: false,
    disablePadding: false,
    label: "Tình trạng tài khoản",
  },
  {
    id: "postCount",
    numeric: true,
    disablePadding: false,
    label: "Bài viết đã đăng",
  },
  {
    id: "action",
    numeric: false,
    disablePadding: false,
    label: "",
  },
]

interface EnhancedTableProps {
  numSelected: number
  onRequestSort: (
    event: React.MouseEvent<unknown>,
    property: keyof Data
  ) => void
  onSelectAllClick: (event: React.ChangeEvent<HTMLInputElement>) => void
  order: Order
  orderBy: string
  rowCount: number
}

function EnhancedTableHead(props: EnhancedTableProps) {
  const {
    onSelectAllClick,
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
        <TableCell padding="checkbox">
          <Checkbox
            color="primary"
            indeterminate={numSelected > 0 && numSelected < rowCount}
            checked={rowCount > 0 && numSelected === rowCount}
            onChange={onSelectAllClick}
            inputProps={{
              "aria-label": "select all desserts",
            }}
          />
        </TableCell>
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

interface EnhancedTableToolbarProps {
  numSelected: number
}

const EnhancedTableToolbar = (props: EnhancedTableToolbarProps) => {
  const { numSelected } = props

  return (
    <Toolbar
      sx={{
        pl: { sm: 2 },
        pr: { xs: 1, sm: 1 },
        ...(numSelected > 0 && {
          bgcolor: (theme) =>
            alpha(
              theme.palette.primary.main,
              theme.palette.action.activatedOpacity
            ),
        }),
      }}
    >
      {numSelected > 0 ? (
        <Typography
          sx={{ flex: "1 1 100%" }}
          color="inherit"
          variant="subtitle1"
          component="div"
        >
          {numSelected} đã lựa chọn
        </Typography>
      ) : null}
      {numSelected > 0 ? (
        <Tooltip title="Xóa mục đã chọn" arrow>
          <IconButton>
            <DeleteIcon />
          </IconButton>
        </Tooltip>
      ) : (
        <Tooltip title="Filter list">
          <IconButton>
            <FilterListIcon />
          </IconButton>
        </Tooltip>
      )}
    </Toolbar>
  )
}

interface Data {
  name: string
  username: string
  phone: string
  email: string
  address: string
  status: string
  postCount: number
  action: any
}

function createData(
  name: string,
  username: string,
  phone: string,
  email: string,
  address: string,
  status: string,
  postCount: number,
  action: any
): Data {
  return {
    name,
    username,
    phone,
    email,
    address,
    status,
    postCount,
    action,
  }
}

const rows = [
  createData(
    "Tống Đức Dũng",
    "tngcdng",
    "0932696361",
    "tngcdng@gmail.com",
    "Bình Dương",
    "active",
    10,
    null
  ),
  createData(
    "Mai Công Danh",
    "danhmc",
    "0932999999",
    "danhmc1252@gmail.com",
    "Bình Dương",
    "disactive",
    10,
    null
  ),
  createData(
    "Nguyễn Thành Nội",
    "ntnvlog",
    "0932999999",
    "ntnvlog@gmail.com",
    "TP. HCM",
    "ban",
    10,
    null
  ),
]

const Datatable = () => {
  const [page, setPage] = React.useState(0)
  const [rowsPerPage, setRowsPerPage] = React.useState(10)

  const [order, setOrder] = React.useState<Order>("asc")
  const [orderBy, setOrderBy] = React.useState<keyof Data>("name")
  const [selected, setSelected] = React.useState<readonly string[]>([])
  const [dense, setDense] = React.useState(false)

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

  const handleSelectAllClick = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.checked) {
      const newSelecteds = rows.map((n) => n.name)
      setSelected(newSelecteds)
      return
    }
    setSelected([])
  }

  const handleClick = (event: React.MouseEvent<unknown>, name: string) => {
    const selectedIndex = selected.indexOf(name)
    let newSelected: readonly string[] = []

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, name)
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1))
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1))
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1)
      )
    }

    setSelected(newSelected)
  }

  const handleChangeDense = (event: React.ChangeEvent<HTMLInputElement>) => {
    setDense(event.target.checked)
  }

  const isSelected = (name: string) => selected.indexOf(name) !== -1

  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0

  return (
    <div className="mt-12 ml-72">
      <div className="mb-4">
        <p className="font-bold text-xl">Danh sách người dùng</p>
        <div className="mt-2 border border-2 border-t border-[#E21717]"></div>
      </div>
      <Paper>
        <EnhancedTableToolbar numSelected={selected.length} />
        <TableContainer sx={{ maxHeight: 440 }}>
          <Table
            stickyHeader
            aria-label="sticky table"
            size={dense ? "small" : "medium"}
          >
            <EnhancedTableHead
              numSelected={selected.length}
              order={order}
              orderBy={orderBy}
              onSelectAllClick={handleSelectAllClick}
              onRequestSort={handleRequestSort}
              rowCount={rows.length}
            />
            <TableBody>
              {rows
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .sort(getComparator(order, orderBy))
                .map((row, index) => {
                  const isItemSelected = isSelected(row.name)
                  const labelId = `enhanced-table-checkbox-${index}`

                  return (
                    <TableRow
                      hover
                      onClick={(event) => handleClick(event, row.name)}
                      aria-checked={isItemSelected}
                      role="checkbox"
                      tabIndex={-1}
                      key={row.username}
                      selected={isItemSelected}
                    >
                      <TableCell padding="checkbox">
                        <Checkbox
                          color="primary"
                          checked={isItemSelected}
                          inputProps={{
                            "aria-labelledby": labelId,
                          }}
                        />
                      </TableCell>
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
    </div>
  )
}

export default Datatable

import * as React from "react"
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

interface Column {
  id:
    | "name"
    | "username"
    | "phone"
    | "email"
    | "address"
    | "accountStatus"
    | "postCount"
  minWidth?: number
  maxWidth?: number
  align?: "right" | "left"
  format?: (value: string | any) => JSX.Element | string
}

const columns: readonly Column[] = [
  { id: "name", minWidth: 150 },
  { id: "username", minWidth: 150 },
  { id: "phone", minWidth: 150 },
  { id: "email", minWidth: 100 },
  { id: "address", minWidth: 150 },

  {
    id: "accountStatus",
    minWidth: 70,
    align: "left",
    format: (value: any) =>
      value.status == "active" ? (
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
        <Tooltip title={`Tới ${value.date}`} arrow>
          <Chip
            variant="outlined"
            color="warning"
            icon={<BlockIcon />}
            label="Cấm đăng"
          />
        </Tooltip>
      ),
  },
  {
    id: "postCount",
    minWidth: 150,
    align: "right",
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
    id: "accountStatus",
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
  callback: any
}

const EnhancedTableToolbar = (props: EnhancedTableToolbarProps) => {
  const { numSelected } = props
  const { callback } = props

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
        <>
          <Tooltip title="Cấm người dùng" arrow>
            <IconButton>
              <DeleteIcon
                onClick={() => {
                  callback("delete")
                }}
              />
            </IconButton>
          </Tooltip>
          <Tooltip title="Gỡ cấm đăng" arrow>
            <IconButton>
              <CheckIcon
                onClick={() => {
                  callback("unban")
                }}
              />
            </IconButton>
          </Tooltip>
          <Tooltip title="Cấm đăng" arrow>
            <IconButton>
              <BlockIcon
                onClick={() => {
                  callback("ban")
                }}
              />
            </IconButton>
          </Tooltip>
        </>
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
  accountStatus: {
    status: string
    date?: string
  }
  postCount: number
}

function createData(
  name: string,
  username: string,
  phone: string,
  email: string,
  address: string,
  status: string,
  date: string,
  postCount: number
): Data {
  return {
    name,
    username,
    phone,
    email,
    address,
    accountStatus: {
      status,
      date,
    },
    postCount,
  }
}

const AdminUser = () => {
  const [page, setPage] = React.useState(0)
  const [rowsPerPage, setRowsPerPage] = React.useState(10)

  const [order, setOrder] = React.useState<Order>("asc")
  const [orderBy, setOrderBy] = React.useState<keyof Data>("name")
  const [selected, setSelected] = React.useState<readonly string[]>([])
  const [dense, setDense] = React.useState(false)
  const [rows, setRows] = React.useState<Array<Data>>([])
  const [isLoading, setIsLoading] = React.useState(false)
  const [isChange, setIsChange] = React.useState(false)
  const [period, setPeriod] = React.useState(new Date())
  const [isOpenModal, setIsOpenModal] = React.useState(false)

  const callback = (action: string) => {
    switch (action) {
      case "ban":
        setIsOpenModal(true)
        break
      case "unban":
        Swal.fire({
          title: `Gỡ cấm đăng`,
          text: "Người dùng sẽ được sử dụng lại tính năng đăng bài!",
          icon: "warning",
          showCancelButton: true,
          confirmButtonColor: "#3085d6",
          cancelButtonColor: "#d33",
          confirmButtonText: "Đồng ý!",
        }).then((result) => {
          if (result.isConfirmed) {
            fetch(`${server}/admin/user/unban`, {
              method: "POST",
              body: JSON.stringify({
                _id: selected[0],
              }),
              headers: {
                "Content-Type": "application/json",
              },
            })
              .then((res) => res.json())
              .then((data) => {
                setIsChange(!isChange)
                setSelected([])
              })
          }
        })
        break
      case "delete":
        Swal.fire({
          title: `Xóa người dùng!`,
          text: "Thao tác này không thể hoàn tác!",
          icon: "warning",
          showCancelButton: true,
          confirmButtonColor: "#3085d6",
          cancelButtonColor: "#d33",
          confirmButtonText: "Đồng ý!",
        }).then((result) => {
          if (result.isConfirmed) {
            fetch(`${server}/admin/user/delete`, {
              method: "POST",
              body: JSON.stringify({
                _id: selected[0],
              }),
              headers: {
                "Content-Type": "application/json",
              },
            })
              .then((res) => res.json())
              .then((data) => {
                setIsChange(!isChange)
                setSelected([])
              })
          }
        })
        break
      default:
        break
    }
    var today = new Date()
  }

  const confirmBan = () => {
    setIsOpenModal(false)
    setIsLoading(true)
    fetch(`${server}/admin/user/ban`, {
      method: "POST",
      body: JSON.stringify({
        _id: selected[0],
        period: moment(period).format("DD/MM/YYYY"),
      }),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setIsChange(!isChange)
        setIsLoading(false)
        setSelected([])
      })
  }

  // fetchData
  React.useEffect(() => {
    setIsLoading(true)
    let isCancelled = false
    fetch(`${server}/admin/user/get`)
      .then((res) => res.json())
      .then((data: any) => {
        let users = data.users
        let newRows = new Array<Data>()
        users.forEach(async (user: any) => {
          let postCount = 0

          await fetch(`${server}/post/count?userId=${user._id}`)
            .then((res) => res.json())
            .then((data) => {
              postCount = data.data
            })

          let city = ""
          await fetch(`${server}/a/province/get?p=${user.cityId}`)
            .then((res) => res.json())
            .then((data) => {
              city = data.data.provinceName
            })

          // newRows.push()
          setRows((rows) => [
            ...rows,
            createData(
              user.fullname,
              user.username,
              user.phone,
              user.email,
              city,
              user.accountStatus.status,
              user.accountStatus.date,
              postCount
            ),
          ])
        })
        console.log(newRows)
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

  const handleSelectAllClick = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.checked) {
      const newSelecteds = rows.map((n) => n.name)
      setSelected(newSelecteds)
      return
    }
    setSelected([])
  }

  const handleClick = (event: React.MouseEvent<unknown>, username: string) => {
    const selectedIndex = selected.indexOf(username)
    let newSelected: readonly string[] = []

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, username)
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
    <div className="relative mt-12 ml-72">
      <div className="mb-4">
        <p className="font-bold text-xl">Danh sách người dùng</p>
        <div className="mt-2 border border-2 border-t border-[#E21717]"></div>
      </div>
      <Paper>
        <EnhancedTableToolbar
          numSelected={selected.length}
          callback={callback}
        />
        <TableContainer sx={{ maxHeight: 600 }}>
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
                  const isItemSelected = isSelected(row.username)
                  const labelId = `enhanced-table-checkbox-${index}`

                  return (
                    <TableRow
                      hover
                      onClick={(event) => handleClick(event, row.username)}
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
                            {column.format
                              ? column.id == "accountStatus"
                                ? column.format(value)
                                : column.format(value.toString())
                              : value}
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

      <Modal
        open={isOpenModal}
        onClose={() => setIsOpenModal(false)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={modalStyle}>
          <div className="w-full">
            <p className="mb-4">Cấm đăng tới</p>
            <DesktopDatePicker
              inputFormat="DD/MM/YYYY"
              value={period}
              onChange={(newValue: any) => {
                if (newValue) setPeriod(new Date(newValue))
              }}
              renderInput={(params) => <TextField {...params} />}
            />
            <div className="mt-4 w-full flex justify-end">
              <Button
                onClick={() => setIsOpenModal(false)}
                className="mr-2"
                variant="outlined"
              >
                Hủy
              </Button>
              <Button onClick={confirmBan} variant="outlined">
                Đồng ý
              </Button>
            </div>
          </div>
        </Box>
      </Modal>
    </div>
  )
}

const modalStyle = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #fff",
  boxShadow: 24,
  p: 4,
}

export default AdminUser

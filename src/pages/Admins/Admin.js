import React, { useEffect, useState } from "react";
import "./Admin.css";

import Axios from "axios";
import { DialogContent, TextField } from "@mui/material";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import DialogTitle from "@mui/material/DialogTitle";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import { Button, Dialog } from "@mui/material";
import PropTypes from "prop-types";
import { useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import FirstPageIcon from "@mui/icons-material/FirstPage";
import KeyboardArrowLeft from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRight from "@mui/icons-material/KeyboardArrowRight";
import LastPageIcon from "@mui/icons-material/LastPage";
import TableFooter from "@mui/material/TableFooter";
import TablePagination from "@mui/material/TablePagination";
// import { Link } from "react-router-dom";
import Admin from "./adminsmodule";
import FileUploader from "../../components/File_uploader/fileUploader";
import { AddCircle } from "@mui/icons-material";
import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';
import { useNavigate } from "react-router-dom";

function TablePaginationActions(props) {
  const theme = useTheme();
  const { count, page, rowsPerPage, onPageChange } = props;

  const handleFirstPageButtonClick = (event) => {
    onPageChange(event, 0);
  };

  const handleBackButtonClick = (event) => {
    onPageChange(event, page - 1);
  };

  const handleNextButtonClick = (event) => {
    onPageChange(event, page + 1);
  };

  const handleLastPageButtonClick = (event) => {
    onPageChange(event, Math.max(0, Math.ceil(count / rowsPerPage) - 1));
  };

  return (
    <Box sx={{ flexShrink: 0, ml: 2.5 }}>
      <IconButton
        onClick={handleFirstPageButtonClick}
        disabled={page === 0}
        aria-label="first page"
      >
        {theme.direction === "rtl" ? <LastPageIcon /> : <FirstPageIcon />}
      </IconButton>
      <IconButton
        onClick={handleBackButtonClick}
        disabled={page === 0}
        aria-label="previous page"
      >
        {theme.direction === "rtl" ? (
          <KeyboardArrowRight />
        ) : (
          <KeyboardArrowLeft />
        )}
      </IconButton>
      <IconButton
        onClick={handleNextButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="next page"
      >
        {theme.direction === "rtl" ? (
          <KeyboardArrowLeft />
        ) : (
          <KeyboardArrowRight />
        )}
      </IconButton>
      <IconButton
        onClick={handleLastPageButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="last page"
      >
        {theme.direction === "rtl" ? <FirstPageIcon /> : <LastPageIcon />}
      </IconButton>
    </Box>
  );
}

TablePaginationActions.propTypes = {
  count: PropTypes.number.isRequired,
  onPageChange: PropTypes.func.isRequired,
  page: PropTypes.number.isRequired,
  rowsPerPage: PropTypes.number.isRequired,
};

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

const Admins = (props) => {
  const [admins, setAdmins] = useState([]);
  const [postname, setpostname] = useState("");
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [post, setPost] = useState(false);
  const [name, setname] = useState([]);
  const [email, setemail] = useState([]);
  const [image, setimage] = useState(null);
  const [password, setpassword] = useState([]);

  const navigate = useNavigate();
  const id = localStorage.getItem("id");

  const fetchAdmin = async () => {
    const res = await fetch(`http://localhost:8000/api/getAdmin/${id}`, {
      headers: {
        'Authorization': 'Bearer ' + localStorage.getItem('token'),
      }
    });
    const response = await res.json();
    if (response.role !== 1) {
      navigate('/');
    }
  }

  useEffect(() => {
    fetchAdmin();
  })

  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - admins.length) : 0;

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const fetchAdmins = async () => {
    try {
      const res = await fetch("http://localhost:8000/api/users", {
        headers: {
          'Authorization': 'Bearer ' + localStorage.getItem('token'),
        }
      });
      const data = await res.json();
      setAdmins(data);
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    fetchAdmins();
  }, []);

  const handlePost = async () => {
    const data = new FormData();
    data.append("name", name);
    data.append("email", email);
    data.append("profile_image", image);
    data.append("password", password);

    await Axios.post("http://localhost:8000/api/register", {
      headers: {
        'Authorization': 'Bearer ' + localStorage.getItem('token'),
      }, data
    }).catch((err) =>
      console.log(err)
    );
  };

  return (
    <div className="projectsWrapper">
      <div className="projectcontainer">
        <>
          <div className="postproject">
            <h1
              className="projectsTitle"
              style={{ position: "absolute", top: "13vh", left: "15vw" }}
            >
              Admins Control
            </h1>
            <Fab
              color="primary"
              aria-label="add"
              sx={{ position: "absolute", top: "13vh", right: "6vw", backgroundColor: "#0a4f70" }}
              onClick={() => {
                setPost(!post);
              }}
            >
              <AddIcon />
            </Fab>
          </div>

          {post && (
            <Dialog
              open={post}
              onClose={() => {
                setPost(!post);
              }}
            >
              <DialogTitle style={{ marginLeft: "96px" }}>
                Add New Admin
              </DialogTitle>

              <DialogContent sx={{ marginTop: "36px" }}>
                <form
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-between",
                  }}
                  onSubmit={(e) => {
                    handlePost();
                  }}
                >
                  <TextField
                    style={{ marginTop: "10px" }}
                    name="name"
                    placeholder="name"
                    label="name"
                    //   onFocus={true}
                    type="text"
                    onChange={(e) => {
                      setname(e.target.value);
                    }}
                  />
                  <TextField
                    style={{ marginTop: "10px" }}
                    name="name"
                    placeholder="email"
                    label="email"
                    //   onFocus={true}
                    type="text"
                    onChange={(e) => {
                      setemail(e.target.value);
                    }}
                  />
                  <TextField
                    style={{ marginTop: "10px", marginBottom: "10px" }}
                    name="name"
                    label="password"
                    placeholder="password"
                    //   onFocus={true}
                    type="password"
                    onChange={(e) => {
                      setpassword(e.target.value);
                    }}
                  />
                  <FileUploader onFileSelect={(image) => setimage(image)} />

                  <Button
                    sx={{
                      backgroundColor: "var(--blue)", marginTop: "36px",
                      marginBottom: "36px",
                      width: "10vw",
                      marginLeft: "80px"
                    }}
                    className="addEmployeeBtn"
                    type="submit"
                    variant="contained"
                  >Submit
                  </Button>
                  <Button
                    sx={{
                      backgroundColor: "var(--blue)", marginTop: "36px",
                      marginBottom: "36px",
                      width: "10vw",
                      marginLeft: "80px"
                    }}
                    className="addEmployeeBtn"
                    type="submit"
                    variant="contained"
                    onClick={() => {
                      setPost(!post);
                    }}
                  >Cancel
                  </Button>
                </form>
              </DialogContent>
            </Dialog>
          )}
          <TableContainer component={Paper}>
            <Table
              sx={{ margin: "auto", width: "85vw" }}
              aria-label="customized table"
            >
              <TableHead>
                <TableRow>
                  <StyledTableCell className="tableTitle" align="center">
                    IMG
                  </StyledTableCell>
                  <StyledTableCell className="tableTitle" align="center">
                    Name
                  </StyledTableCell>
                  <StyledTableCell className="tableTitle" align="center">
                    Email
                  </StyledTableCell>
                  <StyledTableCell className="tableTitle" align="center">
                    Actions
                  </StyledTableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {(rowsPerPage > 0
                  ? admins.slice(
                    page * rowsPerPage,
                    page * rowsPerPage + rowsPerPage
                  )
                  : admins
                ).map((admin, index) => {
                  return (
                    <Admin
                      key={index}
                      id={admin.id}
                      name={admin.name}
                      image={admin.profile_image}
                      email={admin.email}
                    />
                  );
                })}
              </TableBody>
              <TableFooter>
                <TableRow>
                  <TablePagination
                    rowsPerPageOptions={[
                      5,
                      10,
                      25,
                      { label: "All", value: -1 },
                    ]}
                    colSpan={3}
                    count={admins.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    SelectProps={{
                      inputProps: {
                        "aria-label": "rows per page",
                      },
                      native: true,
                    }}
                    onPageChange={handleChangePage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                    ActionsComponent={TablePaginationActions}
                  />
                </TableRow>
              </TableFooter>
            </Table>
          </TableContainer>
        </>
      </div>
    </div>
  );
};
export default Admins;

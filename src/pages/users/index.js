// ** React Imports
import { useState, useEffect } from "react";

// ** MUI Imports
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import Grid from "@mui/material/Grid";
import { DataGrid } from "@mui/x-data-grid";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Switch from "@mui/material/Switch";

// ** Icons Imports
import EyePlusOutline from "mdi-material-ui/EyePlusOutline";
import NoteEditOutline from "mdi-material-ui/NoteEditOutline";

// ** Actions Imports
import userStore from "src/store/users";

// ** Custom Components Imports
import TableHeader from "src/views/apps/user/list/TableHeader";
import Swal from "sweetalert2";

// ** Views Imports
import FormUser from "src/views/forms/form-users";

const RowOptions = ({ row, setValues, openForm, setState }) => {
  // ** Hooks
  /* ---- Callbacks ---- */
  const errorCallback = ({ status, data }) => {
    if (status === 400 && data?.message === "El usuario no se pudo inactivar") {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: data?.message,
      });
    }
  };

  /* ---- Events ---- */
  const handleActivate = async ({ status, data }) => {
    Swal.fire({
      icon: "success",
      title: "Usuario activado con éxito",
      showConfirmButton: false,
      timer: 1500,
    });
    setState((users) => {
      let arrayUsers = [...users];
      const index = arrayUsers.findIndex((user) => user.id === data.user.id);
      arrayUsers[index] = data.user;
      return [...arrayUsers];
    });
  };

  const handleInactivate = async ({ status, data }) => {
    Swal.fire({
      icon: "success",
      title: "Usuario inactivado con éxito",
      showConfirmButton: false,
      timer: 1500,
    });
    setState((users) => {
      let arrayUsers = [...users];
      const index = arrayUsers.findIndex((user) => user.id === data.user.id);
      arrayUsers[index] = data.user;
      return [...arrayUsers];
    });
  };

  const handleDelete = async (id, stateUser) => {
    if (stateUser == true) {
      Swal.fire({
        title: "Are you sure",
        text: "you won't be able to revert this",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, inactivate it!",
      }).then((result) => {
        // eslint-disable-next-line no-console
        if (result.isConfirmed) {
          try {
            return userStore.inactivateUser(
              id,
              (response) => handleInactivate(response),
              (response) => errorCallback(response)
            );
          } catch (e) {
            // console.log(e)
            return e;
          }
        }
      });
    } else {
      Swal.fire({
        title: "Are you sure",
        text: "you won't be able to revert this",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, activate it!",
      }).then((result) => {
        // eslint-disable-next-line no-console
        if (result.isConfirmed) {
          try {
            return userStore.activateUser(
              id,
              (response) => handleActivate(response),
              (response) => errorCallback(response)
            );
          } catch (e) {
            // console.log(e)
            return e;
          }
        }
      });
    }
  };

  return (
    <>
      <IconButton title="View" name="view">
        <EyePlusOutline color="info" fontSize="inherit" />
      </IconButton>
      <IconButton
        title="Edit"
        onClick={() => {
          setValues(row);
          openForm(true);
        }}
        name="edit"
      >
        <NoteEditOutline color="success" fontSize="inherit" />
      </IconButton>
      {/* <IconButton title={this.state.isToggleOn ? 'Disabled' : 'Enabled'} onClick={this.handleDelete(id)} name="disable">
        <AccountOffOutline color="error" fontSize='inherit' />
      </IconButton> */}
      <Switch
        size="small"
        checked={row.stateUser}
        onChange={() => handleDelete(row.id, row.stateUser)}
      />
    </>
  );
};

const defaultColumns = (setValues, openForm, setState) => {
  return [
    {
      flex: 0.25,
      minWidth: 230,
      field: "fullName",
      headerName: "User",
      renderCell: ({ row }) => {
        const fullName = `${row.first_name} ${row.last_name}`;
        const { id, username } = row;

        return (
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <Box
              sx={{
                display: "flex",
                alignItems: "flex-start",
                flexDirection: "column",
              }}
            >
              <Typography
                noWrap
                component="a"
                variant="body2"
                sx={{
                  fontWeight: 600,
                  color: "text.primary",
                  textDecoration: "none",
                }}
              >
                {fullName}
              </Typography>

              <Typography
                noWrap
                component="a"
                variant="caption"
                sx={{ textDecoration: "none" }}
              >
                @{username}
              </Typography>
            </Box>
          </Box>
        );
      },
    },
    {
      flex: 0.25,
      field: "identification",
      minWidth: 250,
      headerName: "Identification",
      renderCell: ({ row }) => {
        return (
          <Typography noWrap variant="body2">
            {row.identification}
          </Typography>
        );
      },
    },
    {
      flex: 0.15,
      minWidth: 150,
      sortable: false,
      field: "actions",
      headerName: "Actions",
      renderCell: ({ row }) => {
        return (
          <RowOptions
            row={row}
            setValues={setValues}
            openForm={openForm}
            setState={setState}
          />
        );
      },
    },
  ];
};

const UserList = () => {
  // ** State
  const [value, setValue] = useState("");
  const [pageSize, setPageSize] = useState(10);
  const [addUserOpen, setAddUserOpen] = useState(false);
  const [userData, setUserData] = useState([]);
  const [user, setUser] = useState();

  const handleFetchUsers = async () => {
    try {
      const response = await userStore.fetchDataUser();
      setUserData(response);
      // eslint-disable-next-line newline-before-return
      return response;
    } catch (e) {
      // console.log(e)
      return e;
    }
  };

  // ** Hooks
  useEffect(() => {
    handleFetchUsers();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const toggleAddUserDrawer = () => {
    setUser();
    setAddUserOpen(!addUserOpen);
  };

  const columns = defaultColumns(setUser, setAddUserOpen, setUserData);

  return (
    <Grid container spacing={6}>
      <Grid item xs={12}>
        <Card>
          <TableHeader value={value} toggle={toggleAddUserDrawer} />
          <DataGrid
            autoHeight
            rows={userData}
            checkboxSelection
            pageSize={pageSize}
            disableSelectionOnClick
            columns={columns}
            rowsPerPageOptions={[10, 25, 50]}
            onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
          />
        </Card>
      </Grid>
      <FormUser
        open={addUserOpen}
        toggle={toggleAddUserDrawer}
        setState={setUserData}
        values={user}
        isUpdate={user}
      />
    </Grid>
  );
};

export default UserList;

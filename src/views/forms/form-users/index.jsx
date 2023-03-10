// ** MUI Imports
import Grid from "@mui/material/Grid";
import Divider from "@mui/material/Divider";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import CardContent from "@mui/material/CardContent";
import DialogActions from "@mui/material/DialogActions";
import Button from "@mui/material/Button";

// ** Icons Imports
import Close from "mdi-material-ui/Close";
import AccountOutline from "mdi-material-ui/AccountOutline";
import CardAccountDetailsOutline from "mdi-material-ui/CardAccountDetailsOutline";

// ** Hooks Imports
import { useUserForm } from "./use-form-user.hook";

// ** Custom Components Imports
import TextForm from "src/components/text-form";

function FormUser({ open, toggle, isUpdate, values, setState }) {
  const { handleSubmit, control, errors } = useUserForm({
    isUpdate,
    values,
    setState,
    toggle,
    open,
  });

  return (
    <Dialog
      open={open}
      onClose={() => {
        toggle();
      }}
      maxWidth="md"
      scroll="body"
    >
      <DialogTitle>
        <Box sx={{ mb: 8, textAlign: "center" }}>
          <IconButton
            size="small"
            onClick={() => toggle()}
            sx={{ position: "absolute", right: "1rem", top: "1rem" }}
          >
            <Close />
          </IconButton>
          <Typography variant="h6" sx={{ mb: 3 }}>
            {isUpdate ? "Edit User Info" : "Create User"}
          </Typography>
        </Box>
      </DialogTitle>
      <DialogContent>
        <form onSubmit={handleSubmit}>
          <Grid container>
            <Grid item xs={12} sm={10} sx={{ mx: "auto" }}>
              <CardContent>
                <Grid container spacing={5}>
                  <Grid item xs={12} sm={6}>
                    <TextForm
                      control={control}
                      name="first_name"
                      label="First Name"
                      placeholder="John"
                      errorName={errors.first_name}
                      textTranslations="First name"
                      icon={<AccountOutline />}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextForm
                      control={control}
                      name="last_name"
                      label="Last Name"
                      placeholder="Doe"
                      errorName={errors.last_name}
                      textTranslations="First name"
                      icon={<AccountOutline />}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextForm
                      control={control}
                      name="identification"
                      label="Identification"
                      placeholder="012345678"
                      errorName={errors.identification}
                      textTranslations="Identification"
                      icon={<CardAccountDetailsOutline />}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextForm
                      control={control}
                      name="username"
                      label="Username"
                      placeholder="JhonDoe"
                      errorName={errors.username}
                      textTranslations="Username"
                      icon={<CardAccountDetailsOutline />}
                    />
                  </Grid>
                </Grid>
              </CardContent>
              <Divider sx={{ margin: 0 }} />
              <DialogActions
                sx={{ pb: { xs: 8, sm: 12.5 }, justifyContent: "center" }}
              >
                <Button
                  variant="contained"
                  sx={{ marginRight: 1 }}
                  type="submit"
                >
                  Save
                </Button>
                <Button
                  variant="outlined"
                  color="secondary"
                  onClick={() => toggle()}
                >
                  Discard
                </Button>
              </DialogActions>
            </Grid>
          </Grid>
        </form>
      </DialogContent>
    </Dialog>
  );
}

export default FormUser;

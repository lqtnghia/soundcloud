"use client";
import {
  ArrowBack,
  GitHub,
  Google,
  Lock,
  Visibility,
  VisibilityOff
} from "@mui/icons-material";
import {
  Alert,
  Avatar,
  Box,
  Button,
  Divider,
  Grid,
  IconButton,
  InputAdornment,
  Paper,
  Snackbar,
  TextField,
  Typography
} from "@mui/material";
import React, { useState } from "react";
import { signIn } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { AlertColor } from "@mui/material/Alert";

const AuthSignin = () => {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const [isErrorUsername, setIsErrorUsername] = useState<boolean>(false);
  const [isErrorPassword, setIsErrorPassword] = useState<boolean>(false);

  const [errorUsername, setErrorUsername] = useState<string>("");
  const [errorPassword, setErrorPassword] = useState<string>("");

  const [openMessage, setOpenMessage] = useState<boolean>(false);
  const [resMessage, setResMessage] = useState<string>("");
  const [status, setStatus] = useState<AlertColor | undefined>(undefined);

  const handleSubmit = async () => {
    setIsErrorUsername(false);
    setIsErrorPassword(false);
    setErrorUsername("");
    setPassword("");
    console.log("username: ", username, "password: ", password);

    if (!username) {
      setIsErrorUsername(true);
      setErrorUsername("Username is not empty.");
      return;
    }
    if (!password) {
      setIsErrorPassword(true);
      setErrorPassword("Password is not empty.");
      return;
    }

    const res = await signIn("credentials", {
      username: username,
      password: password,
      redirect: false
    });

    if (!res?.error) {
      setOpenMessage(true);
      setResMessage("Login success");
      setStatus("success");
      router.push("/");
    } else {
      setOpenMessage(true);
      setResMessage(res.error);
      setStatus("error");
    }
  };
  return (
    <Box>
      <Grid
        container
        alignItems="center"
        justifyContent="center"
        sx={{ height: "100vh" }}
      >
        <Grid
          item
          xs={12}
          sm={8}
          md={5}
          lg={4}
          sx={{
            boxShadow: "rgba(100, 100, 111, 0.2) 0px 7px 29px 0px",
            padding: 3
          }}
        >
          <Link href={"/"}>
            <ArrowBack />
          </Link>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              mb: 2
            }}
          >
            <Lock sx={{ background: "#DDD", borderRadius: "50%" }} />
            <Typography variant="h6" fontWeight="bold">
              Sign in
            </Typography>
          </Box>

          <TextField
            onChange={(e) => setUsername(e.target.value)}
            margin="normal"
            // required
            fullWidth
            id="outlined-basic"
            label="Username"
            name="username"
            variant="outlined"
            autoFocus
            error={isErrorUsername}
            helperText={errorUsername}
          />
          <TextField
            onChange={(e) => setPassword(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                handleSubmit();
              }
            }}
            margin="normal"
            fullWidth
            id="outlined-basic"
            label="Password"
            name="password"
            variant="outlined"
            autoFocus
            type={showPassword ? "text" : "password"}
            error={isErrorPassword}
            helperText={errorPassword}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={() => setShowPassword(!showPassword)}>
                    {showPassword === false ? (
                      <VisibilityOff />
                    ) : (
                      <Visibility />
                    )}
                  </IconButton>
                </InputAdornment>
              )
            }}
          />
          <Button
            type="submit"
            onClick={handleSubmit}
            variant="contained"
            fullWidth
          >
            Sign In
          </Button>

          <Divider sx={{ marginY: 4 }}>Or Using</Divider>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 3,
              justifyContent: "center"
            }}
          >
            <Avatar
              onClick={() => signIn("github")}
              sx={{ cursor: "pointer", bgcolor: "orange" }}
            >
              <GitHub />
            </Avatar>
            <Avatar sx={{ cursor: "pointer", bgcolor: "orange" }}>
              <Google />
            </Avatar>
          </Box>
        </Grid>
      </Grid>
      <Snackbar
        open={openMessage}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert
          onClose={() => {
            setOpenMessage(!openMessage);
          }}
          severity={status as AlertColor}
          variant="filled"
          sx={{ width: "100%" }}
        >
          {resMessage}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default AuthSignin;

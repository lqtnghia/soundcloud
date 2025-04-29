import React from "react";
import LinearProgress, {
  LinearProgressProps
} from "@mui/material/LinearProgress";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { Button, Grid, MenuItem, TextField } from "@mui/material";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { styled } from "@mui/material/styles";

function LinearProgressWithLabel(
  props: LinearProgressProps & { value: number }
) {
  return (
    <Box sx={{ display: "flex", alignItems: "center" }}>
      <Box sx={{ width: "100%", mr: 1 }}>
        <LinearProgress variant="determinate" {...props} />
      </Box>
      <Box sx={{ minWidth: 35 }}>
        <Typography
          variant="body2"
          sx={{ color: "text.secondary" }}
        >{`${Math.round(props.value)}%`}</Typography>
      </Box>
    </Box>
  );
}

const VisuallyHiddenInput = styled("input")({
  clip: "rect(0 0 0 0)",
  clipPath: "inset(50%)",
  height: 1,
  overflow: "hidden",
  position: "absolute",
  bottom: 0,
  left: 0,
  whiteSpace: "nowrap",
  width: 1
});
const Step2 = () => {
  const [progress, setProgress] = React.useState(10);
  const category = [
    { value: "CHILL", label: "Chill" },
    { value: "WORKOUT", label: "WORKOUT" },
    { value: "PARTY", label: "PARTY" }
  ];

  React.useEffect(() => {
    const timer = setInterval(() => {
      setProgress((prevProgress) =>
        prevProgress >= 100 ? 10 : prevProgress + 10
      );
    }, 800);
    return () => {
      clearInterval(timer);
    };
  }, []);

  return (
    <div>
      <Box sx={{ width: "100%" }}>
        <LinearProgressWithLabel value={progress} />
      </Box>
      <Grid container spacing={2} sx={{ mt: 2 }}>
        <Grid
          xs={6}
          md={4}
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "column",
            gap: "10px"
          }}
        >
          <div style={{ height: 250, width: 250, background: "#CCC" }}></div>
          <Button
            component="label"
            role={undefined}
            variant="contained"
            tabIndex={-1}
            startIcon={<CloudUploadIcon />}
          >
            Upload files
            <VisuallyHiddenInput
              type="file"
              onChange={(event) => console.log(event.target.files)}
              multiple
            />
          </Button>
        </Grid>
        <Grid xs={6} md={8}>
          <TextField
            id="standard-basic"
            label="Title"
            variant="standard"
            fullWidth
            margin="dense"
          />
          <TextField
            id="standard-basic"
            label="Description"
            variant="standard"
            fullWidth
            margin="dense"
          />
          <TextField
            sx={{ mt: 3 }}
            id="outlined-select-currency"
            select
            label="category"
            fullWidth
            variant="standard"
          >
            {category.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </TextField>
          <Button variant="outlined" sx={{ mt: 5 }}>
            Save
          </Button>
        </Grid>
      </Grid>
    </div>
  );
};

export default Step2;

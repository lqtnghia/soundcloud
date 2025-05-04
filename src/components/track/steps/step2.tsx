import React, { useEffect, useState } from "react";
import LinearProgress, {
  LinearProgressProps
} from "@mui/material/LinearProgress";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { Button, Grid, MenuItem, TextField } from "@mui/material";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { styled } from "@mui/material/styles";
import axios from "axios";
import { useSession } from "next-auth/react";
import { sendRequest } from "@/utils/api";
import { useToast } from "@/utils/toast";
import Image from "next/image";

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

interface IInfo {
  setInfo: (info: INewTrack) => void;
  info: INewTrack;
}
function InputFileUpload(props: IInfo) {
  const { setInfo, info } = props;
  const { data: session } = useSession();
  const toast = useToast();

  const handleUpload = async (image: any) => {
    const formData = new FormData();
    formData.append("fileUpload", image);
    try {
      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/files/upload`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${session?.access_token}`,
            target_type: "images"
          }
        }
      );
      setInfo({ ...info, imgUrl: res.data.data.fileName });
      console.log(">>> check audio: ", res.data.data.fileName);
    } catch (error) {
      //@ts-ignore
      toast.errorerror?.response?.data();
    }
  };

  return (
    <Button
      onChange={(e) => {
        const event = e.target as HTMLInputElement;
        if (event.files) {
          handleUpload(event.files[0]);
        }
      }}
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
  );
}
interface Iprops {
  trackUpload: {
    fileName: string;
    percent: number;
    uploadTrackName: string;
  };
  setValue: (value: number) => void;
}

interface INewTrack {
  title: string;
  description: string;
  trackUrl: string;
  imgUrl: string;
  category: string;
}
const Step2 = (props: Iprops) => {
  const { trackUpload, setValue } = props;
  const { data: session } = useSession();
  const toast = useToast();
  const [info, setInfo] = useState<INewTrack>({
    title: "",
    description: "",
    trackUrl: "",
    imgUrl: "",
    category: ""
  });
  const category = [
    { value: "CHILL", label: "Chill" },
    { value: "WORKOUT", label: "WORKOUT" },
    { value: "PARTY", label: "PARTY" }
  ];

  useEffect(() => {
    if (trackUpload && trackUpload.uploadTrackName) {
      setInfo({
        ...info,
        trackUrl: trackUpload.uploadTrackName
      });
    }
  }, [trackUpload]);

  const handleSubmitForm = async () => {
    const res = await sendRequest<IBackendRes<ITrackTop[]>>({
      url: `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/tracks`,
      method: "POST",
      body: {
        title: info.title,
        description: info.description,
        trackUrl: info.trackUrl,
        imgUrl: info.imgUrl,
        category: info.category
      },
      headers: {
        Authorization: `Bearer ${session?.access_token}`
      }
    });
    if (res.data) {
      setValue(0);
      toast.success("Create Success");
      // alert("Create Success");
    } else {
      toast.error(res.message);
    }
    // console.log(">>> check info: ", info);
  };

  return (
    <div>
      <Box sx={{ width: "100%" }}>
        <div>{props.trackUpload.fileName}</div>
        <LinearProgressWithLabel value={props.trackUpload.percent} />
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
          <div style={{ height: 250, width: 250, background: "#CCC" }}>
            <div>
              {info.imgUrl && (
                <Image
                  height={250}
                  width={250}
                  src={`${process.env.NEXT_PUBLIC_BACKEND_URL}/images/${info.imgUrl}`}
                  alt="step 2 track url"
                />
              )}
            </div>
          </div>
          <InputFileUpload setInfo={setInfo} info={info} />
        </Grid>
        <Grid xs={6} md={8}>
          <TextField
            value={info?.title}
            onChange={(e) => {
              setInfo({
                ...info,
                title: e.target.value
              });
            }}
            label="Title"
            variant="standard"
            fullWidth
            margin="dense"
          />
          <TextField
            value={info?.description}
            onChange={(e) => {
              setInfo({
                ...info,
                description: e.target.value
              });
            }}
            label="Description"
            variant="standard"
            fullWidth
            margin="dense"
          />
          <TextField
            value={info?.category}
            onChange={(e) => {
              setInfo({
                ...info,
                category: e.target.value
              });
            }}
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
          <Button
            variant="outlined"
            sx={{ mt: 5 }}
            onClick={() => {
              handleSubmitForm();
            }}
          >
            Save
          </Button>
        </Grid>
      </Grid>
    </div>
  );
};

export default Step2;

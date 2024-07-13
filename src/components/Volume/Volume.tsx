import { useState } from "react";

import { vol } from "../../constants";
import { handleVolumeChange } from "../../utils";

import Box from "@mui/material/Box";
import Slider from "@mui/material/Slider";
import Typography from "@mui/material/Typography";

import "./Volume.scss";

export default function Volume() {
  const [volume, setVolume] = useState<number>(-6);

  return (
    <>
      <div className="slider volume-slider">
        <Box sx={{ height: 200 }}>
          <Typography id="volume-slider" gutterBottom>
            Volume
          </Typography>
          <Slider
            aria-label="Volume"
            value={volume}
            defaultValue={volume}
            min={-36}
            max={0}
            orientation="vertical"
            valueLabelDisplay="auto"
            onChange={(event, newValue) =>
              handleVolumeChange(event, newValue, vol, setVolume)
            }
          />
        </Box>
      </div>
    </>
  );
}

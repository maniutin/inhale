import { useState } from "react";

import { filter } from "../../constants";
import { handleParameterChange } from "../../utils";

import Box from "@mui/material/Box";
import Slider from "@mui/material/Slider";
import Typography from "@mui/material/Typography";

import "./Filter.scss";

export default function Filter() {
  const [cutoff, setCutoff] = useState<number>(10000);

  filter.frequency.value = cutoff;

  return (
    <>
      <div className="slider cutoff-slider">
        <Box sx={{ width: 500 }}>
          <Typography variant="h5" gutterBottom>
            Filter
          </Typography>
          <Typography id="cutoff-slider" gutterBottom>
            Cutoff
          </Typography>
          <Slider
            aria-label="Filter Cutoff"
            value={cutoff}
            defaultValue={cutoff}
            min={20}
            max={10000}
            valueLabelDisplay="auto"
            onChange={(event, newValue) =>
              handleParameterChange(event, newValue, setCutoff, cutoff)
            }
          />
        </Box>
      </div>
    </>
  );
}

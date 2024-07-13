import { useState } from "react";

import { reverb } from "../../constants";
import { handleParameterChange } from "../../utils";

import Box from "@mui/material/Box";
import Slider from "@mui/material/Slider";
import Typography from "@mui/material/Typography";

import "./Reverb.scss";

export default function Reverb() {
  const [reverbAmount, setReverbAmount] = useState<number>(0);
  const [reverbDecay, setReverbDecay] = useState<number>(1.5);

  reverb.wet.value = reverbAmount;
  reverb.decay = reverbDecay;

  return (
    <>
      <Typography variant="h5" gutterBottom>
        Reverb
      </Typography>
      <div className="slider reverb-amount-slider">
        <Box sx={{ width: 500 }}>
          <Typography id="reverb-amount-slider" gutterBottom>
            Reverb Amount
          </Typography>
          <Slider
            aria-label="Reverb Amount"
            value={reverbAmount}
            defaultValue={reverbAmount}
            min={0}
            max={1}
            step={0.01}
            valueLabelDisplay="auto"
            onChange={(event, newValue) =>
              handleParameterChange(
                event,
                newValue,
                setReverbAmount,
                reverbAmount
              )
            }
          />
        </Box>
      </div>
      <div className="slider reverb-decay-slider">
        <Box sx={{ width: 500 }}>
          <Typography id="reverb-decay-slider" gutterBottom>
            Reverb Decay
          </Typography>
          <Slider
            aria-label="Reverb Decay"
            value={reverbDecay}
            defaultValue={reverbDecay}
            min={1}
            max={60}
            valueLabelDisplay="auto"
            onChange={(event, newValue) =>
              handleParameterChange(
                event,
                newValue,
                setReverbDecay,
                reverbDecay
              )
            }
          />
        </Box>
      </div>
    </>
  );
}

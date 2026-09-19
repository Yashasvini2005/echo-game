import { FireBg } from "./FireBg";
import { RainBg } from "./RainBg";
import { GridBg } from "./GridBg";
import { CircuitBg } from "./CircuitBg";
import { BeamsBg } from "./BeamsBg";

/* Maps the `bg` id used in storyData.js chapters to its background component. */
export const BG_MAP = { fire: FireBg, rain: RainBg, grid: GridBg, circuit: CircuitBg, beams: BeamsBg };

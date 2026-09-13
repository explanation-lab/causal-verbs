# Creating the nonverbal animations

**Stimuli** are the pictures, sounds and videos participants see or hear. These Python scripts create parts of the Study 3 animations:

| File | Purpose |
| --- | --- |
| [shared_primitives.py](shared_primitives.py) | Shared drawing functions for characters and other scene elements |
| [generate_causal_chains_test_trials.py](generate_causal_chains_test_trials.py) | Causal-chain test animations |
| [generate_single_cause_test_trials.py](generate_single_cause_test_trials.py) | Single-cause test animations |
| [warmup_single_character_trials.py](warmup_single_character_trials.py) | Practice animations with one character |

The [existing generated stimuli](../../../experiments/study3_nonverbal/children/generated_stimuli/) are available to inspect. The [additional child experiment script](../../../experiments/study3_nonverbal/children/stimulus_generation_snapshot/) is an identical copy of the main child script kept with these materials.

## Before generating anything

Agree on a separate output folder so you do not overwrite existing stimuli. The scripts currently save some files locally and refer to `../materials/`, meaning a materials folder one level above the script's location. Those locations need to be checked before a run.

Next, identify which animation version was shown in each dataset and compare generated output with those original study files. Check animation lengths and the pauses before and after punishment. The expected `chains_timing.json`, `single_cause_timing.json` and `warmup_timing.json` files are not available; these are structured text files for storing timing values.

We also need complete instructions and source materials for the introductory, ending and practice videos and sound cues. Some older production files exist, but do not substitute them for the current stimuli without checking the exact version.

[Back to the Python guide](../README.md) · [Study 3](../../../../docs/study3_nonverbal/README.md)

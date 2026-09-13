# Study 3: from video to looking measurements

Start with the [Study 3 guide](../../../docs/study3_nonverbal/README.md) to understand the experiment. Python is the programming language used here to create animations and process webcam recordings. A script is a file of instructions for the computer.

## How the parts fit together

| Step | What it does | Where to start |
| --- | --- | --- |
| Make the study materials | Draws the characters and creates the animations participants watch | [Stimulus generation](stimulus_generation/README.md) |
| Prepare inputs | Lists recording files and prepares them for processing | [Input preparation](preprocessing/README.md) |
| Measure children's looking | Uses iCatcher to label looking left, right or away in each video frame | [Child gaze coding](icatcher/README.md) |
| Measure adults' looking | Uses MediaPipe to track facial and eye landmarks and estimate looking | [Adult gaze coding](mediapipe/README.md) |
| Combine and check results | Joins the measurements into tables and matches them to experiment trials | [Input preparation and merging](preprocessing/README.md) |
| Analyze the measurements | Compares looking across conditions | [Available analysis](analysis/README.md) |

A **frame** is one image in a video. **Gaze coding** means converting the video into measurements of looking direction. A **condition** is one version of a trial, such as which character is punished. The [existing data tables](../../../data/study3_nonverbal/) and [figures](../../../figures/study3_nonverbal/) are available for inspection now.

## Before running a processing job

Confirm where the original videos are securely stored and that you have permission to access them. Keep raw recordings and identifying information outside GitHub, even when a recording is embedded inside a spreadsheet export.

With the project lead, choose one dataset and identify the experiment version that produced it. Check the input/output file locations, required software versions, which character was on each side of the screen, and the time periods being measured. Some scripts still point to locations on a previous computer. Agree on separate output locations so you do not overwrite existing data or figures.

## Next work

Document one complete route from video to gaze labels to summary tables to analysis. There is substantial processing code here, but several analysis scripts behind the existing plots are not yet available. The one existing unfair-punishment analysis is a starting point to inspect, not a replacement for all of those scripts. Do not guess the original analyses from the plots alone.

The adult and child experiments use different media versions in places. Check the links between the stimuli, recordings and measurements before deciding what the next study should test.

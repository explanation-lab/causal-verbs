# Preparing inputs and combining results

These helpers prepare lists of files or participants for a processing job and combine its outputs into data tables:

| Dataset | Prepare inputs | Combine results |
| --- | --- | --- |
| Children, using iCatcher | [make_participant_list.py](../icatcher/sherlock/make_participant_list.py) | [merge_results.py](../icatcher/sherlock/merge_results.py) |
| Adults, using MediaPipe | [make_participant_list.py](../mediapipe/sherlock/make_participant_list.py) | [merge_results.py](../mediapipe/sherlock/merge_results.py) |

The scripts live beside the other files that use them; this folder is a guide to those locations. iCatcher and MediaPipe are the tools used to estimate looking from webcam video.

Before running them, confirm the secure recording location, the correct experiment version and the intended output folder. Some inputs can contain identifying information or recordings, so do not copy them into GitHub. After combining results, check participant and trial counts against the selected dataset.

[Back to the Python guide](../README.md)

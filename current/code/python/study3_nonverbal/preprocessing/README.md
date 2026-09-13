# Input preparation and merging

The supplied preprocessing helpers remain beside the scripts that call them, preserving their within-pipeline relationships:

- Child iCatcher: [make_participant_list.py](../icatcher/sherlock/make_participant_list.py) and [merge_results.py](../icatcher/sherlock/merge_results.py).
- Adult MediaPipe: [make_participant_list.py](../mediapipe/sherlock/make_participant_list.py) and [merge_results.py](../mediapipe/sherlock/merge_results.py).

This directory is a navigation entry, not new preprocessing code. The helpers need secure external inputs and validated configuration; they were not executed. No new privacy transformation or scientific analysis is introduced.

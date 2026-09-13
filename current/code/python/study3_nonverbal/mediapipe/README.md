# Measuring adults' looking with MediaPipe

**MediaPipe** is software that tracks facial and eye landmarks in video. This project uses those positions to estimate where adults are looking.

- [local/process_videos_mediapipe.py](local/process_videos_mediapipe.py) is the local-computer processor associated with the existing 61-person adult pilot.
- [sherlock/](sherlock/) contains a version intended for **Sherlock**, a remote research computing system, plus input and output helpers. This version still needs a confirmed test run before relying on it.

The original adult video export contains recordings embedded inside a CSV file—a text format often opened as a spreadsheet. Keep that export in secure storage outside GitHub. The [adult tables here](../../../../data/study3_nonverbal/adults/) contain measurements, not the recordings themselves.

Next: confirm the correct input recordings and experiment version, locate the missing detailed gaze outputs, and document the software versions and file locations needed to repeat the processing. Compare the results with the existing summaries before choosing further analyses.

[Back to the Python guide](../README.md) · [Study 3](../../../../docs/study3_nonverbal/README.md)

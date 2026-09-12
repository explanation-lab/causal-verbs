# Study 3 — nonverbal looking-time studies

Child CHS/Lookit and adult Proliferate implementations examine spontaneous looking in causal-chain and single-cause punishment scenarios. The combined current design stays together here. The original study overview is [HANDOFF_README.md](HANDOFF_README.md).

Start with [NONVERBAL_REPRODUCIBILITY.md](../../docs/NONVERBAL_REPRODUCIBILITY.md), which evaluates every pipeline stage and corrects overly strong claims in the original notes.

| Directory | Contents |
| --- | --- |
| [01_stimulus_source_and_generation_code](01_stimulus_source_and_generation_code/) | Current Pillow generators and shared drawing source |
| [02_generated_stimuli](02_generated_stimuli/) | Generated GIF/PNG/video/audio stimuli; timing JSONs absent |
| [03_study_code_children_CHS](03_study_code_children_CHS/) | Current child jsPsych code |
| [03_study_code_adults_proliferate](03_study_code_adults_proliferate/) | Adult browser code and local MediaPipe processor |
| [04_icatcher_pipeline_children_sherlock](04_icatcher_pipeline_children_sherlock/) | Child gaze processing, full/cropped modes and cluster helpers |
| [05_mediapipe_pipeline_adults_sherlock](05_mediapipe_pipeline_adults_sherlock/) | Adult cluster adaptation; live execution not established |
| [06_processed_gaze_results](06_processed_gaze_results/) | Four coded data batches, numeric frame outputs where supplied, derived tables and plots |
| [07_analysis_code_and_reports](07_analysis_code_and_reports/) | One downstream analysis script, reports and a results deck; most analysis scripts missing |
| [preregistration](preregistration/) | Original adult/child documents; registration and deployed-version matches unverified |

Historical variants are in [archive/study3_nonverbal](../../archive/study3_nonverbal/); the [standalone single-cause pilot](../../archive/single_cause/nonverbal_standalone_pilot/) is indexed separately. No raw participant recording or identifiable nonverbal export is available here. Secure custody, path cleanup, timing/output fixes, supplementary asset sources and lab hosting remain unresolved.

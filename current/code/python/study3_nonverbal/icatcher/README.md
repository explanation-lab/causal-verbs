# Measuring children's looking with iCatcher

**iCatcher** is software that labels whether a child is looking left, right or away in each video frame. A frame is one image in a video. The labels can be combined into measurements of looking during different parts of a trial.

The [sherlock/ folder](sherlock/) contains the processors and helpers for preparing input lists, running jobs and combining outputs. **Sherlock** is a remote research computing system. Its job files use **SLURM**, software that schedules work on that system. Confirm access and the correct account settings with the project lead before submitting a job.

There are versions for cropped and full recordings. Cropping selects a shorter part of a video; choosing the wrong time period could change the question an analysis answers. Confirm the video version, timing and character positions for the dataset you are working on.

Next: document the required software/model versions, input paths and commands for one agreed dataset, then check the results. Use secure storage for participant recordings and a separate output location. The [existing child data](../../../../data/study3_nonverbal/children/) can be read without running a new job.

[Back to the Python guide](../README.md) · [Study 3](../../../../docs/study3_nonverbal/README.md)

# Privacy and secret review

Scope: the supplied handoff working tree and the target import before its first commit, 2026-09-12. Original history was not imported. The target is private and this review does not authorize publication.

## Screening and transformations

- Inventoried every source file, extension and size; recorded SHA-256 checksums before import.
- Examined all CSV schemas and participant-bearing fields, all JSON structures, free-response content, script examples, reports, Office XML/relationships/metadata and PDF text. Office files contain no nested embedded spreadsheets/other document objects; embedded image/audio material was also inventoried.
- Reviewed contact sheets covering 1,031 unique standalone/Office-embedded image assets and three sampled frames from each of 125 unique video files. The generic example video showing a recognizable person was withheld; retained videos depict experimental animation/materials. This is sample-based visual screening, not a frame-by-frame certification.
- Ran Gitleaks on the source working tree and target with redacted reports. No detected credentials/tokens/private keys were found. Additional structured checks look for known source participant identifiers and raw/base64 recordings in the target.
- Replaced values in `workerid`, `Response UUID`, `ParticipantID`, `uuid`, `response_id`, `participant_hashed_id`, `child_hashed_id` and `participant_id` with opaque keyed codes. Preserved consistent links between summary/per-participant/derived files. Replaced recording filenames, absolute annotation paths and identity-bearing filenames; scrubbed actual identifier examples in three archived processing scripts.
- Removed `date_created` from five derived child response tables. Preserved every data row and every other scientific value, including frame counts, conditions, responses, reaction times, age and demographic variables. These are coded research data; exact ages and demographics require continued restricted access. Original field names are retained and do not mean platform IDs remain present.
- Preserved all 260 non-lookup source CSV files, with normalization and transformations recorded per file in [data_transformations.json](data_transformations.json). The malformed historical free-response JSON was only identifier-sanitized; its valid CSV counterpart and original scientific text remain available.

## Excluded from Git

Six identifiable CHS JSON exports, one participant lookup CSV, one Office lock file and three generic sample media files are excluded. The entire `.git` history/configuration is excluded. The source ZIP, private pseudonymization key, audit scratch files and any participant lookup/crosswalk are outside the repository. See [source_manifest.csv](source_manifest.csv) for per-file dispositions.

No known raw participant video/audio is imported. A raw recording encoded in JSON/CSV is equally prohibited. iCatcher `.txt` files here contain numeric frame labels/confidence, not recordings; their source filenames have been de-identified. Approved stimulus narration/audio is distinct from participant recordings and is preserved with its source provenance.

Professional researcher/IRB contact details, public platform/project URLs and character names in stimuli/answers are retained. They are not participant identities or credentials. Historical institutional wording is provenance, not a new deployment approval.

The original restricted exports remain in the untouched handoff source. This import has not moved them into verified institutional custody; the raw-data location/access gap remains open. The local import key is temporary restricted audit material, never committed. It is unnecessary for analysis of the imported data but would be required to reproduce exactly the same opaque codes on a future re-import. Confirm a durable restricted custody plan separately if it must be retained.

`.gitignore` blocks common restricted filenames/directories and `.gitattributes` enables LFS for approved media. Neither substitutes for reviewing future commits. Keep raw recordings, identifiable exports, keys and payment/credential material out of this tree.

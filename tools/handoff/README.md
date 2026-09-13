# Preservation tools

Run `python3 tools/handoff/verify_import.py` from the repository root. It verifies all 2,806 retained imported files against the relocated source manifest and performs non-executing syntax checks. It does not run studies, regenerate stimuli or reproduce analyses.

`import_handoff.py` is the unchanged historical import/sanitization policy for the original pre-reorganization layout. Its path literals are historical provenance. **Do not rerun it into this repository.** The reorganization used only the already-screened working tree; no privacy transformation was rerun. The private key is not in Git and is not needed to use the retained data.

The verifier's optional `--source` mode is retained for separately authorized provenance checks, but was not needed for this reorganization. [Source mapping](../../docs/handoff/SOURCE_MAPPING.md) and the [reorganization ledger](../../docs/handoff/reorganization_mapping.csv) describe the current paths and original checksums. No new scientific analysis code is supplied by these tools.

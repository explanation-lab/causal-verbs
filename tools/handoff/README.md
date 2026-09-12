# Import and verification tools

`verify_import.py` checks hydrated imported bytes against `docs/handoff/source_manifest.csv`, parses Python/JSON and performs shell syntax checks without executing scientific code. Its optional `--source PATH` reads the original handoff to verify source checksums, inventory, preservation of all non-identifier CSV values and rows, and opaque-code consistency.

`import_handoff.py` documents the one-time routing/sanitization policy. It requires `--source`, `--target` and a private `--private-key` file of at least 32 random bytes. Use an empty target for a new import; an interrupted run permits only identical existing content. The key must be kept outside Git. This policy was reviewed for this handoff's schemas and is not a general-purpose anonymizer.

Opaque codes identify original coded values within their source context. They do not independently establish participant identity across different studies or reused numeric export IDs. No direct crosswalk is published. Keep the private repository and restricted source data under appropriate research access controls.

Preserved scripts elsewhere are historical scientific artifacts. These import tools do not supply missing analyses, fix deployment paths or validate live collection.

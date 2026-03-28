// SSE atoms are no longer used — the per-endpoint registry is managed
// entirely in the createSnapshot closure. This file is kept as a placeholder
// to avoid breaking any future direct imports, but it exports nothing meaningful.
//
// The WS manager still uses wsManagerAtom (ws/atom.ts) for its pattern.
// SSE switched to a fully closure-backed model with no shared global atoms.

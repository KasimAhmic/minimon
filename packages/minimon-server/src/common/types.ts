import 'systeminformation';

// The powerShellStart and powerShellRelease functions aren't exported from systeminformation
// so we have to augment the module.
// See https://github.com/sebhildebrandt/systeminformation/pull/700
declare module 'systeminformation' {
  export function powerShellStart(): void;
  export function powerShellRelease(): void;
}

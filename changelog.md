# Aeonis Release Notes

## 4.0.0 - First Stable 26.1 Release (2026-04-02)

### Release Focus
- First non-snapshot stable build on Minecraft 26.1.
- Completion of the migration from the 1.21.11 line to the 26.1 line.
- 26.1.1 hotfix support included while keeping 26.1 as baseline requirement.

### Final Pre-Stable Highlights
- Stabilized transformed gameplay camera/raycast/interaction behavior.
- Added stronger untransform/cleanup handling to prevent stale transformed state.
- Warning policy remaster:
	- Removed global startup warning spam.
	- Added world-once install note for 26.1 port status.
	- Added targeted Ender Dragon transform WIP warning.
- Restored vanilla game title behavior.
- English localization pack rebuilt for active Aeonis content.

### 26.1 Snapshot Timeline

#### 4.0-SNAPSHOT5_mc26.1 (2026-03-28)
- Initial 26.1 migration baseline.

#### 4.0-SNAPSHOT6_mc26.1 (2026-03-29)
- Mapping/API compatibility follow-up and crash reduction.

#### 4.0-SNAPSHOT7_mc26.1 (2026-03-30)
- Startup stability pass for updated mixin targets.

#### 4.0-SNAPSHOT8_mc26.1 (2026-03-31)
- Runtime stabilization and world-load diagnostics.

#### 4.0-SNAPSHOT9_mc26.1 (2026-04-01)
- Fixed missing worldgen holder crash path by disabling unstable registration hook.

#### 4.0-SNAPSHOT10_mc26.1 (2026-04-01)
- Transformed camera and interaction reliability pass.

### Migration Summary
- Transition path: 1.21.11 -> 26.1
- Stable cut: 4.0.0 on 2026-04-02

## 3.1.0 - The HotFix Snapshot (2026-02-22)

### Prop Hunt Hotfix Remaster
- Prop Hunt remaster with major hotfixes for round flow, state restoration, and reliability.
- Added robust leave/disconnect cleanup and safer game lifecycle checks.
- Added dynamic hunter hint pacing and active arena border enforcement during rounds.
- Commands improved: preset arena creation now works and hint interval is configurable.

### Companion Bot AI Remaster
- Complete rewrite of Companion Bot AI with advanced state-machine system (IDLE, FOLLOW, COMBAT, FLEE, LOOT, RETURN).
- Smart combat: threat-based target priority, weapon switching, strafing, dodge-rolling, critical hit timing.
- Adaptive follow, sprint catch-up, teleport fallback, and intelligent flee/re-engage behavior.
- Threat memory for retaliatory targeting of entities that attacked owner or bot.
- Bug fix: Companion no longer attacks passive mobs — only targets Monsters or retaliatory threats.

### Hunter Bot AI Remaster
- Complete rewrite of Hunter Bot (Manhunt) AI with pursuit intelligence and multi-phase hunting.
- Prediction-based pathfinding, combo attacks, bow sniping, terrain-aware navigation.

### New Item: Rhistel (Companion Whistle)
- Whistle item that cycles companion mode: ATTACK → FOLLOW → RUN AWAY → AUTO.
- Each forced mode lasts 2 minutes; given automatically on `/comp spawn`.
- Custom texture and model included.

### Mass Item Registration
- Registered 100+ new items with creative tab entries, item definitions, and models.
- Fixed missing textures from the 1.21.2+ two-layer item model system.

### Copper Stalker AI Remaster
- Fearful/advanced behavior tuning with smarter flee decisions.
- Temporary taming by feeding vegetable food; tamed stalkers follow and stop attacking.
- Morning departure behavior for tamed stalkers plus new advancement: `Taming liternally everything!`.
- Fixed save/load for 1.21.11 ValueOutput/ValueInput API and SoundEvent holder references.

### Fun Command Remaster
- Added timed transform prank: `/prank morph <players> <chicken|pig|goat|frog|parrot|random_funny>` (2 minutes).
- Added `/prank boing`, `/prank confetti`, and `/prank swap`.

### Other Fixes
- Fixed permission system, server access, tooltip, and cooldown APIs for 1.21.11 compatibility.

## 3.0.0 - Major Evolution (2026-02-15)
- Rebranded to Aeonis
- Expanded system architecture
- Foundation for dimension and rendering framework
- Internal refactors

## 2.1.0 - The Horror Update (Phase II) (2026-02-01)
- New **Ancard** dimension (aeonis:ancard) with corrupted Deep Dark vibe, dark fog, and permanent noon‑tinted sky.
- Custom **Ancard portal** using reinforced deepslate frames; fixed portal visuals and ambience.
- **Ancard Lighter** behaves like flint and steel but places soul fire and activates Ancard portals.
- Ancard worldgen: deepslate-only terrain, reduced depth, more water/lava activity.
- Surface **Ancient City** and **End City** spawns, plus strongholds, pillager outposts, and abandoned villages.

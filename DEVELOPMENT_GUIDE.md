# Development Guide

This guide serves as an entry point for understanding the overall architecture of the plugin, and give an insight to design choices taken.

## Architecture

### plugin side

The side communicating with penpot is contained in plugin.ts. It is an independent system and the only area where the penpot namespace works. No import other than type imports are allowed, including dynamic imports. They are not allowed by Penpot and will throw errors preventing the plugin from loading correctly. As such, it should be as decoupled as possible from the UI. In case of absolute necessity, the code can be duplicated (such as with event enums), but it should be avoided as much as possible (having two sources of truth is inherently prone to human made issues).

### UI side

The user interface is made with sveltekit and a static adapter. A post build script helps to bind built code to the manifest file.
The +page.svelte file is the entry point of the UI. Shared state currently only exist in pattern_store.svelte.ts. The current architecture may not be suited for a multi-page approach (context switching is managed by the page file). If this becomes necessary, tests will be needed.

Context switching is driven by the user selection, after the plugin window was open.

## Patterns

A pattern is represented by a JSON object serving as a contract. It should be as deterministic as possible (an exception is made for randomness as browsers do not support seeded randomness). The source of truth is the plugin data stored in the frame serving as the container for the pattern. After publication, all changes to the structure should trigger a version bump, and provide a conversion system with older versions. A pipe approach with subsequent upgrades to the object is recommended. It is not in place as of now.

### Source

The shape source is a copy (clone) of the shape selected upon creation of the pattern. No test have been done regarding compatibility with components. To change it, the source shape should be replaced, with plugin data set accordingly on it. It should be hidden in all cases, as it is not part of the pattern.

The source is then cloned and mutated to form the pattern, after all processing was done. Note that caching was attempted but lead to unexpected behavior which was hard to fix (see comments in the plugin file), so it was reverted.

### Rules

The rule approach allows to apply additional behavior to the pattern. It is the preferred approach for adding functionality. The order of rule as well as the order of processing of shape instances is important.

A rule can take advantage of a key value based temporary memory if needed (saved for one full pass over all shapes). It takes an object representing the shape as input, and return the mutated data and memory. If the shape is left in an invalid shape, it will immediately be fixed after each processing. However it is advised to test out of bounds behavior to ensure stability.

A rule is not required to support all pattern modes. However, it is the responsibility of the rule to mute itself and provide a warning in the logs to inform about it. Similarly, it should be clearly stated in the user interface of the rule, as currently there is no restrictions on picking rules based on the selected pattern mode.

## Hosting

Deployment is automatically performed on Netlify from the `docs` directory after each puch or merge to the `main` branch. It is hosted at https://penpot-tiling-utility.netlify.app/manifest.json
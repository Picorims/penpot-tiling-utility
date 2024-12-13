/*
  Copyright (c) 2024 Charly Schmidt aka Picorims<picorims.contact@gmail.com>,

  This Source Code Form is subject to the terms of the Mozilla Public
  License, v. 2.0. If a copy of the MPL was not distributed with this
  file, You can obtain one at http://mozilla.org/MPL/2.0/.
*/

import type { Pattern_v1 } from "$lib/types/pattern";

// eslint-disable-next-line prefer-const
export let pattern = $state<{proxy: Pattern_v1}>({
    proxy: {
        // The default values here are ONLY here to initialize the pattern object.
        // The actual values will be set by the plugin side upon pattern creation.
        // IN OTHER WORDS, CHANGING THESE VALUES WILL NOT CHANGE THE DEFAULTS IN THE PLUGIN.
        columns: 0,
        rows: 0,
        mode: "grid",
        radius: 0,
        version: 1,
    }
});

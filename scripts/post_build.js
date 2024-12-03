/*
  Copyright (c) 2024 Charly Schmidt aka Picorims<picorims.contact@gmail.com>,

  This Source Code Form is subject to the terms of the Mozilla Public
  License, v. 2.0. If a copy of the MPL was not distributed with this
  file, You can obtain one at http://mozilla.org/MPL/2.0/.
*/

import * as fs from "fs";
import * as path from "path";

// this script provides to penpot a plugin.js that forwards
// to its corresponding chunk in the immutable folder.

if (process.argv.length !== 3) {
  console.error("Post build script requires a mode.");
  console.error("Usage: node scripts/post_build.js <dev|production>");
  process.exit(1);
} else {
  let basePath;
  if (process.argv[2] === "dev") {
    basePath = ".svelte-kit/output/client";
  } else if (process.argv[2] === "production") {
    basePath = "docs";
  } else {
    console.error("Invalid mode.");
    process.exit(1);
  }

  const immutableDirFiles = fs.readdirSync(path.resolve(basePath + '/_app/immutable'));
  const regex = new RegExp(/^plugin.*\.js/g);
  let foundPluginCode = false;
  for (const file of immutableDirFiles) {
    if (regex.test(file)) {
      const from = path.resolve(basePath + "/_app/immutable/" + file);
      const to = path.resolve(basePath + '/plugin.js');
      fs.copyFileSync(from, to);
      foundPluginCode = true;
      break;
    }
  }
  
  if (!foundPluginCode) {
    console.warn("Post build script failed to find plugin code.");
  }
  
  console.log("Post build script finished.");
}

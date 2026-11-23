// the server's work-it-out helper needs only sourceText from activity-studio.helper (which loads the models): a stand-in
const path = require("path");
const p = path.join(process.env.HOME, "ebidyaloy-web/ebidyaloy_web_client/source/backend/src/v3/helpers/activity-studio.helper.js");
require.cache[p] = { id: p, filename: p, loaded: true, exports: { sourceText: () => "" } };

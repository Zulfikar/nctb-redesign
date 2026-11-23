# Engine tests for part A (the Class 4 book's new game rounds)

Written 23 Nov 2026. The rules live in the eBidyaloy web repo (`source/frontend/components/management/activity-studio/work-it-out.js`,
the server's twin `source/backend/src/v3/helpers/work-it-out.helper.js`, the player `work-it-out-player.component.js`).

```sh
cd ~/Downloads/NCTB-Redesigned/class4-math-activities/engine-tests
source ~/.nvm/nvm.sh && nvm use 16
./sync-web.sh                                      # after every change to work-it-out.js
for t in a1 a2 a3 a4 a7 a8; do S=$PWD node -r ./globals.cjs $t-test.mjs | tail -1; done   # web = server, the book's own numbers
node a1-play.cjs; WIDTH=1100 node a1-play.cjs      # the real player on :3003 (a2, a4, a7, a8 too), pictures in shots/
```
- `aN-test.mjs`: the rules, website = server, the book's examples, and old behaviour unchanged (`old/` = the last commit).
- `aN-play.cjs`: a phone-wide Chrome plays a mocked game on the test site :3003 (`NEXT_DIST_DIR=.next-play npx next dev -p 3003` in source/frontend), one round wrong on purpose; it prints the stars and any page error.
- The play scripts take `__dirname` for `web/` and `shots/`: run them from this folder.

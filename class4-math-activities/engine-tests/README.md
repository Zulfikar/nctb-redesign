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

## The series' new games (24 Nov 2026, «এসো, গণিত শিখি!»'s second games)

The same way, for the website games built for `~/Downloads/Esho-Bhasha-Shikhi/Math/MORE-GAMES-PLAN.md` (each a Work It Out kind):
`e22` counting on and even/odd (`nmark` rules `skip`, `even`, `odd`), `e9` rounding (`round`), `e3` number-line hops (`hops`),
`e4` arrays (`array`), `e1` the tens board (`tens`: ten-frames, bundles and sticks, blocks; read, make, add, trading).
```sh
for t in e22 e9 e3 e4 e1; do [ -f $t-test.mjs ] && S=$PWD node -r ./globals.cjs $t-test.mjs | tail -1; done
node e1-play.cjs; WIDTH=1100 node e1-play.cjs      # e3, e4, e9, e22 too
```


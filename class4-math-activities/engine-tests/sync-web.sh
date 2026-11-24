#!/bin/zsh
# Copies the website's game rules into this folder as ES modules (web/), and the rules as last committed (old/), so the
# node tests can import them. Run it after every change to work-it-out.js. "old" = the rules before part A (the commit
# before 82f6467652, which pushed A1 A2 A4 A7 A8), so "old behaviour unchanged" keeps meaning before the Class 4 work.
W=~/ebidyaloy-web/ebidyaloy_web_client/source/frontend/components/management/activity-studio
D=${0:A:h}
mkdir -p $D/web $D/old
sed 's#from "./code-path"#from "./code-path.mjs"#' $W/work-it-out.js > $D/web/work-it-out.mjs
cp $W/code-path.js $D/web/code-path.mjs
git -C ~/ebidyaloy-web/ebidyaloy_web_client show ${OLD:-82f6467652^}:source/frontend/components/management/activity-studio/work-it-out.js | sed 's#from "./code-path"#from "../web/code-path.mjs"#' > $D/old/work-it-out.mjs

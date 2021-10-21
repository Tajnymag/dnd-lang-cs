#!/bin/bash
./dnd-to-cs.sh | awk -v OFS=$'\t' '{ print $2,$1 }' | awk '{ print tolower($0) }' | ./sort-cs.mjs

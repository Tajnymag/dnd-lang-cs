#!/bin/bash
paste <(echo {a..z} {a..z}{a..z} {a..z}{a..z}{a..z} | tr ' ' $'\n') <(cat syn2015_lemma_utf8.tsv | cut -f2) | awk 'NF==2' | sort -k 1,1

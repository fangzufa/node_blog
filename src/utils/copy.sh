#!/bin/sh
cd /Users/fzf/Documents/workspace/smallTask/nodejs/blog-nomal/logs
cp access.log $(date +%Y-%m-%d).access.log
echo "" > access.log
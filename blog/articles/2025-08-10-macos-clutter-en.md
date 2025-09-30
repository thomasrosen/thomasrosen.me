---
id: 5d3a9f77-b32e-497c-b12b-42b652e30085
date: 2025-08-10T22:01
title: Possible Clutter on MacOS
slug: macos-clutter
audio: ""
audio_length: 00:00
coverphoto: ""
lang: en
font: sans_serif
tags:
  - Software
  - macos
---

## Apps / Folders
Some folders/apps that clutter on macos.

### node_modules
If you develop javascript stuff these can clutter a huge portion of your system.
Use `find . -type d -name node_modules -prune 2>/dev/null` to get the node_modules folders in the current dictonary. `-prune` stops find from going into subfolders inside node_modules.
Checking the whole system often was not helpful, as many electron apps also have a node_modules folder that is needed for them to function.

### .git repo folders
Sometimes cleaning up a git repo is a good idea. Linus has some words about that here: https://gcc.gnu.org/legacy-ml/gcc/2007-12/msg00165.html
In short, run `git repack -a -d --depth=250 --window=250`. This apparently can take a long time, so run it over night.
Here is a loop, to apply that to all subfolders (if they are a git-repo): `for d in */; do (cd "$d" && git rev-parse --is-inside-work-tree >/dev/null 2>&1 && echo "=== $d ===" && git repack -a -d --depth=250 --window=250); done`.

### Apple Music Artwork caching
The folder `~/Library/Containers/com.apple.AMPArtworkAgent` was a few GB. This is apperently a process to cache artwork for apple music.

### Apple Voice Memos
When everything is synced to iCloud, this can be a multi GB folder, you can savely delete:
`~/Library/Application Support/Group Containers/group.com.apple.VoiceMemos.shared`

To be continued…

## Terminal Stuff

To get the folders in your current dictonary listed sorted by size, use `du`.
Here is a full command is use: `du -h -d 1 -t 2M | sort -hr`. This also only gets the folders over 2mb.
Use `du -sh *` to get the size of all direct subfolders without sorting or restrictions.

Find folders by using something like `find . -type d -name "node_modules" 2>/dev/null`. (`2>/dev/null` makes it ignore all errors.)

Use `rm -R your_folder_path` to delete whole dictonaries. PLEASE be careful!!! This deletes stuff without being able to bring it back.

## Articles about cleaning storage space on macos

[What is safe to delete?](https://daisydiskapp.com/guide/what-to-delete)

Something about `DARWIN_USER_CACHE_DIR`: [The missing gigabytes of disk space on my Mac](https://www.ctrl.blog/entry/darwin-user-cache-gigabytes.html)

About cleaning git repos. [Re: Git and GCC](https://gcc.gnu.org/legacy-ml/gcc/2007-12/msg00165.html)

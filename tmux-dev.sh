#!/bin/sh

tmux new-session -d -s breadchain

tmux new-window -t breadchain:1 -n chain 
tmux rename-window -t breadchain:1 "chain"
tmux send-keys -t breadchain:1 "yarn hardhat:dev" Enter
tmux split-window -dt breadchain:1
tmux split-window -ht breadchain:1
tmux send-keys -t breadchain:1 "yarn dev" Enter

tmux select-window -t breadchain:1
tmux attach-session -d -t breadchain
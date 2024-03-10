# P2P Chess
## What is this?
The goal of this project is to build a website on which user can play chess with their friends without the need to sign up for an account. In the end, using this website, users will be able to create a game by simply sending a link to their friends. Once set up, games are completely peer to peer. 
## Why am I making this?
I love chess and would like something like this to exist. I also thought it would be an interesting exercise to learn about chess programming as I would like to eventually build a chess engine. 
## What am I working on now?
In trying to implement en passant and castling, I was led to rethink my approach to 'making moves.' So far, I have been generating a set of legal moves using bitboards but making moves by directly editing an array which encodes the board state in strings. e.g. ["bR", "bN", "bB", ..., "", "", "", ..., "wN" ,"wR"] I think the better approach is to create a makeMove function that operates totally within the bitboard paradigm and then use the array representation only for the purposes of rendering the pieces. I believe this will make things easier to understand and implement.
### Update on Current Problem
I've succesfully decoupled the UI logic from the move making logic. The board UI now updates when changes are made to a bitboard which is handled in a makeMove function in a separate file from the board component. I need to finish writing the makeMove function which will take advantage of certain 'flags' present in each 'move' (represented by 16 bits: 6 for from square, 6 for to square, and 4 for flags - promotion, doublepush, castling, and en passant) to handle en passant and castling. Whether or not this works is an empirical question... I've just got to try.

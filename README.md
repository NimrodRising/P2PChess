# P2P Chess
## What is this?
The goal of this project is to build a website on which user can play chess with their friends without the need to sign up for an account. In the end, using this website, users will be able to create a game by simply sending a link to their friends. Once set up, games are completely peer to peer. 
## Why am I making this?
I love chess and would like something like this to exist. I also thought it would be an interesting exercise to learn about chess programming as I would like to eventually build a chess engine. 
## What am I working on now?
I am currently attempting to implement en passant and castling. This problem has led me to rethink my approach to 'making moves.' So far, I have been generating a set of legal moves using bitboards but making moves by directly editing an array which encoces the board state in strings. e.g. ["bR", "bN", "bB", ..., "", "", "", ..., "wN" ,"wR"] I think the better approach is to create a makeMove function that operates totally within the bitboard paradigm and then use the array representation only for the purposes of rendering the pieces. I believe this will make things easier to understand and implement.  

# P2P Chess
## What is this?
The goal of this project is to build a website on which user can play chess with their friends without the need to sign up for an account. In the end, using this website, users will be able to create a game by simply sending a link to a friends. Once set up, games are completely peer to peer. 
## Why am I making this?
I love chess and would like something like this to exist. I also thought it would be an interesting exercise to learn about chess programming as I would like to eventually build a chess engine.
## What am I working on now?
I've implemented the makemove function (some refactoring needed), en passant, and castling. I introduced a metadata state variable within the chessboard component for storing information about enPassant and castling as the legality of those moves depends on previous board positions. Now what I need to do is write a function that will return a value that indicates whether or not a given square is attacked. This will aid in filtering out illegal moves by the king (moving onto attacked squares or castling through attacked squares) and other pieces (revealing checks on the king - absolute pins). 

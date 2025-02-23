// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Counters.sol";

contract MusicPlatform is ERC721, Ownable {
    using Counters for Counters.Counter;
    Counters.Counter private _tokenIds;

    struct Song {
        string title;
        address artist;
        uint256 price;
        string uri;
    }

    mapping(uint256 => Song) public songs;
    mapping(address => uint256) public artistBalance;

    event SongUploaded(uint256 tokenId, string title, address artist, uint256 price);
    event StreamingPayment(uint256 tokenId, address listener, address artist, uint256 amount);

    constructor() ERC721("DMusic", "DMUSIC") {}

    function uploadSong(string memory title, uint256 price, string memory uri) public returns (uint256) {
        _tokenIds.increment();
        uint256 newTokenId = _tokenIds.current();

        _mint(msg.sender, newTokenId);
        songs[newTokenId] = Song(title, msg.sender, price, uri);

        emit SongUploaded(newTokenId, title, msg.sender, price);
        return newTokenId;
    }

    function streamSong(uint256 tokenId) public payable {
        Song memory song = songs[tokenId];
        require(msg.value >= song.price, "Insufficient payment for streaming");
        
        artistBalance[song.artist] += msg.value;
        emit StreamingPayment(tokenId, msg.sender, song.artist, msg.value);
    }

    function withdrawBalance() public {
        uint256 balance = artistBalance[msg.sender];
        require(balance > 0, "No balance to withdraw");
        
        artistBalance[msg.sender] = 0;
        payable(msg.sender).transfer(balance);
    }
}

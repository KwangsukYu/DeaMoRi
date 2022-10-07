// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Counters.sol";

contract TROPHYNFT is ERC721, Ownable {
    using Counters for Counters.Counter;

    Counters.Counter private _tokenIdCounter;

    constructor() ERC721("Trophy", "TRP") {}

    mapping(uint => string) tokenURIs;

    function tokenURI(uint256 tokenId) public view virtual override returns (string memory) {
        return tokenURIs[tokenId];
    }

    function mintNFT(address to, string memory tokenURI) public returns (uint256)
    {
        uint256 newTokenId = _tokenIdCounter.current();
        _mint(to, newTokenId);
        tokenURIs[newTokenId] = tokenURI;
        _tokenIdCounter.increment();
        
        return newTokenId;
    }

    function getTokenURIs(address owner) public view returns (string[] memory) {
        
        string[] memory ownerURIs = new string[](balanceOf(owner));
        uint256 j;

        for(uint256 i=0; i < _tokenIdCounter.current(); i++){
            if(ownerOf(i) == owner) {
                ownerURIs[j] = tokenURIs[i];
                j++;
            }
        }

        return ownerURIs;
    }

    function allTokenUris() public view returns (string[] memory) {
        string[] memory uris = new string[](_tokenIdCounter.current());
        uint256 j;

        for (uint i = 0; i < _tokenIdCounter.current(); i++){
            uris[j] = tokenURIs[i];
            j++;
        }
        return  uris;
    } 

}
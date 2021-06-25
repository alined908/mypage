pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import {Helper} from "./Helper.sol";

contract AlinedTicket is ERC721 {
    
    using Counters for Counters.Counter;
    using Helper for uint;
    Counters.Counter private _tokenIdTracker;
    uint256 private _cap;
    mapping (address => uint256) private addressToTokenID;

    constructor() ERC721("Alined's Ticket", "ALINED") {
        _cap = 50;
    }

    function mint(address to) public {
        uint256 currentId = _tokenIdTracker.current();
        uint256 nextId = currentId + 1;
        require(nextId < _cap, "Mint cap has been reached");
        require(addressToTokenID[msg.sender] == 0, "Account must not have minted before");
        _tokenIdTracker.increment();
        _mint(to, nextId);
        addressToTokenID[to] = nextId;
    }

    function _baseURI() internal pure override returns (string memory) {
        return "https://gateway.pinata.cloud/ipfs/Qmbes2whxyfs1XqRCytkqq2JXKb6tjYxNHQRg7eEUVDSfd";
    }

    function tokenURI(uint256 tokenId) public view virtual override returns (string memory) {
        require(_exists(tokenId), "ERC721Metadata: URI query for nonexistent token");
        string memory base = _baseURI();
        return string(abi.encodePacked(base, "/", tokenId.uint2str(), ".json"));
    }

    function tokenIDOwnedByAddress(address from) public view returns (uint id){
        return addressToTokenID[from];
    }

    function burn(uint256 tokenId) public {
        require(_isApprovedOrOwner(msg.sender, tokenId));
        _burn(tokenId);
    }
}
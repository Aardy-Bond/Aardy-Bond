// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract AccessControl {
    mapping(address => bool) public authorizedUsers;

    event AccessGranted(address indexed user);
    event AccessRevoked(address indexed user);

    function grantAccess(address _user) public {
        authorizedUsers[_user] = true;
        emit AccessGranted(_user);
    }

    function revokeAccess(address _user) public {
        authorizedUsers[_user] = false;
        emit AccessRevoked(_user);
    }

    function isAuthorized(address _user) public view returns (bool) {
        return authorizedUsers[_user];
    }
}

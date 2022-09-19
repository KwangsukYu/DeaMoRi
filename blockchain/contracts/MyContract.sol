pragma solidity ^0.8.4;

// 컨트렉트 선언
contract MyContract {

    // 상태 변수 선언
    address public owner;
    uint256 public amount;
    address[] public funders;
    bool isOpened;
    
    mapping(address => uint256) funderToAmount;

    // 이벤트 정의(event)

    // 생성자
    constructor() payable {
        owner = msg.sender;
        amount = msg.value;
        isOpened = true;
    }

    // 이벤트 정의(event)


    // 함수 변경자 정의(modifier)
    modifier onlyOwner() {
        require(msg.sender == owner);
        _;
    }

    //  함수(메소드) 정의
    function fund() public payable {
        require(isOpened == true);

        amount += msg.value;
        if (funderToAmount[msg.sender] == 0) {
            funderToAmount[msg.sender] = msg.value;
            funders.push(msg.sender);
        } else {
            funderToAmount[msg.sender] += msg.value;
        }
    }

    function getFunder() public view  returns ( address[] memory ) {
        require(isOpened == true);
        return funders;
    }

    function getFunderToAmount(address funder) public  view returns ( uint256 ){
        require(isOpened == true);
        return funderToAmount[funder];
    }

    function withdrawal(address to) public {
        require(isOpened == true);
        payable(to).transfer(address(this).balance);
    }

    function canceled() public onlyOwner {
        require(isOpened == true);
        for (uint256 i; i < funders.length; i++) {
            payable(funders[i]).transfer(funderToAmount[funders[i]]);
        }
        payable(owner).transfer(address(this).balance);
        isOpened = false;
    }
}
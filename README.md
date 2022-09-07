
* Truffle 설치

  ```
  npm install -g truffle
  ```
* truffle 톤틴 프로젝트 준비
  ```
  truffle init
  ```

  * contract/ : 모든 Solidity 계약이 저장

  * migrations/ : 계약을 네트워크에 배치하는데 도움을 주는 모든 javaScript 이송 파일 저장

  * test/ : 계약의 코드를 검사하는 검사 스크립트들이 저장

  * truffle-config.js : 프로젝트의 여러 설정을 정의

* .sol 파일을 contract/ 안에 배치 후 complie

    FundRaising.sol
    ```
    // SPDX-License-Identifier: GPL-3.0
    pragma solidity >=0.7.0 <0.9.0;

    contract FundRaising {
        address user;
        address hedger;
        address speculator;

        struct asset{
            uint id;
            uint Quantity;
            uint price;
            address seller;
            address buyer;
            uint date;
        }
        asset TradedAsset;

        event DepositEv(uint amount, address sender);

        constructor(uint assetID,
            uint Quantity,
            uint price,
            address seller,
            address buyer,
            uint date) {
                TradedAsset.id = assetID;
                TradedAsset.Quantity = Quantity;
                TradedAsset.price = price;
                TradedAsset.seller = seller;
                speculator = seller;
                hedger = buyer;
                TradedAsset.buyer = buyer;
                TradedAsset.date = date;
        }

        function deposit() public payable returns(bool) {
            require(msg.value == TradedAsset.Quantity * TradedAsset.price);
            emit DepositEv(msg.value,msg.sender);
            return true;
        }

        modifier onlyhedger(){
            require(msg.sender == hedger);
            _;
        }

        function sellcontract(address newhedger) public onlyhedger returns(bool)  {
            hedger = newhedger;
            return true;
        }

        function getpaid() public returns(bool) {
            require(block.timestamp >= TradedAsset.date && address(this).balance > 0);
            payable(speculator).transfer(address(this).balance);
            return true;
        }
    }
    ```

    ```
    >truffle complie
    ```

* web3j dependency 추가
    ```gradle
    // https://mvnrepository.com/artifact/org.web3j/core
    implementation group: 'org.web3j', name: 'core', version: '5.0.0'
    ```
* OkHttp dependency 추가
    ```
    // https://mvnrepository.com/artifact/com.squareup.okhttp3/okhttp
    implementation group: 'com.squareup.okhttp3', name: 'okhttp', version: '4.10.0'
    ```


* 프라이빗 서버 구동
    ```
    > geth --networkid 921 --maxpeers 2 --datadir ~/dev/eth_localdata/ --port 30303 --allow-insecure-unlock --http --http.port 8545 --http.addr 0.0.0.0 --http.corsdomain "*" --http.api eth,net,web3,miner,personal
    ```


* test코드 작성
    ```java
    @SpringBootTest
    class DemoApplicationTests {

        @Test
        void sss() throws IOException {
            Web3j web3 = Web3j.build(new HttpService());  // defaults to http://localhost:8545/
            Web3ClientVersion web3ClientVersion = web3.web3ClientVersion().send();
            String clientVersion = web3ClientVersion.getWeb3ClientVersion();

            System.out.println("clientVersion : " + clientVersion);
        }

        @Test
        public void getEthClientVersionASync() throws Exception
        {
            Web3j web3 = Web3j.build(new HttpService());  // defaults to http://localhost:8545/
            Web3ClientVersion web3ClientVersion = web3.web3ClientVersion().sendAsync().get();
            System.out.println("clientVersionASync : " + web3ClientVersion.getWeb3ClientVersion());
        }

    }
    /* 출력 결과 연결 확인
    clientVersion : Geth/v1.10.23-stable-d901d853/linux-amd64/go1.18.5
    clientVersionASync : Geth/v1.10.23-stable-d901d853/linux-amd64/go1.18.5
    */
    ```

* 현재 블록 번호 봔환
    ```java
    public EthBlockNumber getBlockNumber() throws Exception{  // 현재 블록 번호
        EthBlockNumber result = new EthBlockNumber();
        result = this.web3j.ethBlockNumber()
                .sendAsync()
                .get();
        return result;
    }
    // 현재 블록 정보 : 1963
    ```

* 주소의 계정 확인
    ```java
    public EthAccounts getEthAccounts() throws ExecutionException, InterruptedException {
            EthAccounts result = new EthAccounts();
            result = this.web3j.ethAccounts()
                    .sendAsync()
                    .get();
            return result;

        }

     //계정 정보 : + [0xd520c930ad44d26479bf68ee5e9504bd946d924c, 0xf32ac93d2a067ad49671216bdb7317741fdaea9a, 0xa101f8b1b8c9dccc605180091fec4e172307d1a6, 0xb7b50bc2d57a108d2c2edd279b7f3ac5a3ddbb14, 0xf87cc28f62d85931eb4e67759e51280e93b91ca9]   
    ```

* 그 이외 여러 제공 기능들

    ![1](as/1.PNG)


## 스마트 컨트랙트 wrapping

* web3j 설치

    ```
    web3j import -s <path to solidity sources> [-o <path>|-n <project name>|-p <package name>] -t
    ```

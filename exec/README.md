## 1. 프로젝트 개요

> 내가 후원한 금액이 잘 쓰이는지 궁금하시다고요? 내가 참여한 대회의 주최자들이 의심스럽다고요? 그래서 준비했습니다! 신뢰성이 넘치는 대회 플랫폼! 저희 대모리(대학모아리그)와 함께 하시죠!
> 

---

## 2. 도구 및 개발환경

- 이슈 관리 : JIRA
- 형상 관리 : Gitlab
- 커뮤니케이션 : Notion, Mattermost, Webex, Discord
- 디자인 : Figma
- UCC : 모바비
- 서버
    
    
    | 설치 목록 | version |
    | --- | --- |
    | Ubuntu | 20.04 LTS |
    | Docker | 20.10.18 |
    | Docker-compose | 1.29.2 |
    | Nginx | 1.23.1 |
    | Mysql | 8.0.30 |
- 프론트앤드
    
    
    | 설치 목록 | version |
    | --- | --- |
    | React | 18.0.19 |
    | Node.js | 16.16.0 |
    | npm | 6.14.14 |
    | VS Code | 1.70.0 |
- 백앤드
    
    
    | 설치 목록 | version |
    | --- | --- |
    | Java openjdk | 11.0.16 |
    | SpringBoot | 2.7.1 |
    | IntelliJ | 11.0.15 |
    | gradle | 2.6.11 |

---

## 3. 빌드 및 배포

## 빌드 및 배포 과정

### 프론트엔드

- 깃 클론
    
    `git clone https://lab.ssafy.com/s07-blockchain-contract-sub2/S07P22C208.git`
    
- 폴더 이동
    
    `cd frontend`
    
- 빌드
    
    `npm install`
    
- 실행
    
    `npm start`
    

### 백엔드

- 깃 클론
    
    `git clone https://lab.ssafy.com/s07-webmobile1-sub2/S07P12C107.git`
    
- Nginx 설정
    
    ```jsx
    server {
        listen       80;
        listen       [::]:80;
        server_name  j7c208.p.ssafy.io;
    
        if ($host = j7c208.p.ssafy.io) {
            return 301 https://$host$request_uri;
        }
    
        return 404;
    }
    
    server {
        listen       443 ssl;
        listen       [::]:443 ssl;
        server_name  j7c208.p.ssafy.io;
    
        root         /home/ubuntu/workspace/build;
        index        index.html index.htm;
    
        ssl_certificate /etc/letsencrypt/live/j7c208.p.ssafy.io/fullchain.pem;
        ssl_certificate_key /etc/letsencrypt/live/j7c208.p.ssafy.io/privkey.pem;
        include /etc/letsencrypt/options-ssl-nginx.conf;
        ssl_dhparam /etc/letsencrypt/ssl-dhparams.pem;
    
        location / {
            try_files $uri $uri/ /index.html;
        }
    
        location /api {
            proxy_pass http://j7c208.p.ssafy.io:8080;
        }
    
        location /chat {
            proxy_pass http://j7c208.p.ssafy.io:3001;
            proxy_http_version 1.1;
            proxy_set_header Upgrade $http_upgrade;
            proxy_set_header Connection "upgrade";
        }
    
        location /blockchain {
            proxy_pass http://j7c2081.p.ssafy.io:8545/;
            # proxy_set_header Host $host;
            proxy_redirect off;
        }
    
        location /jenkins {
            proxy_pass http://j7c208.p.ssafy.io:9090;
        }
    }
    ```
    

### 블록체인

- genesis.json
    
    ```jsx
    {
      "config": {
        "chainId": 921,
        "homesteadBlock": 0,
        "eip150Block": 0,
        "eip155Block": 0,
        "eip158Block": 0,
        "byzantiumBlock": 0,
        "constantinopleBlock": 0,
        "petersburgBlock": 0,
        "istanbulBlock": 0,
        "berlinBlock": 0,
        "ethash": {}
      },
      "nonce": "0xdeadbeefdeadbeef",
      "difficulty": "0x10",
      "gasLimit": "9999999",
      "alloc": {}
    }
    ```
    
- geth를 통한 배포
    
    ```jsx
     nohup geth --networkid 921 --maxpeers 2 --datadir ~/dev/eth_localdata/ --port 30303 --allow-insecure-unlock --http --http.port 8545 --http.addr '0.0.0.0' --http.corsdomain=* --http.api eth,net,web3,miner,personal --http.vhosts '*' &
    ```
    

### Port 및 DB 정보

- SpringBoot 기본 포트
    - port : 8080
- React 기본 포트
    - port : 3000
- Openvidu 기본 포트
    - port : 8443
- Socket.io
    - port : 3001
- MySQL DB
    - port : 3336
    - DB 이름 : demori
    - j7c208.p.ssafy.io
- Jenkins
    - port : 9090
- properties 연결 정보
    
    ```jsx
    # MySQL
    spring.datasource.driver-class-name=com.mysql.cj.jdbc.Driver
    spring.datasource.url=DB주소
    spring.datasource.username=USER ID
    spring.datasource.password=USER P/W
    
    # S3
    cloud.aws.s3.bucket= aws.ssafybucket
    cloud.aws.credentials.accessKey=ACCESS_KEY
    cloud.aws.credentials.secretKey=SECRET_KEY
    cloud.aws.region.static= ap-northeast-2
    cloud.aws.stack.auto= false
    
    # SSL
    server.ssl.key-store= classpath:keystore.p12
    server.ssl.key-store-type=PKCS12
    server.ssl.key-store-password=SSL P/W
    server.ssl.key-alias=1
    server.port=SERVER PORT
    server.http2.enabled=true
    ```
    

---

## 4. DB 덤프 파일
 - [덤프파일](dump) 


## 5. 시연 시나리오
- 메인페이지에는 후원 및 대회 내역을 확인할 수 있다.
<img src="https://lab.ssafy.com/s07-blockchain-contract-sub2/S07P22C208/-/blob/master/exec/%EC%8B%9C%EC%97%B0%EC%8B%9C%EB%82%98%EB%A6%AC%EC%98%A4/%EB%A9%94%EC%9D%B8%ED%8E%98%EC%9D%B4%EC%A7%80.jpg" width="640" height="360"/>

<br>
<br>
<br>

- 로그인

<img src="https://lab.ssafy.com/s07-blockchain-contract-sub2/S07P22C208/-/blob/master/exec/%EC%8B%9C%EC%97%B0%EC%8B%9C%EB%82%98%EB%A6%AC%EC%98%A4/01_%EB%A1%9C%EA%B7%B8%EC%9D%B8.gif" width="640" height="360"/>


<br>
<br>
<br>

- 마이페이지에서는 대학인증 및 지갑 생성을 할 수 있고, 본인의 입출금 내역을 확인할 수 있습니다

<img src="https://lab.ssafy.com/s07-blockchain-contract-sub2/S07P22C208/-/blob/master/exec/%EC%8B%9C%EC%97%B0%EC%8B%9C%EB%82%98%EB%A6%AC%EC%98%A4/02_%EB%A7%88%EC%9D%B4%ED%8E%98%EC%9D%B4%EC%A7%80.gif" width="640" height="360"/>


<br>
<br>
<br>

- 대회 탭을 누르면, 진행중인 대학 대회를 확인할 수 있다.
- 내 대학에서 진행중인 대회도 따로 확인할 수 있다.

<img src="https://lab.ssafy.com/s07-blockchain-contract-sub2/S07P22C208/-/blob/master/exec/%EC%8B%9C%EC%97%B0%EC%8B%9C%EB%82%98%EB%A6%AC%EC%98%A4/03_%EB%8C%80%ED%9A%8C%EC%A1%B0%ED%9A%8C.gif" width="640" height="360"/>



<br>
<br>
<br>

- 대회와 팀을 생성할 수 있다.

<img src="https://lab.ssafy.com/s07-blockchain-contract-sub2/S07P22C208/-/blob/master/exec/%EC%8B%9C%EC%97%B0%EC%8B%9C%EB%82%98%EB%A6%AC%EC%98%A4/04_%EB%8C%80%ED%9A%8C%EC%83%9D%EC%84%B1.gif" width="640" height="360"/>


<br>
<br>
<br>

- 후원금액에 따른 랭킹 정보를 대학별, 유저별로 확인할 수 있다.
<img src="https://lab.ssafy.com/s07-blockchain-contract-sub2/S07P22C208/-/blob/master/exec/%EC%8B%9C%EC%97%B0%EC%8B%9C%EB%82%98%EB%A6%AC%EC%98%A4/05_%EB%9E%AD%ED%82%B9.gif" width="640" height="360"/>

<br>
<br>
<br>

- 대학조회를 할 수 있고, 대학별 받은 트로피를 확인할 수 있다.

<img src="https://lab.ssafy.com/s07-blockchain-contract-sub2/S07P22C208/-/blob/master/exec/%EC%8B%9C%EC%97%B0%EC%8B%9C%EB%82%98%EB%A6%AC%EC%98%A4/06_%EB%8C%80%ED%95%99%EC%A1%B0%ED%9A%8C.gif" width="640" height="360"/>

<br>
<br>
<br>

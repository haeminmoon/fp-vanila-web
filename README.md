# fp-vanila-webapp
* FP Based webapp.

## Stack
- Point language : ES6+
- Back & Middle : Node.js 8.10, express
- Front : VanilaJS
- DB : Amazone RDS with PostgreSQL
- Cache Store : Session store - express session -> Elastic cache with Redis
- Infra : Serverless ( API Gateway - Lambda ) built serverless framework

## Pre - Installation & Setup
- aws-cli ( Credential는 요청 후 발급 ) / **Optional** / For serverless deploy
- nvm (Node 8.10) / **Optional** / But should required node8.10 version
- npm module - supervisor / **Optional** / For use "auto-local" script
```
> npm i -g supervisor
```
- npm module - serverless / **Optional** / For use in serverless deployment script
```
> npm i -g serverless
```
- npm module - All dependency / **Required**
```
> npm install
```
- config ( 요청 후 발급 ) / **Required**
```
PATH "/fp-vanila-web/config"
```

## Local test ( localhost:3000/ )
- script
```
> npm run auto-local
> npm run local
```

## Build
- script
```
> npm run deploy
```

## DB migration
**※ 백업 복구 용도 및 테스트 데이터 셋팅용이니, 사전 공지 없이 사용하지 말 것 ※**
- script
```
> npm run migrate
```
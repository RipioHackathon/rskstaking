#  Tuki
La tarjeta de débito de custodia propia para ahorrar en ERC-20 y gastar en cualquier parte del mundo. 

Tutorial para hacer una dapp de staking en Rootstock.

<p align="center">
    <br>
    <img src="imgs/landing.png" width="500"/>
    <br>
<p>

## Relevant links

| What? | Link |
|---|---|
| Staking contract address | https://explorer.testnet.rsk.co/address/0xb0880d6f2cc4ede914bb73474f945cb428e8215a |
| Staking Token contract address | https://explorer.testnet.rsk.co/address/0x9c0a81daeec6fdd15bbbe94c2feabe037a26548c |
| Reward Token contract address | https://explorer.testnet.rsk.co/address/0xbeb06a2b21005ec5defe81193d3f1895fbc6995f |
| Demo en RSK Testnet | https://rskstaking.vercel.app/ |
| Landing | https://tukicard.xyz |
| P2P dapp rDOC | app.simplecrypto.cash/charly |


<p align="center">
    <br>
    <img src="imgs/problem.jpeg" width="500"/>
    <br>
<p>

<p align="center">
    <br>
    <img src="imgs/solution.jpeg" width="500"/>
    <br>
<p>


## Tech stack
1. Next.js
2. Thirdweb.js
3. Ethers.js

### Core
1. Inicialización del contrato. 
   1. El constructor no tiene inputs. 
   2. Se inicializan `ERC721.initializer(name, symbol)` y `Ownable.initializer(owner)`. Se guarda un 0 en la en la storage variable `token_counter() -> (number: Uint256)`. 
2. El usuario puede llamar la variable external `register_yourself(application_number: felt: felt, name: felt, last_name: felt, id: felt) -> ()`. En el argumento register_number registra el número de registro de su aplicación, su nombre, su apellido y su cédula. 



### TODO
5. Capacidad de inicializar un documento indicando el sitio en IPFS donde se encuentra.
6. Se llama la función, who_collaborating() -> (len: felt, users_collaborating: felt*) para leer una storage variable donde se mantienen los usuarios que aceptan colaborar.

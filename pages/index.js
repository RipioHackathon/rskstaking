import {
  ConnectWallet,
  useAddress,
  useContract,
  useContractRead,
  useContractWrite,
  useTokenBalance,
  Web3Button,
} from "@thirdweb-dev/react";

import { ethers } from "ethers";

import { useEffect, useState } from "react";
import styles from "../styles/Home.module.css";
import { stakingContractAddress } from "../const/Details";
import { stakingTokenAddress } from "../const/Details";
import { rewardTokenAddress } from "../const/Details";

export default function Home() {
  // La wallet del usuario que quiere stakear
  const address = useAddress();
  // La cantidad de tokens que el usuario quiere stakear
  const [amountToStake, setAmountToStake] = useState(0);
 
  // Inicializamos el contrato de stake
  const { contract: staking, isLoading: isStakingLoading } = useContract(
    stakingContractAddress,
    "custom"
  );
  
  // Inicializamos el contrato del token que se quiere stakear
  const { contract: stakingToken, isLoading: isStakingTokenLoading } =
    useContract(stakingTokenAddress, "token");
  
  // Inicializamos el contrato del token que se quiere recibir como recompensa
  const { contract: rewardToken, isLoading: isRewardTokenLoading } = useContract(
    rewardTokenAddress,
    "token"
  );

  // Tramos los balances de los tokens anteriores de la wallet del usuario
  const { data: stakingTokenBalance, refetch: refetchStakingTokenBalance } =
  useTokenBalance(stakingToken, address);

  const { data: rewardTokenBalance, refetch: refetchRewardTokenBalance } =
  useTokenBalance(rewardToken, address);

  // Traemos la información del stakeo del usuario.
  // Recuerda que puedes ver la estructura de este objeto en el contrato de staking
  const {
    data: stakeInfo,
    refetch: refetchStakingInfo,
    isLoading: isStakeInfoLoading,
  } = useContractRead(staking, "getStakeInfo", address || "0");
  
  // Traemos la información del staking del usuario cada 10 segundos.
  // En el contrato de staking, tenemos recompesas por segundo
  const refetchData = () => {
    refetchRewardTokenBalance();
    refetchStakingTokenBalance();
    refetchStakingInfo();
  };

  useEffect(() => {
    setInterval(() => {
      refetchData();
    }, 10000);
  }, []);



  return (
    <><div className={styles.container}>
      <input
        className={styles.textbox}
        type="number"
        value={amountToStake}
        onChange={(e) => setAmountToStake(e.target.value)} />
      <Web3Button
        className={styles.button}
        contractAddress={stakingContractAddress}
        action={async (contract) => {
          await stakingToken.setAllowance(
            stakingContractAddress,
            amountToStake
          );
          await contract.call(
            "stake",
            ethers.utils.parseEther(amountToStake)
          );
          alert("Tokens staked successfully!");
        } }
      >
        Stake!
      </Web3Button>

      <Web3Button
        className={styles.button}
        contractAddress={stakingContractAddress}
        action={async (contract) => {
          await contract.call(
            "withdraw",
            ethers.utils.parseEther(amountToStake)
          );
          alert("Tokens unstaked successfully!");
        } }
      >
        Unstake!
      </Web3Button>

      <Web3Button
        className={styles.button}
        contractAddress={stakingContractAddress}
        action={async (contract) => {
          await contract.call("claimRewards");
          alert("Rewards claimed successfully!");
        } }
      >
        Claim rewards!
      </Web3Button>
    </div><div className={styles.grid}>
        <a className={styles.card}>
          <h2>Stake token balance</h2>
          <p>{stakingTokenBalance?.displayValue}</p>
        </a>

        <a className={styles.card}>
          <h2>Reward token balance</h2>
          <p>{rewardTokenBalance?.displayValue}</p>
        </a>

        <a className={styles.card}>
          <h2>Staked amount</h2>
          <p>
            {stakeInfo && ethers.utils.formatEther(stakeInfo[0].toString())}
          </p>
        </a>

        <a className={styles.card}>
          <h2>Current reward</h2>
          <p>
            {stakeInfo && ethers.utils.formatEther(stakeInfo[1].toString())}
          </p>
        </a>
      </div></>
  );
}

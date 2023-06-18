import { ConnectWallet } from "@thirdweb-dev/react";
import styles from "../styles/Home.module.css";

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
    <div className={styles.container}>
      <main className={styles.main}>
        <h1 className={styles.title}>
          Welcome to <a href="https://thirdweb.com/">thirdweb</a>!
        </h1>

        <p className={styles.description}>
          Get started by configuring your desired network in{" "}
          <code className={styles.code}>pages/_app.js</code>, then modify the{" "}
          <code className={styles.code}>pages/index.js</code> file!
        </p>

        <div className={styles.connect}>
          <ConnectWallet />
        </div>

        <div className={styles.grid}>
          <a href="https://portal.thirdweb.com/" className={styles.card}>
            <h2>Portal &rarr;</h2>
            <p>
              Guides, references and resources that will help you build with
              thirdweb.
            </p>
          </a>

          <a href="https://thirdweb.com/dashboard" className={styles.card}>
            <h2>Dashboard &rarr;</h2>
            <p>
              Deploy, configure and manage your smart contracts from the
              dashboard.
            </p>
          </a>

          <a
            href="https://portal.thirdweb.com/templates"
            className={styles.card}
          >
            <h2>Templates &rarr;</h2>
            <p>
              Discover and clone template projects showcasing thirdweb features.
            </p>
          </a>
        </div>
      </main>
    </div>
  );
}

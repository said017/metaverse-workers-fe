import React, { useEffect, useState } from 'react';

import { useDispatch, useSelector, RootStateOrAny } from 'react-redux';

import config from '../config/index.json';
import { connect } from '../redux/blockchain/blockchainActions';
import { fetchData } from '../redux/data/dataActions';
import * as s from '../styles/globalStyles';



const MainHero = () => {
  const { mainHero } = config;
  const dispatch = useDispatch();
  const blockchain = useSelector((state: RootStateOrAny) => state.blockchain);
  const data = useSelector((state: RootStateOrAny) => state.data);
  const [claimingNft, setClaimingNft] = useState(false);
  const [feedback, setFeedback] = useState(`Click buy to mint your NFT.`);
  const [mintAmount, setMintAmount] = useState(1);
  const [CONFIG, SET_CONFIG] = useState({
    CONTRACT_ADDRESS: '',
    SCAN_LINK: '',
    NETWORK: {
      NAME: '',
      SYMBOL: '',
      ID: 0,
    },
    NFT_NAME: '',
    SYMBOL: '',
    MAX_SUPPLY: 1,
    WEI_COST: 0,
    DISPLAY_COST: 0,
    GAS_LIMIT: 0,
    MARKETPLACE: '',
    MARKETPLACE_LINK: '',
    SHOW_BACKGROUND: false,
  });
  
  let whitelistedAddress:string[] = ["0xca03e5939598306b74a2ba866d5a263103625549"];

  const claimNFTs = () => {
    const cost = CONFIG.WEI_COST;
    const gasLimit = CONFIG.GAS_LIMIT;
    const totalCostWei = String(cost * mintAmount);
    const totalGasLimit = String(gasLimit * mintAmount);
    console.log('Cost: ', totalCostWei);
    console.log('Gas limit: ', totalGasLimit);
    setFeedback(`Minting your ${CONFIG.NFT_NAME}...`);
    setClaimingNft(true);
    blockchain.smartContract.methods
      .mintNFTs(mintAmount)
      .send({
        gasLimit: String(totalGasLimit),
        to: CONFIG.CONTRACT_ADDRESS,
        from: blockchain.account,
        value: totalCostWei,
      })
      .once('error', (err: any) => {
        console.log(err);
        setFeedback('Sorry, something went wrong please try again later.');
        setClaimingNft(false);
      })
      .then((receipt: any) => {
        console.log(receipt);
        setFeedback(
          `WOW, the ${CONFIG.NFT_NAME} is yours! go visit OpenSea to view it.`
        );
        setClaimingNft(false);
        dispatch(fetchData());
        // dispatch(fetchData(blockchain.account));
      });
  };

  const decrementMintAmount = () => {
    let newMintAmount = mintAmount - 1;
    if (newMintAmount < 1) {
      newMintAmount = 1;
    }
    setMintAmount(newMintAmount);
  };

  const checkWhitelisted = (addr: string) => {
    for (let i = 0; i < whitelistedAddress.length; i++) {
      if (whitelistedAddress[i] == addr) {
        return true;
      }
    }
    return false;
  };

  const incrementMintAmount = (max: any) => {
    let newMintAmount = mintAmount + 1;
    if (newMintAmount > max) {
      newMintAmount = max;
    }
    setMintAmount(newMintAmount);
  };

  const getData = () => {
    if (blockchain.account !== '' && blockchain.smartContract !== null) {
      dispatch(fetchData());

      // dispatch(fetchData(blockchain.account));
    }
  };

  const getConfig = async () => {
    const configResponse = await fetch('/config/config.json', {
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
    });
    const config2 = await configResponse.json();
    SET_CONFIG(config2);
  };

  useEffect(() => {
    getConfig();
  }, []);

  useEffect(() => {
    getData();
  }, [blockchain.account]);

  return (
    <main className="mt-10 mx-auto max-w-7xl px-4 sm:mt-12 sm:px-6 md:mt-16 lg:mt-20 lg:px-8 xl:mt-28">
      <div className="sm:text-center lg:text-left">
        <h1 className="text-4xl tracking-tight font-extrabold text-gray-900 sm:text-5xl md:text-6xl">
          <span className="block xl:inline">{mainHero.title}</span> <br></br>
          <span className={`block text-primary xl:inline`}>
            {mainHero.subtitle}
          </span>
        </h1>
        <s.SpacerSmall />
        <h5 className="text-4xl tracking-tight font-extrabold text-gray-900 xl:inline">
        {blockchain.account === '' || blockchain.smartContract === null ?
         null : (
                  <>
                  <span className="block xl:inline">
          {data.totalSupply} / {CONFIG.MAX_SUPPLY}
        </span>{' '}
        <span className={`block font-normal xl:inline`}>minted</span>
        </>
        ) 
        }
        </h5>
        {/* data.totalSupply */}

        {Number(data.totalSupply) >= CONFIG.MAX_SUPPLY ? (
          <>
            <p className="mt-3 text-base text-gray-500 sm:mt-5 sm:text-lg sm:max-w-xl sm:mx-auto md:mt-5 md:text-xl lg:mx-0">
              {'The sale has ended'}
            </p>
            <p className="mt-3 text-base text-gray-500 sm:mt-5 sm:text-lg sm:max-w-xl sm:mx-auto md:mt-5 md:text-xl lg:mx-0">
              You can still find {CONFIG.NFT_NAME} on{' '} <br></br> <br></br>
              <a
                href={CONFIG.MARKETPLACE_LINK}
                target="_blank"
                rel="noreferrer"
                className={`w-180 items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-background bg-primary hover:bg-border hover:text-primary md:py-4 md:text-lg md:px-10`}
              >
                {CONFIG.MARKETPLACE}
              </a>
            </p>
          </>
        ) : (
          <>
            <p className="mt-3 text-base text-gray-500 sm:mt-5 sm:text-lg sm:max-w-xl sm:mx-auto md:mt-5 md:text-xl lg:mx-0">
              <span className={`block font-bold xl:inline`}>
                1 {CONFIG.SYMBOL}{' '}
              </span>{' '}
              costs{' '}
              <span className={`block font-bold xl:inline`}>
                {CONFIG.DISPLAY_COST} {CONFIG.NETWORK.SYMBOL}
              </span>
              . Excluding gas fees.
            </p>

            {/* <s.SpacerSmall /> */}
            {/* <div className="mt-5 sm:mt-8 sm:flex sm:justify-center lg:justify-start"></div> */}
            {blockchain.account === '' || blockchain.smartContract === null ? (
              <>
                {/* <s.SpacerSmall /> */}
                {/* <s.SpacerMedium />
                  <s.SpacerMedium />
                  <s.SpacerMedium />
                  <s.SpacerMedium /> */}
                <div className="mt-5 sm:mt-8 sm:flex sm:justify-center lg:justify-start"></div>
                <s.Container fd={'column'}>
                  <button
                    onClick={(e) => {
                      e.preventDefault();
                      dispatch(connect());
                      getData();
                    }}
                    className={`w-180 flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-background bg-primary hover:bg-border hover:text-primary md:py-4 md:text-lg md:px-10`}
                  >
                    Connect
                  </button>

                  {blockchain.errorMsg !== '' ? (
                    <>
                      <s.SpacerSmall />
                      <s.TextDescription
                        style={{
                          textAlign: 'center',
                          color: 'var(--accent-text)',
                        }}
                      >
                        {blockchain.errorMsg}
                      </s.TextDescription>
                    </>
                  ) : null}
                </s.Container>
              </>
            ) : (

              
              <>
                {Boolean(data.paused) ? (
                      <>
                      <p className="mt-3 text-base text-gray-500 sm:mt-5 sm:text-lg sm:max-w-xl sm:mx-auto md:mt-5 md:text-xl lg:mx-0">
                        {'Coming Soon'}
                      </p>
                      <p className="mt-3 text-base text-gray-500 sm:mt-5 sm:text-lg sm:max-w-xl sm:mx-auto md:mt-5 md:text-xl lg:mx-0">
                        Register for Pre-Sale{' '} <br></br> <br></br>
                        <a
                          href={CONFIG.MARKETPLACE_LINK}
                          target="_blank"
                          rel="noreferrer"
                          className={`w-180 items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-background bg-primary hover:bg-border hover:text-primary md:py-4 md:text-lg md:px-10`}
                        >
                          Register
                        </a>
                      </p>
                    </>
                    ) : (
                      <>
                      {Boolean(data.onlyWhitelisted)  ? (
                        <>
                        {checkWhitelisted(String(blockchain.account))  ? (
                          <>
                                          <p className="mt-3 text-base text-gray-500 sm:mt-5 sm:text-lg sm:max-w-xl sm:mx-auto md:mt-5 md:text-xl lg:mx-0">
                  {feedback}
                </p>
                <div className="mt-5 sm:mt-8 sm:flex sm:justify-center lg:justify-start"></div>
                {/* <div className="mt-5 sm:mt-8 sm:flex sm:justify-center lg:justify-start"></div> */}
                {/* ai={"center"} jc={"center"}  */}
                <s.Container ai={'center'} fd={'row'}>
                  <button
                    className="rounded-full h-16 w-16 border border-transparent text-base font-medium rounded-md text-background bg-primary hover:bg-border hover:text-primary md:text-lg"
                    style={{ lineHeight: 0.4 }}
                    disabled={!!claimingNft}
                    onClick={(e) => {
                      e.preventDefault();
                      decrementMintAmount();
                    }}
                  >
                    -
                  </button>
                  <s.SpacerMedium />
                  <s.TextDescription
                    style={{
                      textAlign: 'center',
                      color: 'var(--accent-text)',
                    }}
                  >
                    {mintAmount}
                  </s.TextDescription>
                  <s.SpacerMedium />
                  <button
                    className="rounded-full h-16 w-16 border border-transparent text-base font-medium rounded-md text-background bg-primary hover:bg-border hover:text-primary md:text-lg"
                    disabled={!!claimingNft}
                    onClick={(e) => {
                      e.preventDefault();
                      incrementMintAmount(3);
                    }}
                  >
                    +
                  </button>
                </s.Container>
                <s.SpacerMedium />
                {/* ai={"center"} jc={"center"}  */}
                <s.Container ai={'center'} fd={'row'}>
                  <button
                    className={`h-16 w-48 border border-transparent text-base font-medium rounded-md text-background bg-primary hover:bg-border hover:text-primary md:py-4 md:text-lg md:px-10`}
                    disabled={!!claimingNft}
                    onClick={(e) => {
                      e.preventDefault();
                      claimNFTs();
                      getData();
                    }}
                  >
                    {claimingNft ? 'WAIT' : 'BUY'}
                  </button>
                </s.Container>
                          </>
                        ) : (
                          <>
                                                <p className="mt-3 text-base text-gray-500 sm:mt-5 sm:text-lg sm:max-w-xl sm:mx-auto md:mt-5 md:text-xl lg:mx-0">
                        {'You are not Whitelisted, wait for the public sale'} 
                      </p>
                          </>
                        ) }
                        </>
                      ) : (
                        <>
                                        <p className="mt-3 text-base text-gray-500 sm:mt-5 sm:text-lg sm:max-w-xl sm:mx-auto md:mt-5 md:text-xl lg:mx-0">
                  {feedback}
                </p>
                <div className="mt-5 sm:mt-8 sm:flex sm:justify-center lg:justify-start"></div>
                {/* <div className="mt-5 sm:mt-8 sm:flex sm:justify-center lg:justify-start"></div> */}
                {/* ai={"center"} jc={"center"}  */}
                <s.Container ai={'center'} fd={'row'}>
                  <button
                    className="rounded-full h-16 w-16 border border-transparent text-base font-medium rounded-md text-background bg-primary hover:bg-border hover:text-primary md:text-lg"
                    style={{ lineHeight: 0.4 }}
                    disabled={!!claimingNft}
                    onClick={(e) => {
                      e.preventDefault();
                      decrementMintAmount();
                    }}
                  >
                    -
                  </button>
                  <s.SpacerMedium />
                  <s.TextDescription
                    style={{
                      textAlign: 'center',
                      color: 'var(--accent-text)',
                    }}
                  >
                    {mintAmount}
                  </s.TextDescription>
                  <s.SpacerMedium />
                  <button
                    className="rounded-full h-16 w-16 border border-transparent text-base font-medium rounded-md text-background bg-primary hover:bg-border hover:text-primary md:text-lg"
                    disabled={!!claimingNft}
                    onClick={(e) => {
                      e.preventDefault();
                      incrementMintAmount(5);
                    }}
                  >
                    +
                  </button>
                </s.Container>
                <s.SpacerMedium />
                {/* ai={"center"} jc={"center"}  */}
                <s.Container ai={'center'} fd={'row'}>
                  <button
                    className={`h-16 w-48 border border-transparent text-base font-medium rounded-md text-background bg-primary hover:bg-border hover:text-primary md:py-4 md:text-lg md:px-10`}
                    disabled={!!claimingNft}
                    onClick={(e) => {
                      e.preventDefault();
                      claimNFTs();
                      getData();
                    }}
                  >
                    {claimingNft ? 'WAIT' : 'BUY'}
                  </button>
                </s.Container>
                        </>
                      ) }
                      </>
                    )}

              </>
            )}
          </>
        )}
        {/* <p className="mt-3 text-base text-gray-500 sm:mt-5 sm:text-lg sm:max-w-xl sm:mx-auto md:mt-5 md:text-xl lg:mx-0">
          {mainHero.description}
        </p> */}
        {/* <div className="mt-5 sm:mt-8 sm:flex sm:justify-center lg:justify-start">
          <div className="rounded-md shadow">
            <a
              href={mainHero.primaryAction.href}
              className={`w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-background bg-primary hover:bg-border hover:text-primary md:py-4 md:text-lg md:px-10`}
            >
              {mainHero.primaryAction.text}
            </a>
          </div>
  
          <div className="mt-3 sm:mt-0 sm:ml-3">
            <a
              href={mainHero.secondaryAction.href}
              className={`w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md border-primary text-secondary bg-background hover:bg-border hover:text-primary md:py-4 md:text-lg md:px-10`}
            >
              {mainHero.secondaryAction.text}
            </a>
          </div>
        </div> */}
      </div>
    </main>
  );
};

export default MainHero;

import Faq from 'react-faq-component';

const data = {
  title: 'FAQ',
  rows: [
    {
      title: 'What is an NFT?',
      content: `An NFT stands for “Non-fungible token” and is a fancy term for a unique, digital item whose ownership is proven and managed by a blockchain. An NFT could be a collectible, in-game item (like a Fortnite skin), a piece of digital art, an event ticket, and much more. Some NFTs are simply digital “flexes” (like a Rolex), while others can offer utility such as exclusive access to communities, websites, or participation in events.`,
    },
    {
      title: 'How Much is Metaverse Workers NFT?',
      content: `For the Whitelist Private Sale the price will be 40 MATIC + gas price and you will be able to mint a max of 3 Workers. For the Public Sale the price will be 40 MATIC + gas price and you will be able to mint a max of 5 Workers per transaction.`,
    },
    {
      title: 'How do I purchase an NFT?',
      content:
        'First, you will need to purchase MATIC from a cryptocurrency exchange such as Coinbase, Binance, or Gemini. Then, you will need to transfer your MATIC into a digital wallet, the most popular being Metamask. You will be able to connect this wallet to the Metaverse Workers website to purchase your NFT.',
    },
    {
      title: 'What is the benefit for the owner of Metaverse Workers NFT?',
      content: `Mint one Metaverse Workers Club ( MWC ) and hold it to participate in next project's NFT and play in the Play-to-Earn platform , there is no cap on the wallet, means if one wallet is holding 10 MVW ( Minting + Holding ) He/She will have a chance to buy 10 __ NFTs , It is 1:1 NFT to NFT rather than only one NFT / Wallet.`,
    },
    {
      title: 'Do I get full rights on my NFTs?',
      content:
        'Yes, In the sum of eth price not including transaction fees, The Metaverse Workers hereby transfers to purchasers full title and all rights and interests with 2.5% secondary royalty, You will be the owner of the nft and it is absolutely 1/1 & Secured on ERC-721 token.',
    },
  ],
};

const styles = {
  // bgColor: 'white',
  titleTextColor: '#ec4755',
  titleTextSize: '64px',
  rowTitleColor: '#ec4755',
  // rowTitleTextSize: 'medium',
  // rowContentColor: 'grey',
  rowContentTextSize: '16px',
  // rowContentPaddingTop: '10px',
  rowContentPaddingBottom: '10px',
  rowContentPaddingLeft: '50px',
  // rowContentPaddingRight: '150px',
  // arrowColor: "red",
  // transitionDuration: "1s",
  // timingFunc: "ease"
};

const config = {
  animate: true,
  arrowIcon: 'V',
  tabFocus: true,
};

export default function App() {
  return (
    <section className={`bg-background py-8`} id="faq">
      <div className="mt-10 mx-auto max-w-7xl px-4 sm:mt-12 sm:px-6 md:mt-16 lg:mt-20 lg:px-8 xl:mt-28">
        <Faq data={data} styles={styles} config={config} />
      </div>
    </section>
  );
}
